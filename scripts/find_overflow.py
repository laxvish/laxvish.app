import asyncio
from playwright.async_api import async_playwright

async def find_overflow_elements():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060/", wait_until="networkidle")

        overflowing = await page.evaluate('''() => {
            const elements = [];
            const docW = window.innerWidth;
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > docW + 1 || rect.left < -1) {
                    elements.push({
                        tag: el.tagName,
                        className: el.className,
                        id: el.id,
                        right: rect.right,
                        left: rect.left,
                        width: rect.width
                    });
                }
            });
            return elements;
        }''')

        print(f"Found {len(overflowing)} overflowing elements on 1440x900:")
        for el in overflowing[:10]:
            print(f"  - <{el['tag']} id='{el['id']}' class='{el['className'][:80]}...'> right={el['right']}, left={el['left']}, w={el['width']}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(find_overflow_elements())
