import asyncio
from playwright.async_api import async_playwright

VIEWPORTS = [
    ("iPhone SE (320x568)", 320, 568),
    ("Android Small (360x640)", 360, 640),
    ("iPhone SE 3 (375x667)", 375, 667),
    ("iPhone 14 (390x844)", 390, 844),
    ("Samsung S20 (412x915)", 412, 915),
    ("iPhone Pro Max (430x932)", 430, 932),
    ("Wide Android (480x960)", 480, 960),
    ("Landscape Phone (844x390)", 844, 390),
    ("iPad Mini (768x1024)", 768, 1024),
    ("iPad Pro (1024x1366)", 1024, 1366),
    ("Desktop (1440x900)", 1440, 900),
]

async def analyze_layout():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        for name, w, h in VIEWPORTS:
            context = await browser.new_context(
                viewport={"width": w, "height": h},
                is_mobile=(w < 768),
            )
            page = await context.new_page()
            await page.goto("http://localhost:3060/", wait_until="networkidle")
            await asyncio.sleep(0.3)
            
            data = await page.evaluate('''() => {
                const header = document.querySelector('header');
                const h1 = document.querySelector('h1');
                const moonSvg = document.querySelector('div[role="img"]');
                const chatbox = document.querySelector('textarea');
                
                const getMetrics = (el) => {
                    if (!el) return null;
                    const r = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    return {
                        top: r.top,
                        bottom: r.bottom,
                        left: r.left,
                        right: r.right,
                        width: r.width,
                        height: r.height,
                        fontSize: style.fontSize,
                        lineHeight: style.lineHeight,
                    };
                };
                
                return {
                    header: getMetrics(header),
                    h1: getMetrics(h1),
                    moon: getMetrics(moonSvg),
                    chatbox: getMetrics(chatbox),
                    viewportW: window.innerWidth,
                    viewportH: window.innerHeight,
                    scrollW: document.documentElement.scrollWidth,
                };
            }''')
            
            print(f"=== Viewport: {name} ===")
            print(f"  Viewport: {data['viewportW']}x{data['viewportH']}, scrollW: {data['scrollW']}")
            if data['header']:
                print(f"  Header: h={data['header']['height']:.1f}px")
            if data['h1']:
                print(f"  H1: font={data['h1']['fontSize']}, w={data['h1']['width']:.1f}px, top={data['h1']['top']:.1f}px")
            if data['moon']:
                print(f"  Moon: w={data['moon']['width']:.1f}px, h={data['moon']['height']:.1f}px, left={data['moon']['left']:.1f}px, top={data['moon']['top']:.1f}px")
            await context.close()
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(analyze_layout())
