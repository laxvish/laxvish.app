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
        await page.wait_for_timeout(1000)
        
        # Scroll down into the hold phase where the minimal UI is revealed beneath the rotating chromatic moon
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await page.wait_for_timeout(1200)
        
        print("--- Checkpoint 1: Desktop Minimal Operational Directive UI ---")
        await page.screenshot(path="public/minimal_operational_ui_desktop.png")
        
        # Validate DOM elements and structure
        dom_audit = await page.evaluate("""() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const header = spans.find(s => s.innerText.includes('OPERATIONAL DIRECTIVE'));
            const headerRight = spans.find(s => s.innerText.includes('LAXVISH / 01'));
            const textarea = document.querySelector('textarea');
            const placeholder = textarea ? textarea.getAttribute('placeholder') : '';
            
            const buttons = Array.from(document.querySelectorAll('button'));
            const attachBtn = buttons.find(b => b.innerText.includes('Attach workflow document'));
            const contextBtns = buttons.filter(b => 
                ['Logistics & Fleet', 'Vendor AP / GST', 'Clinical & Diagnostics', 'Telephony & Voice'].includes(b.innerText.trim())
            );
            
            const divs = Array.from(document.querySelectorAll('div'));
            const footerMeta = divs.find(d => d.innerText.includes('LAXVISH THREAD · WORKERS · BRAIN · BRAKES · DPDP-READY'));
            const synthBtn = buttons.find(b => b.innerText.includes('Synthesize Architecture'));
            
            return {
                hasDirectiveHeader: !!header,
                hasHeaderRight: !!headerRight,
                hasTextarea: !!textarea,
                placeholderMatches: placeholder === 'Specify an enterprise workflow, manual bottleneck, or integration target...',
                hasAttachUtility: !!attachBtn,
                contextButtonsCount: contextBtns.length,
                hasFooterMetadata: !!footerMeta,
                hasSynthesizeCTA: !!synthBtn
            };
        }""")
        print("Desktop DOM Audit:", dom_audit)
        
        # Assert Desktop Elements
        assert dom_audit["hasDirectiveHeader"], "Missing OPERATIONAL DIRECTIVE header"
        assert dom_audit["hasHeaderRight"], "Missing LAXVISH / 01 header right"
        assert dom_audit["hasTextarea"], "Missing clean input textarea"
        assert dom_audit["placeholderMatches"], "Placeholder does not match specification"
        assert dom_audit["hasAttachUtility"], "Missing Attach workflow document utility"
        assert dom_audit["contextButtonsCount"] == 4, f"Expected 4 context buttons, found {dom_audit['contextButtonsCount']}"
        assert dom_audit["hasFooterMetadata"], "Missing footer metadata line"
        assert dom_audit["hasSynthesizeCTA"], "Missing Synthesize Architecture button"
        
        # Test 2: Select 'Vendor AP / GST' context preset and synthesize architecture
        ap_btn = page.locator("button:has-text('Vendor AP / GST')")
        if await ap_btn.count() > 0:
            await ap_btn.first.click()
            await page.wait_for_timeout(400)
            await page.screenshot(path="public/minimal_operational_ui_preset_selected.png")
            print("Selected 'Vendor AP / GST' preset")
        
        synth_btn = page.locator("button:has-text('Synthesize Architecture')")
        if await synth_btn.count() > 0:
            await synth_btn.first.click()
            await page.wait_for_timeout(1500)
            await page.screenshot(path="public/minimal_architecture_dossier_desktop.png")
            print("Successfully synthesized architecture dossier!")
            
            # Verify synthesized blueprint DOM
            dossier_audit = await page.evaluate("""() => {
                const spans = Array.from(document.querySelectorAll('span'));
                const dossierHeader = spans.find(s => s.innerText.includes('SYSTEM ARCHITECTURE DOSSIER'));
                const workersPillar = spans.find(s => s.innerText.includes('01 // WORKERS'));
                const brainPillar = spans.find(s => s.innerText.includes('02 // BRAIN'));
                const brakesPillar = spans.find(s => s.innerText.includes('03 // BRAKES'));
                const roi = document.body.innerText.includes('PROJECTED RETURN ON INVESTMENT');
                const editBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Edit directive'));
                const bookCta = Array.from(document.querySelectorAll('a')).find(a => a.innerText.includes('Book Working Session with this Blueprint'));
                
                return {
                    hasDossierHeader: !!dossierHeader,
                    hasWorkersPillar: !!workersPillar,
                    hasBrainPillar: !!brainPillar,
                    hasBrakesPillar: !!brakesPillar,
                    hasRoi: roi,
                    hasEditDirective: !!editBtn,
                    hasBookWorkingSession: !!bookCta
                };
            }""")
            print("Dossier DOM Audit:", dossier_audit)
            assert dossier_audit["hasDossierHeader"], "Missing dossier header"
            assert dossier_audit["hasWorkersPillar"], "Missing Workers pillar"
            assert dossier_audit["hasBrainPillar"], "Missing Brain pillar"
            assert dossier_audit["hasBrakesPillar"], "Missing Brakes pillar"
            assert dossier_audit["hasRoi"], "Missing ROI section"
            assert dossier_audit["hasEditDirective"], "Missing Edit directive button"
            assert dossier_audit["hasBookWorkingSession"], "Missing Book working session CTA"
        
        # Test 3: Mobile Viewport (390 x 844)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        await mobile_page.goto("http://localhost:3060", wait_until="networkidle")
        await mobile_page.evaluate("window.scrollTo(0, window.innerHeight * 3.8)")
        await mobile_page.wait_for_timeout(1200)
        
        print("--- Checkpoint 3: Mobile Minimal Operational UI ---")
        await mobile_page.screenshot(path="public/minimal_operational_ui_mobile.png")
        
        mobile_overflow = await mobile_page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print("Mobile Overflow Audit:", mobile_overflow)
        assert not mobile_overflow["hasOverflow"], "Horizontal overflow detected on mobile!"
        
        await browser.close()
        print("ALL MINIMAL OPERATIONAL DIRECTIVE TESTS PASSED SUCCESSFULLY!")

asyncio.run(run())
