import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UNIFIED_CREDENTIALS_DATA } from "../data";
import {
  Code,
  Brain,
  Globe,
  Trophy,
  Briefcase,
  Target,
  Sparkles,
  Award,
  BookOpen,
  Cpu,
  ChevronRight,
  ShieldCheck,
  Zap,
  ExternalLink,
} from "lucide-react";

// Interactive timeline events data
interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  techTags: string[];
  icon: any;
  color: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "programming",
    year: "2023",
    title: "Started Programming",
    subtitle: "Foundation & Self-Learning",
    description: "Began learning programming with Python and web technologies, building a strong foundation in software development through consistent self-learning and hands-on practice.",
    details: [
      "Mastered basic Python syntax and logical problem solving.",
      "Began coding HTML layouts and styling with CSS.",
      "Practiced building utility scripts and terminal workflows."
    ],
    techTags: ["Python", "HTML & CSS", "Algorithms", "Self-Learning"],
    icon: Code,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "learning_ai",
    year: "2024",
    title: "Learning AI",
    subtitle: "Machine Learning & Prompt Engineering",
    description: "Explored artificial intelligence, prompt engineering, and machine learning fundamentals. Started experimenting with AI tools and integrating them into practical projects.",
    details: [
      "Studied cognitive assistant architectures and prompt guidelines.",
      "Integrated Perplexity AI and other tools into personal routines.",
      "Built experimental AI-assisted apps with prompt-engineered routing."
    ],
    techTags: ["Perplexity API", "Prompt Engineering", "AI Integrations", "ML Basics"],
    icon: Brain,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "web_dev",
    year: "2024",
    title: "Web Development",
    subtitle: "Responsive Interfaces & WordPress",
    description: "Built responsive websites using HTML, CSS, JavaScript, and WordPress. Developed practical experience with Elementor, Astra, SEO, and modern web development workflows.",
    details: [
      "Engineered fully fluid layout structures using custom CSS and media queries.",
      "Designed highly functional pages on WordPress using Elementor and Astra.",
      "Optimized search engine visibility (SEO) and page speed metrics."
    ],
    techTags: ["WordPress", "Elementor", "Astra", "JavaScript", "HTML & CSS", "SEO"],
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "hackathons",
    year: "2025",
    title: "Hackathons & Projects",
    subtitle: "Collaborative Full-Stack Solutions",
    description: "Participated in hackathons and developed real-world projects, focusing on AI applications, legal technology, blockchain, and full-stack web solutions while collaborating in teams.",
    details: [
      "Co-created decentralized verification tools and legal AI interfaces.",
      "Acquired hands-on experience in team synchronization and project staging.",
      "Integrated smart contracts with React frontends in fast-paced tournaments."
    ],
    techTags: ["AI Applications", "Legal Tech", "Blockchain", "Full-Stack Dev"],
    icon: Trophy,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "internships",
    year: "2025",
    title: "Internships & Leadership",
    subtitle: "GAO Tek Development & Team Coordination",
    description: "Completed a Web Development internship at GAO Tek Inc., later taking on an Assistant Squad Leader role. Gained experience in WordPress development, team coordination, mentoring interns, and project execution. Also completed a Game Development internship, expanding software development experience across domains.",
    details: [
      "Led international squad developer interns, reviewing merges and tasks.",
      "Built and optimized company-wide WordPress platforms and plugins.",
      "Expanded coding capabilities to Unreal Engine 3, texturing and level design."
    ],
    techTags: ["WordPress", "Team Coordination", "Mentoring", "Unreal Engine 3"],
    icon: Briefcase,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "current_goals",
    year: "2026",
    title: "Current Goals",
    subtitle: "Strengthening Code & Deploying Solutions",
    description: "Seeking internship opportunities in Software Development, Artificial Intelligence, and Data Analytics. While I am still strengthening my programming skills, I have gained hands-on experience by building real-world projects using modern development tools, AI-assisted workflows, and industry technologies. My current focus is on improving my coding proficiency while delivering practical, scalable solutions.",
    details: [
      "Consolidating advanced full-stack programming and script models.",
      "Active in seeking next-level Software or Data Analytics roles.",
      "Publishing functional solutions designed for speed and clarity."
    ],
    techTags: ["Software Development", "Data Analytics", "AI-assisted Workflows"],
    icon: Target,
    color: "from-indigo-500 to-purple-500",
  },
];

// Animate counter component to count statistics gracefully when visible
function AnimatedCounter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse target number from string (e.g. "24+" -> 24)
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = target;
          if (end === 0) return;
          
          const increment = end / (60 * duration);
          const counterInterval = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(counterInterval);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(counterInterval);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>("current_goals");
  const selectedEvent = TIMELINE_EVENTS.find((e) => e.id === selectedTimelineId) || TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1];
  
  // Dynamic image resolution chain with automatic format checking
  const [portraitSrc, setPortraitSrc] = useState<string>("/developer_portrait.jpg");

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 border-b border-[var(--border)] relative scroll-mt-20 overflow-hidden">
      
      {/* Absolute Decorative Glow Mesh */}
      <div className="absolute top-[20%] left-[-15%] w-[400px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] bg-[var(--secondary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-[var(--primary)] tracking-widest uppercase bg-[var(--primary)]/5 px-3 py-1.5 rounded-full border border-[var(--primary)]/15">
            Operational History
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-[var(--text-primary)] mt-4 mb-3">
            The architect's journey & <span className="gradient-text">machine synthesis</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Unveiling the evolution of an engineer dedicated to fusing cognitive algorithms with pristine user experiences.
          </p>
        </div>

        {/* TOP LAYOUT: Photo + Story Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mb-16">
          
          {/* Left Side: Professional Photo / Avatar Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl p-[1px] bg-gradient-to-br from-[var(--border)] to-[var(--primary)]/10 overflow-hidden group">
              
              {/* Outer frame glow boundary */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Core card body with modern professional developer portrait fallback */}
              <div className="w-full h-full bg-[var(--card)] rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden">
                
                {/* Photo frame container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--background-secondary)]/50 flex items-center justify-center border border-[var(--border)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  {/* Photo image with referrerPolicy to prevent load restrictions */}
                  <img
                    src={portraitSrc}
                    onError={() => {
                      if (portraitSrc === "/developer_portrait.jpg") {
                        setPortraitSrc("/developer_portrait.png");
                      } else if (portraitSrc === "/developer_portrait.png") {
                        setPortraitSrc("/developer_portrait.jpeg");
                      } else if (portraitSrc === "/developer_portrait.jpeg") {
                        setPortraitSrc("/developer_portrait.webp");
                      } else if (portraitSrc !== "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600") {
                        setPortraitSrc("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600");
                      }
                    }}
                    alt="SATHIYAMOORTHI K - Professional Developer Portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Absolute active overlays */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] px-3 py-1 rounded-full text-[10px] font-mono font-medium text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>SYSTEM CORE ONLINE</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                    <span className="text-[9px] font-mono text-[var(--primary)] tracking-wider uppercase block">
                      Full-Stack & Game Developer
                    </span>
                    <h4 className="text-sm font-semibold text-[#ffffff] mt-0.5">SATHIYAMOORTHI K</h4>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: The Story / Bio Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] block mb-2">
                // GRADUATE CONTEXT
              </span>
              <h3 className="text-2xl font-sans font-medium text-[var(--text-primary)] tracking-tight leading-tight">
                IT Graduate leveraging full-stack web development, cloud technologies, AI/ML, and Unreal Engine to compile robust digital solutions.
              </h3>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              I am an Information Technology graduate with a strong foundation in modern web architectures, game design workflows, and smart integrations. Over my training and remote collaborations, I have focused on writing highly optimized code, designing fluid responsive user interfaces, and organizing robust backend databases using Python, Flask, and Unreal Engine.
            </p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              My passion lies in continuous learning and applying analytical problem-solving skills to complex system challenges. From managing distributed intern teams as a Web Squad Lead to competing in national hackathons and math competitions, I am dedicated to producing high-quality deliverables that drive real-world impact.
            </p>

            {/* Core Competency Tags - High contrast accent backgrounds with always white text */}
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[var(--primary)] border border-[var(--primary)] text-[var(--text-inverse)] font-medium shadow-sm">
                &lt;Full-Stack Web&gt;
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[var(--primary)] border border-[var(--primary)] text-[var(--text-inverse)] font-medium shadow-sm">
                &lt;Unreal Engine 3&gt;
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[var(--primary)] border border-[var(--primary)] text-[var(--text-inverse)] font-medium shadow-sm">
                &lt;Junior Data Analyst&gt;
              </span>
            </div>
          </div>

        </div>

        {/* EDUCATION SEGMENT */}
        <div className="max-w-4xl mx-auto mb-16 border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
            <div>
              <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest bg-[var(--primary)]/5 px-2.5 py-1 rounded-full border border-[var(--primary)]/15">
                // ACADEMIC FOUNDATION
              </span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mt-2.5 flex items-center gap-2">
                Education & Under Graduation
              </h3>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs font-mono bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] px-3 py-1.5 rounded-xl font-semibold">
                🎓 2023 – 2027
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            <div className="md:col-span-7 space-y-3">
              <div>
                <h4 className="text-base font-semibold text-[var(--text-primary)]">B.Tech – Information Technology</h4>
                <a 
                  href="https://ifet.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[var(--primary)] hover:opacity-80 font-medium inline-flex items-center gap-1.5 transition-colors mt-1 group/link"
                >
                  <span>IFET College of Engineering, Villupuram</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
              
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Pursuing comprehensive training in Applied System Design, Database Structures, and Software Methodologies, actively bridging technical models with modern application setups.
              </p>
            </div>

            <div className="md:col-span-5 space-y-2.5 bg-[var(--surface)] p-4.5 rounded-2xl border border-[var(--border)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Academic Focus
              </span>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="text-[var(--primary)] mt-0.5">●</span>
                  <span>Focus on applied development & system design</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="text-[var(--primary)] mt-0.5">●</span>
                  <span>Active in project-driven learning</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="text-[var(--primary)] mt-0.5">●</span>
                  <span>Strong base in programming and data systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Animated Statistics Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          
          {/* Stat 1: Projects */}
          <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-6 rounded-2xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-wider">
                Total Projects
              </span>
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
                <Code className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                <AnimatedCounter value="10+" />
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono leading-tight">
                Deployed full-stack systems
              </p>
            </div>
          </div>

          {/* Stat 2: Certifications */}
          <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-6 rounded-2xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-wider">
                Certifications
              </span>
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                <AnimatedCounter value={`${UNIFIED_CREDENTIALS_DATA.length}`} />
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono leading-tight">
                Verified developer credentials
              </p>
            </div>
          </div>

          {/* Stat 3: Hackathons */}
          <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-6 rounded-2xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-wider">
                Hackathons Participated
              </span>
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                <AnimatedCounter value="5+" />
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono leading-tight">
                Global tournaments & summits
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: INTERACTIVE SCROLLING TIMELINE */}
        <div className="space-y-8 max-w-4xl mx-auto">
          
          <div className="text-center md:text-left">
            <span className="text-xs font-mono text-[var(--primary)] tracking-wider">
              [ TIMELINE_INDEXER ]
            </span>
            <h3 className="text-lg font-medium text-[var(--text-primary)] tracking-tight mt-1">
              Select timeline node to inspect structural phases
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Timeline Left Menu Nodes: Scroll & Selection */}
            <div className="md:col-span-5 space-y-2.5">
              {TIMELINE_EVENTS.map((event, index) => {
                const isActive = event.id === selectedTimelineId;
                const EventIcon = event.icon;

                return (
                  <motion.button
                    key={event.id}
                    onClick={() => setSelectedTimelineId(event.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all relative cursor-pointer ${
                      isActive
                        ? "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] shadow-md"
                        : "bg-[var(--card)] border border-[var(--border)]/60 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    {/* Glowing Left Border Marker */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-[var(--primary)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3 pl-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                        isActive
                          ? "bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]"
                          : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]"
                      }`}>
                        <EventIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)]">{event.title}</div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">{event.year}</div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "transform translate-x-1 text-[var(--primary)]" : "text-[var(--text-muted)]"
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Timeline Right Details Panel with Rich Animations */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTimelineId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Glowing background matrix effect */}
                  <div className="absolute top-[-10%] right-[-10%] w-48 h-48 rounded-full bg-[var(--primary)]/5 blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[var(--primary)] font-semibold bg-[var(--primary)]/10 px-2.5 py-1 rounded-full border border-[var(--primary)]/20">
                          YEAR {selectedEvent.year}
                        </span>
                        <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-3 leading-tight">
                          {selectedEvent.title}
                        </h4>
                        <span className="text-xs text-[var(--text-secondary)] font-mono block mt-1">
                          {selectedEvent.subtitle}
                        </span>
                      </div>
                      
                      <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg">
                        {(() => {
                          const CustomIcon = selectedEvent.icon;
                          return <CustomIcon className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                    </div>

                    {/* Main Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {selectedEvent.description}
                    </p>

                    {/* Rich Chronology Milestones */}
                    <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                      <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider block">
                        Milestones & Deliverables
                      </span>
                      {selectedEvent.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                          <ShieldCheck className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack used in this era */}
                  <div className="mt-8 pt-5 border-t border-[var(--border)]">
                    <span className="text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-wider block mb-3">
                      Core Stack // Focus Area
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEvent.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] flex items-center gap-1 hover:text-[var(--text-primary)] hover:border-[var(--primary)] transition-colors"
                        >
                          <Zap className="w-2.5 h-2.5 text-[var(--primary)]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
