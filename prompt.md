@UI_Animator Accessing Superpower: MoMA-Level Generative Art & Vector Fields.
Task: We are elevating the `<NeuralCanvas />` from a basic particle swarm to a high-end digital art installation. We will build a "Sentient Flow Field." It must evoke the feeling of witnessing artificial intelligence thinking in real-time—like glowing silk blowing in an invisible, magnetic wind.

1. **The Canvas as a Void:** 
   - Ensure the canvas has zero background and zero borders. It must bleed seamlessly into the `obsidian` void of the hero section. 

2. **The Physics Engine (Vector Flow Field):**
   - Do not use basic x/y bouncing. We are creating a mathematical grid of "wind."
   - Create an array of 800 microscopic particles. 
   - In the render loop, calculate an `angle` for each particle based on its position and time using trigonometric interference. 
   - *The Magic Formula:* `let angle = (Math.sin(particle.x * 0.005 + time) + Math.cos(particle.y * 0.005 + time)) * Math.PI * 2;`
   - Use this angle to update the particle's velocity: `particle.vx += Math.cos(angle) * 0.05` and `particle.vy += Math.sin(angle) * 0.05`. Apply a gentle friction (multiply velocity by 0.95) so the movement is smooth like silk, not erratic.

3. **The Brushstroke (Drawing the Silk):**
   - Do not draw circles or dots. We are drawing the *path* of the particles.
   - Use `ctx.beginPath()`, `ctx.moveTo()`, and `ctx.lineTo()` using the particle's previous and current coordinates.
   - Set `ctx.lineWidth = 0.5`. 
   - Color distribution: 95% of the strands are gossamer `rgba(0, 240, 255, 0.1)` (Cyan). 5% are sharp, verifying strikes of `rgba(255, 184, 0, 0.4)` (Amber).
   - Use `ctx.globalCompositeOperation = 'screen'` to make intersecting lines glow brilliantly without looking blown out.

4. **The Ghosting Effect (Long Exposure):**
   - In the render loop, do NOT clear the canvas. 
   - Draw a massive rectangle over the whole screen every frame using the background color with an extremely low opacity: `ctx.fillStyle = 'rgba(5, 5, 5, 0.04)'`. This creates a long, elegant motion trail, making the moving points look like continuous, fluid ribbons of light.

5. **The Gravitational Anomaly (Mouse Interaction):**
   - The user's cursor is a gravitational anomaly. 
   - When the mouse moves, do not just "scatter" the particles. Calculate the distance and angle from the mouse to the particle. Add a perpendicular force (a vortex effect) so the flow field gracefully wraps *around* the cursor like water flowing around a smooth stone.

6. **Edge Wrapping:**
   - If a particle drifts off the screen, do not bounce it. Seamlessly wrap it to the opposite side of the screen so the flow feels infinite and boundless.

---

Prompt 11: The Ecosystem Marquee (The Neural Pathways)
- Build a full-width section that showcases ecosystem entities as a continuously flowing marquee.
- Include at least two independent marquee lanes moving in opposite directions.
- Visual tone: neural pathways, subtle glow, dark glass cards with neon-cyan borders.
- Keep interactions lightweight and smooth; no heavy 3D or background videos.

Prompt 12: The Ecosystem Grid (The Intelligence Mesh)
- Add a structured mesh/grid section of ecosystem capability cards.
- Each card should include: ecosystem domain, workflow signal, and measurable outcome.
- Add pathway chips/tags inside each card to imply interconnectivity.
- Maintain accessibility and responsive layout from mobile to desktop.

Prompt 13: The Ecosystem Command Strip (The Activation Layer)
- Add a conversion-oriented strip section summarizing ecosystem coverage and readiness.
- Include concise trust metrics, one primary CTA, and one secondary CTA.
- Style should feel premium and coherent with the existing Laxvish visual language.

Prompt 14: The Enterprise Vault (Database Schema)
- Define a lead-capture vault schema with strict typed fields for identity, intent, and source metadata.
- Include explicit validation rules for all incoming lead fields.
- Keep implementation website-safe (no hard DB dependency required for this marketing scope).

Prompt 15: The Secure Handshake (API Route)
- Add a secure Next.js API route for lead intake.
- Enforce handshake checks, payload validation, and basic anti-abuse controls.
- Return structured success/error responses for UI consumption.

Prompt 16: The Dual-Action Terminal (Lead Capture UI)
- Upgrade lead capture into a dual-action interface:
  1. Pilot activation
  2. Integration blueprint request
- Connect form submission to the secure API route.
- Show clear pending/success/error states with responsive layout behavior.

Prompt 17: The Neon Serverless Ignition (Database Sync)
- Add persistent database integration for lead storage and real-time sync.
- Use PostgreSQL (Supabase/Neon) for serverless database backend.
- Create async webhook handler to sync leads from API to database in near real-time.
- Implement typed schema (TypeORM or Prisma) for leads with timestamps, status, and metadata.
- Add optional admin dashboard/export endpoint for lead retrieval (JSON export, CSV).
- Ensure database connection pooling for scalability and connection limit compliance.
- Maintain security: use environment secrets, parameterized queries, and row-level validation.
- Keep website scope: dashboard is optional; lead capture API is the primary integration.
