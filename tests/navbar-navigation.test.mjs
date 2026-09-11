import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const NAVBAR_PATH = path.join(ROOT, "components", "layout", "Navbar.tsx");
const NAVMENU_PATH = path.join(ROOT, "components", "layout", "NavMenu.tsx");

test("Navbar: File existence and export contracts", () => {
  assert.ok(fs.existsSync(NAVBAR_PATH), "Navbar.tsx must exist");
  assert.ok(fs.existsSync(NAVMENU_PATH), "NavMenu.tsx must exist");

  const navbarContent = fs.readFileSync(NAVBAR_PATH, "utf8");
  assert.match(navbarContent, /export\s+function\s+Navbar\s*\(/, "Navbar must export Navbar component");
});

test("Navbar: Desktop navigation layout and breakpoint", () => {
  const content = fs.readFileSync(NAVBAR_PATH, "utf8");

  // Desktop navigation should be visible at lg breakpoint
  assert.match(content, /hidden\s+[^"']*lg:flex|lg:flex\s+[^"']*hidden/, "Desktop nav should switch at lg breakpoint");
  // CTA hiding must use the max-* variant: base `hidden` loses to BOOK_NOW_BUTTON_CLASS's
  // base `inline-flex` in Tailwind v4 stylesheet order (hidden < inline-flex alphabetically),
  // so `hidden lg:inline-flex` leaves the CTA visible next to the hamburger below lg.
  assert.match(content, /max-lg:hidden/, "Desktop CTA must hide below lg via max-lg:hidden (ordering-safe)");
  assert.doesNotMatch(content, /BOOK_NOW_BUTTON_CLASS\} hidden lg:inline-flex/, "Broken base-vs-hidden ordering combo must not return");
});

test("Navbar: Mobile/tablet hamburger button and accessibility attributes", () => {
  const content = fs.readFileSync(NAVBAR_PATH, "utf8");

  // Accessible toggle button attributes
  assert.match(content, /aria-controls=["']mobile-nav-panel["']/, "Toggle button must control mobile-nav-panel");
  assert.match(content, /aria-expanded=\{isMenuOpen\}/, "Toggle button must bind aria-expanded");
  assert.match(content, /aria-label=\{isMenuOpen\s*\?\s*["'][^"']+["']\s*:\s*["'][^"']+["']\}/, "Toggle button must provide dynamic aria-label");
  assert.match(content, /focus-visible:outline/, "Toggle button must have visible focus state");

  // Hamburger line structure (clean architectural bars, not bare text)
  assert.match(content, /transition-transform/, "Hamburger lines must animate smoothly");
  assert.match(content, /lg:hidden/, "Hamburger button must be visible on mobile and tablet (lg:hidden)");
});

test("Navbar: Polish mobile navigation panel with animation and click-outside closure", () => {
  const content = fs.readFileSync(NAVBAR_PATH, "utf8");

  // Framer motion integration for fast, understated entrance/exit
  assert.match(content, /AnimatePresence/, "Navbar must use AnimatePresence for panel transition");
  assert.match(content, /motion\.(div|nav)/, "Mobile menu must be a motion component");

  // Escape key handler
  assert.match(content, /key\s*===\s*["']Escape["']/, "Must handle Escape key press");

  // Outside click / pointerdown handler
  assert.match(content, /mousedown|pointerdown/, "Must detect clicks outside the mobile menu");

  // Body scroll management without layout shift
  assert.match(content, /document\.body\.style\.overflow/, "Must manage body scroll lock");
});

test("NavMenu: Visible keyboard focus states", () => {
  const content = fs.readFileSync(NAVMENU_PATH, "utf8");
  assert.match(content, /focus-visible:outline/, "NavMenu links must provide visible keyboard focus outline");
});
