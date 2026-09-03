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
    <footer className="relative z-10 border-t border-charcoal bg-vaultAmber">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal">
              Laxvish
            </p>
            <h2 className="mt-4 sm:mt-5 max-w-sm text-2xl sm:text-3xl font-normal tracking-tight text-charcoal">
              AI workers that do the real work in your business.
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md text-base leading-relaxed text-charcoal/70">
              Take over the repetitive tasks in sales, customer support,
              document processing, and finance. You stay in control of every
              decision.
            </p>
            <div className="mt-6 sm:mt-8">
              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BOOK_NOW_BUTTON_CLASS} w-full sm:w-auto text-center justify-center`}
              >
                <span>Book a working session</span>
              </a>
            </div>
          </div>

          <div className="grid gap-10 grid-cols-2 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal">
                  {group.title}
                </h3>
                <ul className="mt-4 sm:mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-charcoal/70 transition-colors duration-300 hover:text-charcoal"
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

        <div className="mt-14 sm:mt-18 flex flex-col gap-4 border-t border-charcoal/20 pt-6 text-xs sm:text-sm font-medium text-neonCyan sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Laxvish. Built for Indian businesses. DPDP-ready.</p>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-charcoal"
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
