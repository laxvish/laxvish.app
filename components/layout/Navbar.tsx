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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal bg-obsidian">
      <div className="mx-auto flex h-20 w-full max-w-[96rem] items-center justify-between px-6 sm:h-24 sm:px-12 lg:px-16">
        <Link
          href="/"
          className="text-lg font-normal tracking-[0.2em] uppercase text-charcoal sm:text-xl"
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
          <span>Book Now</span>
        </MagneticButton>
        <button
          type="button"
          className="border border-charcoal px-4 py-2 text-sm font-medium tracking-wide text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-obsidian md:hidden"
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
          className="border-t border-charcoal bg-obsidian px-6 py-6 md:hidden"
        >
          <NavMenu
            links={PRIMARY_NAV_LINKS}
            pathname={pathname}
            onNavigate={closeMenu}
            className="flex flex-col gap-4"
          />
          <button
            type="button"
            className={`${BOOK_NOW_BUTTON_CLASS} mt-6 w-full`}
            onClick={redirectToDemo}
          >
            Book Now
          </button>
        </div>
      ) : null}
    </header>
  );
}
