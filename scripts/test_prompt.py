import json
import base64
import urllib.request
import os

API_URL = "http://127.0.0.1:6969/v1/images/generations"

prompt_test = (
    "A premium, ultra-minimal 3D SaaS illustration of real-time AI voice conversation. "
    "Composition: Centered composition featuring two floating rounded matte capsules with soft smooth curves—one representing an acoustic voice waveform, the other a clean conversation message card with a small verified checkmark pill. "
    "Spatial arrangement: Floating gracefully in the center with generous negative space around it. "
    "Color: Strict monochrome palette using off-white, matte light gray, and deep charcoal. No accent colors, no gradients. "
    "Lighting & Depth: Soft studio ambient lighting, subtle diffuse drop shadows beneath the objects creating gentle floating depth. "
    "Background: Clean solid off-white neutral background with ample breathing room. "
    "Style: Refined 3D product artwork, smooth matte clay material, precise geometry, sophisticated enterprise SaaS aesthetic. "
    "Negative: No humans, no robots, no microphone hardware, no complex dashboards, no neon, no circuit boards, no clutter."
)

payload = {
    "prompt": prompt_test,
    "model": "openai/gpt-image-2",
    "ratio": "16:9",
    "quality": "hd"
}

req = urllib.request.Request(API_URL, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req, timeout=120) as resp:
    res = json.loads(resp.read().decode("utf-8"))
    img_data = base64.b64decode(res["data"][0]["b64_json"])
    with open("/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images/test-voice.png", "wb") as f:
        f.write(img_data)
    print(f"Generated test-voice.png ({len(img_data):,} bytes)")
