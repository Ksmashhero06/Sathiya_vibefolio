import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Check, X } from "lucide-react";

interface AppearancePanelProps {
  theme: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  activeTheme: "neutral" | "purple" | "emerald" | "crimson" | "sky";
  setThemeAndPersist: (newTheme: "neutral" | "purple" | "emerald" | "crimson" | "sky") => void;
  onClose: () => void;
}

export default function AppearancePanel({
  theme,
  setThemeMode,
  activeTheme,
  setThemeAndPersist,
  onClose
}: AppearancePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trapping and keyboard navigation list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (!panelRef.current) return;

      // Find all focusable elements inside the panel
      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Handle tab-based focus trapping
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

      // Handle Arrow key navigation
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

    // Auto-focus the first element in the modal for accessibility
    setTimeout(() => {
      if (panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll("button");
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, 50);

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

  const accentsList = [
    { id: "neutral", label: "Neutral", color: "#71717a", swatchClass: "bg-gradient-to-br from-zinc-100 to-zinc-500 dark:from-zinc-300 dark:to-zinc-600 border border-zinc-300 dark:border-zinc-500" },
    { id: "purple", label: "Purple", color: "#A855F7", swatchClass: "bg-[#A855F7]" },
    { id: "emerald", label: "Emerald", color: "#22C55E", swatchClass: "bg-[#22C55E]" },
    { id: "crimson", label: "Crimson", color: "#EF4444", swatchClass: "bg-[#EF4444]" },
    { id: "sky", label: "Sky Blue", color: "#3B82F6", swatchClass: "bg-[#3B82F6]" }
  ] as const;

  const renderContent = () => (
    <div className="flex flex-col text-left">
      {/* Title / Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Appearance
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          aria-label="Close settings"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. Mode Settings */}
      <div className="mb-5">
        <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-3">
          Mode
        </h4>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Appearance Mode">
          {/* Light button */}
          <button
            onClick={() => setThemeMode("light")}
            role="radio"
            aria-checked={theme === "light"}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all border outline-none ${
              theme === "light"
                ? "bg-zinc-100 border-zinc-300 dark:border-zinc-700 text-zinc-950 shadow-sm font-semibold focus:ring-2 focus:ring-[var(--primary)]"
                : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light</span>
          </button>

          {/* Dark button */}
          <button
            onClick={() => setThemeMode("dark")}
            role="radio"
            aria-checked={theme === "dark"}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all border outline-none ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 text-white shadow-inner font-semibold focus:ring-2 focus:ring-[var(--primary)]"
                : "bg-transparent border-transparent text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Dark</span>
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 my-2" />

      {/* 2. Accent Colors settings */}
      <div className="mt-2">
        <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-3">
          Accent Color
        </h4>
        <div className="space-y-1.5" role="radiogroup" aria-label="Accent Color">
          {accentsList.map((acc) => {
            const isSelected = activeTheme === acc.id;
            return (
              <button
                key={acc.id}
                onClick={() => setThemeAndPersist(acc.id)}
                role="radio"
                aria-checked={isSelected}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-sans transition-all text-left outline-none cursor-pointer group border ${
                  isSelected
                    ? "bg-zinc-100/60 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white font-semibold"
                    : "bg-transparent border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                } focus-visible:ring-2 focus-visible:ring-[var(--primary)]`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatch circle with check inside */}
                  <div className="relative flex items-center justify-center">
                    {/* Ring wrapper for animated border when selected */}
                    {isSelected && (
                      <motion.div
                        layoutId="selectedSwatchRing"
                        className="absolute inset-[-4px] rounded-full border-2 border-[var(--primary)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 shrink-0 ${acc.swatchClass}`}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            acc.id === "neutral"
                              ? "text-zinc-950 dark:text-zinc-900"
                              : "text-white"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  <span>{acc.label}</span>
                </div>

                {/* Optional side check indicator in the theme's color */}
                {isSelected && (
                  <Check className="w-4 h-4 text-[var(--primary)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile & Tablet Modal Structure */}
      <div className="lg:hidden">
        {/* Backdrop overlay */}
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center">
          {/* Centered Modal for Tablet, Bottom Sheet for Mobile */}
          <motion.div
            ref={panelRef}
            initial={{
              y: "100%",
              opacity: 0.5,
              scale: 1
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              y: "100%",
              opacity: 0.5,
              scale: 1
            }}
            // On screen sizes >= 640px (tablet), we transition to centered modal layout via CSS,
            // so we define custom responsive transitions.
            className="w-full bg-white dark:bg-[#0d0d11] border-t sm:border border-zinc-200 dark:border-zinc-900 p-6 shadow-2xl rounded-t-3xl sm:rounded-2xl max-w-sm sm:mx-4 overflow-hidden relative"
          >
            {/* Grabber indicator for Mobile bottom sheet */}
            <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full mx-auto mb-5 sm:hidden" />
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* 2. Desktop Anchored Popover (renders relative to HeaderNavbar trigger parent) */}
      <div className="hidden lg:block">
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-0 mt-2 w-72 rounded-2xl bg-white/95 dark:bg-[#0d0d11]/95 border border-zinc-200 dark:border-zinc-900 shadow-2xl p-4 z-50 backdrop-blur-xl"
        >
          {renderContent()}
        </motion.div>
      </div>
    </>
  );
}
