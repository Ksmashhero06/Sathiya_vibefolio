import React from "react";
import { motion } from "motion/react";
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Heart,
  Sparkles,
  Command,
  Code2,
  Cpu,
  Layers,
  ChevronUp
} from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
  navLinks: { id: string; label: string }[];
}

export default function Footer({ scrollToSection, navLinks }: FooterProps) {
  // Smoothly scroll back to the hero section (top)
  const handleScrollToTop = () => {
    scrollToSection("hero");
  };

  return (
    <footer className="relative bg-[var(--background-secondary)] border-t border-[var(--border)] overflow-hidden py-10 md:py-12">
      
      {/* Subtle background animated gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 via-[var(--secondary)]/2 to-transparent pointer-events-none" />
      
      {/* Decorative Laser light accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/35 to-transparent animate-pulse" />
      <div className="absolute top-0 left-10 w-44 h-44 rounded-full bg-[var(--primary)]/5 blur-[50px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-10 w-64 h-64 rounded-full bg-[var(--secondary)]/5 blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top block: Brand, tagline, back to top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-8 border-b border-[var(--border)]/60 items-start">
          
          {/* Logo & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="relative w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-[var(--text-primary)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md">
                <div className="w-3.5 h-3.5 bg-[var(--background)] rounded-sm transform rotate-45" />
              </div>
              <span className="font-sans font-bold text-sm tracking-wide text-[var(--text-primary)]">
                SATHIYA<span className="text-[var(--primary)]">.</span>K
              </span>
            </button>
            
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans max-w-sm">
              Engineering autonomous AI agentic workflows, low-latency node networks, and beautiful high-fidelity software architectures for tomorrow's paradigm.
            </p>
 
            {/* Micro active system state indicator */}
            <div className="flex items-center gap-2 font-mono text-[9px] text-[var(--text-muted)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>ALL COGNITIVE NETWORKS ONLINE // v1.0.4</span>
            </div>
          </div>
 
          {/* Quick Nav links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block">
              // SITE INDEX
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left focus:outline-none flex items-center gap-1 group"
                  >
                    <span className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Social connection channels (4 cols) */}
          <div className="md:col-span-4 space-y-4 md:text-right">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest block md:text-right">
              // EXTERNAL CONNECTIONS
            </span>
            
            <div className="flex flex-wrap gap-2.5 md:justify-end">
              <a
                href="https://github.com/Ksmashhero06"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--button-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--button-text)] hover:text-[var(--button-text-hover)] hover:border-[var(--primary)] hover:bg-[var(--button-hover)] transition-all cursor-pointer shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sathiyamoorthi-k-336a79307/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--button-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--button-text)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--button-hover)] transition-all cursor-pointer shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/kkssathiyamoorthi06/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--button-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--button-text)] hover:text-pink-400 hover:border-[var(--primary)] hover:bg-[var(--button-hover)] transition-all cursor-pointer shadow-sm"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Ksmashhero06"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--button-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--button-text)] hover:text-sky-450 hover:border-[var(--primary)] hover:bg-[var(--button-hover)] transition-all cursor-pointer shadow-sm"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] font-sans leading-relaxed">
              Available for technical consulting & high-fidelity architecture design worldwide.
            </p>
          </div>

        </div>

        {/* Bottom block: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Core Built With Details */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-[11px] font-sans text-[var(--text-muted)]">
              © {new Date().getFullYear()} SATHIYAMOORTHI K. All rights reserved.
            </span>
            <div className="hidden sm:block w-[1px] h-3.5 bg-[var(--border)]" />
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              <span>using</span>
              <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>React</span>
                <span>•</span>
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Tailwind</span>
                <span>•</span>
                <Layers className="w-3.5 h-3.5 text-pink-400" />
                <span>Framer</span>
              </div>
            </div>
          </div>

          {/* Premium Animated Back to Top Button */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)] border border-[var(--border)] text-xs font-mono shadow-md transition-all cursor-pointer"
            title="Return to topmost section"
          >
            <span>Back to Top</span>
            <div className="p-1 rounded bg-black/40 text-[var(--button-text)]/80 group-hover:text-[var(--primary)] transition-colors">
              <ChevronUp className="w-3.5 h-3.5 group-hover:translate-y-[-1px] transition-transform" />
            </div>
          </motion.button>

        </div>

      </div>
    </footer>
  );
}
