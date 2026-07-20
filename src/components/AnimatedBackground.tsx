import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate organic particles with varying characteristics
    const items: Particle[] = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(items);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });

      // Expose mouse variables globally for premium card hover border glow effects
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="bg-animation"
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-700 bg-[var(--bg-base)] text-zinc-100"
    >
      {/* Premium Interactive Cursor Spotlight Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[130px] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          background: "radial-gradient(circle, var(--spotlight-color-1) 0%, var(--spotlight-color-2) 50%, transparent 100%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Layered Gradient Mesh: Ambient glowing blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse [animation-duration:12s]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] animate-pulse [animation-duration:8s] [animation-delay:2s]" />
      <div className="absolute top-[40%] left-[30%] w-[450px] h-[450px] bg-pink-600/5 rounded-full blur-[120px] animate-pulse [animation-duration:15s] [animation-delay:4s]" />

      {/* Floating particles mapping with custom animations */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white animate-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Micro-grid background layer */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Animated horizontal scanner sweep over the grid */}
      <div className="grid-sweep" />
    </div>
  );
}
