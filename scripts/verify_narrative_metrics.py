import asyncio
import sys
from playwright.async_api import async_playwright

async def verify_metrics():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )

        # 1. Desktop Verification (1440x900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060/", wait_until="networkidle")
        await page.wait_for_selector("h1")
        await asyncio.sleep(0.5)

        # Measure Rest State (Scroll = 0)
        moon_el = await page.query_selector("div[role='img']")
        moon_box_0 = await moon_el.bounding_box()
        vw_center = 1440 / 2
        moon_center_0 = moon_box_0["x"] + moon_box_0["width"] / 2
        print(f"[Desktop Scroll 0] Moon Center X: {moon_center_0:.1f}px (Viewport Center: {vw_center}px), Width: {moon_box_0['width']:.1f}px")

        # Scroll to 1400px (Settled State)
        await page.evaluate("() => window.scrollTo({ top: 1400, behavior: 'instant' })")
        await asyncio.sleep(0.7)

        moon_box_settled = await moon_el.bounding_box()
        moon_center_settled = moon_box_settled["x"] + moon_box_settled["width"] / 2
        dist_from_center = abs(moon_center_settled - vw_center)
        scale_ratio = moon_box_settled["width"] / moon_box_0["width"]

        # Measure Panel position relative to Moon
        panel_el = await page.query_selector("text=LAXVISH // ENTERPRISE SOLUTION ARCHITECT")
        panel_box = await panel_el.bounding_box()

        print(f"[Desktop Scroll 1400] Moon Center X: {moon_center_settled:.1f}px (Dist from Center: {dist_from_center:.1f}px)")
        print(f"[Desktop Scroll 1400] Moon Scale: {scale_ratio:.2f}x (Width: {moon_box_settled['width']:.1f}px vs {moon_box_0['width']:.1f}px)")
        print(f"[Desktop Scroll 1400] Moon Top Y: {moon_box_settled['y']:.1f}px, Panel Top Y: {panel_box['y']:.1f}px")

        # Verify Moon sits above the panel
        assert moon_box_settled['y'] < panel_box['y'], "Moon must be located above the panel!"

        # Test Interactive Blueprint generation on the panel
        btn_gen = await page.query_selector("button:has-text('Analyze & Generate Solution Blueprint')")
        assert btn_gen is not None, "Blueprint generate button should be present"
        await btn_gen.click()
        await asyncio.sleep(1.5)

        # Verify Blueprint tab is active
        blueprint_content = await page.query_selector("text=1. What Laxvish Will Build For You:")
        assert blueprint_content is not None, "Blueprint content must appear after clicking generate"
        print("[Desktop] Blueprint generation test passed!")

        # Verify horizontal overflow
        overflow = await page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        print(f"[Desktop] Horizontal Overflow: {overflow}")
        assert not overflow, "Desktop must have zero horizontal overflow"

        # 2. Mobile Verification (390x844)
        mob_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mob_page.goto("http://localhost:3060/", wait_until="networkidle")
        await mob_page.wait_for_selector("h1")
        await asyncio.sleep(0.5)

        mob_overflow = await mob_page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        print(f"[Mobile] Horizontal Overflow: {mob_overflow}")
        assert not mob_overflow, "Mobile must have zero horizontal overflow"

        # Scroll on Mobile
        await mob_page.evaluate("() => window.scrollTo({ top: 1200, behavior: 'instant' })")
        await asyncio.sleep(0.7)

        mob_panel = await mob_page.query_selector("text=LAXVISH // ENTERPRISE SOLUTION ARCHITECT")
        assert mob_panel is not None, "Mobile Solution Architect Panel should be visible"

        mob_btn = await mob_page.query_selector("button:has-text('Analyze & Generate Solution Blueprint')")
        await mob_btn.click()
        await asyncio.sleep(1.5)

        mob_bp = await mob_page.query_selector("text=1. What Laxvish Will Build For You:")
        assert mob_bp is not None, "Mobile blueprint view works!"
        print("[Mobile] Mobile interaction test passed!")

        await browser.close()
    print("ALL 3 UPGRADES TESTED AND VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(verify_metrics())
