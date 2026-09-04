import asyncio
import os
from playwright.async_api import async_playwright

os.makedirs("laxvish.app/.screenshots/responsive_audit", exist_ok=True)

DEVICES = [
    ("iphone_se_320", 320, 568),
    ("android_360", 360, 640),
    ("iphone_14_390", 390, 844),
    ("android_412", 412, 915),
    ("iphone_promax_430", 430, 932),
    ("ipad_mini_768", 768, 1024),
    ("ipad_pro_1024", 1024, 1366),
    ("desktop_1440", 1440, 900),
    ("landscape_phone_844x390", 844, 390),
]

async def audit():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        for dev_name, w, h in DEVICES:
            context = await browser.new_context(
                viewport={"width": w, "height": h},
                is_mobile=(w < 768),
            )
            page = await context.new_page()
            await page.goto("http://localhost:3060/", wait_until="networkidle")
            await asyncio.sleep(0.5)
            
            # 1. Capture initial Hero (scroll 0)
            await page.screenshot(path=f"laxvish.app/.screenshots/responsive_audit/{dev_name}_01_hero_initial.png")
            
            # 2. Test Mobile Menu if mobile
            if w < 768:
                menu_btn = page.locator("button:has-text('Menu')")
                if await menu_btn.is_visible():
                    await menu_btn.click()
                    await asyncio.sleep(0.3)
                    await page.screenshot(path=f"laxvish.app/.screenshots/responsive_audit/{dev_name}_02_menu_open.png")
                    # Close menu
                    close_btn = page.locator("button:has-text('Close')")
                    if await close_btn.is_visible():
                        await close_btn.click()
                        await asyncio.sleep(0.3)
            
            # 3. Scroll down into hero transition
            await page.evaluate("window.scrollTo(0, window.innerHeight * 2)")
            await asyncio.sleep(0.6)
            await page.screenshot(path=f"laxvish.app/.screenshots/responsive_audit/{dev_name}_03_hero_scrolled.png")
            
            # 4. Scroll into hold state
            await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
            await asyncio.sleep(0.6)
            await page.screenshot(path=f"laxvish.app/.screenshots/responsive_audit/{dev_name}_04_hero_hold.png")
            
            # 5. Scroll into Pillars / Proof / Contact / Footer
            await page.evaluate("window.scrollTo(0, window.innerHeight * 5.5)")
            await asyncio.sleep(0.4)
            await page.screenshot(path=f"laxvish.app/.screenshots/responsive_audit/{dev_name}_05_pillars.png")
            
            await context.close()
            print(f"Captured audit for {dev_name} ({w}x{h})")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(audit())
