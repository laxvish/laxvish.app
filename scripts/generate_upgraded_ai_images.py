import json
import base64
import urllib.request
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageOps, ImageEnhance

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

UPGRADED_AI_PROMPTS = [
    {
        "filename": "editorial-governance-interlock.png",
        "description": "Brakes — Real-time AI Governance Guardrails & Policy Interlock",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing AI safety guardrails and policy governance. "
            "Composition: Centered floating composition on an expansive off-white background (#FAFAFA). Two interlocking monolithic geometric plates—one in matte pale stone, one in deep charcoal—interlock at the center around a laser-calibrated horizontal confidence threshold track with a precise central boundary marker. "
            "Style: High-end industrial software aesthetic, matte ceramic and frosted translucent layers, soft ambient occlusion shadows, razor-thin vector tick marks, generous negative space (70% empty). "
            "Color: Strict monochrome palette with off-white (#FAFAFA), light stone (#EAEAEA), slate (#666666), and charcoal (#111111). No colorful accents, no gradients. "
            "Negative: No humans, no mechanical car brakes, no robots, no warning signs, no glossy plastic, no neon, no text."
        )
    },
    {
        "filename": "editorial-voice-dialogue.png",
        "description": "CallMe — Realtime Conversational Voice AI Pipeline",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Realtime Conversational Voice AI. "
            "Composition: Centered composition featuring an elegant matte ribbon of acoustic neural soundwaves transitioning seamlessly through a semi-translucent frosted glass intent filter into a clean, rounded dialogue token. "
            "Style: Minimalist enterprise SaaS artwork, subtle physical layering, frosted glass and matte ceramic textures, delicate contact shadows, ample breathing room on off-white canvas. "
            "Color: Strict monochrome palette of off-white (#FAFAFA), pale gray (#EAEAEA), slate (#666666), and deep charcoal (#111111). "
            "Negative: No microphone hardware, no humans, no headsets, no colorful glowing waves, no dashboards, no text."
        )
    },
    {
        "filename": "editorial-verification-ledger.png",
        "description": "Proof Band — Verification Record & Decision Audit Ledger",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing an AI Verification Ledger and deterministic audit trail. "
            "Composition: A floating stepped geometric ledger slab in matte graphite and frosted glass, featuring laser-etched state commit blocks and a central circular verified seal with a concentric hairline ring. "
            "Style: Precision architectural software diagram, subtle planar layering, clean geometric contours, generous negative space on an off-white field. "
            "Color: Strict monochrome with off-white (#FAFAFA), light gray (#EAEAEA), slate (#666666), and dark charcoal (#111111). "
            "Negative: No silicon microchips, no circuit boards, no green checkmarks, no blockchain cubes, no 3D clutter, no text."
        )
    },
    {
        "filename": "editorial-system-architecture.png",
        "description": "System Architecture — Multi-Agent Deployment Core",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Multi-Agent System Architecture. "
            "Composition: An elegant stepped isometric stack of three modular matte obsidian and frosted glass plates connected along a central vertical laser data axis with circular agent execution nodes. "
            "Style: High-end architectural software aesthetic, refined tactile depth, clean 45-degree geometric perspective, vast negative space. "
            "Color: Strict monochrome palette with off-white (#FAFAFA), pale stone (#EAEAEA), slate (#666666), and charcoal (#111111). "
            "Negative: No server hardware racks, no computer monitors, no glowing neon grids, no colorful gradients, no text."
        )
    },
    {
        "filename": "editorial-worker-execution.png",
        "description": "Workers Page — Autonomous AI Domain Task Execution",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing an Autonomous AI Domain Worker. "
            "Composition: A floating precision matte task cartridge with dual parallel execution tracks, an internal bounded indicator marker, and a circular satellite token signifying completed execution. "
            "Style: Minimalist enterprise AI software aesthetic, smooth matte finish, precise rounded geometry, soft ambient shadows on an off-white background. "
            "Color: Strict monochrome with off-white (#FAFAFA), pale stone (#EAEAEA), and deep charcoal (#111111). "
            "Negative: No robotic arms, no mechanical gears, no factory tools, no colorful status pills, no text."
        )
    },
    {
        "filename": "editorial-orchestration-mesh.png",
        "description": "Brain — Multi-Agent Orchestration & DAG Routing",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Multi-Agent Neural Orchestration and dynamic routing. "
            "Composition: A central matte charcoal orchestration nucleus node distributing clean data streams outward along three radial vector conduits to specialized satellite worker nodes in perfect geometric equilibrium. "
            "Style: Minimalist celestial and network diagram, crisp hairline vectors, solid circular nodes, generous negative space on an off-white canvas. "
            "Color: Strict monochrome palette of off-white (#FAFAFA), pale stone (#EAEAEA), and dark charcoal (#111111). "
            "Negative: No biological brains, no optical fiber bundles, no glowing neon particles, no complex web clutter, no text."
        )
    },
    {
        "filename": "editorial-speech-intent.png",
        "description": "CallMe Depth — Neural Speech-to-Intent Engine",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Neural Speech-to-Intent Acoustic Intelligence. "
            "Composition: Three sculpted horizontal acoustic wave ribbons tapering smoothly across a frosted glass boundary into a structured, rounded dialogue intent tablet. "
            "Style: Minimalist acoustic software visual, smooth matte clay and frosted glass textures, subtle layer separation, wide breathing room. "
            "Color: Strict monochrome with off-white (#FAFAFA), light stone (#EAEAEA), slate (#666666), and deep charcoal (#111111). "
            "Negative: No physical ribbon microphones, no headphones, no soundboards, no neon lasers, no text."
        )
    },
    {
        "filename": "editorial-security-fortress.png",
        "description": "Security & Trust — Cryptographic Data Fortress & DPDP Isolation",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Cryptographic Data Security and DPDP tenant isolation. "
            "Composition: A bold, floating diamond-square rhombus in deep charcoal enveloped within a concentric, laser-etched hairline security boundary perimeter with a central keyway aperture. "
            "Style: Institutional security seal and architectural software mark, pure geometric precision, calm authoritative presence on an off-white field. "
            "Color: Strict monochrome using off-white (#FAFAFA), light stone (#EAEAEA), and deep charcoal (#111111). "
            "Negative: No steel vault doors, no padlocks, no matrix rain code, no blue shields, no text."
        )
    },
    {
        "filename": "editorial-sales-pipeline.png",
        "description": "Sales Automation — Inbound Lead Qualification & Conversion",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Automated Inbound Lead Qualification. "
            "Composition: A dynamic horizontal progression showing an inbound prospect intake capsule passing through a central frosted qualification filter node into a booked meeting calendar token. "
            "Style: Executive infographic aesthetic, clean vector-3D hybrid layering, razor-thin connecting guides, ample negative space. "
            "Color: Strict monochrome with off-white (#FAFAFA), pale stone (#EAEAEA), slate (#666666), and charcoal (#111111). "
            "Negative: No human figures, no dollar signs, no chronograph needles, no complex CRM spreadsheets, no text."
        )
    },
    {
        "filename": "editorial-support-resolution.png",
        "description": "Customer Support — Omnichannel Resolution Engine",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Omnichannel Customer Support AI. "
            "Composition: Two floating complementary rounded message cards—one incoming inquiry in pale stone, one instant verified resolution in deep charcoal—interlocking gracefully around a central routing node. "
            "Style: High-end customer intelligence design, smooth matte surfaces, delicate contact shadows, calm and balanced layout. "
            "Color: Strict monochrome palette of off-white (#FAFAFA), light gray (#EAEAEA), and charcoal (#111111). "
            "Negative: No human faces, no support headsets, no green/blue chat bubbles, no star ratings, no text."
        )
    },
    {
        "filename": "editorial-document-extraction.png",
        "description": "Document Processing — Intelligent Extraction & Structured OCR",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing Intelligent Document Processing and Structured Extraction. "
            "Composition: A clean rectangular document plane in pale stone with three structured key-value data bars in deep charcoal floating slightly elevated above the surface along a vertical alignment guide. "
            "Style: Minimalist document architecture, subtle elevation depth, clean rectangular geometry, expansive negative space. "
            "Color: Strict monochrome using off-white (#FAFAFA), pale stone (#EAEAEA), slate (#666666), and dark charcoal (#111111). "
            "Negative: No optical prisms, no scanning lasers, no realistic paper stacks, no messy text grids, no text."
        )
    },
    {
        "filename": "editorial-finance-reconciliation.png",
        "description": "Finance AP — 3-Way Reconciliation & Ledger Matching",
        "prompt": (
            "A world-class, ultra-minimal modern enterprise AI visual asset representing 3-Way Financial Reconciliation. "
            "Composition: Three floating circular tokens (Purchase Order, Receipt, Invoice) in an equilateral triangular formation converging into a central locking reconciliation core in deep charcoal. "
            "Style: High-precision financial software visual, smooth matte ceramic finish, perfect triangular symmetry, serene off-white canvas. "
            "Color: Strict monochrome with off-white (#FAFAFA), light stone (#EAEAEA), slate (#666666), and charcoal (#111111). "
            "Negative: No brass balance scales, no calibration weights, no currency symbols, no spreadsheets, no text."
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
        enhanced = ImageOps.autocontrast(gray, cutoff=(0.1, 0.1))
        enhancer = ImageEnhance.Contrast(enhanced)
        crisp = enhancer.enhance(1.03)
        rgb_mono = crisp.convert("RGB")
        rgb_mono.save(out_path, "PNG", optimize=True)
        
        sys.stdout.write(f"SUCCESS: {filename} generated & normalized.\n")
        sys.stdout.flush()
        return filename

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_and_save, item): item["filename"] for item in UPGRADED_AI_PROMPTS}
        for future in as_completed(futures):
            filename = futures[future]
            try:
                future.result()
            except Exception as e:
                sys.stderr.write(f"ERROR {filename}: {e}\n")
                sys.stderr.flush()

if __name__ == "__main__":
    main()
