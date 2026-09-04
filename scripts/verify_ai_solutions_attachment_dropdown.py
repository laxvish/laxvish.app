import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/usr/bin/google-chrome",
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        
        # Test 1: Desktop Viewport (1440 x 900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3060", wait_until="networkidle")
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await page.wait_for_timeout(1000)
        
        print("--- Checkpoint 1: Desktop AI Solutions UI Initial State ---")
        await page.screenshot(path="public/ai_solutions_desktop.png")
        
        # Verify DOM elements
        dom_audit = await page.evaluate("""() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const headerLeft = spans.find(s => s.innerText.trim() === 'AI SOLUTIONS');
            const headerRight = spans.find(s => s.innerText.trim() === 'LAXVISH / 01');
            const textarea = document.querySelector('textarea');
            const placeholder = textarea ? textarea.getAttribute('placeholder') : '';
            
            const buttons = Array.from(document.querySelectorAll('button'));
            const attachBtn = buttons.find(b => b.innerText.includes('Attach'));
            
            const divs = Array.from(document.querySelectorAll('div'));
            const footerMeta = divs.find(d => d.innerText.includes('LAXVISH THREAD · WORKERS · BRAIN · BRAKES · DPDP-READY'));
            const synthBtn = buttons.find(b => b.innerText.includes('Synthesize Architecture'));
            
            return {
                hasAiSolutionsHeader: !!headerLeft,
                hasLaxvishHeader: !!headerRight,
                hasTextarea: !!textarea,
                placeholder: placeholder,
                hasAttachBtn: !!attachBtn,
                hasFooterMetadata: !!footerMeta,
                hasSynthesizeCTA: !!synthBtn
            };
        }""")
        print("Desktop DOM Audit:", dom_audit)
        assert dom_audit["hasAiSolutionsHeader"], "Missing 'AI SOLUTIONS' header"
        assert dom_audit["hasLaxvishHeader"], "Missing 'LAXVISH / 01' header"
        assert "Share your problem details" in dom_audit["placeholder"], f"Placeholder mismatch: {dom_audit['placeholder']}"
        assert dom_audit["hasAttachBtn"], "Missing Attach button"
        assert dom_audit["hasFooterMetadata"], "Missing footer metadata"
        assert dom_audit["hasSynthesizeCTA"], "Missing synthesize CTA"
        
        # Test 2: Click the Attach button and verify dropdown options
        attach_button = page.locator("button:has-text('Attach')")
        await attach_button.click()
        await page.wait_for_timeout(300)
        
        dropdown_audit = await page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const imgBtn = buttons.find(b => b.innerText.includes('Images'));
            const docBtn = buttons.find(b => b.innerText.includes('Documents'));
            const sheetBtn = buttons.find(b => b.innerText.includes('Sheets'));
            
            return {
                hasImagesOption: !!imgBtn,
                hasDocsOption: !!docBtn,
                hasSheetsOption: !!sheetBtn
            };
        }""")
        print("Dropdown Options Audit:", dropdown_audit)
        assert dropdown_audit["hasImagesOption"], "Missing 'Images' option in dropdown"
        assert dropdown_audit["hasDocsOption"], "Missing 'Documents' option in dropdown"
        assert dropdown_audit["hasSheetsOption"], "Missing 'Sheets' option in dropdown"
        
        await page.screenshot(path="public/ai_solutions_attachment_dropdown.png")
        
        # Test 3: Type a problem description and synthesize
        await page.fill("textarea", "Our enterprise logistics fleet processes 1,000+ daily freight bills with manual weighbridge matching delays.")
        await page.wait_for_timeout(300)
        
        synth_btn = page.locator("button:has-text('Synthesize Architecture')")
        await synth_btn.click()
        await page.wait_for_timeout(1500)
        
        print("--- Checkpoint 2: Synthesized Architecture Dossier ---")
        await page.screenshot(path="public/ai_solutions_synthesized_dossier.png")
        
        dossier_check = await page.evaluate("""() => {
            const text = document.body.innerText;
            return {
                hasDossierTitle: text.includes('SYSTEM ARCHITECTURE DOSSIER'),
                hasWorkers: text.includes('01 // WORKERS'),
                hasBrain: text.includes('02 // BRAIN'),
                hasBrakes: text.includes('03 // BRAKES'),
                hasRoi: text.includes('PROJECTED RETURN ON INVESTMENT')
            };
        }""")
        print("Dossier Check:", dossier_check)
        assert dossier_check["hasDossierTitle"], "Dossier title missing"
        assert dossier_check["hasWorkers"], "Workers pillar missing"
        assert dossier_check["hasBrain"], "Brain pillar missing"
        assert dossier_check["hasBrakes"], "Brakes pillar missing"
        assert dossier_check["hasRoi"], "ROI missing"
        
        # Test 4: Mobile Viewport (390 x 844)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3060", wait_until="networkidle")
        await mobile_page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await mobile_page.wait_for_timeout(1000)
        
        print("--- Checkpoint 3: Mobile Viewport ---")
        await mobile_page.screenshot(path="public/ai_solutions_mobile.png")
        
        mobile_overflow = await mobile_page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print("Mobile Overflow:", mobile_overflow)
        assert not mobile_overflow["hasOverflow"], "Mobile horizontal overflow detected"
        
        await browser.close()
        print("ALL AI SOLUTIONS & ATTACHMENT DROPDOWN TESTS PASSED SUCCESSFULLY!")

asyncio.run(run())
