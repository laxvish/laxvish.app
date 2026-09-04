import asyncio
from playwright.async_api import async_playwright

ALL_VIEWPORTS = [
    ("iPhone SE 1st gen", 320, 568),
    ("Android Small", 360, 640),
    ("iPhone SE 3", 375, 667),
    ("iPhone 14", 390, 844),
    ("iPhone 15 Pro", 393, 852),
    ("Samsung S20", 412, 915),
    ("iPhone 16 Pro Max", 430, 932),
    ("Wide Android", 480, 960),
    ("Landscape Phone 667x375", 667, 375),
    ("Landscape Phone 844x390", 844, 390),
    ("Landscape Phone 932x430", 932, 430),
    ("iPad Mini", 768, 1024),
    ("iPad 10.2", 810, 1080),
    ("iPad Pro 11", 834, 1194),
    ("iPad Pro 12.9", 1024, 1366),
    ("Tablet Landscape", 1280, 800),
    ("Desktop 1366x768", 1366, 768),
    ("Desktop 1440x900", 1440, 900),
    ("Desktop 1536x864", 1536, 864),
    ("Desktop 1920x1080", 1920, 1080),
]

PAGES = [
    "/",
    "/solutions",
    "/workers",
    "/brain",
    "/brakes",
    "/callme",
    "/contact",
    "/careers/apply",
    "/faq",
    "/about",
    "/solutions/sales-automation",
]

sem = asyncio.Semaphore(8)

async def check_single_page(browser, name, w, h, path):
    async with sem:
        context = await browser.new_context(
            viewport={"width": w, "height": h},
            is_mobile=(w < 768),
        )
        page = await context.new_page()
        try:
            await page.goto(f"http://localhost:3060{path}", wait_until="domcontentloaded", timeout=15000)
            await asyncio.sleep(0.02)
            overflow = await page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
            if overflow:
                scrollW, innerW = await page.evaluate("() => [document.documentElement.scrollWidth, window.innerWidth]")
                msg = f"OVERFLOW on {name} ({w}x{h}) at {path}: scrollWidth={scrollW} > innerWidth={innerW}"
                return (False, msg)
            else:
                return (True, f"OK on {name} at {path}")
        except Exception as e:
            return (False, f"Error on {name} at {path}: {e}")
        finally:
            await context.close()

async def run_suite():
    passed_tests = 0
    total_tests = 0
    failures = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )

        print("\n========================================================")
        print("1. ZERO HORIZONTAL OVERFLOW ACROSS ALL 20 VIEWPORTS & PAGES")
        print("========================================================")

        all_tasks = [
            check_single_page(browser, name, w, h, path)
            for name, w, h in ALL_VIEWPORTS
            for path in PAGES
        ]
        results = await asyncio.gather(*all_tasks)
        for passed, msg in results:
            total_tests += 1
            if passed:
                passed_tests += 1
            else:
                failures.append(msg)
                print(f"  ❌ {msg}")

        print(f"Overflow tests complete: {passed_tests}/{total_tests} passed.")

        print("\n========================================================")
        print("2. MOBILE NAVIGATION DRAWER & INTERACTION (iPhone 14)")
        print("========================================================")
        context = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        page = await context.new_page()
        await page.goto("http://localhost:3060/", wait_until="networkidle")

        # Test menu button exists and opens
        total_tests += 1
        menu_btn = page.locator("button:has-text('MENU')")
        if await menu_btn.is_visible():
            await menu_btn.click()
            await asyncio.sleep(0.3)
            dialog = page.locator("#mobile-nav-dialog")
            is_open = await dialog.is_visible()
            body_overflow = await page.evaluate("() => document.body.style.overflow")
            if is_open and body_overflow == "hidden":
                passed_tests += 1
                print("  ✓ Mobile Menu opens cleanly and locks body scroll.")
            else:
                failures.append("Mobile menu failed to open or lock body scroll.")
                print("  ❌ Mobile menu failed to open or lock body scroll.")
        else:
            failures.append("Menu button not visible on mobile.")
            print("  ❌ Menu button not visible on mobile.")

        # Test Escape key closes menu
        total_tests += 1
        await page.keyboard.press("Escape")
        await asyncio.sleep(0.3)
        dialog_visible = await page.locator("#mobile-nav-dialog").is_visible()
        body_overflow_after = await page.evaluate("() => document.body.style.overflow")
        if not dialog_visible and body_overflow_after == "":
            passed_tests += 1
            print("  ✓ Escape key closes mobile menu and restores body scroll.")
        else:
            failures.append("Escape key failed to close mobile menu.")
            print("  ❌ Escape key failed to close mobile menu.")

        # Test clicking link navigates and closes menu
        total_tests += 1
        await page.locator("button:has-text('MENU')").click()
        await asyncio.sleep(0.3)
        await page.locator("#mobile-nav-dialog a:has-text('Workers')").click()
        await asyncio.sleep(0.6)
        current_url = page.url
        if "/workers" in current_url:
            passed_tests += 1
            print("  ✓ Mobile menu link clicks successfully navigate to target.")
        else:
            failures.append(f"Mobile menu navigation failed. URL is {current_url}")
            print(f"  ❌ Mobile menu navigation failed. URL is {current_url}")

        await context.close()

        print("\n========================================================")
        print("3. OPERATIONAL DIRECTIVE & ATTACHMENT DROPDOWN (Mobile)")
        print("========================================================")
        context = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        page = await context.new_page()
        await page.goto("http://localhost:3060/", wait_until="networkidle")

        # Scroll to hero hold state so ConversationalBox is fully visible and interactive
        await page.evaluate("window.scrollTo(0, window.innerHeight * 3)")
        await asyncio.sleep(0.6)

        # Test textarea placeholder and typing
        total_tests += 1
        textarea = page.locator("textarea[placeholder*='Share your problem details']")
        if await textarea.is_visible():
            await textarea.fill("Need autonomous AI worker for accounts payable invoice matching.")
            val = await textarea.input_value()
            if "accounts payable" in val:
                passed_tests += 1
                print("  ✓ Problem directive textarea input verified.")
            else:
                failures.append("Textarea input value mismatch.")
                print("  ❌ Textarea input value mismatch.")
        else:
            failures.append("Textarea not visible after scroll.")
            print("  ❌ Textarea not visible after scroll.")

        # Test Attachment dropdown
        total_tests += 1
        attach_btn = page.locator("button:has-text('Attach')")
        await attach_btn.click()
        await asyncio.sleep(0.2)
        images_opt = page.locator("button:has-text('Images')")
        docs_opt = page.locator("button:has-text('Documents')")
        sheets_opt = page.locator("button:has-text('Sheets')")
        if await images_opt.is_visible() and await docs_opt.is_visible() and await sheets_opt.is_visible():
            passed_tests += 1
            print("  ✓ Attachment dropdown matrix shows Images, Documents, Sheets.")
        else:
            failures.append("Attachment dropdown options not visible.")
            print("  ❌ Attachment dropdown options not visible.")

        # Test Synthesize CTA
        total_tests += 1
        synth_btn = page.locator("button:has-text('Synthesize Architecture')")
        await synth_btn.click()
        await asyncio.sleep(1.2)
        dossier = page.locator("text=SYSTEM ARCHITECTURE DOSSIER")
        workers_col = page.locator("text=01 // WORKERS")
        brain_col = page.locator("text=02 // BRAIN")
        brakes_col = page.locator("text=03 // BRAKES")
        if (await dossier.is_visible()) and (await workers_col.is_visible()) and (await brain_col.is_visible()) and (await brakes_col.is_visible()):
            passed_tests += 1
            print("  ✓ Architecture synthesis generates 3-pillar dossier on mobile.")
        else:
            failures.append("Architecture synthesis dossier not rendered.")
            print("  ❌ Architecture synthesis dossier not rendered.")

        await context.close()

        print("\n========================================================")
        print("4. CELESTIAL MOON BOUNDARY & ROTATION PRESERVATION")
        print("========================================================")
        context = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        page = await context.new_page()
        await page.goto("http://localhost:3060/", wait_until="networkidle")

        total_tests += 1
        clip_path_exists = await page.evaluate("() => Boolean(document.querySelector('#moon-sphere-clip circle'))")
        fluid_filter_exists = await page.evaluate("() => Boolean(document.querySelector('#fluid-rainbow-wave feTurbulence'))")
        if clip_path_exists and fluid_filter_exists:
            passed_tests += 1
            print("  ✓ Authoritative #moon-sphere-clip boundary and fluid turbulence filter verified.")
        else:
            failures.append("Moon clip path or turbulence filter missing.")
            print("  ❌ Moon clip path or turbulence filter missing.")

        await context.close()

        print("\n========================================================")
        print("5. DESKTOP FIDELITY CHECK (1440x900 & 1920x1080)")
        print("========================================================")
        for dw, dh in [(1440, 900), (1920, 1080)]:
            total_tests += 1
            context = await browser.new_context(viewport={"width": dw, "height": dh})
            page = await context.new_page()
            await page.goto("http://localhost:3060/", wait_until="networkidle")
            desktop_nav_visible = await page.locator("header nav").is_visible()
            menu_btn_hidden = not (await page.locator("button:has-text('MENU')").is_visible())
            moon_placed = await page.evaluate('''() => {
                const moon = document.querySelector('div[role="img"]');
                return moon ? moon.getBoundingClientRect().left > 500 : false;
            }''')
            if desktop_nav_visible and menu_btn_hidden and moon_placed:
                passed_tests += 1
                print(f"  ✓ Desktop {dw}x{dh} preserves full horizontal navigation, hidden mobile menu button, and right-column Moon.")
            else:
                failures.append(f"Desktop fidelity mismatch on {dw}x{dh}.")
                print(f"  ❌ Desktop fidelity mismatch on {dw}x{dh}.")
            await context.close()

        await browser.close()

    print("\n========================================================")
    print(f"FINAL MASTER SUITE RESULT: {passed_tests}/{total_tests} PASSED")
    if failures:
        print(f"Failures ({len(failures)}):")
        for f in failures:
            print(f"  - {f}")
    else:
        print("🎉 ALL RESPONSIVE, VIEWPORT, NAVIGATION, HERO, MOON, AND FIDELITY TESTS PASSED!")
    print("========================================================\n")

if __name__ == "__main__":
    asyncio.run(run_suite())
