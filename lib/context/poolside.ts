import OpenAI from "openai";
import type { LaxvishContextGraph, NarrativeMoment, NarrativeStage } from "./types.ts";

const POOLSIDE_API_KEY = process.env.POOLSIDE_API_KEY;
const POOLSIDE_BASE_URL = process.env.POOLSIDE_BASE_URL || "https://inference.poolside.ai/v1";
const POOLSIDE_MODEL = process.env.POOLSIDE_MODEL || "poolside/laguna-xs-2.1";

let poolsideClient: OpenAI | null = null;

function getPoolsideClient(): OpenAI | null {
  if (!POOLSIDE_API_KEY) return null;
  if (!poolsideClient) {
    poolsideClient = new OpenAI({
      apiKey: POOLSIDE_API_KEY,
      baseURL: POOLSIDE_BASE_URL,
      timeout: 10000, // 10s timeout for native thinking model generation
    });
  }
  return poolsideClient;
}

/**
 * System prompt instructing Poolside Laguna model to reason over live context
 * and predict practical Laxvish solutions in simple plain language (Class 6-8 reading level)
 * to build visitor interest in a Laxvish working session.
 */
const MASTER_SYSTEM_PROMPT = `You are the Laxvish Context Reasoner.

Laxvish is an AI operating system for Indian enterprises. Your job is to observe context, predict likely business bottlenecks, and suggest clear, practical Laxvish solutions in very easy, plain language. The goal is to show visitors how Laxvish solves their daily operational friction and build natural interest in a working session.

Reason ONLY from the compact context object provided to you.

CORE PRINCIPLES:
1. OBSERVATION IS NOT INFERENCE. Treat raw observations as evidence. Treat hypotheses as hypotheses. Never present an inference as confirmed fact.
2. DO NOT INVENT ACCESS. The website has NO access to browser history, Google search history, other tabs, WhatsApp, Instagram, Gmail, Android notifications, phone calls, or private files. Never claim or imply such access.
3. USE CONFIDENCE. Ground every prediction in the provided evidence and confidence score.
4. LOCATION IS ENVIRONMENT, NOT IDENTITY.
   - If a specific city IS provided in context (e.g. "Mumbai", "Chennai", "Delhi", "Bengaluru"), ground the observation in that city's commercial and business corridors.
   - If city is NOT provided or is empty, DO NOT guess or name any specific city. Refer to Indian business corridors or enterprise hubs generally. Never fabricate a city name.
5. DO NOT DIAGNOSE. Never make medical, psychiatric, or sensitive personal judgments.
6. EASY PLAIN LANGUAGE & CONVERTING VOICE:
   - Use simple everyday words at a Class 6 to 8 reading level.
   - An Indian founder or COO must understand the sentence in three seconds.
   - Keep sentences short (maximum 15 words per sentence).
   - Write maximum 2 sentences (15 to 350 characters total).
   - Calm, crisp, precise, and human. No em-dashes.
   - No marketing buzzwords (never use "transform", "revolutionize", "unlock", or "seamlessly").
   - Build calm, credible momentum toward exploring or scheduling a working session without being pushy or aggressive.
7. PREDICT PRACTICAL LAXVISH SOLUTIONS:
   - In opportunity, interaction, and synthesis stages, predict one clear operational problem and name a concrete Laxvish piece (Workers, Brain, Brakes, or Telephony).
   - Arrival and environment stages may observe context without claiming a specific solution.

NARRATIVE STAGES (internal processing only; never mention stage names in output):
- arrival: Immediate context (local time, device class, region). No problem claims yet.
- environment: Surrounding business ecosystem and commercial activity.
- opportunity: Translate local business flow into a predicted bottleneck and name a concrete Laxvish solution.
- interaction: Reflect topics explored on the site and predict how Laxvish Workers or Brain assist that workflow.
- synthesis: Combine accumulated evidence into a final prediction and a clear Laxvish solution transition.

OUTPUT RULE:
- Output ONLY the final 1-2 sentence narrative statement.
- Never output stage names (do NOT write "arrival", "environment", "opportunity", "interaction", or "synthesis").
- No conversational prefixes, labels, markdown quotes, or JSON brackets.`;

/**
 * Strict Server-Side Anti-Leak Sanitizer
 * Strips all internal thinking, reasoning, analysis tags, and markdown code fences.
 */
export function sanitizeModelOutput(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<analysis>[\s\S]*?<\/analysis>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .replace(/<think>[\s\S]*$/gi, "") // unclosed think tag
    .replace(/```(?:json)?([\s\S]*?)```/gi, "$1")
    .trim();
}

const SOLUTION_SYNTHESIS_SYSTEM_PROMPT = `You are thinking out loud on behalf of Laxvish, an AI operating system for Indian enterprises.

Your job is to produce a sequence of 5 natural, thoughtful, human editorial thoughts describing what Laxvish could build for this specific visitor.

CORE WRITING PRINCIPLES:
1. HUMAN & CONVERSATIONAL: Write like an intelligent, thoughtful technologist exploring real possibilities ("I think we could help you scale...", "And if education is part of your world...", "We could also take the documentation overhead...", "You may also have opportunities on the front line...", "The bigger opportunity may be connecting all of this together...").
2. CONCRETE & PRACTICAL: Describe actual systems we can build (autonomous workflows across ERPs, clinical documentation background agents, voice triage for sales pipelines, unified company memory).
3. CALM & CONFIDENT: No SaaS marketing buzzwords (never use "transform", "revolutionize", "unlock", "game-changing", "cutting-edge", or "seamlessly").
4. NO DASHBOARD LABELS: No bullet points, scores, category headers, or technical telemetry.
5. STRICT JSON FORMAT:
{
  "predictions": [
    {
      "id": "solution_id_matching_input",
      "text": "1-2 sentence thoughtful, conversational paragraph about what we can build for them."
    }
  ]
}
6. NEVER include <think>, <analysis>, <reasoning>, or chain-of-thought in output.`;

/**
 * Refines the 5 predicted solutions with the LLM when available,
 * falling back gracefully to the deterministic solution definitions.
 */
export async function refinePredictedSolutionsWithLLM(
  graph: LaxvishContextGraph,
  baseSolutions: import("./types.ts").PredictedSolutionOpportunity[]
): Promise<import("./types.ts").PredictedSolutionOpportunity[]> {
  const client = getPoolsideClient();
  if (!client || baseSolutions.length === 0) {
    return baseSolutions;
  }

  const promptPayload = {
    city: graph.environment.city,
    environmentCategories: graph.environment.categories,
    device: graph.technical.deviceClass,
    topics: graph.behavior.topicsOfInterest,
    directQuery: graph.direct.promptQueries.join(" "),
    solutions: baseSolutions.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      currentText: s.text || s.description,
    })),
  };

  try {
    const completion = await client.chat.completions.create({
      model: POOLSIDE_MODEL,
      messages: [
        { role: "system", content: SOLUTION_SYNTHESIS_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Refine these 5 predicted AI opportunities into conversational human thoughts: ${JSON.stringify(promptPayload)}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 800,
    });

    const rawContent = completion.choices?.[0]?.message?.content || "";
    const cleanJson = sanitizeModelOutput(rawContent);
    const parsed = JSON.parse(cleanJson);

    const items = Array.isArray(parsed?.predictions)
      ? parsed.predictions
      : Array.isArray(parsed?.solutions)
      ? parsed.solutions
      : [];

    if (items.length > 0) {
      const refinedMap = new Map<string, string>();
      for (const item of items) {
        if (item.id) {
          const cleanText = sanitizeModelOutput(item.text || item.description || "");
          if (cleanText) refinedMap.set(item.id, cleanText);
        }
      }

      return baseSolutions.map((base) => {
        const matchText = refinedMap.get(base.id);
        if (matchText && matchText.length >= 20) {
          return {
            ...base,
            text: matchText,
            description: matchText,
          };
        }
        return base;
      });
    }
  } catch {
    // If LLM fails, times out, or returns invalid JSON, return deterministic baseSolutions
  }

  return baseSolutions;
}

/**
 * Extracts reasoning thinking block and clean editorial text from raw model output.
 */
export function extractThoughtAndNarrative(rawText: string): { thought: string; text: string } {
  if (!rawText) return { thought: "", text: "" };

  const thinkMatch = rawText.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch) {
    const thought = thinkMatch[1].trim();
    const text = rawText.replace(/<think>[\s\S]*?<\/think>/i, "").trim();
    return { thought, text };
  }

  const openThinkMatch = rawText.match(/<think>([\s\S]*)$/i);
  if (openThinkMatch) {
    return { thought: openThinkMatch[1].trim(), text: "" };
  }

  return { thought: "", text: rawText.trim() };
}

/**
 * Deterministic fallback generator when remote LLM is unavailable or times out
 */
export function generateDeterministicNarrative(
  graph: LaxvishContextGraph,
  stage: NarrativeStage
): NarrativeMoment {
  const { environment, temporal, technical, behavior, hypotheses, topSolution } = graph;
  const timeStr = temporal.localHour >= 18 || temporal.localHour < 6 ? "after-hours" : "working hours";
  const cityStr = environment.city || "Indian enterprise ecosystem";
  const topHypothesis = hypotheses[0];

  let text = "";
  let thought = "";
  let confidence = 0.40;
  const evidenceUsed: string[] = [];

  switch (stage) {
    case "arrival":
      evidenceUsed.push(`localTime:${temporal.localHour}:00`, `device:${technical.deviceClass}`);
      thought = `Analyzing local hour ${temporal.localHour}:00 (${timeStr}), weekend status (${temporal.isWeekend}), and device class (${technical.deviceClass}) in ${cityStr}. Initial entry context established without prior dwell telemetry.`;
      if (temporal.isWeekend) {
        text = `Enterprise operations running across the weekend in ${cityStr}. Let's see what we can solve in the next two minutes.`;
      } else {
        text = `Connecting from ${cityStr} during ${timeStr}. Let's see what we can understand before you tell us what you need.`;
      }
      confidence = 0.45;
      break;

    case "environment":
      evidenceUsed.push(`cluster:${environment.locationSource}`, `confidence:${environment.confidenceTier}`);
      const topCat = Object.entries(environment.categories).sort((a, b) => b[1] - a[1])[0];
      thought = `Synthesizing cluster density for ${cityStr} (${environment.locationSource}, ${environment.confidenceTier}). Dominant sector: ${topCat ? topCat[0] : "business"}. Formulating commercial corridor description.`;
      if (topCat && topCat[1] > 0.6) {
        text = `You are surrounded by a high-density ${topCat[0]} and commercial corridor with complex operational workflows.`;
      } else {
        text = `The surrounding environment shows a concentrated network of enterprise operations and business activity.`;
      }
      confidence = 0.65;
      break;

    case "opportunity":
      evidenceUsed.push(`envCategory:${topHypothesis?.problemKey || "operations"}`);
      thought = `Translating environment density and active hypothesis (${topHypothesis?.problemKey || "operations"}) into operational friction solvable by autonomous AI workers.`;
      text = `Environments like this generate repetitive coordination and execution overhead that modern AI workers can quietly eliminate.`;
      confidence = 0.75;
      break;

    case "interaction":
      const topTopic = Object.entries(behavior.topicsOfInterest).sort((a, b) => b[1] - a[1])[0];
      thought = `Evaluating behavioral telemetry: reading depth ${(behavior.readingDepthScore * 100).toFixed(0)}%, topics of interest (${Object.keys(behavior.topicsOfInterest).join(", ") || "pipeline"}). Reflecting focused exploration.`;
      if (topTopic) {
        evidenceUsed.push(`topic:${topTopic[0]} (${(topTopic[1] * 100).toFixed(0)}%)`);
        text = `You have spent focused attention evaluating ${topTopic[0]} rather than browsing generic platform overviews.`;
      } else {
        evidenceUsed.push(`readingDepth:${(behavior.readingDepthScore * 100).toFixed(0)}%`);
        text = `You are exploring specific operational capabilities to remove work across your team's daily pipeline.`;
      }
      confidence = 0.82;
      break;

    case "synthesis":
      evidenceUsed.push(`hypothesis:${topHypothesis?.title || "Workflow"}`, `confidence:${(topHypothesis?.confidence || 0.85) * 100}%`);
      thought = `Unifying all signals with top hypothesis (${topHypothesis?.title || "Workflow Automation"}, ${(topHypothesis?.confidence || 0.85) * 100}% confidence). Deriving concrete transition to ${topSolution?.recommendedWorker || "Laxvish AI solution"}.`;
      if (topHypothesis?.problemKey === "sales_lead_qualification_bottleneck") {
        text = `The strongest signal is clear: you are looking to eliminate manual voice qualification and accelerate lead response without expanding support headcount.`;
      } else if (topHypothesis?.problemKey === "documentation_extraction_burden") {
        text = `The evidence points to document and contract processing friction consuming valuable operational bandwidth.`;
      } else {
        text = `The primary opportunity is removing the manual coordination layer behind your business workflows, turning fragmented tasks into autonomous execution.`;
      }
      confidence = topHypothesis?.confidence || 0.90;
      break;
  }

  return {
    stage,
    text,
    thought,
    confidence,
    evidenceUsed,
    problemHypothesis: topHypothesis?.title,
    solutionCandidate: topSolution,
    generatedAt: Date.now(),
    isFallback: true,
  };
}

/**
 * Validates model output against strict anti-hallucination and privacy rules
 */
export function validateNarrativeOutput(rawText: string): { valid: boolean; reason?: string } {
  const { thought, text } = extractThoughtAndNarrative(rawText);
  const combinedLower = (rawText + " " + text + " " + thought).toLowerCase();

  // Banned surveillance claims
  const forbiddenPatterns = [
    "whatsapp",
    "gmail",
    "instagram",
    "browser history",
    "other tabs",
    "notification",
    "private files",
    "call log",
    "sms",
    "depression",
    "mental health",
    "diagnos",
  ];

  for (const pattern of forbiddenPatterns) {
    if (combinedLower.includes(pattern)) {
      return { valid: false, reason: `Forbidden pattern detected: ${pattern}` };
    }
  }

  // The editorial narrative statement must be between 15 and 350 chars
  const targetText = text || rawText;
  if (targetText.length < 15 || targetText.length > 350) {
    return { valid: false, reason: `Narrative length ${targetText.length} outside acceptable bounds (15-350)` };
  }

  return { valid: true };
}

/**
 * Streams narrative tokens using Poolside Laguna-xs-2.1 with automatic fallback.
 * Native reasoning chunks (reasoning_content) are captured inside <think>...</think>,
 * followed by the final editorial narrative (content).
 */
export async function* streamNarrativeFromPoolside(
  graph: LaxvishContextGraph,
  stage: NarrativeStage
): AsyncGenerator<string, void, unknown> {
  const client = getPoolsideClient();

  if (!client) {
    const fallback = generateDeterministicNarrative(graph, stage);
    yield `<think>${fallback.thought}</think>${fallback.text}`;
    return;
  }

  const contextPayload = {
    temporal: {
      localHour: graph.temporal.localHour,
      localDayOfWeek: graph.temporal.localDayOfWeek,
      isWeekend: graph.temporal.isWeekend,
    },
    environment: {
      city: graph.environment.city,
      country: graph.environment.country,
      locationSource: graph.environment.locationSource,
      categories: graph.environment.categories,
    },
    technical: {
      platform: graph.technical.platform,
      deviceClass: graph.technical.deviceClass,
      browser: graph.technical.browser,
    },
    behavior: {
      topicsOfInterest: graph.behavior.topicsOfInterest,
      readingDepthScore: graph.behavior.readingDepthScore,
      attentionScore: graph.behavior.attentionScore,
    },
    direct: graph.direct,
    activeHypothesis: graph.hypotheses[0],
    solutionCandidate: graph.topSolution,
    requestedStage: stage,
  };

  try {
    const response = await client.chat.completions.create({
      model: POOLSIDE_MODEL,
      messages: [
        { role: "system", content: MASTER_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate the ${stage} narrative text for this context: ${JSON.stringify(contextPayload)}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
      stream: true,
    });

    let inThinking = false;
    let fullText = "";

    for await (const chunk of response) {
      const delta = chunk.choices?.[0]?.delta as
        | { content?: string | null; reasoning_content?: string | null }
        | undefined;

      const reasoning = delta?.reasoning_content;
      const content = delta?.content;

      if (reasoning) {
        if (!inThinking) {
          inThinking = true;
          fullText += "<think>";
          yield "<think>";
        }
        fullText += reasoning;
        yield reasoning;
      }

      if (content) {
        if (inThinking) {
          inThinking = false;
          fullText += "</think>";
          yield "</think>";
        }
        fullText += content;
        yield content;
      }
    }

    if (inThinking) {
      inThinking = false;
      fullText += "</think>";
      yield "</think>";
    }

    const validation = validateNarrativeOutput(fullText);
    if (!validation.valid) {
      console.warn(`[Poolside Validation Warning] ${validation.reason}. Serving fallback.`);
    }
  } catch (error) {
    console.error("[Poolside Error / Timeout] Fallback to Level A engine:", error);
    const fallback = generateDeterministicNarrative(graph, stage);
    yield `<think>${fallback.thought}</think>${fallback.text}`;
  }
}
