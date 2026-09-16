import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Lock,
  User,
  MessageSquare,
  FileEdit,
  ArrowUp,
  Heart,
} from 'lucide-react';
import { GithubLogo, LinkedinLogo } from '../components/Logos';
import { useReveal } from '../hooks/useReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const headerRef = useReveal(0.1) as React.RefObject<HTMLDivElement>;
  const cardsRef  = useReveal(0.05) as React.RefObject<HTMLDivElement>;
  const formRef   = useReveal(0.05) as React.RefObject<HTMLDivElement>;

  const contactList = [
    {
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      label: 'Email',
      value: 'skrehanahamed97@gmail.com',
      subtext: 'Drop me an email anytime',
      href: 'mailto:skrehanahamed97@gmail.com'
    },
    {
      icon: <Phone className="w-4 h-4 text-sky-400" />,
      label: 'Phone',
      value: '+91 70442 73357',
      subtext: 'Available for calls (India)',
      href: 'tel:+917044273357'
    },
    {
      icon: <MapPin className="w-4 h-4 text-sky-400" />,
      label: 'Location',
      value: 'Bangalore, Karnataka, India',
      subtext: 'Open to Remote | Relocation',
      href: null
    },
    {
      icon: <LinkedinLogo className="w-4 h-4 text-sky-400" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/skrehanahamed',
      subtext: "Let's connect professionally",
      href: 'https://linkedin.com/in/skrehanahamed'
    },
    {
      icon: <GithubLogo className="w-4 h-4 text-sky-400" />,
      label: 'GitHub',
      value: 'github.com/skrehanahamed',
      subtext: 'Check out my projects',
      href: 'https://github.com/skrehanahamed'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };


  return (
    <section
      id="contact"
      className="relative w-full h-auto lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] pt-14 sm:pt-16 lg:pt-1 pb-4 lg:pb-2 px-4 sm:px-6 lg:px-10 bg-[#020509] flex flex-col justify-between overflow-hidden select-none scroll-mt-16"
    >
      {/* ── BACKGROUND: Experience Image (Car on alpine road with signboard already in photo) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/assets/experience/image.png"
          alt="Contact Mountain Highway Car"
          className="w-full h-full object-cover object-center brightness-110 contrast-110 saturate-110"
          draggable={false}
        />
        {/* Heavy gradient on mobile for readability over photo, lighter on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020509] via-[#020509]/80 md:via-[#020509]/55 lg:via-[#020509]/20 to-[#020509]/60 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020509]/80 via-[#020509]/30 lg:via-transparent to-[#020509]/40 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between gap-1.5 lg:gap-2 relative z-10">
        
        {/* ══════════════════════════════════════════════════════
            1. TOP HEADER (Title, Philosophy, Highway Sign)
        ══════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="reveal flex items-start justify-between gap-4 pt-1 flex-shrink-0">
          <div className="space-y-0.5 max-w-xl">
            <div className="flex items-center space-x-2 text-[8.5px] font-mono-tech text-sky-400 font-semibold uppercase tracking-[0.22em]">
              <span>/ 05</span>
              <span className="w-5 h-[1px] bg-sky-400/60" />
              <span>CONTACT</span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black font-heading text-white leading-tight">
              Let's Build{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg,#4FC3FF 0%,#159FFF 55%,#0077CC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Something Great.
              </span>
            </h2>
            <p className="text-[10px] lg:text-[10.5px] text-[#9BA8B5] leading-snug line-clamp-2">
              I'm always open to discussing new opportunities, interesting projects, collaborations, or just having a conversation about automotive technology. Feel free to reach out — I'll get back to you as soon as possible!
            </p>
          </div>

          {/* Right Tagline from screenshot */}
          <div className="hidden md:flex flex-col items-end text-right space-y-0.5 pr-1 flex-shrink-0">
            <div className="text-[10.5px] italic text-[#CAD5E2] font-medium leading-none">
              &ldquo;Better Vehicles. Brighter Journeys.&rdquo;
            </div>
            <span className="text-[8px] font-mono-tech text-sky-400/80 tracking-widest uppercase">
              SK REHAN AHAMED
            </span>
            <div className="w-8 h-[1px] bg-sky-400/60 mt-0.5" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            2. MIDDLE CORE CONTENT (5 Contact Cards + Glass Form)
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 flex-1 min-h-0 items-start lg:items-center">
          
          {/* Left: Contact Info Cards — horizontal scroll on mobile, stack on desktop */}
          <div ref={cardsRef} className="reveal-left lg:col-span-4 xl:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1.5 h-auto lg:h-full lg:max-h-[380px] pb-1 lg:pb-0 no-scrollbar">
            {contactList.map((item, idx) => {
              const Content = (
                <div className="flex items-center space-x-2.5 p-2 sm:p-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/[0.08] hover:border-sky-500/40 hover:bg-black/60 transition-all duration-200 group shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/30 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-sky-400 transition-colors">
                    {item.icon}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <span className="text-[9px] font-mono-tech uppercase tracking-wider text-gray-400 block font-semibold leading-none">
                      {item.label}
                    </span>
                    <span className="text-[11.5px] sm:text-xs font-semibold text-white group-hover:text-sky-300 transition-colors truncate block leading-snug">
                      {item.value}
                    </span>
                    <span className="text-[9px] text-[#8696A7] truncate block leading-none">
                      {item.subtext}
                    </span>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="block cursor-pointer flex-shrink-0 min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full"
                >
                  {Content}
                </a>
              ) : (
                <div key={idx} className="flex-shrink-0 min-w-[220px] sm:min-w-[240px] lg:min-w-0 w-full">{Content}</div>
              );
            })}
          </div>

          {/* Center: Glass Contact Form */}
          <div ref={formRef} className="reveal-right col-span-1 lg:col-span-6 xl:col-span-5 h-full lg:max-h-[380px] flex flex-col justify-between" style={{'--delay': '100ms'} as React.CSSProperties}>
            <div className="rounded-2xl p-3.5 sm:p-4 border border-white/[0.05] shadow-xl h-full flex flex-col justify-between relative overflow-hidden bg-black/20 backdrop-blur-sm">
              {/* Top Accent Line — shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] animate-shimmer-line" />

              <div className="flex items-center space-x-2 pb-2 border-b border-white/[0.05] flex-shrink-0">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2 flex-1 flex flex-col justify-between pt-2">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 bg-transparent border-0 border-b border-white/[0.12] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-400/60 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-400 text-xs focus:outline-none focus:border-sky-400/70 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 bg-transparent border-0 border-b border-white/[0.12] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-400/60 transition-all"
                  />
                </div>

                {/* Row 3: Message */}
                <div className="relative flex-1 min-h-[70px]">
                  <FileEdit className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your idea, opportunity, or just say hello..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-full pl-8 pr-3 py-1.5 bg-transparent border-0 border-b border-white/[0.12] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-400/60 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50"
                  style={{
                    background: 'linear-gradient(90deg, #0284C7 0%, #0369A1 100%)',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message →'}</span>
                </button>

                {isSuccess && (
                  <p className="text-[10px] text-emerald-400 text-center font-medium leading-none">
                    Thank you! Message received. I'll get back to you shortly.
                  </p>
                )}

                <div className="flex items-center justify-center space-x-1.5 text-[9.5px] text-gray-400 pt-0.5">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>I'll never share your information with anyone.</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right spacer – signboard is already in the background image */}
          <div className="hidden xl:col-span-3 xl:flex" />

        </div>

        {/* ══ FOOTER BAR (integrated — no overflow) ══ */}
        <div className="flex-shrink-0 border-t border-white/[0.07] pt-1.5 pb-0.5 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-black text-white tracking-wider font-heading">SK</span>
            <span className="text-xs font-bold text-white tracking-wider font-heading">REHAN AHAMED</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-[10px] text-gray-400 font-mono-tech">Embedded Developer · Automotive Enthusiast</span>
          </div>

          {/* Center social icons */}
          <div className="flex items-center space-x-2">
            <a href="https://github.com/skrehanahamed" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <GithubLogo className="w-3 h-3" />
            </a>
            <a href="https://linkedin.com/in/skrehanahamed" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <LinkedinLogo className="w-3 h-3" />
            </a>
            <a href="mailto:skrehanahamed97@gmail.com" aria-label="Email"
              className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <Mail className="w-3 h-3" />
            </a>
          </div>

          {/* Right: copyright + back to top */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1 text-[9.5px] text-gray-400">
              <Heart className="w-2.5 h-2.5 text-sky-400 fill-sky-400" />
              <span>&copy; 2026 SK Rehan Ahamed. All rights reserved.</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-6 h-6 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-600 hover:border-sky-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
