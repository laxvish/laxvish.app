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
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060/", wait_until="load")
        await page.wait_for_selector("h1")
        await asyncio.sleep(0.5)
        
        # State 1: At rest (Scroll 0) - Serene Monochrome
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "moon-scroll-0-mono.png"), full_page=False)
        print("Captured moon-scroll-0-mono.png (Scroll = 0px)")
        
        # State 2: Midway scroll (Scroll 200px) - Color transition starts
        await page.evaluate("() => window.scrollTo({ top: 200, behavior: 'instant' })")
        await asyncio.sleep(0.5)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "moon-scroll-200-transition.png"), full_page=False)
        print("Captured moon-scroll-200-transition.png (Scroll = 200px)")
        
        # State 3: Fully scrolled (Scroll 400px) - Full fluid chromatic rainbow spectrum + shifted towards center
        await page.evaluate("() => window.scrollTo({ top: 400, behavior: 'instant' })")
        await asyncio.sleep(0.5)
        await page.screenshot(path=os.path.join(OUTPUT_DIR, "moon-scroll-400-chromatic.png"), full_page=False)
        print("Captured moon-scroll-400-chromatic.png (Scroll = 400px)")
        
        await browser.close()
    print("Moon scroll verification completed successfully!")

if __name__ == "__main__":
    asyncio.run(test_moon_scroll())
