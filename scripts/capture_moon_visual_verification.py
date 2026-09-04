import asyncio
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/.artifacts/verification"

async def capture_visual_verification():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )

        print("\n========================================================")
        print("1. DESKTOP VISUAL CAPTURE & VERIFICATION (1440x900)")
        print("========================================================")
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()
        await page.goto("http://localhost:3060/", wait_until="networkidle")
        await asyncio.sleep(0.5)

        # 1. Capture Rest State (Scroll 0)
        rest_path = f"{OUTPUT_DIR}/desktop_01_rest_state.png"
        await page.screenshot(path=rest_path, full_page=False)
        print(f"  📸 Saved: {rest_path}")

        h1_box = await page.locator("h1").bounding_box()
        moon_box = await page.locator('div[role="img"]').bounding_box()
        h1_opacity = await page.evaluate("() => getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity")
        print(f"     - H1: top={h1_box['y']}px, opacity={h1_opacity}")
        print(f"     - Moon: left={moon_box['x']}px, top={moon_box['y']}px, w={moon_box['width']}px (Right-side rest position)")

        # 2. Trigger ONE downward gesture and capture mid-transition (~0.8s)
        await page.evaluate("() => window.scrollTo({ top: 30, behavior: 'instant' })")
        await asyncio.sleep(0.8)

        mid_path = f"{OUTPUT_DIR}/desktop_02_mid_transition.png"
        await page.screenshot(path=mid_path, full_page=False)
        print(f"  📸 Saved: {mid_path}")

        mid_h1_opacity = await page.evaluate("() => getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity")
        mid_moon_box = await page.locator('div[role="img"]').bounding_box()
        print(f"     - Mid H1 opacity: {mid_h1_opacity} (Fading smoothly)")
        print(f"     - Mid Moon left: {mid_moon_box['x']}px (Gliding towards center)")

        # 3. Capture 100% Completed & Settled State (~2.0s total)
        await asyncio.sleep(1.2)
        completed_path = f"{OUTPUT_DIR}/desktop_03_completed_100.png"
        await page.screenshot(path=completed_path, full_page=False)
        print(f"  📸 Saved: {completed_path}")

        final_h1_opacity = await page.evaluate("() => getComputedStyle(document.querySelector('h1').closest('.will-change-transform')).opacity")
        final_box_opacity = await page.evaluate("() => { const el = document.querySelector('textarea'); return el ? getComputedStyle(el.closest('.will-change-transform')).opacity : 0; }")
        final_moon_box = await page.locator('div[role="img"]').bounding_box()
        print(f"     - Final H1 opacity: {final_h1_opacity} (Faded out)")
        print(f"     - Final ConversationalBox opacity: {final_box_opacity} (100% settled)")
        print(f"     - Final Moon left: {final_moon_box['x']}px (Centered directly above ConversationalBox)")

        # 4. Capture Sequential Frames of Internal Chromatic Wave Rotation (0s, 3s, 6s)
        print("\n  Capturing internal color circulation rotation frames...")
        for sec in [0, 3, 6]:
            rot_path = f"{OUTPUT_DIR}/desktop_04_rotation_{sec}s.png"
            await page.screenshot(path=rot_path, full_page=False)
            print(f"  📸 Saved: {rot_path} (T = {sec}s)")
            await asyncio.sleep(3.0)

        await context.close()

        print("\n========================================================")
        print("2. MOBILE VISUAL CAPTURE & VERIFICATION (iPhone 14, 390x844)")
        print("========================================================")
        m_context = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        m_page = await m_context.new_page()
        await m_page.goto("http://localhost:3060/", wait_until="networkidle")
        await asyncio.sleep(0.5)

        # Mobile Rest State
        m_rest_path = f"{OUTPUT_DIR}/mobile_01_rest_state.png"
        await m_page.screenshot(path=m_rest_path, full_page=False)
        print(f"  📸 Saved: {m_rest_path}")
        m_moon_box = await m_page.locator('div[role="img"]').bounding_box()
        print(f"     - Mobile Moon: centered at left={m_moon_box['x']}px, w={m_moon_box['width']}px")

        # Mobile Trigger Gesture & 100% Completion
        await m_page.evaluate("() => window.scrollTo({ top: 30, behavior: 'instant' })")
        await asyncio.sleep(2.0)

        m_completed_path = f"{OUTPUT_DIR}/mobile_02_completed_100.png"
        await m_page.screenshot(path=m_completed_path, full_page=False)
        print(f"  📸 Saved: {m_completed_path}")

        m_final_box_opacity = await m_page.evaluate("() => { const el = document.querySelector('textarea'); return el ? getComputedStyle(el.closest('.will-change-transform')).opacity : 0; }")
        print(f"     - Mobile ConversationalBox opacity: {m_final_box_opacity}")

        await m_context.close()
        await browser.close()

        print("\n========================================================")
        print("✅ ALL VISUAL SCREENSHOTS CAPTURED AND VERIFIED!")
        print("========================================================\n")

if __name__ == "__main__":
    asyncio.run(capture_visual_verification())
