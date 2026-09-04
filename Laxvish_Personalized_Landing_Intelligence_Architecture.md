# Laxvish Personalized Landing Intelligence

## Master Architecture + Master Prompt

**Document status:** Architecture specification / implementation brief  
**Product:** Laxvish AI Solutions  
**Scope:** Existing Laxvish marketing landing page; browser-only personalization layer  
**Primary goal:** Make the landing page progressively personalize itself from signals legitimately available to a normal website on an Android browser, while keeping latency extremely low and making the final experience feel like Laxvish understands the visitor and can identify opportunities for AI solutions.

---

# 1. Product Objective

Laxvish is an AI solutions company. The website should not behave like a conventional static agency landing page.

The website should demonstrate Laxvish's core capability:

> **Observe available context → understand patterns → form evidence-backed hypotheses → personalize the experience → identify a likely problem/opportunity → transition into an AI solution.**

The visitor should experience **five personalized narrative moments** as they move through the landing page.

### The five moments

| Text | Primary evidence | Purpose |
|---|---|---|
| Text 1 | Arrival context | Establish immediate relevance from the moment the visitor opens the site |
| Text 2 | Location/environment | Use geographic context and nearby-place intelligence |
| Text 3 | Location/environment + Laxvish solution taxonomy | Convert environment into an AI opportunity/problem hypothesis |
| Text 4 | On-site interaction | Show that Laxvish has noticed what the visitor actually explored |
| Text 5 | Interaction + mobile/technical context + all accumulated evidence | Deliver the strongest personalized observation and lead into an AI solution |

**Important:** The system only knows what the website can legitimately observe or what the user explicitly provides/permits. It must never claim access to browser history, other tabs, other apps, WhatsApp, Instagram, Gmail, existing Android notifications, or other private device data when it does not have that access.

---

# 2. Experience Principles

## 2.1 The page must never wait for intelligence

The existing page must render immediately.

Never block:

- first paint
- hero rendering
- fonts
- core animations
- navigation
- scroll

on:

- GPS
- geocoding
- Places APIs
- model generation
- analytics enrichment
- any remote intelligence request

All intelligence is progressively added after the page is already usable.

## 2.2 Progressive specificity

The first statement should be broad because early evidence is weak.

Later statements can become more specific as confidence increases.

Example progression:

```text
Text 1:
"You're probably here for something specific."

Text 2:
"The environment around you tells us more than a city name ever could."

Text 3:
"Places like these are full of repetitive work AI can remove."

Text 4:
"You've spent more time exploring how AI can reduce work than reading about AI itself."

Text 5:
"The opportunity may not be adding another tool. It may be removing the workflow behind the problem."
```

The exact wording should be generated dynamically, not hard-coded, but the progression should remain.

## 2.3 Evidence before assertion

Every inference should have:

- source observations
- confidence
- contradictory evidence where relevant
- timestamp/freshness

Do not turn weak signals into facts.

Bad:

> "You work in healthcare."

Better:

> "You're in an environment strongly associated with healthcare and you're exploring healthcare automation."

Best internal representation:

```json
{
  "hypothesis": "healthcare_workflow_opportunity",
  "confidence": 0.78,
  "support": [
    "healthcare-heavy nearby environment",
    "healthcare solution section viewed",
    "automation section viewed deeply"
  ],
  "status": "hypothesis"
}
```

## 2.4 Do not over-personalize early

The experience should become more personal only when evidence supports it.

Use confidence tiers:

```text
0.00–0.44  generic
0.45–0.64  contextual
0.65–0.79  specific hypothesis
0.80–1.00  strong evidence-backed personalization
```

These thresholds are initial heuristics and should later be tuned from actual outcomes.

---

# 3. Signal Universe

The context engine has five input families.

```text
ENVIRONMENTAL INTELLIGENCE
BEHAVIORAL INTELLIGENCE
TEMPORAL INTELLIGENCE
TECHNICAL CONTEXT
DIRECT INTELLIGENCE
```

## 3.1 Environmental Intelligence

### Available without precise-location permission

Use server-side request/network information only for approximate geographic context.

Potential signals:

- IP-derived country
- IP-derived region/state
- IP-derived city, where reliable
- approximate coordinates from an IP geolocation provider
- ISP/network/ASN where useful
- timezone correlation

Never represent IP-derived location as exact GPS.

### Available after browser geolocation permission

If the visitor explicitly grants geolocation permission, the site may receive browser geolocation information such as:

- latitude
- longitude
- accuracy
- timestamp
- subsequent position updates if explicitly used and still permitted

Use exact location only when it materially improves the experience.

### Nearby-place intelligence

Use the resolved location to classify the surrounding environment rather than merely dumping nearby business names.

Useful categories:

```text
Healthcare
Education
Business / Offices
Finance
Government
Retail
Hospitality
Transport
Industrial
Residential
Entertainment
Religious / Cultural
```

Calculate:

- nearest representative place by category
- category density
- category diversity
- environment composition
- urban/commercial/educational/healthcare characteristics
- location confidence

Do not infer a person's occupation merely because a place is nearby.

Example:

```json
{
  "environment": {
    "healthcare": 0.91,
    "education": 0.84,
    "business": 0.53,
    "retail": 0.29
  },
  "nearestRepresentative": [
    {"category": "hospital", "distanceM": 210},
    {"category": "medical_college", "distanceM": 340},
    {"category": "pharmacy", "distanceM": 510}
  ]
}
```

### Location confidence ladder

```text
L4: exact browser GPS, very high accuracy
L3: browser GPS, moderate accuracy
L2: IP city/region
L1: IP country/region + timezone
L0: no usable location
```

The engine must reduce geographic specificity as confidence decreases.

---

# 4. Behavioral Intelligence

Behavioral intelligence is limited to activity on Laxvish's own website.

## 4.1 Navigation

Track semantic events, not every raw browser movement.

```text
page_enter
section_enter
section_exit
back_navigation
forward_navigation
external_link_click
```

## 4.2 Reading behavior

```text
section_dwell
reading_depth
scroll_depth
scroll_velocity_bucket
pause
backtrack
repeat_section
rapid_scan
long_read
```

Avoid collecting high-volume raw telemetry unless there is a product reason.

## 4.3 Interaction

```text
cta_click
card_open
accordion_open
search
filter_change
form_start
form_abandon
form_complete
upload_started
upload_completed
```

## 4.4 Direct text on Laxvish

Anything explicitly entered into Laxvish is high-value evidence:

- search query
- user prompt
- feedback
- form answer
- stated problem
- stated objective
- voluntarily entered context

User-provided statements generally deserve more weight than behavioral inference.

---

# 5. Temporal Intelligence

Time is contextual, not a diagnosis.

Track:

- local hour
- local day
- weekday/weekend
- first visit vs returning visit
- session duration
- time since previous visit
- visit frequency
- changes across sessions
- time-of-day preference

Useful examples:

```text
late_evening
night_session
weekend_session
high_repeat_frequency
recent_return
```

Do not infer health or psychological diagnoses from timing alone.

---

# 6. Technical Context

The technical layer exists primarily for contextual adaptation and experience optimization.

Potential signals:

- mobile / tablet / desktop
- Android/platform
- browser family/version when exposed
- viewport
- screen size
- pixel ratio
- touch capability
- connection information where supported
- browser capability support
- reduced-motion preference
- color-scheme preference
- language
- timezone

Use device information to answer things such as:

- how to render the experience
- whether mobile-specific interactions are suitable
- whether a connection is likely to require lighter assets
- how aggressively to animate

Do **not** use phone model or Android version as direct proof of personality traits.

---

# 7. Direct Intelligence

Direct intelligence is the strongest non-location source because the user explicitly gives information to Laxvish.

Possible sources:

- text typed into Laxvish
- voice input after microphone permission
- camera input after camera permission
- user-selected files
- user-selected screen sharing
- explicit answers
- explicit preferences

Examples:

```text
"How can AI reduce paperwork?"
"I need to automate our support team."
"I am trying to build a hospital workflow."
```

These are strong signals because they are direct statements, not inferred behavior.

---

# 8. What the Website Cannot Access

The website-only architecture must explicitly reject assumptions that would require privileged access.

A normal website must NOT claim it can see:

```text
Chrome history
Google search history
other open tab URLs
Instagram activity
WhatsApp activity/messages
Gmail contents
Android notification history
other app usage
other apps' private data
saved browser passwords
arbitrary phone files
phone call history
SMS database
all installed apps
what the visitor is doing elsewhere on the phone
```

This is a hard architectural boundary.

If a future product adds an app, extension, or explicit third-party integration, that must become a separate capability with its own permission model and product disclosure.

---

# 9. Context Graph

Do not create a flat `user_profile` containing speculative claims.

Create a compact **Laxvish Context Graph**.

```text
USER / SESSION
│
├── WHERE
│   ├── location source
│   ├── accuracy
│   ├── city / region
│   ├── neighborhood when supported
│   ├── nearby representative places
│   └── environment classification
│
├── WHEN
│   ├── local time
│   ├── weekday
│   ├── session timing
│   ├── return frequency
│   └── temporal changes
│
├── DEVICE
│   ├── platform
│   ├── browser
│   ├── device class
│   ├── viewport
│   ├── connection
│   └── capabilities
│
├── BEHAVIOR
│   ├── sections viewed
│   ├── dwell
│   ├── scroll
│   ├── navigation
│   ├── clicks
│   ├── searches
│   └── choices
│
├── DIRECT
│   ├── typed text
│   ├── voice
│   ├── files
│   └── explicit answers
│
└── INFERENCE
    ├── interests
    ├── context hypotheses
    ├── problem hypotheses
    ├── solution opportunities
    ├── confidence
    └── supporting evidence
```

---

# 10. Event Architecture

## 10.1 Client event shape

Keep events compact.

```ts
export type LaxvishEvent = {
  id: string;
  sessionId: string;
  type: string;
  timestamp: number;
  section?: string;
  value?: string | number | boolean;
  metadata?: Record<string, unknown>;
};
```

Examples:

```json
{
  "id": "evt_123",
  "sessionId": "sess_456",
  "type": "section_dwell",
  "timestamp": 1788512360000,
  "section": "healthcare",
  "value": 46
}
```

## 10.2 Never stream raw scroll events continuously

Bad:

```text
scroll
scroll
scroll
scroll
scroll
scroll
```

Better:

```text
local event aggregation
        ↓
1–2 second buffer
        ↓
semantic feature summary
        ↓
small network payload
```

Important events may be transmitted immediately.

---

# 11. Feature Extraction

Raw events should be converted into compact features.

Example:

```json
{
  "attention": 0.86,
  "readingDepth": 0.81,
  "backtracking": 0.31,
  "repeatInterest": 0.68,
  "topicInterest": {
    "healthcare": 0.81,
    "automation": 0.79,
    "AI": 0.74
  }
}
```

Feature calculations should be deterministic and cheap where possible.

Examples:

```text
dwell score
reading completion score
return score
repeat-section score
comparison score
exploration score
CTA intent score
content-topic interest
```

Do not invoke an LLM for basic feature extraction.

---

# 12. Problem Detection

Laxvish should maintain **ranked hypotheses**, not absolute claims.

## Example problem taxonomy

### Business

```text
customer acquisition
sales bottleneck
support workload
operations overhead
cash-flow uncertainty
workflow fragmentation
knowledge fragmentation
execution friction
```

### Healthcare

```text
documentation burden
workflow automation opportunity
patient communication burden
information fragmentation
administrative overhead
```

### Education

```text
administrative workload
student support workload
content generation
knowledge retrieval
workflow fragmentation
```

### General

```text
decision uncertainty
information overload
manual work
process inefficiency
productivity friction
planning difficulty
```

This ontology should expand based on actual Laxvish solution capabilities.

---

# 13. Evidence Scoring

Use deterministic scoring before invoking a large model.

Example:

```text
problem_score =
    explicit_signal_weight
  + repeated_behavior_weight
  + topic_interest_weight
  + environment_weight
  + temporal_context_weight
  + solution_fit_weight
  - contradiction_penalty
  - uncertainty_penalty
```

Recommended priority:

```text
Explicit user statement         strongest
Repeated on-site behavior       very strong
Multiple correlated signals     strong
Environment                     contextual
Temporal                        contextual
Technical/device signals        weak
Single isolated action          very weak
```

Never let a single weak signal dominate.

---

# 14. Solution Matching

Laxvish is an AI solutions company, so problem detection is only half the job.

Create a mapping:

```text
problem
  ↓
solution capability
  ↓
AI pattern
  ↓
Laxvish solution story
```

Examples:

```text
workflow fragmentation
    → workflow automation
    → agentic workflow / orchestration

knowledge fragmentation
    → knowledge assistant
    → retrieval + AI reasoning

documentation burden
    → document intelligence
    → extraction + summarization + structured output

support workload
    → AI support agent
    → retrieval + actions + escalation

manual data entry
    → document/process automation
    → extraction + validation + workflow
```

The matcher should return the top few capabilities that fit the evidence.

---

# 15. Five-Text Narrative Engine

## Text 1 — Arrival

### Inputs

- local time
- weekday
- timezone
- region/city if reasonably available
- mobile/device context
- new vs returning
- initial session metadata

### Goal

Create immediate recognition without overclaiming.

### Example styles

```text
"You probably came here looking for something specific."

"You're giving us a few seconds. Let's make them useful."

"Before you tell us what you need, let's see what we can understand."
```

Text 1 should start generating immediately.

---

## Text 2 — Environment

### Inputs

- GPS if granted
- otherwise IP-derived location
- nearby-place intelligence
- environment classification
- geographic confidence

### Goal

Reveal an environmental observation.

Example:

```text
"You're surrounded by an unusually strong healthcare and education ecosystem."
```

Do not claim the person's profession.

---

## Text 3 — Environment → AI opportunity

### Inputs

- Text 2 environment model
- nearby category density
- Laxvish solution taxonomy

### Goal

Connect surroundings to real-world AI opportunities.

Example:

```text
"That kind of environment contains more repetitive work than most people ever notice."
```

or:

```text
"The opportunity isn't the buildings around you. It's the work happening inside them."
```

The exact statement should depend on confidence and the Laxvish solution catalog.

---

## Text 4 — Interaction

### Inputs

- sections visited
- dwell time
- scroll behavior
- repeated sections
- clicks
- search queries on Laxvish
- CTA choices

### Goal

Show the user that the site noticed their actual interests.

Example:

```text
"You've spent more time exploring what AI can actually change than reading about AI itself."
```

This should only be shown when there is enough evidence.

---

## Text 5 — Final synthesis

### Inputs

Everything relevant accumulated so far:

- environment
- time
- technical context
- behavior
- direct input
- top hypotheses
- solution matches
- confidence

### Goal

Make one high-quality personalized observation and transition into Laxvish's AI solution capability.

Example:

```text
"The strongest signal isn't that you're interested in AI. You're looking for a way to remove work that is consuming attention it shouldn't require."
```

Then transition into the solution CTA.

---

# 16. Scroll Orchestration

The visitor should experience the text as they scroll.

Suggested state machine:

```text
N0  arrival
N1  environment
N2  environment opportunity
N3  interaction
N4  final synthesis
N5  solution CTA
```

Approximate triggers:

```text
0–15%   → Text 1
20–40%  → Text 2
40–60%  → Text 3
60–80%  → Text 4
80–95%  → Text 5
95%+    → solution CTA
```

Do not use percentage alone.

A narrative transition should require:

```text
scroll milestone
AND
minimum evidence
AND
minimum confidence
AND
text not already generated
```

---

# 17. Predictive Generation

The website should generate future text **before the visitor reaches the relevant section**.

Example:

```text
Visitor is reading Text 1
        ↓
Environment query already running
        ↓
Text 2 + Text 3 context prepared
        ↓
LLM generation begins / is prefetched
        ↓
Visitor reaches Text 2
        ↓
Text is already available or streaming
```

Then:

```text
Visitor approaches Text 4
        ↓
Interaction features are ready
        ↓
Generate Text 4
        ↓
Visitor sees it immediately
```

This is the core low-latency optimization.

---

# 18. LLM Architecture

Do not use one large LLM call on every event.

Use three levels.

## Level A — deterministic

No LLM.

Used for:

- device parsing
- session state
- scroll aggregation
- dwell calculations
- topic counters
- location confidence
- environment category scoring
- basic problem scoring

## Level B — small/fast model

Used for:

- semantic classification
- topic normalization
- search intent extraction
- turning compact features into hypotheses
- compressing direct user text into structured evidence

## Level C — strongest model

Used for:

- final cross-signal reasoning
- synthesis
- personalized narrative
- solution framing

The strongest model should operate on a **small structured context object**, not raw telemetry.

---

# 19. LLM Context Object

Example:

```json
{
  "visitor": {
    "returning": false
  },
  "environment": {
    "locationSource": "gps",
    "locationConfidence": 0.95,
    "city": "Jaipur",
    "categories": {
      "healthcare": 0.91,
      "education": 0.84,
      "business": 0.53
    }
  },
  "temporal": {
    "localHour": 21,
    "weekday": "Friday",
    "sessionSeconds": 184
  },
  "technical": {
    "platform": "Android",
    "deviceClass": "mobile",
    "browser": "Chrome"
  },
  "behavior": {
    "attention": 0.86,
    "readingDepth": 0.81,
    "topics": {
      "healthcareAI": 0.89,
      "automation": 0.83
    }
  },
  "direct": {
    "queries": [
      "how can AI reduce paperwork"
    ]
  },
  "hypotheses": [
    {
      "problem": "workflow_automation",
      "confidence": 0.91
    }
  ],
  "solutionCandidates": [
    "workflow automation",
    "document intelligence",
    "AI operations assistant"
  ],
  "narrativeStage": "final_synthesis"
}
```

---

# 20. LLM Master System Prompt

Use the following as the base system prompt for the Laxvish narrative/reasoning model.

```text
You are the Laxvish Context Reasoner.

Laxvish is an AI solutions company. The website is demonstrating Laxvish's ability to understand available context, identify likely opportunities/problems, and connect them to practical AI solutions.

Your job is NOT to pretend that you have access to private information that a normal website cannot access.

You must reason only from the context object provided to you.

CORE PRINCIPLES

1. OBSERVATION IS NOT INFERENCE.
   Treat raw observations as evidence.
   Treat hypotheses as hypotheses.
   Never present an inference as a confirmed fact unless the user explicitly stated it.

2. DO NOT INVENT ACCESS.
   The website may not know browser history, Google search history, other tabs, other apps, WhatsApp, Instagram, Gmail, Android notification contents, private files, call history, or other device activity unless that information is explicitly present in the supplied context through a legitimate user-authorized mechanism.

3. USE CONFIDENCE.
   Every personalized claim must be justified by the evidence and confidence supplied.
   If confidence is weak, use softer language.
   If confidence is high, be more specific.

4. USE MULTIPLE SIGNALS.
   Prefer repeated and correlated signals over isolated events.
   Explicit user statements are stronger than behavioral guesses.
   Behavioral evidence is stronger than generic technical/device signals.
   Location is environmental context, not proof of occupation or identity.

5. NEVER OVERCLAIM LOCATION.
   A nearby hospital does not prove that a person works there.
   A university nearby does not prove that the person studies there.
   Describe environmental patterns rather than assigning identities without evidence.

6. DO NOT DIAGNOSE.
   Do not infer medical diagnoses, psychiatric conditions, criminal behavior, or other high-stakes attributes from weak behavioral signals.
   Avoid labels such as depressed, anxious, addicted, sick, or mentally ill unless the user explicitly states such information and it is appropriate for the interaction.

7. PERSONALIZATION SHOULD FEEL DISCOVERED, NOT SURVEILLANCE-LIKE.
   Write as if Laxvish is making a useful observation from the visitor's interaction with the experience.
   Do not enumerate hidden telemetry.
   Do not say things like "we tracked your scroll speed" unless the product explicitly chooses to disclose that mechanism.

8. LAXVISH IS SELLING AI SOLUTIONS.
   Move naturally from context → possible problem → AI opportunity.
   Do not make the experience feel like a generic analytics dashboard.
   The visitor should feel that Laxvish can recognize an opportunity and do something useful about it.

9. ONE STRONG IDEA PER TEXT.
   Each narrative text should communicate one clear idea.
   Avoid long explanations.
   Avoid generic marketing filler.
   Avoid buzzword-heavy language.

10. BE CREATIVE BUT EVIDENCE-BOUND.
    The writing can be cinematic, intelligent, confident, and distinctive.
    Creativity may change the wording, not the underlying facts.

NARRATIVE ROLES

TEXT 1 = ARRIVAL
Use immediate context such as local time, device class, session state, and broad location when available. Do not claim to know the user's problem yet.

TEXT 2 = ENVIRONMENT
Use location and nearby-place/environment classification. Describe the surrounding context, not an assumed occupation.

TEXT 3 = OPPORTUNITY
Translate the environmental context into plausible areas where AI can remove repetitive work or create leverage. Match the Laxvish solution taxonomy.

TEXT 4 = INTERACTION
Use only behavior that happened on the Laxvish website. Show that the site has understood what the visitor explored or prioritized.

TEXT 5 = SYNTHESIS
Combine the strongest available evidence and produce one useful observation about the likely problem/opportunity, then transition toward a concrete Laxvish AI solution.

STYLE

- concise
- cinematic
- intelligent
- calm
- human
- specific
- confident without pretending certainty
- never creepy
- never generic
- never corporate filler

When confidence is moderate, prefer:
"It looks like..."
"You seem to be..."
"The stronger signal may be..."
"There may be an opportunity here..."

When confidence is high and evidence is explicit, stronger language is acceptable.

OUTPUT RULES

Return valid JSON.

For one text:
{
  "text": "...",
  "confidence": 0.00,
  "evidenceUsed": ["...", "..."],
  "problemHypothesis": "...",
  "solutionCandidate": "..."
}

For multiple prefetch texts:
{
  "texts": [
    {
      "id": "text1",
      "text": "...",
      "confidence": 0.00,
      "evidenceUsed": ["..."],
      "problemHypothesis": "...",
      "solutionCandidate": "..."
    }
  ]
}

Never include unsupported facts.
Never reveal private telemetry details unless explicitly instructed by the product experience.
Never claim certainty when the evidence does not justify it.
```

---

# 21. Frontend Integration

The existing landing page should require minimal modification.

Recommended client modules:

```text
src/lib/laxvish-context/
├── client.ts
├── session.ts
├── events.ts
├── scroll.ts
├── behavior.ts
├── environment.ts
├── technical.ts
├── permissions.ts
├── buffer.ts
└── types.ts
```

Narrative UI:

```text
src/components/laxvish-narrative/
├── NarrativeLayer.tsx
├── NarrativeText.tsx
├── NarrativeSection.tsx
├── useNarrative.ts
├── useScrollNarrative.ts
└── types.ts
```

The existing design should remain the visual authority. The intelligence layer should plug into existing components instead of forcing a redesign.

---

# 22. API Surface

Minimal backend API:

```text
POST /api/context/init
POST /api/context/events
POST /api/context/location
POST /api/context/resolve
GET  /api/narrative/stream
```

Alternative single endpoint design is acceptable if it simplifies the current backend.

## `/api/context/init`

Creates/updates the session and accepts instant client context.

## `/api/context/events`

Receives compact batches of semantic events/features.

## `/api/context/location`

Accepts browser geolocation after permission and starts/loads environment enrichment.

## `/api/context/resolve`

Returns the current compact context snapshot.

## `/api/narrative/stream`

Starts or resumes an LLM generation for the requested narrative stage and streams the output to the browser.

Use SSE for one-way token/event streaming unless the existing stack has a strong WebSocket reason.

---

# 23. Low-Latency Strategy

## Objective

The landing page should feel immediate even when the intelligence backend is slow.

### Rule 1 — render first

```text
HTML
 ↓
CSS
 ↓
Hero
 ↓
Animation
 ↓
context SDK
```

Never invert this.

### Rule 2 — parallelize

At page load, run in parallel:

```text
client context
IP enrichment
session initialization
behavior collection
asset loading
```

### Rule 3 — precompute

Before a narrative stage is visible, prepare the context required for the next stage.

### Rule 4 — cache aggressively

Cache:

- IP geolocation
- reusable environment classifications where permitted
- session feature snapshots
- already generated narrative stages
- solution taxonomy

Respect third-party provider licensing, retention, attribution, and caching rules.

### Rule 5 — small payloads

Do not send raw event streams.

Prefer:

```json
{
  "topicInterest": {
    "healthcare": 0.81,
    "automation": 0.79
  },
  "attention": 0.86,
  "readingDepth": 0.81
}
```

over hundreds of raw events.

### Rule 6 — stream only meaningful text

Once a section is ready, stream its text immediately instead of waiting for a full response object when your frontend renderer supports structured incremental output.

---

# 24. Perceived-Latency Timeline

Target experience:

```text
T+0ms
page begins rendering

T+50–150ms
instant technical/temporal context available

T+100–500ms
initial session/context request

T+300ms+
Text 1 generation can begin

During Text 1
IP/location/environment work proceeds in parallel

When GPS is granted
location enrichment starts immediately

As visitor scrolls
behavior features update locally

Before Text 2 is visible
Text 2/3 context is prepared

Before Text 4 is visible
interaction features are converted into hypotheses

Final stage
Text 5 receives the strongest accumulated context and streams
```

Actual timings depend on model/provider, network, and deployment region. The architecture should optimize **perceived latency**, not depend on an unrealistic fixed backend response time.

---

# 25. Recommended Data Model

For v1, PostgreSQL is sufficient. Do not introduce a graph database unless later scale or query requirements justify it.

Suggested entities:

```text
sessions
session_events
context_snapshots
features
hypotheses
solution_candidates
narrative_generations
narrative_states
```

## sessions

```text
id
anonymous_visitor_id
started_at
last_seen_at
source
```

## session_events

```text
id
session_id
type
timestamp
section
value
metadata
```

## context_snapshots

```text
id
session_id
created_at
environment_json
behavior_json
temporal_json
technical_json
direct_json
```

## hypotheses

```text
id
session_id
problem
confidence
supporting_evidence_json
contradicting_evidence_json
created_at
updated_at
```

## narrative_generations

```text
id
session_id
stage
prompt_version
model
started_at
completed_at
text
confidence
evidence_json
```

---

# 26. Anonymous-First Design

A first-time visitor does not need an account.

Use an anonymous session identifier and only persist the minimum information required for the website experience.

The architecture should support:

```text
anonymous session
        ↓
returning anonymous visitor
        ↓
optional account
        ↓
longitudinal context
```

Do not require login merely to personalize the first landing-page session.

---

# 27. Privacy / Safety Guardrails

The product should maintain an internal distinction between:

```text
Observed
Inferred
Explicit
Permissioned
Unknown
```

Every claim shown to a user should have a source category.

### Do not infer from weak signals

Avoid using:

- device model as a personality predictor
- Android version as proof of lifestyle
- nearby location as proof of occupation
- late-night browsing as proof of insomnia
- scrolling as proof of psychological state
- one page view as proof of intent

### Avoid sensitive profiling

Do not attempt to infer sensitive or high-stakes attributes from weak signals, including:

- medical diagnoses
- mental-health diagnoses
- disability
- financial distress as a fact
- political affiliation
- religion
- sexuality
- criminality

When sensitive context is directly volunteered by the user, handle it according to the product's actual purpose, applicable laws/policies, and data-minimization requirements.

---

# 28. Environment Intelligence Algorithm

A practical v1 pipeline:

```text
LOCATION INPUT
      ↓
normalize coordinates
      ↓
attach accuracy/confidence
      ↓
resolve city/region if useful
      ↓
query a limited set of nearby categories
      ↓
normalize returned places
      ↓
calculate distance
      ↓
calculate category density
      ↓
calculate environment composition
      ↓
write compact environment profile
```

### Category scoring

One possible initial formula:

```text
category_score =
    normalized_density * 0.50
  + proximity_score * 0.30
  + representative_place_strength * 0.20
```

This is only an initial heuristic. Real-world calibration should eventually use observed conversion/feedback data.

---

# 29. Behavior Intelligence Algorithm

A practical v1 pipeline:

```text
RAW EVENTS
   ↓
semantic aggregation
   ↓
section-level metrics
   ↓
topic mapping
   ↓
behavioral feature vector
   ↓
problem candidate scoring
```

### Example

```json
{
  "sectionInterest": {
    "healthcare": 0.83,
    "automation": 0.79
  },
  "attention": 0.87,
  "readingDepth": 0.76,
  "backtracking": 0.31,
  "decisionBehavior": 0.64,
  "ctaIntent": 0.81
}
```

---

# 30. Context Fusion

When combining signal families, use weighted evidence.

Example:

```text
EXPLICIT USER INPUT        1.00
REPEATED ON-SITE BEHAVIOR  0.85
MULTI-SIGNAL PATTERN       0.75
ENVIRONMENT                0.55
TEMPORAL                   0.30
TECHNICAL                  0.15
```

These are starting weights, not scientific truths. Tune them through real evaluation.

Conceptual fusion:

```text
hypothesis_confidence =
    weighted_support
    - contradiction
    - missing_evidence_penalty
```

Then cap confidence when the evidence is indirect.

---

# 31. Example End-to-End Case

Suppose a visitor opens Laxvish on an Android phone.

### Immediate context

```text
Android
Chrome
mobile
Friday
21:14
India
new visitor
```

### Location permission granted

```text
GPS accuracy: 28m
```

Nearby environment:

```text
medical college     310m
hospital             420m
pharmacy             510m
university           890m
office complex       1.2km
```

Environment model:

```text
healthcare 0.91
education  0.84
business   0.53
```

### On Laxvish

```text
healthcare section     46 sec
automation section     71 sec
healthcare case study  opened
AI solution section    opened
```

Behavior model:

```text
healthcare_interest 0.89
automation_interest 0.83
CTA intent           0.76
```

### Direct input

```text
"How can AI reduce paperwork?"
```

Direct intent:

```text
workflow_automation 0.97
```

### Final fused model

```text
healthcare environment       0.91
healthcare interest          0.89
automation interest           0.83
workflow problem             0.91
explicit intent               0.97
```

### Website behavior

Text 1:

> You're probably here for something specific.

Text 2:

> You're in a healthcare-and-education-heavy environment.

Text 3:

> Places like these are full of repetitive work AI can quietly remove.

Text 4:

> You've spent more time exploring how to remove work than exploring AI itself.

Text 5:

> The strongest signal is surprisingly practical: you're not looking for AI. You're looking for a way to make the work disappear.

Then:

> **Show us the workflow. We'll show you what AI can take over.**

Notice what the system did **not** say:

> "You work at the hospital 420m away."

It does not know that.

---

# 32. Failure Modes

## Failure: no GPS permission

Fallback:

```text
GPS
 ↓
IP location
 ↓
timezone
 ↓
generic narrative
```

Do not repeatedly pressure the visitor to enable location.

## Failure: Places API slow

Use:

```text
cached environment
or
IP-level environment
or
generic Text 2
```

Do not block the page.

## Failure: LLM slow

Display a predefined or template-driven contextual statement while the final generation is prepared.

## Failure: insufficient behavioral evidence

Keep Text 4 generic or omit a strong personal claim.

## Failure: contradictory evidence

Reduce confidence.

Example:

```text
User heavily views healthcare content
but explicitly says:
"I'm not looking for anything healthcare-related."
```

The explicit statement should dominate the inference.

## Failure: model hallucination

Reject any output that introduces facts not present in the context object.

---

# 33. Output Validation

Every generated narrative should pass a lightweight validation layer before display.

Validate:

```text
Does the statement contain unsupported facts?
Does it claim access to inaccessible data?
Does it state an inference as a fact?
Does it expose raw tracking details unnecessarily?
Does it contain a medical/psychological diagnosis?
Does it make an unsupported location claim?
Does it fit the current narrative stage?
Is it concise enough?
```

If validation fails:

```text
LLM output
   ↓
validator
   ↓
fail
   ↓
fallback template / regenerate
```

---

# 34. Performance Budgets

Suggested starting budgets:

```text
Base context SDK:         <= 20 KB compressed target
Critical landing JS:      unchanged as much as possible
Behavior event payload:   tiny batched payloads
Initial context request:  one request
Environment enrichment:  one logical pipeline
LLM generation:           only at narrative milestones
```

The precise budgets should be measured against the existing site's bundle size and performance profile.

---

# 35. Recommended Implementation Order

## Phase 1 — Instrumentation

Build:

```text
session
technical context
local time
scroll tracking
section tracking
click tracking
search tracking
```

No LLM yet.

## Phase 2 — Context API

Build:

```text
/context/init
/context/events
```

Add feature extraction.

## Phase 3 — Location

Build:

```text
IP enrichment
GPS permission flow
location normalization
environment classification
```

## Phase 4 — Problem/Solution Engine

Build:

```text
feature vector
problem ontology
problem scores
solution matcher
```

## Phase 5 — Narrative Engine

Implement five narrative stages and scroll orchestration.

## Phase 6 — LLM

Add:

```text
small classifier
strong synthesis model
SSE streaming
output validator
```

## Phase 7 — Prediction

Prefetch the next narrative stage and cache generation results.

## Phase 8 — Calibration

Measure:

```text
engagement
scroll completion
CTA clicks
solution CTA clicks
user correction
"was this accurate?" feedback
conversion
```

Use these outcomes to improve inference weights and prompts.

---

# 36. Developer Acceptance Criteria

The implementation is complete when:

### Rendering

- The existing landing page renders immediately without waiting for intelligence.
- Intelligence failures never break the marketing page.

### Context

- A first-party session is created quickly.
- Technical and temporal context is available early.
- Location is optional and permission-based for exact coordinates.
- IP-derived context is clearly represented as approximate.

### Behavior

- Meaningful interactions are recorded.
- Raw scroll/mouse noise is aggregated.
- The system can calculate section interest and attention features.

### Environment

- Nearby-place enrichment is asynchronous.
- The system produces category-level environment context.
- Geographic confidence is tracked.
- The system never claims nearby location proves occupation.

### Narrative

- Exactly five major personalized text moments exist.
- Text 1 can start without waiting for GPS.
- Text 2/3 use environment where available.
- Text 4 uses only interaction with Laxvish.
- Text 5 combines accumulated evidence.
- Narrative text changes as confidence increases.

### LLM

- The model receives compact structured context.
- No raw browser surveillance claims are invented.
- Output is streamed to the browser.
- Unsupported claims are rejected or regenerated.

### Latency

- No intelligence call blocks first paint.
- Next-stage generation can be prefetched.
- Telemetry is batched.
- Environment/LLM failures degrade gracefully.

---

# 37. Master Prompt for the Coding Agent

Use the following prompt as the implementation brief for the CLI coding agent working against the existing Laxvish website.

```text
You are the lead engineer responsible for integrating a lightweight, low-latency personalization intelligence layer into the EXISTING Laxvish landing page.

DO NOT redesign the website from scratch.
DO NOT replace the existing design system.
DO NOT rewrite unrelated components.
DO NOT introduce a large analytics platform just for this feature.

The existing Laxvish landing page already exists and is visually approved. Your job is to add a compact browser Context Engine + Narrative Engine that makes the existing landing page progressively personalized.

PRODUCT CONTEXT

Laxvish is an AI solutions company. We use AI/LLMs to solve real-world problems. The website should demonstrate this capability through the visitor experience itself.

The target experience is:

USER OPENS LAXVISH
    ↓
PAGE RENDERS IMMEDIATELY
    ↓
COLLECT LEGITIMATE WEBSITE CONTEXT IN PARALLEL
    ↓
BUILD A COMPACT CONTEXT MODEL
    ↓
IDENTIFY ENVIRONMENT + INTERACTION SIGNALS
    ↓
GENERATE 5 NARRATIVE TEXT MOMENTS
    ↓
REVEAL THEM AS THE VISITOR SCROLLS
    ↓
STREAM THE FINAL PERSONALISED TEXT FROM AN LLM
    ↓
CONNECT THE INSIGHT TO A LAXVISH AI SOLUTION

IMPORTANT PRIVACY/ACCESS BOUNDARY

This is a NORMAL WEBSITE running in a normal browser on Android.

You may use only information actually available to a normal webpage, plus information explicitly provided or permissioned by the user.

NEVER assume access to:
- browser history
- Google search history
- other browser tabs
- Instagram
- WhatsApp
- Gmail
- Android notifications
- other apps
- phone call history
- SMS database
- private files without user selection
- other applications' private data
- hidden device activity

Do not implement hacks, exploits, covert tracking, or permission bypasses.

WHAT THE WEBSITE CAN USE

1. Environmental Intelligence
- IP-derived approximate location
- browser geolocation after explicit permission
- latitude / longitude / accuracy when granted
- nearby place/environment enrichment through an appropriate Places/geospatial provider
- category density and representative nearby places
- city/region/neighborhood where justified by the location confidence

2. Behavioral Intelligence — ONLY ON THE LAXVISH WEBSITE
- section views
- section dwell
- scroll depth
- scroll behavior summaries
- reading depth
- backtracking
- repeated sections
- CTA clicks
- navigation
- search queries entered on Laxvish
- form interactions
- explicit choices
- voluntarily entered text

3. Temporal Intelligence
- local hour
- weekday/weekend
- session duration
- first/repeat visit
- return frequency
- session timing

4. Technical Context
- Android/platform when exposed
- browser when exposed
- mobile/tablet/desktop
- viewport
- screen characteristics
- touch capability
- connection information where supported
- supported browser capabilities
- language
- timezone
- accessibility/display preferences

5. Direct Intelligence
- text entered into Laxvish
- voice only after microphone permission
- camera only after camera permission
- files the user explicitly selects
- anything else the user explicitly provides

CORE ARCHITECTURE

Create a very small client-side package/module called something equivalent to:

@laxvish/context

It should be lightweight and asynchronous.

Target: approximately <=20 KB compressed for the base collector where practical.

The base client should:
- initialize a session
- collect technical context
- collect temporal context
- capture semantic behavior events
- batch noisy events
- send compact features to the backend
- expose current context to the narrative UI

DO NOT put the LLM key or third-party secret in the browser.
All model calls must happen server-side.

EVENT DESIGN

Use semantic events, not raw high-frequency telemetry.

Recommended event types:
- page_enter
- section_enter
- section_exit
- section_dwell
- scroll_milestone
- backtrack
- repeat_section
- cta_click
- search
- form_start
- form_abandon
- form_complete
- upload_start
- upload_complete
- visibility_change
- permission_result

Aggregate scroll/visibility noise locally.
Send important events immediately and normal events in small batches.

CONTEXT MODEL

Create a compact context object with:

visitor
where
when
device
behavior
direct
hypotheses
solutions
narrativeStage

Separate:
- observation
- explicit statement
- inference
- unknown

Never collapse them into one fact field.

ENVIRONMENT ENGINE

When exact browser geolocation is not available:
- use IP-derived approximate location if available
- mark the source and confidence

When exact geolocation is granted:
- resolve coordinates
- retain accuracy
- query a limited set of nearby place categories
- normalize places
- calculate distances
- derive environment composition

Do NOT simply return the 5 closest raw places.
Create a category-level environment model.

Recommended categories:
Healthcare
Education
Business
Finance
Government
Retail
Transport
Hospitality
Industrial
Residential
Entertainment
Religious/Cultural

Output example:

{
  "locationConfidence": 0.95,
  "environment": {
    "healthcare": 0.91,
    "education": 0.84,
    "business": 0.53
  },
  "nearestRepresentative": [
    {"category":"hospital","distanceM":210},
    {"category":"medical_college","distanceM":340}
  ]
}

Do not claim a nearby place proves the visitor works/studies there.

PROBLEM ENGINE

Build a small problem ontology aligned with Laxvish's real AI solution capabilities.

Example categories:
- workflow automation
- documentation burden
- support workload
- operational overhead
- knowledge fragmentation
- manual data entry
- decision uncertainty
- information overload
- customer acquisition
- sales bottleneck
- healthcare workflow
- education workflow

Use weighted evidence.

Priority of evidence:
1. explicit user statement
2. repeated behavior on Laxvish
3. correlated multi-signal behavior
4. environment
5. temporal context
6. technical/device context
7. single weak event

Create ranked hypotheses with confidence.

Never output a diagnosis or unsupported personal claim.

SOLUTION MATCHER

Map problem hypotheses to Laxvish solution capabilities.
Examples:

workflow fragmentation → AI workflow automation
knowledge fragmentation → AI knowledge system / assistant
documentation burden → document intelligence
support workload → AI support agent
manual data entry → document/process automation

The final narrative must naturally lead toward a real Laxvish AI solution.

FIVE-TEXT NARRATIVE SYSTEM

There are exactly five primary personalized narrative moments on the landing page.

TEXT 1 — ARRIVAL
Inputs:
- local time
- weekday
- timezone
- broad geographic context
- mobile context
- new/repeat visitor

Purpose:
Create recognition without pretending to know the problem.

TEXT 2 — ENVIRONMENT
Inputs:
- GPS if granted
- otherwise IP-derived context
- nearby place/environment model

Purpose:
Reveal something about the visitor's surrounding environment.

TEXT 3 — ENVIRONMENT → AI OPPORTUNITY
Inputs:
- environment classification
- nearby category structure
- Laxvish solution taxonomy

Purpose:
Connect environment to potential AI leverage/opportunity.

TEXT 4 — INTERACTION
Inputs:
- Laxvish section interest
- dwell
- reading depth
- backtracking
- clicks
- search queries on Laxvish
- choices

Purpose:
Show that Laxvish understands what the visitor actually explored on the site.

TEXT 5 — FINAL SYNTHESIS
Inputs:
- environment
- temporal context
- technical context
- behavior
- direct input
- hypotheses
- solution candidates

Purpose:
Make one strongest personalized observation and transition into a concrete Laxvish AI solution.

SCROLL BEHAVIOR

The page already exists. Integrate into the existing scroll structure.
Do not redesign the page just to support this.

Use narrative states:
N0 arrival
N1 environment
N2 opportunity
N3 interaction
N4 synthesis
N5 solution CTA

Trigger based on:
- scroll milestone
- evidence readiness
- confidence

Do not rely only on scroll percentage.

PREFETCHING

This feature must feel instant.

While Text 1 is being shown:
- environment processing should already be running
- Text 2/3 context should be prepared

Before the visitor reaches Text 4:
- behavior features should be aggregated
- problem candidates should be calculated

Before the final section:
- final context should be ready
- final LLM generation should be started when enough evidence exists

Never wait until the user reaches a section to BEGIN work that could have started earlier.

LLM ARCHITECTURE

Use:

LEVEL A — deterministic calculations
- session
- technical context
- scroll/reading features
- basic topic scores
- location confidence
- environment scoring

LEVEL B — fast model where necessary
- semantic classification
- intent extraction
- evidence compression
- topic normalization

LEVEL C — strongest model
- final cross-signal reasoning
- final narrative generation
- solution framing

Do not invoke the strongest model on every scroll event.

LLM OUTPUT

The model must receive a compact context object, not raw telemetry.

The model must:
- stay evidence-bound
- distinguish observation from inference
- use confidence
- avoid unsupported location claims
- avoid private-access claims
- avoid medical/psychological diagnosis
- produce concise text
- maintain a premium, cinematic, intelligent Laxvish voice

MASTER LLM PROMPT

Use this system instruction for the narrative model:

"You are the Laxvish Context Reasoner.

Laxvish is an AI solutions company demonstrating its ability to understand available context, identify likely problems/opportunities, and connect them to practical AI solutions.

Use only the supplied context.
Never claim access to browser history, other tabs, other apps, WhatsApp, Instagram, Gmail, notifications, private device data, or other inaccessible information.

Separate observations from hypotheses.
Treat explicit user statements as stronger evidence than weak behavioral signals.
Treat location as environmental context, not proof of occupation.
Use confidence.
Never turn a weak signal into certainty.
Never diagnose.
Never invent facts.

The narrative has five stages:
1. arrival
2. environment
3. environment-to-opportunity
4. interaction
5. final synthesis

The final synthesis should naturally lead to an AI solution that Laxvish can plausibly build.

Writing style:
concise, cinematic, calm, intelligent, human, specific, confident but evidence-bound, never creepy, never generic.

One strong idea per text.

Return structured JSON with:
text
confidence
evidenceUsed
problemHypothesis
solutionCandidate"

STREAMING

Use SSE unless there is a strong existing WebSocket architecture reason.

The user should see the final text stream token-by-token or chunk-by-chunk.

If the LLM is delayed, use a fallback contextual sentence rather than blocking the page.

OUTPUT VALIDATION

Before displaying generated text, validate:
- unsupported factual claims
- inaccessible-data claims
- overconfident inferences
- unsupported occupation claims
- unnecessary raw telemetry references
- sensitive/high-stakes inference
- narrative stage mismatch
- excessive length

If invalid:
- regenerate with corrective instruction, or
- use a safe fallback template

PERFORMANCE

Goals:
- zero blocking first paint
- minimal client bundle
- one initial context request
- batched behavior telemetry
- asynchronous environment enrichment
- predictable narrative states
- prefetch next text
- server-side model calls
- graceful degradation on all failures

IMPLEMENTATION QUALITY

Before changing code:
1. inspect the existing Laxvish site architecture
2. identify the exact landing page components and scroll sections
3. understand the existing styling/animation system
4. reuse existing abstractions
5. identify current API/backend conventions

Do not create duplicate infrastructure if an equivalent service already exists.

Keep the implementation modular so the intelligence layer can later be reused by other Laxvish AI solution experiences.

Suggested modules:

client:
- ContextProvider
- context collector
- event buffer
- behavior aggregator
- narrative orchestrator

server:
- context ingestion
- IP/environment enrichment
- place resolver
- feature engine
- problem engine
- solution matcher
- narrative engine
- LLM gateway
- output validator

TESTING

Add tests for:
- first visit
- repeat visitor
- no location permission
- GPS permission
- weak IP location
- precise location
- slow Places response
- no network
- slow LLM
- LLM failure
- contradictory evidence
- insufficient behavior
- unsupported model claim
- scroll state transitions
- narrative prefetch
- SSE streaming

Acceptance criteria:

1. Existing website visual design remains intact.
2. Page renders without waiting for intelligence.
3. Five narrative moments work in sequence.
4. Text 1 can appear without GPS.
5. Text 2/3 use location/environment when available.
6. Text 4 uses only Laxvish on-site behavior.
7. Text 5 uses all high-quality accumulated evidence.
8. Final text streams from the server-side LLM.
9. No inaccessible data is claimed.
10. Failures never break the website.
11. Client payloads remain small.
12. Next narrative content can be prefetched.
13. All inference has confidence and evidence internally.

Do not finish by merely reporting that the architecture is implemented.
Actually integrate it into the existing landing page, run the relevant type checks/tests/build, and provide a concise implementation summary showing:
- files changed
- APIs added/changed
- event schema
- narrative stages
- latency strategy
- tests run
- any environment variables/secrets required
- any provider setup required
- any areas where existing site constraints prevented full implementation.
"
```

---

# 38. Final Product Definition

The finished Laxvish landing page should feel like a single intelligent experience, not like a website plus an analytics system.

The mental model is:

```text
VISIT
  ↓
CONTEXT
  ↓
ENVIRONMENT
  ↓
INTEREST
  ↓
PATTERN
  ↓
PROBLEM
  ↓
AI OPPORTUNITY
  ↓
SOLUTION
```

The visitor does not need to read a paragraph saying:

> "Laxvish uses advanced AI to understand your needs."

The page should demonstrate it.

The best possible outcome is that the visitor reaches the final text and thinks:

> **"That is actually what I came here looking for."**

Then Laxvish immediately answers the next question:

> **"What can we build to solve it?"**

That is the purpose of the entire architecture.
