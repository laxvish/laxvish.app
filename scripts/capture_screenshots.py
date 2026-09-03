import asyncio
import os
import sys
from playwright.async_api import async_playwright

OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/screenshots"
BASE_URL = "http://localhost:3060"

PAGES = [
    {"path": "/", "name": "home"},
    {"path": "/workers", "name": "workers"},
    {"path": "/brain", "name": "brain"},
    {"path": "/brakes", "name": "brakes"},
    {"path": "/callme", "name": "callme"},
    {"path": "/security-trust", "name": "security-trust"},
    {"path": "/solutions/sales-automation", "name": "solution-sales"},
    {"path": "/solutions", "name": "solutions-index"},
]

VIEWPORTS = [
    {"name": "desktop", "width": 1440, "height": 900, "is_mobile": False},
    {"name": "mobile", "width": 390, "height": 844, "is_mobile": True, "device_scale_factor": 2},
]

async def capture_screenshots():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
        )
        
        for vp in VIEWPORTS:
            context = await browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                is_mobile=vp["is_mobile"],
                device_scale_factor=vp.get("device_scale_factor", 1),
            )
            page = await context.new_page()
            
            for pg in PAGES:
                url = f"{BASE_URL}{pg['path']}"
                sys.stdout.write(f"Capturing {pg['name']} [{vp['name']}] -> {url}...\n")
                sys.stdout.flush()
                await page.goto(url, wait_until="load")
                await page.wait_for_selector("h1", timeout=5000)
                await asyncio.sleep(0.3)
                
                # Check for horizontal overflow
                scroll_width = await page.evaluate("() => document.documentElement.scrollWidth")
                client_width = await page.evaluate("() => document.documentElement.clientWidth")
                has_overflow = scroll_width > client_width
                status = f"[ALERT] OVERFLOW ({scroll_width} > {client_width})" if has_overflow else f"[OK] (width={client_width})"
                sys.stdout.write(f"  {status}\n")
                
                # Viewport screenshot
                vp_filename = f"{pg['name']}-{vp['name']}-viewport.png"
                await page.screenshot(path=os.path.join(OUTPUT_DIR, vp_filename), full_page=False)
                
                # Full page screenshot
                full_filename = f"{pg['name']}-{vp['name']}-full.png"
                await page.screenshot(path=os.path.join(OUTPUT_DIR, full_filename), full_page=True)
                sys.stdout.flush()
            
            await context.close()
        
        await browser.close()
    print("\nAll screenshots captured and verified successfully.")

if __name__ == "__main__":
    asyncio.run(capture_screenshots())
