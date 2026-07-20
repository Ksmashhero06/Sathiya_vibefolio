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

  const themesList = [
    { id: "neutral", label: "Dark (Neutral)", dotClass: "bg-zinc-400" },
    { id: "purple", label: "Cyber Purple (Default)", dotClass: "bg-purple-500" },
    { id: "emerald", label: "Emerald Green", dotClass: "bg-emerald-500" },
    { id: "crimson", label: "Crimson Red", dotClass: "bg-red-500" },
    { id: "sky", label: "Sky Blue", dotClass: "bg-sky-400" },
    { id: "light", label: "Light Theme", dotClass: "bg-zinc-100 border border-zinc-300 dark:border-zinc-800" }
  ];

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
            ? "py-2 bg-zinc-950/75 dark:bg-[#030303]/70 backdrop-blur-xl border-zinc-900/60 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
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
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-white transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md">
              <div className="w-4 h-4 bg-black rounded-sm transform rotate-45 transition-transform duration-500 group-hover:rotate-90"></div>
              {/* Pulsing overlay ring */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-lg transition-all" />
            </div>
            <span className="font-sans font-bold text-sm tracking-wide text-zinc-800 dark:text-zinc-100 transition-colors">
              SATHIYA<span className="text-purple-500 animate-pulse">.</span>K
            </span>
          </button>

          {/* 2. Middle: Premium Nav Links with Animated Active Underline */}
          <nav className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/20 dark:bg-zinc-950/40 border border-zinc-900/60 backdrop-blur-sm relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white dark:text-white font-semibold"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {/* Underline or backdrop block following active item */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBarUnderline"
                      className="absolute inset-0 bg-white/10 dark:bg-zinc-800/60 rounded-full border border-zinc-700/30 dark:border-zinc-700/40 shadow-sm"
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
              <div className="hidden lg:flex items-center gap-1 absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-500 pointer-events-none tracking-widest uppercase opacity-70">
                <Command className="w-2 h-2" />
                <span>K to search</span>
              </div>
            </div>

            {/* Resume PDF Launcher - Compact on mobile, text on sm+ */}
            <a
              href="/resume.pdf"
              download="SATHIYAMOORTHI_K_Resume.pdf"
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3.5 sm:py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all text-xs font-mono text-purple-300 group shadow-sm shrink-0"
              title="Download CV"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline">Resume</span>
              <Download className="w-3 h-3 text-purple-300 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
            </a>

            {/* Elegant Custom Theme Switcher Dropdown */}
            <div className="relative" id="theme-switcher-dropdown">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                title="Select portfolio color theme"
              >
                <Palette className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Theme
                </span>
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <>
                    {/* Invisible backdrop to dismiss dropdown on click outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsThemeMenuOpen(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#030303] border border-zinc-200 dark:border-zinc-900 shadow-2xl p-2 z-50 text-left"
                    >
                      <div className="px-2 py-1.5 border-b border-zinc-100 dark:border-zinc-900 mb-1.5">
                        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-semibold">
                          Choose Accent Theme
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {themesList.map((t) => {
                          const isSelected = activeTheme === t.id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => {
                                setThemeAndPersist(t.id);
                                setIsThemeMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-sans transition-all text-left group cursor-pointer ${
                                isSelected
                                  ? "bg-purple-500/10 text-purple-400 font-semibold"
                                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-3.5 h-3.5 rounded-full shadow-inner block shrink-0 ${t.dotClass}`}
                                />
                                <span>{t.label}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light Rotating Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all shadow-sm cursor-pointer shrink-0"
              title="Toggle Dark/Light theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </button>

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
              className="xl:hidden absolute top-full left-0 w-full overflow-hidden bg-white/90 dark:bg-[#030303]/95 backdrop-blur-2xl border-b border-zinc-200 dark:border-zinc-900 shadow-2xl"
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
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border-l-4 border-purple-500"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile action row: Resume Download & Palette trigger */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    download="SATHIYAMOORTHI_K_Resume.pdf"
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold hover:bg-purple-500/15 transition-all text-center"
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
