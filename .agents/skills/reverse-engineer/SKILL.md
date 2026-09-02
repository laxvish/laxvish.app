---
name: reverse-engineer
description: Use when inheriting an undocumented or legacy codebase and needing a fact-based architecture map and rebuild plan before reimplementation.
---

# Reverse Engineer

## Objective
Turn an unfamiliar repository into a reconstruction package that another engineer can use to rebuild the system from scratch with minimal guesswork.

## Required outputs
Create these files in the analysis output folder:
1. `SYSTEM_MAP.md`
2. `RUNTIME_MODEL.md`
3. `DATA_MODEL.md`
4. `INTERFACE_CATALOG.md`
5. `REBUILD_PLAN.md`
6. `OPEN_QUESTIONS.md`

## Execution command
Run the local orchestrator command instead of attempting full in-context reconstruction:

```bash
python3 -m reverse_engineer_tool.cli run <target-repo-path> --out <output-folder>
```

Default example:

```bash
python3 -m reverse_engineer_tool.cli run . --out ./reverse-engineered-output
```

## Workflow
1. **Scope and boundaries**
   - Confirm target directory and intended rebuild scope (full system vs bounded context).
   - Identify language/framework/toolchain signals.

2. **Evidence extraction**
   - Map repository structure and entry points.
   - Extract module dependencies, routes, handlers, models, jobs, and integration touchpoints.
   - For each key claim, capture evidence path references.

3. **Architecture inference**
   - Infer system topology (monolith/modular monolith/microservice/hybrid).
   - Infer runtime dependencies (db, cache, queue, object storage, auth providers).
   - Tag each inference with confidence: `high`, `medium`, or `low`.

4. **Gap interrogation**
   - Move unresolved assumptions to `OPEN_QUESTIONS.md`.
   - Ask targeted user questions for low-confidence, high-impact unknowns.
   - Update all affected artifacts with clarified answers.

5. **Rebuild plan synthesis**
   - Produce `REBUILD_PLAN.md` with implementation phases and dependency order.
   - Separate must-have components from optional enhancements.
   - Include explicit acceptance checks per phase.

6. **Consistency pass**
   - Ensure interfaces match data model assumptions.
   - Ensure runtime model aligns with system map.
   - Ensure all unknowns are either resolved or tracked in `OPEN_QUESTIONS.md`.

## Guardrails
- Do not fabricate business logic.
- Do not hide uncertainty behind generic language.
- Prefer explicit unknowns over confident guesses.
- If evidence is conflicting, document both candidates and required validation.

## Skill references
| Skill | Trigger | Use |
|---|---|---|
| `superpowers:codebase-onboarding` | Starting from a new/unknown codebase | Build fast architectural context |
| `superpowers:writing-plans` | Converting findings into implementation path | Produce structured rebuild phases |
| `superpowers:systematic-debugging` | Contradictory findings or unclear flow | Resolve inconsistencies methodically |
| `superpowers:verification-before-completion` | Before final delivery | Prevent incomplete reconstruction output |