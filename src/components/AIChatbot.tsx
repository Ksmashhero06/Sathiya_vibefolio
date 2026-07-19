import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I'm Sathiya-AI, Sathiyamoorthi's virtual assistant. Ask me anything about his web development skills, game design portfolio, squad lead experience, or how to get in touch with him!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starteSuggestions = [
    "What is Sathiyamoorthi's tech stack?",
    "Tell me about his recent internships.",
    "Show me his Credly certifications.",
    "How can I contact him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Gather clean history to send as context (excluding initial greeting to keep token use fast)
      const formattedHistory = messages
        .filter((m) => m.id !== "initial")
        .map((m) => ({
          sender: m.sender === "user" ? "user" : "model",
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: formattedHistory
        })
      });

      if (!res.ok) throw new Error("Connection failed");
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm having trouble connecting to my cognitive center right now. But rest assured, Sathiyamoorthi is fully capable with React, TypeScript, WordPress, PHP, and Unreal Engine!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded chat window with Glass aesthetics */}
      {isOpen && (
        <div className="mb-4 w-92 sm:w-100 h-130 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Chat header */}
          <div className="px-5 py-4 border-b border-zinc-900 flex items-center justify-between bg-[#030303]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Sathiya-AI</h3>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Virtual Assistant
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-zinc-800/60 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-purple-500/10 border border-purple-500/30 text-white rounded-tr-none"
                      : "bg-zinc-950/60 border border-zinc-850 text-zinc-300 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-950/60 border border-zinc-850 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 text-xs text-zinc-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  Formulating answer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions footer */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 pt-1 border-t border-zinc-900 bg-[#030303]/25">
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase block mb-1.5">
                Suggested questions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {starteSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs px-2.5 py-1 rounded-full border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-left flex items-center gap-1 group cursor-pointer"
                  >
                    {suggestion}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-zinc-900 bg-[#030303]/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Sathiya-AI..."
              disabled={isLoading}
              className="flex-1 bg-zinc-900/80 border border-zinc-850 focus:border-purple-500/50 outline-none text-sm text-white rounded-xl px-3.5 py-2 placeholder-zinc-500 transition-all focus:ring-1 focus:ring-purple-500/20"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-purple-500 hover:bg-purple-400 disabled:bg-zinc-900 disabled:text-zinc-600 text-white rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Pulsing capsule badge launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-5 py-3.5 rounded-full border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isOpen
            ? "bg-zinc-950 border-zinc-850 text-zinc-300"
            : "bg-white border-white text-black font-semibold hover:bg-zinc-200"
        }`}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full border border-[#030303] animate-pulse" />
          )}
        </div>
        <span className="text-sm tracking-wide">
          {isOpen ? "Close Chat" : "Talk to Sathiya-AI"}
        </span>
      </button>
    </div>
  );
}
