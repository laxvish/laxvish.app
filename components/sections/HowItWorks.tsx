"use client";

// ============================================================================
// EDITORIAL PROCESS CHAPTER
// World: editorial publishing — a print magazine's "How we got here" sidebar
// Geometry: dossier — running datum rule with T+N markers, large serif week
// numerals, asymmetric column. Copy unchanged (it is the trust peak of the
// site). See docs/DIRECTORS_TREATMENT.md §2 (C7).
// ============================================================================

const WEEKS = [
  {
    t: "T+0",
    week: "Week One",
    title: "The first call.",
    body: "A 15-minute conversation. You describe the work — the inputs, the rules, the exceptions that have always required human judgment. We listen. There is no pitch deck on our side. We leave the call knowing what we have to build.",
  },
  {
    t: "T+7",
    week: "Week Two",
    title: "Built and tested on your real work.",
    body: "We train the AI on your business, your tone, your policy. It works on real examples from your queue before it ever sees a live customer. Your team watches. They approve, reject, edit. Nothing ships production-bound until they sign off.",
  },
  {
    t: "T+14",
    week: "Week Three",
    title: "Running, on your terms.",
    body: "The work moves from your inbox to the AI&rsquo;s queue. You see every action, you approve what matters, you hold the brakes on what doesn&rsquo;t. We do not disappear after launch. The same team is on call for as long as the AI is.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto w-full max-w-[1440px] border-t border-rule-hair px-6 py-20 sm:px-12 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        {/* Left rail with sticky editorial drop-cap */}
        <header className="lg:col-span-5">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
            Process Notes — A Working Timeline
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] font-normal leading-[1.04] tracking-tight text-deepink">
            From first conversation to AI in production in weeks, not quarters.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-deepink/75 sm:text-lg">
            We have shipped enough of these to know the discipline matters more
            than the technology. Below is the working timeline, told as it
            actually happens on the ground.
          </p>
        </header>

        {/* Right column: dossier chronology along a running datum rule */}
        <div className="lg:col-span-7">
          <div className="border-l border-rule-hair pl-8 sm:pl-12">
            <ol className="relative">
              {/* Running datum rule */}
              <span
                aria-hidden="true"
                className="absolute top-4 bottom-4 left-0 -ml-px w-px bg-mark/30"
              />
              {WEEKS.map((entry, i) => (
                <li key={entry.week} className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 border-b border-rule-hair py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-10">
                  {/* Datum tick on the rule */}
                  <span
                    aria-hidden="true"
                    className="absolute top-12 -left-8 h-2 w-2 -translate-x-1/2 rounded-none border border-mark/60 bg-cream sm:-left-12"
                  />
                  <span className="font-mono text-xs font-medium tracking-[0.14em] text-mark/80 uppercase">
                    {entry.t}
                  </span>
                  <div className="space-y-3">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-deepink/55 uppercase">
                      {entry.week}
                    </p>
                    <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                      {entry.title}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed text-deepink/75">
                      {entry.body}
                    </p>
                  </div>
                </li>
              ))}
              {/* Final datum: the handoff */}
              <div className="relative flex items-baseline gap-6 py-8">
                <span
                  aria-hidden="true"
                  className="absolute top-12 -left-8 h-2.5 w-2.5 -translate-x-1/2 bg-mark sm:-left-12"
                />
                <span className="font-mono text-xs font-medium tracking-[0.14em] text-mark uppercase">
                  T+21
                </span>
                <p className="max-w-xl font-mono text-xs leading-relaxed tracking-wide text-deepink/60 uppercase">
                  The AI is in production. The humans hold the brakes.
                </p>
              </div>
            </ol>
          </div>

          {/* Honest disclaimer in editor's tone — anti-slop */}
          <p className="mt-10 max-w-xl border-t border-rule-hair pt-6 font-mono text-[11px] leading-relaxed tracking-wide text-deepink/55 uppercase">
            Honest caveat — Not every engagement fits three weeks. Multi-team
            rollouts with policy harmonisation run longer. We name the real
            timeline on the first call, not the marketing one.
          </p>
        </div>
      </div>
    </section>
  );
}
