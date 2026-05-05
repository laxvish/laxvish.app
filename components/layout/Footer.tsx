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
      <div className="mx-auto w-full max-w-[96rem] px-6 py-24 sm:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-charcoal">
              Laxvish
            </p>
            <h2 className="mt-6 max-w-sm text-3xl font-normal tracking-tight text-charcoal sm:text-4xl">
              Enterprise AI OS for accountable execution.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-neonCyan">
              Build production AI with specialized workers, centralized
              orchestration, and verification-first controls made for
              enterprise teams.
            </p>
            <div className="mt-8">
              <a
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={BOOK_NOW_BUTTON_CLASS}
              >
                <span>Book Now</span>
              </a>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold tracking-wide text-charcoal">
                  {group.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base text-neonCyan transition-colors duration-300 hover:text-charcoal"
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

        <div className="mt-24 flex flex-col gap-6 border-t border-charcoal/20 pt-8 text-sm font-medium text-neonCyan sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Laxvish. DPDP-first by design.</p>
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
