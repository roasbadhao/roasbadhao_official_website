import React, { useEffect, useRef, useState } from "react";
import {
  Target,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Heart,
  Eye,
  Lightbulb,
  Rocket,
  BarChart3,
  ArrowRight,
  Calendar,
  Phone,
} from "lucide-react";
import heroVideo from '../assets/video/about-hero-new.mp4'

/* ─────────────────────────────── DATA ─────────────────────────────── */
const milestones = [
  {
    date: "5 January 2026",
    title: "RoasBadhao Founded",
    description: "Raushan Saxena started the agency with a vision to deliver real ROI",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    date: "Month 1",
    title: "First 10 Clients Onboarded",
    description: "Started working with Real Estate and Healthcare businesses",
    icon: <Users className="w-6 h-6" />,
  },
  {
    date: "Month 3",
    title: "₹2 Cr+ Ad Spend Managed",
    description: "Successfully managed campaigns across multiple industries",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    date: "Present",
    title: "₹7.5 Cr+ Revenue Generated",
    description: "Delivered measurable results for 21+ happy clients",
    icon: <Award className="w-6 h-6" />,
  },
];

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Performance-First",
    description: "Every campaign is designed to deliver measurable ROI, not just vanity metrics",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Transparent & Honest",
    description: "No unrealistic guarantees, no confusing jargon — just clear strategies and honest communication",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Founder-Led Approach",
    description: "Direct involvement from leadership in strategy, execution, and optimization",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Sustainable Growth",
    description: "Building long-term marketing systems that deliver consistent results over time",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Client Success First",
    description: "Your growth is our success — we win when you win",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Data-Driven Decisions",
    description: "Every strategy backed by analytics, testing, and continuous optimization",
  },
];

const industriesServed = [
  { name: "Real Estate", icon: "🏢", clients: "5+" },
  { name: "Healthcare", icon: "🏥", clients: "4+" },
  { name: "D2C Brands", icon: "🛍️", clients: "2+" },
  { name: "Local Services", icon: "🔧", clients: "10+" },
];

const stats = [
  { number: 200, suffix: "+", label: "Happy Clients", icon: <Users /> },
  { number: 2, suffix: " Cr+", label: "Ad Spend Managed", icon: <TrendingUp /> },
  { number: 7.5, suffix: " Cr+", label: "Revenue Generated", icon: <BarChart3 /> },
  { number: 500, suffix: "+", label: "Campaigns Delivered", icon: <Target /> },
];

const teamValues = [
  {
    title: "Real Experience",
    description: "Built from hands-on campaign management across multiple industries",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Real Execution",
    description: "Every strategy is implemented with precision and attention to detail",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Real Results",
    description: "Focused on delivering measurable outcomes that impact your bottom line",
    icon: <Target className="w-6 h-6" />,
  },
];

/* ─────────────────────── STYLES ─────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --g:    #006039;
    --g2:   #008a52;
    --g3:   #00b86e;
    --g4:   #00d47d;
    --gold: #c9a84c;
    --gold2:#f0c95e;
    --dark: #010d08;
    --dark2:#031a0f;
    --dark3:#052918;
    --border: rgba(0,180,110,0.18);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: #e8f5ee;
    overflow-x: hidden;
  }

  body::before {
    content:'';
    position:fixed; inset:0; z-index:0; pointer-events:none;
    opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px;
  }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--dark); }
  ::-webkit-scrollbar-thumb { background:var(--g2); border-radius:4px; }

  .text-grad {
    background: linear-gradient(135deg, var(--g3) 0%, var(--gold2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-grad-gold {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-grad-red {
    background: linear-gradient(135deg, #e05555 0%, #f0a040 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow-line {
    width:80px; height:3px;
    background: linear-gradient(90deg, var(--g3), var(--gold2));
    border-radius:99px;
    box-shadow: 0 0 12px var(--g3);
  }

  .badge {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,96,57,0.2);
    border:1px solid rgba(0,180,110,0.3);
    backdrop-filter:blur(12px);
    padding:8px 20px; border-radius:99px;
    font-size:13px; font-weight:600; letter-spacing:0.04em;
    color:var(--g4);
  }

  /* ── LAYOUT ── */
  .ab-section { padding:100px 24px; position:relative; }
  .ab-inner   { max-width:1280px; margin:0 auto; }

  .section-label {
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--g3); margin-bottom:16px;
  }
  .section-title {
    font-family:'Poppins',sans-serif;
    font-size:clamp(2rem,4vw,3.2rem);
    font-weight:800; line-height:1.1;
    letter-spacing:-0.02em; color:#fff;
    margin-bottom:20px;
  }
  .section-desc {
    color:#8ab09a; font-size:0.95rem; line-height:1.75;
  }

  /* ── HERO ── */
  .ab-hero {
    position:relative; min-height:90vh;
    display:flex; align-items:center; overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 60%),
      var(--dark);
  }

  .ab-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,180,110,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,110,0.06) 1px, transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    animation:gridScroll 20s linear infinite;
  }
  @keyframes gridScroll {
    from { background-position:0 0; }
    to   { background-position:60px 60px; }
  }

  .orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
    animation:orbFloat 8s ease-in-out infinite;
  }
  .orb1 { width:500px;height:500px; background:radial-gradient(circle,rgba(0,140,70,0.25),transparent 70%); top:-10%;left:-10%; }
  .orb2 { width:400px;height:400px; background:radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%); bottom:0;right:-5%; animation-delay:3s; }
  .orb3 { width:300px;height:300px; background:radial-gradient(circle,rgba(0,96,57,0.3),transparent 70%); top:40%;left:40%; animation-delay:1.5s; }
  @keyframes orbFloat {
    0%,100% { transform:translate(0,0) scale(1); }
    33%      { transform:translate(30px,-20px) scale(1.05); }
    66%      { transform:translate(-20px,15px) scale(0.97); }
  }

  .aura-ring {
    position:absolute; border-radius:50%;
    border:1px solid rgba(0,180,110,0.3); pointer-events:none;
  }
  .ring1{width:400px;height:400px;left:-100px;top:100px; animation:ringPulse 4s ease-out infinite;}
  .ring2{width:600px;height:600px;left:-200px;top:0;    animation:ringPulse 4s ease-out 1.3s infinite;}
  .ring3{width:800px;height:800px;left:-300px;top:-100px;animation:ringPulse 4s ease-out 2.6s infinite;}
  @keyframes ringPulse {
    0%  {transform:scale(1);  opacity:0.4;}
    100%{transform:scale(1.5);opacity:0;}
  }

  .ab-hero-content { position:relative; z-index:2; max-width:1280px;  padding:0 48px; }

  .ab-hero h1 {
        font-family: 'Poppins', sans-serif;
    font-size: clamp(2.6rem, 4vw, 5.2rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #fff;
    margin:24px 0;
  }
  .ab-hero-sub {
    font-size:clamp(1rem,2vw,1.2rem); color:#a3c4b0; line-height:1.7;
    max-width:680px; margin-bottom:40px;
  }

  /* scroll indicator */
  .scroll-dot {
    position:absolute; bottom:40px; left:50%; transform:translateX(-50%);
    display:flex; flex-direction:column; align-items:center; gap:6px;
    animation:bounceY 1.8s ease-in-out infinite;
  }
  .scroll-dot-ring {
    width:24px;height:40px;border:2px solid rgba(0,180,110,0.4);
    border-radius:99px; display:flex; justify-content:center; padding-top:6px;
  }
  .scroll-dot-inner {
    width:4px;height:10px;background:var(--g3);border-radius:99px;
    animation:scrollPulse 1.8s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100%{transform:translateY(0);opacity:1;}
    50%{transform:translateY(6px);opacity:0.4;}
  }
  @keyframes bounceY {
    0%,100%{transform:translateX(-50%) translateY(0);}
    50%{transform:translateX(-50%) translateY(6px);}
  }

  /* ── STATS ── */
  .stats-wrap { padding:80px 24px; background:var(--dark2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .stats-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; max-width:1280px; margin:0 auto; }
  @media(min-width:768px){ .stats-grid{grid-template-columns:repeat(4,1fr);} }

  .stat-card {
    position:relative; overflow:hidden;
    background:rgba(0,96,57,0.08); border:1px solid var(--border);
    border-radius:24px; padding:36px 28px; text-align:center;
    transition:transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  }
  .stat-card::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(circle at 50% 0%, rgba(0,180,110,0.12), transparent 60%);
    opacity:0; transition:opacity 0.3s;
  }
  .stat-card:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 20px 60px rgba(0,96,57,0.3); border-color:rgba(0,212,125,0.4); }
  .stat-card:hover::before { opacity:1; }
  .stat-num {
    font-family:'Poppins',sans-serif; font-weight:800;
    font-size:clamp(2.4rem,4vw,3.2rem); line-height:1;
    background:linear-gradient(135deg,var(--g4) 0%,var(--gold2) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    display:block; margin-bottom:8px;
  }
  .stat-icon { color:var(--g3); margin-bottom:12px; display:flex; justify-content:center; }

  /* ── BUTTONS ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff; padding:14px 32px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:700; font-size:16px;
    border:none; cursor:pointer; text-decoration:none;
    position:relative; overflow:hidden;
    box-shadow:0 0 30px rgba(0,140,70,0.4),inset 0 1px 0 rgba(255,255,255,0.15);
    transition:transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 50px rgba(0,180,110,0.6); }
  .btn-ghost {
    display:inline-flex; align-items:center; gap:10px;
    background:transparent; color:#d1edd8;
    padding:14px 32px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:600; font-size:16px;
    border:1.5px solid rgba(0,180,110,0.35); cursor:pointer; text-decoration:none;
    transition:border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .btn-ghost:hover { border-color:var(--g3); background:rgba(0,96,57,0.12); transform:translateY(-2px); }

  /* ── CARDS ── */
  .glass-card {
    background:rgba(0,96,57,0.07);
    border:1px solid var(--border);
    border-radius:28px;
    transition:transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  }
  .glass-card:hover {
    transform:translateY(-6px);
    border-color:rgba(0,212,125,0.35);
    box-shadow:0 20px 60px rgba(0,96,57,0.25);
  }

  .icon-wrap {
    width:72px;height:72px;border-radius:20px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff; margin-bottom:20px;
    box-shadow:0 0 24px rgba(0,140,70,0.35);
  }
  .icon-wrap-sm {
    width:56px;height:56px;border-radius:16px;
    background:linear-gradient(135deg,rgba(0,96,57,0.3),rgba(0,140,70,0.2));
    border:1px solid rgba(0,180,110,0.2);
    display:flex;align-items:center;justify-content:center;
    color:var(--g3); margin-bottom:16px;
    transition:transform 0.3s;
  }
  .glass-card:hover .icon-wrap-sm { transform:scale(1.1); }

  /* ── GRIDS ── */
  .grid-2 { display:grid; gap:24px; }
  @media(min-width:900px){ .grid-2{grid-template-columns:1fr 1fr; align-items:center;} }
  .grid-3 { display:grid; gap:24px; }
  @media(min-width:600px){ .grid-3{grid-template-columns:repeat(2,1fr);} }
  @media(min-width:900px){ .grid-3{grid-template-columns:repeat(3,1fr);} }
  .grid-4 { display:grid; gap:24px; }
  @media(min-width:600px){ .grid-4{grid-template-columns:repeat(2,1fr);} }
  @media(min-width:900px){ .grid-4{grid-template-columns:repeat(4,1fr);} }

  /* ── FOUNDER IMAGE BLOCK ── */
  .founder-img-wrap {
    position:relative; border-radius:28px; overflow:hidden;
    border:1px solid var(--border);
  }
  .founder-img-wrap::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(180deg,transparent 50%,rgba(0,96,57,0.5));
    z-index:1; pointer-events:none;
  }
  .founder-img-wrap img {
    width:100%; object-fit:cover; display:block;
    height:420px;
  }
  .founder-badge {
    position:absolute; bottom:24px; right:24px; z-index:2;
    background:rgba(0,20,10,0.7);
    border:1px solid var(--border);
    backdrop-filter:blur(16px);
    border-radius:20px; padding:20px 24px;
    display:flex; align-items:center; gap:16px;
  }
  .founder-badge .fb-icon {
    width:48px;height:48px;border-radius:14px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;color:#fff;
    box-shadow:0 0 20px rgba(0,140,70,0.4);
  }

  /* ── TIMELINE ── */
  .timeline { position:relative; }
  .timeline::before {
    content:''; display:none;
  }
  @media(min-width:900px){
    .timeline::before {
      content:'';display:block;
      position:absolute; left:50%; top:0; bottom:0;
      width:2px; transform:translateX(-50%);
      background:linear-gradient(180deg,var(--g3),var(--gold2),var(--g3));
      box-shadow:0 0 16px var(--g3);
    }
  }
  .timeline-item {
    display:flex; flex-direction:column; gap:24px;
    align-items:center; margin-bottom:48px;
  }
  @media(min-width:900px){
    .timeline-item { flex-direction:row; }
    .timeline-item.even { flex-direction:row-reverse; }
  }
  .timeline-card {
    flex:1; background:rgba(0,96,57,0.07);
    border:1px solid var(--border); border-radius:24px; padding:32px;
    transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;
  }
  .timeline-card:hover { transform:translateY(-4px); border-color:rgba(0,212,125,0.35); box-shadow:0 16px 40px rgba(0,96,57,0.2); }
  .timeline-dot {
    width:64px;height:64px;border-radius:50%;flex-shrink:0;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff; position:relative; z-index:2;
    box-shadow:0 0 32px rgba(0,140,70,0.5);
    border:3px solid var(--dark);
  }
  .timeline-spacer { flex:1; display:none; }
  @media(min-width:900px){ .timeline-spacer{display:block;} }

  /* ── QUOTE BLOCK ── */
  .quote-block {
    background:rgba(0,96,57,0.1); border:1px solid rgba(0,180,110,0.2);
    border-radius:20px; padding:28px;
    border-left:3px solid var(--g3);
  }

  /* ── VISION TAGS ── */
  .vision-tag {
    background:rgba(0,96,57,0.12); border:1px solid rgba(0,180,110,0.2);
    border-radius:99px; padding:12px 28px;
    font-family:'Poppins',sans-serif; font-weight:700;
    font-size:1rem;
    background-clip:text; color:transparent;
  }

  /* ── TRANSPARENT APPROACH ── */
  .transparent-row { display:grid; gap:20px; }
  @media(min-width:600px){ .transparent-row{grid-template-columns:repeat(3,1fr);} }

  .check-card {
    background:rgba(0,96,57,0.08); border:1px solid var(--border);
    border-radius:20px; padding:28px; text-align:center;
    transition:transform 0.3s, border-color 0.3s;
  }
  .check-card:hover { transform:translateY(-4px); border-color:rgba(0,212,125,0.3); }

  /* ── CTA SECTION ── */
  .cta-section {
    padding:100px 24px; text-align:center;
    position:relative; overflow:hidden;
    background:linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%);
  }
  .cta-section::before {
    content:''; position:absolute; inset:0;
    background-image:radial-gradient(circle at 2px 2px, rgba(0,180,110,0.12) 1px, transparent 0);
    background-size:40px 40px;
  }

  /* ── DIVIDER ── */
  .divider {
    height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,180,110,0.2),rgba(201,168,76,0.15),rgba(0,180,110,0.2),transparent);
  }

  /* ── REVEAL ── */
  .reveal { opacity:0; transform:translateY(40px); transition:opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-delay-1{transition-delay:0.1s;} .reveal-delay-2{transition-delay:0.2s;}
  .reveal-delay-3{transition-delay:0.3s;} .reveal-delay-4{transition-delay:0.4s;}

  .stagger > *:nth-child(1){transition-delay:0.05s;} .stagger > *:nth-child(2){transition-delay:0.15s;}
  .stagger > *:nth-child(3){transition-delay:0.25s;} .stagger > *:nth-child(4){transition-delay:0.35s;}
  .stagger > *:nth-child(5){transition-delay:0.45s;} .stagger > *:nth-child(6){transition-delay:0.55s;}

  /* ── CURSOR GLOW ── */
  .cursor-glow {
    position:fixed; width:400px;height:400px;
    background:radial-gradient(circle,rgba(0,140,70,0.06),transparent 70%);
    border-radius:50%; pointer-events:none; z-index:9999;
    transform:translate(-50%,-50%);
    transition:left 0.1s ease, top 0.1s ease;
  }

  /* ── INDUSTRIES CARDS ── */
  .industry-card {
    background:rgba(0,96,57,0.07); border:1px solid var(--border);
    border-radius:28px; padding:36px 24px; text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.4), border-color 0.3s, box-shadow 0.3s;
  }
  .industry-card:hover { transform:translateY(-8px) scale(1.04); border-color:rgba(0,212,125,0.4); box-shadow:0 24px 60px rgba(0,96,57,0.3); }
  .industry-icon { font-size:3.5rem; margin-bottom:16px; display:block; transition:transform 0.3s; }
  .industry-card:hover .industry-icon { transform:scale(1.2); }
  .industry-clients {
    font-family:'Poppins',sans-serif; font-weight:800; font-size:2.2rem;
    background:linear-gradient(135deg,var(--g3),var(--gold2));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    display:block; margin-top:4px;
  }

  /* ── FOCUS PILLS ── */
  .focus-pill {
    background:rgba(0,96,57,0.1); border:1px solid rgba(0,180,110,0.2);
    border-radius:99px; padding:12px 28px;
    font-size:0.9rem; font-weight:600; color:#b0d4be;
    transition:border-color 0.2s, background 0.2s;
  }
  .focus-pill:hover { border-color:rgba(0,212,125,0.4); background:rgba(0,96,57,0.2); }
  .hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* 🌑 LEFT DARK → RIGHT CLEAR */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;

  background: linear-gradient(
    to right,
    rgba(5, 10, 20, 0.95) 0%,
    rgba(5, 10, 20, 0.85) 30%,
    rgba(5, 10, 20, 0.6) 55%,
    rgba(5, 10, 20, 0.25) 75%,
    rgba(5, 10, 20, 0) 100%
  );
}
`;

/* ─────────────────────── HOOKS ─────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursorGlow() {
  useEffect(() => {
    const cursor = document.getElementById("cursor-glow");
    if (!cursor) return;
    const move = (e) => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}

/* ─────────────────────── COUNTER ─────────────────────── */
function CounterCard({ target, suffix, label, icon, start }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const inc = target / 70;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(t); }
      setCount(cur);
    }, 18);
    return () => clearInterval(t);
  }, [start, target]);

  return (
    <div className="stat-card reveal">
      <div className="stat-icon">
        {React.cloneElement(icon, { style: { width: 40, height: 40 } })}
      </div>
      <span className="stat-num">
        {count.toFixed(count < 10 ? 1 : 0)}{suffix}
      </span>
      <p style={{ fontSize: "0.85rem", color: "#8ab09a", fontWeight: 600 }}>{label}</p>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStart(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="stats-wrap">
      <div className="stats-grid stagger">
        {stats.map((s, i) => <CounterCard key={i} {...s} start={start} />)}
      </div>
    </div>
  );
}

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */
export default function AboutUsPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow" className="cursor-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════ HERO ════════════════ */}
        <section className="ab-hero">
           <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="hero-video"
                    >
                      <source src={heroVideo} type="video/mp4" />
                    </video>
          
                    {/* 🌑 Left Dark Overlay */}
                    <div className="hero-overlay"></div>
          <div className="ab-hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="aura-ring ring1" /><div className="aura-ring ring2" /><div className="aura-ring ring3" />

          <div className="ab-hero-content">
            <div className="badge reveal">
              <Sparkles style={{ width: 16, height: 16 }} />
              About RoasBadhao
            </div>

            <h1 className="reveal reveal-delay-1">
              Built from<br />
              <span className="text-grad">Real Performance,</span><br />
              Not Just Promises
            </h1>

            <p className="ab-hero-sub reveal reveal-delay-2">
              RoasBadhao was founded on{" "}
              <strong style={{ color: "var(--g4)" }}>5 January 2026</strong> by{" "}
              <strong style={{ color: "var(--gold2)" }}>Raushan Saxena</strong>, with a simple belief —{" "}
              <strong style={{ color: "var(--g4)" }}>marketing should drive measurable growth</strong>, not just impressions and clicks.
            </p>

            <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a href="#story" className="btn-primary">
                <span>Read Our Story</span>
                <ArrowRight style={{ width: 18, height: 18 }} />
              </a>
              <a href="#contact" className="btn-ghost">
                <Phone style={{ width: 18, height: 18 }} />
                Get in Touch
              </a>
            </div>
          </div>

          <div className="scroll-dot">
            <div className="scroll-dot-ring">
              <div className="scroll-dot-inner" />
            </div>
          </div>
        </section>

        {/* ════════════════ STATS ════════════════ */}
        <StatsSection />

        <div className="divider" />

        {/* ════════════════ FOUNDER STORY ════════════════ */}
        <section id="story" className="ab-section" style={{ background: "var(--dark2)" }}>
          <div className="ab-inner">
            <div className="grid-2">
              {/* Image */}
              <div className="reveal">
                <div className="founder-img-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000"
                    alt="Founder Raushan Saxena"
                  />
                  <div className="founder-badge">
                    <div className="fb-icon">
                      <Calendar style={{ width: 22, height: 22 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "var(--g4)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Founded</div>
                      <div style={{ fontSize: "1.1rem", fontFamily: "'Poppins',sans-serif", fontWeight: 800, color: "#fff" }}>5 Jan 2026</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="section-label reveal">The Beginning</p>
                <div className="glow-line reveal" style={{ marginBottom: 24 }} />
                <h2 className="section-title reveal">
                  The Story Behind{" "}
                  <span className="text-grad">RoasBadhao</span>
                </h2>

                <p className="section-desc reveal" style={{ marginBottom: 16 }}>
                  Before starting RoasBadhao,{" "}
                  <strong style={{ color: "#fff" }}>Raushan Saxena</strong> worked closely with businesses across industries, managing campaigns where{" "}
                  <strong style={{ color: "var(--g4)" }}>every rupee spent had to deliver results</strong>.
                </p>
                <p className="section-desc reveal" style={{ marginBottom: 16 }}>
                  He noticed that many business owners were investing in digital marketing but struggling with{" "}
                  <strong style={{ color: "#f08080" }}>poor lead quality, low ROAS, and agencies focused more on reports than real outcomes</strong>.
                </p>
                <p className="section-desc reveal" style={{ marginBottom: 28, color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>
                  RoasBadhao was created to change that.
                </p>

                <div className="quote-block reveal">
                  <p style={{ color: "#e8f5ee", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 10 }}>
                    "Marketing should drive measurable growth, not just impressions and clicks."
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--g4)", fontWeight: 600, letterSpacing: "0.08em" }}>
                    — Raushan Saxena, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ PHILOSOPHY ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark)" }}>
          <div className="ab-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Our Philosophy</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">
                <span className="text-grad">Performance-First</span> Philosophy
              </h2>
            </div>

            <div className="grid-3 stagger" style={{ marginBottom: 48 }}>
              {teamValues.map((v, i) => (
                <div key={i} className="glass-card reveal" style={{ padding: "36px 28px", textAlign: "center" }}>
                  <div className="icon-wrap" style={{ margin: "0 auto 20px" }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: 12, color: "#fff" }}>{v.title}</h3>
                  <p style={{ color: "#8ab09a", fontSize: "0.9rem", lineHeight: 1.65 }}>{v.description}</p>
                </div>
              ))}
            </div>

            {/* Vision block */}
            <div className="reveal" style={{
              background: "rgba(0,96,57,0.08)", border: "1px solid var(--border)",
              borderRadius: 28, padding: "60px 48px", textAlign: "center"
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20, margin: "0 auto 24px",
                background: "linear-gradient(135deg,var(--g),var(--g2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 32px rgba(0,140,70,0.4)"
              }}>
                <Eye style={{ width: 32, height: 32, color: "#fff" }} />
              </div>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", marginBottom: 20, color: "#fff" }}>
                Our Vision from Day One
              </h3>
              <p style={{ color: "#a3c4b0", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 700, margin: "0 auto 16px" }}>
                Build a performance marketing agency that focuses on{" "}
                <strong style={{ color: "var(--g4)" }}>real ROI</strong>,{" "}
                <strong style={{ color: "var(--gold2)" }}>qualified leads</strong>,{" "}
                <strong style={{ color: "var(--g3)" }}>high ROAS sales</strong>, and{" "}
                <strong style={{ color: "#fff" }}>sustainable growth</strong>.
              </p>
              <p style={{ color: "#8ab09a", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
                Instead of generic agency models, RoasBadhao operates with a{" "}
                <strong style={{ color: "#e8f5ee" }}>hands-on, founder-led approach</strong> where strategy, execution, and optimisation align with real business goals.
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ VALUES ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark2)" }}>
          <div className="ab-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Our Core Values</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">What We <span className="text-grad">Stand For</span></h2>
            </div>

            <div className="grid-3 stagger">
              {values.map((v, i) => (
                <div key={i} className="glass-card reveal" style={{ padding: "36px 28px" }}>
                  <div className="icon-wrap-sm">{v.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: 10, color: "#fff" }}>{v.title}</h3>
                  <p style={{ color: "#8ab09a", fontSize: "0.9rem", lineHeight: 1.65 }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ WHO WE SERVE ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark3)" }}>
          <div className="ab-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Industries We Serve</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Built for Businesses That <span className="text-grad">Want Results</span></h2>
              <p className="section-desc reveal">
                RoasBadhao works with Real Estate, Healthcare, D2C brands, and local service companies.
              </p>
            </div>

            <div className="grid-4 stagger" style={{ marginBottom: 48 }}>
              {industriesServed.map((ind, i) => (
                <div key={i} className="industry-card reveal">
                  <span className="industry-icon">{ind.icon}</span>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 4 }}>{ind.name}</h3>
                  <span className="industry-clients">{ind.clients}</span>
                  <p style={{ fontSize: "0.75rem", color: "#8ab09a", marginTop: 2 }}>Clients Served</p>
                </div>
              ))}
            </div>

            {/* Focus pills */}
            {/* <div className="reveal" style={{
              background: "rgba(0,96,57,0.07)", border: "1px solid var(--border)",
              borderRadius: 24, padding: "40px 36px", textAlign: "center"
            }}>
              <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#fff", marginBottom: 24 }}>Our Focus Areas</h3>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                {["Predictable Lead Systems", "Improving Visibility", "Increasing ROAS"].map((p, i) => (
                  <div key={i} className="focus-pill">{p}</div>
                ))}
              </div>
            </div> */}
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ TRANSPARENT APPROACH ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark2)" }}>
          <div className="ab-inner">
            <div className="reveal" style={{
              background: "rgba(0,96,57,0.08)", border: "1px solid rgba(0,180,110,0.2)",
              borderRadius: 28, padding: "64px 48px",
            }}>
              <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 20, margin: "0 auto 24px",
                  background: "linear-gradient(135deg,var(--g),var(--g2))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 32px rgba(0,140,70,0.4)"
                }}>
                  <Shield style={{ width: 32, height: 32, color: "#fff" }} />
                </div>
                <h2 className="section-title" style={{ marginBottom: 12 }}>
                  A <span className="text-grad">Transparent & Honest</span> Approach
                </h2>
                <p style={{ color: "#a3c4b0", fontSize: "1.05rem" }}>
                  Trust is built through clarity, not exaggerated promises.
                </p>
              </div>

              <div className="transparent-row">
                {[
                  { icon: <CheckCircle2 style={{ width: 32, height: 32, color: "var(--g3)" }} />, title: "No Unrealistic Guarantees", desc: "We set realistic expectations based on data and experience" },
                  { icon: <CheckCircle2 style={{ width: 32, height: 32, color: "var(--gold2)" }} />, title: "No Confusing Jargon",      desc: "Clear communication in simple, understandable terms" },
                  { icon: <CheckCircle2 style={{ width: 32, height: 32, color: "var(--g4)" }} />,  title: "Just Clear Strategies",    desc: "Consistent optimization and honest communication" },
                ].map((item, i) => (
                  <div key={i} className="check-card">
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: "#8ab09a", fontSize: "0.87rem", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ TIMELINE ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark)" }}>
          <div className="ab-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Milestones</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">Journey So Far</span></h2>
            </div>

            <div className="timeline">
              {milestones.map((m, i) => (
                <div key={i} className={`timeline-item ${i % 2 === 1 ? "even" : ""} reveal`}>
                  <div className="timeline-card">
                    <p style={{ fontSize: "0.78rem", color: "var(--g3)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{m.date}</p>
                    <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: 10 }}>{m.title}</h3>
                    <p style={{ color: "#8ab09a", fontSize: "0.9rem", lineHeight: 1.65 }}>{m.description}</p>
                  </div>
                  <div className="timeline-dot">{m.icon}</div>
                  <div className="timeline-spacer" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ VISION AHEAD ════════════════ */}
        <section className="ab-section" style={{ background: "var(--dark2)" }}>
          <div className="ab-inner">
            <div className="reveal" style={{
              background: "rgba(0,96,57,0.07)", border: "1px solid var(--border)",
              borderRadius: 28, padding: "72px 48px", textAlign: "center"
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 24, margin: "0 auto 28px",
                background: "linear-gradient(135deg,var(--g),var(--g2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 40px rgba(0,140,70,0.45)"
              }}>
                <Rocket style={{ width: 36, height: 36, color: "#fff" }} />
              </div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                The <span className="text-grad-gold">Vision Ahead</span>
              </h2>
              <p style={{ color: "#a3c4b0", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: 680, margin: "0 auto 16px" }}>
                RoasBadhao aims to become a trusted growth partner for businesses across India by building{" "}
                <strong style={{ color: "var(--g4)" }}>marketing systems that deliver long-term performance</strong>, not short-term hype.
              </p>
              <p style={{ color: "#8ab09a", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
                The journey has just begun but the foundation is strong: real experience, real execution, and a commitment to helping businesses grow the right way.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
                {[
                  { label: "Real Experience", cls: "text-grad" },
                  { label: "Real Execution", cls: "text-grad-gold" },
                  { label: "Real Commitment", cls: "text-grad" },
                ].map((tag, i) => (
                  <div key={i} style={{
                    background: "rgba(0,96,57,0.12)", border: "1px solid rgba(0,180,110,0.2)",
                    borderRadius: 99, padding: "14px 32px"
                  }}>
                    <span className={`${tag.cls}`} style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "1rem" }}>
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
        <div id="contact" className="cta-section">
          <div className="orb orb1" style={{ left: "-15%", top: "-20%", opacity: 0.4 }} />
          <div className="orb orb2" style={{ right: "-15%", bottom: "-20%", opacity: 0.4 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
            <div className="glow-line reveal" style={{ margin: "0 auto 28px" }} />
            <h2 className="section-title reveal" style={{ color: "#fff", textAlign: "center", fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Ready to Work With a Team<br />
              <span className="text-grad-gold">That Delivers?</span>
            </h2>
            <p className="reveal" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", textAlign: "center", marginBottom: 48, lineHeight: 1.7 }}>
              Let's build a marketing system that drives real growth for your business
            </p>
            <div className="reveal" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
              <a href="#audit" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 40px" }}>
                <span>Get Your Free Audit</span>
                <ArrowRight style={{ width: 20, height: 20 }} />
              </a>
              <a href="tel:+919911689427" className="btn-ghost" style={{ fontSize: "1rem", padding: "16px 32px" }}>
                <Phone style={{ width: 18, height: 18 }} />
                Call Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}