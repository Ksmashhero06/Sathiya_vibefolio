import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Calendar,
  Sparkles,
  Terminal,
  Activity,
  ChevronLeft,
  ChevronRight,
  Users,
  Compass,
  Target,
  Lightbulb,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { EXPERIENCE_DATA } from "../data";

export default function ExperienceSection() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handlePrevImage = (id: string, images: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = carouselIndices[id] || 0;
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    setCarouselIndices({ ...carouselIndices, [id]: nextIndex });
  };

  const handleNextImage = (id: string, images: string[], e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = carouselIndices[id] || 0;
    const nextIndex = (currentIndex + 1) % images.length;
    setCarouselIndices({ ...carouselIndices, [id]: nextIndex });
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/15">
            // CAREER CHRONOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white mt-4 mb-3">
            Professional trajectory & <span className="gradient-text">achievements</span>
          </h2>
          <p className="text-sm text-zinc-400">
            An interactive, high-fidelity chronology of delivering enterprise solutions, leading distributed web squads, and designing immersive 3D architectures.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative w-full">
          
          {/* Central Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500/40 via-indigo-500/40 to-pink-500/40 transform -translate-x-1/2 pointer-events-none" />
          
          {/* Side Connecting Line (Mobile) */}
          <div className="block md:hidden absolute left-4 top-4 bottom-4 w-[1px] bg-gradient-to-b from-purple-500/40 via-indigo-500/40 to-pink-500/40 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((exp, index) => {
              const expId = exp.company + exp.role;
              const isEven = index % 2 === 0;
              const isExpanded = expandedCardId === expId;
              const activeImageIdx = carouselIndices[expId] || 0;

              return (
                <div key={expId} className="relative w-full">
                  
                  {/* Timeline Orb */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                    {/* Glowing outer ring */}
                    <span className="absolute inset-0 rounded-full bg-purple-500/10 border border-purple-500/30 animate-pulse" />
                    {/* Inner core */}
                    <span className="w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-purple-400 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                    </span>
                  </div>

                  {/* Scrolling Motion Card Wrapper */}
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.1,
                    }}
                    className={`w-full md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                    } pl-12 md:pl-0`}
                  >
                    {/* Interactive Glass Card with Elevation & Glow */}
                    <div className="relative group overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/10 backdrop-blur-md p-6 sm:p-8 hover:border-purple-500/30 hover:bg-zinc-900/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] transition-all duration-300">
                      
                      {/* Interactive Top Laser Light Strip */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Header Section */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-zinc-900/60">
                        <div>
                          <h3 className="text-lg font-sans font-medium tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono text-purple-400 font-medium tracking-wide mt-1 block">
                            {exp.company}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 bg-zinc-950/50 border border-zinc-850 px-3 py-1 rounded-full self-start sm:self-center">
                          <Calendar className="w-3 h-3 text-purple-400" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      {/* Card Content Stack */}
                      <div className="mt-6 space-y-6">
                        
                        {/* Summary Description */}
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {exp.description}
                        </p>

                        {/* Responsibilities Subsection */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="space-y-3">
                            <span className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                              <Activity className="w-3 h-3 text-zinc-600" />
                              // CORE RESPONSIBILITIES
                            </span>
                            <ul className="space-y-2">
                              {exp.responsibilities.slice(0, 4).map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                                  <span className="text-purple-500/80 font-mono mt-0.5 select-none">—</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                              {exp.responsibilities.length > 4 && !isExpanded && (
                                <li className="text-[10px] text-zinc-500 font-mono italic pl-4">
                                  + {exp.responsibilities.length - 4} more responsibilities inside...
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Technologies Used Subsection */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="space-y-2.5 pt-1">
                            <span className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                              <Terminal className="w-3 h-3 text-zinc-600" />
                              // TECH STACK
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] font-mono text-zinc-400 bg-zinc-950/60 border border-zinc-900 px-2.5 py-1 rounded-md group-hover:border-purple-500/20 group-hover:text-zinc-200 transition-colors duration-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Deep-Dive Expansion Controls */}
                        {(exp.aboutCompany || exp.carouselImages || exp.leadershipOutcomes || (exp.responsibilities && exp.responsibilities.length > 4)) && (
                          <div className="pt-2">
                            <button
                              onClick={() => toggleExpand(expId)}
                              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-900/60 hover:bg-zinc-950 hover:border-purple-500/20 text-xs font-mono text-purple-400 hover:text-purple-300 transition-all duration-300 cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 font-semibold">
                                <Cpu className="w-3.5 h-3.5 animate-pulse text-purple-400" />
                                {isExpanded ? "COLLAPSE WORK DETAILS" : "DEEP-DIVE INSIGHTS"}
                              </span>
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        )}

                        {/* Dynamic Collapsible Detailed Panels */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden space-y-6 pt-2"
                            >
                              {/* Extra Responsibilities (that were sliced above) */}
                              {exp.responsibilities && exp.responsibilities.length > 4 && (
                                <div className="space-y-2 border-t border-zinc-900 pt-4">
                                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                                    // ADDITIONAL COMPLETED ACTIONS
                                  </span>
                                  <ul className="space-y-2">
                                    {exp.responsibilities.slice(4).map((resp, rIdx) => (
                                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                                        <span className="text-purple-500/80 font-mono mt-0.5 select-none">—</span>
                                        <span>{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Unreal Engine Playable Prototype Images */}
                              {exp.carouselImages && exp.carouselImages.length > 0 && (
                                <div className="space-y-3">
                                  <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                    <Layers className="w-3 h-3 text-purple-400" />
                                    // PROJECT ENVIRONMENT PREVIEW
                                  </span>
                                  
                                  <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-850 group/carousel">
                                    <img
                                      src={exp.carouselImages[activeImageIdx]}
                                      alt={`${exp.company} level design visual ${activeImageIdx + 1}`}
                                      className="w-full h-full object-cover transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                    
                                    {/* Chevron Left */}
                                    <button
                                      onClick={(e) => handlePrevImage(expId, exp.carouselImages!, e)}
                                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                                    >
                                      <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {/* Chevron Right */}
                                    <button
                                      onClick={(e) => handleNextImage(expId, exp.carouselImages!, e)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100"
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </button>

                                    {/* Title & Carousel Dots */}
                                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                      <span className="text-[10px] font-mono text-zinc-300">
                                        Unreal 3D Lighting Setup #{activeImageIdx + 1}
                                      </span>
                                      <div className="flex gap-1">
                                        {exp.carouselImages.map((_, idx) => (
                                          <span
                                            key={idx}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                                              idx === activeImageIdx ? "bg-purple-400 w-3" : "bg-zinc-600"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Technical Learnings / Key Focus */}
                              {exp.technicalLearnings && (
                                <div className="space-y-2 border-t border-zinc-900 pt-4">
                                  <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                    <Lightbulb className="w-3.5 h-3.5 text-zinc-600" />
                                    // TECHNICAL LEARNINGS
                                  </span>
                                  <div className="grid grid-cols-1 gap-2">
                                    {exp.technicalLearnings.map((learning, idx) => (
                                      <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-900/60 text-xs text-zinc-300 flex items-start gap-2">
                                        <span className="text-purple-400 font-mono font-bold">{idx + 1}.</span>
                                        <span>{learning}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* About Zapster Custom Sidebar style inside card */}
                              {exp.aboutCompany && (
                                <div className="space-y-3 border-t border-zinc-900 pt-4">
                                  <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                    <Compass className="w-3.5 h-3.5 text-zinc-600" />
                                    // CONTEXT: {exp.company.split(" ")[0].toUpperCase()}
                                  </span>
                                  <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-zinc-950/40 p-3 rounded-xl border border-zinc-900/60">
                                    {exp.aboutCompany}
                                  </p>
                                  
                                  {exp.keyFocusAreas && (
                                    <div className="space-y-1.5 pl-1">
                                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">KEY FOCUS AREAS:</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {exp.keyFocusAreas.map((focus) => (
                                          <span key={focus} className="text-[10px] font-sans text-zinc-300 bg-zinc-900/60 border border-zinc-850 px-2.5 py-1 rounded-md">
                                            {focus}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {exp.roleImpact && (
                                    <div className="space-y-1.5 pl-1 pt-1">
                                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">MY ROLE IMPACT:</span>
                                      <p className="text-xs text-zinc-300 leading-relaxed italic border-l border-purple-500/40 pl-3">
                                        "{exp.roleImpact}"
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Leadership Outcomes (GAOTek Specific) */}
                              {exp.leadershipOutcomes && (
                                <div className="space-y-3 border-t border-zinc-900 pt-4">
                                  <span className="flex items-center gap-1 text-[9px] font-mono text-purple-400 uppercase tracking-widest">
                                    <Users className="w-3.5 h-3.5 text-purple-400" />
                                    // LEADERSHIP OUTCOMES
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {exp.leadershipOutcomes.map((outcome, idx) => (
                                      <div key={idx} className="p-3 bg-purple-500/[0.02] border border-purple-500/10 rounded-xl flex items-start gap-2.5">
                                        <Users className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                                        <span className="text-xs text-zinc-300 font-sans leading-relaxed">{outcome}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Core Skills Applied (GAOTek Specific) */}
                              {exp.coreSkillsApplied && (
                                <div className="space-y-2 border-t border-zinc-900 pt-4">
                                  <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                    <Target className="w-3.5 h-3.5 text-zinc-600" />
                                    // CORE SKILLS APPLIED
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {exp.coreSkillsApplied.map((skill) => (
                                      <span key={skill} className="text-[10px] font-mono text-purple-300 bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-lg">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Key Achievements (Fallback or generic milestones) */}
                              {exp.achievements && exp.achievements.length > 0 && (
                                <div className="space-y-3 border-t border-zinc-900 pt-4">
                                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-purple-400/80 uppercase tracking-widest">
                                    <Sparkles className="w-3 h-3 text-purple-400/80" />
                                    // KEY MILESTONES & RESULTS
                                  </span>
                                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                                    {exp.achievements.map((ach, aIdx) => (
                                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                                        <Sparkles className="w-3.5 h-3.5 text-pink-400 mt-0.5 shrink-0" />
                                        <span className="font-sans font-medium">{ach}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
