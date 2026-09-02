"use client";

// ============================================================================
// EDITORIAL PROCESS CHAPTER
// World: editorial publishing — a print magazine's "How we got here" sidebar
// Geometry: two-column editorial spread. NO identical 3-up step cards.
// ============================================================================

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

        {/* Right column: editorial chronology — paragraph-form, NOT a numbered triple */}
        <div className="lg:col-span-7">
          <ol className="divide-y divide-rule-hair border-t border-rule-hair">
            <li className="grid grid-cols-[6rem_1fr] gap-x-8 py-8">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
                Week One
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                  The first call.
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-deepink/75">
                  A 15-minute conversation. You describe the work — the inputs,
                  the rules, the exceptions that have always required human
                  judgment. We listen. There is no pitch deck on our side. We
                  leave the call knowing what we have to build.
                </p>
              </div>
            </li>

            <li className="grid grid-cols-[6rem_1fr] gap-x-8 py-8">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
                Week Two
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                  Built and tested on your real work.
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-deepink/75">
                  We train the AI on your business, your tone, your policy. It
                  works on real examples from your queue before it ever sees a
                  live customer. Your team watches. They approve, reject, edit.
                  Nothing ships production-bound until they sign off.
                </p>
              </div>
            </li>

            <li className="grid grid-cols-[6rem_1fr] gap-x-8 py-8">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-mark uppercase">
                Week Three
              </span>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight text-deepink">
                  Running, on your terms.
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-deepink/75">
                  The work moves from your inbox to the AI&rsquo;s queue. You see
                  every action, you approve what matters, you hold the brakes on
                  what doesn&rsquo;t. We do not disappear after launch. The same
                  team is on call for as long as the AI is.
                </p>
              </div>
            </li>
          </ol>

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
