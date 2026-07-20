import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Check, X, Sparkles } from "lucide-react";

interface AppearancePanelProps {
  theme: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  activeTheme: "neutral" | "purple" | "emerald" | "crimson" | "sky";
  setThemeAndPersist: (newTheme: "neutral" | "purple" | "emerald" | "crimson" | "sky") => void;
  onClose: () => void;
}

// Highly precise color palettes reflecting the actual application CSS vars
const themesMeta = {
  neutral: {
    label: "Neutral",
    color: "#71717a",
    light: { bg: "#f4f4f5", card: "#ffffff", primary: "#18181b" },
    dark: { bg: "#09090b", card: "#18181b", primary: "#f4f4f5" }
  },
  purple: {
    label: "Purple",
    color: "#a855f7",
    light: { bg: "#faf5ff", card: "#ffffff", primary: "#a855f7" },
    dark: { bg: "#090514", card: "#120d24", primary: "#a855f7" }
  },
  emerald: {
    label: "Emerald",
    color: "#22c55e",
    light: { bg: "#f0fdf4", card: "#ffffff", primary: "#10b981" },
    dark: { bg: "#030a05", card: "#0a1c10", primary: "#22c55e" }
  },
  crimson: {
    label: "Crimson",
    color: "#ef4444",
    light: { bg: "#fff5f5", card: "#ffffff", primary: "#ef4444" },
    dark: { bg: "#0a0202", card: "#1f090b", primary: "#ef4444" }
  },
  sky: {
    label: "Sky Blue",
    color: "#3b82f6",
    light: { bg: "#f0f9ff", card: "#ffffff", primary: "#0369a1" },
    dark: { bg: "#030712", card: "#0f1b35", primary: "#0ea5e9" }
  }
} as const;

export default function AppearancePanel({
  theme,
  setThemeMode,
  activeTheme,
  setThemeAndPersist,
  onClose
}: AppearancePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trapping and advanced keyboard navigation list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (!panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Tab key loop
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }

      // Arrow navigation
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const activeIdx = Array.from(focusableElements).indexOf(document.activeElement as any);
        if (activeIdx > -1) {
          const nextIdx = (activeIdx + 1) % focusableElements.length;
          (focusableElements[nextIdx] as HTMLElement).focus();
          e.preventDefault();
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const activeIdx = Array.from(focusableElements).indexOf(document.activeElement as any);
        if (activeIdx > -1) {
          const prevIdx = (activeIdx - 1 + focusableElements.length) % focusableElements.length;
          (focusableElements[prevIdx] as HTMLElement).focus();
          e.preventDefault();
        }
      }
    };

    // Auto-focus the close button or first action button for clear a11y focus context
    setTimeout(() => {
      if (panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll("button");
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, 100);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Only trigger if we aren't clicking on the theme switcher trigger itself
        const trigger = document.getElementById("appearance-panel-trigger");
        if (trigger && trigger.contains(e.target as Node)) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const currentThemeMeta = themesMeta[activeTheme];
  const activeColorCode = currentThemeMeta.color;

  const renderContent = () => (
    <div className="flex flex-col text-left space-y-5">
      {/* 1. Header Section */}
      <div className="flex items-start justify-between pb-3.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div>
          <h3 className="text-sm font-sans font-semibold text-zinc-900 dark:text-zinc-50">
            Appearance
          </h3>
          <p className="text-[11px] font-sans text-zinc-500 dark:text-zinc-400 mt-0.5">
            Customize your experience
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          aria-label="Close configuration panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Appearance Mode Setting Cards */}
      <div>
        <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-3">
          Mode
        </h4>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Appearance Mode">
          {/* Light Mode Card */}
          <button
            onClick={() => setThemeMode("light")}
            role="radio"
            aria-checked={theme === "light"}
            style={{
              borderColor: theme === "light" ? activeColorCode : undefined,
              boxShadow: theme === "light" ? `0 0 14px ${activeColorCode}1c` : undefined
            }}
            className={`relative flex flex-col items-start p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 outline-none ${
              theme === "light"
                ? "bg-zinc-50/80 dark:bg-zinc-900/40 text-zinc-950 font-medium"
                : "bg-transparent border-zinc-200/60 dark:border-zinc-800/50 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30"
            } focus-visible:ring-2 focus-visible:ring-[var(--primary)]`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <Sun className={`w-5 h-5 ${theme === "light" ? "text-amber-500" : "text-zinc-400"}`} />
              {theme === "light" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activeColorCode }}
                >
                  <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                </motion.div>
              )}
            </div>
            <span className="text-xs font-semibold block text-zinc-800 dark:text-zinc-200">Light</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Bright interface</span>
          </button>

          {/* Dark Mode Card */}
          <button
            onClick={() => setThemeMode("dark")}
            role="radio"
            aria-checked={theme === "dark"}
            style={{
              borderColor: theme === "dark" ? activeColorCode : undefined,
              boxShadow: theme === "dark" ? `0 0 14px ${activeColorCode}1c` : undefined
            }}
            className={`relative flex flex-col items-start p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 outline-none ${
              theme === "dark"
                ? "bg-zinc-50/80 dark:bg-zinc-900/40 text-white font-medium"
                : "bg-transparent border-zinc-200/60 dark:border-zinc-800/50 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30"
            } focus-visible:ring-2 focus-visible:ring-[var(--primary)]`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <Moon className={`w-5 h-5 ${theme === "dark" ? "text-indigo-400" : "text-zinc-400"}`} />
              {theme === "dark" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activeColorCode }}
                >
                  <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                </motion.div>
              )}
            </div>
            <span className="text-xs font-semibold block text-zinc-800 dark:text-zinc-200">Dark</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Low-light interface</span>
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 my-1" />

      {/* 3. Accent Colors Grid */}
      <div>
        <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-3">
          Accent Color
        </h4>
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Accent Color Palette">
          {Object.entries(themesMeta).map(([id, item]) => {
            const isSelected = activeTheme === id;
            const previewColors = theme === "dark" ? item.dark : item.light;
            
            return (
              <button
                key={id}
                onClick={() => setThemeAndPersist(id as any)}
                role="radio"
                aria-checked={isSelected}
                style={{
                  borderColor: isSelected ? item.color : undefined,
                  boxShadow: isSelected ? `0 4px 12px ${item.color}15` : undefined
                }}
                className={`relative flex flex-col p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-300 outline-none group ${
                  isSelected
                    ? "bg-zinc-50/60 dark:bg-zinc-900/30 text-zinc-950 dark:text-white font-semibold"
                    : "bg-transparent border-zinc-200/60 dark:border-zinc-800/40 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30 hover:-translate-y-0.5"
                } focus-visible:ring-2 focus-visible:ring-[var(--primary)]`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Outer circle with scale transition */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div
                      className="w-3.5 h-3.5 rounded-full shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: id === "neutral"
                          ? `linear-gradient(135deg, ${previewColors.primary} 0%, #a1a1aa 100%)`
                          : item.color
                      }}
                    >
                      {isSelected && (
                        <Check className="w-2 h-2 text-white stroke-[3px]" />
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-sans font-medium">{item.label}</span>
                </div>

                {/* Mini preview strip represent background / card / primary accent element */}
                <div 
                  className="h-4 w-full rounded-md flex overflow-hidden border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900 shadow-xs"
                >
                  <div className="w-2/5 h-full transition-colors duration-300" style={{ backgroundColor: previewColors.bg }} />
                  <div className="w-2/5 h-full border-l border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-300 relative flex items-center justify-center" style={{ backgroundColor: previewColors.card }}>
                    {/* Small inner element mimicking an active text line */}
                    <div className="h-0.5 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <div className="w-1/5 h-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: previewColors.primary }}>
                    {/* Visual active dot indicator */}
                    <div className="w-1 h-1 rounded-full bg-white/70" />
                  </div>
                </div>

                {/* Animated Ring Indicator around Selected Accent Card */}
                {isSelected && (
                  <motion.div
                    layoutId="activeAccentRing"
                    className="absolute inset-[-1.5px] rounded-xl border-1.5 pointer-events-none"
                    style={{ borderColor: item.color }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Real-time Live Preview Card */}
      <div className="pt-1.5">
        <div className="flex items-center gap-1 mb-2.5">
          <Sparkles className="w-3 h-3 text-[var(--primary)]" />
          <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            Live Preview
          </h4>
        </div>

        <div 
          style={{ backgroundColor: theme === "dark" ? currentThemeMeta.dark.bg : currentThemeMeta.light.bg }}
          className="rounded-2xl p-4 border border-zinc-200/60 dark:border-zinc-800/60 transition-all duration-300 shadow-inner relative overflow-hidden"
        >
          {/* Mock app dashboard wrapper */}
          <div className="flex flex-col space-y-3 relative z-10">
            {/* Header / Top strip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeColorCode }} />
                <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-zinc-400 dark:text-zinc-500">
                  Portfolio Engine
                </span>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
            </div>

            {/* Main grid containing mock content cards */}
            <div 
              style={{ backgroundColor: theme === "dark" ? currentThemeMeta.dark.card : currentThemeMeta.light.card }}
              className="rounded-xl p-3 border border-zinc-200/40 dark:border-zinc-800/30 transition-all duration-300 shadow-sm flex flex-col space-y-2"
            >
              {/* Fake text headings */}
              <div className="space-y-1">
                <div 
                  className={`text-[11px] font-sans font-bold leading-tight ${
                    theme === "light" ? "text-zinc-900" : "text-white"
                  }`}
                >
                  Interactive Redesign Complete
                </div>
                <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-sans leading-relaxed">
                  WCAG contrast verified. High-performance design tokens applied instantly.
                </div>
              </div>

              {/* Fake Interactive Accent Buttons & Badges */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-1.5">
                  <span 
                    style={{ backgroundColor: `${activeColorCode}15`, color: activeColorCode }}
                    className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded-full"
                  >
                    Active Accent
                  </span>
                  <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/40">
                    2026 Edition
                  </span>
                </div>

                <button
                  disabled
                  style={{ backgroundColor: activeColorCode }}
                  className="text-[9px] text-white font-medium px-2.5 py-1 rounded-lg transition-transform scale-95 shadow-sm"
                >
                  Action
                </button>
              </div>
            </div>
          </div>

          {/* Abstract light/dark glow pattern on the background corner */}
          <div 
            className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full blur-xl pointer-events-none opacity-40 transition-colors duration-300" 
            style={{ backgroundColor: activeColorCode }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile & Tablet Modal Structure */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end sm:items-center justify-center">
          {/* Modal Container */}
          <motion.div
            ref={panelRef}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full bg-[var(--card)] border-t sm:border border-zinc-200/80 dark:border-zinc-900 p-6 shadow-2xl rounded-t-[24px] sm:rounded-[24px] max-w-[420px] sm:mx-4 overflow-hidden relative"
          >
            {/* Grabber indicator for Mobile bottom sheet */}
            <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full mx-auto mb-5 sm:hidden" />
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* 2. Desktop Anchored Popover */}
      <div className="hidden lg:block">
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 mt-3 w-[400px] rounded-[24px] bg-[var(--card)] border border-zinc-200/80 dark:border-zinc-900 shadow-2xl p-5 z-50 backdrop-blur-xl"
        >
          {renderContent()}
        </motion.div>
      </div>
    </>
  );
}
