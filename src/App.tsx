import { useState, useEffect } from "react";
import {
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  FileText,
  MousePointer2,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Brain,
  Zap,
  HelpCircle,
  Code
} from "lucide-react";

// Import modular custom components
import AnimatedBackground from "./components/AnimatedBackground";
import AIChatbot from "./components/AIChatbot";
import CommandPalette from "./components/CommandPalette";
import HeaderNavbar from "./components/HeaderNavbar";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import CertificationsAchievements from "./components/CertificationsAchievements";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import AnimatedTyping from "./components/AnimatedTyping";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import AnimatedCursor from "./components/AnimatedCursor";

export type ThemeOption = "neutral" | "purple" | "emerald" | "crimson" | "sky" | "light";

export default function App() {
  const [activeTheme, setActiveTheme] = useState<"neutral" | "purple" | "emerald" | "crimson" | "sky">(() => {
    const savedFamily = localStorage.getItem("portfolio-theme-family");
    if (savedFamily && ["neutral", "purple", "emerald", "crimson", "sky"].includes(savedFamily)) {
      return savedFamily as any;
    }
    const legacy = localStorage.getItem("portfolio-theme");
    if (legacy && legacy !== "light" && ["neutral", "purple", "emerald", "crimson", "sky"].includes(legacy)) {
      return legacy as any;
    }
    return "purple";
  });
  
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">(() => {
    const savedMode = localStorage.getItem("portfolio-theme-mode");
    if (savedMode && ["dark", "light", "system"].includes(savedMode)) {
      return savedMode as any;
    }
    return "system";
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        setTheme(mediaQuery.matches ? "dark" : "light");
      };
      handleChange();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setTheme(themeMode);
    }
  }, [themeMode]);

  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  // Set theme selection and persist to localStorage
  const setThemeAndPersist = (newTheme: "neutral" | "purple" | "emerald" | "crimson" | "sky") => {
    setActiveTheme(newTheme);
    localStorage.setItem("portfolio-theme-family", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const setThemeModeAndPersist = (mode: "dark" | "light" | "system") => {
    setThemeMode(mode);
    localStorage.setItem("portfolio-theme-mode", mode);
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    const nextMode = theme === "dark" ? "light" : "dark";
    setThemeModeAndPersist(nextMode);
  };

  useEffect(() => {
    const combined = `${activeTheme}-${theme}`;
    document.documentElement.setAttribute("data-theme", combined);
    document.documentElement.setAttribute("data-theme-family", activeTheme);
    document.documentElement.setAttribute("data-theme-mode", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [activeTheme, theme]);

  // Trigger chatbot toggle externally (e.g. from command palette)
  const toggleChatbot = () => {
    const chatBtn = document.querySelector("#ai-chatbot-widget button") as HTMLButtonElement;
    if (chatBtn) chatBtn.click();
  };

  // Handle scroll progress and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Identify active viewport section
      const sections = ["hero", "about", "skills", "experience", "projects", "credentials", "achievements", "contact"];
      const scrollPosition = window.scrollY + 250; // Offset for triggers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "credentials", label: "Credentials" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div 
      className={theme === "light" ? "light-mode" : ""} 
      data-theme={`${activeTheme}-${theme}`}
      data-theme-family={activeTheme}
      data-theme-mode={theme}
    >
      
      {/* Premium Noise Overlay Texture */}
      <div className="noise-overlay" />

      {/* Scroll Progress Meter */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Embedded Ambient Background Engine */}
      <AnimatedBackground />

      {/* Sticky Premium Navbar */}
      <HeaderNavbar
        theme={theme}
        themeMode={themeMode}
        setThemeMode={setThemeModeAndPersist}
        toggleTheme={toggleTheme}
        activeTheme={activeTheme}
        setThemeAndPersist={setThemeAndPersist}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        toggleChatbot={toggleChatbot}
        navLinks={navLinks}
      />

      {/* Main Content Area */}
      <main className="relative">
        
        {/* HERO SECTION */}
        <section
          id="hero"
          className="min-h-screen min-h-[100svh] lg:min-h-0 lg:h-[calc(100vh-3.5rem)] lg:h-[calc(100svh-3.5rem)] flex flex-col justify-center relative border-b border-[var(--border)] overflow-hidden"
        >
          {/* Ambient glowing orb meshes inside background */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[var(--secondary)]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-6 relative flex flex-col justify-between items-center h-full">
            
            {/* Status indicator pill */}
            <div className="w-full flex justify-center pb-2 pt-1">
              <div className="inline-flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] w-fit px-3.5 py-1.5 rounded-full text-[11px] font-medium text-[var(--text-secondary)] mx-auto animate-fade-in shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
                </span>
                <span>Available for enterprise consultations & elite contracts</span>
              </div>
            </div>

            {/* Premium Headline with Name, Title & Typing Effect - Grouped & Compacted */}
            <div className="w-full flex flex-col items-center justify-center my-auto space-y-4 max-w-4xl">
              <div className="space-y-1 w-full">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[var(--primary)] uppercase font-semibold block animate-pulse">
                  SATHIYAMOORTHI K &bull; FULL-STACK DEVELOPER & GAME DESIGNER
                </span>
                <h1 className="text-[clamp(1.75rem,5.5vw,3rem)] sm:text-[clamp(2.5rem,5.2vw,4rem)] lg:text-[clamp(2.5rem,4.5vw,4.5rem)] font-display font-bold tracking-tight text-[var(--text-primary)] max-w-4xl mx-auto leading-[1.15] break-words">
                  Developing systems for <br className="hidden sm:inline" />
                  <AnimatedTyping words={[
                    "responsive web design",
                    "unreal engine gaming",
                    "smart contract validation",
                    "seamless API integration"
                  ]} />
                </h1>
              </div>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm md:text-[15px] max-w-[700px] mx-auto leading-[1.7] px-4">
                Information Technology student at IFET College of Engineering with hands-on experience building AI-powered and full-stack web applications. Passionate about artificial intelligence, computer vision, automation, and solving real-world problems through technology.
              </p>

              {/* Quick Action Buttons & Social Icons - Wraps/stacks gracefully */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto w-full pt-1">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)] px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Initiate Consult</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="w-full sm:w-auto border border-[var(--border)] bg-[var(--surface)] px-5 py-2 rounded-xl font-medium text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Terminal className="w-4 h-4 text-[var(--primary)] animate-pulse" />
                  <span>Explore Projects</span>
                </button>
                
                {/* Vertical divider on desktop */}
                <div className="hidden sm:block w-px h-5 bg-[var(--border)] mx-1" />

                {/* Social icons integrated directly into hero actions */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap justify-center">
                  <a
                    href="https://github.com/Ksmashhero06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sathiyamoorthi-k-336a79307/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/Ksmashhero06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    title="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/kkssathiyamoorthi06/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Section: Compact Metrics and Scroll Indicator */}
            <div className="w-full flex flex-col items-center mt-auto pt-4 border-t border-[var(--border)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl w-full">
                <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-3 rounded-xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
                  <span className="text-[var(--text-muted)] text-[9px] font-semibold uppercase tracking-wider">Projects Built</span>
                  <div className="text-xl sm:text-2xl font-bold mt-0.5 text-[var(--text-primary)]">10+</div>
                  <div className="w-full h-1 bg-[var(--border)]/60 rounded-full mt-2 overflow-hidden">
                    <div className="w-full h-full bg-[var(--primary)] transition-all duration-500 group-hover:opacity-80"></div>
                  </div>
                </div>
                <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-3 rounded-xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
                  <span className="text-[var(--text-muted)] text-[9px] font-semibold uppercase tracking-wider">Internships</span>
                  <div className="text-xl sm:text-2xl font-bold mt-0.5 text-[var(--text-primary)]">2</div>
                  <div className="w-full h-1 bg-[var(--border)]/60 rounded-full mt-2 overflow-hidden">
                    <div className="w-2/3 h-full bg-[var(--primary)] transition-all duration-500 group-hover:opacity-80"></div>
                  </div>
                </div>
                <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-3 rounded-xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
                  <span className="text-[var(--text-muted)] text-[9px] font-semibold uppercase tracking-wider">Certifications</span>
                  <div className="text-xl sm:text-2xl font-bold mt-0.5 text-[var(--text-primary)]">12+</div>
                  <div className="w-full h-1 bg-[var(--border)]/60 rounded-full mt-2 overflow-hidden">
                    <div className="w-11/12 h-full bg-[var(--primary)] transition-all duration-500 group-hover:opacity-80"></div>
                  </div>
                </div>
                <div className="border border-[var(--border)] bg-[var(--card)] glow-card p-3 rounded-xl flex flex-col justify-between text-left group transition-all duration-300 hover:-translate-y-1">
                  <span className="text-[var(--text-muted)] text-[9px] font-semibold uppercase tracking-wider">Hackathons</span>
                  <div className="text-xl sm:text-2xl font-bold mt-0.5 text-[var(--text-primary)]">5+</div>
                  <div className="w-full h-1 bg-[var(--border)]/60 rounded-full mt-2 overflow-hidden">
                    <div className="w-3/4 h-full bg-[var(--primary)] transition-all duration-500 group-hover:opacity-80"></div>
                  </div>
                </div>
              </div>

              {/* Premium Animated Scroll Indicator */}
              <div className="pt-3 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity">
                <button
                  onClick={() => scrollToSection("about")}
                  className="flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
                >
                  <div className="w-4 h-6 rounded-full border border-zinc-500 flex justify-center p-0.5">
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-zinc-500">
                    Scroll to discover
                  </span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <AboutSection />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* EXPERIENCE SECTION */}
        <ExperienceSection />

        {/* PROJECTS SECTION */}
        <ProjectsSection />

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <CertificationsAchievements />

        {/* INTERACTIVE ACHIEVEMENTS SECTION */}
        <AchievementsSection />

        {/* CONTACT SECTION */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <Footer scrollToSection={scrollToSection} navLinks={navLinks} />

      {/* AI CHATBOT INTEGRATION */}
      <AIChatbot />

      {/* PREMIUM CUSTOM ANIMATED CURSOR */}
      <AnimatedCursor />

    </div>
  );
}
