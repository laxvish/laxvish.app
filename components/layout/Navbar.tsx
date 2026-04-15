"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavMenu } from "@/components/layout/NavMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PRIMARY_NAV_LINKS, getBookDemoUrl } from "@/lib/site-navigation";

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
          className="relative hidden overflow-hidden rounded-full border border-[#90b2ff]/50 bg-[linear-gradient(135deg,#d9e8ff_0%,#a9c4ff_50%,#7ea7ff_100%)] px-5 py-2 text-sm font-semibold tracking-[0.01em] text-obsidian shadow-[0_12px_30px_rgba(62,108,214,0.38)] transition-all duration-300 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.58)_50%,transparent_100%)] before:translate-x-[-140%] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(62,108,214,0.46)] hover:before:translate-x-[140%] md:inline-flex"
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
            className="mt-4 w-full rounded-full border border-[#90b2ff]/45 bg-[linear-gradient(135deg,#d9e8ff_0%,#a9c4ff_50%,#7ea7ff_100%)] px-4 py-2 text-sm font-semibold text-obsidian shadow-[0_8px_20px_rgba(62,108,214,0.33)] transition-all duration-200 hover:shadow-[0_10px_24px_rgba(62,108,214,0.42)]"
            onClick={redirectToDemo}
          >
            Book Now
          </button>
        </div>
      ) : null}
    </header>
  );
}
