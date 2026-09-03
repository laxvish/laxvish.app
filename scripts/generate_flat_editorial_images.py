import json
import base64
import urllib.request
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageOps, ImageEnhance

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

PROMPTS = [
    {
        "filename": "brakes-interlock-macro.png",
        "description": "Brakes — AI Governance, Verification Guardrails & Controlled Intelligence",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing AI safety guardrails, governance, and controlled intelligence.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition made from two interlocking rounded shapes.
The left shape is a soft warm off-white / pale stone form.
The right shape is a deep charcoal form.
They face and interlock with one another at the center, creating a visual metaphor for:
AI capability ↔ human governance
Inside the central intersection, introduce a single horizontal capsule-shaped control track. A small circular marker sits precisely at the center of the track, suggesting a controlled boundary between two states.
The geometry should communicate constraint, permission, oversight, and balance without using literal symbols.
The composition should feel like a visual identity mark or editorial diagram, rather than a UI component.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Use:
- flat vector shapes
- clean solid fills
- crisp contours
- precise geometric construction
- subtle paper-like texture only if extremely restrained
- flat visual hierarchy
- strong negative space

Do NOT create physical depth.
Absolutely NO: 3D rendering, perspective, camera angle, product photography, realistic materials, bevels, extruded edges, raised surfaces, glossy surfaces, realistic shadows, ambient occlusion, floating objects, photorealism.
It should look like a premium Swiss/editorial/vector graphic printed on an off-white page.

### Composition
Use an expansive 16:9 canvas.
Place the geometric composition slightly below the vertical center.
The object should occupy only approximately 20–30% of the canvas.
Around 70–80% of the canvas should remain completely empty.
The composition must breathe.
Do not fill the canvas simply because space is available.
No frame. No border. No surrounding UI. No cards. No panels. No decorative elements.
One idea. One composition.

### Geometry
The geometry must be exceptionally precise.
Use: large continuous curves, carefully controlled radii, clean intersections, consistent spacing, deliberate asymmetry, strong silhouette.
Avoid excessive complexity.
The interlocking forms should feel designed, not assembled from generic rounded rectangles.
The center should be the visual focal point.

### Color system
STRICT MONOCHROME.
Use only: warm ivory / off-white background (#F5F3EE), pale stone (#E6E3DC), muted gray (#969792), dark charcoal (#252525).
No blue, purple, cyan, green, red, orange, or accent colors. No colorful gradients. Prefer solid fills with tonal contrast.

### Art direction
Swiss graphic design + contemporary editorial design + Apple-level restraint + modern architectural diagram.
A brand identity system valuing precision, trust, calm intelligence, and human oversight.

### Visual metaphor
Do NOT draw a literal shield, lock, robot, brain, circuit board, warning symbol, or mechanical brake. Make containment and deliberate boundary the metaphor.

### Typography
NO TEXT AT ALL. Do not generate labels, words, letters, numbers, interface text, logos, or fake UI typography.

### Negative prompt
Generic AI illustration, 3D render, 3D object, product render, floating card, dashboard, UI mockup, glassmorphism, clay render, bevel, extrusion, perspective, photorealistic lighting, dramatic shadows, neon, glow, shield icon, lock icon, robot, brain, circuitry, mechanical parts, brake calipers, buttons, fake text, typography, stock illustration, visual clutter."""
    },
    {
        "filename": "callme-acoustic-macro.png",
        "description": "CallMe — Realtime AI Voice Pipeline & Conversational Intelligence",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Realtime Conversational Voice AI and acoustic intelligence.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing the transformation of natural acoustic speech into structured conversational intelligence.
The visual consists of three gracefully proportioned horizontal rounded vector bars that smoothly taper and transition into a singular, balanced circular dialogue token.
The left acoustic wave elements are rendered in pale stone and muted gray, while the right conversational resolution token is anchored in deep charcoal.
The composition embodies:
Acoustic sound stream ↔ structured conversational dialogue
The connection between the waves and the circular token is seamless, separated by a crisp 2px hairline whitespace gap that denotes precision and sub-millisecond transition.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Use flat vector silhouettes, clean matte solid fills, razor-sharp outlines, and immaculate geometric alignment.
Absolutely NO: 3D rendering, perspective, volumetric shading, microphone hardware, studio capsules, drop shadows, bevels, extruded pills, glossy highlights, floating objects, or photorealism.
It must feel like an editorial mark printed on high-grade uncoated paper.

### Composition
Use an expansive 16:9 canvas.
Place the geometric composition cleanly centered.
The visual motif should occupy only 20–25% of the total canvas area.
75–80% of the canvas must remain completely unoccupied, allowing expansive negative space.
No bounding frames, no card borders, no dashboard UI containers, no decorative floating particles.
One clear, confident visual statement.

### Geometry
Exceptional typographic and architectural precision.
Harmonious aspect ratios, pure tangential radii, consistent stroke weights, mathematical curve curvature, and deliberate balance.
The flow from horizontal frequency bars to the solid circular token must feel rhythmic, disciplined, and calm.

### Color system
STRICT MONOCHROME PALETTE.
Canvas background: warm ivory / off-white (#F5F3EE).
Wave elements: pale stone (#E6E3DC) and mid-tone gray (#969792).
Focal dialogue token: deep charcoal (#252525).
Zero foreign hues. No blue, cyan, purple, green, yellow, or neon glow. Solid tonal fills only.

### Art direction
Swiss international typographic style + Braun industrial graphic design + contemporary architectural diagram.
Conveying acoustic clarity, conversational flow, reliability, and executive polish.

### Visual metaphor
Do NOT illustrate a physical microphone, headphone, mouth, speech bubble with tail, audio jack, soundboard, or sound equalizer sliders.
The metaphor is pure geometry: frequency modulation harmonizing into coherent, resolved dialogue.

### Typography
NO TEXT AT ALL. Zero letters, words, numbers, phonetics, decibel marks, or fake UI labels.

### Negative prompt
Generic AI illustration, 3D render, clay model, realistic microphone, studio equipment, headset, soundboard, audio waves with glow, neon gradients, floating cards, buttons, speech bubbles with pointers, realistic shadows, perspective rendering, text, typography, stock vector art, clutter."""
    },
    {
        "filename": "verification-wafer-macro.png",
        "description": "Proof Band — Verification Record, Audit Ledger & Deterministic Proof",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing an AI Verification Ledger, DPDP compliance, and deterministic audit trails.

The artwork must look like it was created by a master Swiss graphic designer using pure vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing verification, state commit, and immutable auditability.
The composition consists of a clean horizontal structural foundation formed by two parallel geometric planes:
A lower solid dark charcoal bar providing an anchor of truth, and an upper precision-spaced pale stone bar featuring an elegant recessed notch.
Sitting precisely within this notch is a solitary, perfectly centered geometric circular emblem containing a subtle concentric hairline ring.
The visual conveys:
Audited execution ↔ verified state commitment
The alignment is mathematically exact, expressing absolute reliability, deterministic governance, and regulatory compliance.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Use flat planar shapes, solid unshaded fills, crisp vector contours, and pure 2D graphic discipline.
Absolutely NO: 3D extrusion, isometric perspective, silicon wafers, microchips, laser etchings, glossy surfaces, drop shadows, bevels, depth blurring, or ambient occlusion.
It must resemble a precision architectural diagram or corporate seal printed on off-white stationery.

### Composition
Expansive 16:9 canvas.
The graphic sits centered, occupying only 20–25% of the total canvas area.
75–80% of the canvas remains pure, untouched off-white negative space.
No surrounding card containers, no simulated browser windows, no grid mesh lines, no decorative brackets.
One focused, authoritative visual emblem.

### Geometry
Pure Euclidean geometry.
Clean horizontal baselines, razor-sharp 90-degree corners balanced against perfectly circular radii, uniform 4px spacing channels, and exact symmetry.
Every line and shape feels essential, calculated, and unyielding.

### Color system
STRICT MONOCHROMATIC PALETTE.
Background canvas: pristine warm off-white (#F5F3EE).
Upper bar and accents: light stone gray (#E6E3DC) and slate (#969792).
Base foundation and emblem core: deep rich charcoal (#252525).
Zero colored accents. No green checkmarks, no blue badges, no rainbow gradients.

### Art direction
Swiss modernist graphic design + Bauhaus geometric rigor + high-trust institutional editorial branding.
Communicating uncompromising verification, audit integrity, transparency, and calm authority.

### Visual metaphor
Do NOT draw a literal padlock, shield icon, green checkmark, checklist, database cylinder, blockchain cube, stamp, or certificate ribbon.
The metaphor is architectural stability: a solid base interlocked with an exact, verified central key.

### Typography
NO TEXT AT ALL. Absolutely zero alphanumeric characters, serial numbers, hashes, timestamps, or fake data labels.

### Negative prompt
Generic AI illustration, 3D render, silicon wafer, microchip, laser beams, green checkmarks, shield icons, padlock icons, blockchain cubes, shadows, perspective, gradient fills, glossy plastic, metal textures, fake text, typography, decorative clutter."""
    },
    {
        "filename": "final-cta-architecture.png",
        "description": "Final CTA — Multi-Agent System Architecture & Autonomous Deployment",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Enterprise Multi-Agent System Architecture and unified system deployment.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing multi-tiered enterprise AI architecture and coordinated execution.
The composition consists of three flat, horizontally stacked rectangular tiers of graduated widths (narrow top, wide middle, grounded base).
A single crisp vertical hairline axis bisects the three tiers, connecting them through precise circular nodal intersections.
The top tier is light stone, the middle tier is muted gray, and the grounded base tier is deep charcoal.
The composition expresses:
Orchestrated layers ↔ unified enterprise core
The hierarchy communicates stability, structured deployment, modularity, and systemic coherence.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Use flat vector planes, solid uniform fills, razor-sharp edge contours, and zero simulated depth.
Absolutely NO: 3D perspective, isometric angles, extruded plates, metallic panels, glassmorphism, realistic shadows, ambient occlusion, or camera depth-of-field.
It should feel like a high-end architectural elevation drawing or graphic identity mark printed on off-white paper.

### Composition
Expansive 16:9 canvas.
The architectural tiered stack is centered horizontally and vertically.
The composition occupies only 25–30% of the canvas area.
70–75% of the canvas is pure, open negative space.
No bounding frames, no outer borders, no complex network webs, no decorative floating cards.
One unified, structured architectural statement.

### Geometry
Rigorous architectural precision.
Clean horizontal slabs with subtle rounded corner radii (4px), exact vertical alignment along the central axis, uniform vertical spacing between tiers, and mathematically balanced proportions.
The structure feels solid, grounded, and purposeful.

### Color system
STRICT MONOCHROME.
Canvas background: warm ivory / off-white (#F5F3EE).
Top tier: pale stone (#E6E3DC).
Middle tier and axis: muted gray (#969792).
Base tier and central node: deep charcoal (#252525).
No foreign colors, no blue, no purple, no cyan, no gradients. Pure solid tonal contrast.

### Art direction
Swiss structural graphic design + modern architectural blueprint aesthetics + Dieter Rams functionalism.
Projecting stability, engineering excellence, enterprise scalability, and systemic clarity.

### Visual metaphor
Do NOT draw literal server racks, cloud icons, computer monitors, robots, gears, blueprints with grid paper, or complex circuit boards.
The metaphor is structured architectural layering: tiered components aligned onto a common operational axis.

### Typography
NO TEXT AT ALL. Zero words, letters, numbers, dimension annotations, or fake UI labels.

### Negative prompt
Generic AI illustration, 3D render, isometric stack, extruded layers, server hardware, computer screens, clouds, gears, robot arms, shadows, realistic lighting, glowing effects, neon lines, colorful gradients, text, typography, complex network clutter."""
    },
    {
        "filename": "workers-actuator-macro.png",
        "description": "Workers Page — Autonomous AI Domain Worker Execution Engine",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing an Autonomous AI Domain Worker executing continuous, specialized tasks.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing focused task execution, continuous operation, and predictable output.
The visual consists of a clean horizontal primary capsule shape in deep charcoal, paired with an adjacent circular completion satellite in pale stone.
Within the charcoal capsule, an internal horizontal hairline slot reveals a precise central indicator marker, symbolizing an active, bounded operational state.
The arrangement embodies:
Autonomous domain capability ↔ bounded execution scope
The relationship between the capsule and satellite is harmonious, separated by a crisp whitespace gap that implies smooth, continuous workflow handoff.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat vector construction, solid opaque fills, sharp outlines, and zero dimensional rendering.
Absolutely NO: 3D rendering, perspective views, robotic arms, actuators, mechanical pistons, gears, drop shadows, bevels, plastic gloss, or photorealism.
It must read as a refined editorial glyph or Swiss logomark on an off-white background.

### Composition
Expansive 16:9 canvas.
The composition sits elegantly centered.
The visual occupies only 20–25% of the total canvas.
75–80% of the canvas remains completely open negative space.
No UI container cards, no faux dashboards, no progress percentage bars, no floating confetti.
One singular, disciplined visual thought.

### Geometry
Meticulous geometric control.
Continuous smooth curves, perfectly circular satellite geometry, uniform stroke widths, and calibrated spacing.
The silhouette is bold yet understated, balanced with surgical precision.

### Color system
STRICT MONOCHROME.
Background canvas: warm off-white / ivory (#F5F3EE).
Primary task capsule: deep solid charcoal (#252525).
Internal marker and satellite: pale stone (#E6E3DC) and muted slate (#969792).
Zero accent colors. No green status dots, no blue buttons, no gradient fills.

### Art direction
Minimalist Swiss design + modernist corporate identity + Vignelli design system discipline.
Communicating focus, tireless autonomy, dependability, and structured competence.

### Visual metaphor
Do NOT draw a robot, human worker, factory tool, mechanical gear, clock, spinning wheel, or computer terminal.
The metaphor is purposeful geometry: a self-contained operational unit moving steadily along a defined track.

### Typography
NO TEXT AT ALL. No numbers, no percentage signs, no status words, no fake button labels.

### Negative prompt
Generic AI illustration, 3D render, robotic arms, gears, mechanical pistons, factory tools, human figures, dashboards, progress bars, drop shadows, glowing effects, colorful accents, fake text, typography, stock graphics, clutter."""
    },
    {
        "filename": "brain-routing-mesh.png",
        "description": "Brain — Multi-Agent AI Orchestration, Neural Mesh & Smart Routing",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Multi-Agent Orchestration, Neural Routing, and intelligent task coordination.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing centralized coordination and dynamic multi-agent task distribution.
The composition features a solid, prominent circular core node in deep charcoal.
Originating from this core are three delicate, perfectly balanced radial vector branches that terminate in smaller, refined circular worker nodes rendered in pale stone and muted gray.
The geometry visualizes:
Central intelligence ↔ coordinated distributed execution
The branches are clean, single-weight vector lines with consistent angular spacing (120 degrees apart), expressing effortless harmony, balance, and order.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Pure vector lines, flat solid circle fills, clean intersections, and zero perspective depth.
Absolutely NO: 3D rendering, isometric angles, glowing neural networks, biological brain visuals, fiber optic cables, particle streams, drop shadows, or glow halos.
It must look like an editorial infographic or brand mark in an architectural monograph.

### Composition
Expansive 16:9 canvas.
The radial orchestration diagram is centered with mathematical poise.
The entire graphic occupies only 25–30% of the canvas area.
70–75% of the canvas is pure, uncluttered off-white negative space.
No framing boxes, no surrounding interface panels, no glowing matrix backgrounds.
One elegant, breathing geometric mark.

### Geometry
Pure circular geometry and clean radial symmetry.
Exact line weights, immaculate concentric spacing, perfectly tangent connections between lines and circular nodes.
The visual structure radiates calm logic, total clarity, and systemic coordination.

### Color system
STRICT MONOCHROMATIC PALETTE.
Background canvas: pristine warm off-white (#F5F3EE).
Central coordinator node: deep charcoal (#252525).
Radial branches and satellite nodes: pale stone (#E6E3DC) and muted slate (#969792).
Zero foreign colors. No blue nodes, no purple links, no rainbow glows.

### Art direction
Swiss international graphic style + Otl Aicher informational design + minimalist astronomical chart aesthetics.
Projecting intelligence, high-level coordination, effortless routing, and executive calm.

### Visual metaphor
Do NOT draw a biological brain, glowing synapsed web, server matrix, optical fiber bundle, flowchart arrows with text, or robot hub.
The metaphor is pure celestial geometry: a central anchor coordinating orbiting satellites in stable equilibrium.

### Typography
NO TEXT AT ALL. Absolutely zero letters, numbers, node names, flow labels, or fake UI annotations.

### Negative prompt
Generic AI illustration, 3D render, biological brain, glowing neural web, fiber optics, network matrix, server room, glowing particles, neon, drop shadows, colorful gradients, flowchart text, fake labels, typography, stock vector clutter."""
    },
    {
        "filename": "callme-ribbon-mic.png",
        "description": "CallMe Depth — Neural Speech-to-Intent Acoustic Intelligence",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Neural Speech-to-Intent Acoustic Processing and voice synthesis.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing the synthesis of complex acoustic audio frequencies into pure, resolved conversational intent.
The composition consists of an elegant horizontal sequence:
On the left, three stacked, slender undulating vector bands representing acoustic timbre and frequency modulation.
On the right, a single, perfectly proportioned solid rectangular dialogue tablet with softened corners in deep charcoal.
A subtle hairline horizontal connector bridges the two realms across a clean whitespace interval, symbolizing:
Natural human speech ↔ structured machine intent
The visual rhythm flows from fluid acoustic movement to grounded semantic clarity.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat planar shapes, clean vector paths, solid matte fills, and zero depth cues.
Absolutely NO: 3D ribbon microphones, acoustic foam, metal grilles, studio equipment, wave ripples with neon glow, drop shadows, bevels, or realistic materials.
It must feel like a plate in a Swiss design manual printed on fine uncoated paper.

### Composition
Expansive 16:9 canvas.
The horizontal sequence is centered with balanced horizontal rhythm.
The graphic occupies only 20–25% of the total canvas area.
75–80% of the canvas remains completely open off-white negative space.
No surrounding card borders, no faux audio playback bars, no play/pause buttons, no decorative sound meters.
One pure, articulate visual thought.

### Geometry
Exceptional vector refinement.
Smooth Bezier curves with zero kinks, perfectly parallel band spacing, seamless transition into the solid rectangular tablet, and disciplined proportions.
The contrast between fluid wave curvature and geometric tablet stability creates sophisticated visual tension.

### Color system
STRICT MONOCHROME.
Background canvas: warm ivory / off-white (#F5F3EE).
Acoustic wave bands: pale stone (#E6E3DC) and mid-tone gray (#969792).
Intent tablet: deep solid charcoal (#252525).
No colored highlights. No cyan waves, no purple gradients, no green volume indicators.

### Art direction
Swiss modernism + Braun acoustic design minimalism + editorial typography layout aesthetics.
Expressing natural fluency, acoustic precision, zero-latency comprehension, and quiet sophistication.

### Visual metaphor
Do NOT draw a physical microphone, microphone capsule, corrugated ribbon, headphones, mouth speaking soundwaves, or audio mixer.
The metaphor is geometric modulation: fluid waveform geometry resolving into a solid geometric anchor of intent.

### Typography
NO TEXT AT ALL. Zero words, letters, decibel numbers, audio frequency labels, or fake UI text.

### Negative prompt
Generic AI illustration, 3D render, ribbon microphone, microphone capsule, headphones, audio mixer, soundboard, glowing audio waves, neon lasers, drop shadows, perspective, volume bars, buttons, fake text, typography, stock illustration, visual noise."""
    },
    {
        "filename": "security-vault-bolt.png",
        "description": "Security & Trust — Cryptographic Data Fortress & DPDP Isolation",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Cryptographic Data Security, Tenant Isolation, and DPDP Indian Data Residency.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing impenetrable data isolation, privacy boundaries, and cryptographic trust.
The visual features a bold, centered diamond-square rhombus in deep charcoal, enveloped within a concentric, perfectly spaced hairline boundary perimeter in pale stone.
At the exact center of the charcoal core sits a solitary, minimal circular keyway aperture.
The composition communicates:
Fortified tenant isolation ↔ verifiable cryptographic integrity
The nested geometric relationship creates a powerful sense of structural protection, containment, and absolute privacy.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat vector shapes, crisp hairline contours, solid uniform fills, and zero physical depth.
Absolutely NO: 3D bank vault doors, steel locking bolts, physical padlocks, keys, cyber locks, green matrix codes, glowing shields, drop shadows, or metallic textures.
It should resemble an emblem for a central bank or an architectural security stamp on off-white paper.

### Composition
Expansive 16:9 canvas.
The geometric emblem sits with absolute authority in the center.
The graphic occupies only 20–25% of the total canvas area.
75–80% of the canvas is pure, serene off-white negative space.
No outer UI panels, no firewall barrier graphics, no decorative security badges.
One immutable, iconic mark.

### Geometry
Uncompromising geometric precision.
Exact 45-degree rhombus orientation, perfectly uniform 8px margin between core and outer boundary line, concentric circular center, and mathematical symmetry.
Every angle and stroke conveys permanence, stability, and defense.

### Color system
STRICT MONOCHROMATIC PALETTE.
Background canvas: warm off-white / ivory (#F5F3EE).
Outer boundary hairline: pale stone (#E6E3DC) and slate gray (#969792).
Central security core: deep solid charcoal (#252525).
Zero foreign colors. No blue shields, no green checkmarks, no red warning dots.

### Art direction
Swiss institutional branding + classical architectural seals + minimalist secure computing diagrams.
Projecting absolute privacy, DPDP regulatory compliance, institutional trust, and stoic reliability.

### Visual metaphor
Do NOT draw a bank vault, steel locking bolt, padlock, key, shield icon, binary code rain, fingerprint, or cyber lock.
The metaphor is nested geometric containment: an impenetrable core protected within an exact boundary perimeter.

### Typography
NO TEXT AT ALL. Zero letters, numbers, encryption tags, 'AES-256' labels, or fake security watermarks.

### Negative prompt
Generic AI illustration, 3D render, bank vault door, steel locking bolts, padlocks, keys, shield icons, binary numbers, matrix code, cyber lock, glowing laser grids, drop shadows, metallic textures, fake text, typography, security clipart, clutter."""
    },
    {
        "filename": "solutions-sales-telemetry.png",
        "description": "Sales Automation — Inbound Lead Qualification & Meeting Conversion",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Inbound Lead Qualification, Automated Sales Pipeline, and Meeting Conversion.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing inbound lead qualification filtering and calendar conversion.
The visual features a dynamic horizontal progression of three flat geometric elements:
On the left, an elongated pale stone intake capsule.
In the center, a focused circular qualification filter node with a subtle vertical bisecting slit.
On the right, a grounded solid deep charcoal square tablet representing a booked meeting.
The flow embodies:
Inbound prospect intake → automated ICP qualification → booked calendar conversion
The elements are connected by a single horizontal hairline trajectory with calibrated whitespace gaps, denoting precision funnel throughput.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat vector construction, solid opaque fills, razor-sharp edge contours, and zero simulated depth.
Absolutely NO: 3D perspective, chronograph needles, clock dials, CRM dashboards, floating coins, funnel 3D meshes, drop shadows, or glossy buttons.
It must read like an executive editorial infographic in a business journal.

### Composition
Expansive 16:9 canvas.
The horizontal sequence is centered with elegant directional pacing from left to right.
The graphic occupies only 20–25% of the canvas area.
75–80% of the canvas remains completely open off-white negative space.
No surrounding card containers, no simulated browser UI, no decorative graph lines.
One clear, purposeful progression.

### Geometry
Pure linear and geometric balance.
Carefully matched heights across the three elements, exact 6px whitespace gaps, perfectly centered connecting axis, and disciplined proportions.
The progression feels confident, swift, and highly organized.

### Color system
STRICT MONOCHROME.
Background canvas: pristine warm off-white (#F5F3EE).
Left intake element: pale stone (#E6E3DC).
Center filter node: muted gray (#969792).
Right conversion tablet: deep rich charcoal (#252525).
Zero accent colors. No green conversion badges, no blue pipeline bars.

### Art direction
Swiss infographic design + McKinsey executive presentation minimalism + modern architectural flow diagram.
Communicating sales velocity, qualified precision, automated efficiency, and revenue growth.

### Visual metaphor
Do NOT draw human sales reps, dollar signs, bar charts, calendar grids with dates, chronograph dials, or funnel cones.
The metaphor is geometric filtering and conversion: an incoming stream refined through an exact gate into a solid outcome.

### Typography
NO TEXT AT ALL. Zero letters, numbers, currency symbols, percentages, or fake CRM labels.

### Negative prompt
Generic AI illustration, 3D render, chronograph dials, watch needles, calendar pages, sales reps, money icons, dollar signs, charts, graphs, 3D funnels, drop shadows, perspective, neon colors, fake text, typography, stock marketing clutter."""
    },
    {
        "filename": "solutions-support-acoustic.png",
        "description": "Customer Support — Omnichannel Resolution & Instant Triage",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Omnichannel Customer Support AI, Instant Triage, and Ticket Resolution.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing seamless customer inquiry intake and instant automated resolution.
The composition consists of two gracefully interlocking flat dialogue shapes:
An upper inverted rounded-corner form in pale stone (representing the incoming inquiry), perfectly interlocked with a lower rounded-corner form in deep charcoal (representing the instant verified resolution).
Between their interlocking contour lies a crisp, continuous 2px hairline whitespace margin, framing a central micro-circle token that denotes resolved equilibrium.
The visual expresses:
Inquiry intake ↔ verified automated resolution
The interplay is intimate, calm, and perfectly balanced, embodying friction-free enterprise support.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat vector planes, solid matte color fills, clean vector curves, and zero dimensional shading.
Absolutely NO: 3D chat bubbles with tails, customer service headsets, human faces, smiling avatars, ticket numbers, drop shadows, or glossy highlights.
It must feel like a modern corporate identity mark or poster design.

### Composition
Expansive 16:9 canvas.
The interlocking dialogue motif is centered with serene equilibrium.
The graphic occupies only 20–25% of the total canvas area.
75–80% of the canvas is pure, untouched off-white negative space.
No chat window frames, no notification badges, no floating emoji particles.
One tranquil, resolved composition.

### Geometry
Masterful continuous curvature and complementary interlocking radii.
The upper and lower forms fit together with mathematical precision, unified by consistent stroke spacing and harmonious proportions.
The structure communicates immediate understanding and complete resolution.

### Color system
STRICT MONOCHROMATIC PALETTE.
Background canvas: warm off-white / ivory (#F5F3EE).
Upper inquiry shape: pale stone (#E6E3DC) and muted gray (#969792).
Lower resolution shape: deep solid charcoal (#252525).
Zero accent colors. No green checkmarks, no blue chat bubbles, no colored avatars.

### Art direction
Swiss modernist graphic design + Massimo Vignelli identity systems + calm human-centric editorial minimalism.
Projecting 24/7 availability, instant empathy, effortless accuracy, and customer satisfaction.

### Visual metaphor
Do NOT draw speech bubbles with pointers, support agents with headsets, telephones, thumbs up icons, star ratings, or ticket tags.
The metaphor is interlocking geometric harmony: a question met immediately by its exact, complementary answer.

### Typography
NO TEXT AT ALL. Zero letters, words, chat messages, timestamps, or fake support labels.

### Negative prompt
Generic AI illustration, 3D render, speech bubbles with tails, customer service headsets, smiling faces, avatars, support tickets, star ratings, notification dots, drop shadows, perspective, neon gradients, fake text, typography, stock support art, visual clutter."""
    },
    {
        "filename": "solutions-document-optical.png",
        "description": "Document Processing — Intelligent Extraction & Structured Data OCR",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Intelligent Document Processing (IDP), Optical Entity Recognition, and Structured Data Extraction.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing the extraction of structured data from complex enterprise documents.
The visual features a minimalist vertical rectangular document plane in pale stone.
Overlaid across the upper-right section of the document are three crisp, horizontal extraction bars of graduated lengths in deep charcoal, perfectly aligned along a shared left margin.
A single vertical hairline indicator line connects the three bars, symbolizing:
Unstructured document substrate → structured schema extraction
The composition expresses order emerging from complexity, surgical extraction precision, and automated accounting-ready structuring.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Flat vector construction, solid opaque fills, clean geometric lines, and zero depth cues.
Absolutely NO: 3D paper sheets, scanning laser beams, optical glass prisms, document cameras, shadows beneath pages, curling corners, or photorealism.
It should look like a plate in an editorial typography design catalog printed on heavy uncoated paper.

### Composition
Expansive 16:9 canvas.
The document extraction motif sits centered with balanced vertical poise.
The graphic occupies only 20–25% of the canvas area.
75–80% of the canvas remains completely open off-white negative space.
No surrounding scanner frames, no faux file upload buttons, no decorative folder tabs.
One disciplined, architectural statement.

### Geometry
Strict rectilinear precision.
Clean 90-degree document corners with subtle 2px rounding, uniform vertical spacing between the three extraction bars, and exact horizontal baseline alignment.
Every element is calculated, uncluttered, and perfectly readable.

### Color system
STRICT MONOCHROME.
Background canvas: pristine warm off-white (#F5F3EE).
Document base sheet: pale stone (#E6E3DC).
Connecting guide line: muted gray (#969792).
Extracted structured data bars: deep rich charcoal (#252525).
No color accents. No red highlight boxes, no blue scanning lines.

### Art direction
Swiss structural graphic design + Bauhaus typographic grid discipline + high-precision document architecture.
Communicating zero-error extraction, structural clarity, compliance speed, and data integrity.

### Visual metaphor
Do NOT draw an optical glass prism, red scanning laser, paper with fake printed lines, camera lens, magnifying glass, or PDF icon.
The metaphor is geometric structuring: a clean substrate giving rise to perfectly ordered data vectors.

### Typography
NO TEXT AT ALL. Absolutely zero alphanumeric characters, simulated invoice words, table headers, or OCR bounding box labels.

### Negative prompt
Generic AI illustration, 3D render, optical glass prisms, scanning lasers, magnifying glasses, camera lenses, PDF icons, realistic paper stacks, curling page corners, drop shadows, perspective, neon lines, fake text, typography, stock OCR art, visual clutter."""
    },
    {
        "filename": "solutions-finance-balance.png",
        "description": "Finance AP — Autonomous 3-Way Reconciliation & Ledger Matching",
        "prompt": """Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing Autonomous 3-Way Financial Reconciliation, Accounts Payable Matching, and Ledger Integrity.

The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration.

### Visual concept
Create one abstract, intelligent geometric composition representing exact 3-way matching between Purchase Orders, Goods Receipts, and Vendor Invoices.
The visual features three flat, identical circular tokens arranged in an equilateral triangular constellation (two baseline tokens, one apex token).
At the exact center where the three circles converge sits a small, perfectly proportioned circular core in deep charcoal, locking all three into absolute equilibrium.
The arrangement symbolizes:
Purchase Order (1) + Receipt (2) + Invoice (3) = verified ledger reconciliation
The three outer tokens are pale stone and muted gray, while the central locking core is deep charcoal, expressing balanced financial truth.

### 2D requirement — extremely important
This is a STRICTLY FLAT 2D illustration.
Pure flat vector shapes, solid unshaded fills, crisp geometric boundaries, and zero simulated depth.
Absolutely NO: 3D balance scales, brass calibration weights, coins, currency symbols, calculators, ledger books, drop shadows, bevels, or realistic materials.
It must resemble a precision corporate logo mark or mathematical proof diagram on off-white paper.

### Composition
Expansive 16:9 canvas.
The 3-way reconciliation mark sits centered with immaculate triangular symmetry.
The graphic occupies only 20–25% of the total canvas area.
75–80% of the canvas is pure, serene off-white negative space.
No outer spreadsheet frames, no accounting grid borders, no decorative currency icons.
One harmonious, balanced visual equation.

### Geometry
Pure geometric equilibrium.
Exact 60-degree equilateral spacing between the three token centers, uniform 4px whitespace separation around the central locking core, and flawless concentric circular geometry.
The structure projects undeniable balance, mathematical rigor, and financial stability.

### Color system
STRICT MONOCHROMATIC PALETTE.
Background canvas: warm off-white / ivory (#F5F3EE).
Outer reconciliation tokens: pale stone (#E6E3DC) and muted slate (#969792).
Central locking core: deep solid charcoal (#252525).
Zero foreign colors. No green dollar signs, no red audit flags, no colorful gradients.

### Art direction
Swiss mathematical graphic design + central banking identity minimalism + minimalist corporate seal aesthetics.
Communicating zero-variance matching, audit-grade accuracy, fraud prevention, and financial peace of mind.

### Visual metaphor
Do NOT draw brass balance scales, physical weights, coins, cash bills, dollar/rupee symbols, spreadsheets, checkbooks, or calculators.
The metaphor is tri-fold geometric convergence: three independent data points resolving into one immutable central truth.

### Typography
NO TEXT AT ALL. Zero numbers, currency symbols, percentages, ledger words, or fake accounting text.

### Negative prompt
Generic AI illustration, 3D render, brass balance scales, calibration weights, coins, money, currency symbols, spreadsheets, calculators, checkbooks, drop shadows, metallic textures, perspective, green/red colors, fake text, typography, stock finance art, visual noise."""
    }
]

def generate_and_save(item):
    filename = item["filename"]
    sys.stdout.write(f"Generating {filename} ({item['description']})...\n")
    sys.stdout.flush()
    payload = {
        "prompt": item["prompt"],
        "model": "openai/gpt-image-2",
        "ratio": "16:9",
        "quality": "hd"
    }
    req = urllib.request.Request(
        GENERATION_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=120) as response:
        result = json.loads(response.read().decode("utf-8"))
        b64_data = result["data"][0]["b64_json"]
        img_bytes = base64.b64decode(b64_data)
        out_path = os.path.join(OUTPUT_DIR, filename)
        
        # Write initial image
        with open(out_path, "wb") as f:
            f.write(img_bytes)
            
        # Post-process to ensure strict 100% brand monochrome & flat tone
        img = Image.open(out_path)
        gray = ImageOps.grayscale(img)
        enhanced = ImageOps.autocontrast(gray, cutoff=(0.1, 0.1))
        enhancer = ImageEnhance.Contrast(enhanced)
        crisp = enhancer.enhance(1.02)
        rgb_mono = crisp.convert("RGB")
        rgb_mono.save(out_path, "PNG", optimize=True)
        
        sys.stdout.write(f"SUCCESS: {filename} generated & saved as flat 2D editorial monochrome.\n")
        sys.stdout.flush()
        return filename

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_and_save, item): item["filename"] for item in PROMPTS}
        for future in as_completed(futures):
            filename = futures[future]
            try:
                future.result()
            except Exception as e:
                sys.stderr.write(f"ERROR {filename}: {e}\n")
                sys.stderr.flush()

if __name__ == "__main__":
    main()
