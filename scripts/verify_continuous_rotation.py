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
        
        # Test 1: Scroll to 100% (bottom of Hero track)
        print("--- Scrolling to 100% settled state ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 2.4)")
        await page.wait_for_timeout(1500)
        
        # Capture frames during continuous rotation at t=0s, t=2s, t=4s
        print("Capturing rotation frame 1 (t=0s)...")
        await page.screenshot(path="public/rotation_frame_0s.png")
        
        await page.wait_for_timeout(2000)
        print("Capturing rotation frame 2 (t=2s)...")
        await page.screenshot(path="public/rotation_frame_2s.png")
        
        await page.wait_for_timeout(2000)
        print("Capturing rotation frame 3 (t=4s)...")
        await page.screenshot(path="public/rotation_frame_4s.png")
        
        # Check clipping containment during rotation
        dom_check = await page.evaluate("""() => {
            const svg = document.querySelector('div[role="img"] svg');
            const clipPath = svg.querySelector('clipPath#moon-sphere-clip');
            const rotatingGroup = svg.querySelector('g[clip-path*="moon-sphere-clip"] > g');
            
            // Check position stability
            const moonRect = svg.getBoundingClientRect();
            const viewportCenterX = window.innerWidth / 2;
            const moonCenterX = moonRect.left + moonRect.width / 2;
            
            return {
                hasClipPath: !!clipPath,
                hasRotatingGroup: !!rotatingGroup,
                moonCenterX,
                viewportCenterX,
                deltaX: Math.abs(moonCenterX - viewportCenterX)
            };
        }""")
        print("Continuous Rotation Verification:", dom_check)
        
        # Test 2: Scroll back to top
        print("--- Scrolling back to 0% (Reverse test) ---")
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1500)
        await page.screenshot(path="public/rotation_reverse_0s.png")
        print("Reverse scroll completed smoothly!")
        
        await browser.close()

asyncio.run(run())
