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

        # 1. Desktop Verification
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

        print(f"[Desktop Scroll 1400] Moon Center X: {moon_center_settled:.1f}px (Dist from Viewport Center: {dist_from_center:.1f}px)")
        print(f"[Desktop Scroll 1400] Moon Scale: {scale_ratio:.2f}x (Width: {moon_box_settled['width']:.1f}px vs {moon_box_0['width']:.1f}px)")

        # Verify Conversational Box
        conv_box = await page.query_selector("text=CONTROL SURFACE // WORKFLOW DISPATCH")
        assert conv_box is not None, "Conversational Box should be mounted and visible"
        
        # Verify page horizontal overflow
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

        await mob_page.evaluate("() => window.scrollTo({ top: 1200, behavior: 'instant' })")
        await asyncio.sleep(0.7)

        mob_conv_box = await mob_page.query_selector("text=CONTROL SURFACE // WORKFLOW DISPATCH")
        assert mob_conv_box is not None, "Mobile Conversational Box should be visible"

        await browser.close()
    print("ALL METRICS VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(verify_metrics())
