export type Topic = {
  slug: string;
  name: string;
  description: string;
  signal: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Daily Signal" | "Tutorial" | "Deep Dive";
  topic: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  tags: string[];
  body: Array<{ heading?: string; paragraphs: string[]; code?: string }>;
};

export const topics: Topic[] = [
  { slug: "coding-agents", name: "Coding Agents", description: "Autonomous software engineering, agentic IDEs, code review and repository-scale workflows.", signal: "+18%" },
  { slug: "mcp", name: "MCP & Protocols", description: "Model Context Protocol, agent-to-agent standards, tools, registries and interoperable agent infrastructure.", signal: "+31%" },
  { slug: "context-engineering", name: "Context Engineering", description: "Memory, retrieval, instructions, context compression and long-running agent reliability.", signal: "+24%" },
  { slug: "rag", name: "RAG & Research", description: "Agentic retrieval, GraphRAG, multimodal RAG and autonomous research systems.", signal: "+12%" },
  { slug: "browser-agents", name: "Browser & Computer Use", description: "Agents that navigate the web, operate software and complete multi-step browser workflows.", signal: "+21%" },
  { slug: "voice-agents", name: "Voice Agents", description: "Realtime speech systems, phone agents and production voice automation.", signal: "+9%" },
  { slug: "open-models", name: "Open Models", description: "Open-weight models, local inference, smaller reasoning models and frontier alternatives.", signal: "+14%" },
  { slug: "agent-infrastructure", name: "Agent Infrastructure", description: "Sandboxes, observability, evaluations, security and production agent runtimes.", signal: "+27%" }
];

export const articles: Article[] = [
  {
    slug: "context-budgeting-for-long-running-agents",
    title: "Context budgeting is becoming an agent reliability primitive",
    dek: "The best long-running agents do not simply receive more tokens. They decide what deserves to survive.",
    category: "Deep Dive", topic: "context-engineering", publishedAt: "2026-09-11", readTime: 7, featured: true,
    tags: ["memory", "context", "agents"],
    body: [
      { paragraphs: ["A long context window delays failure; it does not remove it. As an agent accumulates tool output, duplicated instructions and stale hypotheses, important details compete with noise.", "A production-grade system needs an explicit context budget: a policy for what stays verbatim, what gets summarized, what becomes structured state and what is discarded."] },
      { heading: "A practical four-layer memory model", paragraphs: ["Separate working memory from durable project state. Working memory should be small and disposable. Durable state should be structured, reviewable and addressable by stable identifiers."], code: "working_context -> compressed_summary -> structured_state -> durable_evidence" },
      { heading: "Why this matters", paragraphs: ["This turns context engineering from prompt craft into systems engineering. The winning implementation is measurable: fewer repeated tool calls, fewer contradictions and lower token cost per completed task."] }
    ]
  },
  {
    slug: "mcp-server-production-checklist",
    title: "The production checklist every MCP server should pass",
    dek: "A compact field guide for authentication, tool contracts, observability and failure recovery.",
    category: "Tutorial", topic: "mcp", publishedAt: "2026-09-10", readTime: 9,
    tags: ["mcp", "security", "tools"],
    body: [
      { paragraphs: ["A demo MCP server proves that a model can call a function. A production MCP server must prove that the right caller can invoke the right action, that failures are bounded and that every side effect can be audited."] },
      { heading: "Define the contract before the tool", paragraphs: ["Use narrow schemas, explicit descriptions and deterministic error shapes. Treat every mutation as a privileged action and make idempotency a first-class concern."], code: "tool = { input_schema, auth_scope, idempotency_key, audit_event }" },
      { heading: "Ship with evidence", paragraphs: ["Add structured logs for request id, principal, tool name, latency, outcome and side-effect identifiers. Without evidence, a tool call is impossible to debug once it leaves the happy path."] }
    ]
  },
  {
    slug: "repository-scale-code-agents",
    title: "Repository-scale coding agents need maps, not bigger prompts",
    dek: "Why structural code search and execution evidence outperform dumping an entire repository into context.",
    category: "Daily Signal", topic: "coding-agents", publishedAt: "2026-09-09", readTime: 5,
    tags: ["coding", "search", "agents"],
    body: [
      { paragraphs: ["The repository is not a document. It is a graph of symbols, imports, tests, ownership boundaries and runtime behavior. Treating it as a flat text corpus wastes context and hides the relationships an agent needs most."] },
      { heading: "The better retrieval stack", paragraphs: ["Start with deterministic symbol and path search, then add semantic retrieval for ambiguous intent. Finally, validate the proposed change against tests and runtime evidence."], code: "intent -> symbol search -> dependency graph -> targeted context -> execute -> verify" }
    ]
  },
  {
    slug: "agentic-rag-with-evidence-ledgers",
    title: "Build agentic RAG with an evidence ledger",
    dek: "Make every generated claim traceable to the retrieval step that earned it.",
    category: "Tutorial", topic: "rag", publishedAt: "2026-09-08", readTime: 11,
    tags: ["rag", "citations", "research"],
    body: [
      { paragraphs: ["Agentic RAG becomes dangerous when planning, retrieval and writing happen in one opaque loop. Separate evidence collection from synthesis and persist the boundary between them."] },
      { heading: "The ledger", paragraphs: ["For each claim, retain the source identifier, excerpt hash, retrieval query, timestamp and confidence. The writer can cite only evidence admitted to the ledger."], code: "claim_id -> source_id -> excerpt_hash -> retrieval_query -> confidence" },
      { heading: "Verification", paragraphs: ["Before rendering an answer, run a support check that marks unsupported claims and either removes them or asks the retrieval agent for more evidence."] }
    ]
  },
  {
    slug: "browser-agents-need-state-machines",
    title: "Browser agents need state machines more than clever prompts",
    dek: "Reliable web automation comes from explicit states, assertions and recovery paths.",
    category: "Deep Dive", topic: "browser-agents", publishedAt: "2026-09-06", readTime: 8,
    tags: ["browser", "automation", "reliability"],
    body: [
      { paragraphs: ["A browser agent that simply looks, thinks and clicks is impressive until the page changes, a modal appears or the network stalls. Reliability comes from modeling the workflow, not from hoping the model improvises correctly."] },
      { heading: "A robust loop", paragraphs: ["Each step should declare its precondition, action, postcondition and recovery policy. Screenshots and DOM evidence should be retained for failed assertions."], code: "observe -> assert_precondition -> act -> assert_postcondition -> recover_or_continue" }
    ]
  },
  {
    slug: "voice-agent-latency-budget",
    title: "The 800ms voice-agent budget",
    dek: "A useful latency model for making realtime voice systems feel conversational instead of procedural.",
    category: "Daily Signal", topic: "voice-agents", publishedAt: "2026-09-04", readTime: 4,
    tags: ["voice", "latency", "realtime"],
    body: [
      { paragraphs: ["Users notice latency long before they notice model sophistication. A voice stack should measure end-of-speech detection, transcription, reasoning, tool latency and first audio token independently."] },
      { heading: "Budget the chain", paragraphs: ["The fastest model cannot compensate for slow endpointing or serial tools. Parallelize predictable lookups and stream speech as soon as the response becomes stable enough to say aloud."] }
    ]
  },
  {
    slug: "local-model-routing",
    title: "Route routine agent work to local models before the frontier model",
    dek: "A routing pattern for lowering cost without making the system feel less capable.",
    category: "Tutorial", topic: "open-models", publishedAt: "2026-09-02", readTime: 10,
    tags: ["local", "routing", "models"],
    body: [
      { paragraphs: ["Not every step of an agent run deserves the most expensive model. Classification, extraction, formatting and deterministic tool selection can often move to smaller local models."] },
      { heading: "Escalation beats replacement", paragraphs: ["Use a confidence-aware router. Local models handle bounded work; ambiguous or high-impact decisions escalate to a stronger model with the relevant intermediate state attached."], code: "task -> local_model -> confidence_gate -> frontier_model_if_needed" }
    ]
  },
  {
    slug: "agent-sandbox-threat-model",
    title: "Threat-model the sandbox before you give an agent a shell",
    dek: "Filesystem boundaries, egress control and credential isolation are product features, not infrastructure trivia.",
    category: "Deep Dive", topic: "agent-infrastructure", publishedAt: "2026-08-30", readTime: 8,
    tags: ["security", "sandbox", "agents"],
    body: [
      { paragraphs: ["A shell tool collapses the distance between an agent suggestion and a system side effect. The runtime therefore needs explicit boundaries around filesystem access, networking, secrets and process lifetime."] },
      { heading: "Minimum isolation", paragraphs: ["Run each task with a disposable workspace, short-lived credentials and deny-by-default egress. Capture the command, exit code, changed files and network destinations as audit evidence."] }
    ]
  },
  {
    slug: "agent-protocols-after-mcp",
    title: "What comes after MCP: capability discovery, identity and transactions",
    dek: "Tool interoperability solved only the first layer of the agent-to-agent stack.",
    category: "Daily Signal", topic: "mcp", publishedAt: "2026-08-28", readTime: 6,
    tags: ["protocols", "mcp", "a2a"],
    body: [
      { paragraphs: ["The next protocol layer is not another tool schema. Agents need to discover one another, authenticate principals, negotiate capabilities and attach verifiable receipts to delegated work."] },
      { heading: "Think in trust boundaries", paragraphs: ["A remote agent should be treated like a third-party service: scoped identity, explicit contracts, bounded authority and evidence returned with every consequential action."] }
    ]
  },
  {
    slug: "evaluation-before-observability",
    title: "Agent observability without evaluations is just expensive logging",
    dek: "Traces tell you what happened. Evaluations tell you whether it was acceptable.",
    category: "Deep Dive", topic: "agent-infrastructure", publishedAt: "2026-08-25", readTime: 7,
    tags: ["evals", "observability", "quality"],
    body: [
      { paragraphs: ["A trace is evidence, not a verdict. Teams often collect thousands of spans without defining which outcomes are correct, safe or cost-effective."] },
      { heading: "Link traces to judgments", paragraphs: ["Attach task-level evaluators to completed runs, then use traces to explain failures. The evaluation becomes the index into observability rather than another disconnected dashboard."] }
    ]
  }
];

export const tools = [
  { name: "Context Ledger", type: "Memory", description: "Open pattern for keeping durable agent state separate from prompt context.", url: "/articles/context-budgeting-for-long-running-agents", score: 92 },
  { name: "Repo Mapper", type: "Coding", description: "Structural indexing pattern for symbols, imports, tests and ownership boundaries.", url: "/articles/repository-scale-code-agents", score: 89 },
  { name: "Evidence RAG", type: "Research", description: "Claim-to-source ledger architecture for verifiable research agents.", url: "/articles/agentic-rag-with-evidence-ledgers", score: 95 },
  { name: "Browser State Kit", type: "Browser", description: "State-machine template for browser agents with assertions and recovery.", url: "/articles/browser-agents-need-state-machines", score: 87 },
  { name: "ToolGate", type: "MCP", description: "Production MCP checklist for scoped actions, idempotency and audit events.", url: "/articles/mcp-server-production-checklist", score: 91 },
  { name: "Agent Eval Matrix", type: "Evals", description: "Outcome-first evaluation matrix for autonomous workflows.", url: "/articles/evaluation-before-observability", score: 90 }
];

export function getTopic(slug: string) { return topics.find((topic) => topic.slug === slug); }
export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
export function getArticlesByTopic(slug: string) { return articles.filter((article) => article.topic === slug); }
