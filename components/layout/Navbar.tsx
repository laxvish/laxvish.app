"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NavMenu } from "@/components/layout/NavMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BOOK_NOW_BUTTON_CLASS,
  PRIMARY_NAV_LINKS,
  getBookDemoUrl,
} from "@/lib/site-navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const neetoCalUrl = getBookDemoUrl();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close menu during render if route has changed (official React pattern avoiding effect cascades)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  // Handle outside click / pointerdown to close the menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const clickedInsideMenu = menuRef.current?.contains(target);
      const clickedToggle = toggleButtonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isMenuOpen, closeMenu]);

  // Handle body scroll locking, Escape key navigation, and viewport resize
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
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
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-base sm:text-lg font-normal tracking-[0.2em] uppercase text-charcoal hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
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
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        />

        {/* Desktop Primary CTA */}
        <MagneticButton
          type="button"
          className={`${BOOK_NOW_BUTTON_CLASS} max-lg:hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal`}
          onClick={redirectToDemo}
        >
          <span>Book a working session</span>
        </MagneticButton>

        {/* Mobile / Tablet Hamburger Toggle Button */}
        <button
          ref={toggleButtonRef}
          type="button"
          className="group relative inline-flex items-center justify-center p-2.5 text-charcoal transition-colors hover:bg-charcoal/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal lg:hidden cursor-pointer select-none border border-charcoal/20"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="sr-only">
            {isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>
          <div className="relative flex h-3.5 w-4 flex-col justify-between items-center" aria-hidden="true">
            <span
              className={`block h-[1.5px] w-4 bg-charcoal transition-transform duration-200 ease-out origin-center ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-charcoal transition-opacity duration-150 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-charcoal transition-transform duration-200 ease-out origin-center ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile / Tablet Full Navigation Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-nav-panel"
            id="mobile-nav-panel"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 flex flex-col justify-between border-t border-charcoal/15 bg-obsidian px-6 py-6 sm:px-10 sm:py-8 overflow-y-auto overscroll-contain lg:hidden"
          >
            <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between">
              {/* Section 1: Numbered Navigation Links */}
              <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
                {PRIMARY_NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex items-center justify-between py-4 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] text-neonCyan tracking-widest" aria-hidden="true">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-lg sm:text-xl font-normal tracking-tight transition-colors ${
                            isActive
                              ? "text-charcoal font-medium underline underline-offset-4 decoration-charcoal/40"
                              : "text-charcoal/85 group-hover:text-charcoal"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      <span className="text-neonCyan text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Section 2: Bottom Action & System Provenance */}
              <div className="mt-8 pt-6 border-t border-charcoal/15 space-y-4">
                <button
                  type="button"
                  className={`${BOOK_NOW_BUTTON_CLASS} w-full justify-center text-center py-3.5 text-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-charcoal`}
                  onClick={redirectToDemo}
                >
                  <span>Book a working session</span>
                </button>

                <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.18em] text-neonCyan uppercase pt-2">
                  <span>MADE IN INDIA</span>
                  <span>DPDP-READY</span>
                  <span>SYSTEM ARCHITECTURE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
