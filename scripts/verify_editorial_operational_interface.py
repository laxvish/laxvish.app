import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/usr/bin/google-chrome",
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        
        # Test 1: Desktop Viewport
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # Scroll to hold phase where interface is fully revealed
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await page.wait_for_timeout(1200)
        
        print("--- Checkpoint 1: Desktop Operational Interface ---")
        await page.screenshot(path="public/editorial_interface_desktop.png")
        
        # Verify DOM structure & elements
        dom_audit = await page.evaluate("""() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const header = spans.find(s => s.innerText.includes('OPERATIONAL DIRECTIVE'));
            const textarea = document.querySelector('textarea');
            const buttons = Array.from(document.querySelectorAll('button'));
            const attachBtn = buttons.find(b => b.innerText.includes('Attach workflow document'));
            const domainBtns = buttons.filter(b => 
                ['Logistics & Fleet', 'Vendor AP & GST', 'Clinical & Diagnostics', 'Telephony & Voice'].includes(b.innerText.trim())
            );
            const divs = Array.from(document.querySelectorAll('div'));
            const statusLine = divs.find(d => d.innerText.includes('LAXVISH THREAD // WORKERS'));
            const synthBtn = buttons.find(b => b.innerText.includes('Synthesize Architecture'));
            
            return {
                hasDirectiveHeader: !!header,
                hasCommandTextarea: !!textarea,
                hasAttachUtility: !!attachBtn,
                domainButtonsCount: domainBtns.length,
                hasStatusLine: !!statusLine,
                hasSynthesizeAction: !!synthBtn
            };
        }""")
        print("Operational Interface DOM Audit:", dom_audit)
        
        # Test 2: Select 'Logistics & Fleet' and click Synthesize
        logistics_btn = page.locator("button:has-text('Logistics & Fleet')")
        if await logistics_btn.count() > 0:
            await logistics_btn.first.click()
            await page.wait_for_timeout(300)
        
        synth_btn = page.locator("button:has-text('Synthesize Architecture')")
        if await synth_btn.count() > 0:
            await synth_btn.first.click()
            await page.wait_for_timeout(1500)
            await page.screenshot(path="public/editorial_blueprint_dossier.png")
            print("Successfully synthesized architecture dossier!")
        
        # Test 3: Mobile Viewport
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3060", wait_until="networkidle")
        await mobile_page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await mobile_page.wait_for_timeout(1200)
        
        print("--- Checkpoint 2: Mobile Operational Interface ---")
        await mobile_page.screenshot(path="public/editorial_interface_mobile.png")
        
        mobile_overflow = await mobile_page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print("Mobile Overflow Audit:", mobile_overflow)
        
        await browser.close()

asyncio.run(run())
