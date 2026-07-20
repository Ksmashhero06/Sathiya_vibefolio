import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Terminal,
  Search,
  ArrowRight,
  Sparkles,
  Command,
  FileText,
  Palette,
  Check
} from "lucide-react";
import CommandPalette from "./CommandPalette";
import AppearancePanel from "./AppearancePanel";

interface HeaderNavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeTheme: string;
  setThemeAndPersist: (newTheme: any) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
  toggleChatbot: () => void;
  navLinks: { id: string; label: string }[];
}

export default function HeaderNavbar({
  theme,
  toggleTheme,
  activeTheme,
  setThemeAndPersist,
  activeSection,
  scrollToSection,
  toggleChatbot,
  navLinks
}: HeaderNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Monitor scroll height to handle initial transparency vs glass blurred states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? "py-2 bg-[var(--card)]/90 backdrop-blur-xl border-[var(--border)] shadow-md"
            : "py-3.5 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* 1. Left Side: Brand Logo */}
          <button
            onClick={() => {
              scrollToSection("hero");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[var(--card)] border border-[var(--border)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md">
              <div className="w-4 h-4 bg-[var(--text-primary)] rounded-sm transform rotate-45 transition-transform duration-500 group-hover:rotate-90"></div>
              {/* Pulsing overlay ring */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary)]/20 rounded-lg transition-all" />
            </div>
            <span className="font-sans font-bold text-sm tracking-wide text-[var(--text-primary)] transition-colors">
              SATHIYA<span className="text-[var(--primary)] animate-pulse">.</span>K
            </span>
          </button>

          {/* 2. Middle: Premium Nav Links with Animated Active Underline */}
          <nav className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-[var(--background-secondary)]/50 border border-[var(--border)] backdrop-blur-sm relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {/* Underline or backdrop block following active item */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBarUnderline"
                      className="absolute inset-0 bg-[var(--card)] rounded-full border border-[var(--border)] shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right Side: Interactive Actions Palette */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Command Palette Widget */}
            <div className="relative">
              <CommandPalette
                onNavigate={scrollToSection}
                onThemeToggle={toggleTheme}
                onChatbotToggle={toggleChatbot}
              />
              {/* Floating micro key helper pill */}
              <div className="hidden lg:flex items-center gap-1 absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[var(--text-muted)] pointer-events-none tracking-widest uppercase opacity-70">
                <Command className="w-2 h-2" />
                <span>K to search</span>
              </div>
            </div>

            {/* Resume PDF Launcher - Compact on mobile, text on sm+ */}
            <a
              href="/resume.pdf"
              download="SATHIYAMOORTHI_K_Resume.pdf"
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3.5 sm:py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/40 transition-all text-xs font-mono text-[var(--primary)] group shadow-sm shrink-0"
              title="Download CV"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--primary)] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline">Resume</span>
              <Download className="w-3 h-3 text-[var(--primary)] opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
            </a>

            {/* Consolidated Premium Appearance Selector Panel */}
            <div className="relative animate-fade-in" id="appearance-panel-container">
              <button
                id="appearance-panel-trigger"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                title="Select appearance mode and accent color"
                aria-haspopup="dialog"
                aria-expanded={isThemeMenuOpen}
              >
                {theme === "light" ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
                <span className="hidden md:inline text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Appearance
                </span>
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <AppearancePanel
                    theme={theme}
                    setThemeMode={(mode) => {
                      if (theme !== mode) toggleTheme();
                    }}
                    activeTheme={activeTheme as any}
                    setThemeAndPersist={setThemeAndPersist}
                    onClose={() => setIsThemeMenuOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Morphing Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all shadow-sm"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                </motion.div>
              </AnimatePresence>
            </button>

          </div>
        </div>

        {/* 4. Full-Screen Glassmorphic Mobile Drawer (Staggered Entrance) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden absolute top-full left-0 w-full overflow-hidden bg-[var(--card)]/90 backdrop-blur-2xl border-b border-[var(--border)] shadow-2xl"
            >
              <div className="px-6 py-8 space-y-4 max-w-lg mx-auto">
                <div className="border-b border-zinc-200 dark:border-zinc-900 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    Navigation Panel
                  </span>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-500 bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    <span>SECURE CHANNELS</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => {
                          scrollToSection(link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-sans font-medium transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] font-bold border-l-4 border-[var(--primary)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background-secondary)]/50 hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile action row: Resume Download & Palette trigger */}
                <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    download="SATHIYAMOORTHI_K_Resume.pdf"
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/15 transition-all text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Curriculum Vitae (PDF)</span>
                  </a>

                  <div className="text-center">
                    <p className="text-[9px] font-mono text-zinc-400">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">Ctrl K</kbd> anywhere to activate commands.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacing node to ensure section offsets match the sticky header correctly */}
      <div className="h-14 w-full" />
    </>
  );
}
