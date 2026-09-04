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
        
        # Scroll to hold phase
        print("--- Scrolling to hold phase ---")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await page.wait_for_timeout(1500)
        
        # Inspect fixed landforms vs rotating color layer
        check = await page.evaluate("""() => {
            const svg = document.querySelector('div[role="img"] svg');
            const clipGroup = svg ? svg.querySelector('g[clip-path*="moon-sphere-clip"], g[clipPath*="moon-sphere-clip"]') : null;
            
            // Fixed landforms: craters and maria
            const cratersGroup = clipGroup ? Array.from(clipGroup.querySelectorAll('g')).find(g => g.querySelector('circle[cx="370"]')) : null;
            const mariaGroup = clipGroup ? Array.from(clipGroup.querySelectorAll('g')).find(g => g.querySelector('path[d*="M 220 250"]')) : null;
            
            // Rotating chromatic group
            const rotatingColorGroup = clipGroup ? Array.from(clipGroup.querySelectorAll('g')).find(g => g.querySelector('g[filter*="fluid-rainbow-wave"]')) : null;
            
            // Outer SVG group tilt
            const outerMotionGroup = svg ? svg.parentElement : null;
            
            return {
                hasCratersGroup: !!cratersGroup,
                hasMariaGroup: !!mariaGroup,
                hasRotatingColorGroup: !!rotatingColorGroup,
                isCratersInsideRotatingGroup: rotatingColorGroup ? rotatingColorGroup.contains(cratersGroup) : false,
                isMariaInsideRotatingGroup: rotatingColorGroup ? rotatingColorGroup.contains(mariaGroup) : false
            };
        }""")
        print("Internal Color-Only Rotation Audit:", check)
        
        await page.screenshot(path="public/moon_internal_color_rotation.png")
        print("Captured screenshot: public/moon_internal_color_rotation.png")
        
        await browser.close()

asyncio.run(run())
