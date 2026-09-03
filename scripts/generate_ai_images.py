import json
import base64
import urllib.request
import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

GENERATION_API_URL = "http://127.0.0.1:6969/v1/images/generations"
OUTPUT_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

IMAGES_TO_GENERATE = [
    {
        "filename": "callme-acoustic-macro.png",
        "description": "CallMe Homepage Section — Realtime AI Voice Pipeline Surface",
        "prompt": "Cinematic widescreen 16:9 macro technical visualization of a Realtime AI Conversational Voice Engine interface. A dark matte monochrome control surface displaying live neural acoustic waveform streams, sub-millisecond audio packet telemetry, dynamic speech-to-intent token lattices, and real-time enterprise dialogue state tracking. Crisp white and graphite audio frequency oscillations, razor-thin vector grid lines, subtle typographic metadata tags 'VOICE_STREAM // INTENT_CLASSIFIED // 140MS LATENCY', laser-sharp contrast on an obsidian deep black background, ultra-minimal, high-tech industrial enterprise AI software aesthetic, 8k resolution, photorealistic digital telemetry rendering."
    },
    {
        "filename": "verification-wafer-macro.png",
        "description": "Proof Band — Enterprise AI Verification Ledger & Deterministic Audit Trail",
        "prompt": "Cinematic widescreen 16:9 high-precision visualization of an Enterprise AI Verification & Audit Ledger system. A sleek monochrome dark control console showing real-time cryptographic audit traces, deterministic AI decision verification blocks, policy boundary validation status indicators, and compliance telemetry. Crisp hairline vector grids, monospace transaction hashes, micro-indicators with 'DPDP_VERIFIED // STATE_COMMITTED // ZERO_LEAKAGE', matte charcoal and stark white contrast, precision telemetry HUD, elegant industrial software design, 8k resolution."
    },
    {
        "filename": "final-cta-architecture.png",
        "description": "Final CTA — Enterprise Multi-Agent AI Deployment Blueprint",
        "prompt": "Cinematic widescreen 16:9 architectural isometric visualization of an Enterprise AI System Infrastructure and Multi-Agent Deployment Network. Modular autonomous AI worker nodes interconnected through a central neural orchestration bus, data flow conduits, and security boundary perimeters. High-contrast monochrome technical schematic style, dark obsidian background with crisp matte titanium and graphite structural panels, razor-thin laser guidelines, monospace architectural labels 'ENTERPRISE_CORE // WORKER_DISPATCH // SECURE_RUNTIME', ultra-minimal, precise, industrial enterprise computing, 8k resolution."
    },
    {
        "filename": "workers-actuator-macro.png",
        "description": "Workers Page — Autonomous AI Domain Worker Execution Engine",
        "prompt": "Cinematic widescreen 16:9 macro visualization of an Autonomous Enterprise AI Worker Execution Engine in action. A high-density monochrome technical interface displaying parallel task queue processing, intelligent workflow execution streams, real-time structured data transformation, and automated action triggers. Razor-sharp vector pipelines, minimal typography showing 'WORKER_01 // TASK_RESOLVED // RUNTIME_ACTIVE', dark matte graphite and white luminescence, clean geometric telemetry panels, industrial enterprise AI software interface, 8k resolution."
    },
    {
        "filename": "brain-routing-mesh.png",
        "description": "Brain Page — Multi-Agent AI Orchestration Mesh & Neural Routing",
        "prompt": "Cinematic widescreen 16:9 visualization of an Enterprise AI Orchestration Engine and Neural Multi-Agent Routing Mesh. Complex, elegant directed acyclic graph (DAG) network topology with glowing nodes representing specialized AI domain agents, dynamic data routing vectors, load-balancing telemetry, and human-in-the-loop escalation branches. High-contrast monochrome palette on dark obsidian, laser-sharp interconnecting conduits, technical HUD readouts 'ORCHESTRATION_MESH // AGENT_ROUTING // SYNC_ACTIVE', clean mathematical elegance, 8k rendering."
    },
    {
        "filename": "brakes-interlock-macro.png",
        "description": "Brakes Page — AI Governance Guardrails & Safety Interlock",
        "prompt": "Cinematic widescreen 16:9 high-contrast visualization of an Enterprise AI Safety Interlock and Real-Time Governance Guardrail system. A technical control monitor displaying live confidence probability distributions, semantic boundary firewall gates, automated policy enforcement filters, and instant human-escalation circuit-breaker status. Sharp monochrome graphics, obsidian matte surface with crisp white and slate telemetry, technical labels 'POLICY_INTERLOCK // CONFIDENCE_THRESHOLD_99.8% // SAFETY_CLEAR', ultra-clean industrial enterprise software aesthetic, 8k resolution."
    },
    {
        "filename": "callme-ribbon-mic.png",
        "description": "CallMe Depth Page — Realtime Neural Speech Processing & Acoustic Intelligence",
        "prompt": "Cinematic widescreen 16:9 macro visualization of an Enterprise Neural Speech Recognition and Realtime Voice Synthesis Engine. Visualizing multi-frequency acoustic spectral streams being transformed into semantic conversational intent tokens in real time. Dynamic soundwave frequency analysis, neural voice timbre modulation graphs, and enterprise telephony latency gauges in high-contrast monochrome. Obsidian black background, luminous white waveform vectors, razor-sharp technical typography 'VOICE_AGENT_ACTIVE // SPEECH_TO_INTENT // SUB_200MS', ultra-minimal, 8k resolution."
    },
    {
        "filename": "security-vault-bolt.png",
        "description": "Security & Trust Page — Cryptographic AI Security Vault & DPDP Isolation",
        "prompt": "Cinematic widescreen 16:9 visualization of an Enterprise AI Data Isolation and Cryptographic Security Infrastructure. Multi-layered cryptographic zero-knowledge enclaves, encrypted token pipelines, strict tenant boundary isolation walls, and DPDP Indian data residency compliance verification matrix. Deep obsidian and matte titanium palette, razor-sharp geometric security nodes, monospace encryption status 'ZERO_RETENTION // DPDP_INDIA_RESIDENT // AES_GCM_ISOLATED', ultra-secure industrial enterprise software design, 8k resolution."
    },
    {
        "filename": "solutions-sales-telemetry.png",
        "description": "Sales & Lead Automation — Inbound Sales Pipeline & Lead Intelligence",
        "prompt": "Cinematic widescreen 16:9 technical dashboard visualization of an AI Inbound Sales Pipeline & Lead Intelligence Engine. Multi-channel inbound lead vector scoring, automated ICP qualification flowcharts, real-time CRM synchronization pipelines, and automated calendar conversion metrics. Dark monochrome UI console, stark white data curves, crisp vector lead-routing pathways, technical labels 'ICP_MATCH_94% // LEAD_QUALIFIED // CRM_AUTO_SYNC', minimalist high-contrast enterprise sales intelligence, 8k resolution."
    },
    {
        "filename": "solutions-support-acoustic.png",
        "description": "Customer Support — Omnichannel Conversational Support & Ticket Resolution",
        "prompt": "Cinematic widescreen 16:9 visualization of an Omnichannel Enterprise AI Customer Support Engine. Real-time conversation stream across WhatsApp, email, and live chat, dynamic customer sentiment analysis heatmaps, automated knowledge-base retrieval vector search, and instant tier-2 human escalation routing. High-contrast monochrome technical interface, matte charcoal background, razor-thin vector graphs, monospace data tags 'OMNICHANNEL_ACTIVE // SENTIMENT_POSITIVE // TICKET_AUTO_RESOLVED', clean industrial UI, 8k resolution."
    },
    {
        "filename": "solutions-document-optical.png",
        "description": "Document Processing & Contracts — Neural Optical Document Intelligence",
        "prompt": "Cinematic widescreen 16:9 technical visualization of an Intelligent Document Processing (IDP) and Neural Optical Extraction Engine. An enterprise invoice and contract document undergoing multi-layer AI layout analysis, bounding-box entity recognition, table structure extraction, and automated cross-validation against accounting schemas. High-contrast monochrome, obsidian surface with luminous white bounding box overlays, razor-thin segmentation vectors, monospace readouts 'OCR_EXTRACTION // ENTITY_VALIDATED // 99.9% ACCURACY', ultra-precise, 8k resolution."
    },
    {
        "filename": "solutions-finance-balance.png",
        "description": "Finance AP & Procurement — Autonomous AI Financial Reconciliation",
        "prompt": "Cinematic widescreen 16:9 visualization of an Autonomous AI Financial Reconciliation and Accounts Payable Engine. Live 3-way automated matching matrix between Purchase Orders, Goods Received Notes, and Vendor Invoices, automated GST/tax discrepancy detection graphs, and ERP ledger commit verification. Dark monochrome technical console, razor-thin data reconciliation trees, stark white audit indicators, monospace labels '3_WAY_MATCH_CONFIRMED // GST_RECONCILED // ERP_POSTED', minimalist high-precision financial AI software, 8k resolution."
    }
]

def generate_image(item):
    filename = item["filename"]
    sys.stdout.write(f"Starting {filename}...\n")
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
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        sys.stdout.write(f"SUCCESS: Saved {filename} ({len(img_bytes):,} bytes)\n")
        sys.stdout.flush()
        return filename

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_image, item): item["filename"] for item in IMAGES_TO_GENERATE}
        for future in as_completed(futures):
            filename = futures[future]
            try:
                res = future.result()
            except Exception as e:
                sys.stderr.write(f"FAILED {filename}: {e}\n")
                sys.stderr.flush()

if __name__ == "__main__":
    main()
