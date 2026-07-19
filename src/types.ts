export interface Skill {
  name: string;
  category: "Programming" | "AI" | "Frontend" | "Backend" | "Databases" | "Cloud" | "Tools" | "Soft Skills";
  experience: string; // e.g. "4+ Years" or "3 Years"
  projectsUsed: string[]; // e.g. ["AgentDesk", "Nova Canvas"]
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured: boolean;
  image: string;
  status: "Live" | "Beta" | "Research" | "In Development" | "Production";
  categories: ("AI" | "Web" | "Hackathon" | "Research" | "Featured")[];
  caseStudy: {
    problem: string;
    solution: string;
    impact: string;
    architecture: string[];
    metrics: { label: string; value: string }[];
    codeSnippet?: { language: string; filename: string; code: string };
  };
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies?: string[];
  achievements?: string[];
  responsibilities?: string[];
  // Extended fields for high-fidelity interactive details
  carouselImages?: string[];
  aboutCompany?: string;
  keyFocusAreas?: string[];
  roleImpact?: string;
  technicalLearnings?: string[];
  leadershipOutcomes?: string[];
  coreSkillsApplied?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skillsLearned?: string[];
  category?: string;
  logoType?: string;
  verificationId?: string;
  syllabus?: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: "Navigation" | "Projects" | "Socials" | "Actions";
  action: () => void;
  shortcut?: string[];
}

export interface MilestoneAchievement {
  id: string;
  category: "Hackathons" | "Competitions" | "Awards" | "Leadership" | "Open Source" | "Community";
  title: string;
  subtitle: string;
  date: string;
  description: string;
  metrics: string;
  badgeName: string;
  skillsUnlocked: string[];
  technologies?: string[];
  link?: string;
  trophyColor?: "gold" | "silver" | "bronze" | "purple" | "blue" | "pink";
}

export interface UnifiedCredential {
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

