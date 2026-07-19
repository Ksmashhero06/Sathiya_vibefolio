import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  Sparkles,
  Brain,
  Globe,
  Trophy,
  Cpu,
  ArrowRight,
  Code,
  TrendingUp,
  Workflow,
  X,
  Terminal,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import CaseStudyPage from "./CaseStudyPage";

type CategoryFilter = "ALL" | "AI" | "Web" | "Hackathon" | "Research" | "Featured";

interface FilterTab {
  id: CategoryFilter;
  label: string;
  icon: any;
}

const FILTER_TABS: FilterTab[] = [
  { id: "ALL", label: "All Projects", icon: Sparkles },
  { id: "Featured", label: "Featured SaaS", icon: Sparkles },
  { id: "AI", label: "Artificial Intelligence", icon: Brain },
  { id: "Web", label: "Web Applications", icon: Globe },
  { id: "Hackathon", label: "Hackathons", icon: Trophy },
  { id: "Research", label: "Research & Core", icon: Cpu },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Featured");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeCategory === "ALL") return true;
    return project.categories.includes(activeCategory);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
      case "Production":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Beta":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "Research":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "In Development":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse [animation-duration:12s]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse [animation-duration:8s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase bg-purple-500/5 px-3 py-1.5 rounded-full border border-purple-500/15">
            SaaS Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white mt-4 mb-3">
            Premium products & <span className="gradient-text">production services</span>
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            A selective deployment of cognitive web apps, low-latency search systems, and autonomous automation models.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {FILTER_TABS.map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-white border-white text-black font-semibold shadow-lg shadow-white/5"
                    : "glass text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-850/80 bg-zinc-950/40 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700/80 hover:bg-zinc-900/10 glow-card"
              >
                {/* Visual Glow Layer behind image */}
                <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                  {/* Image Container with zoom effect */}
                  <div className="relative w-full aspect-video overflow-hidden border-b border-zinc-900/60 bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                    {/* Status Badge */}
                    <span className={`absolute top-4 right-4 text-[9px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${getStatusColor(project.status)}`}>
                      {project.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer and tech tags */}
                <div className="p-5 pt-0 space-y-4">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900/60">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono text-zinc-500 bg-zinc-900/50 border border-zinc-850 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[9px] font-mono text-purple-400 bg-purple-500/5 border border-purple-500/15 px-2 py-0.5 rounded">
                        +{project.tags.length - 4} More
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveCaseStudy(project)}
                      className="text-xs font-semibold text-white group-hover:text-purple-400 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
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
                          className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
                          title="Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Core Case Study Immersive Overlay Portal */}
        <AnimatePresence>
          {activeCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#030303] overflow-y-auto"
            >
              <CaseStudyPage
                project={activeCaseStudy}
                onClose={() => setActiveCaseStudy(null)}
                onNavigate={(p) => setActiveCaseStudy(p)}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
