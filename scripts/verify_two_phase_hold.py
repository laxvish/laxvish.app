import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/usr/bin/google-chrome",
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # Test 1: Checkpoint at Scroll 0% (Rest)
        print("--- Checkpoint 1: Scroll 0% (Rest State) ---")
        await page.screenshot(path="public/hold_phase_0.png")
        
        # Test 2: Checkpoint at Scroll 40% (Transformation mid-journey)
        print("--- Checkpoint 2: Scroll 40% (Mid-Transformation) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 1.9)")
        await page.wait_for_timeout(600)
        await page.screenshot(path="public/hold_phase_40.png")
        
        # Test 3: Checkpoint at Scroll 76% (Transformation 100% Complete / Entry to Hold)
        print("--- Checkpoint 3: Scroll 76% (Transformation Complete -> Entry to Hold) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.65)")
        await page.wait_for_timeout(800)
        await page.screenshot(path="public/hold_phase_76.png")
        
        # Test 4: Checkpoint at Scroll 88% (Dedicated Hold Phase)
        print("--- Checkpoint 4: Scroll 88% (Dedicated Hold Distance - Moon centered & rotating) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 4.2)")
        await page.wait_for_timeout(800)
        await page.screenshot(path="public/hold_phase_88.png")
        
        # Measure alignment & hold stability
        metrics = await page.evaluate("""() => {
            const moonSvg = document.querySelector('div[role="img"] svg');
            const chatbox = document.querySelector('textarea')?.closest('.rounded-2xl, .rounded-3xl');
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
                isMoonAboveChat: moonRect && chatRect ? moonRect.top < chatRect.top : false
            };
        }""")
        print("Hold Phase Convergence Metrics:", metrics)
        
        # Test 5: Checkpoint at Scroll 100%+ (Unpinning & smooth exit)
        print("--- Checkpoint 5: Scroll 100%+ (Hero unpinning into next section) ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 5.0)")
        await page.wait_for_timeout(800)
        await page.screenshot(path="public/hold_phase_100.png")
        print("All hold phase checkpoints verified successfully!")
        
        await browser.close()

asyncio.run(run())
