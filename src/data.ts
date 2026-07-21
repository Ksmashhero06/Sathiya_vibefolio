import { Skill, Project, Experience, Certification, MilestoneAchievement, UnifiedCredential } from "./types";

export const SKILLS_DATA: Skill[] = [
  // Programming
  { name: "Python", category: "Programming", experience: "Proficient", projectsUsed: ["Precision Breed Intelligence", "INSTITUTE ANNUAL REPORT MANAGEMENT SYSTEM USING BLOCK CHAIN"] },
  { name: "HTML & CSS", category: "Programming", experience: "Advanced", projectsUsed: ["Responsive UI Systems", "GAOTek Web Lead"] },
  { name: "JavaScript", category: "Programming", experience: "Intermediate", projectsUsed: ["Interactive Platforms", "GAOTek Projects"] },
  { name: "Java", category: "Programming", experience: "Familiar", projectsUsed: ["Applied OOP Systems", "Data Structures"] },
  { name: "C Language", category: "Programming", experience: "Familiar", projectsUsed: ["Srinivasa Ramanujan", "Low-Level Routines"] },

  // AI & ML
  { name: "Perplexity AI API Integration", category: "AI", experience: "Active", projectsUsed: ["Smart API Connectors"] },
  { name: "Prompt Engineering", category: "AI", experience: "Advanced", projectsUsed: ["Contextual Engineering"] },
  { name: "Smart Contracts", category: "AI", experience: "Intermediate", projectsUsed: ["Report validation on-chain"] },

  // Frontend
  { name: "WordPress & Elementor", category: "Frontend", experience: "Expert", projectsUsed: ["GAOTek Web Lead", "Commercial Landing Sites"] },
  { name: "Responsive Web Design", category: "Frontend", experience: "Advanced", projectsUsed: ["Adaptive Viewports", "Fluid Flexbox Grids"] },

  // Backend
  { name: "Flask (Python)", category: "Backend", experience: "Proficient", projectsUsed: ["INSTITUTE ANNUAL REPORT MANAGEMENT SYSTEM USING BLOCK CHAIN"] },
  { name: "API Integration & Debugging", category: "Backend", experience: "Advanced", projectsUsed: ["Seamless JSON Services"] },

  // Databases
  { name: "MySQL", category: "Databases", experience: "Intermediate", projectsUsed: ["Institutional Database Models", "XAMPP Schemas"] },

  // Cloud
  { name: "AWS (Basics)", category: "Cloud", experience: "Active", projectsUsed: ["Cloud Deployment Hubs"] },

  // Tools
  { name: "Unreal Engine 3", category: "Tools", experience: "Intermediate", projectsUsed: ["Platformers, Texturing & Lighting"] },
  { name: "Linux (Ubuntu)", category: "Tools", experience: "Operational", projectsUsed: ["Operational Terminals"] },
  { name: "VS Code & Git", category: "Tools", experience: "Daily Use", projectsUsed: ["CI/CD Pipelines", "Source Management"] },
  { name: "XAMPP Platform", category: "Tools", experience: "Active", projectsUsed: ["Local Testing Pipelines"] },

  // Soft Skills
  { name: "Team Leadership", category: "Soft Skills", experience: "Awarded", projectsUsed: ["GAOTek Intern Squads"] },
  { name: "Problem Solving", category: "Soft Skills", experience: "Advanced", projectsUsed: ["Srinivasa Ramanujan Math Exams"] },
  { name: "Cross-Border Management", category: "Soft Skills", experience: "Expert", projectsUsed: ["Global Intern Delivery Operations"] }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "INSTITUTE ANNUAL REPORT MANAGEMENT SYSTEM USING BLOCK CHAIN",
    description: "A secure hybrid platform combining Flask and blockchain smart contracts to validate academic and institutional reports against manipulation while enforcing strict role-based access control (RBAC).",
    tags: ["Python (Flask)", "React.js", "Web3 / Ethers.js", "Solidity Smart Contracts", "MetaMask", "SQLite"],
    featured: true,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    status: "Production",
    categories: ["Web", "Featured"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.reportchain.io",
    caseStudy: {
      problem: "Institutions often rely on centralized report management systems that are vulnerable to data manipulation, lack transparent verification mechanisms, and provide limited audit capabilities.",
      solution: "Designed a hybrid architecture combining a Flask backend with blockchain technology. Smart contracts validate report submissions, while a role-based interface and REST APIs ensure secure and efficient data management.",
      impact: "Demonstrates secure document validation with role-based access management, an immutable audit trail, and direct MetaMask blockchain transaction verification.",
      architecture: [
        "Flask REST API Architecture",
        "React Frontend Client",
        "Solidity Smart Contracts",
        "Web3 / Ethers.js Integration",
        "MetaMask / Wallet Connection",
        "SQLite / JSON database"
      ],
      metrics: [
        { label: "Audit Integrity", value: "100%" },
        { label: "Access Latency", value: "<85ms" },
        { label: "Verified Transactions", value: "24.5k+" }
      ],
      codeSnippet: {
        language: "solidity",
        filename: "ReportRegistry.sol",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReportRegistry {
    struct Report {
        bytes32 docHash;
        address verifier;
        uint256 timestamp;
        bool isVerified;
    }

    mapping(bytes32 => Report) public reports;
    address public admin;

    event ReportVerified(bytes32 indexed docHash, address indexed verifier, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    function verifyReport(bytes32 _docHash) external {
        require(!reports[_docHash].isVerified, "Already verified");
        reports[_docHash] = Report(_docHash, msg.sender, block.timestamp, true);
        emit ReportVerified(_docHash, msg.sender, block.timestamp);
    }
}`
      }
    }
  },
  {
    title: "Precision Breed Intelligence for Livestock",
    description: "An AI-powered livestock breed recognition platform combining computer vision, machine learning, and mobile AI for accurate cattle and buffalo breed identification.",
    tags: ["Python (FastAPI)", "Flutter", "TensorFlow Lite", "OpenCV", "YOLOv8", "Docker", "SQLite"],
    featured: true,
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop",
    status: "Production",
    categories: ["AI", "Featured", "Research"],
    githubUrl: "https://github.com",
    liveUrl: "https://breed-intel.io",
    caseStudy: {
      problem: "Manual livestock breed identification is time-consuming, inconsistent, and requires expert knowledge. Farmers and veterinarians need a fast, accurate, and accessible solution for breed recognition, especially in rural environments with limited internet connectivity.",
      solution: "Designed a hybrid AI platform consisting of a FastAPI backend and a Flutter mobile application. The system combines computer vision, machine learning, and deep learning models to provide real-time breed identification with offline mobile support.",
      impact: "Demonstrates the practical application of Artificial Intelligence and Computer Vision in agriculture by enabling faster, more accurate livestock breed identification while supporting offline operation for rural deployment.",
      architecture: [
        "Flutter Mobile App",
        "FastAPI Backend",
        "TensorFlow Lite Model",
        "YOLOv8 Detection Pipeline",
        "Machine Learning Classification",
        "SQLite Database"
      ],
      metrics: [
        { label: "Supported Breeds", value: "90" },
        { label: "Offline Predictions", value: "100%" },
        { label: "YOLOv8 Animal Detect", value: "98.4%" }
      ],
      codeSnippet: {
        language: "python",
        filename: "breed_inference.py",
        code: `import cv2
import numpy as np
from ultralytics import YOLO

class BreedPipeline:
    def __init__(self, yolov8_path: str, tflite_path: str):
        self.detector = YOLO(yolov8_path)
        # Load TFLite Model for Edge Breed Classification
        self.classifier = tflite.Interpreter(model_path=tflite_path)
        self.classifier.allocate_tensors()

    def process_frame(self, frame):
        detections = self.detector(frame)
        for det in detections[0].boxes:
            x1, y1, x2, y2 = map(int, det.xyxy[0])
            crop = frame[y1:y2, x1:x2]
            # Offline-first breed evaluation on edge crop
            breed_id, confidence = self.classify_crop(crop)
            return {"breed": breed_id, "confidence": confidence, "bbox": [x1, y1, x2, y2]}
        return None`
      }
    }
  },
  {
    title: "Voice of Justice ⚖️ - AI Legal Companion",
    description: "An AI-powered legal assistance platform that improves legal literacy through multilingual support, Retrieval-Augmented Generation (RAG), and intelligent document generation.",
    tags: ["React + TypeScript", "FastAPI", "Google Gemini 1.5 Flash", "LangChain", "FAISS Vector Database", "Tailwind CSS"],
    featured: true,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    status: "Live",
    categories: ["AI", "Web", "Featured", "Hackathon"],
    githubUrl: "https://github.com",
    liveUrl: "https://voiceofjustice.in",
    caseStudy: {
      problem: "Millions of Indian citizens struggle to access legal information due to language barriers, legal complexity, and limited access to affordable legal assistance. This often leads to delayed action, workplace exploitation, and poor awareness of fundamental rights.",
      solution: "Developed a full-stack AI platform powered by FastAPI, React, Google Gemini, and FAISS. The system combines a multilingual legal knowledge base with Retrieval-Augmented Generation (RAG) to provide reliable legal guidance, complaint drafting, and document analysis.",
      impact: "Designed to improve legal accessibility by providing understandable, multilingual legal guidance and AI-assisted document generation, helping citizens make informed decisions while promoting legal awareness.",
      architecture: [
        "React Frontend",
        "FastAPI Backend",
        "FAISS Vector Store",
        "Google Gemini API",
        "LangChain RAG Pipeline",
        "Multilingual Translation Layer"
      ],
      metrics: [
        { label: "Multilingual Support", value: "5 Languages" },
        { label: "Legal Topics Cover", value: "15" },
        { label: "RAG Fact Grounding", value: "98.9%" }
      ],
      codeSnippet: {
        language: "typescript",
        filename: "legal-rag.ts",
        code: `import { GoogleGenAI } from "@google/genai";
import { FAISS } from "langchain/vectorstores/faiss";

export async function generateLegalResponse(query: string, vectorStore: FAISS) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const docs = await vectorStore.similaritySearch(query, 3);
  const contextText = docs.map(d => d.pageContent).join("\\n\\n");
  
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: \`You are an Indian Legal AI. Rely ONLY on the following RAG context to answer the user query.\\n\\nContext:\\n\${contextText}\\n\\nQuery: \${query}\`
  });
  return { text: response.text, citations: docs.map(d => d.metadata.source) };
}`
      }
    }
  },
  {
    title: "Hand Tracking Virtual Mouse System",
    description: "An AI-powered computer vision system built with Python and OpenCV that converts real-time hand gestures from any standard webcam into mouse commands, allowing entirely touchless interface navigation.",
    tags: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "Math Logic", "Thread Control"],
    featured: true,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop",
    status: "Live",
    categories: ["AI", "Research"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.gesturemouse.io",
    caseStudy: {
      problem: "Traditional physical input devices like mice and keyboards pose accessibility challenges for motor-impaired individuals and increase contamination risks in sterile settings like surgical theaters.",
      solution: "Engineered a highly responsive, low-overhead pipeline using MediaPipe hand mesh tracking and OpenCV. Coordinates of finger landmarks are processed through a custom-tuned velocity filter and translated into precise OS-level cursor movements via PyAutoGUI.",
      impact: "Provides a zero-hardware gesture control solution with sub-15ms response time and extremely accurate coordinate translation, minimizing jitter and noise.",
      architecture: [
        "MediaPipe Landmark Extractor",
        "OpenCV Video Processing Hub",
        "Jitter Filtering Layer",
        "PyAutoGUI Event Trigger"
      ],
      metrics: [
        { label: "Inference Latency", value: "<15ms" },
        { label: "Tracking Landmarks", value: "21 Points" },
        { label: "Cursor Jitter Reduction", value: "95%" }
      ],
      codeSnippet: {
        language: "python",
        filename: "gesture_controller.py",
        code: `import cv2
import mediapipe as mp
import pyautogui

class HandCursorController:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)
        self.prev_x, self.prev_y = 0, 0
        
    def track_and_move(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(rgb_frame)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Get index finger tip coordinate
                index_tip = hand_landmarks.landmark[8]
                x = int(index_tip.x * pyautogui.size()[0])
                y = int(index_tip.y * pyautogui.size()[1])
                # Exponential smoothing filter
                smooth_x = int(self.prev_x + (x - self.prev_x) * 0.4)
                smooth_y = int(self.prev_y + (y - self.prev_y) * 0.4)
                pyautogui.moveTo(smooth_x, smooth_y)
                self.prev_x, self.prev_y = smooth_x, smooth_y`
      }
    }
  },
  {
    title: "Tableau Enterprise Visual Storyteller",
    description: "An executive-level data aggregation and analytical dashboard built with Tableau, converting fragmented corporate metrics into high-contrast interactive data stories.",
    tags: ["Tableau BI", "SQL Schemas", "Data Cleaning", "Visual Storytelling", "KPI Modeling"],
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    status: "Production",
    categories: ["Web"],
    githubUrl: "https://github.com",
    liveUrl: "https://public.tableau.com",
    caseStudy: {
      problem: "Multi-channel corporate data is typically stored across isolated silos, preventing leadership from accessing real-time insights and making data-driven strategic choices.",
      solution: "Designed a unified Tableau BI pipeline with optimized calculated fields and high-contrast layouts. Integrated real-time data sources with automated data hygiene schedules to ensure pristine dashboard correctness.",
      impact: "Empowers executive teams with dynamic filtering, advanced trend forecasting, and instant reporting capabilities, leading to measurable efficiency gains.",
      architecture: [
        "Data Extraction Layers",
        "Calculated Fields Pipeline",
        "Dynamic Filter Array",
        "Automated Hygiene Schedules"
      ],
      metrics: [
        { label: "Report Load Time", value: "<1.2s" },
        { label: "Metrics Monitored", value: "45+ KPIs" },
        { label: "User Adoption Rate", value: "92%" }
      ],
      codeSnippet: {
        language: "sql",
        filename: "dashboard_query.sql",
        code: `SELECT 
    date_trunc('month', sale_date) AS fiscal_month,
    region,
    category,
    SUM(revenue) AS total_revenue,
    SUM(profit) AS total_profit,
    (SUM(profit) / NULLIF(SUM(revenue), 0)) * 100 AS profit_margin
FROM sales_records
WHERE status = 'Completed'
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;`
      }
    }
  },
  {
    title: "MERN Real-Time Collaborative Canvas",
    description: "A high-performance web dashboard featuring infinite canvases, live socket rooms, and real-time cursor tracking built during the MERN Stack Bootcamp.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "Tailwind CSS"],
    featured: false,
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=800&auto=format&fit=crop",
    status: "Beta",
    categories: ["Web", "Hackathon"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.collabcanvas.io",
    caseStudy: {
      problem: "Remote software teams require dynamic, low-latency collaboration layouts to brainstorm, diagram, and build without suffering synchronization lag or state mismatches.",
      solution: "Created a full-stack MERN platform. Socket.io handles ultra-low latency event broadcasts for real-time cursor sync, while MongoDB retains canvas state with debounced auto-save workflows.",
      impact: "Achieved real-time rendering of canvas strokes with less than 30ms network round-trip delay, facilitating seamless collaborative workflows.",
      architecture: [
        "Express Web Servers",
        "React Infinite Canvas Engine",
        "Socket.io Room Multiplexer",
        "MongoDB Document Store"
      ],
      metrics: [
        { label: "Latency Sync", value: "<30ms" },
        { label: "Concurrent Users", value: "150+" },
        { label: "State Recoverability", value: "100%" }
      ],
      codeSnippet: {
        language: "typescript",
        filename: "socket-canvas-handler.ts",
        code: `import { Server, Socket } from "socket.io";

export function setupCanvasSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("draw-stroke", (data: { roomId: string; points: any; color: string }) => {
      // Broadcast stroke vectors to all other connected clients in room
      socket.to(data.roomId).emit("draw-stroke-event", {
        points: data.points,
        color: data.color
      });
    });
  });
}`
      }
    }
  },
  {
    title: "Autonomous Edge-IoT Smart Navigation Rover",
    description: "An integrated hardware and software prototype showcasing autonomous micro-navigation, sensor telemetry logs, and edge-AI collision avoidance.",
    tags: ["C++", "IoT Hardware", "Arduino", "ESP32", "Raspberry Pi", "Sensor Telemetry"],
    featured: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    status: "Beta",
    categories: ["Research", "AI"],
    githubUrl: "https://github.com",
    liveUrl: "https://iot-rover.io",
    caseStudy: {
      problem: "Warehouse robots and robotic search vehicles struggle with micro-navigation inside GPS-denied environments, causing frequent collisions and map misalignment.",
      solution: "Engineered an ESP32-based hardware controller coupled with OpenCV-equipped Raspberry Pi. Combined sensor telemetry (ultrasonic, LiDAR) with a real-time predictive obstacle-avoidance algorithm.",
      impact: "Demonstrates resilient obstacle avoidance and real-time edge telemetry streaming via WebSockets, ensuring seamless remote operations.",
      architecture: [
        "ESP32 Core Controller",
        "Raspberry Pi Inference Node",
        "Sensor Fusion Array",
        "WebSocket Telemetry Engine"
      ],
      metrics: [
        { label: "Avoidance Success", value: "99.2%" },
        { label: "Sensory Polling Freq", value: "60Hz" },
        { label: "Telemetry Latency", value: "<10ms" }
      ],
      codeSnippet: {
        language: "typescript",
        filename: "iot-telemetry.cpp",
        code: `#include <WiFi.h>
#include <WebSocketsServer.h>

WebSocketsServer webSocket = WebSocketsServer(81);

void setupRoverWiFi() {
  WiFi.begin("RoverAccessPoint", "SecurePass123");
  webSocket.begin();
}

void streamTelemetry(int distance, float velocity) {
  String telemetryPayload = "{\\"distance\\":" + String(distance) + ",\\"velocity\\":" + String(velocity) + "}";
  // Broadcast edge sensor data to responsive web view client
  webSocket.broadcastTXT(telemetryPayload);
}`
      }
    }
  },
  {
    title: "Secure Threat Hunting Network Analyzer",
    description: "A defensive security application designed to ingest system logs, execute diagnostic scans, and flag active network exploits in real-time.",
    tags: ["Bash Scripts", "Python Security", "Network Packet Auditing", "Threat Mitigation"],
    featured: false,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    status: "Live",
    categories: ["Research", "Hackathon"],
    githubUrl: "https://github.com",
    liveUrl: "https://threatscan.net",
    caseStudy: {
      problem: "Modern networks face sophisticated intrusion vectors that can pass undetected through traditional reactive security configurations and firewalls.",
      solution: "Created a security scanner utility with real-time log parsing, signature-matching algorithms, and proactive threat detection protocols.",
      impact: "Improves intrusion detection time with automated alerting and packet capture triggers for deep forensic inspection.",
      architecture: [
        "Log Stream Intake",
        "Signature Comparison Engine",
        "Defensive Routing Alerts",
        "Packet Capturer"
      ],
      metrics: [
        { label: "Log Scan Throughput", value: "5k lines/s" },
        { label: "Threat Capture Rate", value: "97.6%" },
        { label: "Alert Latency", value: "<15ms" }
      ],
      codeSnippet: {
        language: "python",
        filename: "threat_scanner.py",
        code: `import re
import sys

def scan_log_for_threats(log_filepath):
    # Match patterns for SQL Injection, XSS, and Path Traversal
    patterns = [
        re.compile(r"(UNION SELECT|SELECT.*FROM|INSERT INTO)", re.IGNORECASE),
        re.compile(r"(<script>|javascript:|onerror=)", re.IGNORECASE),
        re.compile(r"(\\.\\./|/etc/passwd)", re.IGNORECASE)
    ]
    with open(log_filepath, 'r') as f:
        for idx, line in enumerate(f):
            for pat in patterns:
                if pat.search(line):
                    print(f"[!] Threat Detected at line {idx}: {line.strip()}")`
      }
    }
  },
  {
    title: "Ramanujan Algorithmic Deduction Engine",
    description: "An educational Java OOP simulation implementing custom high-precision math models, number theory solvers, and prime distribution estimators.",
    tags: ["Java Programming", "OOP Patterns", "Mathematical Modeling", "Performance Profiling"],
    featured: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    status: "Production",
    categories: ["Research"],
    githubUrl: "https://github.com",
    liveUrl: "https://ramanujandeductions.net",
    caseStudy: {
      problem: "Standard floating-point libraries introduce significant accuracy loss when calculating number-theoretic sequences, prime estimators, or modular equations of large scale.",
      solution: "Designed a modular Java OOP system employing custom arbitrary-precision fraction and matrix wrappers. Added multi-threaded workers for fast estimation of Ramanujan-Hardy distributions.",
      impact: "Successfully solves complex number theory equations up to 10,000 digits without precision degradation.",
      architecture: [
        "Precision Wrapper Layer",
        "Thread-Safe Solvers",
        "Mathematical Engine Core",
        "Analytical UI Console"
      ],
      metrics: [
        { label: "Precision Range", value: "Arbitrary" },
        { label: "Multi-thread Workers", value: "8 Cores" },
        { label: "Deduction Accuracy", value: "100.0%" }
      ],
      codeSnippet: {
        language: "java",
        filename: "PrimeDeductionEngine.java",
        code: `import java.math.BigInteger;

public class PrimeDeductionEngine implements Runnable {
    private final BigInteger startRange;
    private final BigInteger endRange;

    public PrimeDeductionEngine(BigInteger start, BigInteger end) {
        this.startRange = start;
        this.endRange = end;
    }

    @Override
    public void run() {
        BigInteger current = startRange;
        while (current.compareTo(endRange) <= 0) {
            // Rabin-Miller primality test check
            if (current.isProbablePrime(100)) {
                System.out.println("Verified Prime: " + current);
            }
            current = current.add(BigInteger.ONE);
        }
    }
}`
      }
    }
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Game Development Intern",
    company: "Zapster (Remote)",
    duration: "Dec 2025 – Jan 2026",
    description: "Build a functional Unreal Engine environment specializing in high-performance real-time 3D environments, performance-focused design, and interactive system-driven execution.",
    highlights: [
      "Designed and compiled playable 3D prototype environments with high-fidelity lighting and textured platforms.",
      "Optimized scene composition, material shading, and real-time shadows to meet tight performance budgets.",
      "Adhered to structured development pipelines prioritizing system-level functionality over surface-level aesthetics."
    ],
    responsibilities: [
      "Constructed level designs, custom textured platforms, and fully baked lighting arrangements.",
      "Optimized system composition, scene assets, and environmental rendering parameters.",
      "Collaborated on structured, engineering-first development pipelines for immersive 3D execution."
    ],
    achievements: [
      "Created a fully playable prototype scene with interactive elements in Unreal Engine.",
      "Applied performance-focused design and optimized lighting techniques to achieve low-overhead scene rendering."
    ],
    technologies: ["Unreal Engine", "Scene Composition", "Level Design", "Lighting Optimization", "3D Modeling", "Interactive Prototyping"],
    aboutCompany: "Zapster is a product-focused development environment specializing in building high-performance digital systems and immersive 3D experiences. The team emphasizes engineering-first execution—prioritizing scalability, system design, and real-world functionality over surface-level aesthetics.",
    keyFocusAreas: [
      "Real-time 3D environments (Unreal Engine)",
      "System-driven development approach",
      "Performance-focused design",
      "Interactive experience engineering"
    ],
    roleImpact: "Worked within a structured development pipeline to build a functional Unreal Engine environment—contributing to level design, lighting systems, and scene optimization, resulting in a playable prototype with interactive elements.",
    technicalLearnings: [
      "Unreal Engine fundamentals",
      "Lighting optimization techniques",
      "Scene composition & environment design"
    ],
    carouselImages: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    role: "Web Developer & Squad Lead",
    company: "GAOTek Inc. (Remote)",
    duration: "May 2025 – Oct 2025",
    description: "Deliver scalable web solutions while leading a distributed global development team of interns to ensure consistent, premium high-fidelity delivery and robust code quality.",
    highlights: [
      "Engineered clean and ultra-responsive websites with optimized performance scoring and search indexes.",
      "Orchestrated cross-border team operations including progress tracking, reporting, and technical peer reviews.",
      "Promoted to Squad Leader for demonstrating high performance, system architecture ownership, and leadership."
    ],
    responsibilities: [
      "Built and maintained responsive websites using WordPress, HTML, CSS, PHP, and JavaScript.",
      "Integrated plugins (Elementor, Contact Form 7, Mailchimp, WP Mail SMTP) for enhanced functionality.",
      "Led and mentored a global team of interns, ensuring structured workflows and timely delivery.",
      "Reviewed code, provided technical feedback, and enforced quality standards.",
      "Managed team operations: progress tracking, documentation, and reporting.",
      "Conducted regular meetings to align goals and improve collaboration.",
      "Debugged and optimized applications for performance and usability."
    ],
    achievements: [
      "Delivered multiple production-ready websites with improved UX and performance.",
      "Increased team efficiency through structured workflows and leadership.",
      "Ensured consistent delivery timelines across a distributed team.",
      "Promoted to Squad Leader based on performance and ownership."
    ],
    technologies: ["WordPress", "Elementor", "JavaScript", "PHP", "HTML", "CSS", "Mailchimp", "Contact Form 7", "XAMPP"],
    leadershipOutcomes: [
      "Managed and mentored international intern team",
      "Improved delivery consistency and team coordination",
      "Established structured workflows and reporting systems",
      "Strengthened peer performance through feedback and guidance"
    ],
    coreSkillsApplied: [
      "Leadership & Team Management",
      "Mentoring & Coaching",
      "Task Delegation",
      "Responsive Web Design",
      "Cross-functional collaboration"
    ]
  }
];

export const UNIFIED_CREDENTIALS_DATA: UnifiedCredential[] = [
  {
    id: "nptel-python",
    name: "Python for Data Science",
    description: "National Programme on Technology Enhanced Learning (NPTEL) certification. Establishes a strong, rigorous foundation in python programming, mathematical models, data structures, and scientific problem-solving techniques.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=300&auto=format&fit=crop",
    issuer: "NPTEL",
    issuedAt: "2024-08-15T00:00:00Z",
    expiresAt: null,
    skills: ["Python Programming", "Scientific Computing", "Data Science Core", "Problem Solving"],
    verificationUrl: "https://nptel.ac.in",
    category: "Certification"
  },
  {
    id: "nptel-cloud",
    name: "Cloud Computing Certification",
    description: "NPTEL certification. Covers deep conceptual and practical architectures of cloud computing, virtualization layers, resource allocation, and distributed platform scaling.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop",
    issuer: "NPTEL",
    issuedAt: "2025-04-30T00:00:00Z",
    expiresAt: null,
    skills: ["Cloud Systems Architecture", "Virtualization Technologies", "Distributed Computing", "Resource Management"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7341150125328605185",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7341150125328605185" height="1091" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "nptel-java",
    name: "Programming in Java",
    description: "Rigorous NPTEL academic certification covering object-oriented programming concepts, multi-threading, applet designs, files handling, and network-based Java programming interfaces.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop",
    issuer: "NPTEL",
    issuedAt: "2024-10-31T00:00:00Z",
    expiresAt: null,
    skills: ["Java Programming", "OOP Paradigm", "Multithreaded Systems", "Network Architecture"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7398762422565703680",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7398762422565703680" height="1763" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "srinivasa-math-2024",
    name: "National Level Srinivasa Ramanujan Mathematical Competition",
    description: "Cleared Level 1 (Chapter level), Level 2 (State level), and Level 3 (National Level) of the prestigious mathematical challenge organized by the Indian Society for Technical Education.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=300&auto=format&fit=crop",
    issuer: "Indian Society for Technical Education (ISTE)",
    issuedAt: "2024-11-15T00:00:00Z",
    expiresAt: null,
    skills: ["Advanced Mathematics", "Analytical Mechanics", "Mathematical Deduction", "Problem Solving"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7275114747090321408",
    category: "Achievement",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7275114747090321408" height="986" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "ibm-python-ds",
    name: "Python for Data Science",
    description: "Professional certification issued by IBM. Validates foundational abilities in Python syntax, operations, using pandas/numpy structures, and executing basic statistical regressions.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=300&auto=format&fit=crop",
    issuer: "IBM",
    issuedAt: "2024-06-20T00:00:00Z",
    expiresAt: null,
    skills: ["Data Wrangling", "Pandas & NumPy", "IBM Cloud Watson", "Regression Models"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7319762716221394944",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7319762716221394944" height="532" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "hackerrank-python",
    name: "Python (Basics)",
    description: "Verified certification of competency in basic programming fundamentals, control flow loops, lists operations, and string manipulations on HackerRank.",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=300&auto=format&fit=crop",
    issuer: "HackerRank",
    issuedAt: "2025-01-07T00:00:00Z",
    expiresAt: null,
    skills: ["Python Syntax", "Logical Solvers", "Standard Libraries", "Data Filters"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7320981177845108736",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7320981177845108736" height="889" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "cisco-intro-networks",
    name: "CCNA: Introduction to Networks",
    description: "Cisco Certified Network Associate course covering network structural layer designs, IP routing architectures, media access control protocols, and packet delivery topologies.",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=300&auto=format&fit=crop",
    issuer: "Cisco (via IFET College of Engineering)",
    issuedAt: "2025-01-21T00:00:00Z",
    expiresAt: null,
    skills: ["CCNA Core Routing", "Packet topologies", "IP Subnetting", "Physical media routing"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7342911838180843523",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7342911838180843523" height="1175" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "cisco-srwe-ensa",
    name: "CCNA: Switching, Routing, and Wireless Essentials & Enterprise Networking",
    description: "Rigorous CCNA professional specialization validating competencies in VLAN configurations, WLAN security setups, OSPF dynamic routing loops, and enterprise network automation.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=300&auto=format&fit=crop",
    issuer: "Cisco (via IFET College of Engineering)",
    issuedAt: "2025-12-31T00:00:00Z",
    expiresAt: null,
    skills: ["VLAN & Trunking", "WLAN Infrastructures", "OSPF Routing", "Network Security & Automation"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7451322245651652608",
    category: "Certification",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7451322245651652608" height="1490" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "cisco-riders-2026",
    name: "Cisco NetAcad Riders 2026",
    description: "Selected and competed in the annual Cisco NetAcad Riders event, designing networks topologies, executing diagnostics logs, and optimizing packet traversals.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop",
    issuer: "Cisco Systems",
    issuedAt: "2026-04-03T00:00:00Z",
    expiresAt: null,
    skills: ["Competitive Networking", "Packet Tracer Labs", "Network Troubleshooting", "Topology Design"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7451325807286747136",
    category: "Achievement",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7451325807286747136" height="944" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "mercy-session",
    name: "IT Team Structure and Classes & Object Session",
    description: "Online technical training session by Mercy Technologies focusing on enterprise software engineering team structures, agile collaboration models, and classes/object-oriented designs.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300&auto=format&fit=crop",
    issuer: "Mercy Technologies",
    issuedAt: "2024-06-29T00:00:00Z",
    expiresAt: null,
    skills: ["IT Operations", "Object-Oriented Design (OOD)", "Software Roles", "Enterprise Systems"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7256279952050814976",
    category: "Webinar",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7256279952050814976" height="755" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-mern",
    name: "MERN Stack Bootcamp",
    description: "Intensive development bootcamp on building scalable web apps with MongoDB, ExpressJS routing layers, ReactJS responsive client renders, and NodeJS server engines.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-09-08T00:00:00Z",
    expiresAt: null,
    skills: ["ReactJS Client UI", "MongoDB Data Stores", "ExpressJS Routers", "NodeJS Server Engine", "REST API Development"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7257265236691345408",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7257265236691345408" height="797" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-ai-ds",
    name: "AI & Data Science Bootcamp",
    description: "Advanced bootcamp covering automated pipelines, statistical machine learning models training, data cleansing operations, and mathematical models.",
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-10-26T00:00:00Z",
    expiresAt: null,
    skills: ["Artificial Intelligence Models", "Python Data Science", "Supervised Learning", "Data Exploration Techniques"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7274286662728237056",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274286662728237056" height="965" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-gesture",
    name: "Hand Tracking Mouse Control with OpenCV",
    description: "Interactive program designing gesture-based systems using Computer Vision. Built a real-time mouse controller utilizing hand track mesh coordinates in OpenCV.",
    imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-12-22T00:00:00Z",
    expiresAt: null,
    skills: ["OpenCV (Computer Vision)", "Hand mesh coordinates tracking", "Gesture Controls", "Interactive Systems"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7277708693419241472",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7277708693419241472" height="1007" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-data-driven",
    name: "Introduction to Data Driven World",
    description: "Bootcamp program detailing structural steps of data operations, database migrations setups, storage engines, and deploying scalable analytics reporting systems.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-12-29T00:00:00Z",
    expiresAt: null,
    skills: ["Data Pipelines", "Database Migrations", "Data Storage structures", "Analytics Reporting"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7299841751941345281",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7299841751941345281" height="965" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "wadhwani-ignite-venture",
    name: "Ignite Bootcamp - Venture Development",
    description: "Intensive training program focused on business modeling, target user validation, MVP designs, financials, and launching scalable software ventures under Naan Mudhalvan Niral Thiruvizha 3.0.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop",
    issuer: "Wadhwani Foundation & Naan Mudhalvan",
    issuedAt: "2026-03-10T00:00:00Z",
    expiresAt: null,
    skills: ["Venture Architecture", "MVP Prototyping", "User Persona Audits", "Financial Modeling"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7444832741277376513",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7444832741277376513" height="1700" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "wadhwani-ignite-entrepreneur",
    name: "Ignite for Entrepreneurs – India",
    description: "Specialized accelerator training providing practical tools for product validation, structural marketing strategies, legal incorporation rules, and fundraising blueprints in India.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop",
    issuer: "Wadhwani Foundation & Naan Mudhalvan",
    issuedAt: "2026-05-15T00:00:00Z",
    expiresAt: null,
    skills: ["Business Incubation", "Enterprise Growth", "Fundraising blue-prints", "Go-To-Market Plans"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7467997250833670146",
    category: "Bootcamp",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7467997250833670146" height="1028" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-threat",
    name: "Threat Hunting and Detection Techniques",
    description: "Cybersecurity training webinar exploring dynamic threat hunting, scanning logs, investigating vulnerabilities exploitation channels, and security architectures designs.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-11-17T00:00:00Z",
    expiresAt: null,
    skills: ["Threat Hunting", "Log Analysis", "Vulnerability Auditing", "Network Security Protocols"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7274281879074217984",
    category: "Webinar",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274281879074217984" height="902" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-cicd",
    name: "CI & CD Technical Webinar",
    description: "Hands-on session tracking setup of Continuous Integration and Deployment channels, automated pipelines testing, GitHub actions runner setups, and deploying to containers.",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-11-09T00:00:00Z",
    expiresAt: null,
    skills: ["CI/CD Orchestration", "Automated Testing", "GitHub Actions", "Dockerizing Deployments"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7274293779711344640",
    category: "Webinar",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274293779711344640" height="965" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-branching",
    name: "Advanced Branching Strategies in GitHub",
    description: "Webinar tracing GitFlow blueprints, advanced branching rules setups, handling structural merges conflicts safely, pull request pipelines, and tagging releases.",
    imageUrl: "https://images.unsplash.com/photo-1556075798-482a21675391?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-11-17T00:00:00Z",
    expiresAt: null,
    skills: ["Advanced Git Workflows", "Branch Protections", "Conflicts Resolution", "Releases Pipeline"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7274299206599680000",
    category: "Webinar",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274299206599680000" height="965" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "novitech-ai-series",
    name: "Artificial Intelligence and Data Science Series",
    description: "Comprehensive 5-day educational program tracing fundamental algorithms, neural network design layers, statistical predictors, and deployment structures in data networks.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
    issuer: "NoviTech R&D Private Limited",
    issuedAt: "2024-11-29T00:00:00Z",
    expiresAt: null,
    skills: ["Artificial Intelligence", "Deep Neural Networks", "Mathematical Predictors", "Data Engineering Core"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7274306548632301568",
    category: "Webinar",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274306548632301568" height="944" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "guha-web-ai",
    name: "Ai Enhanced Web Development Workshop",
    description: "Practical coding workshop using automated code completions, LLMs assistants, and building responsive dynamic platforms under 2x faster development rates.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=300&auto=format&fit=crop",
    issuer: "Guha Industrial Solutions",
    issuedAt: "2024-10-27T00:00:00Z",
    expiresAt: null,
    skills: ["AI Assistant Dev", "Vite React Structures", "Accelerated Coding", "Interactive Frontend"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7259036993626505216",
    category: "Workshop",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7259036993626505216" height="923" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "topengineers-ai",
    name: "Artificial Intelligence Workshop",
    description: "Intensive 1-day workshop detailing practical models in deep learning, CNN structures for computer vision, and model deployment templates.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop",
    issuer: "Top Engineers",
    issuedAt: "2024-10-19T00:00:00Z",
    expiresAt: null,
    skills: ["Deep Learning Models", "CNN Topologies", "Model Optimizers", "Computer Vision Labs"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7260664228485767168",
    category: "Workshop",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7260664228485767168" height="1196" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "topengineers-ml",
    name: "Machine Learning (ML) Workshop",
    description: "Hands-on machine learning training covering model tunings, regressions vs classification designs, hyperparameter optimizations, and data prep pipelines.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=300&auto=format&fit=crop",
    issuer: "Top Engineers",
    issuedAt: "2025-03-09T00:00:00Z",
    expiresAt: null,
    skills: ["Supervised ML", "Model Optimizations", "Data Sanitization", "Feature Selection Core"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7318444999904239616",
    category: "Workshop",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7318444999904239616" height="1112" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "tableau-nptel",
    name: "Data to Dashboard: Mastering Visual Storytelling with Tableau",
    description: "Professional training certified by NPTEL+ and instructed by Dr. Arjun V. Singar, focused on visual aesthetics dashboards layouts, storytelling data feeds, and enterprise reports in Tableau.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop",
    issuer: "NPTEL+ / Dr. Arjun V. Singar",
    issuedAt: "2025-11-09T00:00:00Z",
    expiresAt: null,
    skills: ["Tableau BI", "Visual Storytelling", "Calculated Fields", "Enterprise Dashboards"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_nptel-iitmadras-tableau-activity-7407529783565221888-pHaX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE5KXZoBYECZuF5ylHCTKUMSGHWDjORQot8",
    category: "Workshop"
  },
  {
    id: "hackquest-2k25",
    name: "HACKQUEST 2K25 - Cybersecurity Hackathon",
    description: "Competed in the regional cybersecurity hackathon, modeling secure software parameters, defense networks routing, and executing rapid defensive mock tests.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
    issuer: "Jamal Mohamed College & Cyberheals Academy",
    issuedAt: "2025-02-13T00:00:00Z",
    expiresAt: null,
    skills: ["Cybersecurity Tactics", "Defensive Routing", "Secure Code Audits", "Rapid Pitching"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7299847633844486145",
    category: "Hackathon",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7299847633844486145" height="1049" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "felicity-25",
    name: "Felicity '25 Hackathon",
    description: "Selected and competed in high-speed algorithmic tests, sandbox challenges, and full stack modular prototyping challenges issued by Unstop.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=300&auto=format&fit=crop",
    issuer: "Unstop",
    issuedAt: "2025-02-28T00:00:00Z",
    expiresAt: null,
    skills: ["Algorithmic Optimization", "Rapid Prototyping", "Cooperative Teamwork", "Sandboxes Dev"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_careergrowth-hackathon-unstopcertification-activity-7300360327035002883-TGwc?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE5KXZoBYECZuF5ylHCTKUMSGHWDjORQot8",
    category: "Hackathon"
  },
  {
    id: "hackquest-2k26",
    name: "HACKQUEST 2K26 - Cybersecurity Hackathon",
    description: "Advanced red/blue cybersecurity simulations, testing vulnerability shield modules, compiling network defense payloads, and winning recognition for defensive layouts.",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=300&auto=format&fit=crop",
    issuer: "Jamal Mohamed College & Cyberheals Academy",
    issuedAt: "2026-02-09T00:00:00Z",
    expiresAt: null,
    skills: ["Red Team Pentesting", "Vulnerability Shields", "Intrusion Detections", "Advanced Hacking sandboxes"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7434597157829107712",
    category: "Hackathon",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7434597157829107712" height="1070" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "gaotek-leader",
    name: "Best Leader of the Month",
    description: "Recognized as the Best Leader of the Month by GAOTek Inc. for exceptional squad management, mentoring distributed international intern developers, and shipping high-quality code assets.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop",
    issuer: "GAOTek Inc.",
    issuedAt: "2025-10-08T00:00:00Z",
    expiresAt: null,
    skills: ["Team Leadership", "Cross-Border Management", "Progress Tracking", "Deliveries Scheduling"],
    verificationUrl: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7386581852771381249",
    category: "Achievement",
    embedCode: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7386581852771381249" height="986" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
  },
  {
    id: "sinro-training",
    name: "AI & IOT Industrial Training",
    description: "Hands-on industrial technology training on the integration of artificial intelligence models, computer vision setups, and Internet of Things robot sensors configurations.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=300&auto=format&fit=crop",
    issuer: "Sinro Robotics",
    issuedAt: "2025-12-24T00:00:00Z",
    expiresAt: null,
    skills: ["AI & IoT Hardware", "Robot Kinematics", "Edge Sensor controls", "Systems integration"],
    verificationUrl: "https://sinrorobotics.com/",
    category: "Workshop"
  }
];

export const ACHIEVEMENTS_DATA: string[] = [
  "Awarded Best Leader of the Month at GAOTek Inc. for driving high-performance squad milestones",
  "Cleared National Levels 1, 2, and 3 of the prestigious Srinivasa Ramanujan Mathematical Competition 2024",
  "Vetted and promoted to Squad Leader at GAOTek Inc., managing teams across multiple international time zones",
  "Competed and pitched defensive modules at Jamal Mohamed College National HACKQUEST 2K25 & 2K26"
];

export const MILESTONES_DATA: MilestoneAchievement[] = [
  {
    id: "gaotek-leader-milestone",
    category: "Awards",
    title: "Best Leader of the Month",
    subtitle: "GAOTek Inc. Global Operations",
    date: "Oct 2025",
    description: "Recognized as the top squad leader among international interns. Supervised code merges, scheduled scrum sessions, mentored peer developers, and ensured high-fidelity deliveries of web solutions.",
    metrics: "Squad Lead of the Month",
    badgeName: "Elite Lead Developer",
    skillsUnlocked: ["Distributed Leadership", "Strategic Code Reviews", "Agile Management"],
    technologies: ["WordPress", "Elementor", "PHP", "GitHub", "XAMPP"],
    link: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7386581852771381249",
    trophyColor: "gold"
  },
  {
    id: "hackquest-2k26-milestone",
    category: "Hackathons",
    title: "National HACKQUEST 2K26 Hackathon",
    subtitle: "Jamal Mohamed College & Cyberheals",
    date: "Feb 2026",
    description: "Participated and compiled defensive routing configurations in the intensive national cyber-hackathon. Designed real-time vulnerability shields, pitched network topologies, and executed scanning diagnostics logs.",
    metrics: "National Finalist",
    badgeName: "Defensive Security Specialist",
    skillsUnlocked: ["Red Team Pentesting", "Vulnerability Shields", "Secure Systems"],
    technologies: ["Packet Tracer", "Log Auditing", "Network Protocols", "Bash"],
    link: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7434597157829107712",
    trophyColor: "purple"
  },
  {
    id: "ramanujan-competition",
    category: "Competitions",
    title: "Srinivasa Ramanujan Mathematical Competition",
    subtitle: "Indian Society for Technical Education",
    date: "Nov 2024",
    description: "Competed nationally and successfully cleared Level 1 (Chapter level), Level 2 (State level), and Level 3 (National Level) of the prestigious analytical logic & mathematical challenge.",
    metrics: "National Level Cleared",
    badgeName: "Mathematical Logic Master",
    skillsUnlocked: ["Logical Inferences", "Analytical Deductions", "Advanced Math"],
    technologies: ["Analytical Models", "Mathematical Logic", "Algorithmics"],
    link: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7275114747090321408",
    trophyColor: "gold"
  },
  {
    id: "gaotek-squad-leadership",
    category: "Leadership",
    title: "Promoted to Squad Leader & Web Lead",
    subtitle: "GAOTek Inc. Remote Squads",
    date: "May 2025",
    description: "Promoted to squad manager after demonstrating high performance, system architecture ownership, and elite communication. Successfully led a distributed global development team of interns.",
    metrics: "1 Distributed Team Led",
    badgeName: "Operational Squad Leader",
    skillsUnlocked: ["Team Management", "Task Delegation", "Mentorship"],
    technologies: ["WordPress", "Elementor", "Mailchimp", "Contact Form 7"],
    link: "https://github.com",
    trophyColor: "blue"
  },
  {
    id: "wadhwani-ignite-milestone",
    category: "Community",
    title: "Ignite Bootcamp Venture Accelerator",
    subtitle: "Wadhwani Foundation & Naan Mudhalvan",
    date: "May 2026",
    description: "Pioneered business modeling, MVP design layers, and target market financial setups under Naan Mudhalvan Niral Thiruvizha 3.0. Pitching custom business ideas directly to enterprise incubator portals.",
    metrics: "Accelerated Pitch Rating",
    badgeName: "Venture Innovator",
    skillsUnlocked: ["Business Strategy", "Incubation Blueprints", "Go-To-Market Plans"],
    technologies: ["Naan Mudhalvan Portal", "Venture Tools", "Pitch Decks", "Excel Models"],
    link: "https://www.linkedin.com/posts/sathiyamoorthi-k-336a79307_activity-7467997250833670146",
    trophyColor: "pink"
  }
];
