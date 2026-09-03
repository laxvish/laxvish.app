import json
import base64
import urllib.request
import os
from PIL import Image, ImageOps, ImageEnhance

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

prompt_governance = (
    "Create a flat 2D, highly art-directed editorial graphic for an enterprise AI system website, representing AI safety guardrails, governance, and controlled intelligence. "
    "The artwork must look like it was created by a world-class brand designer using precise vector geometry, not rendered in 3D and not generated as a generic AI illustration. "
    "Visual concept: Create one abstract, intelligent geometric composition made from two interlocking rounded shapes. The left shape is a soft warm off-white / pale stone form. The right shape is a deep charcoal form. They face and interlock with one another at the center, creating a visual metaphor for AI capability and human governance. Inside the central intersection, introduce a single horizontal capsule-shaped control track with a small circular marker precisely at the center, suggesting a controlled boundary between two states. "
    "2D requirement: Strictly flat 2D vector illustration with clean solid fills, crisp contours, and strong negative space. Absolutely NO 3D rendering, perspective, realistic materials, bevels, shadows, ambient occlusion, or photorealism. Premium Swiss editorial graphic printed on an off-white page. "
    "Composition: Expansive 16:9 canvas with the composition centered and occupying only 20-30% of the canvas, leaving 70-80% empty breathing room. "
    "Color system: Strict monochrome using warm ivory / off-white background #F5F3EE, pale stone #E6E3DC, muted gray #969792, and dark charcoal #252525. Zero foreign colors or gradients. "
    "Typography: NO TEXT AT ALL. Zero words, letters, numbers, or labels. "
    "Negative prompt: 3D render, realistic objects, floating cards, dashboards, shadows, bevels, neon, shield icon, lock icon, robot, brain, circuitry, mechanical parts, brake calipers, text, typography."
)

payload = {
    "prompt": prompt_governance,
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
    out_path = os.path.join(OUTPUT_DIR, "editorial-governance-interlock.png")
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    img = Image.open(out_path)
    gray = ImageOps.grayscale(img)
    enhanced = ImageOps.autocontrast(gray, cutoff=(0.1, 0.1))
    enhancer = ImageEnhance.Contrast(enhanced)
    crisp = enhancer.enhance(1.02)
    rgb_mono = crisp.convert("RGB")
    rgb_mono.save(out_path, "PNG", optimize=True)
    print("SUCCESS: editorial-governance-interlock.png generated and saved!")
