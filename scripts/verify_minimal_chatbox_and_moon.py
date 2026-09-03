import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/usr/bin/google-chrome",
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        
        # Test 1: Desktop Viewport
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        print("--- CHECKPOINT 1: Desktop Scroll 0% (Rest State) ---")
        await page.screenshot(path="public/desktop_scroll_0.png")
        
        print("--- CHECKPOINT 2: Desktop Scroll 35% (Disorganized Motion Swirl) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 0.75)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="public/desktop_scroll_35.png")
        
        print("--- CHECKPOINT 3: Desktop Scroll 65% (Moon & Chatbox Aligned) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 1.55)")
        await page.wait_for_timeout(1200)
        await page.screenshot(path="public/desktop_scroll_65.png")
        
        # Measure Moon vs Chatbox alignment
        metrics = await page.evaluate("""() => {
            const moonSvg = document.querySelector('div[role="img"]');
            const chatbox = document.querySelector('textarea')?.closest('.relative');
            const moonRect = moonSvg ? moonSvg.getBoundingClientRect() : null;
            const chatRect = chatbox ? chatbox.getBoundingClientRect() : null;
            
            const viewportCenterX = window.innerWidth / 2;
            const moonCenterX = moonRect ? moonRect.left + moonRect.width / 2 : 0;
            const chatCenterX = chatRect ? chatRect.left + chatRect.width / 2 : 0;
            
            return {
                windowWidth: window.innerWidth,
                viewportCenterX,
                moonCenterX,
                chatCenterX,
                moonDeltaX: Math.abs(moonCenterX - viewportCenterX),
                chatDeltaX: Math.abs(chatCenterX - viewportCenterX),
                moonBottom: moonRect ? moonRect.bottom : 0,
                chatTop: chatRect ? chatRect.top : 0,
                isMoonAboveChat: moonRect && chatRect ? moonRect.top < chatRect.top : false,
                verticalGap: chatRect && moonRect ? chatRect.top - moonRect.bottom : 0
            };
        }""")
        print("Desktop Convergence Metrics:", metrics)
        
        # Test 2: Interactive Prompt & Synthesis Testing
        print("--- CHECKPOINT 4: Interactive Preset Click & Synthesis ---")
        # Click on 'Vendor AP & GST-2B' preset
        preset_btn = page.locator("button:has-text('Vendor AP & GST-2B')")
        if await preset_btn.count() > 0:
            await preset_btn.first.click()
            await page.wait_for_timeout(400)
        
        # Click Synthesize button
        synth_btn = page.locator("button:has-text('Synthesize')")
        if await synth_btn.count() > 0:
            await synth_btn.first.click()
            # Wait for thinking & synthesis animation
            await page.wait_for_timeout(1600)
            await page.screenshot(path="public/desktop_synthesized_blueprint.png")
            print("Successfully clicked Synthesize and captured response blueprint!")
        
        # Test 3: Mobile Viewport
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3060", wait_until="networkidle")
        await mobile_page.wait_for_timeout(1000)
        
        print("--- CHECKPOINT 5: Mobile Scroll 0% ---")
        await mobile_page.screenshot(path="public/mobile_scroll_0.png")
        
        print("--- CHECKPOINT 6: Mobile Scroll 65% ---")
        await mobile_page.evaluate("window.scrollTo(0, window.innerHeight * 1.55)")
        await mobile_page.wait_for_timeout(1200)
        await mobile_page.screenshot(path="public/mobile_scroll_65.png")
        
        mobile_overflow = await mobile_page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print("Mobile Overflow Check:", mobile_overflow)
        
        await browser.close()

asyncio.run(run())
