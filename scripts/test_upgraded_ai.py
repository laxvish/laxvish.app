import json
import base64
import urllib.request
import os
from PIL import Image, ImageOps, ImageEnhance

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

# Prompt for testing the upgraded premium AI company aesthetic:
# Minimal, tactile matte layers, laser-sharp hairline vectors, neural flow, strict monochrome palette
prompt_test = (
    "A world-class, ultra-minimal modern AI company visual asset. "
    "Subject: Realtime AI Conversational Voice and Speech Intelligence. "
    "Composition: A sleek, precision-crafted floating composition on an expansive off-white studio background. In the center, an elegant matte ribbon of acoustic soundwave vectors flows seamlessly through a semi-translucent frosted glass intent filter into a clean, geometric dialogue token. "
    "Style: High-end industrial software aesthetic, matte ceramic and frosted glass materials with subtle physical layering, razor-thin vector gridlines, soft ambient occlusion, clean geometric curves, generous negative space (65% canvas empty). "
    "Color: Strict monochrome palette using clean off-white (#FAFAFA), matte light gray (#EAEAEA), slate (#666666), and deep charcoal (#111111). No colorful gradients, no neon blue/purple. "
    "Lighting & Atmosphere: Soft studio key light with subtle, realistic contact shadows creating quiet tactile depth. "
    "Negative: No humans, no literal microphone stands, no cartoonish elements, no heavy gloss, no cluttered dashboards, no rainbow colors, no visual noise."
)

payload = {
    "prompt": prompt_test,
    "model": "openai/gpt-image-2",
    "ratio": "16:9",
    "quality": "hd"
}

req = urllib.request.Request(
    GENERATION_API_URL,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(req, timeout=120) as response:
    result = json.loads(response.read().decode("utf-8"))
    b64_data = result["data"][0]["b64_json"]
    img_bytes = base64.b64decode(b64_data)
    out_path = os.path.join(OUTPUT_DIR, "test-ai-voice.png")
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    
    img = Image.open(out_path)
    gray = ImageOps.grayscale(img)
    enhanced = ImageOps.autocontrast(gray, cutoff=(0.1, 0.1))
    enhancer = ImageEnhance.Contrast(enhanced)
    crisp = enhancer.enhance(1.03)
    rgb_mono = crisp.convert("RGB")
    rgb_mono.save(out_path, "PNG", optimize=True)
    print("SUCCESS: test-ai-voice.png generated!")
