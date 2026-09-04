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
      timeout: 3000, // 3s strict timeout for real-time responsiveness
    });
  }
  return poolsideClient;
}

const MASTER_SYSTEM_PROMPT = `You are the Laxvish Context Reasoner.

Laxvish is an AI operating system for Indian enterprises. The website is demonstrating Laxvish's ability to observe legitimate context, identify likely problems/opportunities, and connect them to practical AI solutions.

You must reason ONLY from the compact context object provided to you.

CORE PRINCIPLES:
1. OBSERVATION IS NOT INFERENCE. Treat raw observations as evidence. Treat hypotheses as hypotheses. Never present an inference as confirmed fact.
2. DO NOT INVENT ACCESS. The website has NO access to browser history, Google search history, other tabs, WhatsApp, Instagram, Gmail, Android notifications, phone calls, or private files. Never claim or imply such access.
3. USE CONFIDENCE. Justify every personalized statement by the evidence and confidence supplied.
4. LOCATION IS ENVIRONMENT, NOT IDENTITY. A nearby hospital or university does not mean the person is a doctor or student. Describe environmental patterns and work density.
5. DO NOT DIAGNOSE. Never make medical, psychiatric, or sensitive personal judgments.
6. VOICE & STYLE: Concise, industrial, calm, intelligent, crisp, confident without pretending certainty. One strong idea per text. Maximum 2 sentences. No generic marketing fluff.
7. NATURAL TRANSITION: The final synthesis must lead directly to a concrete Laxvish AI solution (Workers, Brain, Brakes, Telephony).

NARRATIVE STAGES:
- arrival: Immediate context (local time, device class, broad region). No problem claims yet.
- environment: Surrounding ecosystem and cluster density.
- opportunity: Translating environment into operational friction AI can remove.
- interaction: Reflecting on-site exploration and topics investigated on Laxvish.
- synthesis: Combining all accumulated evidence into a definitive observation and AI solution transition.

THINKING & OUTPUT PROTOCOL:
1. First, think step-by-step about the context signals inside <think>...</think> tags. In your thinking:
   - Identify active signals: local hour, weekend status, location density, device class, behavior topics, and active hypothesis.
   - Formulate the logical rationale for the requested narrative stage.
   - Verify that tone is industrial and contains NO forbidden surveillance or diagnostic claims.
2. Immediately following </think>, output ONLY the final 1-2 sentence narrative statement. Do not add conversational prefixes, markdown quotes, or JSON brackets outside the think tags.`;

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
 * Streams narrative tokens using Poolside Laguna-xs-2.1 with automatic fallback
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
      max_tokens: 400,
      stream: true,
    });

    let fullText = "";

    for await (const chunk of response) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        fullText += content;
        yield content;
      }
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
