import Link from "next/link";
import {
  FOOTER_GROUPS,
  SOCIAL_LINKS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Footer() {
  const bookDemoUrl = getBookDemoUrl();

  return (
    <footer className="relative z-10 border-t border-charcoal/15 bg-[#070707]">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-neonCyan">
              LAXVISH
            </p>
            <h2 className="mt-4 max-w-sm text-2xl font-bold text-charcoal [font-family:var(--font-space-grotesk)]">
              Enterprise AI Operating System for accountable execution.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-charcoal/75">
              Build production AI with specialized workers, centralized
              orchestration, and verification-first controls made for
              enterprise teams.
            </p>
            <a
              href={bookDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-vaultAmber px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-vaultAmber/90"
            >
              Book Demo
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-neonCyan">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-charcoal/75 transition-colors duration-150 hover:text-neonCyan"
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

        <div className="mt-10 flex flex-col gap-4 border-t border-charcoal/15 pt-6 text-xs text-charcoal/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Laxvish. DPDP-first by design.</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-150 hover:text-neonCyan"
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
