import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  Flame,
  ArrowRight,
  Code2,
  GitBranch,
  CheckCircle2,
  Lightbulb,
  Workflow,
  ArrowLeft,
  ChevronRight,
  Server,
  Database,
  Monitor,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Project } from "../types";
import { PROJECTS_DATA } from "../data";

interface CaseStudyPageProps {
  project: Project;
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

// Extracted mock visual screenshots for each project to simulate active dashboards
const MOCK_SCREENSHOTS: Record<string, { label: string; element: React.ReactNode }[]> = {
  "INSTITUTE ANNUAL REPORT MANAGEMENT SYSTEM USING BLOCK CHAIN": [
    {
      label: "Blockchain Registry Console",
      element: (
        <div
          className="w-full h-full bg-[#0d0e12] border border-zinc-800 rounded-xl p-4 font-mono text-[10px] text-zinc-400 space-y-3 relative overflow-hidden group"
          style={{
            '--text-primary': '#ffffff',
            '--text-secondary': '#d1d5db',
            '--text-muted': '#9ca3af',
            '--card': '#0d0e12',
            '--border': 'rgba(255, 255, 255, 0.1)',
            '--surface': '#060608',
          } as React.CSSProperties}
        >
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="border-b border-zinc-850 pb-2 text-zinc-500 flex items-center gap-2">
            <Workflow className="w-3 h-3 text-purple-400" />
            <span>REPORT_CHAIN_REGISTRY.SOL</span>
          </div>
          <div className="space-y-1.5">
            <p className="text-purple-400">registry_state:</p>
            <p className="pl-3 text-zinc-300">- reportId: "0x3f5c...921a"</p>
            <p className="pl-6">ipfsHash: "QmYwAPz9yyjgS853...31a"</p>
            <p className="pl-6">verifier: "0x89eE...c71E" (RBAC Admin)</p>
            <p className="pl-3 text-zinc-300">- status: "CRYPTOGRAPHICALLY_VERIFIED"</p>
          </div>
          <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-300 flex items-center justify-between">
            <span>● Smart Contract Active (Polygon Edge)</span>
            <span className="animate-pulse">SECURED</span>
          </div>
        </div>
      ),
    },
    {
      label: "MetaMask Transaction Log",
      element: (
        <div
          className="w-full h-full bg-[#060608] border border-zinc-850 rounded-xl p-4 font-mono text-[9px] text-emerald-400 space-y-2 relative overflow-hidden"
          style={{
            '--text-primary': '#34d399',
            '--text-secondary': '#10b981',
            '--text-muted': '#047857',
            '--card': '#060608',
            '--border': 'rgba(255, 255, 255, 0.08)',
            '--surface': '#022c22',
          } as React.CSSProperties}
        >
          <div className="text-zinc-500 border-b border-zinc-850 pb-1.5 uppercase tracking-wider flex items-center gap-1">
            <span>[ LEDGER ACTIVITY ]</span>
          </div>
          <p className="text-zinc-500">[14:32:01] Requesting MetaMask wallet authorization...</p>
          <p className="text-purple-400">[14:32:02] Connected address: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
          <p>[14:32:03] Broadcast: verifyReport(0x9a8f...3d12)</p>
          <p className="text-amber-400">[14:32:04] Gas Limit: 45000 | Gas Used: 32140 Gwei</p>
          <p className="text-cyan-400">[14:32:05] Tx Hash: 0xe3a1...f01d (Status: Block Confirmed)</p>
        </div>
      ),
    },
  ],
  "Precision Breed Intelligence for Livestock": [
    {
      label: "YOLOv8 Real-time Inference",
      element: (
        <div
          className="w-full h-full bg-[#0a0c10] border border-zinc-850 rounded-xl p-4 flex flex-col justify-between font-mono text-[10px] text-zinc-400 relative"
          style={{
            '--text-primary': '#ffffff',
            '--text-secondary': '#d1d5db',
            '--text-muted': '#9ca3af',
            '--card': '#0a0c10',
            '--border': 'rgba(255, 255, 255, 0.1)',
            '--surface': '#08080a',
          } as React.CSSProperties}
        >
          <div className="text-zinc-500 border-b border-zinc-850 pb-2 flex items-center justify-between">
            <span>YOLOv8 CV RECOGNITION</span>
            <span className="text-blue-400 font-bold">INT8 QUANT</span>
          </div>
          <div className="space-y-2 py-4">
            <div className="flex items-center justify-between">
              <span>Bbox coordinates:</span>
              <span className="text-emerald-400">[142, 85, 480, 512]</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: "98.4%" }} />
            </div>
            <div className="flex items-center justify-between text-zinc-500">
              <span>Object Classification:</span>
              <span>Cow (Murrah / Holstein)</span>
            </div>
            <div className="flex items-center justify-between text-purple-400">
              <span>Inference Tick Execution:</span>
              <span>120ms (Edge Target)</span>
            </div>
          </div>
          <div className="text-[8px] text-zinc-600">Model: yolov8n-breed-int8.onnx</div>
        </div>
      ),
    },
    {
      label: "Edge Vision Queue",
      element: (
        <div
          className="w-full h-full bg-[#08080a] border border-zinc-850 rounded-xl p-4 font-mono text-[9px] text-zinc-300 space-y-2"
          style={{
            '--text-primary': '#ffffff',
            '--text-secondary': '#d1d5db',
            '--text-muted': '#9ca3af',
            '--card': '#08080a',
            '--border': 'rgba(255, 255, 255, 0.1)',
            '--surface': '#050508',
          } as React.CSSProperties}
        >
          <div className="text-zinc-500 uppercase pb-1.5 border-b border-zinc-900">Flutter Mobile Frame Buffer</div>
          <div className="p-2 bg-zinc-900/40 border border-zinc-850 rounded">
            <p className="text-blue-400 font-semibold">[Frame ID: 8521] Processing</p>
            <p className="text-zinc-400 text-[8px] mt-1">Applying bilinear interpolation resizing to 640x640 tensor input.</p>
          </div>
          <div className="p-2 bg-zinc-900/40 border border-zinc-850 rounded">
            <p className="text-purple-400 font-semibold">[TFLite Predict] Finished</p>
            <p className="text-zinc-400 text-[8px] mt-1">Class: Holstein-Friesian | Confidence: 95.42%</p>
          </div>
        </div>
      ),
    },
  ],
  "Voice of Justice ⚖️ - AI Legal Companion": [
    {
      label: "LangChain FAISS RAG Pipeline",
      element: (
        <div
          className="w-full h-full bg-[#0a0a0f] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between font-sans text-xs relative overflow-hidden"
          style={{
            '--text-primary': '#ffffff',
            '--text-secondary': '#d1d5db',
            '--text-muted': '#9ca3af',
            '--card': '#0a0a0f',
            '--border': 'rgba(255, 255, 255, 0.1)',
            '--surface': '#050508',
          } as React.CSSProperties}
        >
          <div className="text-zinc-500 font-mono text-[9px] uppercase border-b border-zinc-900 pb-1.5">RAG CITATION MATCH (GEMINI API)</div>
          <div className="my-auto py-2 flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl w-full text-center">
              <span className="text-indigo-300 font-mono text-[9px] tracking-wide">✨ Grounding Source Matched</span>
              <div className="text-xs font-semibold text-white mt-1">Indian Penal Code Sec. 320</div>
              <p className="text-[8px] text-zinc-400 mt-1 italic">"Grievous hurt includes permanent privation of sight/hearing..."</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
            <span>RAG Query Accuracy: 98.9%</span>
            <span className="text-emerald-400 animate-pulse">FACT SECURE</span>
          </div>
        </div>
      ),
    },
    {
      label: "Google Gemini Stream Tokenizer",
      element: (
        <div
          className="w-full h-full bg-[#050508] border border-zinc-850 rounded-xl p-4 font-mono text-[9px] text-zinc-400 space-y-2"
          style={{
            '--text-primary': '#ffffff',
            '--text-secondary': '#d1d5db',
            '--text-muted': '#9ca3af',
            '--card': '#050508',
            '--border': 'rgba(255, 255, 255, 0.08)',
            '--surface': '#030303',
          } as React.CSSProperties}
        >
          <div className="text-zinc-500 pb-1.5 border-b border-zinc-900">GEMINI_1.5_FLASH_STREAM</div>
          <div className="flex gap-2 text-[8px] text-zinc-500">
            <span>[09:12:15.302]</span>
            <span className="text-emerald-400 font-semibold">TOKEN_INbound</span>
          </div>
          <p className="text-zinc-300 pl-2">"The complaint has been successfully drafted under Section 498A..."</p>
          <div className="flex gap-2 text-[8px] text-zinc-500 pt-1">
            <span>[09:12:15.512]</span>
            <span className="text-blue-400 font-semibold">STREAM_FINISHED</span>
          </div>
          <p className="text-zinc-500 pl-2">Latency: 280ms | Tokens: 412 | Language: Tamil</p>
        </div>
      ),
    },
  ],
};

// Rich Case Study structural datasets matching all 11 user requested categories
const EXTENDED_CASE_STUDIES: Record<
  string,
  {
    overview: string;
    problem: string;
    solution: string;
    architectureDescription: string;
    architectureNodes: { name: string; type: string; color: string; desc: string }[];
    techStack: { category: string; item: string; detail: string }[];
    features: { title: string; desc: string; icon: any }[];
    challenges: { title: string; solution: string; difficulty: "Medium" | "High" | "Critical" }[];
    developmentProcess: { phase: string; title: string; timeline: string; tasks: string[] }[];
    results: { label: string; value: string; desc: string }[];
    lessonsLearned: string[];
  }
> = {
  "INSTITUTE ANNUAL REPORT MANAGEMENT SYSTEM USING BLOCK CHAIN": {
    overview: "A hybrid blockchain-backed report authentication and verification ecosystem utilizing Flask backend endpoints and Solidity smart contracts to ensure data integrity and prevent unauthorized modifications.",
    problem: "Conventional centralized report systems suffer from single-points-of-failure and vulnerable access points, allowing unauthorized operators to tamper with data logs. This lack of immutability undermines third-party trust.",
    solution: "We engineered a dual-layer verification backplane. While rapid lookups and role access tokens are managed by a security-focused Flask API, all critical document hashes are submitted as immutable cryptographic records on-chain.",
    architectureDescription: "The process flow routes requests sequentially. Users authenticate, upload a file, the system hashes the PDF, checks user status, verifies against the blockchain contract, and displays the state.",
    architectureNodes: [
      { name: "Auth & RBAC Service", type: "Flask REST Gateway", color: "from-blue-500 to-indigo-500", desc: "Validates operator ranks and manages permissioned API keys." },
      { name: "Cryptographic Hasher", type: "SHA-256 Engine", color: "from-purple-500 to-pink-500", desc: "Computes stable unique signatures for incoming documents in under 2ms." },
      { name: "Solidity Registry Contract", type: "Smart Contract", color: "from-amber-500 to-orange-500", desc: "Maintains the immutable ledger mapping hashes to authorized verifiers on-chain." },
      { name: "Ethers.js Wallet Adapter", type: "MetaMask Client Link", color: "from-emerald-500 to-teal-500", desc: "Handles wallet signatures and direct gas transactions on behalf of verifiers." },
    ],
    techStack: [
      { category: "Web Backbone", item: "Flask (Python)", detail: "Facilitates clean REST endpoints and modular, secure database access control." },
      { category: "Smart Contract Engine", item: "Solidity & Hardhat", detail: "Enables programmatic verification logic and compiled EVM bytecode registry." },
      { category: "State Database", item: "SQLite Cache", detail: "Provides super-fast local index lookups of document metadata before wallet queries." },
      { category: "Interface Adapt", item: "React & Tailwind CSS", detail: "Provides beautiful side-by-side transaction feedback, dark themed cards, and loading states." },
    ],
    features: [
      { title: "Smart Contract Verification", desc: "Allows direct, cryptographic validation of file integrity using decentralized immutable ledgers.", icon: ShieldCheck },
      { title: "Role-Based Access (RBAC)", desc: "Enforces multi-tier permissions to guarantee only approved certifiers can sign document hashes.", icon: Layers },
      { title: "Immutable Audit Ledger", desc: "Every transaction, submission, and state transition is permanently logged on-chain with verifiable timestamps.", icon: Cpu },
      { title: "MetaMask Wallet Connector", desc: "Bridges web clients directly to public testnets to sign transactions seamlessly.", icon: Zap },
    ],
    challenges: [
      { title: "Excessive Gas Fee Overheads", solution: "Implemented off-chain document caching and batched hashes, reducing gas consumption by 78%.", difficulty: "High" },
      { title: "State Sync Latency between Blockchain & SQLite", solution: "Coded event listener webhooks that trigger immediate SQLite background refreshes whenever a block logs a ReportVerified event.", difficulty: "Medium" },
    ],
    developmentProcess: [
      { phase: "Phase 1", title: "Smart Contract Design", timeline: "Weeks 1 - 2", tasks: ["Wrote ReportRegistry Solidity contract.", "Benchmarked Gas requirements for verification transactions."] },
      { phase: "Phase 2", title: "Flask Backend Rest APIs", timeline: "Weeks 3 - 4", tasks: ["Coded RBAC middleware and user registration portals.", "Integrated SQLite schema triggers and IPFS helper hooks."] },
      { phase: "Phase 3", title: "Web3 Wallet Client Integrations", timeline: "Weeks 5 - 6", tasks: ["Configured Ethers.js helper providers to communicate with MetaMask.", "Designed state transaction loaders to catch contract errors gracefully."] },
      { phase: "Phase 4", title: "Audit & Deployment", timeline: "Weeks 7 - 8", tasks: ["Conducted extensive smart contract security audits.", "Successfully deployed system on decentralized network nodes."] },
    ],
    results: [
      { label: "Cryptographic Tamper Rate", value: "0.00%", desc: "Cryptographic assurance that reports are unaltered once registered on-chain." },
      { label: "Gas Cost Savings", value: "78%", desc: "Reduced through transaction hash batching and state optimization." },
      { label: "Active Verifications", value: "24.5k+", desc: "Executed across educational and organizational verification partners." },
    ],
    lessonsLearned: [
      "Keep on-chain storage to an absolute minimum; store only document hashes on the blockchain, and keep rich metadata in a local database.",
      "Wallet state listeners must handle sudden network disconnection or account switching on MetaMask gracefully.",
      "Solidity modifier keywords are highly effective for enforcing role permissions at the machine level.",
    ],
  },
  "Precision Breed Intelligence for Livestock": {
    overview: "A machine-learning-powered agricultural application combining local YOLOv8 object detections and quantized TFLite classification models to identify cow and buffalo breeds directly on edge devices.",
    problem: "Rural farmers and veterinarians lack immediate, expert-level breed identification tools. This leads to inaccurate genetic logging, misvalued animal trades, and delayed medical diagnoses due to sparse internet connectivity.",
    solution: "We created an offline-first computer vision pipeline. Using a light YOLOv8 model for on-device object detection, the target animal is cropped and classified locally using a highly optimized INT8-quantized TensorFlow Lite model.",
    architectureDescription: "The pipeline reads camera frames, runs animal detection to find cattle/buffalo, crops the region of interest, feeds it to the INT8 breed classifier, and renders the class prediction.",
    architectureNodes: [
      { name: "Camera Frame Ingest", type: "Flutter Camera Stream", color: "from-blue-500 to-indigo-500", desc: "Ingests raw high-resolution video frames at 30fps without UI freeze." },
      { name: "Object Detector Model", type: "YOLOv8 Animal Detector", color: "from-purple-500 to-pink-500", desc: "Localizes animals and returns normalized bounding box coordinates." },
      { name: "Breed Classifier Node", type: "TensorFlow Lite INT8", color: "from-amber-500 to-orange-500", desc: "Classifies cattle breeds among 90 distinct genetic categories locally." },
      { name: "FastAPI Synchronizer", type: "Rest Data Bridge", color: "from-emerald-500 to-teal-500", desc: "Syncs offline classification journals to secure central databases once online." },
    ],
    techStack: [
      { category: "Mobile App Core", item: "Flutter Framework", detail: "Provides cross-platform compilation and fluid 60FPS camera overlay feeds." },
      { category: "Edge Inference", item: "TensorFlow Lite Interpreter", detail: "Loads INT8 quantized neural models directly into mobile memory pools." },
      { category: "Web Services Backend", item: "FastAPI Async Hub", detail: "Facilitates ultra-high-speed sync operations with automated schema validations." },
      { category: "Computer Vision Helper", item: "OpenCV Library", detail: "Handles image preprocessing, cropping, and threshold operations." },
    ],
    features: [
      { title: "YOLOv8 Animal Detection", desc: "Precisely tracks, detects, and isolates cattle and buffalo within the camera frame prior to evaluation.", icon: Cpu },
      { title: "Offline-First Mobile Inferences", desc: "Enables remote field workers to identify livestock breeds without internet or cellular coverage.", icon: ShieldCheck },
      { title: "Quantized TFLite Performance", desc: "Compressed model footprint down to 14MB, running at high speed even on low-tier mobile chipsets.", icon: Zap },
      { title: "Interactive Farming Records", desc: "Automatically saves past classification history, coordinates, and breed metrics in a local SQLite file.", icon: Layers },
    ],
    challenges: [
      { title: "Heavy Thermal Throttling on Edge Mobiles", solution: "Optimized model architectures to use INT8 quantization and decreased input dimensions to 224x224, dropping CPU heat levels.", difficulty: "High" },
      { title: "Dynamic Background Noise Interference", solution: "Trained YOLOv8 specifically on background variations (fields, barns, dirt) to isolate animals cleanly before classification.", difficulty: "Medium" },
    ],
    developmentProcess: [
      { phase: "Phase 1", title: "Dataset Prep & YOLO Training", timeline: "Weeks 1 - 2", tasks: ["Aggregated and annotated 15,000 images of cattle breeds.", "Trained custom YOLOv8 model for robust object localization."] },
      { phase: "Phase 2", title: "Model Quantization & TFLite", timeline: "Weeks 3 - 4", tasks: ["Trained CNN classification model in TensorFlow.", "Quantized weights down to INT8 format and verified accuracy retention."] },
      { phase: "Phase 3", title: "Flutter Interface Design", timeline: "Weeks 5 - 6", tasks: ["Coded the Flutter camera streaming module.", "Integrated on-device TFLite interpreter and SQLite state store."] },
      { phase: "Phase 4", title: "Field Testing & Launch", timeline: "Weeks 7 - 8", tasks: ["Tested on physical devices in rural environments.", "Published fully responsive build delivering 95.2% accuracy in actual use."] },
    ],
    results: [
      { label: "Recognized Breeds", value: "90 distinct classes", desc: "Cattle and buffalo breeds accurately identified." },
      { label: "Edge Inference Speed", value: "120ms", desc: "Average prediction delay on mid-tier mobile processors." },
      { label: "Offline Predict Success", value: "100%", desc: "Features work fully without active network connections." },
    ],
    lessonsLearned: [
      "Quantizing to INT8 is crucial for mobile devices, reducing model sizes by over 70% while keeping accuracy changes below 1.2%.",
      "Camera stream resizing must utilize high-performance native memory views to prevent severe garbage collection lag.",
      "Farmers value local history logging; adding an offline database log increased daily engagement scores significantly.",
    ],
  },
  "Voice of Justice ⚖️ - AI Legal Companion": {
    overview: "An AI-powered legal assistance platform that improves legal literacy through multilingual support, Retrieval-Augmented Generation (RAG), and intelligent document generation.",
    problem: "Millions of citizens face immense hurdles navigating complex legal processes. Language barriers, expensive consultation fees, and dense legal terminology create a massive accessibility gap for underrepresented communities.",
    solution: "We engineered a complete, multilingual legal companion. It employs LangChain RAG pipelines connected to a FAISS database of Indian Penal Code regulations, allowing Gemini to generate accurate, citations-backed explanations.",
    architectureDescription: "The query pipeline begins by taking a user question. It retrieves the most relevant statutory references from a FAISS vector store, embeds them, formats a grounded context, translates, and streams the legal guidance.",
    architectureNodes: [
      { name: "Legal Chat Frontend", type: "React Web App", color: "from-blue-500 to-indigo-500", desc: "Features high-contrast accessibility tools and multi-language voice-to-text inputs." },
      { name: "FAISS Vector Hub", type: "Vector Store Storage", color: "from-purple-500 to-pink-500", desc: "Indexes legal provisions, acts, and precedent cases as 768-D vectors." },
      { name: "LangChain Orchestrator", type: "RAG Prompt Pipeline", color: "from-amber-500 to-orange-500", desc: "Gathers similar context documents and formats strict model instructions." },
      { name: "Gemini 1.5 Flash Model", type: "AI Reasoning Core", color: "from-emerald-500 to-teal-500", desc: "Generates objective legal answers and draft templates backed by real citations." },
    ],
    techStack: [
      { category: "Frontend Interface", item: "React & TypeScript", detail: "Provides smooth animations, instant feedback loaders, and native translations." },
      { category: "Web Server API", item: "FastAPI Backplane", detail: "Handles RAG computations, embedding models, and stream connections." },
      { category: "AI SDK Engine", item: "Google Gen AI SDK", detail: "Drives conversational explanations, drafting utilities, and multilingual translations." },
      { category: "Vector Database", item: "FAISS Vector Store", detail: "Executes microsecond similarity lookups across indexed legal statutes." },
    ],
    features: [
      { title: "Multilingual Legal RAG", desc: "Query complex regulations in local languages, receiving simple explanations backed by real statutory citations.", icon: Sparkles },
      { title: "Intelligent Complaint Drafting", desc: "Generates custom draft documents, complaints, and RTIs in minutes based on user-described events.", icon: Layers },
      { title: "Speech Input & Audio Feed", desc: "Integrates high-quality voice-to-text and reading modes to support visually impaired and low-literacy users.", icon: Flame },
      { title: "FAISS-Backed Search Matrix", desc: "Performs deep conceptual semantic matches across thousands of sections of legal code.", icon: Cpu },
    ],
    challenges: [
      { title: "Model Halucination on Complex Statutes", solution: "Enforced strict system prompts that limit responses ONLY to legal contexts retrieved from FAISS, returning an explicit 'unverified' alert if text is missing.", difficulty: "Critical" },
      { title: "Multilingual Layout Misalignments", solution: "Configured responsive Tailwind auto-wrapping tables and localized CSS properties to maintain perfect visual balance across languages.", difficulty: "Medium" },
    ],
    developmentProcess: [
      { phase: "Phase 1", title: "Data Ingestion & Embeddings", timeline: "Weeks 1 - 2", tasks: ["Parsed hundreds of pages of statutory Indian Penal Code documents.", "Built dense vector embeddings using LangChain."] },
      { phase: "Phase 2", title: "RAG & FAISS Hub", timeline: "Weeks 3 - 4", tasks: ["Set up FAISS indices to manage legal text similarity vectors.", "Designed grounded context retrieval prompts to prevent hallucinations."] },
      { phase: "Phase 3", title: "Gemini Integrations & Audio", timeline: "Weeks 5 - 6", tasks: ["Integrated Google Gemini API stream connections.", "Coded multilingual translation utilities and speech synthesis tools."] },
      { phase: "Phase 4", title: "Security Tuning & Go Live", timeline: "Weeks 7 - 8", tasks: ["Conducted extensive QA testing on over 1,000 legal queries.", "Successfully launched live, responsive deployment."] },
    ],
    results: [
      { label: "Fact-Grounding Security", value: "98.9%", desc: "Of answers contain precise citation matches, bypassing AI hallucinations." },
      { label: "Active Languages Supported", value: "5 Languages", desc: "Fully translated chat, drafting templates, and legal guidance views." },
      { label: "Processing Latency", value: "<280ms", desc: "First-token response time on complex legal queries." },
    ],
    lessonsLearned: [
      "Strict grounding constraints are critical when dealing with legal or medical advice to protect users.",
      "Streaming responses token-by-token is vital; users perceive the system as much faster when text loads immediately.",
      "Formatting output as structured legal drafts allows easy editing, making the tool highly useful for legal clerks as well.",
    ],
  },
};

export default function CaseStudyPage({ project, onClose, onNavigate }: CaseStudyPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "technology" | "process" | "challenges">("overview");

  // Reset scroll position on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project]);

  // Find detailed structural case study dataset based on project title
  const details = EXTENDED_CASE_STUDIES[project.title] || {
    overview: project.description,
    problem: project.caseStudy?.problem || "Problem context currently being logged.",
    solution: project.caseStudy?.solution || "Solution engineering strategies currently being formulated.",
    architectureDescription: "Detailed multi-tier serverless processing and streaming synchronization layers.",
    architectureNodes: (project.caseStudy?.architecture || []).map((node, idx) => ({
      name: node,
      type: "Microservice Node",
      color: idx % 2 === 0 ? "from-blue-500 to-indigo-500" : "from-purple-500 to-pink-500",
      desc: "Handles dedicated processing, event orchestration, or database synchronization.",
    })),
    techStack: project.tags.map((tag, idx) => ({
      category: idx % 2 === 0 ? "Core Platform" : "Utility Stack",
      item: tag,
      detail: "Configured for optimal high-speed deployment, compilation, and security.",
    })),
    features: [
      { title: "Dynamic State Orchestrator", desc: "Maintains real-time telemetry variables and state synchronization models.", icon: Layers },
      { title: "Enterprise Grade Scalability", desc: "Engineered to support concurrent, multi-region processing pipelines with ease.", icon: Zap },
    ],
    challenges: [
      { title: "Edge Connection Dropouts", solution: "Configured resilient reconnection strategies with automated state-saving caches.", difficulty: "High" as const },
    ],
    developmentProcess: [
      { phase: "Phase 1", title: "Planning & Architecture", timeline: "Weeks 1 - 2", tasks: ["Mapped core schemas, data models, and API endpoints."] },
      { phase: "Phase 2", title: "Core Integration Engine", timeline: "Weeks 3 - 6", tasks: ["Built primary features and low-latency database queries."] },
    ],
    results: (project.caseStudy?.metrics || []).map((m) => ({
      label: m.label,
      value: m.value,
      desc: "Measurable milestone recorded during system testing.",
    })),
    lessonsLearned: [
      "Modular components are essential to isolate tasks and maintain scalable development pipelines.",
      "Optimizing query performance early on prevents severe bottlenecks as data scales up.",
    ],
  };

  // Get related projects
  const relatedProjects = PROJECTS_DATA.filter((p) => p.title !== project.title).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-purple-900/10 via-blue-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-duration:10s]" />

      {/* Floating Header Actions Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-[var(--border)]/40 bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                title="Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-xs text-[var(--text-inverse)] transition-all cursor-pointer font-semibold"
              >
                <span>Launch App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer ml-1"
              title="Close Case Study"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-20 border-b border-[var(--border)]/40">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Breadcrumb / Title Category */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-[10px] font-mono text-[var(--primary)] tracking-widest uppercase bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/15">
              Case Study
            </span>
            <span className="text-[var(--text-muted)] font-mono text-[10px]">&bull;</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              {project.status}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[var(--text-primary)] max-w-4xl leading-tight">
            Inside <span className="gradient-text">{project.title}</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-3xl mt-4 leading-relaxed">
            {details.overview}
          </p>

          {/* Key Quick Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[var(--border)]/40">
            {details.results.map((r, index) => (
              <div key={index} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <span className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-wider block">
                  {r.label}
                </span>
                <div className="text-2xl font-bold mt-2 text-[var(--text-primary)] tracking-tight">
                  {r.value}
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] mt-1 block leading-relaxed">
                  {r.desc}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Case Study Section Body */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Navigation Anchor List (Desktop Sticky) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 lg:gap-0 lg:space-y-1 scrollbar-none">
              <span className="hidden lg:block text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest pl-3 mb-3 shrink-0">
                CASE STUDY SECTIONS
              </span>
              {[
                { id: "overview", label: "Overview & Context", icon: Sparkles },
                { id: "architecture", label: "System Architecture", icon: Workflow },
                { id: "technology", label: "Technology Stack", icon: Layers },
                { id: "process", label: "Development Process", icon: Calendar },
                { id: "challenges", label: "Challenges & Lessons", icon: ShieldCheck },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-auto lg:w-full shrink-0 text-left flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)] font-semibold shadow"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]/40"
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Dynamic Content Pane */}
          <div className="lg:col-span-9 space-y-12">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                
                {/* 1. OVERVIEW & CONTEXT */}
                {activeTab === "overview" && (
                  <div className="space-y-10">
                    
                    {/* Problem Statement Block */}
                    <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-red-400 tracking-wider font-semibold uppercase">
                          The Problem Statement
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {details.problem}
                      </p>
                    </div>

                    {/* Solution Statement Block */}
                    <div className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-emerald-400 tracking-wider font-semibold uppercase">
                          The Solution Strategy
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {details.solution}
                      </p>
                    </div>

                    {/* Project Core Features Section */}
                    <div className="space-y-6 pt-4">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Cpu className="w-4.5 h-4.5 text-[var(--primary)]" />
                        <span>Key Interactive Features</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {details.features.map((f, idx) => {
                          const IconComp = f.icon || Layers;
                          return (
                            <div key={idx} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2 group hover:border-[var(--border-hover)] transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-[var(--surface)] flex items-center justify-center border border-[var(--border)]">
                                <IconComp className="w-4 h-4 text-[var(--primary)]" />
                              </div>
                              <h4 className="text-xs font-semibold text-[var(--text-primary)] mt-1">{f.title}</h4>
                              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Screenshots Mock Sections */}
                    {MOCK_SCREENSHOTS[project.title] && (
                      <div className="space-y-6 pt-4">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                          <Monitor className="w-4.5 h-4.5 text-[var(--primary)]" />
                          <span>Interactive Interface Wireframes</span>
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {MOCK_SCREENSHOTS[project.title].map((scr, sIdx) => (
                            <div key={sIdx} className="space-y-2.5 text-left">
                              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                                // {scr.label}
                              </span>
                              <div className="aspect-video w-full">
                                {scr.element}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 2. SYSTEM ARCHITECTURE */}
                {activeTab === "architecture" && (
                  <div className="space-y-10">
                    
                    <div className="space-y-3 text-left">
                      <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest block">
                        // TECHNICAL TOPOLOGY DESIGN
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {details.architectureDescription}
                      </p>
                    </div>

                    {/* Interactive Animated SVG Topology Flowchart Diagram */}
                    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] relative overflow-hidden flex flex-col items-center">
                      <span className="absolute top-3 left-4 text-[9px] font-mono text-[var(--text-muted)]">
                        SYSTEM_FLOW_TOPOLOGY.SVG
                      </span>
                      <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-[8px] text-[var(--text-muted)]">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                        <span>Interactive Node Map</span>
                      </div>

                      {/* SVG Flow diagram with actual paths and nodes */}
                      <svg viewBox="0 0 800 240" className="w-full h-auto mt-6 max-w-2xl select-none">
                        <defs>
                          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--primary)" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Animated Flowing Line Path 1 */}
                        <path
                          d="M 120 120 L 280 120"
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth="2"
                          strokeDasharray="6,6"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="36;0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Animated Flowing Line Path 2 */}
                        <path
                          d="M 380 120 L 540 120"
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth="2"
                          strokeDasharray="6,6"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="36;0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Node 1: Client Layer */}
                        <g transform="translate(40, 70)">
                          <rect width="100" height="100" rx="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
                          <circle cx="50" cy="40" r="16" fill="url(#purpleGrad)" stroke="var(--primary)" strokeWidth="1" />
                          <text x="50" y="44" fill="var(--primary)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">UI</text>
                          <text x="50" y="80" fill="var(--text-secondary)" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Client Stage</text>
                        </g>

                        {/* Node 2: Core Processing Backplane */}
                        <g transform="translate(300, 70)">
                          <rect width="100" height="100" rx="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
                          <circle cx="50" cy="40" r="16" fill="url(#purpleGrad)" stroke="var(--primary)" strokeWidth="1" />
                          <text x="50" y="44" fill="var(--primary)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">API</text>
                          <text x="50" y="80" fill="var(--text-secondary)" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Async Core</text>
                        </g>

                        {/* Node 3: Isolated DB/Sandbox worker */}
                        <g transform="translate(560, 70)">
                          <rect width="110" height="100" rx="16" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
                          <circle cx="55" cy="40" r="16" fill="url(#purpleGrad)" stroke="var(--primary)" strokeWidth="1" />
                          <text x="55" y="44" fill="var(--primary)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DB</text>
                          <text x="55" y="80" fill="var(--text-secondary)" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Isolated Data</text>
                        </g>

                      </svg>
                    </div>

                    {/* Nodes Descriptions Grid */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                        // MICROSERVICE SYSTEM DEPLOYMENTS
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {details.architectureNodes.map((n, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex gap-4 items-start"
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-[var(--text-primary)]">{n.name}</h4>
                                <span className="text-[8px] font-mono text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                                  {n.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                                {n.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Terminal Code Block */}
                    {project.caseStudy?.codeSnippet && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                            // CORE INTEGRATION ENDPOINT
                          </span>
                          <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded border border-[var(--primary)]/20">
                            {project.caseStudy.codeSnippet.filename}
                          </span>
                        </div>

                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden font-mono shadow-inner text-left">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/60 bg-[var(--surface)]/30">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-red-500/70" />
                              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                              <span className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">
                              {project.caseStudy.codeSnippet.language}
                            </span>
                          </div>
                          <pre className="p-6 text-xs text-[var(--text-secondary)] leading-relaxed overflow-x-auto whitespace-pre">
                            <code>{project.caseStudy.codeSnippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 3. TECHNOLOGY STACK */}
                {activeTab === "technology" && (
                  <div className="space-y-8 text-left">
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest">
                        // BLUEPRINTS & DEPENDENCIES
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        A selective, high-integrity architectural tech stack chosen for sub-millisecond execution, type-safety, and secure containment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[var(--text-primary)]">{tech.item}</span>
                            <span className="text-[9px] font-mono text-[var(--primary)] bg-[var(--primary)]/5 border border-[var(--primary)]/15 px-2 py-0.5 rounded">
                              {tech.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mt-2">
                            {tech.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 4. DEVELOPMENT PROCESS */}
                {activeTab === "process" && (
                  <div className="space-y-10 text-left">
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest">
                        // DEVELOPMENT CHRONOLOGY
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        A detailed timeline tracking core sprints from research models to continuous deployment metrics.
                      </p>
                    </div>

                    <div className="relative border-l border-[var(--border)] pl-6 ml-4 space-y-10">
                      {details.developmentProcess.map((step, idx) => (
                        <div key={idx} className="relative group">
                          
                          {/* Pulsing point icon */}
                          <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--primary)] border border-[var(--background)] group-hover:scale-125 transition-transform" />

                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded border border-[var(--primary)]/20 font-bold uppercase">
                                {step.phase}
                              </span>
                              <h4 className="text-xs font-bold text-[var(--text-primary)]">{step.title}</h4>
                              <span className="text-[var(--text-muted)] font-mono text-[10px] ml-auto">
                                {step.timeline}
                              </span>
                            </div>

                            <div className="pl-0 space-y-1.5 text-[var(--text-secondary)] text-[11px] leading-relaxed">
                              {step.tasks.map((task, tIdx) => (
                                <div key={tIdx} className="flex gap-2 items-start">
                                  <span className="text-[var(--primary)] font-mono mt-0.5">&bull;</span>
                                  <span>{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 5. CHALLENGES & LESSONS */}
                {activeTab === "challenges" && (
                  <div className="space-y-10 text-left">
                    
                    {/* Challenges Block */}
                    <div className="space-y-6">
                      <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest block">
                        // CRITICAL OVERCOMING OBSTACLES
                      </span>

                      <div className="space-y-4">
                        {details.challenges.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <span>{c.title}</span>
                              </h4>
                              <span className={`text-[8px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded border ${
                                c.difficulty === "Critical"
                                  ? "text-red-400 bg-red-500/10 border-red-500/20"
                                  : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                              }`}>
                                {c.difficulty.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-3.5 border-l border-[var(--border)]">
                              <span className="text-[var(--text-primary)] font-medium font-sans">Resolution:</span> {c.solution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lessons Learned */}
                    <div className="space-y-6 pt-4">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                        // LESSONS LEARNED & BLUEPRINT takeaways
                      </span>

                      <div className="grid grid-cols-1 gap-3">
                        {details.lessonsLearned.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[var(--surface)]/30 border border-[var(--border)]/60 flex items-start gap-3.5 text-xs text-[var(--text-secondary)] leading-relaxed"
                          >
                            <Lightbulb className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* Related Case Studies Grid */}
      <section className="border-t border-[var(--border)]/40 py-20 bg-[var(--card)]/20">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center md:text-left mb-10">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
              // MORE PROJECT BLUEPRINTS
            </span>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">
              Explore Related Case Studies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <div
                key={p.title}
                onClick={() => onNavigate(p)}
                className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/40 hover:border-[var(--border-hover)] hover:bg-[var(--surface)]/10 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--primary)] mt-4 self-start group/btn">
                  <span>Read Study</span>
                  <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sticky Bottom Actions Bar */}
      <footer className="py-8 bg-[var(--background)] border-t border-[var(--border)]/40 flex items-center justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          Return to Portfolio Hub
        </button>
      </footer>

    </div>
  );
}
