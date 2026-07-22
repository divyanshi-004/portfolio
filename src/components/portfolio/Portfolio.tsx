import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  ArrowUp,
  ExternalLink,
  MapPin,
  Send,
  FileText,
  Trophy,
  Code2,
  Database,
  Wrench,
  TestTube2,
  Layout,
  Server,
  GraduationCap,
  Rocket,
  Hospital,
  Utensils,
  Brain,
  ClipboardList,
  Sparkles,
  ChevronDown,
  Search,
  Star,
  GitFork,
  Users,
} from "lucide-react";

import profileImg from "@/assets/profile.jpg";
import restaurantImg from "@/assets/restaurant.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import csfaqImg from "@/assets/csfaq.jpg";
import examImg from "@/assets/exam.jpg";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "github", label: "GitHub" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const SKILLS: { group: string; items: { name: string; color: string }[] }[] = [
  { group: "Languages", items: [
    { name: "Java", color: "#f89820" },
    { name: "JavaScript", color: "#f7df1e" },
    { name: "HTML", color: "#e34f26" },
    { name: "CSS", color: "#1572b6" },
    { name: "SQL", color: "#00758f" },
  ]},
  { group: "Frontend", items: [
    { name: "React", color: "#61dafb" },
    { name: "Tailwind CSS", color: "#38bdf8" },
    { name: "Bootstrap", color: "#7952b3" },
  ]},
  { group: "Backend", items: [
    { name: "Node.js", color: "#3c873a" },
    { name: "Express.js", color: "#a8a8a8" },
  ]},
  { group: "Database", items: [
    { name: "MongoDB", color: "#47a248" },
    { name: "MySQL", color: "#00758f" },
  ]},
  { group: "Testing", items: [
    { name: "Manual Testing", color: "#10b981" },
    { name: "API Testing", color: "#06b6d4" },
    { name: "Postman", color: "#ff6c37" },
  ]},
  { group: "Tools", items: [
    { name: "Git", color: "#f1502f" },
    { name: "GitHub", color: "#e5e5e5" },
    { name: "VS Code", color: "#3b82f6" },
    { name: "Figma", color: "#f24e1e" },
  ]},
];

type Project = {
  slug: string;
  name: string;
  image: string;
  description: string;
  tech: string[];
  featured?: boolean;
  features: string[];
  challenges: string;
  learned: string;
};

const PROJECTS: Project[] = [
  {
    slug: "restaurant",
    name: "Restaurant Management System",
    image: restaurantImg,
    description: "A complete solution for managing restaurant operations including menu, orders, billing and admin management.",
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
    features: ["Menu & order management", "Billing system", "Admin dashboard", "Role-based access"],
    challenges: "Designing a normalized data model for menu, orders and billing that scales as items grow.",
    learned: "Solidified my understanding of REST APIs, JWT auth, and MongoDB aggregation pipelines.",
  },
  {
    slug: "hospital",
    name: "Hospital Management System",
    image: hospitalImg,
    description: "A system to manage patients, doctors, appointments, and hospital administration efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
    features: ["Patient records", "Appointment scheduling", "Doctor dashboards", "Role-based access"],
    challenges: "Modelling complex relationships between patients, doctors and visits without coupling collections.",
    learned: "Learned to structure larger codebases and apply role-based access patterns end-to-end.",
  },
  {
    slug: "csfaq",
    name: "CSFAQ (SmartIntern Project)",
    image: csfaqImg,
    description: "An intelligent FAQ system developed during SmartIntern to enhance user interaction and information retrieval.",
    tech: ["React", "Node.js", "MongoDB"],
    featured: true,
    features: ["Smart search", "Categorized FAQs", "Admin moderation", "Responsive UI"],
    challenges: "Ranking the most relevant answers from a growing knowledge base with simple heuristics.",
    learned: "How to scope a real internship deliverable, work to deadlines and ship something usable.",
  },
  {
    slug: "exam",
    name: "Online Examination System",
    image: examImg,
    description: "An examination platform with student login, online tests, result generation and evaluation system.",
    tech: ["React", "Node.js", "MySQL", "Express.js"],
    features: ["Student authentication", "Timed online tests", "Auto evaluation", "Result analytics"],
    challenges: "Preventing tab-switching and ensuring timer integrity even after refresh.",
    learned: "Stronger grasp of state persistence, server-trust boundaries, and SQL schema design.",
  },
];

const TIMELINE = [
  { year: "2023", title: "Started Learning Programming", desc: "Began my coding journey with C, Java and Web Development.", Icon: Code2, accent: "from-sky-500 to-cyan-400" },
  { year: "2024", title: "Built Restaurant Management System", desc: "Developed my first full-stack project.", Icon: Utensils, accent: "from-rose-500 to-pink-500" },
  { year: "2025", title: "Built Hospital Management System", desc: "Learned to build complex systems with role-based access.", Icon: Hospital, accent: "from-violet-500 to-fuchsia-500" },
  { year: "2026", title: "Worked on CSFAQ (SmartIntern)", desc: "Worked on an intelligent FAQ system during my internship.", Icon: Brain, accent: "from-amber-500 to-orange-500" },
  { year: "2026", title: "Developed Online Examination System", desc: "Built a complete exam platform with evaluation system.", Icon: ClipboardList, accent: "from-emerald-500 to-teal-500" },
  { year: "2026 — Present", title: "Learning MERN Stack", desc: "Continuously learning and building new projects.", Icon: Rocket, accent: "from-blue-500 to-indigo-500" },
];

const ACHIEVEMENTS = [
  { title: "Cross Roads Finalist", desc: "Participated in Cross Roads Tech Event.", color: "text-amber-400" },
  { title: "SmartIntern Project", desc: "Successfully completed SmartIntern project.", color: "text-emerald-400" },
  { title: "MERN Development", desc: "Building full-stack applications using MERN.", color: "text-violet-400" },
  { title: "Software Testing", desc: "Skilled in Manual and API Testing.", color: "text-sky-400" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mb-10"
    >
      <span className="section-label"><span className="section-dot" />{label}</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand to-violet text-white font-bold">DJ</span>
            <span className="hidden sm:block font-semibold tracking-tight">Divyanshi</span>
          </a>
          <ul className="hidden lg:flex items-center gap-1">
            {NAV.map(n => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${active === n.id ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition">
              Hire me <ArrowRight className="size-4" />
            </a>
            <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="lg:hidden grid place-items-center h-10 w-10 rounded-xl border border-border">
              <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass rounded-2xl p-2"
            >
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg text-sm hover:bg-white/5">{n.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <p className="text-lg text-muted-foreground">Hi, I'm</p>
          <h1 className="mt-2 text-5xl md:text-7xl font-semibold">
            <span className="gradient-text">Divyanshi Jain</span>
          </h1>
          <div className="mt-6 space-y-1 text-lg md:text-xl text-foreground/90">
            <p>BCA Student</p>
            <p>Full Stack MERN Developer</p>
            <p>Software Tester</p>
          </div>
          <div className="mt-5 text-brand text-lg md:text-xl font-medium h-8">
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 1800,
                "React Developer", 1800,
                "MERN Developer", 1800,
                "Software Tester", 1800,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              cursor
            />
          </div>
          <p className="mt-6 text-muted-foreground max-w-md">
            I build responsive web applications and love turning ideas into real-world solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
           <a
  href="/resume.pdf"
  download
  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet px-5 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 hover:opacity-95 transition"
>
  <Download className="size-4" /> Download Resume
</a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-white/5 transition">
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-white/5 transition">
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { href: "https://github.com/divyanshi-004", Icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/divyanshi-jain-a23003339?utm_source=share_via&utm_content=profile&utm_medium=member_android", Icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:diyaj96278@gmail.com", Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} aria-label={label} className="grid place-items-center h-10 w-10 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-brand transition">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/40 via-violet/30 to-transparent blur-3xl" />
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/5" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
              {[{ t: "⚛", x: "10%", y: "10%" }, { t: "JS", x: "85%", y: "20%" }, { t: "</>", x: "12%", y: "75%" }].map((b, i) => (
                <div key={i} className="absolute size-12 grid place-items-center rounded-2xl glass text-sm font-semibold" style={{ left: b.x, top: b.y }}>{b.t}</div>
              ))}
            </motion.div>
            <div className="absolute inset-12 rounded-full overflow-hidden border border-white/10 shadow-2xl">
              <img src={profileImg} alt="Divyanshi Jain" width={768} height={768} className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-12 flex justify-center">
        <a href="#about" className="text-muted-foreground text-sm inline-flex items-center gap-2 animate-pulse">
          <ChevronDown className="size-4" /> Scroll Down
        </a>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { v: "06+", l: "Projects" },
    { v: "35+", l: "Repositories" },
    { v: "18+", l: "Technologies" },
    { v: "450+", l: "Commits" },
    { v: "10+", l: "Certificates" },
    { v: "∞", l: "Learning" },
  ];
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="glass rounded-3xl p-8">
          <span className="section-label"><span className="section-dot" />About Me</span>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            I am a BCA student passionate about Full Stack Development using the MERN stack. I enjoy building responsive web applications, solving real-world problems, and writing clean, maintainable code. Alongside development, I have experience with software testing and API testing.
          </p>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet px-5 py-3 text-sm font-medium text-white hover:opacity-95 transition">
            Know More About Me <ArrowRight className="size-4" />
          </a>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-3 gap-3">
          {stats.map(s => (
            <div key={s.l} className="glass rounded-2xl p-5 text-center card-hover hover:[&]:[transform:translateY(-3px)]">
              <div className="text-2xl md:text-3xl font-semibold gradient-text">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const groupIcons: Record<string, any> = {
    Languages: Code2, Frontend: Layout, Backend: Server, Database: Database, Testing: TestTube2, Tools: Wrench,
  };
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="My Skills" title="A toolkit I keep sharp" subtitle="Languages, frameworks and tools I use to build and ship." />
        <div className="space-y-3">
          {SKILLS.map((g) => {
            const GIcon = groupIcons[g.group];
            return (
              <motion.div
                key={g.group}
                initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
                className="glass rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                  <GIcon className="size-4 text-brand" /> {g.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(i => (
                    <span key={i.name} className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm">
                      <span className="size-2 rounded-full" style={{ background: i.color, boxShadow: `0 0 10px ${i.color}` }} />
                      {i.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const filters = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.tech)))], []);
  const items = PROJECTS.filter(p =>
    (filter === "All" || p.tech.includes(filter)) &&
    (query.trim() === "" || p.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="section-label"><span className="section-dot" />Featured Projects</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Selected work</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="pl-9 pr-3 py-2 rounded-xl bg-secondary/60 border border-border text-sm outline-none focus:border-brand transition w-full sm:w-64"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${filter === f ? "bg-brand text-white border-brand" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((p, idx) => (
            <motion.article
              key={p.slug}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
              transition={{ delay: idx * 0.05 }}
              className="group glass rounded-3xl overflow-hidden card-hover hover:[&]:[transform:translateY(-4px)] hover:border-brand/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={576} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                {p.featured && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-brand/90 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                    <Sparkles className="size-3" /> Featured Project
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border">{t}</span>
                  ))}
                </div>
                <details className="mt-4 group/details">
                  <summary className="cursor-pointer text-sm text-brand hover:underline list-none">Project details</summary>
                  <div className="mt-3 text-sm text-muted-foreground space-y-2">
                    <div><span className="text-foreground font-medium">Features:</span> {p.features.join(", ")}</div>
                    <div><span className="text-foreground font-medium">Challenges:</span> {p.challenges}</div>
                    <div><span className="text-foreground font-medium">What I learned:</span> {p.learned}</div>
                  </div>
                </details>
                <div className="mt-5 flex gap-2">
                  <a href="#" className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-border hover:bg-white/5"><ExternalLink className="size-3.5" /> Live Demo</a>
                  <a href="#" className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-border hover:bg-white/5"><Github className="size-3.5" /> GitHub</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Experience Timeline" title="My journey so far" />
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-violet to-transparent" />
          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
                className="relative glass rounded-2xl p-5 sm:p-6"
              >
                <div className={`absolute -left-[34px] sm:-left-[42px] top-6 grid place-items-center size-10 rounded-xl bg-gradient-to-br ${t.accent} text-white shadow-lg`}>
                  <t.Icon className="size-5" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold">{t.title}</h3>
                  <span className="text-xs text-muted-foreground">{t.year}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Achievements" title="Milestones I'm proud of" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 text-center card-hover hover:[&]:[transform:translateY(-4px)] hover:border-brand/40"
            >
              <Trophy className={`mx-auto size-8 ${a.color}`} />
              <h3 className="mt-4 font-semibold">{a.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type GhUser = { name?: string; login: string; bio?: string; public_repos: number; followers: number; following: number; avatar_url: string };
type GhRepo = { id: number; name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number };

function GitHubSection() {
  const username = "divyanshi-004";
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);

  useEffect(() => {
    let cancel = false;
    fetch(`https://api.github.com/users/${username}`).then(r => r.ok ? r.json() : null).then(d => { if (!cancel) setUser(d); }).catch(() => {});
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`).then(r => r.ok ? r.json() : []).then(d => { if (!cancel && Array.isArray(d)) setRepos(d); }).catch(() => {});
    return () => { cancel = true; };
  }, []);

  const fallback = {
    name: "Divyanshi Jain", login: username, bio: "BCA Student | Full Stack Developer",
    public_repos: 35, followers: 25, following: 20,
  };
  const u = user || (fallback as any);

  const fallbackRepos: GhRepo[] = [
    { id: 1, name: "restaurant-management-system", html_url: "#", description: "Full Stack Restaurant Management System", language: "JavaScript", stargazers_count: 24, forks_count: 6 },
    { id: 2, name: "hospital-management-system", html_url: "#", description: "Hospital Management System", language: "JavaScript", stargazers_count: 18, forks_count: 4 },
    { id: 3, name: "csfaq-smartintern", html_url: "https://github.com/divyanshi-004/interflowFAQ", description: "Intelligent FAQ System", language: "JavaScript", stargazers_count: 31, forks_count: 7 },
    { id: 4, name: "online-examination-system", html_url: "#", description: "Online Exam Platform", language: "JavaScript", stargazers_count: 22, forks_count: 5 },
  ];
  const showRepos = repos.length ? repos : fallbackRepos;

  const stats = [
    { v: `${u.public_repos}+`, l: "Repositories" },
    { v: "450+", l: "Commits" },
    { v: `${u.followers}+`, l: "Followers" },
    { v: `${u.following}+`, l: "Following" },
  ];

  return (
    <section id="github" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="GitHub Stats" title="Open-source activity" />
        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-4">
            <img src={profileImg} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
            <div>
              <div className="font-semibold">{u.login}</div>
              <div className="text-sm text-muted-foreground">{u.bio}</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.l} className="rounded-2xl bg-secondary/40 border border-border p-4 text-center">
                <div className="text-2xl font-semibold gradient-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <ContributionGraph />
        </div>

        <h3 className="mt-8 mb-4 font-semibold">Pinned Repositories</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {showRepos.map(r => (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 block card-hover hover:[&]:[transform:translateY(-3px)] hover:border-brand/40">
              <div className="flex items-center gap-2 text-brand font-medium">
                <Github className="size-4" /> {r.name}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                {r.language && <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-yellow-400" />{r.language}</span>}
                <span className="inline-flex items-center gap-1"><Star className="size-3" />{r.stargazers_count}</span>
                <span className="inline-flex items-center gap-1"><GitFork className="size-3" />{r.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, () => Math.random());
  const color = (v: number) => {
    if (v < 0.25) return "rgba(255,255,255,0.05)";
    if (v < 0.5) return "rgba(59,130,246,0.35)";
    if (v < 0.75) return "rgba(59,130,246,0.6)";
    return "rgba(99,102,241,0.9)";
  };
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
        <span>Contributions in the last year</span>
        <a href="#" className="text-brand hover:underline">More</a>
      </div>
      <div className="grid grid-flow-col auto-cols-min gap-[3px] overflow-x-auto pb-1">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="grid grid-rows-7 gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const v = cells[w * days + d];
              return <div key={d} className="size-3 rounded-[3px]" style={{ background: color(v) }} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Resume" title="My one-page summary" />
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="grid place-items-center size-24 rounded-2xl bg-gradient-to-br from-brand/20 to-violet/20 border border-border">
            <FileText className="size-10 text-brand" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-xl font-semibold">Divyanshi Jain</div>
            <div className="text-sm text-muted-foreground">Full Stack MERN Developer · Software Tester</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-white/5"
>
  <FileText className="size-4" /> Preview Resume
</a>
            <a
  href="/resume.pdf"
  download
  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet px-4 py-2.5 text-sm font-medium text-white"
>
  <Download className="size-4" /> Download Resume
</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Let's Connect" title="Reach out for opportunities" />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
          <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8 space-y-3">
            <input required placeholder="Your Name" className="w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none focus:border-brand" />
            <input required type="email" placeholder="Your Email" className="w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none focus:border-brand" />
            <input required placeholder="Subject" className="w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none focus:border-brand" />
            <textarea required placeholder="Your Message" rows={5} className="w-full rounded-xl bg-secondary/60 border border-border px-4 py-3 text-sm outline-none focus:border-brand resize-none" />
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-violet px-5 py-3 text-sm font-medium text-white">
              {sent ? "Sent!" : "Send Message"} <Send className="size-4" />
            </button>
          </form>
          <div className="space-y-3">
            {[
              { Icon: Mail, label: "Email", value: "diyaj96278@gmail.com" },
              { Icon: Linkedin, label: "LinkedIn", value: "https://www.linkedin.com/in/divyanshi-jain-a23003339?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { Icon: Github, label: "GitHub", value: "https://github.com/divyanshi-004" },
              { Icon: MapPin, label: "Location", value: "India" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="grid place-items-center size-11 rounded-xl bg-secondary/60 border border-border">
                  <Icon className="size-5 text-brand" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-sm font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-brand to-violet text-white font-bold">DJ</span>
            <span className="font-semibold">Divyanshi</span>
          </div>
          <p className="mt-3 text-muted-foreground">Building digital solutions and learning every day.</p>
          <div className="mt-4 flex gap-2">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="grid place-items-center h-9 w-9 rounded-xl border border-border text-muted-foreground hover:text-foreground">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            {NAV.slice(0, 6).map(n => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Top Technologies</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            {["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "Tailwind CSS"].map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Other Links</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><a href="#github" className="hover:text-foreground">GitHub</a></li>
            <li><a href="#resume" className="hover:text-foreground">Resume</a></li>
            <li>Blog (Coming Soon)</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Divyanshi Jain. All rights reserved.</span>
          <span>Built with React + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand via-violet to-brand origin-left z-[60]" />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid place-items-center size-11 rounded-full bg-gradient-to-br from-brand to-violet text-white shadow-lg shadow-brand/30"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    NAV.forEach(n => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-brand to-violet text-white font-bold text-xl animate-pulse">DJ</div>
            <div className="text-xs text-muted-foreground tracking-widest uppercase">Loading portfolio…</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const active = useActiveSection();
  const [loaded, setLoaded] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-foreground antialiased">
      <Loader done={loaded} />
      <ScrollProgress />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <GitHubSection />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
