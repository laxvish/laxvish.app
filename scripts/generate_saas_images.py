import json
import base64
import urllib.request
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageOps, ImageEnhance

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

PROMPTS = [
    {
        "filename": "callme-acoustic-macro.png",
        "description": "CallMe Voice AI — Real-time conversation stream",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of real-time AI voice conversation. "
            "Composition: Centered composition featuring two floating rounded matte elements: a smooth acoustic soundwave capsule and a clean conversation message card with a small verified checkmark pill. "
            "Spatial arrangement: Centered gracefully with generous negative space around it. "
            "Color: Strict monochromatic palette using off-white, matte light gray, and deep charcoal. No accent colors, no gradients. "
            "Lighting & Depth: Soft studio ambient lighting, subtle diffuse drop shadows beneath the objects creating gentle floating depth. "
            "Background: Clean solid off-white neutral background with ample breathing room. "
            "Style: Refined 3D product artwork, smooth matte clay material, precise geometry, sophisticated enterprise SaaS aesthetic. "
            "Negative constraints: No humans, no robots, no microphone hardware, no complex dashboards, no neon, no circuit boards, no clutter. Website asset."
        )
    },
    {
        "filename": "verification-wafer-macro.png",
        "description": "Proof Band — Verification Record & Decision Ledger",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of enterprise AI decision verification. "
            "Composition: Centered floating composition featuring a minimalist matte card displaying an embossed geometric shield badge and a discrete horizontal verification checkpoint bar with a subtle 'VERIFIED' pill. "
            "Spatial arrangement: Clean horizontal balance with generous negative space on all sides. "
            "Color: Strict monochromatic palette with off-white, light slate gray, and dark charcoal ink. No secondary colors, no multicolor accents. "
            "Lighting & Depth: Soft diffused overhead studio lighting with gentle, realistic drop shadows creating subtle tactile depth. "
            "Background: Solid clean off-white canvas. "
            "Style: Refined enterprise SaaS 3D artwork, smooth matte surfaces, precise rounded geometry, high-end editorial clarity. "
            "Negative constraints: No humans, no robots, no silicon microchips, no circuit boards, no complex data tables, no glowing orbs. Website asset."
        )
    },
    {
        "filename": "final-cta-architecture.png",
        "description": "Final CTA — Modular System Deployment Stack",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of enterprise AI system architecture. "
            "Composition: Three floating, stepped rectangular matte panels in an elegant isometric stack, connected by a single hairline vertical alignment rod with subtle node indicators. "
            "Spatial arrangement: Centered dynamic isometric structure with generous open space surrounding the composition. "
            "Color: Strict monochromatic palette using pure off-white, pale gray surfaces, and crisp charcoal edges. No saturated colors or gradients. "
            "Lighting & Depth: Soft studio ambient light with delicate contact shadows between layers, conveying refined tactile depth. "
            "Background: Clean, seamless off-white neutral background. "
            "Style: High-end 3D SaaS illustration, clean geometric edges, smooth matte clay and frosted textures, sophisticated enterprise aesthetic. "
            "Negative constraints: No humans, no robotic arms, no holographic projections, no circuit boards, no noisy backgrounds. Website asset."
        )
    },
    {
        "filename": "workers-actuator-macro.png",
        "description": "Workers Page — Autonomous Task Execution",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of an autonomous AI worker task execution. "
            "Composition: One focal floating rounded matte card featuring a clean task progress pill docking into a discrete circular status indicator. "
            "Spatial arrangement: Slightly offset centered arrangement with abundant negative space. "
            "Color: Strict monochrome color treatment with off-white, medium graphite, and deep charcoal. Zero accent hues. "
            "Lighting & Depth: Gentle directional studio lighting casting soft, realistic shadows beneath the card to create floating dimensionality. "
            "Background: Solid minimal off-white field. "
            "Style: Sophisticated SaaS product artwork, smooth matte ceramic-like finish, precise rounded geometry, executive design feel. "
            "Negative constraints: No humans, no mechanical gears, no robotic actuators, no complex dashboards, no neon glow, no clutter. Website asset."
        )
    },
    {
        "filename": "brain-routing-mesh.png",
        "description": "Brain Page — Multi-Agent Smart Routing",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of multi-agent AI orchestration and smart routing. "
            "Composition: A central refined circular hub token branching outward into three small rounded satellite node capsules through crisp, hairline paths. "
            "Spatial arrangement: Symmetrical centered arrangement with generous breathing room and wide margins. "
            "Color: Strict monochromatic palette of crisp off-white, light gray, and deep charcoal. No secondary colors. "
            "Lighting & Depth: Soft ambient illumination, subtle elevation shadows giving each node floating tactile presence. "
            "Background: Pristine off-white neutral canvas. "
            "Style: Minimalist 3D vector-style product visual, smooth matte finish, geometric precision, high-end SaaS software feel. "
            "Negative constraints: No biological brains, no optical cables, no glowing laser beams, no complex neural meshes, no clutter. Website asset."
        )
    },
    {
        "filename": "brakes-interlock-macro.png",
        "description": "Brakes Page — AI Governance Guardrails",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of AI safety guardrails and governance. "
            "Composition: A floating rounded rectangular panel featuring a subtle minimalist geometric interlock emblem and a dual-state confidence slider pill. "
            "Spatial arrangement: Clean centered focal point with large surrounding negative space. "
            "Color: Strict monochromatic scheme using off-white, muted slate gray, and dark charcoal. No color gradients or bright highlights. "
            "Lighting & Depth: Soft studio lighting with smooth, diffuse drop shadows for a refined floating elevation. "
            "Background: Solid off-white neutral background. "
            "Style: Premium enterprise SaaS artwork, smooth matte surfaces, precise geometric contours, calm and authoritative tone. "
            "Negative constraints: No car brakes, no mechanical calipers, no danger signs, no neon lasers, no chaotic dashboards. Website asset."
        )
    },
    {
        "filename": "callme-ribbon-mic.png",
        "description": "CallMe Depth — Neural Speech-to-Intent",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of neural voice processing and conversational intelligence. "
            "Composition: Three floating, smoothly sculpted horizontal soundwave bars tapering gently toward a minimalist dialogue card. "
            "Spatial arrangement: Centered horizontal composition with generous negative space around all elements. "
            "Color: Strict monochrome palette with off-white, light gray, and crisp charcoal ink. Zero foreign colors. "
            "Lighting & Depth: Soft overhead ambient light producing gentle diffuse contact shadows for depth. "
            "Background: Clean off-white surface. "
            "Style: Modern enterprise SaaS illustration, smooth matte clay texture, rounded geometric curves, quiet sophistication. "
            "Negative constraints: No physical microphone stands, no metal mesh grids, no soundboards, no neon waves, no clutter. Website asset."
        )
    },
    {
        "filename": "security-vault-bolt.png",
        "description": "Security & Trust — Cryptographic Vault",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of enterprise AI data security and compliance. "
            "Composition: A solitary floating minimalist cube with softly beveled edges, featuring a clean debossed geometric shield emblem on its face. "
            "Spatial arrangement: Centered single object composition with expansive negative space. "
            "Color: Strict monochromatic palette using pure off-white, light gray stone, and deep charcoal. No accent colors. "
            "Lighting & Depth: Clean studio key lighting with soft, realistic floor drop shadow creating quiet physical weight and elevation. "
            "Background: Pristine off-white backdrop. "
            "Style: High-end SaaS product artwork, smooth matte porcelain-like texture, sharp architectural precision, trusted enterprise feel. "
            "Negative constraints: No steel vault bolts, no heavy metal gears, no padlocks, no cyber grid backgrounds, no green/blue lasers. Website asset."
        )
    },
    {
        "filename": "solutions-sales-telemetry.png",
        "description": "Sales Automation — Inbound Lead Qualification",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of automated sales lead qualification. "
            "Composition: Two floating minimalist elements: a rounded card representing a qualified inbound lead transitioning toward a clean mini calendar card with a confirmed meeting checkmark. "
            "Spatial arrangement: Centered diagonal flow with ample breathing room. "
            "Color: Strict monochrome color palette with off-white, light smoke gray, and deep charcoal. No colorful badges or icons. "
            "Lighting & Depth: Soft, natural studio lighting with gentle diffuse shadows creating subtle layer separation. "
            "Background: Clean solid off-white neutral canvas. "
            "Style: Refined 3D SaaS visual, smooth matte finish, precise rounded geometry, professional and clear. "
            "Negative constraints: No human figures, no chronograph dials, no complex CRM spreadsheets, no floating money icons, no clutter. Website asset."
        )
    },
    {
        "filename": "solutions-support-acoustic.png",
        "description": "Customer Support — Omnichannel Resolution",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of AI customer support automation. "
            "Composition: Two floating rounded message cards—one incoming request, one resolved response—interconnected by a small minimalist status bridge. "
            "Spatial arrangement: Centered balanced composition surrounded by generous negative space. "
            "Color: Strict monochromatic palette of off-white, light gray, and charcoal. No secondary hues or colored chat bubbles. "
            "Lighting & Depth: Soft ambient lighting, delicate contact shadows providing floating dimensionality. "
            "Background: Solid minimal off-white field. "
            "Style: Premium enterprise SaaS artwork, smooth matte surfaces, clean vector-3D hybrid aesthetic, crisp typography hints. "
            "Negative constraints: No human faces, no support headsets, no complex ticket dashboards, no bright green/blue chat bubbles. Website asset."
        )
    },
    {
        "filename": "solutions-document-optical.png",
        "description": "Document Processing — Data Field Extraction",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of intelligent document processing and OCR. "
            "Composition: A clean floating rectangular document sheet with three small structured data pills gently elevated above its surface, representing extracted fields. "
            "Spatial arrangement: Angled isometric perspective centered with generous negative space. "
            "Color: Strict monochromatic treatment using off-white, light matte gray, and deep charcoal. No accent colors. "
            "Lighting & Depth: Subtle directional lighting casting soft shadows from the elevated data pills onto the sheet. "
            "Background: Pristine off-white backdrop. "
            "Style: Refined SaaS product visual, smooth paper-matte texture, precise linear layout, elegant data abstraction. "
            "Negative constraints: No optical glass prisms, no scanner laser beams, no cluttered paper stacks, no messy text grids. Website asset."
        )
    },
    {
        "filename": "solutions-finance-balance.png",
        "description": "Finance AP — 3-Way Invoice Reconciliation",
        "prompt": (
            "A premium, ultra-minimal 3D SaaS illustration of 3-way financial reconciliation and invoice matching. "
            "Composition: Three floating, neatly aligned small rectangular cards converging into a central circular matched status badge. "
            "Spatial arrangement: Centered symmetrical composition with ample negative space around the elements. "
            "Color: Strict monochromatic palette with pure off-white, light gray tones, and dark charcoal. No green or colored badges. "
            "Lighting & Depth: Soft diffused overhead studio lighting with realistic subtle shadows between overlapping cards. "
            "Background: Clean off-white neutral canvas. "
            "Style: High-end enterprise SaaS illustration, smooth matte clay material, crisp edges, structured financial precision. "
            "Negative constraints: No brass balance scales, no physical calibration weights, no currency symbols, no complex spreadsheets. Website asset."
        )
    }
]

def generate_and_save(item):
    filename = item["filename"]
    sys.stdout.write(f"Generating {filename} ({item['description']})...\n")
    sys.stdout.flush()
    payload = {
        "prompt": item["prompt"],
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
        out_path = os.path.join(OUTPUT_DIR, filename)
        
        # Write initial image
        with open(out_path, "wb") as f:
            f.write(img_bytes)
            
        # Post-process to ensure strict 100% brand monochrome
        img = Image.open(out_path)
        gray = ImageOps.grayscale(img)
        enhanced = ImageOps.autocontrast(gray, cutoff=(0.2, 0.2))
        enhancer = ImageEnhance.Contrast(enhanced)
        crisp = enhancer.enhance(1.05)
        rgb_mono = crisp.convert("RGB")
        rgb_mono.save(out_path, "PNG", optimize=True)
        
        sys.stdout.write(f"SUCCESS: {filename} generated & saved as pure monochrome.\n")
        sys.stdout.flush()
        return filename

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_and_save, item): item["filename"] for item in PROMPTS}
        for future in as_completed(futures):
            filename = futures[future]
            try:
                future.result()
            except Exception as e:
                sys.stderr.write(f"ERROR {filename}: {e}\n")
                sys.stderr.flush()

if __name__ == "__main__":
    main()
