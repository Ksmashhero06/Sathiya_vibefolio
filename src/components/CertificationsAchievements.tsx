import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Hash,
  Compass,
  Cpu,
  Bookmark,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Link,
  Lock,
  CheckCircle,
  HelpCircle,
  Globe,
  Database
} from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data";

interface CredlyBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  skills: string[];
  verificationUrl: string;
  category: "Certification" | "Webinar" | "Bootcamp" | "Workshop" | "Hackathon" | "Achievement";
  embedCode?: string;
}

export default function CertificationsAchievements() {
  const [badges, setBadges] = useState<CredlyBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | "Certification" | "Webinar" | "Bootcamp" | "Workshop" | "Hackathon" | "Achievement">("All");
  const [syncSource, setSyncSource] = useState<"live" | "cached" | "">("");
  const [profileUrl, setProfileUrl] = useState("https://www.credly.com/users/sathiyamoorthi-k.fc4892da/badges/credly");
  const [selectedBadge, setSelectedBadge] = useState<CredlyBadge | null>(null);

  // Card cursor highlight states for premium custom glow effects
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load the badges from our backend proxy
  const fetchBadges = async (forceAnimation = false) => {
    if (forceAnimation) {
      setIsSyncing(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Small timeout simulation for gorgeous scanning effect
      if (forceAnimation) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const res = await fetch("/api/credly-badges");
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      
      if (json.success && Array.isArray(json.data)) {
        setBadges(json.data);
        setSyncSource(json.source || "live");
        if (json.profileUrl) setProfileUrl(json.profileUrl);
      }
    } catch (err) {
      console.error("Failed to load Credly credentials:", err);
      // Fallback local robust configuration if service fails completely
      setSyncSource("cached");
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  // Format Date string
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Lifetime";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Dynamic filter matcher
  const filteredBadges = badges.filter((badge) => {
    if (activeFilter === "All") return true;
    return badge.category === activeFilter;
  });

  // Track cursor coordinates on hover to drive beautiful 3D tilt & laser glow effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    setMousePosition({ x, y });
  };

  return (
    <section id="credentials" className="py-16 sm:py-20 md:py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      
      {/* Background radial glow fields */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading & Real-time connection status block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl text-left">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/15 inline-flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              // VERIFIED CREDENTIAL LAYER
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white mt-4 mb-3">
              Interactive <span className="gradient-text">Credly</span> Badges
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Real-time synchronization with Credly profile. Hover cards for real-time laser tilt, or click verify to view the certification ledger directly.
            </p>
          </div>

          {/* Connection control desk */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-zinc-950 border border-zinc-900 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  syncSource === "live" ? "animate-ping bg-emerald-400" : "bg-purple-400"
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  syncSource === "live" ? "bg-emerald-500" : "bg-purple-500"
                }`} />
              </span>
              <span className="text-zinc-400">STATUS:</span>
              <span className={syncSource === "live" ? "text-emerald-400 font-bold" : "text-purple-400 font-medium"}>
                {syncSource === "live" ? "LIVE SYNCED" : "VERIFIED STORAGE"}
              </span>
            </div>

            <button
              onClick={() => fetchBadges(true)}
              disabled={isSyncing || isLoading}
              className="p-2.5 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white transition-all shadow-md flex items-center gap-2 text-xs font-mono disabled:opacity-50 cursor-pointer"
              title="Force sync with Credly"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-purple-400" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync Profile"}</span>
            </button>
          </div>
        </div>

        {/* Bento dual layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Milestone accomplishments & Stats summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Achievement highlights card */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/40 to-purple-500/40" />
              
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Profile Milestones
                </span>
              </div>

              <div className="space-y-4">
                {ACHIEVEMENTS_DATA.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-zinc-300 leading-relaxed group/item">
                    <CheckCircle2 className="w-4 h-4 text-purple-500/60 shrink-0 mt-0.5 group-hover/item:text-purple-400 transition-colors" />
                    <span className="group-hover/item:text-zinc-200 transition-colors">{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-zinc-600" />
                  Sathiyamoorthi K.
                </span>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group/link"
                >
                  <span>Credly profile</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick validation statistics */}
            <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/40">
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">SYNCED BADGES</span>
                <span className="text-2xl font-bold text-white mt-1 block font-mono">
                  {isLoading ? "..." : badges.length}
                </span>
              </div>
              <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/40">
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">VERIFICATIONS</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">100%</span>
              </div>
            </div>

          </div>

          {/* Right Block: Dynamic filterable badges bento grid (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Grid Filter Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-3 border-b border-zinc-900/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Filter Credentials
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-900 max-w-full">
                {(["All", "Certification", "Webinar", "Bootcamp", "Workshop", "Hackathon", "Achievement"] as const).map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`relative px-2 py-1 text-[10px] sm:text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                        isActive ? "text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCredlyFilter"
                          className="absolute inset-0 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges Layout Grid with interactive load indicators */}
            {isLoading ? (
              <div className="h-96 w-full flex flex-col items-center justify-center gap-3.5 border border-zinc-900 rounded-3xl bg-zinc-950/10">
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/10" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 animate-spin" />
                  <Cpu className="w-5 h-5 text-purple-400 animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-zinc-400 block tracking-wider uppercase">
                    Querying Credly Registry...
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600 block">
                    Retrieving profile id: sathiyamoorthi-k.fc4892da
                  </span>
                </div>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredBadges.map((badge) => {
                    const isHovered = hoveredCardId === badge.id;
                    return (
                      <motion.div
                        key={badge.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        onMouseEnter={() => setHoveredCardId(badge.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        onMouseMove={(e) => handleMouseMove(e, badge.id)}
                        className="group relative rounded-3xl border border-zinc-900 bg-zinc-950/30 hover:bg-zinc-900/10 hover:border-purple-500/20 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl h-full"
                        onClick={() => setSelectedBadge(badge)}
                      >
                        {/* Premium Dynamic Radial Glow Hover Overlay */}
                        {isHovered && (
                          <div
                            className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100"
                            style={{
                              background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 80%)`,
                            }}
                          />
                        )}

                        {/* Top Laser Accent Line on Hover */}
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500/0 via-purple-500/45 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div>
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900/60 border border-zinc-850 p-1 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 relative">
                              <img
                                src={badge.imageUrl || "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d0243b84f11/image.png"}
                                alt={badge.name}
                                className="max-w-full max-h-full object-contain relative z-10"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <span className="text-[8px] font-mono text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {badge.category}
                            </span>
                          </div>

                          {/* Body Information */}
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-sans font-medium text-white group-hover:text-purple-300 transition-colors leading-snug">
                              {badge.name}
                            </h4>
                            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                              {badge.issuer}
                            </p>
                            <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                              {badge.description}
                            </p>
                          </div>

                          {/* Competency Skills Chip collection */}
                          <div className="mt-4 space-y-2">
                            <span className="flex items-center gap-1 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                              <Bookmark className="w-3 h-3 text-zinc-600" />
                              // SECURE COMPETENCIES
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {badge.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[9px] font-mono text-zinc-400 bg-zinc-900/40 border border-zinc-850 px-2 py-0.5 rounded transition-colors group-hover:bg-zinc-900/80"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interactive footer line with verify button linkout */}
                        <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {formatDate(badge.issuedAt)}
                          </span>

                          <div className="inline-flex items-center gap-1.5 text-zinc-400 group-hover:text-white font-semibold transition-colors">
                            <span>Details</span>
                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

          </div>

        </div>

      </div>

      {/* Detail Drawer Modal Backdrop */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedBadge(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-lg bg-[#050505] border border-zinc-900 rounded-3xl p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Abstract decorative back lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/10 blur-[50px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-start gap-4 pb-5 border-b border-zinc-900 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={selectedBadge.imageUrl || "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d0243b84f11/image.png"}
                    alt={selectedBadge.name}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-purple-400 bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-500/15 uppercase tracking-widest">
                    {selectedBadge.issuer}
                  </span>
                  <h3 className="text-base font-sans font-semibold text-white mt-1.5 leading-snug">
                    {selectedBadge.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="py-5 space-y-4 text-xs relative z-10 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">// DESCRIPTION</span>
                  <p className="text-zinc-300 leading-relaxed font-sans bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-900/60">
                    {selectedBadge.description}
                  </p>
                </div>

                {/* LinkedIn Embed verification if present */}
                {selectedBadge.embedCode && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">// LINKEDIN VERIFIED UPDATE</span>
                    <div className="rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950/50 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
                      <div 
                        className="w-full flex justify-center text-center [&>iframe]:max-w-full [&>iframe]:mx-auto"
                        dangerouslySetInnerHTML={{ __html: selectedBadge.embedCode }}
                      />
                    </div>
                  </div>
                )}

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">DATE ISSUED</span>
                    <span className="text-xs font-mono font-bold text-white mt-1 block">
                      {formatDate(selectedBadge.issuedAt)}
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">VALID PERIOD</span>
                    <span className="text-xs font-mono font-bold text-white mt-1 block">
                      {selectedBadge.expiresAt ? `Expires ${formatDate(selectedBadge.expiresAt)}` : "No Expiration"}
                    </span>
                  </div>
                </div>

                {/* Skills Unlocked */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">// UNLOCKED CERTIFIED SKILLS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBadge.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono text-purple-300 bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-3 relative z-10">
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-4 py-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 rounded-xl transition-all cursor-pointer"
                >
                  Close Drawer
                </button>

                <a
                  href={selectedBadge.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs font-mono font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>{selectedBadge.verificationUrl.includes("credly.com") ? "Verify on Credly" : "Verify Credential"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
