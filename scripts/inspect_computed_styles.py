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
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await page.wait_for_timeout(1000)
        
        computed = await page.evaluate("""() => {
            const textarea = document.querySelector('textarea');
            const container = textarea.closest('div.bg-white') || textarea.parentElement.parentElement;
            const style = window.getComputedStyle(container);
            const buttons = Array.from(container.querySelectorAll('button'));
            const cta = buttons.find(b => b.innerText.includes('Synthesize Architecture'));
            
            return {
                container: {
                    borderRadius: style.borderRadius,
                    backgroundColor: style.backgroundColor,
                    borderWidth: style.borderWidth,
                    borderColor: style.borderColor,
                    boxShadow: style.boxShadow,
                    width: container.getBoundingClientRect().width,
                    height: container.getBoundingClientRect().height
                },
                textarea: {
                    fontSize: window.getComputedStyle(textarea).fontSize,
                    lineHeight: window.getComputedStyle(textarea).lineHeight,
                    color: window.getComputedStyle(textarea).color
                },
                cta: cta ? {
                    borderRadius: window.getComputedStyle(cta).borderRadius,
                    backgroundColor: window.getComputedStyle(cta).backgroundColor,
                    color: window.getComputedStyle(cta).color,
                    padding: window.getComputedStyle(cta).padding
                } : null
            };
        }""")
        print("Computed Style Audit:", computed)
        await browser.close()

asyncio.run(run())
