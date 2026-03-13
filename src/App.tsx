import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Github,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
  User,
  Briefcase,
  CalendarDays,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

type SkillBar = {
  name: string;
  level: number;
  color: string;
};

type Project = {
  year: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  href?: string;
};

const SOCIALS = {
  telegram: "https://t.me/aldyzzxy",
  github: "https://github.com/KingAldy",
  instagram: "https://instagram.com/dyyforyous",
  email: "mailto:tubulyubul@gmail.com",
};

const skillBars: SkillBar[] = [
  { name: "JavaScript", level: 88, color: "from-yellow-300 to-amber-500" },
  { name: "TypeScript", level: 78, color: "from-sky-400 to-blue-500" },
  { name: "React", level: 82, color: "from-cyan-300 to-sky-500" },
  { name: "HTML5", level: 96, color: "from-orange-400 to-red-500" },
  { name: "CSS3", level: 90, color: "from-blue-400 to-indigo-500" },
  { name: "TailwindCSS", level: 86, color: "from-cyan-300 to-teal-400" },
  { name: "Python", level: 69, color: "from-indigo-300 to-blue-600" },
  { name: "GSAP", level: 63, color: "from-lime-300 to-green-500" },
];

const projects: Project[] = [
  {
    year: "2024",
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi dengan React, TypeScript, motion effect, dan visual neon gelap yang elegan.",
    tags: ["React", "TypeScript", "Three.js", "GSAP"],
    accent: "from-violet-400/70 to-fuchsia-500/60",
    href: "#",
  },
  {
    year: "2024",
    title: "To-Do App",
    description:
      "Aplikasi manajemen tugas drag & drop dengan filter, dark mode, dan UX yang simpel tapi modern.",
    tags: ["React", "JavaScript", "TailwindCSS"],
    accent: "from-violet-500/70 to-blue-500/60",
    href: "#",
  },
  {
    year: "2024",
    title: "Landing Page Sekolah",
    description:
      "Landing page modern untuk acara sekolah dengan animasi halus dan layout yang rapi untuk mobile maupun desktop.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    accent: "from-cyan-400/70 to-sky-500/60",
    href: "#",
  },
  {
    year: "2023",
    title: "Weather App",
    description:
      "Aplikasi cuaca real-time dengan integrasi API dan UI card-based yang clean dan mudah dipakai.",
    tags: ["React", "API", "TailwindCSS"],
    accent: "from-pink-400/70 to-fuchsia-500/60",
    href: "#",
  },
  {
    year: "2023",
    title: "Python Calculator",
    description:
      "Kalkulator desktop Python untuk operasi dasar sampai kalkulasi tertentu dengan tampilan yang sederhana.",
    tags: ["Python", "Tkinter"],
    accent: "from-sky-400/70 to-indigo-500/60",
    href: "#",
  },
  {
    year: "2023",
    title: "Quiz App",
    description:
      "Aplikasi kuis interaktif dengan score, timer, dan pengalaman belajar yang lebih engaging.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    accent: "from-lime-300/70 to-green-500/60",
    href: "#",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TelegramLogo({
  className = "",
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="120" cy="120" r="120" fill="currentColor" opacity="0.16" />
      <path
        d="M180.4 68.7 51.6 118.4c-8.8 3.5-8.7 8.4-1.6 10.6l33 10.3 12.8 41.3c1.8 5 1 7 6.2 7 4 0 5.8-1.8 8-4l18.4-17.9 38.3 28.3c7.1 3.9 12.1 1.9 13.9-6.6l23.2-109.3c2.6-10.4-4-15.1-11.8-11.4Z"
        fill="currentColor"
      />
      <path
        d="m93.8 136.9 57.7-36.4c2.9-1.8 5.6-.8 3.4 1.2l-47.6 43-1.9 22.8c2.9 0 4.2-1.3 5.9-2.9l14.4-14 29.9 22.1c5.5 3 9.4 1.5 10.8-5.1l17.2-81.2c1.9-7.7-3-11.2-8.8-8.5l-95.8 37c-6.5 2.5-6.4 6.1-1.2 7.8l24.6 7.7 57.1-36c2.7-1.6 5.2-.7 3.1 1.2l-47.8 43.3-18.6-5.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Preloader({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 6;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(id);
        setTimeout(done, 350);
      } else {
        setProgress(current);
      }
    }, 120);

    return () => clearInterval(id);
  }, [done]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(18px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-[#050507] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[40%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute left-[48%] top-[52%] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex gap-3"
        >
          <div className="rounded-2xl border border-white/10 bg-blue-500/10 px-4 py-3 text-xs font-semibold tracking-[0.24em] text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            TSX
          </div>
          <div className="rounded-2xl border border-white/10 bg-yellow-500/10 px-4 py-3 text-xs font-semibold tracking-[0.24em] text-yellow-200 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            JS
          </div>
          <div className="rounded-2xl border border-white/10 bg-pink-500/10 px-4 py-3 text-xs font-semibold tracking-[0.24em] text-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            HTML
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.65 }}
          className="text-4xl font-black tracking-tight text-white md:text-7xl"
        >
          Welcome To
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="mt-4 text-xs uppercase tracking-[0.38em] text-white/45"
        >
          Loading experience...
        </motion.p>

        <div className="mt-10 w-full max-w-xs">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-violet-300 shadow-[0_0_28px_rgba(139,92,246,0.7)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.28 }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-white/40">{progress}%</div>
        </div>
      </div>
    </motion.div>
  );
}

function MagneticButton({
  href,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.a>
  );
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];

    const onScroll = () => {
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ["Home", "home"],
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Contact", "contact"],
  ] as const;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 px-4">
      <div className="mx-auto flex max-w-7xl justify-center lg:justify-between">
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="pointer-events-auto hidden items-center lg:flex"
        >
          <a
            href="#home"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/90 backdrop-blur-xl"
          >
            <Code2 size={16} className="text-violet-300" />
            <span className="font-semibold">Adit</span>
          </a>
        </motion.div>

        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          {items.map(([label, id]) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="relative rounded-full px-4 py-2 text-sm text-white/65 transition hover:text-white md:px-5"
              >
                {active && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_20px_rgba(139,92,246,0.22)]"
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  />
                )}
                <span className={cn("relative z-10", active && "text-white")}>
                  {label}
                </span>
              </a>
            );
          })}

          <a
            href={SOCIALS.telegram}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-400/90 to-indigo-300 px-4 py-2 text-sm font-semibold text-[#0c0c12] shadow-[0_0_30px_rgba(139,92,246,0.35)] transition hover:brightness-110"
          >
            Hire Me
            <ArrowUpRight size={16} />
          </a>
        </motion.nav>
      </div>
    </div>
  );
}

function SkillProgress({ item, delay = 0 }: { item: SkillBar; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white/75">{item.name}</span>
        <span className="text-white/35">{item.level}%</span>
      </div>
      <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/7">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.15, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r shadow-[0_0_18px_rgba(255,255,255,0.18)]",
            item.color
          )}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ item, index }: { item: Project; index: number }) {
  return (
    <motion.a
      href={item.href || "#"}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div
        className={cn(
          "absolute right-4 top-4 h-3.5 w-3.5 rounded-full bg-gradient-to-br opacity-95 shadow-[0_0_18px_rgba(255,255,255,0.35)]",
          item.accent
        )}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="text-xs text-white/25">{item.year}</div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-white/90 transition group-hover:text-white">
          {item.title}
        </h3>
        <ExternalLink
          size={18}
          className="mt-1 shrink-0 text-white/25 transition group-hover:text-violet-300"
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-white/42">{item.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/68"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  ghost,
}: {
  eyebrow: string;
  title: string;
  ghost?: string;
}) {
  return (
    <div className="mb-14">
      <div className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-violet-200/60">
        <span className="h-px w-14 bg-white/20" />
        {eyebrow}
      </div>
      <h2 className="relative text-4xl font-black tracking-tight text-white md:text-6xl">
        {title}
        {ghost && (
          <span className="pointer-events-none absolute left-[2ch] top-0 text-white/7">
            {ghost}
          </span>
        )}
      </h2>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050507] text-white selection:bg-violet-400/30 selection:text-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background: #050507;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #07070a;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(139,92,246,.7), rgba(59,130,246,.55));
          border-radius: 999px;
        }
        .noise {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,.05) 0, transparent 22%),
            radial-gradient(circle at 80% 30%, rgba(139,92,246,.09) 0, transparent 18%),
            radial-gradient(circle at 60% 70%, rgba(59,130,246,.08) 0, transparent 18%);
          opacity: .7;
          pointer-events: none;
        }
        .grid-mask {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 70px 70px;
          -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
                  mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
        }
        .glass {
          background: linear-gradient(to bottom, rgba(255,255,255,.05), rgba(255,255,255,.025));
          border: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.05),
            0 10px 50px rgba(0,0,0,.25);
        }
        .marquee {
          animation: marquee 28s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-violet-400 via-blue-400 to-violet-300"
        style={{ scaleX: progressScale }}
      />

      <AnimatePresence mode="wait">
        {loading && <Preloader done={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />

          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="noise" />
            <div className="grid-mask absolute inset-0 opacity-[0.22]" />
            <div className="absolute left-1/2 top-[6%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-700/18 blur-[160px]" />
            <div className="absolute left-[20%] top-[38%] h-[22rem] w-[22rem] rounded-full bg-blue-600/10 blur-[130px]" />
            <div className="absolute right-[8%] top-[52%] h-[20rem] w-[20rem] rounded-full bg-fuchsia-600/10 blur-[130px]" />
            <div className="absolute bottom-[-4rem] left-[12%] h-[16rem] w-[16rem] rounded-full bg-violet-500/10 blur-[120px]" />
          </div>

          <main className="relative z-10">
            <section
              id="home"
              className="relative flex min-h-screen items-center px-5 pb-12 pt-28 md:px-8"
            >
              <motion.div
                style={{ y: mounted ? heroY : 0 }}
                className="mx-auto w-full max-w-7xl"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-white/[0.02] px-6 py-10 backdrop-blur-sm md:px-12 md:py-16">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(120,88,255,0.18),transparent_38%),radial-gradient(circle_at_48%_40%,rgba(37,99,235,0.12),transparent_42%)]" />
                  <div className="absolute left-1/2 top-[20%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[120px]" />

                  <div className="relative mx-auto max-w-4xl text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/55"
                    >
                      <Sparkles size={14} className="text-violet-300" />
                      Student • Web Developer • 15 y.o.
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.65 }}
                      className="text-6xl font-black leading-[0.88] tracking-tight md:text-[9rem]"
                    >
                      <span className="block text-white">Adit</span>
                      <span className="block bg-gradient-to-b from-white/35 via-violet-100/18 to-white/5 bg-clip-text text-transparent">
                        Kusuma
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.16, duration: 0.6 }}
                      className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/55 md:text-xl"
                    >
                      Pelajar 15 tahun yang membangun{" "}
                      <span className="font-semibold text-violet-300">
                        pengalaman web yang keren
                      </span>
                      . Belajar setiap hari, satu commit, satu langkah maju.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="mt-10 flex flex-wrap items-center justify-center gap-4"
                    >
                      <MagneticButton
                        href="#projects"
                        className="bg-gradient-to-r from-violet-400 to-indigo-300 text-[#0d0c13] shadow-[0_0_40px_rgba(139,92,246,0.45)]"
                      >
                        View Projects
                        <ArrowUpRight size={17} />
                      </MagneticButton>

                      <MagneticButton
                        href="#about"
                        className="glass text-white/90"
                      >
                        About Me
                      </MagneticButton>
                    </motion.div>

                    <div className="mt-16 flex flex-col items-center">
                      <div className="text-[11px] uppercase tracking-[0.38em] text-white/25">
                        Scroll
                      </div>
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="mt-4 h-14 w-8 rounded-full border border-white/10 bg-white/[0.03] p-1"
                      >
                        <div className="mx-auto h-3 w-1 rounded-full bg-violet-300/70" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden border-y border-white/6 py-3 text-sm text-white/55">
                  <div className="marquee flex min-w-max gap-12 pr-12">
                    {Array.from({ length: 2 }).map((_, row) => (
                      <React.Fragment key={row}>
                        {[
                          "GSAP",
                          "Figma",
                          "JavaScript",
                          "TypeScript",
                          "React",
                          "HTML5",
                          "TailwindCSS",
                          "Python",
                          "Node.js",
                          "Three.js",
                        ].map((item, i) => (
                          <span key={`${row}-${i}`} className="shrink-0">
                            {item}
                          </span>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="about" className="px-5 py-24 md:px-8 md:py-32">
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
                <div>
                  <SectionTitle
                    eyebrow="About"
                    title="A bit about"
                    ghost="myself."
                  />

                  <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55 }}
                    className="glass relative overflow-hidden rounded-[2rem] p-3"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.13),transparent_24%)]" />
                    <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#14131b] via-[#0b0b10] to-[#11111a] p-8">
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.04),transparent_35%,rgba(139,92,246,0.08))]" />
                      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[90px]" />
                      <div className="relative">
                        <div className="text-6xl font-black italic tracking-tight text-white drop-shadow-[0_8px_30px_rgba(255,255,255,0.08)] md:text-7xl">
                          Adit
                        </div>
                        <div className="mt-2 text-sm uppercase tracking-[0.38em] text-white/25">
                          Developer identity card
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-3">
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.55 }}
                    className="glass rounded-[2rem] p-6 md:p-8"
                  >
                    <p className="text-lg leading-8 text-white/72">
                      Halo! Saya <span className="font-semibold text-white">Bayu Rizky</span>,
                      seorang pelajar berusia 15 tahun yang menyukai di dunia web
                      development dan teknologi.
                    </p>

                    <p className="mt-6 text-base leading-8 text-white/48">
                      Meski masih muda, saya terus belajar dan mengembangkan skill
                      di bidang JavaScript, TypeScript, React, dan Python. Saya percaya
                      tidak ada kata terlalu dini untuk mulai berkarya di dunia digital.
                      Setiap hari adalah kesempatan belajar hal baru.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {[
                        { icon: User, label: "Nama", value: "Adit Kusuma" },
                        { icon: CalendarDays, label: "Umur", value: "15 Tahun" },
                        { icon: User, label: "Gender", value: "Male" },
                        { icon: GraduationCap, label: "Pendidikan", value: "Pelajar" },
                        { icon: Briefcase, label: "Status", value: "Pelajar" },
                        { icon: MapPin, label: "Location", value: "Indonesia" },
                      ].map((info) => {
                        const Icon = info.icon;
                        return (
                          <div
                            key={info.label}
                            className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-xl bg-white/[0.04] p-2 text-violet-300">
                                <Icon size={16} />
                              </div>
                              <div>
                                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                                  {info.label}
                                </div>
                                <div className="mt-1 text-sm font-medium text-white/85">
                                  {info.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-5 text-sm italic leading-7 text-white/38">
                      “Muda bukan halangan. Setiap baris kode yang saya tulis adalah
                      langkah menuju masa depan yang saya impikan.”
                      <div className="mt-2 text-white/55 not-italic">
                        — Developer Motto
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section id="skills" className="px-5 py-24 md:px-8 md:py-32">
              <div className="mx-auto max-w-7xl">
                <SectionTitle
                  eyebrow="Skills"
                  title="Tech Stack."
                  ghost="Stack."
                />

                <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="glass rounded-[2rem] p-6 md:p-8">
                    <div className="mb-8 text-sm text-white/45">Proficiency Level</div>
                    <div className="space-y-5">
                      {skillBars.map((item, i) => (
                        <SkillProgress key={item.name} item={item} delay={i * 0.06} />
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-[2rem] p-6 md:p-8">
                    <div className="mb-8 text-sm text-white/45">Tools & Technologies</div>

                    <div className="flex flex-wrap gap-3">
                      {[
                        "VS Code",
                        "Git",
                        "Github",
                        "Figma",
                        "Vite",
                        "npm",
                        "Vercel",
                        "Netlify",
                        "Postman",
                        "ESLint",
                      ].map((tool, i) => (
                        <motion.div
                          key={tool}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                        >
                          {tool}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                      {[
                        { value: "10+", label: "Projects" },
                        { value: "1+", label: "Tahun Coding" },
                        { value: "5+", label: "Tech Stack" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-6 text-center"
                        >
                          <div className="text-3xl font-black text-violet-300">
                            {stat.value}
                          </div>
                          <div className="mt-1 text-sm text-white/38">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 overflow-hidden border-y border-white/6 py-3 text-sm text-white/45">
                  <div className="marquee flex min-w-max gap-10 pr-10">
                    {Array.from({ length: 2 }).map((_, row) => (
                      <React.Fragment key={`skills-row-${row}`}>
                        {[
                          "TypeScript",
                          "React",
                          "TailwindCSS",
                          "Python",
                          "GSAP",
                          "Node.js",
                          "HTML5",
                          "JavaScript",
                          "REST API",
                          "Three.js",
                          "CSS3",
                          "Figma",
                        ].map((item, i) => (
                          <span key={`${row}-${item}-${i}`} className="shrink-0">
                            {item}
                          </span>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="projects" className="px-5 py-24 md:px-8 md:py-32">
              <div className="mx-auto max-w-7xl">
                <SectionTitle
                  eyebrow="Work"
                  title="Selected Projects."
                  ghost="Projects."
                />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.title} item={project} index={index} />
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" className="px-5 pb-24 pt-24 md:px-8 md:pb-32">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55 }}
                  className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center md:px-10 md:py-16"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
                  <div className="absolute left-1/2 top-[35%] h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/12 blur-[110px]" />

                  <div className="mb-3 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-violet-200/60">
                    <span className="h-px w-10 bg-white/20" />
                    Contact
                    <span className="h-px w-10 bg-white/20" />
                  </div>

                  <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                    Let’s work <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-white to-violet-200/70 bg-clip-text text-transparent">
                      together.
                    </span>
                  </h2>

                  <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/48 md:text-lg">
                    Saya terbuka untuk kolaborasi, belajar bareng, dan project seru.
                    Hubungi saya lewat social media di bawah ini.
                  </p>

                  <div className="mx-auto mt-10 grid max-w-2xl gap-4 md:grid-cols-3">
                    <a
                      href={SOCIALS.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-5 transition hover:bg-white/[0.05]"
                    >
                      <Github className="mx-auto text-white/70" size={20} />
                      <div className="mt-4 text-sm text-white/80">GitHub</div>
                    </a>

                    <a
                      href={SOCIALS.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-violet-300/15 bg-gradient-to-b from-violet-400/10 to-blue-400/5 px-5 py-5 shadow-[0_0_30px_rgba(139,92,246,0.16)] transition hover:brightness-110"
                    >
                      <TelegramLogo
                        size={20}
                        className="mx-auto text-sky-300"
                      />
                      <div className="mt-4 text-sm text-white/90">Telegram</div>
                    </a>

                    <a
                      href={SOCIALS.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-5 transition hover:bg-white/[0.05]"
                    >
                      <Instagram className="mx-auto text-white/70" size={20} />
                      <div className="mt-4 text-sm text-white/80">Instagram</div>
                    </a>
                  </div>

                  <div className="mt-10">
                    <a
                      href={SOCIALS.email}
                      className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-400 to-indigo-300 px-7 py-4 text-sm font-bold text-[#0d0c13] shadow-[0_0_40px_rgba(139,92,246,0.38)] transition hover:brightness-110"
                    >
                      <Mail size={18} />
                      Send an Email
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          <footer className="border-t border-white/6 px-5 py-8 text-sm text-white/28 md:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
              <div className="flex items-center gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/55">
                  Adit Kusuma
                </div>
              </div>
              <div>© {year} Bayu Rizky • Built with React, TypeScript & GSAP vibes.</div>
              <div className="text-white/45">• Available for hire</div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
