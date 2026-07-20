import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Trophy,
  Sparkles,
  Star,
  Award,
  Terminal,
  Users,
  BookOpen,
  Compass,
  Code,
  GitMerge,
  ExternalLink,
  Calendar,
  ArrowUpRight,
  Target,
  ShieldCheck,
  Zap,
  CheckCircle,
  TrendingUp,
  Cpu
} from "lucide-react";
import { MILESTONES_DATA, UNIFIED_CREDENTIALS_DATA } from "../data";
import { MilestoneAchievement } from "../types";

// Animated counter component that triggers when scrolled into view
function CountUp({ end, suffix = "", duration = 1200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Cubic ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(startValue + easeProgress * (end - startValue)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono tracking-tight font-bold">
      {count}
      {suffix}
    </span>
  );
}

// Stunning SVG Custom Trophy component with floating sparkles and unique gradient themes
function PremiumTrophy({
  color = "gold",
  isHovered = false
}: {
  color?: "gold" | "silver" | "bronze" | "purple" | "blue" | "pink";
  isHovered?: boolean;
}) {
  const gradients = {
    gold: {
      primary: "from-amber-300 via-yellow-400 to-amber-600",
      secondary: "from-yellow-200 to-amber-500",
      glow: "rgba(251,191,36,0.3)",
      hex: "#fbbf24"
    },
    silver: {
      primary: "from-slate-200 via-zinc-300 to-slate-500",
      secondary: "from-white to-zinc-400",
      glow: "rgba(209,213,219,0.2)",
      hex: "#d1d5db"
    },
    bronze: {
      primary: "from-orange-300 via-amber-700 to-orange-800",
      secondary: "from-orange-200 to-amber-600",
      glow: "rgba(249,115,22,0.2)",
      hex: "#f97316"
    },
    purple: {
      primary: "from-purple-400 via-fuchsia-500 to-purple-700",
      secondary: "from-fuchsia-300 to-purple-500",
      glow: "rgba(168,85,247,0.3)",
      hex: "#a855f7"
    },
    blue: {
      primary: "from-blue-400 via-cyan-500 to-blue-700",
      secondary: "from-cyan-300 to-blue-500",
      glow: "rgba(59,130,246,0.3)",
      hex: "#3b82f6"
    },
    pink: {
      primary: "from-pink-400 via-rose-500 to-pink-700",
      secondary: "from-rose-300 to-pink-500",
      glow: "rgba(236,72,153,0.3)",
      hex: "#ec4899"
    }
  };

  const theme = gradients[color] || gradients.gold;

  // Render a beautifully crafted vector trophy with custom SVG sparkles
  return (
    <div className="relative flex items-center justify-center w-16 h-16 shrink-0 select-none">
      
      {/* Glow Halo behind trophy */}
      <div
        className="absolute inset-1.5 rounded-full blur-[24px] opacity-40 transition-all duration-500 scale-100 group-hover:scale-125"
        style={{
          background: `radial-gradient(circle, ${theme.hex} 0%, transparent 70%)`
        }}
      />

      {/* Floating Animated Sparkles */}
      <AnimatePresence>
        {(isHovered || true) && (
          <>
            {/* Top-Left Sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.4, 1, 0.4],
                x: isHovered ? -24 : -14,
                y: isHovered ? -24 : -14
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut"
              }}
              className="absolute pointer-events-none"
            >
              <Sparkles className="w-4.5 h-4.5" style={{ color: theme.hex }} />
            </motion.div>

            {/* Top-Right Sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.3, 0.9, 0.3],
                x: isHovered ? 26 : 16,
                y: isHovered ? -22 : -12
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                delay: 0.5,
                ease: "easeInOut"
              }}
              className="absolute pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: theme.hex }} />
            </motion.div>

            {/* Bottom-Right Sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.4, 0.85, 0.4],
                x: isHovered ? 22 : 12,
                y: isHovered ? 22 : 12
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                delay: 1.1,
                ease: "easeInOut"
              }}
              className="absolute pointer-events-none"
            >
              <Sparkles className="w-4 h-4" style={{ color: theme.hex }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Actual Vector Trophy */}
      <motion.svg
        viewBox="0 0 64 64"
        className="w-12 h-12 relative z-10"
        animate={isHovered ? {
          y: [0, -4, 0],
          rotate: [0, -3, 3, 0]
        } : {
          y: [0, -2, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          },
          rotate: {
            duration: 0.6,
            ease: "easeInOut"
          }
        }}
      >
        <defs>
          <linearGradient id={`trophy-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-1" style={{ stopColor: theme.hex }} />
            <stop offset="50%" className="stop-color-2" style={{ stopColor: "#ffffff" }} />
            <stop offset="100%" className="stop-color-3" style={{ stopColor: "rgb(15, 23, 42)" }} />
          </linearGradient>
          <radialGradient id={`base-grad-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: theme.hex, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(2, 6, 23)", stopOpacity: 1 }} />
          </radialGradient>
        </defs>

        {/* Handles */}
        <path
          d="M14 18c-3 0-5 2-5 5s2 8 5 8v-2c-2 0-3-1-3-4s1-3 3-3v-4zm36 0c3 0 5 2 5 5s-2 8-5 8v-2c2 0-3-1-3-4s-1-3-3-3v-4z"
          fill={theme.hex}
          opacity="0.85"
        />

        {/* Main Cup */}
        <path
          d="M16 14h32v12c0 8-6.5 14-14 14h-4c-7.5 0-14-6-14-14V14z"
          fill={`url(#trophy-grad-${color})`}
        />

        {/* Rim decoration */}
        <rect x="14" y="11" width="36" height="3" rx="1.5" fill={theme.hex} />

        {/* Stem / Connector */}
        <path d="M28 40h8v8h-8z" fill={theme.hex} opacity="0.9" />
        <path d="M24 45h16v3H24z" fill={theme.hex} />

        {/* Elegant marble-like base */}
        <path d="M18 48h28v6H18z" fill="#0c0a09" stroke={theme.hex} strokeWidth="1" />
        <path d="M22 51h20v2H22z" fill={theme.hex} opacity="0.5" />

        {/* Star Icon on the center of the cup */}
        <path
          d="M32 20l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z"
          fill="#0f172a"
          opacity="0.9"
        />
      </motion.svg>
    </div>
  );
}

// Interactive modern digital badge component for achievements
function BadgeWidget({
  title,
  criteria,
  icon: IconComponent,
  category,
  date,
  colorHex = "#a855f7"
}: {
  title: string;
  criteria: string;
  icon: React.ElementType;
  category: string;
  date: string;
  colorHex?: string;
  key?: any;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-44 [perspective:1000px] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Flipping card container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className="w-full h-full relative [transform-style:preserve-3d] duration-500"
      >
        {/* Front Face of the Badge */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md p-5 flex flex-col justify-between items-center text-center overflow-hidden">
          {/* Subtle glow ring background */}
          <div
            className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[30px] opacity-20 pointer-events-none"
            style={{ backgroundColor: colorHex }}
          />

          <div className="flex flex-col items-center space-y-2">
            {/* Animated Ring Wrapper for Icon */}
            <div
              className="p-3 rounded-full relative group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `radial-gradient(circle, ${colorHex}20 0%, ${colorHex}05 70%)`,
                border: `1px solid ${colorHex}30`
              }}
            >
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-15 pointer-events-none"
                style={{ backgroundColor: colorHex }}
              />
              <IconComponent className="w-5 h-5" style={{ color: colorHex }} />
            </div>

            <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
              {category}
            </span>
            <h4 className="text-xs font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight px-2">
              {title}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colorHex }} />
            <span>UNLOCKED {date}</span>
          </div>
        </div>

        {/* Back Face of the Badge (Revealing secrets/criteria) */}
        <div
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-lg p-5 flex flex-col justify-between"
          style={{
            boxShadow: `0 0 25px ${colorHex}15`
          }}
        >
          <div className="space-y-1.5 text-left">
            <span className="text-[8px] font-mono text-[var(--text-muted)] tracking-widest uppercase block">
              // BADGE CREDENTIAL
            </span>
            <h5 className="text-xs font-bold text-[var(--text-primary)] leading-tight">
              {title}
            </h5>
            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed font-sans mt-2">
              {criteria}
            </p>
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)]">
            <span>RATING: ELITE</span>
            <span style={{ color: colorHex }}>★ ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Real, verified credentials list provided by user (Cisco and IBM)
const REAL_BADGES_DATA = [
  {
    title: "Learn-A-Thon 2026",
    category: "Cisco",
    criteria: "Awarded for exceptional commitment to tech training and high-density active participation in the Cisco NetAcad global initiative.",
    icon: Trophy,
    date: "JUL 2026",
    colorHex: "#f59e0b"
  },
  {
    title: "Learn-A-Thon 2025",
    category: "Cisco",
    criteria: "Recognized for continuous mastery of core networking and cloud systems during the intensive annual learning sprints.",
    icon: Trophy,
    date: "JUL 2026",
    colorHex: "#eab308"
  },
  {
    title: "Analyze Reviews",
    category: "Apply AI",
    criteria: "Demonstrated skills in deploying AI classifiers, sentiment analysis logic, and extracting product value metrics from reviews.",
    icon: Cpu,
    date: "JUN 2026",
    colorHex: "#a855f7"
  },
  {
    title: "Update Your Resume",
    category: "Apply AI",
    criteria: "Validated practical mastery of prompt engineering, LLM persona design, and AI-assisted professional positioning.",
    icon: Sparkles,
    date: "JUN 2026",
    colorHex: "#ec4899"
  },
  {
    title: "Modern AI",
    category: "Cisco",
    criteria: "Mastered fundamental structures of deep neural network architectures, generative models, and ethical machine learning designs.",
    icon: Target,
    date: "JUN 2026",
    colorHex: "#3b82f6"
  },
  {
    title: "Cyber Threat",
    category: "Cisco",
    criteria: "Developed expertise in threat detection pipelines, network defense architectures, active containment, and incident response.",
    icon: ShieldCheck,
    date: "JUN 2026",
    colorHex: "#ef4444"
  },
  {
    title: "Endpoint Security",
    category: "Cisco",
    criteria: "Validated knowledge in configuring malware defenses, personal firewalls, OS hardening rules, and threat signatures auditing.",
    icon: Terminal,
    date: "JUN 2026",
    colorHex: "#14b8a6"
  },
  {
    title: "Network Defense",
    category: "Cisco",
    criteria: "Comprehensive competencies in setting up secure routers, active packet inspectors, VPN channels, and perimeter firewalls.",
    icon: ShieldCheck,
    date: "JUN 2026",
    colorHex: "#06b6d4"
  },
  {
    title: "Intro to Cyber",
    category: "Cisco",
    criteria: "Acquired fundamental concepts of critical threat defense, personal credentials protection, and safe digital operations rules.",
    icon: Award,
    date: "JUN 2026",
    colorHex: "#6366f1"
  },
  {
    title: "Modern AI Intro",
    category: "IBM SkillsBuild",
    criteria: "Verified core foundations of AI model structures, training paradigms, predictive logic, and technical application guidelines.",
    icon: Sparkles,
    date: "FEB 2026",
    colorHex: "#22c55e"
  },
  {
    title: "CCNA: ENSA",
    category: "Cisco",
    criteria: "Advanced training in configuring OSPF dynamic routing loops, security, and orchestrating enterprise automated channels.",
    icon: Terminal,
    date: "DEC 2025",
    colorHex: "#f43f5e"
  },
  {
    title: "CCNA: SRWE",
    category: "Cisco",
    criteria: "Mastered high-performance switching layouts, VLAN structures, WLAN deployments, trunking, and redundant pathways configurations.",
    icon: Code,
    date: "DEC 2025",
    colorHex: "#84cc16"
  },
  {
    title: "CCNA: Intro",
    category: "Cisco",
    criteria: "Gained core OSI and TCP/IP knowledge, network media standards, dynamic IP subnetting schemas, and routing basics.",
    icon: Compass,
    date: "JUN 2025",
    colorHex: "#e11d48"
  },
  {
    title: "Python for DS",
    category: "IBM",
    criteria: "Professional IBM credentials validating pandas/numpy operations, basic regression equations, and scientific libraries setups.",
    icon: TrendingUp,
    date: "APR 2025",
    colorHex: "#d946ef"
  }
];

export default function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<"All" | "Hackathons" | "Competitions" | "Awards" | "Leadership" | "Open Source" | "Community">("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredMilestones = MILESTONES_DATA.filter((m) => {
    if (activeTab === "All") return true;
    return m.category === activeTab;
  });

  // Unique colors for visual accents matching each category
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Hackathons":
        return { border: "hover:border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/5", glow: "rgba(245,158,11,0.06)", colorHex: "#f59e0b" };
      case "Competitions":
        return { border: "hover:border-yellow-500/30", text: "text-yellow-400", bg: "bg-yellow-500/5", glow: "rgba(234,179,8,0.06)", colorHex: "#eab308" };
      case "Awards":
        return { border: "hover:border-orange-500/30", text: "text-orange-400", bg: "bg-orange-500/5", glow: "rgba(249,115,22,0.06)", colorHex: "#f97316" };
      case "Leadership":
        return { border: "hover:border-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/5", glow: "rgba(168,85,247,0.06)", colorHex: "#a855f7" };
      case "Open Source":
        return { border: "hover:border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/5", glow: "rgba(59,130,246,0.06)", colorHex: "#3b82f6" };
      case "Community":
        return { border: "hover:border-pink-500/30", text: "text-pink-400", bg: "bg-pink-500/5", glow: "rgba(236,72,153,0.06)", colorHex: "#ec4899" };
      default:
        return { border: "hover:border-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/5", glow: "rgba(168,85,247,0.06)", colorHex: "#a855f7" };
    }
  };

  return (
    <section id="achievements" className="py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      {/* Background radial glowing mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/15">
            // ELITE RECOGNITIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white mt-4 mb-3">
            Milestones & <span className="gradient-text">achievements</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Chronological log of first-place hackathons, leadership efforts, and verified industry recognitions.
          </p>
        </div>

        {/* 1. Animated Stats Counter Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-300">
            <div className="absolute top-[-50%] left-[-50%] w-40 h-40 rounded-full bg-blue-500/5 blur-[40px] pointer-events-none" />
            <div className="flex items-start justify-between">
              <span className="text-[var(--text-muted)] text-[10px] font-mono uppercase tracking-wider block">TOTAL PROJECTS</span>
              <Code className="w-4 h-4 text-blue-400/80" />
            </div>
            <div className="text-3xl font-sans font-bold text-[var(--text-primary)] mt-3 flex items-baseline gap-1">
              <CountUp end={10} suffix="+" />
              <span className="text-xs font-mono font-normal text-blue-400">📁 Projects</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] font-sans mt-2.5">
              Successfully compiled and deployed full-stack web and game projects.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-300">
            <div className="absolute top-[-50%] left-[-50%] w-40 h-40 rounded-full bg-purple-500/5 blur-[40px] pointer-events-none" />
            <div className="flex items-start justify-between">
              <span className="text-[var(--text-muted)] text-[10px] font-mono uppercase tracking-wider block">GITHUB CONTRIBUTIONS</span>
              <GitMerge className="w-4 h-4 text-purple-400/80" />
            </div>
            <div className="text-3xl font-sans font-bold text-[var(--text-primary)] mt-3 flex items-baseline gap-1">
              <CountUp end={461} suffix="" />
              <span className="text-xs font-mono font-normal text-purple-400">🔥 Total</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] font-sans mt-2.5">
              Contributions growth: 1 in '24 &bull; 38 in '25 &bull; <span className="text-purple-400">422 in '26</span>.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-300">
            <div className="absolute top-[-50%] left-[-50%] w-40 h-40 rounded-full bg-amber-500/5 blur-[40px] pointer-events-none" />
            <div className="flex items-start justify-between">
              <span className="text-[var(--text-muted)] text-[10px] font-mono uppercase tracking-wider block">HACKATHONS PARTICIPATED</span>
              <Trophy className="w-4 h-4 text-amber-400/80" />
            </div>
            <div className="text-3xl font-sans font-bold text-[var(--text-primary)] mt-3 flex items-baseline gap-1">
              <CountUp end={5} suffix="+" />
              <span className="text-xs font-mono font-normal text-amber-500">🎮 Events</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] font-sans mt-2.5">
              Participated in global developer tournaments and security hackathons.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-elevated)] transition-all duration-300">
            <div className="absolute top-[-50%] left-[-50%] w-40 h-40 rounded-full bg-pink-500/5 blur-[40px] pointer-events-none" />
            <div className="flex items-start justify-between">
              <span className="text-[var(--text-muted)] text-[10px] font-mono uppercase tracking-wider block">VERIFIED CREDENTIALS</span>
              <Award className="w-4 h-4 text-pink-400/80" />
            </div>
            <div className="text-3xl font-sans font-bold text-[var(--text-primary)] mt-3 flex items-baseline gap-1">
              <CountUp end={UNIFIED_CREDENTIALS_DATA.length} suffix="" />
              <span className="text-xs font-mono font-normal text-pink-400">🏅 Badges</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] font-sans mt-2.5">
              Professional IT certifications issued via Cisco and IBM on Credly.
            </p>
          </div>
        </div>

        {/* 2. Interactive Badges Panel */}
        <div className="mb-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                Interactive Achievement Badges
              </span>
            </div>
            <a
              href="https://www.credly.com/users/sathiyamoorthi-k.fc4892da/badges/credly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-xs font-mono font-medium text-[var(--primary)] hover:text-[var(--text-inverse)] bg-[var(--primary)]/5 hover:bg-[var(--primary)] border border-[var(--primary)]/15 hover:border-[var(--primary)] rounded-lg transition-all duration-300 shadow-sm shadow-[var(--primary)]/5 cursor-pointer max-w-max"
            >
              <span>Verify all on Credly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {REAL_BADGES_DATA.map((badge, idx) => (
              <BadgeWidget
                key={idx}
                title={badge.title}
                category={badge.category}
                criteria={badge.criteria}
                icon={badge.icon as any}
                date={badge.date}
                colorHex={badge.colorHex}
              />
            ))}
          </div>
        </div>

        {/* Grid layout with Filter Bar and Timeline */}
        <div className="space-y-10">
          
          {/* Subheading + Filter System */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-5 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                Milestones & Timeline Log
              </span>
            </div>

            {/* Alternating Category Selectors */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--card)]/60 border border-[var(--border)] overflow-x-auto max-w-full no-scrollbar">
              {([
                "All",
                "Hackathons",
                "Competitions",
                "Awards",
                "Leadership",
                "Open Source",
                "Community"
              ] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer shrink-0 ${
                      isActive ? "text-[var(--text-inverse)] font-medium" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAchievementsFilter"
                        className="absolute inset-0 bg-[var(--primary)] rounded-lg border border-[var(--primary)] shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Alternating Scrolling Timeline & Milestone Cards */}
          <div className="relative">
            
            {/* Connecting Track Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500/35 via-pink-500/35 to-blue-500/35 transform -translate-x-1/2 pointer-events-none" />
            
            {/* Connecting Track Line (Mobile) */}
            <div className="block md:hidden absolute left-5 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500/35 via-pink-500/35 to-blue-500/35 pointer-events-none" />

            {/* List with Animated Alternating items */}
            <div className="space-y-16">
              <AnimatePresence mode="popLayout">
                {filteredMilestones.map((milestone, index) => {
                  const isEven = index % 2 === 0;
                  const theme = getCategoryTheme(milestone.category);
                  const isHovered = hoveredId === milestone.id;

                  return (
                    <motion.div
                      key={milestone.id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full"
                    >
                      {/* Timeline Central/Side Orb Node */}
                      <div className="absolute left-5 md:left-1/2 top-10 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                        <span
                          className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                          style={{ backgroundColor: theme.colorHex }}
                        />
                        <span
                          className="w-3 h-3 rounded-full bg-[var(--background)] border-2 flex items-center justify-center"
                          style={{ borderColor: theme.colorHex }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.colorHex }} />
                        </span>
                      </div>

                      {/* Alternating Card Container */}
                      <div
                        className={`w-full md:w-[calc(50%-2.5rem)] ${
                          isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                        } pl-12 md:pl-0`}
                      >
                        {/* High-Fidelity Glassmorphic Card */}
                        <div
                          onMouseEnter={() => setHoveredId(milestone.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          className={`relative group rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md p-5 sm:p-8 hover:bg-[var(--surface-elevated)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden ${theme.border}`}
                          style={{
                            boxShadow: isHovered
                              ? `0 0 35px ${theme.glow}`
                              : "none"
                          }}
                        >
                          {/* Inner Top Dynamic Laser Stripe */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(to right, ${theme.colorHex}, var(--primary), ${theme.colorHex})`
                            }}
                          />

                          {/* Top Card Layout: Icon, Badge, Category, Date */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
                            
                            <div className="flex items-center gap-4">
                              {/* Glowing Trophy Icon with dynamic hover feedback */}
                              <PremiumTrophy color={milestone.trophyColor} isHovered={isHovered} />

                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: theme.colorHex }}>
                                  {milestone.category}
                                </span>
                                <h3 className="text-base sm:text-lg font-sans font-medium text-[var(--text-primary)] mt-1 transition-colors leading-snug">
                                  {milestone.title}
                                </h3>
                                <span className="text-xs text-[var(--text-secondary)] block mt-0.5 font-sans">
                                  {milestone.subtitle}
                                </span>
                              </div>
                            </div>

                            {/* Date Badge */}
                            <div className="flex items-center gap-1.5 text-[9px] font-mono text-[var(--text-secondary)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full shrink-0 w-fit">
                              <Calendar className="w-3 h-3 text-purple-400" />
                              <span>{milestone.date}</span>
                            </div>

                          </div>

                          {/* Middle Card Layout: Narrative & Stats */}
                          <div className="mt-6 space-y-5">
                            
                            {/* Rich Narrative */}
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                              {milestone.description}
                            </p>

                            {/* Visual KPI / Metric Indicator */}
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                              <div className="p-1.5 rounded-lg bg-[var(--card)] flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                              </div>
                              <div>
                                <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                                  VERIFIED IMPACT / OUTCOME
                                </span>
                                <span className="text-sm font-sans font-bold text-[var(--text-primary)] tracking-tight">
                                  {milestone.metrics}
                                </span>
                              </div>
                            </div>

                            {/* Skills Unlocked (Interactive elements) */}
                            <div className="space-y-2">
                              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                                // COMPETENCY AREA UNLOCKED
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {milestone.skillsUnlocked.map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded"
                                  >
                                    ✦ {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Technologies Used */}
                            {milestone.technologies && milestone.technologies.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
                                  // RELEVANT DEV STACK
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {milestone.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--surface)]/60 border border-[var(--border)]/50 px-2 py-0.5 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>

                          {/* Footer Action Panel: Verification Link */}
                          {milestone.link && (
                            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                              <span className="text-[9px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                                <Cpu className="w-3 h-3 text-purple-400" />
                                Badge: <span className="text-[var(--text-secondary)] font-semibold">{milestone.badgeName}</span>
                              </span>

                              <a
                                href={milestone.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                              >
                                <span>Learn More</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
