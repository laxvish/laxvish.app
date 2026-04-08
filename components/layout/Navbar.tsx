"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navItems: Array<{ href: string; label: string }> = [
  { href: "#the-os", label: "The OS" },
  { href: "#agents", label: "Agents" },
  { href: "#compliance", label: "Compliance" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-obsidian/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.22em] text-white [font-family:var(--font-space-grotesk)] sm:text-lg sm:tracking-[0.3em]"
          onClick={closeMenu}
        >
          LAXVISH
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 transition-colors duration-150 hover:text-neonCyan"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MagneticButton type="button" className="hidden md:inline-flex">
          Book Demo
        </MagneticButton>
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors duration-200 hover:border-neonCyan/40 hover:text-neonCyan md:hidden"
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
          className="border-t border-white/10 bg-obsidian/95 px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-1.5 text-sm text-gray-300 transition-colors duration-200 hover:text-neonCyan"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="mt-2 rounded-full bg-vaultAmber px-4 py-2 text-sm font-semibold text-black"
              onClick={closeMenu}
            >
              Book Demo
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
