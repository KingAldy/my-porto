/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Bot, 
  Code2, 
  Cpu, 
  Globe, 
  Server, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown,
  ExternalLink,
  Terminal,
  Layers,
  Send
} from 'lucide-react';

// --- Types ---
interface Skill {
  name: string;
  rating: number;
  icon: React.ReactNode;
  description: string;
}

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Auto complete after 2.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
        >
          Welcome to <span className="text-brand-blue glow-text">My Portofolio</span>
        </motion.h1>
        <div className="w-full max-w-[200px] mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-brand-blue shadow-[0_0_10px_rgba(0,210,255,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in view
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          BR<span className="text-brand-blue">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-2 relative p-1 rounded-full bg-white/5 border border-white/5">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative px-6 py-2 text-sm font-medium transition-colors z-10 ${activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white'}`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 liquid-glass rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="https://t.me/aldyzzxy"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-6 py-2 rounded-full liquid-glass text-sm font-semibold flex items-center gap-2"
        >
          <Send size={16} className="text-brand-blue" />
          Telegram
        </motion.a>
      </div>
    </nav>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-square glass-card rounded-3xl flex items-center justify-center overflow-hidden"
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card p-8 rounded-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {skill.icon}
      </div>
      <div className="mb-6 p-3 bg-brand-blue/10 rounded-xl w-fit text-brand-blue">
        {skill.icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">{skill.name}</h3>
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {skill.description}
      </p>
      
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i < skill.rating ? 'bg-brand-blue shadow-[0_0_10px_rgba(0,210,255,0.5)]' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  
  const skills: Skill[] = [
    { 
      name: 'Bot Development', 
      rating: 4, 
      icon: <Bot size={24} />, 
      description: 'Expertise in creating automated solutions, telegram bots, and discord integration with complex logic.'
    },
    { 
      name: 'API Integration', 
      rating: 4, 
      icon: <Cpu size={24} />, 
      description: 'Seamlessly connecting third-party services and building robust communication layers between systems.'
    },
    { 
      name: 'Backend Scripting', 
      rating: 3, 
      icon: <Terminal size={24} />, 
      description: 'Developing efficient server-side logic, data processing scripts, and automation workflows.'
    },
    { 
      name: 'Web Development', 
      rating: 3, 
      icon: <Globe size={24} />, 
      description: 'Crafting responsive and modern user interfaces using React, Tailwind, and cutting-edge technologies.'
    },
    { 
      name: 'DevOps Dasar', 
      rating: 3, 
      icon: <Server size={24} />, 
      description: 'Foundational knowledge in deployment, CI/CD pipelines, and server management.'
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />

          <main>
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-brand-blue font-semibold tracking-widest uppercase text-sm mb-4">Available for Projects</h2>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Bayu Rizky <br />
                    <span className="text-brand-blue glow-text">Aldiano</span>
                  </h1>
                  <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
                    A passionate developer specializing in <span className="text-white">Bot Development</span> and <span className="text-white">API Integration</span>. Building elegant solutions for complex problems.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#about" className="px-8 py-4 rounded-full liquid-glass font-bold flex items-center gap-2 group">
                      About Me
                      <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                    <a href="https://t.me/aldyzzxy" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white text-brand-dark font-bold hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-white/5 flex items-center gap-2">
                      <Send size={20} />
                      Telegram
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  className="relative hidden lg:block perspective-[1000px]"
                >
                  <TiltCard>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[150%] h-[150%] opacity-20"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, var(--color-brand-blue), transparent)'
                        }}
                      />
                      <div className="z-20 text-center" style={{ transform: "translateZ(50px)" }}>
                        <img 
                          src="https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&w=800&q=80" 
                          alt="Bird" 
                          className="w-48 h-48 object-cover rounded-full border-4 border-brand-blue/30 shadow-[0_0_30px_rgba(0,210,255,0.3)] mb-6 mx-auto"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-4xl font-bold tracking-tighter">ALDIANO</div>
                        <div className="text-brand-blue font-mono tracking-widest text-sm">3D PERSPECTIVE</div>
                      </div>
                    </div>
                  </TiltCard>
                  {/* Decorative rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full -z-10" />
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2">
                      <img 
                        src="https://picsum.photos/seed/tech/800/1000" 
                        alt="Developer Profile" 
                        className="w-full h-full object-cover rounded-2xl opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-2xl hidden md:block">
                      <div className="text-4xl font-bold text-brand-blue">1+</div>
                      <div className="text-sm text-white/60">Years of Experience</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                      Crafting Digital <br />
                      <span className="text-brand-blue">Experiences</span>
                    </h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                      I am a developer who loves to explore new technologies and build things that solve real-world problems. My journey started with a curiosity for how things work under the hood, leading me to specialize in automation and backend systems.
                    </p>
                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <h4 className="font-bold text-xl mb-2">Philosophy</h4>
                        <p className="text-sm text-white/50">Clean code, efficient logic, and user-centric design are my core principles.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2">Goal</h4>
                        <p className="text-sm text-white/50">To bridge the gap between complex backend systems and intuitive user interfaces.</p>
                      </div>
                    </div>
                    <button className="px-8 py-4 rounded-full liquid-glass font-bold">
                      Download CV
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-32 px-6 bg-white/[0.02]">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    My <span className="text-brand-blue">Capabilities</span>
                  </motion.h2>
                  <p className="text-white/50 max-w-2xl mx-auto">
                    A comprehensive look at my technical expertise and the stars that represent my proficiency in each domain.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6">
              <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
                
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's Work <span className="text-brand-blue">Together</span></h2>
                <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                  Have a project in mind or just want to say hi? My inbox is always open.
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
                  <a href="mailto:tubulyubul@gmail.com" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <Mail className="text-brand-blue" />
                    <span>tubulyubul@gmail.com</span>
                  </a>
                  <a href="https://t.me/aldyzzxy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <Send className="text-brand-blue" />
                    <span></span>
                  </a>
                </div>

                <div className="flex gap-4 justify-center">
                  <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-brand-blue/20 transition-colors border border-white/10 text-white/70 hover:text-brand-blue">
                    <Github size={24} />
                  </a>
                  <a href="#" className="p-4 rounded-2xl bg-white/5 hover:bg-brand-blue/20 transition-colors border border-white/10 text-white/70 hover:text-brand-blue">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </section>
          </main>

          <footer className="py-12 px-6 border-t border-white/5 text-center text-white/30 text-sm">
            <div className="max-w-7xl mx-auto">
              <p>© {new Date().getFullYear()} Bayu Rizky Aldiano. All rights reserved.</p>
              <p className="mt-2">Built with React, Tailwind & Passion.</p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
