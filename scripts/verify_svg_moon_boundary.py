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
        
        # Test 1: Verify SVG DOM hierarchy and clipping containment
        dom_check = await page.evaluate("""() => {
            const svg = document.querySelector('div[role="img"] svg');
            if (!svg) return { error: "SVG not found" };
            
            const clipPath = svg.querySelector('clipPath#moon-sphere-clip');
            const clipCircle = clipPath ? clipPath.querySelector('circle') : null;
            
            // Find all elements with rainbow gradients or filters
            const wavePaths = Array.from(svg.querySelectorAll('path[fill*="wave-"], motion\\\\.path[fill*="wave-"]'));
            const filteredGroups = Array.from(svg.querySelectorAll('g[filter*="fluid-rainbow-wave"]'));
            
            // Check if every rainbow element is an ancestor/descendant of a clipped group
            const clippedContainers = Array.from(svg.querySelectorAll('g[clip-path*="moon-sphere-clip"], g[clipPath*="moon-sphere-clip"]'));
            
            // Check if there are any rainbow circles or unclipped rainbow elements outside the clipped group
            const allRainbowElements = Array.from(svg.querySelectorAll('[fill*="wave-"], [fill*="rainbow"]'));
            const unclippedRainbowElements = allRainbowElements.filter(el => {
                let current = el;
                while (current && current !== svg) {
                    if (current.getAttribute('clip-path')?.includes('moon-sphere-clip') || 
                        current.getAttribute('clipPath')?.includes('moon-sphere-clip')) {
                        return false;
                    }
                    current = current.parentElement;
                }
                return true;
            });
            
            return {
                hasClipPath: !!clipPath,
                clipCircle: clipCircle ? { cx: clipCircle.getAttribute('cx'), cy: clipCircle.getAttribute('cy'), r: clipCircle.getAttribute('r') } : null,
                clippedContainersCount: clippedContainers.length,
                allRainbowCount: allRainbowElements.length,
                unclippedRainbowCount: unclippedRainbowElements.length,
                unclippedTagNames: unclippedRainbowElements.map(el => el.tagName)
            };
        }""")
        print("SVG DOM Clipping Audit:", dom_check)
        
        # Test 2: Check boundary across scroll checkpoints
        checkpoints = [0.0, 0.25, 0.50, 0.75, 1.0]
        for cp in checkpoints:
            await page.evaluate(f"window.scrollTo(0, window.innerHeight * {cp * 2.4})")
            await page.wait_for_timeout(400)
            await page.screenshot(path=f"public/moon_boundary_scroll_{int(cp*100)}.png")
            print(f"Captured screenshot at scroll {int(cp*100)}%: public/moon_boundary_scroll_{int(cp*100)}.png")
        
        await browser.close()

asyncio.run(run())
