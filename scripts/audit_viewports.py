import asyncio
from playwright.async_api import async_playwright

VIEWPORTS = [
    ("iPhone SE 1st gen", 320, 568),
    ("Android Small", 360, 640),
    ("iPhone SE", 375, 667),
    ("iPhone 14", 390, 844),
    ("iPhone 15 Pro", 393, 852),
    ("Samsung S20", 412, 915),
    ("iPhone Pro Max", 430, 932),
    ("Wide Android", 480, 960),
    ("Landscape Phone 1", 667, 375),
    ("Landscape Phone 2", 844, 390),
    ("Landscape Phone 3", 932, 430),
    ("iPad Mini", 768, 1024),
    ("iPad 10.2", 810, 1080),
    ("iPad Pro 11", 834, 1194),
    ("iPad Pro 12.9", 1024, 1366),
    ("Android Tab Land", 1280, 800),
    ("Desktop 1366", 1366, 768),
    ("Desktop 1440", 1440, 900),
    ("Desktop 1536", 1536, 864),
    ("Desktop 1920", 1920, 1080),
]

async def check_viewport(browser, name, width, height, path="/"):
    context = await browser.new_context(
        viewport={"width": width, "height": height},
        is_mobile=(width < 768),
    )
    page = await context.new_page()
    try:
        await page.goto(f"http://localhost:3060{path}", wait_until="domcontentloaded")
        await asyncio.sleep(0.3)
        
        info = await page.evaluate('''() => {
            const scrollW = document.documentElement.scrollWidth;
            const innerW = window.innerWidth;
            const overflowingEls = [];
            if (scrollW > innerW) {
                document.querySelectorAll('*').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > innerW + 1 || el.offsetWidth > innerW + 1) {
                        overflowingEls.push({
                            tag: el.tagName,
                            id: el.id,
                            cls: (el.className && typeof el.className === 'string') ? el.className.substring(0, 50) : '',
                            rectRight: rect.right,
                            offsetWidth: el.offsetWidth
                        });
                    }
                });
            }
            return { scrollW, innerW, overflowingEls: overflowingEls.slice(0, 5) };
        }''')
        
        has_overflow = info["scrollW"] > info["innerW"]
        status = "FAIL" if has_overflow else "OK"
        print(f"[{status}] {name} ({width}x{height}) {path} -> scrollW: {info['scrollW']}, innerW: {info['innerW']}")
        if has_overflow:
            for el in info["overflowingEls"]:
                print(f"    Overflowing: <{el['tag']} id='{el['id']}' class='{el['cls']}'> right={el['rectRight']} offsetW={el['offsetWidth']}")
    finally:
        await context.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        print("=== AUDITING HOME PAGE ===")
        for name, w, h in VIEWPORTS:
            await check_viewport(browser, name, w, h, "/")
            
        print("\n=== AUDITING SUBPAGES (Sample Viewports) ===")
        sample_viewports = [
            ("iPhone SE", 320, 568),
            ("iPhone 14", 390, 844),
            ("iPad Mini", 768, 1024),
            ("Desktop 1440", 1440, 900),
        ]
        subpages = ["/solutions", "/workers", "/brain", "/brakes", "/contact", "/security-trust", "/careers/apply", "/faq", "/about", "/callme"]
        for sp in subpages:
            for name, w, h in sample_viewports:
                await check_viewport(browser, name, w, h, sp)
                
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
