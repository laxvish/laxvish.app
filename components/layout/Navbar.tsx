"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavMenu } from "@/components/layout/NavMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  PRIMARY_NAV_LINKS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const neetoCalUrl = getBookDemoUrl();
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const redirectToDemo = () => {
    closeMenu();
    window.location.assign(neetoCalUrl);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/15 bg-obsidian/75 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.22em] text-neonCyan [font-family:var(--font-space-grotesk)] sm:text-lg sm:tracking-[0.3em]"
          onClick={closeMenu}
        >
          LAXVISH
        </Link>

        <NavMenu
          links={PRIMARY_NAV_LINKS}
          pathname={pathname}
          onNavigate={closeMenu}
          className="hidden items-center gap-1 md:flex"
        />

        <MagneticButton
          type="button"
          className={`${BOOK_NOW_BUTTON_CLASS} hidden md:inline-flex`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={redirectToDemo}
        >
          <span className="relative z-10">Book Now</span>
        </MagneticButton>
        <button
          type="button"
          className="rounded-md border border-charcoal/30 px-3 py-1.5 text-xs font-medium text-charcoal/90 transition-colors duration-200 hover:border-neonCyan/45 hover:text-neonCyan md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-nav-panel"
          className="border-t border-charcoal/15 bg-[#080808] px-4 py-4 md:hidden"
        >
          <NavMenu
            links={PRIMARY_NAV_LINKS}
            pathname={pathname}
            onNavigate={closeMenu}
            className="flex flex-col gap-2"
          />
          <button
            type="button"
            className={`${BOOK_NOW_BUTTON_CLASS} mt-4 w-full px-4`}
            onClick={redirectToDemo}
          >
            Book Now
          </button>
        </div>
      ) : null}
    </header>
  );
}
