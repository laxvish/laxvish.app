import asyncio
from playwright.async_api import async_playwright

async def find_overflow():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            device_scale_factor=2,
        )
        page = await context.new_page()
        await page.goto("http://localhost:3060/workers", wait_until="networkidle")
        await asyncio.sleep(1.0)
        
        elements = await page.evaluate('''() => {
            const results = [];
            const docWidth = document.documentElement.clientWidth;
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > docWidth + 1 || el.offsetWidth > docWidth + 1 || el.scrollWidth > docWidth + 1) {
                    results.push({
                        tagName: el.tagName,
                        className: (el.className && typeof el.className === 'string') ? el.className.substring(0, 80) : '',
                        offsetWidth: el.offsetWidth,
                        scrollWidth: el.scrollWidth,
                        right: rect.right,
                        id: el.id,
                        innerText: (el.innerText || '').substring(0, 40)
                    });
                }
            });
            return results;
        }''')
        
        print(f"Found {len(elements)} overflowing elements:")
        for idx, el in enumerate(elements[:15]):
            print(f"[{idx+1}] <{el['tagName']}> id='{el['id']}' class='{el['className']}' offsetWidth={el['offsetWidth']} scrollWidth={el['scrollWidth']} right={el['right']} text='{el['innerText']}'")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(find_overflow())
