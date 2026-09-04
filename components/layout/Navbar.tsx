"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle body scroll locking and Escape key when mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen, closeMenu]);

  const redirectToDemo = () => {
    closeMenu();
    window.location.assign(neetoCalUrl);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/15 bg-obsidian">
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="text-base sm:text-lg font-normal tracking-[0.2em] uppercase text-charcoal hover:opacity-80 transition-opacity"
          onClick={closeMenu}
          aria-label="Laxvish Home"
        >
          Laxvish
        </Link>

        {/* Desktop Navigation Links */}
        <NavMenu
          links={PRIMARY_NAV_LINKS}
          pathname={pathname}
          onNavigate={closeMenu}
          className="hidden items-center gap-6 md:flex"
        />

        {/* Desktop Primary CTA */}
        <MagneticButton
          type="button"
          className={`${BOOK_NOW_BUTTON_CLASS} hidden md:inline-flex`}
          onClick={redirectToDemo}
        >
          <span>Book a working session</span>
        </MagneticButton>

        {/* Mobile Minimal Toggle Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center border border-charcoal/30 px-3.5 py-2 text-xs font-mono font-medium tracking-[0.16em] uppercase text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-obsidian md:hidden cursor-pointer select-none"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-dialog"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile Full-Bleed Editorial Drawer */}
      {isMenuOpen ? (
        <div
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 flex flex-col justify-between border-t border-charcoal/15 bg-obsidian px-6 py-8 overflow-y-auto overscroll-contain md:hidden"
        >
          {/* Section 1: Numbered Navigation Links */}
          <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
            {PRIMARY_NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-4.5 group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-neonCyan tracking-widest">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xl font-normal tracking-tight transition-colors ${
                        isActive
                          ? "text-charcoal font-medium underline underline-offset-4 decoration-charcoal/40"
                          : "text-charcoal/85 group-hover:text-charcoal"
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <span className="text-neonCyan text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Section 2: Bottom Action & System Provenance */}
          <div className="mt-8 pt-6 border-t border-charcoal/15 space-y-4">
            <button
              type="button"
              className={`${BOOK_NOW_BUTTON_CLASS} w-full justify-center text-center py-3.5 text-sm`}
              onClick={redirectToDemo}
            >
              Book a working session
            </button>

            <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.18em] text-neonCyan uppercase pt-2">
              <span>MADE IN INDIA</span>
              <span>DPDP-READY</span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
