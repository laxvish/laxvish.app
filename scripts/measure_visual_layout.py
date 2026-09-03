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
        await page.evaluate("window.scrollTo(0, window.innerHeight * 1.55)")
        await page.wait_for_timeout(1000)
        
        details = await page.evaluate("""() => {
            const svg = document.querySelector('svg');
            const svgRect = svg.getBoundingClientRect();
            
            // The moon is in the upper part of the 560x640 viewBox (center is y=240, r=170, bottom of sphere is y=410 / 640 = 64% of svg height)
            const estimatedSphereBottom = svgRect.top + (svgRect.height * (410 / 640));
            
            const chatbox = document.querySelector('textarea')?.closest('.rounded-2xl, .rounded-3xl');
            const chatRect = chatbox ? chatbox.getBoundingClientRect() : null;
            
            return {
                svgTop: svgRect.top,
                svgBottom: svgRect.bottom,
                svgHeight: svgRect.height,
                estimatedSphereBottom,
                chatTop: chatRect ? chatRect.top : null,
                chatBottom: chatRect ? chatRect.bottom : null,
                chatHeight: chatRect ? chatRect.height : null,
                sphereToChatGap: chatRect ? chatRect.top - estimatedSphereBottom : null,
                viewportCenter: window.innerWidth / 2,
                svgCenter: svgRect.left + svgRect.width / 2,
                chatCenter: chatRect ? chatRect.left + chatRect.width / 2 : null
            };
        }""")
        print("Visual alignment details:", details)
        await browser.close()

asyncio.run(run())
