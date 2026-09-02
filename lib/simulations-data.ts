/**
 * Simulation data for each of the 13 Laxvish AI Workers.
 * Provides realistic, concrete, domain-specific steps, inputs, reasoning, and verified outputs.
 */

export interface SimulationStep {
  label: string;
  badge: string;
  detail: string;
  type: "intake" | "reasoning" | "action" | "verification";
  dataSnippet?: Record<string, string | number | boolean>;
}

export interface AgentSimulationConfig {
  agentName: string;
  agentRole: string;
  runtimeSpeed: string;
  guardrail: string;
  steps: SimulationStep[];
}

export const AGENT_SIMULATIONS: Record<string, AgentSimulationConfig> = {
  "sales-automation": {
    agentName: "SalesEngine.v2",
    agentRole: "Lead Qualification & Scheduling Worker",
    runtimeSpeed: "14ms",
    guardrail: "DPDP Consent Verified",
    steps: [
      {
        label: "Lead Ingestion",
        badge: "WEBHOOK / INBOUND",
        detail: "Inbound inquiry from Rajan (VP Ops, 150-person Logistics Co.) via Website Form.",
        type: "intake",
        dataSnippet: {
          name: "Rajan Mehta",
          company: "Apex Freight Express",
          fleet_size: "120 trucks",
          interest: "Automate invoice reconciliation & driver support",
          source_channel: "website_modal_v2",
        },
      },
      {
        label: "ICP Scoring & Enrichment",
        badge: "REASONING MATRIX",
        detail: "Cross-referencing revenue bracket, headcount, and workflow compatibility.",
        type: "reasoning",
        dataSnippet: {
          icp_tier: "Tier-1 Enterprise",
          qualification_score: "94.8%",
          estimated_deal_size: "₹18.5L ARR",
          intent_urgency: "High (Evaluating for Q3 rollout)",
        },
      },
      {
        label: "Automated Outreach & Calendar Sync",
        badge: "EXECUTION",
        detail: "Drafted personalized WhatsApp & email follow-up. Slotted meeting with Rohan (AE).",
        type: "action",
        dataSnippet: {
          email_sent: "rajan@apexfreight.in",
          meeting_slot: "Thursday, 3:30 PM IST",
          calendar_invite: "Sent (Google Meet)",
          crm_id: "SF-LEAD-9042",
        },
      },
      {
        label: "Brakes Quality & Audit Check",
        badge: "VERIFIED",
        detail: "Confirmed no hallucinated pricing promises; logged opt-in verification hash.",
        type: "verification",
        dataSnippet: {
          governance_status: "PASSED",
          policy_compliance: "100%",
          audit_hash: "0x8f2d...b14c",
        },
      },
    ],
  },
  "customer-support": {
    agentName: "SupportAgent.v4",
    agentRole: "24/7 Multichannel Customer Support Worker",
    runtimeSpeed: "9ms",
    guardrail: "Human Escalation Threshold: 0.85",
    steps: [
      {
        label: "Incoming Customer Ticket",
        badge: "WHATSAPP / HINDI-ENG",
        detail: "\"Mera order #48291 abhi tak deliver nahi hua, need update urgently.\"",
        type: "intake",
        dataSnippet: {
          customer_id: "CUST-3819",
          sentiment: "Frustrated / Urgent",
          language: "Hinglish (Mixed)",
          channel: "WhatsApp Business API",
        },
      },
      {
        label: "Order & Courier Telemetry RAG",
        badge: "KNOWLEDGE RETRIEVAL",
        detail: "Queried BlueDart API + ERP warehouse dispatch logs in 18ms.",
        type: "reasoning",
        dataSnippet: {
          order_id: "#48291",
          status: "Out for Delivery (Bandra Hub)",
          delivery_boy_name: "Suresh K.",
          eta: "Today before 4:00 PM",
        },
      },
      {
        label: "Instant Natural Response",
        badge: "NATURAL RESOLUTION",
        detail: "Answered politely in Hinglish with live tracking link and delivery contact.",
        type: "action",
        dataSnippet: {
          response_preview: "Namaste! Aapka parcel Bandra Hub se nikal chuka hai...",
          resolution_time: "1.4s",
          human_intervention: false,
        },
      },
      {
        label: "CSAT & Audit Trace",
        badge: "COMPLIANCE PASS",
        detail: "Logged interaction, updated CRM support status to 'In-Transit Update Provided'.",
        type: "verification",
        dataSnippet: {
          confidence_score: "0.982",
          pii_masked: true,
          crm_sync: "Zendesk #8812 Updated",
        },
      },
    ],
  },
  "document-processing": {
    agentName: "DocScan.OCR",
    agentRole: "Intelligent Document Parser & Verification Worker",
    runtimeSpeed: "22ms",
    guardrail: "Tax & GSTIN Check Strict",
    steps: [
      {
        label: "PDF Ingestion",
        badge: "SCANNED INVOICE",
        detail: "Multi-page vendor invoice received from Horizon Tech Supplies (PDF 2.4MB).",
        type: "intake",
        dataSnippet: {
          file_name: "INV-2026-0841.pdf",
          page_count: 3,
          format: "Scanned PDF / 300 DPI",
          vendor: "Horizon Tech Supplies Pvt Ltd",
        },
      },
      {
        label: "Neural Laser OCR & Key Extraction",
        badge: "ENTITY EXTRACTION",
        detail: "Extracted 28 line items, GSTIN, HSN codes, and bank account details.",
        type: "reasoning",
        dataSnippet: {
          invoice_number: "HTS-99120",
          gstin: "27AAACH7409R1ZZ (Valid)",
          subtotal: "₹1,24,000.00",
          igst_18: "₹22,320.00",
          grand_total: "₹1,46,320.00",
        },
      },
      {
        label: "PO Cross-Verification",
        badge: "3-WAY MATCH",
        detail: "Validated line items against Purchase Order #PO-4401 and delivery challan.",
        type: "action",
        dataSnippet: {
          matched_po: "#PO-4401",
          variance: "₹0.00 (Zero Discrepancy)",
          gl_account: "6020-Hardware-Capex",
          erp_target: "SAP S/4HANA",
        },
      },
      {
        label: "Brakes Audit Lock",
        badge: "AUDIT GRADE ✓",
        detail: "Passed double-entry integrity check; prepared for scheduled payment batch.",
        type: "verification",
        dataSnippet: {
          verification_code: "VRF-PASS-9901",
          tamper_proof_log: "Recorded",
          auto_approved: true,
        },
      },
    ],
  },
  "internal-knowledge": {
    agentName: "InternalBrain.v3",
    agentRole: "Company Knowledge Assistant & Policy RAG",
    runtimeSpeed: "11ms",
    guardrail: "Role-Based Access Control Active",
    steps: [
      {
        label: "Employee Query",
        badge: "SLACK BOT QUERY",
        detail: "\"What is the maximum reimbursement for client dinners in Bangalore?\"",
        type: "intake",
        dataSnippet: {
          user: "ananya.s@company.com",
          department: "Product Marketing",
          channel: "#ask-internal-ops",
        },
      },
      {
        label: "Multi-Repository Semantic Search",
        badge: "VECTOR SEARCH",
        detail: "Searched 4,200 company docs across Notion, Google Drive, and SharePoint in 14ms.",
        type: "reasoning",
        dataSnippet: {
          top_match: "Travel & Expense Policy 2026.pdf (Section 4.2)",
          relevance_score: "0.961",
          tier_city: "Tier-1 (Bangalore)",
        },
      },
      {
        label: "Synthesized Answer with Exact Citation",
        badge: "EXPLAINABLE OUTPUT",
        detail: "Direct response: ₹3,500/person for Tier-1 cities with itemized GST bill requirement.",
        type: "action",
        dataSnippet: {
          answer: "Max ₹3,500 per person for Tier-1 cities (Bangalore). Itemized GST bill required.",
          citation: "HR-EXP-2026 §4.2 (Page 7)",
          direct_link: "open_notion_ref_99()",
        },
      },
      {
        label: "Permission & Audit Log",
        badge: "RBAC VERIFIED",
        detail: "Confirmed user has clearance to view general expense handbook.",
        type: "verification",
        dataSnippet: {
          security_clearance: "Level-1 Employee",
          data_leak_risk: "0.00%",
          audit_trace_id: "AUD-9921",
        },
      },
    ],
  },
  "voice-whatsapp": {
    agentName: "VoiceReceptionist.AI",
    agentRole: "Real-time Telephony & WhatsApp Agent",
    runtimeSpeed: "6ms",
    guardrail: "Zero Audio Retention by Default",
    steps: [
      {
        label: "SIP Inbound Call Ringing",
        badge: "TELEPHONY / EXOTEL",
        detail: "Inbound call connected on PRI Line #2 from +91 98200 XXXXX.",
        type: "intake",
        dataSnippet: {
          caller_state: "Maharashtra",
          codec: "Opus 48kHz HD",
          latency_to_sip: "12ms",
        },
      },
      {
        label: "Real-time STT & Semantic Parser",
        badge: "SPEECH-TO-TEXT",
        detail: "\"I want to reschedule my doctor consultation for tomorrow afternoon.\"",
        type: "reasoning",
        dataSnippet: {
          detected_intent: "appointment_reschedule",
          patient_id: "P-88219",
          preferred_slot: "Tomorrow 2:00 PM - 5:00 PM",
        },
      },
      {
        label: "Calendar Mutation & TTS Stream",
        badge: "VOICE SYNTHESIS",
        detail: "Booked Dr. Sharma at 3:30 PM; streamed natural Hindi/English confirmation audio.",
        type: "action",
        dataSnippet: {
          slot_confirmed: "Tomorrow 3:30 PM IST",
          whatsapp_summary_sent: "Delivered",
          tts_latency: "240ms (Ultra-Low)",
        },
      },
      {
        label: "Compliance Call Logging",
        badge: "REGULATORY PASS",
        detail: "Recorded metadata, scrubbed audio PII, logged to Hospital EMR system.",
        type: "verification",
        dataSnippet: {
          dpdp_redaction: "Active",
          emr_updated: true,
          call_status: "Resolved (Duration 42s)",
        },
      },
    ],
  },
  "marketing-operations": {
    agentName: "GrowthOps.Worker",
    agentRole: "Campaign Orchestration & Lead Routing Agent",
    runtimeSpeed: "16ms",
    guardrail: "Brand Tone Guardrail v3",
    steps: [
      {
        label: "Campaign Brief Intake",
        badge: "STRATEGY INTAKE",
        detail: "Goal: Launch Q3 Webinar on 'DPDP AI Compliance for NBFCs'.",
        type: "intake",
        dataSnippet: {
          target_audience: "Chief Risk Officers, NBFC Founders",
          channels: "LinkedIn InMail, Email Nurture, WhatsApp Broadcast",
          audience_size: "4,850 Verified Accounts",
        },
      },
      {
        label: "Audience Segmentation & Copy Personalization",
        badge: "DYNAMIC ADAPTATION",
        detail: "Generated 3 variant hooks tailored by company size and regulatory category.",
        type: "reasoning",
        dataSnippet: {
          segment_a: "NBFC-Upper Layer (Deep Compliance Angle)",
          segment_b: "Fintech Startups (Speed & Growth Angle)",
          tone_score: "99.2% Brand Match",
        },
      },
      {
        label: "Automated Multi-Channel Execution",
        badge: "BROADCAST DISPATCH",
        detail: "Staggered delivery across Sendgrid & WhatsApp Business API.",
        type: "action",
        dataSnippet: {
          delivered: "4,812 / 4,850 (99.2%)",
          open_rate: "46.8%",
          webinar_registrations: "348 Attendees",
        },
      },
      {
        label: "ROI Attribution & CRM Tagging",
        badge: "ATTRIBUTION PASS",
        detail: "Tagged registered leads into CRM pipeline with high-intent scoring.",
        type: "verification",
        dataSnippet: {
          pipeline_generated: "₹42.0L",
          cost_per_lead: "₹182",
          governance_log: "Saved",
        },
      },
    ],
  },
  "executive-intelligence": {
    agentName: "ExecIntel.Query",
    agentRole: "Executive Ad-hoc BI & Anomaly Radar",
    runtimeSpeed: "19ms",
    guardrail: "Read-Only Database Replica",
    steps: [
      {
        label: "CEO Voice / Text Query",
        badge: "EXECUTIVE INPUT",
        detail: "\"Which customer segment had the highest churn in Q2 and why?\"",
        type: "intake",
        dataSnippet: {
          requested_by: "Founder / CEO",
          timeframe: "Q2 FY2026",
          metric: "Net Revenue Churn Rate",
        },
      },
      {
        label: "Cross-Database Multi-Join Engine",
        badge: "FEDERATED SQL",
        detail: "Queried PostgreSQL prod replica, Stripe API, and Zendesk CSAT logs in 32ms.",
        type: "reasoning",
        dataSnippet: {
          churn_cluster: "Starter Tier ($49/mo)",
          churn_rate: "6.8% (vs 1.1% Enterprise)",
          primary_reason: "Self-serve onboarding dropoff on step 3",
        },
      },
      {
        label: "One-Page Executive Summary & Chart",
        badge: "SYNTHESIS",
        detail: "Generated interactive chart + 3 actionable recommendations.",
        type: "action",
        dataSnippet: {
          summary_bullet_1: "Starter tier churn accounted for 82% of logos lost but only 9% of ARR.",
          summary_bullet_2: "Enterprise churn remains rock-solid at 99.1% NRR.",
          chart_type: "Cohort Analysis Heatmap",
        },
      },
      {
        label: "Data Integrity & Verification Check",
        badge: "ACCURACY AUDIT",
        detail: "Every number reconciles against bank deposits; zero hallucination confirmed.",
        type: "verification",
        dataSnippet: {
          variance_vs_bank: "0.00%",
          source_tables: "public.subscriptions, stripe.charges",
          audit_pass: true,
        },
      },
    ],
  },
  "hr-operations": {
    agentName: "PeopleOps.AI",
    agentRole: "Employee Lifecycle & Onboarding Assistant",
    runtimeSpeed: "12ms",
    guardrail: "Confidentiality Tier-4 (HR Only)",
    steps: [
      {
        label: "New Hire Onboarding Trigger",
        badge: "JOINING INTAKE",
        detail: "Candidate Priya Sharma accepted offer for Senior Frontend Engineer.",
        type: "intake",
        dataSnippet: {
          joining_date: "Next Monday",
          location: "Bangalore (Hybrid)",
          equipment_needed: "MacBook Pro 16\", YubiKey",
        },
      },
      {
        label: "Document Verification & Background Check",
        badge: "VERIFICATION PIPELINE",
        detail: "Scanned PAN, Aadhaar, degree certificate, and prior relieving letter.",
        type: "reasoning",
        dataSnippet: {
          pan_verification: "NSDL API Match ✓",
          aadhaar_vault: "Tokenized (DPDP Safe)",
          pf_transfer_ready: true,
        },
      },
      {
        label: "Auto-Provisioning & Welcome Pack",
        badge: "SYSTEM PROVISIONING",
        detail: "Created Google Workspace, GitHub, Slack, and issued courier for hardware.",
        type: "action",
        dataSnippet: {
          email_created: "priya.s@laxvish.app",
          slack_invite: "Sent",
          laptop_tracking: "Bluedart #BD-9912",
        },
      },
      {
        label: "HRMS State Commit",
        badge: "AUDIT LOGGED",
        detail: "Employee record initialized in Keka / Darwinbox with all compliance docs.",
        type: "verification",
        dataSnippet: {
          onboarding_sla: "Completed in 4 mins (was 3 days)",
          missing_documents: "0",
          status: "Ready for Day 1",
        },
      },
    ],
  },
  "finance-ap": {
    agentName: "FinanceReconcile.v2",
    agentRole: "Automated Accounts Payable & Invoice Matching Agent",
    runtimeSpeed: "15ms",
    guardrail: "Dual Approval for >₹5,00,000",
    steps: [
      {
        label: "Vendor Bill Inflow",
        badge: "EMAIL ATTACHMENT",
        detail: "AWS Cloud bill of ₹3,42,100 received from Amazon Web Services India.",
        type: "intake",
        dataSnippet: {
          vendor: "Amazon Web Services India Pvt Ltd",
          invoice_no: "IN-2026-9921",
          billing_period: "May 2026",
          amount: "₹3,42,100.00",
        },
      },
      {
        label: "Usage Breakdown & Budget Cap Check",
        badge: "BUDGET REASONING",
        detail: "Compared usage metrics vs. monthly allocated engineering cloud budget.",
        type: "reasoning",
        dataSnippet: {
          budget_cap: "₹4,00,000.00",
          actual_spend: "₹3,42,100.00 (Within 85.5% cap)",
          anomalies: "Zero unexpected surge detected",
        },
      },
      {
        label: "ERP Journal Entry & Payment Queue",
        badge: "ACCOUNTING COMMIT",
        detail: "Posted to Tally / SAP under 'Infrastructure Cloud Capex' ledger.",
        type: "action",
        dataSnippet: {
          debit_account: "Hosting & Cloud Compute",
          credit_account: "Accounts Payable - AWS",
          payment_due_date: "15th June 2026",
        },
      },
      {
        label: "GST ITC Claim Validation",
        badge: "TAX COMPLIANT ✓",
        detail: "Verified GSTIN on GST Portal to ensure input tax credit eligibility.",
        type: "verification",
        dataSnippet: {
          gstr2b_match: "Eligible for ₹52,184 ITC",
          audit_trace: "Signed with private key",
          auto_processed: true,
        },
      },
    ],
  },
  "contract-automation": {
    agentName: "LegalRadar.AI",
    agentRole: "Contract Risk Analyzer & Clause Matcher",
    runtimeSpeed: "28ms",
    guardrail: "Never Auto-Sign (Human Gate Mandatory)",
    steps: [
      {
        label: "Master Services Agreement Intake",
        badge: "DOCX / PDF INTAKE",
        detail: "34-page vendor agreement submitted by Fortune 500 Enterprise Client.",
        type: "intake",
        dataSnippet: {
          client: "Global Retail Conglomerate",
          contract_type: "MSA + DPA Addendum",
          total_pages: 34,
          liability_clause: "Section 14.1",
        },
      },
      {
        label: "Playbook Deviation Scanning",
        badge: "REDLINE REASONING",
        detail: "Scanned 142 clauses against Company Standard Legal Playbook.",
        type: "reasoning",
        dataSnippet: {
          unlimited_liability_flagged: "High Risk (Client requested uncapped liability)",
          governing_law: "Mumbai Jurisdiction (Approved)",
          payment_terms: "Net 60 (Standard is Net 30)",
        },
      },
      {
        label: "Auto-Generated Redline Markup",
        badge: "REDLINE DRAFT",
        detail: "Drafted balanced counter-proposal clause with standard 12-month fee cap.",
        type: "action",
        dataSnippet: {
          suggested_edit: "Liability capped at 12x monthly fees paid under this SOW.",
          risk_summary_doc: "1-Page Executive Brief Generated",
          reviewed_by: "Sent to Legal Counsel for 1-click review",
        },
      },
      {
        label: "Legal Compliance Seal",
        badge: "REVIEW PASS",
        detail: "Logged contract version hash and highlighted 2 business commercial points for CEO.",
        type: "verification",
        dataSnippet: {
          review_time: "48 seconds (was 4 days)",
          risk_score: "Low after proposed redline",
          status: "Awaiting Legal Counsel Sign-off",
        },
      },
    ],
  },
  "procurement": {
    agentName: "ProcureBot.v2",
    agentRole: "Vendor Comparison & Purchase Order Automator",
    runtimeSpeed: "18ms",
    guardrail: "Approved Vendor List Only",
    steps: [
      {
        label: "Purchase Requisition",
        badge: "REQUISITION TICKET",
        detail: "Engineering requested 40x 4K Monitors for new office expansion.",
        type: "intake",
        dataSnippet: {
          item: "Dell 27\" 4K USB-C Hub Monitors",
          quantity: 40,
          required_by: "End of Month",
          department: "Infrastructure & IT",
        },
      },
      {
        label: "3-Vendor Price & SLA Benchmark",
        badge: "PRICE BENCHMARKING",
        detail: "Requested and parsed real-time quotes from 3 authorized distributors.",
        type: "reasoning",
        dataSnippet: {
          vendor_1: "₹31,400/unit (3-day delivery) - Best Total Score",
          vendor_2: "₹33,900/unit (Next day)",
          vendor_3: "₹32,000/unit (10-day delivery)",
          estimated_savings: "₹1,00,000 Saved vs Retail",
        },
      },
      {
        label: "Purchase Order Generation",
        badge: "PO DISPATCH",
        detail: "Generated PO #PO-8819 with agreed volume discount and delivery terms.",
        type: "action",
        dataSnippet: {
          po_number: "PO-8819",
          awarded_vendor: "CompuAge Technologies",
          delivery_terms: "FOB Destination (Bangalore)",
        },
      },
      {
        label: "Spending Approval Gate",
        badge: "POLICY VERIFIED",
        detail: "Approved within VP Operations quarterly budget threshold.",
        type: "verification",
        dataSnippet: {
          budget_clearance: "Approved",
          spend_compliance: "100%",
          erp_commit: "PO #8819 Logged",
        },
      },
    ],
  },
  "it-helpdesk": {
    agentName: "ITDesk.Auto",
    agentRole: "Automated Access Control & IT Helpdesk Agent",
    runtimeSpeed: "8ms",
    guardrail: "Zero Privilege Creep Enforced",
    steps: [
      {
        label: "Support Ticket Intake",
        badge: "JIRA SERVICE DESK",
        detail: "Engineer requested temporary read access to AWS Production Logs for debugging.",
        type: "intake",
        dataSnippet: {
          user: "karthik.m@laxvish.app",
          role: "Senior Backend Engineer",
          resource: "CloudWatch-Prod-API-Logs",
          urgency: "Production P1 Incident in progress",
        },
      },
      {
        label: "Authorization & Role Verification",
        badge: "SECURITY RADAR",
        detail: "Verified active P1 incident ticket + engineer on-call rotation schedule in PagerDuty.",
        type: "reasoning",
        dataSnippet: {
          on_call_status: "Active Primary On-Call",
          incident_valid: "INC-4029 (Severity 1)",
          approval_level: "Auto-Eligible for Time-Bound Access",
        },
      },
      {
        label: "Time-Bound IAM Role Elevation",
        badge: "ACCESS GRANTED",
        detail: "Granted 4-hour temporary AWS STS assume-role with automated revocation timer.",
        type: "action",
        dataSnippet: {
          role_arn: "arn:aws:iam::account:role/LogViewer-Temp",
          duration: "4 Hours (Expires 19:30 IST)",
          mfa_verified: true,
        },
      },
      {
        label: "SOC2 Audit Lock",
        badge: "SECURITY SEAL ✓",
        detail: "Logged temporary elevation to SIEM with incident reference and automated revoke hook.",
        type: "verification",
        dataSnippet: {
          siem_event_id: "SEC-LOG-99410",
          auto_revocation_timer: "Armed",
          audit_compliance: "SOC-2 / ISO-27001 Compliant",
        },
      },
    ],
  },
  "reporting-analytics": {
    agentName: "ReportOrchestrator.v3",
    agentRole: "Automated Reporting & Narrative Analytics Agent",
    runtimeSpeed: "20ms",
    guardrail: "Zero Data Leakage Guard",
    steps: [
      {
        label: "Scheduled Report Trigger",
        badge: "CRON SCHEDULE",
        detail: "Triggered Monday 8:00 AM Weekly Business Review (WBR) compilation.",
        type: "intake",
        dataSnippet: {
          report_name: "Weekly Revenue & CAC Performance",
          distribution_list: "Leadership Team (Slack #leadership + Email PDF)",
          sources: "BigQuery, Salesforce, Google Ads, Stripe",
        },
      },
      {
        label: "Data Pipeline Aggregation & Trend Detection",
        badge: "ANALYTICS ENGINE",
        detail: "Aggregated 420,000 transaction rows and extracted statistical anomalies.",
        type: "reasoning",
        dataSnippet: {
          wow_arr_growth: "+14.2% Week-over-Week",
          blended_cac: "₹2,140 (12% decrease)",
          highlight_finding: "Organic referral conversion rate reached all-time high of 8.4%",
        },
      },
      {
        label: "Executive Narrative & Chart Compilation",
        badge: "NARRATIVE GENERATION",
        detail: "Compiled plain-English summary + 4 high-res charts into interactive brief.",
        type: "action",
        dataSnippet: {
          summary_generated: "5-Bullet Key Takeaways",
          format: "Notion Page + Executive PDF Attached",
          sent_to_slack: "Delivered to #leadership at 8:01 AM",
        },
      },
      {
        label: "Metric Reconciliation Audit",
        badge: "MATH VERIFIED ✓",
        detail: "Checked mathematical consistency across GAAP metrics and tax provisions.",
        type: "verification",
        dataSnippet: {
          formula_verification: "100% Validated",
          source_hash: "SHA256-4b82...99f1",
          audit_trail: "Locked",
        },
      },
    ],
  },
};

export function getSimulationForSlug(slug: string): AgentSimulationConfig {
  return AGENT_SIMULATIONS[slug] ?? AGENT_SIMULATIONS["sales-automation"];
}
