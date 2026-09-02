/**
 * Single source of truth for all Laxvish use cases.
 *
 * Each use case is a concrete, real-world business problem the AI can solve.
 * Pages render at /solutions/[slug].
 *
 * Voice remains plain English. We never say "orchestration" or "verification"
 * without explaining what it means in context.
 */

export type UseCaseCategory =
  | "Sales & Growth"
  | "Customer Operations"
  | "Internal Operations"
  | "Finance & Compliance";

export interface UseCase {
  /** URL slug, e.g. "sales-automation" -> /solutions/sales-automation */
  slug: string;
  /** Display title shown on cards and the hero of the use case page */
  title: string;
  /** Category used to group on the home page and solutions index */
  category: UseCaseCategory;
  /** One sentence that explains the value in plain English (used on cards) */
  oneLiner: string;
  /** Eyebrow line on the use case page hero (e.g. "Sales & Growth") */
  eyebrow: string;
  /** H1 headline on the use case page */
  headline: string;
  /** Subheadline under the H1 */
  subhead: string;
  /** "What this AI worker does" section, 4-6 bullets */
  whatItDoes: string[];
  /** 3-4 step "How a typical engagement works" timeline */
  engagement: { step: string; title: string; description: string }[];
  /** "What you'd see in the first month" outcomes */
  outcomes: string[];
  /** "How we keep you in control" trust signals */
  control: string[];
  /** Common questions specific to this use case */
  faq: { question: string; answer: string }[];
  /** Slugs of related use cases (used in the "Related" section) */
  related: string[];
  /** If true, render this as a flagship card on the home page */
  flagship: boolean;
  /** SEO keywords specific to this use case */
  keywords: string[];
}

export const USE_CASES: UseCase[] = [
  {
    slug: "sales-automation",
    title: "AI Sales & Lead Automation",
    category: "Sales & Growth",
    oneLiner:
      "Qualify leads, follow up automatically, and book meetings for your sales team.",
    eyebrow: "Sales & Growth",
    headline: "AI that fills your sales pipeline while your team sleeps.",
    subhead:
      "Stop losing leads to slow follow-up. Laxvish reads every inbound lead, checks it against your ideal customer, sends a personalized follow-up, and books a meeting on your rep's calendar. Your team only talks to leads worth talking to.",
    whatItDoes: [
      "Reads inbound leads from your website, ads, forms, and WhatsApp",
      "Checks each lead against your ideal customer profile",
      "Sends a personalized follow-up by email, WhatsApp, or SMS",
      "Books a meeting directly into your sales rep's calendar",
      "Hands off only qualified, sales-ready leads to your team",
      "Logs every conversation in your CRM automatically",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We learn your sales process",
        description:
          "We study your ICP, your follow-up style, and the questions your reps ask on the first call.",
      },
      {
        step: "Week 2",
        title: "We set up the AI worker",
        description:
          "We connect the AI to your CRM, email, WhatsApp, and calendar. The AI starts in training mode.",
      },
      {
        step: "Week 3",
        title: "Pilot runs with your oversight",
        description:
          "You see every conversation, approve key decisions, and refine what the AI is allowed to do automatically.",
      },
      {
        step: "Week 4+",
        title: "Scale what works",
        description:
          "Add more channels, more sequences, more languages. The AI keeps learning from every interaction.",
      },
    ],
    outcomes: [
      "Faster response to every inbound lead (minutes, not hours)",
      "More qualified meetings booked on your reps' calendars",
      "Hours of manual follow-up gone every week",
      "Full visibility into what the AI said and did",
    ],
    control: [
      "Every AI conversation is logged and reviewable",
      "You set the rules for what the AI can do automatically vs. what needs your approval",
      "Anything unusual gets flagged and routed to your team",
      "You can pause, change, or stop the AI at any time",
    ],
    faq: [
      {
        question: "Which tools does this integrate with?",
        answer:
          "Salesforce, HubSpot, Zoho, Pipedrive, WhatsApp Business, Gmail, Outlook, and Google Calendar are supported out of the box. Custom integrations are available on request.",
      },
      {
        question: "Will the AI sound like a robot?",
        answer:
          "No. The AI is trained on your tone, your products, and your style. Most leads don't realize they're talking to an AI until you tell them.",
      },
      {
        question: "What if a lead wants to talk to a human?",
        answer:
          "The AI hands off immediately, with full context. Your rep joins the conversation already knowing what the lead asked.",
      },
      {
        question: "How is this priced?",
        answer:
          "Either a per-lead-qualified fee or a monthly flat fee, depending on your volume. We'll discuss on the call.",
      },
    ],
    related: ["voice-whatsapp", "marketing-operations", "executive-intelligence"],
    flagship: true,
    keywords: [
      "ai sales automation",
      "ai lead qualification",
      "ai sales agent",
      "automated lead follow up",
    ],
  },
  {
    slug: "customer-support",
    title: "AI Customer Support Automation",
    category: "Customer Operations",
    oneLiner:
      "Answer customer questions 24/7 across chat, email, and WhatsApp. Route complex cases to a human.",
    eyebrow: "Customer Operations",
    headline: "Customer support that never sleeps and never forgets.",
    subhead:
      "Your customers want answers at 11pm. Your team can't be there 24/7. Laxvish handles the routine questions instantly, in your brand voice, across every channel. When something is too complex, it hands off to a human with full context.",
    whatItDoes: [
      "Answers questions about your products, pricing, and policies",
      "Resolves common issues (order status, password reset, refund requests)",
      "Speaks in your brand voice and your customer's language",
      "Works on your website chat, email, WhatsApp, and Telegram",
      "Routes complex or unhappy customers to a human with the full conversation history",
      "Learns from every interaction to get better over time",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your support questions",
        description:
          "You share your top 50 questions, your policies, and the cases that always go to a human. We build the knowledge base.",
      },
      {
        step: "Week 2",
        title: "We connect your channels",
        description:
          "We plug the AI into your website, WhatsApp, email, and any helpdesk tool you use (Zendesk, Freshdesk, Intercom, etc).",
      },
      {
        step: "Week 3",
        title: "Pilot runs alongside your team",
        description:
          "The AI handles the easy questions. Your team handles the rest. You review every interaction to refine the AI.",
      },
      {
        step: "Week 4+",
        title: "Scale up the AI's scope",
        description:
          "As the AI proves itself, you let it handle more questions and more channels. Your team focuses on the cases that need a human.",
      },
    ],
    outcomes: [
      "Customer questions answered in seconds, not hours",
      "Coverage 24/7 without hiring night-shift agents",
      "Lower support costs as the AI handles the easy cases",
      "Your team only deals with complex, high-value customer conversations",
    ],
    control: [
      "Every AI conversation is logged and reviewable",
      "You set which questions the AI can answer automatically vs. which it must escalate",
      "Sensitive cases (refunds, complaints, legal) always go to a human",
      "You can update the AI's knowledge base in real time",
    ],
    faq: [
      {
        question: "Which channels does the AI work on?",
        answer:
          "Website chat, email, WhatsApp, Telegram, Instagram DMs, and any helpdesk tool that has an API. Custom channels are available.",
      },
      {
        question: "What languages does the AI speak?",
        answer:
          "English, Hindi, and 8 other Indian languages out of the box. Add more on request.",
      },
      {
        question: "What happens when the AI doesn't know the answer?",
        answer:
          "It tells the customer honestly that it's checking with the team, then routes the conversation to a human with the full context.",
      },
      {
        question: "Will my customers know they're talking to an AI?",
        answer:
          "That's your call. We can be fully transparent (introduce as an AI assistant), or fully invisible. Both work.",
      },
    ],
    related: ["voice-whatsapp", "internal-knowledge", "executive-intelligence"],
    flagship: true,
    keywords: [
      "ai customer support",
      "ai support agent",
      "ai chatbot for business",
      "automated customer service",
    ],
  },
  {
    slug: "document-processing",
    title: "AI Document Processing",
    category: "Finance & Compliance",
    oneLiner:
      "Read, extract, and verify information from invoices, contracts, KYC documents, and more.",
    eyebrow: "Finance & Compliance",
    headline: "Read a thousand documents in the time it takes to read one.",
    subhead:
      "Invoices, contracts, KYC forms, shipping documents, bank statements — your team reads the same kinds of documents over and over. Laxvish reads them in seconds, pulls out what matters, flags what's wrong, and routes the rest to a human for review.",
    whatItDoes: [
      "Reads PDFs, scanned images, and photos of documents",
      "Extracts key fields (names, dates, amounts, IDs, line items)",
      "Cross-checks extracted data against your rules and databases",
      "Flags missing information, mismatches, and suspicious patterns",
      "Routes clean documents to the next step automatically",
      "Sends only exceptions to a human for review",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We pick the highest-volume document type",
        description:
          "You show us the document you process most often (invoices, KYC, contracts, etc). We focus there first.",
      },
      {
        step: "Week 2",
        title: "We build the AI reader",
        description:
          "The AI learns your document format, your checks, and your routing rules. You give us 50 sample documents.",
      },
      {
        step: "Week 3",
        title: "Pilot runs on real documents",
        description:
          "The AI processes real documents in parallel with your team. You compare results and refine the rules.",
      },
      {
        step: "Week 4+",
        title: "Scale to more document types",
        description:
          "Once the first document type is working, we apply the same pattern to your other document workflows.",
      },
    ],
    outcomes: [
      "Documents processed in seconds, not days",
      "Higher accuracy than manual reading (typically 98%+)",
      "Your team only reviews exceptions, not every document",
      "Full audit trail of what the AI read and decided",
    ],
    control: [
      "Every document the AI reads is stored and reviewable",
      "You set the rules for what counts as 'clean' vs. 'needs review'",
      "Sensitive documents can be excluded from AI processing entirely",
      "You can require human approval before any high-stakes decision",
    ],
    faq: [
      {
        question: "What document types do you support?",
        answer:
          "Invoices, receipts, purchase orders, contracts, KYC forms, bank statements, ID proofs, shipping documents, medical records, and more. Custom document types are supported.",
      },
      {
        question: "What if the document is in a regional language?",
        answer:
          "Supported. Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and English are covered.",
      },
      {
        question: "How accurate is the AI?",
        answer:
          "On structured documents (invoices, KYC), accuracy is typically 98%+. On unstructured documents (contracts), accuracy is around 90-95%. We always send low-confidence extractions to a human.",
      },
      {
        question: "Where is the document data stored?",
        answer:
          "On infrastructure you choose — your servers, an Indian cloud region, or our managed environment. Data never leaves India unless you ask.",
      },
    ],
    related: ["finance-ap", "contract-automation", "procurement"],
    flagship: true,
    keywords: [
      "ai document processing",
      "ai invoice processing",
      "ai kyc automation",
      "ai ocr for business",
    ],
  },
  {
    slug: "internal-knowledge",
    title: "AI Internal Knowledge Automation",
    category: "Internal Operations",
    oneLiner:
      "Let your team ask questions in plain English and get answers from your company documents.",
    eyebrow: "Internal Operations",
    headline: "Stop answering the same questions over and over.",
    subhead:
      "Your team wastes hours every week finding information that's already in your documents — HR policies, product specs, SOPs, past decisions, customer history. Laxvish turns your documents into an assistant your team can ask in plain English.",
    whatItDoes: [
      "Reads your company documents (policies, SOPs, wikis, handbooks, decks)",
      "Answers questions in plain English, with the source document cited",
      "Respects access controls — sees only what the asker is allowed to see",
      "Works inside Slack, Teams, your helpdesk, or a web chat",
      "Gets smarter as you add more documents",
      "Flags questions it can't answer so you know what's missing",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We connect your document sources",
        description:
          "Google Drive, SharePoint, Notion, Confluence, your intranet, your helpdesk — wherever your team's knowledge lives.",
      },
      {
        step: "Week 2",
        title: "We set up the AI assistant",
        description:
          "The AI indexes your documents, respects your access permissions, and learns your team's terminology.",
      },
      {
        step: "Week 3",
        title: "Pilot runs in one team",
        description:
          "We start with one team (HR, IT, or Sales) so we can measure impact and tune the answers.",
      },
      {
        step: "Week 4+",
        title: "Roll out to the rest of the company",
        description:
          "Once the pilot team loves it, we add more teams, more document sources, and more use cases.",
      },
    ],
    outcomes: [
      "Hours saved every week by not hunting for information",
      "Faster onboarding for new hires",
      "Consistent answers to the same questions across teams",
      "Your experts freed up from answering the same questions repeatedly",
    ],
    control: [
      "The AI only sees what each user is allowed to see",
      "Every answer cites the source document so your team can verify",
      "You see what questions are being asked, so you know what's missing",
      "You can update documents and the AI learns immediately",
    ],
    faq: [
      {
        question: "Does the AI only see what my team is allowed to see?",
        answer:
          "Yes. The AI respects the same access controls as the source documents. HR documents are only visible to people with HR access, and so on.",
      },
      {
        question: "What if the AI gives a wrong answer?",
        answer:
          "Every answer cites its source. Your team can verify in one click. Wrong answers help us improve — we add the right answer to the source documents.",
      },
      {
        question: "Where does my data live?",
        answer:
          "On infrastructure you choose. For most Indian enterprises, we deploy in a Mumbai or Hyderabad cloud region, with no data leaving India.",
      },
    ],
    related: ["hr-operations", "it-helpdesk", "customer-support"],
    flagship: true,
    keywords: [
      "ai internal knowledge base",
      "ai company knowledge assistant",
      "ai hr assistant",
      "ai document search",
    ],
  },
  {
    slug: "voice-whatsapp",
    title: "AI Voice & WhatsApp Automation",
    category: "Customer Operations",
    oneLiner:
      "Answer phone calls and WhatsApp messages automatically, with full conversation logs.",
    eyebrow: "Customer Operations",
    headline: "An AI receptionist that sounds human and never puts anyone on hold.",
    subhead:
      "Laxvish answers your phone, talks to your customers in natural language, and handles the routine calls. For complex or sensitive cases, it transfers to a human with the full conversation history. The same AI works on WhatsApp, so customers can start a call in chat and switch to voice seamlessly.",
    whatItDoes: [
      "Answers inbound phone calls in a natural human voice",
      "Handles routine questions (hours, location, order status, pricing)",
      "Books appointments and routes urgent calls to the right person",
      "Speaks English, Hindi, and other Indian languages",
      "Works on WhatsApp Business the same way (text and voice)",
      "Records every call and conversation for quality and compliance",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We learn your call patterns",
        description:
          "You share your top 20 reasons people call, your escalation rules, and the questions your team always answers.",
      },
      {
        step: "Week 2",
        title: "We set up the voice agent",
        description:
          "We connect the AI to your phone system, your CRM, and your calendar. The AI starts in training mode.",
      },
      {
        step: "Week 3",
        title: "Pilot runs alongside your team",
        description:
          "The AI takes some calls. Your team takes the rest. You review every conversation to refine the AI.",
      },
      {
        step: "Week 4+",
        title: "Scale to 24/7 and more languages",
        description:
          "Once proven, the AI takes calls 24/7, in more languages, on more lines.",
      },
    ],
    outcomes: [
      "No more missed calls, even after hours",
      "Lower call handling costs (typical savings: 40-60%)",
      "Consistent call quality — every call is the AI's best call",
      "Every call recorded, transcribed, and logged for review",
    ],
    control: [
      "Every call is recorded, transcribed, and reviewable",
      "You set which calls the AI can fully handle vs. which it must transfer",
      "Sensitive topics (legal, medical, financial advice) always go to a human",
      "You can listen in on live calls and intervene if needed",
    ],
    faq: [
      {
        question: "Will my customers know they're talking to an AI?",
        answer:
          "By default, the AI introduces itself as an AI assistant. You can change this if your business requires a different approach.",
      },
      {
        question: "What languages does the voice agent speak?",
        answer:
          "English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, and Malayalam. More on request.",
      },
      {
        question: "Can the AI transfer to a human?",
        answer:
          "Yes, instantly, with the full conversation history. The human joins already knowing what the customer asked.",
      },
      {
        question: "How does it integrate with my phone system?",
        answer:
          "We support most modern Indian business phone systems, including Exotel, Knowlarity, Ozonetel, and direct SIP trunks.",
      },
    ],
    related: ["customer-support", "sales-automation", "internal-knowledge"],
    flagship: false,
    keywords: [
      "ai voice agent",
      "ai phone answering",
      "ai whatsapp business",
      "ai call center automation",
    ],
  },
  {
    slug: "marketing-operations",
    title: "AI Marketing Operations",
    category: "Sales & Growth",
    oneLiner: "Run campaigns, score leads, and measure what works.",
    eyebrow: "Sales & Growth",
    headline: "Marketing that runs itself, with the receipts.",
    subhead:
      "Stop juggling 6 tools to run one campaign. Laxvish helps you plan, launch, score, and measure every campaign in one place. It tells you which leads are worth your sales team's time and which campaigns are actually driving revenue.",
    whatItDoes: [
      "Plans and drafts campaign copy (email, WhatsApp, social)",
      "Scores leads based on engagement, fit, and intent",
      "Routes hot leads to sales, nurtures the rest automatically",
      "Tracks every campaign's real ROI (not just clicks)",
      "Builds weekly performance reports you can actually read",
      "Suggests what to do next based on what's working",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We connect your marketing tools",
        description:
          "Your CRM, email tool, ad accounts, analytics — we pull the data into one place.",
      },
      {
        step: "Week 2",
        title: "We set up the AI worker",
        description:
          "The AI learns your lead scoring rules, your campaign history, and your brand voice.",
      },
      {
        step: "Week 3",
        title: "Pilot runs on one campaign",
        description:
          "Pick one campaign. The AI drafts, schedules, scores leads, and reports on results.",
      },
      {
        step: "Week 4+",
        title: "Scale to all your campaigns",
        description:
          "Once proven, the AI runs all your campaigns with the same discipline.",
      },
    ],
    outcomes: [
      "More leads followed up, in less time",
      "Clear view of which campaigns drive real revenue",
      "Less time spent pulling reports, more time spent on strategy",
      "Consistent brand voice across every campaign",
    ],
    control: [
      "Every campaign draft is approved by your team before sending",
      "You set the lead scoring rules — the AI just applies them consistently",
      "Every send is logged and reviewable",
      "You can pause any campaign at any time",
    ],
    faq: [
      {
        question: "Which email and ad tools do you integrate with?",
        answer:
          "Mailchimp, Sendgrid, HubSpot, Zoho Campaigns, Google Ads, Meta Ads, LinkedIn Ads. More on request.",
      },
      {
        question: "Does the AI write the campaign copy?",
        answer:
          "It drafts. Your team approves and edits. The AI learns from your edits to draft better next time.",
      },
      {
        question: "Can the AI score leads based on my rules?",
        answer:
          "Yes. You give us your lead scoring rules (firmographic, behavioral, intent) and the AI applies them consistently to every lead.",
      },
    ],
    related: ["sales-automation", "executive-intelligence", "customer-support"],
    flagship: false,
    keywords: [
      "ai marketing automation",
      "ai lead scoring",
      "ai campaign management",
      "marketing operations automation",
    ],
  },
  {
    slug: "executive-intelligence",
    title: "AI Executive Intelligence",
    category: "Sales & Growth",
    oneLiner:
      "Get dashboards and reports that answer your real questions, not vanity metrics.",
    eyebrow: "Sales & Growth",
    headline: "Stop asking your team for reports. Ask the AI instead.",
    subhead:
      "You have data everywhere — CRM, finance, support, ops. Pulling it into a report takes your team half a day. Laxvish connects to your data sources, builds the dashboards you actually need, and answers your ad-hoc questions in plain English.",
    whatItDoes: [
      "Connects to your CRM, finance, support, and ops tools",
      "Builds the dashboards you need, refreshed automatically",
      "Answers ad-hoc questions in plain English (\"what's our win rate this quarter?\")",
      "Flags anomalies and trends you should know about",
      "Sends weekly executive summaries you can read in 2 minutes",
      "Cites the source of every number so you can verify",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your real questions",
        description:
          "You tell us the 10 questions you ask your team most often. We focus there first.",
      },
      {
        step: "Week 2",
        title: "We connect your data sources",
        description:
          "CRM, finance, support, product analytics, spreadsheets — wherever your business truth lives.",
      },
      {
        step: "Week 3",
        title: "We build your first dashboards",
        description:
          "You see real numbers, refreshed automatically, with the source visible behind every chart.",
      },
      {
        step: "Week 4+",
        title: "Add ad-hoc questions and alerts",
        description:
          "Start asking the AI ad-hoc questions. Get alerts when something unusual happens.",
      },
    ],
    outcomes: [
      "Hours saved every week by not pulling reports",
      "Answers in seconds, not half-day requests to your team",
      "Anomalies caught early, not in next month's review",
      "Your team freed to do analysis, not data plumbing",
    ],
    control: [
      "Every number cites its source so you can verify",
      "You set which data sources the AI can access",
      "Access controls respected — finance data only for finance team",
      "You can revoke AI access to any data source at any time",
    ],
    faq: [
      {
        question: "Which data sources do you integrate with?",
        answer:
          "Most modern CRMs, ERPs, helpdesks, and analytics tools. Spreadsheets and SQL databases too. Custom sources are available.",
      },
      {
        question: "Can I ask the AI ad-hoc questions?",
        answer:
          "Yes. Type or speak a question in plain English. The AI pulls the data, builds the chart, and cites the source.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. The AI only sees the data you give it access to. Data stays in your chosen infrastructure. Every query is logged.",
      },
    ],
    related: ["marketing-operations", "reporting-analytics", "sales-automation"],
    flagship: false,
    keywords: [
      "ai executive dashboards",
      "ai business intelligence",
      "ai reporting",
      "ai data analysis",
    ],
  },
  {
    slug: "hr-operations",
    title: "AI HR Operations",
    category: "Internal Operations",
    oneLiner: "Automate onboarding, FAQs, and employee support.",
    eyebrow: "Internal Operations",
    headline: "An HR assistant that answers every employee question instantly.",
    subhead:
      "Your HR team spends half their week answering the same questions: leave balance, holidays, policy clarifications, onboarding steps. Laxvish takes over the routine. Your HR team focuses on the conversations that need a human.",
    whatItDoes: [
      "Answers common HR questions (leave, holidays, policies, benefits)",
      "Guides new hires through onboarding step by step",
      "Collects documents and information from new joiners",
      "Routes complex or sensitive questions to your HR team",
      "Works inside Slack, Teams, or your employee portal",
      "Speaks English, Hindi, and other Indian languages",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your HR questions",
        description:
          "You share your top 50 employee questions and your HR policies. The AI learns them.",
      },
      {
        step: "Week 2",
        title: "We set up the AI HR assistant",
        description:
          "The AI plugs into Slack, Teams, or your employee portal. Onboarding workflows are configured.",
      },
      {
        step: "Week 3",
        title: "Pilot runs in one team or location",
        description:
          "Start with one team or one office so we can measure impact and refine the answers.",
      },
      {
        step: "Week 4+",
        title: "Roll out across the company",
        description:
          "Once proven, the AI assists every employee, every day, in their preferred language.",
      },
    ],
    outcomes: [
      "Faster answers for every employee question",
      "HR team freed from routine questions to focus on real work",
      "Consistent answers across teams and locations",
      "Faster, smoother onboarding for every new hire",
    ],
    control: [
      "Sensitive questions (pay, performance, grievance) always go to a human",
      "Every conversation is logged and reviewable by your HR team",
      "You can update the AI's knowledge base as policies change",
      "Employee data access respects your existing access controls",
    ],
    faq: [
      {
        question: "Does the AI handle sensitive HR topics?",
        answer:
          "No. Sensitive topics (pay, performance, grievance, terminations) are always routed to a human HR representative.",
      },
      {
        question: "Which chat tools does it work in?",
        answer:
          "Slack, Microsoft Teams, Google Chat, and any custom employee portal with an API.",
      },
      {
        question: "Can we update the AI's answers as policies change?",
        answer:
          "Yes, in real time. Update your source documents and the AI learns the new answers immediately.",
      },
    ],
    related: ["internal-knowledge", "it-helpdesk", "customer-support"],
    flagship: false,
    keywords: [
      "ai hr assistant",
      "ai employee support",
      "ai onboarding automation",
      "ai hr operations",
    ],
  },
  {
    slug: "finance-ap",
    title: "AI Finance & AP Automation",
    category: "Finance & Compliance",
    oneLiner:
      "Process invoices, match POs, and flag anomalies automatically.",
    eyebrow: "Finance & Compliance",
    headline: "Finance operations that close themselves.",
    subhead:
      "Invoice processing, PO matching, vendor reconciliation, expense checks — your finance team does the same things every day. Laxvish does the routine work. Your team focuses on exceptions, vendor relationships, and the close.",
    whatItDoes: [
      "Reads invoices (PDF, image, email attachment) and extracts the data",
      "Matches invoices to POs and goods received notes",
      "Flags mismatches, duplicates, and suspicious patterns",
      "Routes clean invoices for approval automatically",
      "Reconciles vendor statements and bank transactions",
      "Posts approved invoices to your accounting system",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We pick the highest-volume workflow",
        description:
          "Invoices, expense reports, vendor reconciliation, or all three. We focus where the volume is.",
      },
      {
        step: "Week 2",
        title: "We connect your finance tools",
        description:
          "Your accounting system (Tally, Zoho Books, QuickBooks, SAP, etc), email, and document storage.",
      },
      {
        step: "Week 3",
        title: "Pilot runs in parallel with your team",
        description:
          "The AI processes real invoices alongside your team. You compare results and refine the rules.",
      },
      {
        step: "Week 4+",
        title: "Scale to more workflows",
        description:
          "Once proven, the AI takes on more finance workflows. Your team handles only the exceptions.",
      },
    ],
    outcomes: [
      "Invoices processed in minutes, not days",
      "Fewer mismatches and duplicate payments caught early",
      "Faster month-end close",
      "Your finance team focused on real analysis, not data entry",
    ],
    control: [
      "Every transaction is logged with the source document",
      "You set the rules for what the AI can approve vs. what needs human review",
      "Anomalies are flagged and routed to your team for investigation",
      "Full audit trail for every decision the AI makes",
    ],
    faq: [
      {
        question: "Which accounting systems do you integrate with?",
        answer:
          "Tally, Zoho Books, QuickBooks, Xero, SAP, Oracle, and any system with an API. Custom integrations available.",
      },
      {
        question: "What about GST compliance?",
        answer:
          "The AI checks GSTIN validity, HSN/SAC codes, and tax calculations. Anomalies are flagged for review.",
      },
      {
        question: "Can the AI actually post to my accounting system?",
        answer:
          "Yes, with your approval. You set the threshold — anything below it posts automatically, anything above needs human review.",
      },
    ],
    related: ["document-processing", "contract-automation", "procurement"],
    flagship: false,
    keywords: [
      "ai invoice processing",
      "ai accounts payable",
      "ai finance automation",
      "ai ap automation",
    ],
  },
  {
    slug: "contract-automation",
    title: "AI Contract Automation",
    category: "Finance & Compliance",
    oneLiner: "Review contracts, extract clauses, and flag risks.",
    eyebrow: "Finance & Compliance",
    headline: "Contract review that takes minutes, not days.",
    subhead:
      "Your legal and procurement teams read hundreds of contracts a year — vendor agreements, NDAs, MSAs, employment contracts. Laxvish reads them in seconds, extracts the key clauses, flags the risks, and routes the rest to a human for review.",
    whatItDoes: [
      "Reads vendor agreements, NDAs, MSAs, employment contracts, and more",
      "Extracts key clauses (payment terms, termination, liability, indemnity)",
      "Compares against your standard playbook and flags deviations",
      "Highlights risks and unusual language",
      "Generates a one-page summary your team can review in 2 minutes",
      "Sends only flagged contracts to your legal team",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We learn your contract playbook",
        description:
          "You share your standard clauses, your risk thresholds, and your approval rules.",
      },
      {
        step: "Week 2",
        title: "We build the AI contract reader",
        description:
          "The AI is trained on your contract types and your playbook.",
      },
      {
        step: "Week 3",
        title: "Pilot runs on real contracts",
        description:
          "The AI reviews real contracts in parallel with your legal team. You compare and refine.",
      },
      {
        step: "Week 4+",
        title: "Scale to all contract types",
        description:
          "Once proven, the AI reviews every contract your team receives.",
      },
    ],
    outcomes: [
      "Contract review cycles cut from days to hours",
      "More consistent risk flagging across the team",
      "Your legal team focused on the contracts that need their judgment",
      "Full audit trail of what the AI flagged and why",
    ],
    control: [
      "Every contract is stored and reviewable by your legal team",
      "You set the risk thresholds — anything above them is flagged",
      "Standard contract types can be auto-approved if they match your playbook",
      "Sensitive contracts (M&A, IP) can be excluded from AI processing",
    ],
    faq: [
      {
        question: "Does the AI replace my legal team?",
        answer:
          "No. The AI does the first pass and flags what needs review. Your legal team focuses on the high-judgment work.",
      },
      {
        question: "What contract types do you support?",
        answer:
          "NDAs, vendor agreements, MSAs, SOWs, employment contracts, leases, and more. Custom types are supported.",
      },
      {
        question: "Is my contract data safe?",
        answer:
          "Yes. Contracts are stored in your chosen infrastructure, never used to train external models, and accessible only to your authorized team.",
      },
    ],
    related: ["document-processing", "procurement", "finance-ap"],
    flagship: false,
    keywords: [
      "ai contract review",
      "ai contract analysis",
      "ai legal automation",
      "ai clause extraction",
    ],
  },
  {
    slug: "procurement",
    title: "AI Procurement Automation",
    category: "Finance & Compliance",
    oneLiner: "Compare vendors, generate POs, and track orders.",
    eyebrow: "Finance & Compliance",
    headline: "Procurement that moves at the speed of your business.",
    subhead:
      "Vendor research, quote comparison, PO generation, order tracking — procurement is full of repetitive work that slows your team down. Laxvish handles the routine, so your team can focus on vendor relationships and strategic sourcing.",
    whatItDoes: [
      "Researches vendors based on your criteria",
      "Compares quotes side by side, including total cost of ownership",
      "Generates draft POs based on approved quotes",
      "Tracks order status and sends proactive updates",
      "Flags delivery delays and quality issues",
      "Updates your procurement system automatically",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your procurement workflow",
        description:
          "You walk us through a typical procurement cycle, from need to delivery to payment.",
      },
      {
        step: "Week 2",
        title: "We connect your tools",
        description:
          "Your procurement system, ERP, vendor portal, and document storage.",
      },
      {
        step: "Week 3",
        title: "Pilot runs on a category",
        description:
          "Pick a procurement category (office supplies, IT, marketing services). The AI runs that cycle.",
      },
      {
        step: "Week 4+",
        title: "Scale to more categories",
        description:
          "Once proven, the AI handles more of your procurement volume.",
      },
    ],
    outcomes: [
      "Faster procurement cycles (typical: 50% reduction)",
      "Better vendor comparisons (the AI sees more options than a human can)",
      "Fewer manual errors in POs and orders",
      "Your procurement team focused on strategic sourcing, not admin",
    ],
    control: [
      "Every quote comparison and PO generation is logged",
      "You set the approval thresholds — anything above them needs human sign-off",
      "Preferred vendors are highlighted automatically",
      "Full audit trail of every decision the AI makes",
    ],
    faq: [
      {
        question: "Which procurement systems do you integrate with?",
        answer:
          "SAP Ariba, Coupa, Zoho Inventory, and most modern procurement tools. Custom integrations are available.",
      },
      {
        question: "Does the AI actually pick the vendor?",
        answer:
          "The AI compares and recommends. Your team makes the final call. The AI handles the admin, you handle the judgment.",
      },
    ],
    related: ["contract-automation", "finance-ap", "document-processing"],
    flagship: false,
    keywords: [
      "ai procurement",
      "ai vendor management",
      "ai purchase order automation",
      "procurement automation india",
    ],
  },
  {
    slug: "it-helpdesk",
    title: "AI IT Helpdesk Automation",
    category: "Internal Operations",
    oneLiner: "Reset passwords, provision access, and fix common IT issues.",
    eyebrow: "Internal Operations",
    headline: "IT support that resolves the easy issues instantly.",
    subhead:
      "Your IT team spends most of their week on the same handful of issues: password resets, access requests, software installs, printer problems. Laxvish resolves these automatically. Your IT team focuses on the real problems.",
    whatItDoes: [
      "Resets passwords and unlocks accounts",
      "Provisions and de-provisions access to standard tools",
      "Walks users through common troubleshooting steps",
      "Opens tickets for issues it can't resolve",
      "Routes urgent or sensitive issues to a human immediately",
      "Works inside Slack, Teams, or your IT helpdesk portal",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your top IT issues",
        description:
          "You share your top 30 IT tickets and the resolutions. We build the knowledge base.",
      },
      {
        step: "Week 2",
        title: "We connect your IT tools",
        description:
          "Active Directory, Okta, your helpdesk (ServiceNow, Jira, Freshservice), and your chat tool.",
      },
      {
        step: "Week 3",
        title: "Pilot runs in one team or location",
        description:
          "Start with one team. The AI handles their IT requests. Your IT team supervises.",
      },
      {
        step: "Week 4+",
        title: "Roll out across the company",
        description:
          "Once proven, the AI handles IT requests company-wide, 24/7.",
      },
    ],
    outcomes: [
      "IT requests resolved in minutes, not hours",
      "IT team freed from routine issues to focus on real projects",
      "Consistent answers and resolutions across the company",
      "24/7 IT support without hiring night-shift staff",
    ],
    control: [
      "Sensitive access changes always need human approval",
      "Every action the AI takes is logged and reviewable",
      "You set which issues the AI can resolve automatically vs. escalate",
      "You can revoke the AI's access to any system at any time",
    ],
    faq: [
      {
        question: "Which IT systems do you integrate with?",
        answer:
          "Active Directory, Okta, Azure AD, Google Workspace, ServiceNow, Jira, Freshservice, and most modern helpdesks.",
      },
      {
        question: "What about sensitive access changes?",
        answer:
          "Sensitive changes (admin access, production systems) always require human approval. The AI handles the routine, escalates the rest.",
      },
      {
        question: "Can the AI actually take action in our systems?",
        answer:
          "Yes, with your approval. You set which actions are safe to automate (password resets, basic access) vs. which need human review.",
      },
    ],
    related: ["internal-knowledge", "hr-operations", "customer-support"],
    flagship: false,
    keywords: [
      "ai it helpdesk",
      "ai it support",
      "ai password reset",
      "ai service desk",
    ],
  },
  {
    slug: "reporting-analytics",
    title: "AI Reporting & Analytics Automation",
    category: "Finance & Compliance",
    oneLiner:
      "Build reports automatically and answer ad-hoc questions in plain English.",
    eyebrow: "Finance & Compliance",
    headline: "Reports that build themselves. Questions that answer themselves.",
    subhead:
      "Your team spends hours every week pulling data, building spreadsheets, and writing the same reports. Laxvish connects to your data sources, builds the reports automatically, and answers ad-hoc questions in plain English.",
    whatItDoes: [
      "Connects to your databases, spreadsheets, and SaaS tools",
      "Builds recurring reports automatically (daily, weekly, monthly)",
      "Answers ad-hoc questions in plain English (\"what was revenue by region last quarter?\")",
      "Flags anomalies and trends you should know about",
      "Cites the source of every number so you can verify",
      "Sends reports to email, Slack, or your dashboard",
    ],
    engagement: [
      {
        step: "Week 1",
        title: "We map your recurring reports",
        description:
          "You tell us the reports you build most often. We focus there first.",
      },
      {
        step: "Week 2",
        title: "We connect your data sources",
        description:
          "Your databases, spreadsheets, CRM, ERP, analytics tools — wherever your data lives.",
      },
      {
        step: "Week 3",
        title: "We automate your first reports",
        description:
          "The AI builds and delivers the reports you specified. You review and refine.",
      },
      {
        step: "Week 4+",
        title: "Add ad-hoc questions and alerts",
        description:
          "Start asking the AI ad-hoc questions. Get alerts when something unusual happens.",
      },
    ],
    outcomes: [
      "Hours saved every week by not building reports",
      "Answers to ad-hoc questions in seconds, not hours",
      "Fewer errors from manual data manipulation",
      "Your team focused on analysis, not data plumbing",
    ],
    control: [
      "Every number cites its source so you can verify",
      "You set which data sources the AI can access",
      "Access controls respected (finance data only for finance team)",
      "You can revoke AI access to any data source at any time",
    ],
    faq: [
      {
        question: "Which data sources do you integrate with?",
        answer:
          "PostgreSQL, MySQL, BigQuery, Snowflake, Google Sheets, Excel, most modern CRMs and ERPs. Custom sources are available.",
      },
      {
        question: "Can the AI build charts and dashboards?",
        answer:
          "Yes. The AI builds the chart or dashboard that best answers your question, and refreshes it automatically.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Yes. The AI only sees the data you give it access to. Data stays in your chosen infrastructure. Every query is logged.",
      },
    ],
    related: ["executive-intelligence", "finance-ap", "marketing-operations"],
    flagship: false,
    keywords: [
      "ai reporting",
      "ai analytics",
      "ai business intelligence",
      "ai data automation",
    ],
  },
];

/** Get a use case by slug. Returns undefined if not found. */
export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

/** Get the 4 flagship use cases for the home page grid. */
export function getFlagshipUseCases(): UseCase[] {
  return USE_CASES.filter((uc) => uc.flagship);
}

/** Get the remaining (non-flagship) use cases for the home page list. */
export function getOtherUseCases(): UseCase[] {
  return USE_CASES.filter((uc) => !uc.flagship);
}

/** Get use cases grouped by category, used on the /solutions index. */
export function getUseCasesByCategory(): Record<UseCaseCategory, UseCase[]> {
  const groups: Record<UseCaseCategory, UseCase[]> = {
    "Sales & Growth": [],
    "Customer Operations": [],
    "Internal Operations": [],
    "Finance & Compliance": [],
  };
  for (const uc of USE_CASES) {
    groups[uc.category].push(uc);
  }
  return groups;
}
