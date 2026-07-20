import React, { useState, useEffect, useRef } from "react";
import { Search, Navigation, Terminal, ExternalLink, Moon, Sun, Monitor, HelpCircle, FileDown, MessageSquare } from "lucide-react";
import { CommandItem } from "../types";

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
  onThemeToggle: () => void;
  onChatbotToggle: () => void;
}

export default function CommandPalette({ onNavigate, onThemeToggle, onChatbotToggle }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    {
      id: "nav-hero",
      title: "Jump to Home / Hero",
      description: "Return to the top header profile",
      category: "Navigation",
      action: () => onNavigate("hero"),
      shortcut: ["G", "H"]
    },
    {
      id: "nav-about",
      title: "Jump to About Section",
      description: "Read about Sathiyamoorthi's background and bio",
      category: "Navigation",
      action: () => onNavigate("about"),
      shortcut: ["G", "A"]
    },
    {
      id: "nav-skills",
      title: "Jump to Skills Section",
      description: "Explore categorized technical expertise",
      category: "Navigation",
      action: () => onNavigate("skills"),
      shortcut: ["G", "S"]
    },
    {
      id: "nav-experience",
      title: "Jump to Experience Timeline",
      description: "View professional work history and achievements",
      category: "Navigation",
      action: () => onNavigate("experience"),
      shortcut: ["G", "E"]
    },
    {
      id: "nav-projects",
      title: "Jump to Projects Portfolio",
      description: "Examine featured and open-source applications",
      category: "Navigation",
      action: () => onNavigate("projects"),
      shortcut: ["G", "P"]
    },
    {
      id: "nav-credentials",
      title: "Jump to Credentials & Certifications",
      description: "Review academic and corporate milestones",
      category: "Navigation",
      action: () => onNavigate("credentials"),
      shortcut: ["G", "C"]
    },
    {
      id: "nav-achievements",
      title: "Jump to Milestones & Achievements",
      description: "Explore hackathons, competitions, awards, and open source badges",
      category: "Navigation",
      action: () => onNavigate("achievements"),
      shortcut: ["G", "R"]
    },
    {
      id: "nav-contact",
      title: "Jump to Contact",
      description: "Get in touch directly or schedule a consult",
      category: "Navigation",
      action: () => onNavigate("contact"),
      shortcut: ["G", "M"]
    },
    // Actions
    {
      id: "act-theme",
      title: "Toggle Light/Dark Theme",
      description: "Switch visual mode parameters",
      category: "Actions",
      action: () => onThemeToggle(),
      shortcut: ["T"]
    },
    {
      id: "act-chat",
      title: "Open Sathiya-AI Virtual Assistant",
      description: "Interact with the local Gemini chatbot model",
      category: "Actions",
      action: () => onChatbotToggle(),
      shortcut: ["C"]
    },
    {
      id: "act-resume",
      title: "Download Resume",
      description: "Retrieve comprehensive PDF documentation",
      category: "Actions",
      action: () => {
        // Trigger generic resume download mockup
        const link = document.createElement("a");
        link.href = "#";
        link.setAttribute("download", "SATHIYAMOORTHI_K_Resume.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      shortcut: ["R"]
    },
    // Social links
    {
      id: "soc-github",
      title: "Open GitHub Profile",
      description: "Visit @Ksmashhero06 on GitHub",
      category: "Socials",
      action: () => window.open("https://github.com/Ksmashhero06", "_blank", "noopener,noreferrer"),
      shortcut: ["S", "G"]
    },
    {
      id: "soc-linkedin",
      title: "Open LinkedIn Profile",
      description: "Connect on professional channels",
      category: "Socials",
      action: () => window.open("https://www.linkedin.com/in/sathiyamoorthi-k-336a79307/", "_blank", "noopener,noreferrer"),
      shortcut: ["S", "L"]
    },
    {
      id: "soc-twitter",
      title: "Open Twitter / X Feed",
      description: "Follow tech development snippets",
      category: "Socials",
      action: () => window.open("https://x.com/Ksmashhero06", "_blank", "noopener,noreferrer"),
      shortcut: ["S", "T"]
    }
  ];

  // Open / close keyboard triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle outside click to close
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      setIsOpen(false);
    }
  };

  // Filter commands based on search
  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside open palette
  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Navigation":
        return <Navigation className="w-4 h-4" style={{ color: 'var(--button-bg)' }} />;
      case "Actions":
        return <Terminal className="w-4 h-4 text-blue-450" style={{ color: 'var(--button-bg)' }} />;
      case "Socials":
        return <ExternalLink className="w-4 h-4 text-pink-450" style={{ color: 'var(--button-bg)' }} />;
      default:
        return <HelpCircle className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <>
      {/* Floating command pill shown on navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full glass text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-xs font-mono cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search actions...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 text-[10px] border border-zinc-800/60 shadow">
          Ctrl K
        </kbd>
      </button>

      {/* Small viewport collapsed search icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex xl:hidden items-center justify-center p-2 rounded-full border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all shadow-sm cursor-pointer shrink-0"
        title="Search actions"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Actual overlay modal */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={handleOutsideClick}
          className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-md flex justify-center items-start pt-[12vh] px-4"
        >
          <div
            onKeyDown={handlePaletteKeyDown}
            className="w-full max-w-lg bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Input area */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-[#030303]/40">
              <Search className="w-5 h-5 text-zinc-550 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or navigate..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 text-sm"
              />
              <kbd className="px-2 py-1 rounded bg-zinc-900 text-zinc-500 text-[10px] font-mono border border-zinc-800">
                ESC
              </kbd>
            </div>

            {/* Results body */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-zinc-900/40">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[var(--glow-color)] border-[var(--border-color)] text-white animate-pulse"
                          : "bg-transparent border border-transparent text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-zinc-950/40 border-[var(--border-color)]"
                              : "bg-zinc-950/20 border-zinc-850/50"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {item.description}
                          </div>
                        </div>
                      </div>

                      {/* Right shortcut / category metadata */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-850/60 bg-zinc-950/40 font-mono text-zinc-500">
                          {item.category}
                        </span>
                        {item.shortcut && (
                          <div className="flex gap-1">
                            {item.shortcut.map((key, i) => (
                              <kbd
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-500 text-[9px] font-mono border border-zinc-800"
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No actions found for "{search}"
                </div>
              )}
            </div>

            {/* Footer menu */}
            <div className="px-4 py-2 border-t border-zinc-800 bg-[#030303]/30 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="flex items-center gap-2">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
              <span>Command Menu</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
