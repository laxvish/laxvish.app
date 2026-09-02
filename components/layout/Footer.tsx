import Link from "next/link";
import {
  BOOK_NOW_BUTTON_CLASS,
  FOOTER_GROUPS,
  SOCIAL_LINKS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Footer() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <footer className="relative z-10 border-t border-rule-hair bg-parchment">
      <div className="mx-auto w-full max-w-[96rem] px-6 py-24 sm:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_2.5fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-mark font-mono">
              Laxvish
            </p>
            <h2 className="mt-6 max-w-sm text-3xl font-normal tracking-tight text-deepink sm:text-4xl">
              AI workers that do the real work in your business.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-deepink/70">
              Take over the repetitive tasks in sales, customer support,
              document processing, and finance. You stay in control of every
              decision.
            </p>
            <div className="mt-8">
              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={BOOK_NOW_BUTTON_CLASS}
              >
                <span>Talk to our team</span>
              </a>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold tracking-wide text-mark font-mono">
                  {group.title}
                </h3>
                <ul className="mt-6 space-y-4 font-mono text-xs">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-deepink/70 transition-colors duration-200 hover:text-mark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-rule-hair pt-8 text-xs font-medium text-deepink/60 sm:flex-row sm:items-center sm:justify-between font-mono">
          <p>© {new Date().getFullYear()} Laxvish. Built for Indian businesses. DPDP-ready.</p>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-mark"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
