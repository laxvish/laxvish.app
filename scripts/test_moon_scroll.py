import asyncio
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def test_moon_scroll():
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
        
        # Checkpoint A: Scroll = 0 (Hero at rest)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-desk-000-rest.png"), full_page=False)
        print("Captured narrative-desk-000-rest.png")
        
        # Checkpoint B: Scroll = 400px (~25% progress: hero fading, moon gliding towards center)
        await page.evaluate("() => window.scrollTo({ top: 400, behavior: 'instant' })")
        await asyncio.sleep(0.6)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-desk-400-glide.png"), full_page=False)
        print("Captured narrative-desk-400-glide.png")
        
        # Checkpoint C: Scroll = 900px (~55% progress: moon centered & scaled 1.30x, box emerging)
        await page.evaluate("() => window.scrollTo({ top: 900, behavior: 'instant' })")
        await asyncio.sleep(0.6)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-desk-900-emerge.png"), full_page=False)
        print("Captured narrative-desk-900-emerge.png")

        # Checkpoint D: Scroll = 1400px (~85% progress: full stable composition with prompt box)
        await page.evaluate("() => window.scrollTo({ top: 1400, behavior: 'instant' })")
        await asyncio.sleep(0.6)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-desk-1400-settled.png"), full_page=False)
        print("Captured narrative-desk-1400-settled.png")

        # 2. Mobile Verification (390x844)
        mob_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mob_page.goto("http://localhost:3060/", wait_until="networkidle")
        await mob_page.wait_for_selector("h1")
        await asyncio.sleep(0.5)

        # Mobile Scroll = 0
        await mob_page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-mob-000-rest.png"), full_page=False)
        print("Captured narrative-mob-000-rest.png")

        # Mobile Scroll = 1200px
        await mob_page.evaluate("() => window.scrollTo({ top: 1200, behavior: 'instant' })")
        await asyncio.sleep(0.6)
        await mob_page.screenshot(path=os.path.join(OUTPUT_DIR, "narrative-mob-1200-settled.png"), full_page=False)
        print("Captured narrative-mob-1200-settled.png")

        await browser.close()
    print("Scroll narrative verification completed successfully!")

if __name__ == "__main__":
    asyncio.run(test_moon_scroll())
