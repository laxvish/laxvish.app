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
            // Find the visible moon circle inside SVG
            const circles = Array.from(document.querySelectorAll('circle'));
            const moonCircle = circles.find(c => c.getAttribute('r') === '240' || c.getAttribute('r') === '170');
            const circleRect = moonCircle ? moonCircle.getBoundingClientRect() : null;
            
            const chatbox = document.querySelector('textarea')?.closest('.rounded-2xl, .rounded-3xl');
            const chatRect = chatbox ? chatbox.getBoundingClientRect() : null;
            
            return {
                circleRect: circleRect ? { top: circleRect.top, bottom: circleRect.bottom, left: circleRect.left, right: circleRect.right, height: circleRect.height } : null,
                chatRect: chatRect ? { top: chatRect.top, bottom: chatRect.bottom, left: chatRect.left, right: chatRect.right, height: chatRect.height } : null,
                visibleGap: circleRect && chatRect ? chatRect.top - circleRect.bottom : null
            };
        }""")
        print("Visible Moon Circle vs Chatbox details:", details)
        await browser.close()

asyncio.run(run())
