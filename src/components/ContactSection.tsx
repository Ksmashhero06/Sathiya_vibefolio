import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  MessageSquare,
  Download,
  Check,
  Copy,
  ExternalLink,
  Clock,
  ArrowRight,
  Loader2,
  Sparkles,
  Send,
  Globe,
  CheckCircle2
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState("");

  // Live clock tracker for San Francisco (PST/PDT)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate premium verification sequence
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 border-b border-zinc-900/40 relative scroll-mt-20 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/15 bg-purple-500/5 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono text-purple-300 tracking-wider uppercase">
              GET IN TOUCH
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white mb-4"
          >
            Let's build the <span className="gradient-text">next paradigm</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-400 leading-relaxed"
          >
            Ready to integrate advanced cognitive agent workflows, high-performance web systems, or consult on technical architecture? Connect directly or deploy a secure handshake package.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE: Information grid & Glass Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Availability & System Clock */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-emerald-400 tracking-wide">
                    AVAILABLE FOR PROJECTS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  STATUS // ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900/60">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">
                    OPERATIONAL ZONE
                  </span>
                  <span className="text-xs font-sans font-medium text-zinc-300 mt-1 block">
                    San Francisco, CA
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">
                    LOCAL TIME (PST)
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {localTime || "03:41 AM"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Glass Contact Channels */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-md space-y-5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                // DIRECT COMMUNICATIONS
              </span>

              {/* Email channel */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/30 border border-zinc-900/50 group hover:border-purple-500/25 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/5 border border-purple-500/10 flex items-center justify-center text-purple-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block">EMAIL INBOX</span>
                    <a href="mailto:kkssathiyamoorthi@gmail.com" className="text-xs font-sans font-medium text-zinc-300 hover:text-purple-400 transition-colors">
                      kkssathiyamoorthi@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("kkssathiyamoorthi@gmail.com", "email")}
                  className="p-2 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
                  title="Copy Email"
                >
                  {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone channel */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/30 border border-zinc-900/50 group hover:border-blue-500/25 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block">SECURE TELEPHONY</span>
                    <a href="tel:+14155552941" className="text-xs font-sans font-medium text-zinc-300 hover:text-blue-400 transition-colors">
                      +1 (415) 555-2941
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("+14155552941", "phone")}
                  className="p-2 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Download Resume Link */}
              <a
                href="/resume.pdf"
                download="SATHIYAMOORTHI_K_Resume.pdf"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all text-xs font-medium text-purple-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-mono text-purple-400 uppercase block">CURRICULUM VITAE</span>
                    <span className="text-xs font-sans text-white group-hover:text-purple-300 transition-colors">Download Resume PDF</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  GET FILE ↗
                </span>
              </a>
            </div>

            {/* Card 3: Connected Networks (GitHub, LinkedIn, Instagram, Twitter, Discord) */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-md">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                // CRYPTOGRAPHIC HUBS
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <a
                  href="https://github.com/Ksmashhero06"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all text-center group cursor-pointer"
                >
                  <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors mb-2" />
                  <span className="text-[10px] font-mono text-zinc-300">GitHub</span>
                  <span className="text-[8px] font-mono text-zinc-600 mt-1 truncate max-w-full">@Ksmashhero06</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/sathiyamoorthi-k-336a79307/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all text-center group cursor-pointer"
                >
                  <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors mb-2" />
                  <span className="text-[10px] font-mono text-zinc-300">LinkedIn</span>
                  <span className="text-[8px] font-mono text-zinc-600 mt-1 truncate max-w-full">/in/sathiyamoorthi-k</span>
                </a>

                <a
                  href="https://www.instagram.com/kkssathiyamoorthi06/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all text-center group cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-pink-400 transition-colors mb-2" />
                  <span className="text-[10px] font-mono text-zinc-300">Instagram</span>
                  <span className="text-[8px] font-mono text-zinc-600 mt-1 truncate max-w-full">@kkssathiyamoorthi06</span>
                </a>

                <a
                  href="https://x.com/Ksmashhero06"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all text-center group cursor-pointer"
                >
                  <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-sky-400 transition-colors mb-2" />
                  <span className="text-[10px] font-mono text-zinc-300">Twitter</span>
                  <span className="text-[8px] font-mono text-zinc-600 mt-1 truncate max-w-full">@Ksmashhero06</span>
                </a>

                <button
                  onClick={() => handleCopy("sathiyamoorthi", "discord")}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all text-center group cursor-pointer w-full col-span-2 sm:col-span-1"
                >
                  <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors mb-2" />
                  <span className="text-[10px] font-mono text-zinc-300">
                    {copiedField === "discord" ? "Copied!" : "Discord"}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-600 mt-1 truncate max-w-full">sathiyamoorthi</span>
                </button>
              </div>
            </div>

            {/* Card 4: Interactive Operations Radar Map */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-md overflow-hidden relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                  // RADAR BEACON // BAY AREA
                </span>
                <span className="text-[9px] font-mono text-purple-400">
                  SF 37.7749° N, 122.4194° W
                </span>
              </div>

              {/* Gorgeous animated radar coordinate background */}
              <div className="w-full h-36 rounded-xl bg-zinc-950 border border-zinc-900/80 relative flex items-center justify-center overflow-hidden">
                {/* Simulated coordinate scanner grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
                
                {/* Radar sweep line */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute w-full h-full origin-center pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(168,85,247,0.15) 0deg, rgba(168,85,247,0) 90deg)"
                  }}
                />

                {/* Radar circles */}
                <div className="absolute w-24 h-24 rounded-full border border-zinc-900/60" />
                <div className="absolute w-16 h-16 rounded-full border border-zinc-900/40" />
                <div className="absolute w-8 h-8 rounded-full border border-zinc-900/20" />

                {/* Blinking signal beacon on SF locator */}
                <div className="absolute flex items-center justify-center">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-purple-500/25 animate-ping" />
                  <span className="absolute inline-flex h-2 w-2 rounded-full bg-purple-400" />
                  <Globe className="w-3.5 h-3.5 text-purple-300 absolute z-10" />
                </div>

                {/* Location label */}
                <div className="absolute bottom-2 left-3 bg-zinc-950/80 border border-zinc-850 px-2 py-0.5 rounded text-[8px] font-mono text-zinc-400">
                  SECURE CHANNELS STABLE // GPS LOCKED
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive form panel */}
          <div className="lg:col-span-7">
            
            <div className="relative rounded-2xl border border-zinc-900/80 bg-zinc-950/20 p-6 sm:p-8 backdrop-blur-md">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="py-12 px-4 text-center space-y-6"
                  >
                    {/* Animated drawing Check Circle and pulse */}
                    <div className="relative flex items-center justify-center mx-auto w-16 h-16">
                      <motion.div
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-purple-500/10 border border-purple-500/20"
                      />
                      <motion.div
                        initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-purple-400 relative z-10" />
                      </motion.div>
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-lg font-sans font-medium text-white tracking-tight">
                        Secure Connection Established
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        Transmission successfully routed to the core server database. Your handshake signature has been saved. Sathiyamoorthi will follow up within 12-24 standard operational hours.
                      </p>
                    </div>

                    {/* Holographic Log Summary Receipt */}
                    <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 max-w-sm mx-auto text-left space-y-2">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">
                        // SECURE DATA RECEIPT
                      </span>
                      <div className="grid grid-cols-3 text-[10px] font-mono">
                        <span className="text-zinc-500">SENDER:</span>
                        <span className="text-zinc-300 col-span-2 truncate">{formData.name || "Anonymous Sender"}</span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] font-mono">
                        <span className="text-zinc-500">EMAIL:</span>
                        <span className="text-zinc-300 col-span-2 truncate">{formData.email}</span>
                      </div>
                      <div className="grid grid-cols-3 text-[10px] font-mono">
                        <span className="text-zinc-500">CIPHER:</span>
                        <span className="text-emerald-400 col-span-2">RSA-SHA256_VERIFIED</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 bg-zinc-950/40 border border-zinc-850 px-5 py-2.5 rounded-xl hover:border-purple-500/20 transition-all cursor-pointer"
                      >
                        <span>Send Another Transmission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        // PARSE COMMUNICATIONS ROUTER
                      </span>
                      <span className="text-[9px] font-mono text-zinc-600">
                        * ALL FIELDS COMPULSORY
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name field */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                          IDENTIFICATION / NAME
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full bg-zinc-950/45 border border-zinc-850/80 focus:border-purple-500/40 focus:bg-zinc-950/80 outline-none text-xs text-zinc-300 rounded-xl px-4 py-3 placeholder-zinc-650 transition-all focus:ring-1 focus:ring-purple-500/10 font-sans"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                          RETURN ADDRESS / EMAIL
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            className="w-full bg-zinc-950/45 border border-zinc-850/80 focus:border-purple-500/40 focus:bg-zinc-950/80 outline-none text-xs text-zinc-300 rounded-xl px-4 py-3 placeholder-zinc-650 transition-all focus:ring-1 focus:ring-purple-500/10 font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                        TOPIC CATEGORY / SUBJECT
                      </label>
                      <input
                        type="text"
                        required
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Collaboration opportunity / Project specifications"
                        className="w-full bg-zinc-950/45 border border-zinc-850/80 focus:border-purple-500/40 focus:bg-zinc-950/80 outline-none text-xs text-zinc-300 rounded-xl px-4 py-3 placeholder-zinc-650 transition-all focus:ring-1 focus:ring-purple-500/10 font-sans"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                        DETAILED SPECIFICATION / MESSAGE
                      </label>
                      <textarea
                        required
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please supply project parameters, budget parameters, target timeline, or architectural designs..."
                        className="w-full bg-zinc-950/45 border border-zinc-850/80 focus:border-purple-500/40 focus:bg-zinc-950/80 outline-none text-xs text-zinc-300 rounded-xl px-4 py-3 placeholder-zinc-650 transition-all focus:ring-1 focus:ring-purple-500/10 resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Animated premium submit button */}
                    <div className="pt-3">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider bg-white text-black hover:bg-zinc-100 disabled:bg-zinc-900 disabled:text-zinc-650 disabled:border-zinc-900 transition-all duration-300 cursor-pointer"
                      >
                        {/* Shimmer sliding light effect on hover */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer pointer-events-none" />

                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>ENCRYPTING & ROUTING SECURE TRANSMISSION...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-black" />
                            <span>TRANSMIT SECURITY HANDSHAKE</span>
                            <ArrowRight className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    <div className="text-center">
                      <p className="text-[9px] font-mono text-zinc-600">
                        🛡️ SECURED CONNECTION WITH AES-GCM 256 HANDSHAKE VALIDATOR.
                      </p>
                    </div>

                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
