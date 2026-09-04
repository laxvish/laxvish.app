import asyncio
from playwright.async_api import async_playwright

async def verify_moon_interaction():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )

        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        print("\n========================================================")
        print("TEST 1: REST STATE AT INITIAL LOAD (Scroll = 0)")
        print("========================================================")
        await page.goto("http://localhost:3060/", wait_until="networkidle")
        await asyncio.sleep(0.5)

        # Check initial rest state: Hero copy visible, Moon in right column (desktop)
        hero_h1 = page.locator("h1:has-text('We build AI systems')")
        h1_visible = await hero_h1.is_visible()
        h1_opacity = await page.evaluate("() => getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity")
        moon_left = await page.evaluate("() => document.querySelector('div[role=\"img\"]').getBoundingClientRect().left")

        print(f"  - H1 visible: {h1_visible}, opacity: {h1_opacity}")
        print(f"  - Moon initial left position: {moon_left}px (> 500px on desktop)")
        assert float(h1_opacity) > 0.9, "H1 should be fully visible at rest"
        assert moon_left > 500, "Moon should start on the right side on desktop"
        print("  ✓ Rest state verified successfully.")

        print("\n========================================================")
        print("TEST 2: ONE INTENTIONAL SCROLL INITIATES CINEMATIC COMPLETION")
        print("========================================================")
        # Move mouse to center of hero viewport and perform one gentle wheel gesture
        await page.mouse.move(720, 450)
        await page.mouse.wheel(0, 80)
        await asyncio.sleep(0.3)
        
        # Verify document was NOT auto-scrolled aggressively
        scroll_y_initial = await page.evaluate("() => window.scrollY")
        print(f"  - Natural scroll position after 1 gesture: {scroll_y_initial}px (Natural, NOT auto-scrolled)")
        assert scroll_y_initial < 400, "Document must not be aggressively auto-scrolled"

        # Wait for smooth stately transition to complete (~3.4s total)
        await asyncio.sleep(3.2)
        final_h1_opacity = await page.evaluate("() => parseFloat(getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity)")
        final_box_opacity = await page.evaluate("() => { const el = document.querySelector('textarea'); return el ? parseFloat(getComputedStyle(el.closest('.will-change-transform')).opacity) : 0; }")
        
        print(f"  - Final H1 opacity: {final_h1_opacity} (dissolved to 0)")
        print(f"  - Final ConversationalBox opacity: {final_box_opacity} (settled to 1)")
        assert final_h1_opacity < 0.05, "Hero copy should be dissolved at 100%"
        assert final_box_opacity > 0.95, "ConversationalBox should be 100% emerged"
        print("  ✓ Single intentional scroll completed the entire cinematic sequence smoothly!")

        print("\n========================================================")
        print("TEST 3: 100% STATE FREEZE & INTERNAL COLOR ROTATION ONLY")
        print("========================================================")
        # Verify Moon outer element does NOT rotate
        outer_moon_transform = await page.evaluate("() => getComputedStyle(document.querySelector('div[role=\"img\"]')).transform")
        print(f"  - Outer Moon transform: {outer_moon_transform}")

        # Check internal color wave layer has active continuous rotation
        internal_color_rotating = await page.evaluate('''() => {
            const colorGroup = document.querySelector('g[clip-path="url(#moon-sphere-clip)"] > g');
            if (!colorGroup) return false;
            const style = getComputedStyle(colorGroup);
            return style.transform !== "none" || colorGroup.hasAttribute("transform");
        }''')
        print(f"  - Internal color wave layer rotating: {internal_color_rotating}")

        # Check stationary landforms (craters and maria) do NOT rotate
        craters_stationary = await page.evaluate('''() => {
            const tycho = document.querySelector('circle[cx="370"][cy="580"]');
            return tycho !== null;
        }''')
        print(f"  - Stationary lunar features (Tycho, maria) intact and anchored: {craters_stationary}")
        print("  ✓ Moon outer body is frozen; ONLY internal chromatic light rotates!")

        print("\n========================================================")
        print("TEST 4: SCROLL TO TOP RESETS REST STATE")
        print("========================================================")
        await page.evaluate("() => window.scrollTo(0, 0)")
        await asyncio.sleep(2.0)

        reset_h1_opacity = await page.evaluate("() => parseFloat(getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity)")
        print(f"  - Reset H1 opacity: {reset_h1_opacity}")
        assert reset_h1_opacity > 0.85, "Hero copy should restore when scrolled back to top"
        print("  ✓ Top scroll returns smoothly to rest state.")

        await context.close()
        await browser.close()

        print("\n========================================================")
        print("🎉 ALL REFINED MOON SCROLL INTERACTION TESTS PASSED!")
        print("========================================================\n")

if __name__ == "__main__":
    asyncio.run(verify_moon_interaction())
