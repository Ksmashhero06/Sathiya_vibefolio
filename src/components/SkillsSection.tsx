import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Brain,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  Users,
  Terminal,
  Zap,
  Layers,
  Sparkles,
  Award,
  Settings,
  Workflow,
  Compass,
} from "lucide-react";
import { SKILLS_DATA } from "../data";
import { Skill } from "../types";

type CategoryType = "ALL" | "Programming" | "AI" | "Frontend" | "Backend" | "Databases" | "Cloud" | "Tools" | "Soft Skills";

interface CategoryTab {
  id: CategoryType;
  label: string;
  icon: any;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "ALL", label: "All Skills", icon: Sparkles },
  { id: "Programming", label: "Programming", icon: Code },
  { id: "AI", label: "Artificial Intel.", icon: Brain },
  { id: "Frontend", label: "Frontend", icon: Layout },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "Databases", label: "Databases", icon: Database },
  { id: "Cloud", label: "Cloud Platforms", icon: Cloud },
  { id: "Tools", label: "Developer Tools", icon: Wrench },
  { id: "Soft Skills", label: "Soft Skills", icon: Users },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<CategoryType>("ALL");

  const filteredSkills = activeTab === "ALL"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((skill) => skill.category === activeTab);

  // Map specific icons to skills or categories dynamically
  const getSkillIcon = (skillName: string, category: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("typescript")) return Code;
    if (name.includes("python")) return Code;
    if (name.includes("c++") || name.includes("rust")) return Terminal;
    
    if (name.includes("agentic") || name.includes("orchestration")) return Brain;
    if (name.includes("rag") || name.includes("vector")) return Layers;
    if (name.includes("fine-tuning") || name.includes("pytorch")) return Sparkles;
    
    if (name.includes("react") || name.includes("next")) return Layout;
    if (name.includes("tailwind")) return Layers;
    if (name.includes("motion") || name.includes("canvas") || name.includes("three")) return Compass;
    
    if (name.includes("node") || name.includes("express")) return Server;
    if (name.includes("fastapi") || name.includes("flask")) return Zap;
    if (name.includes("graphql") || name.includes("grpc")) return Workflow;
    
    if (name.includes("postgre") || name.includes("sql")) return Database;
    if (name.includes("mongo")) return Database;
    if (name.includes("redis")) return Zap;
    if (name.includes("pinecone")) return Layers;
    
    if (name.includes("gcp") || name.includes("run")) return Cloud;
    if (name.includes("aws") || name.includes("lambda")) return Cloud;
    if (name.includes("docker") || name.includes("kubernetes")) return Settings;
    
    if (name.includes("git") || name.includes("github")) return Terminal;
    if (name.includes("vite")) return Zap;
    if (name.includes("prompt")) return Wrench;
    
    if (name.includes("system design")) return Workflow;
    if (name.includes("leadership")) return Award;
    if (name.includes("collaboration")) return Users;
    
    // Fallback category mapping
    switch (category) {
      case "Programming": return Code;
      case "AI": return Brain;
      case "Frontend": return Layout;
      case "Backend": return Server;
      case "Databases": return Database;
      case "Cloud": return Cloud;
      case "Tools": return Wrench;
      case "Soft Skills": return Users;
      default: return Sparkles;
    }
  };

  // Category gradients for subtle styling highlights
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Programming": return "text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10 dark:bg-blue-500/5";
      case "AI": return "text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10 dark:bg-purple-500/5";
      case "Frontend": return "text-pink-600 dark:text-pink-400 border-pink-500/20 bg-pink-500/10 dark:bg-pink-500/5";
      case "Backend": return "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5";
      case "Databases": return "text-violet-600 dark:text-violet-400 border-violet-500/20 bg-violet-500/10 dark:bg-violet-500/5";
      case "Cloud": return "text-sky-600 dark:text-sky-400 border-sky-500/20 bg-sky-500/10 dark:bg-sky-500/5";
      case "Tools": return "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10 dark:bg-amber-500/5";
      case "Soft Skills": return "text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10 dark:bg-rose-500/5";
      default: return "text-zinc-600 dark:text-zinc-400 border-zinc-500/20 bg-zinc-500/10 dark:bg-zinc-500/5";
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      
      {/* Absolute Decorative Glow Mesh inside skills section */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-purple-900/5 rounded-full blur-[110px] pointer-events-none animate-pulse [animation-duration:10s]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[380px] h-[380px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-duration:14s] [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-[var(--primary)] tracking-widest uppercase bg-[var(--primary)]/5 px-3 py-1.5 rounded-full border border-[var(--primary)]/15">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-[var(--text-primary)] mt-4 mb-3">
            Core capabilities & <span className="gradient-text">technological depth</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Meticulously structured stack configured for high-performance agent alignment, sub-second indexing, and elegant UI delivery.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {CATEGORY_TABS.map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[var(--button-bg)] border-[var(--button-bg)] text-[var(--button-text)] font-semibold shadow-lg scale-105"
                    : "bg-[var(--card)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/50"
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Grid with Framer Motion layout transition */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const SkillIcon = getSkillIcon(skill.name, skill.category);
              const themeStyles = getCategoryTheme(skill.category);

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] flex flex-col justify-between min-h-[13.5rem] h-auto transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Header: Icon + Experience badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-8.5 h-8.5 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 ${themeStyles}`}>
                        <SkillIcon className="w-4 h-4" />
                      </div>
                      
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-[var(--text-secondary)] bg-[var(--background-secondary)]/50 px-2.5 py-1 rounded-full border border-[var(--border)]">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Body: Title */}
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight mt-4 group-hover:text-[var(--primary)] transition-colors">
                      {skill.name}
                    </h3>
                    
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block mt-1 mb-1">
                      {skill.category}
                    </span>
                  </div>

                  {/* Footer: Projects Used pill grid */}
                  <div className="border-t border-[var(--border)] pt-3 mt-4">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                      Project Applications
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {skill.projectsUsed.map((proj) => (
                        <span
                          key={proj}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--background-secondary)]/80 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/50 transition-colors"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Animated grid stats summary footer */}
        <div className="mt-12 text-center max-w-xl mx-auto p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--text-secondary)] font-mono flex items-center justify-center gap-2 animate-fade-in">
          <Zap className="w-4 h-4 text-[var(--primary)] animate-pulse" />
          <span>Active filter represents {filteredSkills.length} highly integrated production-grade capability units</span>
        </div>

      </div>
    </section>
  );
}
