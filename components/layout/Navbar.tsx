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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal bg-obsidian/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="text-base sm:text-lg font-normal tracking-[0.2em] uppercase text-charcoal"
          onClick={closeMenu}
        >
          Laxvish
        </Link>

        <NavMenu
          links={PRIMARY_NAV_LINKS}
          pathname={pathname}
          onNavigate={closeMenu}
          className="hidden items-center gap-6 md:flex"
        />

        <MagneticButton
          type="button"
          className={`${BOOK_NOW_BUTTON_CLASS} hidden md:inline-flex`}
          onClick={redirectToDemo}
        >
          <span>Book a working session</span>
        </MagneticButton>

        <button
          type="button"
          className="border border-charcoal px-3.5 py-1.5 text-xs font-medium tracking-[0.15em] uppercase text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-obsidian md:hidden"
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
          className="border-t border-charcoal bg-obsidian px-6 py-8 md:hidden"
        >
          <NavMenu
            links={PRIMARY_NAV_LINKS}
            pathname={pathname}
            onNavigate={closeMenu}
            className="flex flex-col gap-1"
          />
          <button
            type="button"
            className={`${BOOK_NOW_BUTTON_CLASS} mt-8 w-full justify-center text-center`}
            onClick={redirectToDemo}
          >
            Book a working session
          </button>
        </div>
      ) : null}
    </header>
  );
}
