import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight, Sparkles, MapPin, Clock, Briefcase,
  TrendingUp, Users, Heart, Zap, Star, ChevronDown,
  Send, X, CheckCircle2, Coffee, Laptop, Globe,
} from "lucide-react";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const openings = [
  {
    id: 1,
    title: "Performance Marketing Manager",
    dept: "Growth",
    type: "Full-time",
    location: "Delhi (On-site)",
    exp: "2–4 Years",
    icon: "🎯",
    tags: ["Meta Ads", "Google Ads", "ROAS", "Analytics"],
    desc: "Lead end-to-end performance campaigns across Meta & Google for our diverse client portfolio. You'll own ROAS targets, build funnels, and obsess over data.",
    resp: [
      "Plan and execute Meta & Google Ads campaigns across verticals",
      "Manage ₹50L+ monthly ad budgets profitably",
      "Build A/B testing frameworks and optimise creatives",
      "Report weekly to clients with actionable insights",
    ],
    req: [
      "2+ years hands-on Meta & Google Ads experience",
      "Proven track record of ROAS > 3x",
      "Strong analytical skills — Excel/Sheets fluency",
      "Excellent client communication",
    ],
  },
  {
    id: 2,
    title: "Paid Social Specialist",
    dept: "Ads",
    type: "Full-time",
    location: "Delhi (On-site)",
    exp: "1–3 Years",
    icon: "📱",
    tags: ["Meta Ads", "Instagram", "Creatives", "Lead Gen"],
    desc: "You live and breathe Meta Ads. You know the difference between broad and lookalike, and you've personally scaled campaigns from ₹10K to ₹10L a month.",
    resp: [
      "Run Meta Ads campaigns from strategy to execution",
      "Collaborate with creative team on ad copy and visuals",
      "Manage pixel setup, custom events, and conversion tracking",
      "Deliver weekly performance reports to clients",
    ],
    req: [
      "1+ year Meta Ads experience with real budget accountability",
      "Understanding of funnel stages and audience segmentation",
      "Meta Blueprint Certification preferred",
      "Strong written communication skills",
    ],
  },
  {
    id: 3,
    title: "GMB & Local SEO Expert",
    dept: "SEO",
    type: "Full-time",
    location: "Remote / Delhi",
    exp: "1–2 Years",
    icon: "📍",
    tags: ["GMB", "Local SEO", "Google Maps", "Reviews"],
    desc: "Help our clients dominate Google Maps. You understand how GMB ranking works and have a track record of pushing local businesses to the #1 spot.",
    resp: [
      "Optimise and manage Google My Business profiles",
      "Build local citation strategies and review funnels",
      "Monitor rankings and implement improvement tactics",
      "Create monthly GMB performance reports",
    ],
    req: [
      "Experience with GMB optimisation and local ranking",
      "Understanding of NAP consistency and citations",
      "Comfortable with Google Search Console & Analytics",
      "Detail-oriented with strong organisational skills",
    ],
  },
  {
    id: 4,
    title: "Performance Creative Strategist",
    dept: "Creative",
    type: "Full-time",
    location: "Delhi (On-site)",
    exp: "1–3 Years",
    icon: "✍️",
    tags: ["Ad Copy", "Creatives", "UGC", "Hooks"],
    desc: "Write ad copy that converts. You craft hooks that stop the scroll, understand what makes people click, and think about creative through a performance lens.",
    resp: [
      "Write high-converting ad copy for Meta, Google & WhatsApp",
      "Develop creative briefs for design and video teams",
      "Analyse creative performance and iterate fast",
      "Stay ahead of ad trends across industries",
    ],
    req: [
      "Portfolio of performance-driven ad copy",
      "Understanding of consumer psychology and persuasion",
      "Ability to write across industries — healthcare, D2C, realty",
      "Fast writer who thrives in a deadline-driven environment",
    ],
  },
  {
    id: 5,
    title: "Growth Intern",
    dept: "Growth",
    type: "Internship",
    location: "Delhi (On-site)",
    exp: "Fresher",
    icon: "🚀",
    tags: ["Meta Ads", "Research", "Analytics", "Learning"],
    desc: "Learn performance marketing by actually doing it. You'll work directly with senior strategists, run real ad experiments, and build a portfolio that matters.",
    resp: [
      "Assist with campaign setup and monitoring",
      "Conduct audience and competitor research",
      "Help prepare weekly performance reports",
      "Participate in strategy sessions and brainstorming",
    ],
    req: [
      "Passion for digital marketing and data",
      "Basic understanding of Meta & Google Ads",
      "Strong Excel/Sheets skills",
      "Eager to learn and take initiative",
    ],
  },
];

const perks = [
  { icon: <TrendingUp />, title: "Real Budget Experience", desc: "Manage ₹50L+ ad budgets from day one. No training-wheels accounts." },
  { icon: <Users />,       title: "Founder-Direct Learning", desc: "Learn directly from the founder — strategy, client communication, and growth thinking." },
  { icon: <Zap />,         title: "Fast Growth Trajectory", desc: "Your performance defines your growth — not years of service or politics." },
  { icon: <Globe />,       title: "Diverse Client Exposure", desc: "Work across Real Estate, Healthcare, D2C, Food & Education simultaneously." },
  { icon: <Coffee />,      title: "Flexible Culture", desc: "Results matter more than hours. We trust you to get the job done." },
  { icon: <Laptop />,      title: "Tools & Learning Budget", desc: "Access to premium tools and a monthly learning budget for courses." },
];

const values = [
  { num: "01", title: "Results Over Optics", desc: "We celebrate ROAS, not presentations. Every decision is data-backed." },
  { num: "02", title: "Radical Ownership",   desc: "You own your campaigns completely — the wins and the lessons." },
  { num: "03", title: "Client First Always", desc: "A client's success is our success. Their problem is our problem to solve." },
  { num: "04", title: "Move Fast, Learn Faster", desc: "Launch, measure, iterate. We move at startup speed in everything we do." },
];

const process = [
  { step: "01", title: "Apply",          desc: "Fill out the quick form. No long essays — just tell us who you are and what you've done." },
  { step: "02", title: "Task Round",     desc: "A short real-world task relevant to the role. Takes 60–90 mins, shows us how you think." },
  { step: "03", title: "Founder Call",   desc: "30-minute call with the founder. Casual, honest, and two-way." },
  { step: "04", title: "Offer & Onboard",desc: "Quick decision — usually within 48 hours. Then we get to work." },
];

/* ══════════════════════════════════════════
   CSS
══════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  :root {
    --g:#005c35; --g2:#007f4c; --g3:#00a862; --g4:#00c975; --g5:#00e888;
    --gold:#c9a84c; --gold2:#f0c95e;
    --dark:#010d08; --dark2:#031a0f; --dark3:#052015;
    --border:rgba(0,180,110,0.16); --text:#e8f5ee;
    --muted:#7aaa8e; --dim:#3d6e52;
  }

  html { scroll-behavior:smooth; scroll-padding-top:80px; }

  body {
    font-family:'Plus Jakarta Sans',sans-serif;
    background:var(--dark); color:var(--text);
    overflow-x:hidden; overscroll-behavior-y:none;
  }

  body::before {
    content:''; position:fixed; inset:0; z-index:0;
    pointer-events:none; opacity:.028;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px;
  }

  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:var(--dark); }
  ::-webkit-scrollbar-thumb { background:var(--g2); border-radius:4px; }

  /* ── UTILS ── */
  .tg {
    background:linear-gradient(135deg,var(--g4) 0%,var(--gold2) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .tg-gold {
    background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .glow-line {
    width:60px; height:3px; border-radius:99px;
    background:linear-gradient(90deg,var(--g3),var(--gold2));
    box-shadow:0 0 12px var(--g3);
  }
  .wrap { max-width:1280px; margin:0 auto; padding:0 24px; }
  .sec { padding:96px 0; }
  .sec-lbl {
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:.2em; text-transform:uppercase; color:var(--g3); margin-bottom:14px;
  }
  .sec-title {
    font-size:clamp(1.85rem,3.6vw,2.9rem);
    font-weight:800; line-height:1.1; letter-spacing:-0.025em;
    color:#fff; margin-bottom:18px;
  }

  /* ── BUTTONS ── */
  .btn-p {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 55%,var(--g3) 100%);
    color:#fff; padding:14px 32px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:700; font-size:15px;
    border:none; cursor:pointer; text-decoration:none;
    position:relative; overflow:hidden;
    box-shadow:0 0 30px rgba(0,140,70,0.38),inset 0 1px 0 rgba(255,255,255,0.14);
    transition:transform .22s,box-shadow .22s;
  }
  .btn-p::after {
    content:''; position:absolute; top:-50%; left:-60%; width:28%; height:200%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
    transform:skewX(-20deg); animation:btnSheen 3.5s ease-in-out infinite;
  }
  @keyframes btnSheen { 0%{left:-60%;opacity:0} 35%{opacity:1} 55%{left:130%;opacity:0} 100%{left:130%;opacity:0} }
  .btn-p:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 52px rgba(0,180,110,0.6); }
  .btn-p>* { position:relative; z-index:1; }

  .btn-g {
    display:inline-flex; align-items:center; gap:9px;
    background:transparent; color:#d1edd8;
    padding:13px 28px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:600; font-size:15px;
    border:1.5px solid rgba(0,180,110,0.3); cursor:pointer; text-decoration:none;
    transition:border-color .2s,background .2s,transform .2s,color .2s;
  }
  .btn-g:hover { border-color:var(--g3); background:rgba(0,96,57,0.12); transform:translateY(-2px); color:#fff; }

  /* ── REVEAL ── */
  .rv { opacity:0; transform:translateY(28px); transition:opacity .65s ease,transform .65s ease; }
  .rv.vis { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}
  .d4{transition-delay:.24s}.d5{transition-delay:.30s}.d6{transition-delay:.36s}

  /* ── CURSOR GLOW ── */
  #crr-glow {
    position:fixed; width:340px; height:340px; border-radius:50%;
    background:radial-gradient(circle,rgba(0,140,70,.05),transparent 70%);
    pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
    will-change:transform;
  }

  /* ══════════════════════════════════════════
     HERO
  ══════════════════════════════════════════ */
  .cr-hero {
    position:relative; min-height:92vh;
    display:flex; align-items:center;
    overflow:hidden; padding:20px 0 20px;
    background:
      radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,140,70,.16),transparent 68%),
      radial-gradient(ellipse 50% 70% at 85% 75%, rgba(201,168,76,.07),transparent 58%),
      var(--dark);
  }

  .cr-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,180,110,.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,180,110,.05) 1px,transparent 1px);
    background-size:56px 56px;
    mask-image:radial-gradient(ellipse 85% 80% at 50% 50%,black,transparent);
    animation:gridDrift 22s linear infinite;
  }
  @keyframes gridDrift { from{background-position:0 0} to{background-position:56px 56px} }

  .cr-orb {
    position:absolute; border-radius:50%;
    filter:blur(80px); pointer-events:none;
    animation:orbFloat 10s ease-in-out infinite;
  }
  .cr-orb1 { width:500px;height:500px; background:radial-gradient(circle,rgba(0,140,70,.2),transparent 70%); top:-8%;left:-8%; }
  .cr-orb2 { width:380px;height:380px; background:radial-gradient(circle,rgba(201,168,76,.12),transparent 70%); bottom:5%;right:-5%; animation-delay:3s; }
  @keyframes orbFloat {
    0%,100%{transform:translate(0,0) scale(1)}
    40%{transform:translate(22px,-14px) scale(1.04)}
    70%{transform:translate(-14px,10px) scale(.97)}
  }

  .cr-hero-badge {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,96,57,.2); border:1px solid rgba(0,180,110,.28);
    backdrop-filter:blur(12px); padding:8px 20px; border-radius:99px;
    font-size:13px; font-weight:600; letter-spacing:.04em; color:var(--g4);
    margin-bottom:26px; animation:badgeFloat 3s ease-in-out infinite;
  }
  @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

  .cr-hero h1 {
    font-family:'Poppins',sans-serif;
    font-size:clamp(2.2rem,4vw,5.2rem);
    font-weight:900; line-height:1.03;
    letter-spacing:-0.03em; color:#fff; margin-bottom:0;
  }

  .cr-hero-sub {
    font-size:clamp(.9rem,1.7vw,1.1rem);
    color:#a3c4b0; line-height:1.8;
    max-width:580px; margin:22px 0 32px;
  }

  /* Floating job-count pill */
  .cr-count-pill {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,96,57,.15);
    border:1px solid rgba(0,180,110,.22);
    backdrop-filter:blur(8px);
    padding:10px 20px; border-radius:16px;
    font-size:14px; font-weight:600; color:#d1edd8;
    margin-bottom:32px;
  }
  .cr-count-dot {
    width:8px; height:8px; border-radius:50%;
    background:var(--g4); box-shadow:0 0 8px var(--g4);
    animation:pulseDot 1.8s ease-in-out infinite;
  }
  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }

  /* Floating cards */
  .cr-float-cards {
    display:flex; flex-direction:column; gap:14px;
  }
  .cr-float-card {
    background:rgba(5,26,16,.7);
    border:1px solid rgba(0,180,110,.16);
    backdrop-filter:blur(16px);
    border-radius:20px; padding:18px 20px;
    display:flex; align-items:center; gap:14px;
    transition:border-color .3s,transform .3s,box-shadow .3s;
    animation:cardFloat 6s ease-in-out infinite;
  }
  .cr-float-card:nth-child(2) { animation-delay:2s; }
  .cr-float-card:nth-child(3) { animation-delay:4s; }
  @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  .cr-float-card:hover { border-color:rgba(0,212,125,.35); transform:translateY(-4px)!important; box-shadow:0 16px 42px rgba(0,96,57,.22); }
  .cr-float-icon {
    width:46px; height:46px; border-radius:13px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex; align-items:center; justify-content:center;
    font-size:1.4rem; flex-shrink:0;
    box-shadow:0 0 18px rgba(0,140,70,.3);
  }
  .cr-float-title { font-family:'Poppins',sans-serif; font-size:.92rem; font-weight:700; color:#fff; margin-bottom:2px; }
  .cr-float-meta  { font-size:.74rem; color:#8ab09a; }

  /* ══════════════════════════════════════════
     VALUES STRIP
  ══════════════════════════════════════════ */
  .cr-values {
    background:linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%);
    border-top:1px solid var(--border); border-bottom:1px solid var(--border);
    padding:80px 0;
  }
  .cr-vals-grid {
    display:grid; gap:20px;
    grid-template-columns:1fr;
  }
  @media(min-width:600px) { .cr-vals-grid { grid-template-columns:repeat(2,1fr); } }
  @media(min-width:1000px){ .cr-vals-grid { grid-template-columns:repeat(4,1fr); } }

  .cr-val-card {
    position:relative; overflow:hidden;
    background:rgba(0,96,57,.07); border:1px solid var(--border);
    border-radius:22px; padding:30px 24px;
    transition:transform .3s,border-color .3s,box-shadow .3s;
  }
  .cr-val-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,var(--g3),transparent);
    opacity:0; transition:opacity .3s;
  }
  .cr-val-card:hover { transform:translateY(-5px); border-color:rgba(0,212,125,.3); box-shadow:0 18px 48px rgba(0,96,57,.18); }
  .cr-val-card:hover::before { opacity:1; }
  .cr-val-num {
    font-family:'Poppins',sans-serif; font-weight:900; font-size:3.5rem;
    color:rgba(0,180,110,.09); line-height:1; margin-bottom:12px;
    transition:color .3s;
  }
  .cr-val-card:hover .cr-val-num { color:rgba(0,180,110,.18); }
  .cr-val-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:.98rem; color:#fff; margin-bottom:8px; }
  .cr-val-desc  { color:#8ab09a; font-size:.845rem; line-height:1.68; }

  /* ══════════════════════════════════════════
     PERKS
  ══════════════════════════════════════════ */
  .cr-perks-grid {
    display:grid; gap:18px;
    grid-template-columns:1fr;
  }
  @media(min-width:600px) { .cr-perks-grid { grid-template-columns:repeat(2,1fr); } }
  @media(min-width:900px) { .cr-perks-grid { grid-template-columns:repeat(3,1fr); } }

  .cr-perk {
    background:rgba(0,96,57,.07); border:1px solid var(--border);
    border-radius:22px; padding:28px 22px;
    transition:transform .3s,border-color .3s,box-shadow .3s;
    display:flex; gap:16px; align-items:flex-start;
  }
  .cr-perk:hover { transform:translateY(-4px); border-color:rgba(0,212,125,.3); box-shadow:0 14px 40px rgba(0,96,57,.16); }
  .cr-perk-icon {
    width:50px; height:50px; border-radius:15px;
    background:linear-gradient(135deg,rgba(0,96,57,.3),rgba(0,140,70,.18));
    border:1px solid rgba(0,180,110,.2);
    display:flex; align-items:center; justify-content:center;
    color:var(--g3); flex-shrink:0;
    transition:transform .3s,box-shadow .3s;
  }
  .cr-perk:hover .cr-perk-icon { transform:scale(1.1); box-shadow:0 0 22px rgba(0,140,70,.3); }
  .cr-perk-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:.97rem; color:#fff; margin-bottom:6px; }
  .cr-perk-desc  { color:#8ab09a; font-size:.84rem; line-height:1.65; }

  /* ══════════════════════════════════════════
     JOB LISTINGS
  ══════════════════════════════════════════ */
  .cr-jobs { display:flex; flex-direction:column; gap:14px; }

  .cr-job-card {
    background:rgba(0,96,57,.06); border:1px solid var(--border);
    border-radius:22px; overflow:hidden;
    transition:border-color .3s,box-shadow .3s;
  }
  .cr-job-card.open { border-color:rgba(0,212,125,.3); box-shadow:0 16px 48px rgba(0,96,57,.18); }

  .cr-job-header {
    padding:26px 28px; cursor:pointer;
    display:flex; align-items:center; justify-content:space-between;
    gap:16px; flex-wrap:wrap;
    transition:background .25s;
  }
  .cr-job-header:hover { background:rgba(0,96,57,.06); }

  .cr-job-left { display:flex; align-items:center; gap:16px; flex:1; min-width:0; }
  .cr-job-emoji {
    width:52px; height:52px; border-radius:16px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex; align-items:center; justify-content:center;
    font-size:1.6rem; flex-shrink:0;
    box-shadow:0 0 20px rgba(0,140,70,.28);
  }
  .cr-job-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:1.05rem; color:#fff; margin-bottom:4px; }
  .cr-job-meta  { display:flex; flex-wrap:wrap; gap:12px; }
  .cr-job-chip {
    display:inline-flex; align-items:center; gap:4px;
    font-size:.73rem; color:#8ab09a; font-weight:500;
  }
  .cr-job-dept-badge {
    display:inline-flex; align-items:center;
    background:rgba(0,96,57,.18); border:1px solid rgba(0,180,110,.2);
    padding:4px 12px; border-radius:99px;
    font-size:.68rem; font-weight:700; color:var(--g3); white-space:nowrap;
    letter-spacing:.06em; text-transform:uppercase;
  }
  .cr-job-type-badge {
    display:inline-flex; align-items:center;
    background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.22);
    padding:4px 12px; border-radius:99px;
    font-size:.68rem; font-weight:700; color:var(--gold2); white-space:nowrap;
  }
  .cr-job-chevron { color:var(--muted); transition:transform .35s cubic-bezier(.4,0,.2,1),color .2s; flex-shrink:0; }
  .cr-job-card.open .cr-job-chevron { transform:rotate(180deg); color:var(--g3); }

  /* Accordion body */
  .cr-job-body {
    max-height:0; overflow:hidden;
    transition:max-height .42s cubic-bezier(.4,0,.2,1);
  }
  .cr-job-card.open .cr-job-body { max-height:900px; }
  .cr-job-body-inner {
    padding:0 28px 28px;
    border-top:1px solid rgba(0,180,110,.1);
  }
  .cr-job-desc { color:#8ab09a; font-size:.88rem; line-height:1.78; margin:20px 0; }
  .cr-job-grid { display:grid; gap:24px; }
  @media(min-width:700px) { .cr-job-grid { grid-template-columns:1fr 1fr; } }

  .cr-job-section-title {
    font-family:'Poppins',sans-serif; font-weight:700; font-size:.84rem;
    color:var(--g3); text-transform:uppercase; letter-spacing:.1em;
    margin-bottom:12px; display:flex; align-items:center; gap:7px;
  }
  .cr-job-section-title::before { content:''; display:block; width:18px; height:2px; background:linear-gradient(90deg,var(--g3),var(--gold2)); border-radius:99px; }

  .cr-job-list { list-style:none; display:flex; flex-direction:column; gap:8px; }
  .cr-job-list li {
    display:flex; align-items:flex-start; gap:9px;
    font-size:.85rem; color:#b0cebb; line-height:1.6;
  }
  .cr-job-list li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--g3); flex-shrink:0; margin-top:7px; }

  .cr-job-tags { display:flex; flex-wrap:wrap; gap:7px; margin:18px 0 20px; }
  .cr-job-tag {
    background:rgba(0,96,57,.14); border:1px solid rgba(0,180,110,.18);
    padding:5px 13px; border-radius:99px;
    font-size:.72rem; font-weight:600; color:var(--g3);
  }

  .cr-apply-btn {
    display:inline-flex; align-items:center; gap:9px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 55%,var(--g3) 100%);
    color:#fff; padding:13px 28px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:700; font-size:.9rem;
    border:none; cursor:pointer; position:relative; overflow:hidden;
    box-shadow:0 0 24px rgba(0,140,70,.3),inset 0 1px 0 rgba(255,255,255,.12);
    transition:transform .22s,box-shadow .22s;
    margin-top:4px;
  }
  .cr-apply-btn:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 40px rgba(0,180,110,.5); }

  /* ══════════════════════════════════════════
     PROCESS
  ══════════════════════════════════════════ */
  .cr-process-grid { display:grid; gap:18px; }
  @media(min-width:900px) { .cr-process-grid { grid-template-columns:repeat(4,1fr); } }

  .cr-proc-card {
    position:relative; overflow:hidden;
    background:rgba(0,96,57,.07); border:1px solid var(--border);
    border-radius:22px; padding:28px 22px;
    transition:transform .3s,border-color .3s,box-shadow .3s;
  }
  .cr-proc-card:hover { transform:translateY(-5px); border-color:rgba(0,212,125,.3); box-shadow:0 16px 44px rgba(0,96,57,.18); }
  .cr-proc-num {
    font-family:'Poppins',sans-serif; font-weight:900; font-size:3.8rem;
    color:rgba(0,180,110,.08); line-height:1; margin-bottom:10px;
    transition:color .3s;
  }
  .cr-proc-card:hover .cr-proc-num { color:rgba(0,180,110,.18); }
  .cr-proc-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:1rem; color:#fff; margin-bottom:8px; }
  .cr-proc-desc  { color:#8ab09a; font-size:.845rem; line-height:1.68; }
  .cr-proc-connector { display:none; position:absolute; top:52px; left:100%; width:100%; height:1px; background:linear-gradient(90deg,rgba(0,180,110,.3),transparent); }
  @media(min-width:900px) { .cr-proc-connector { display:block; } }

  /* ══════════════════════════════════════════
     APPLY MODAL
  ══════════════════════════════════════════ */
  .cr-modal-overlay {
    position:fixed; inset:0; z-index:10000;
    background:rgba(0,6,3,.85); backdrop-filter:blur(10px);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    animation:overlayIn .25s ease;
  }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }

  .cr-modal {
    background:var(--dark2); border:1px solid var(--border);
    border-radius:28px; width:100%; max-width:560px;
    max-height:90vh; overflow-y:auto;
    position:relative; padding:36px 32px;
    animation:modalIn .3s cubic-bezier(.22,.68,0,1.2);
    scrollbar-width:thin; scrollbar-color:var(--g2) var(--dark2);
  }
  @keyframes modalIn { from{opacity:0;transform:scale(.93) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }

  .cr-modal-close {
    position:absolute; top:18px; right:18px;
    width:36px; height:36px; border-radius:50%;
    background:rgba(0,96,57,.15); border:1px solid rgba(0,180,110,.2);
    color:#8ab09a; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all .2s;
  }
  .cr-modal-close:hover { background:rgba(220,60,60,.15); border-color:rgba(220,60,60,.3); color:#ff7070; }

  .cr-modal-title { font-family:'Poppins',sans-serif; font-weight:800; font-size:1.4rem; color:#fff; margin-bottom:4px; }
  .cr-modal-sub   { color:#8ab09a; font-size:.875rem; margin-bottom:28px; }

  .cr-form-group { margin-bottom:18px; }
  .cr-form-label { display:block; font-family:'Poppins',sans-serif; font-size:.78rem; font-weight:700; color:var(--g3); letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; }
  .cr-form-input, .cr-form-select, .cr-form-textarea {
    width:100%; background:rgba(0,96,57,.08);
    border:1px solid rgba(0,180,110,.2);
    border-radius:14px; padding:13px 16px;
    color:#e8f5ee; font-family:'Plus Jakarta Sans',sans-serif; font-size:.9rem;
    outline:none; transition:border-color .2s,box-shadow .2s;
    appearance:none;
  }
  .cr-form-input::placeholder, .cr-form-textarea::placeholder { color:rgba(163,196,176,.3); }
  .cr-form-input:focus, .cr-form-select:focus, .cr-form-textarea:focus {
    border-color:var(--g3); box-shadow:0 0 0 3px rgba(0,168,98,.12);
  }
  .cr-form-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300a862' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; }
  .cr-form-textarea { resize:vertical; min-height:110px; }
  .cr-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:500px) { .cr-form-row { grid-template-columns:1fr; } }

  .cr-form-submit {
    width:100%; display:flex; align-items:center; justify-content:center; gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 55%,var(--g3) 100%);
    color:#fff; padding:15px; border-radius:14px;
    font-family:'Poppins',sans-serif; font-weight:700; font-size:1rem;
    border:none; cursor:pointer;
    box-shadow:0 0 28px rgba(0,140,70,.32);
    transition:transform .2s,box-shadow .2s;
    margin-top:8px;
  }
  .cr-form-submit:hover { transform:translateY(-2px); box-shadow:0 0 48px rgba(0,180,110,.5); }
  .cr-form-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }

  .cr-success-box {
    text-align:center; padding:28px 0;
  }
  .cr-success-icon { font-size:3.5rem; margin-bottom:16px; }
  .cr-success-title { font-family:'Poppins',sans-serif; font-weight:800; font-size:1.35rem; color:#fff; margin-bottom:8px; }
  .cr-success-desc  { color:#8ab09a; font-size:.9rem; line-height:1.65; }

  /* ══════════════════════════════════════════
     CTA BOTTOM
  ══════════════════════════════════════════ */
  .cr-cta {
    padding:96px 24px; text-align:center; position:relative; overflow:hidden;
    background:linear-gradient(135deg,#002a1a 0%,#003d24 45%,#002e1e 100%);
  }
  .cr-cta::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image:radial-gradient(circle at 2px 2px,rgba(0,180,110,.09) 1px,transparent 0);
    background-size:40px 40px;
  }
  .rb-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(0,180,110,.2),rgba(201,168,76,.12),rgba(0,180,110,.2),transparent); }

  /* ── RESPONSIVE ── */
  @media(max-width:768px) {
    .cr-hero { padding:100px 0 60px; min-height:auto; }
    .sec { padding:72px 0; }
    .cr-hero h1 { font-size:clamp(2rem,8vw,3.2rem); }
    .cr-float-cards { display:none; }
  }
  @media(max-width:480px) {
    .cr-job-header { padding:20px; }
    .cr-job-body-inner { padding:0 20px 22px; }
    .cr-modal { padding:28px 22px; }
  }
`;

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    const el = document.getElementById("crr-glow");
    if (!el) return;
    let raf;
    const fn = e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.left = e.clientX + "px";
        el.style.top  = e.clientY + "px";
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(raf); };
  }, []);
}

/* ══════════════════════════════════════════
   APPLY MODAL
══════════════════════════════════════════ */
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", exp:"", linkedin:"", why:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="cr-modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="cr-modal">
        <button className="cr-modal-close" onClick={onClose}><X size={16}/></button>

        {!submitted ? (
          <>
            <p className="cr-modal-title">Apply for this Role</p>
            <p className="cr-modal-sub">
              {job.icon} <strong style={{ color:"#fff" }}>{job.title}</strong> · {job.location}
            </p>

            <div className="cr-form-row">
              <div className="cr-form-group">
                <label className="cr-form-label">Full Name *</label>
                <input className="cr-form-input" placeholder="Rahul Sharma" value={form.name} onChange={e=>set("name",e.target.value)}/>
              </div>
              <div className="cr-form-group">
                <label className="cr-form-label">Phone *</label>
                <input className="cr-form-input" placeholder="+91 9999999999" value={form.phone} onChange={e=>set("phone",e.target.value)}/>
              </div>
            </div>

            <div className="cr-form-group">
              <label className="cr-form-label">Email Address *</label>
              <input className="cr-form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
            </div>

            <div className="cr-form-row">
              <div className="cr-form-group">
                <label className="cr-form-label">Experience</label>
                <select className="cr-form-select" value={form.exp} onChange={e=>set("exp",e.target.value)}
                  style={{ color: form.exp ? "#e8f5ee" : "rgba(163,196,176,.3)" }}>
                  <option value="" disabled>Select years</option>
                  <option value="fresher">Fresher</option>
                  <option value="0-1">0–1 Year</option>
                  <option value="1-2">1–2 Years</option>
                  <option value="2-4">2–4 Years</option>
                  <option value="4+">4+ Years</option>
                </select>
              </div>
              <div className="cr-form-group">
                <label className="cr-form-label">LinkedIn / Portfolio</label>
                <input className="cr-form-input" placeholder="linkedin.com/in/you" value={form.linkedin} onChange={e=>set("linkedin",e.target.value)}/>
              </div>
            </div>

            <div className="cr-form-group">
              <label className="cr-form-label">Why do you want to join RoasBadhao?</label>
              <textarea className="cr-form-textarea" placeholder="Tell us about yourself and why this role excites you..." value={form.why} onChange={e=>set("why",e.target.value)}/>
            </div>

            <button
              className="cr-form-submit"
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email || !form.phone}
            >
              {loading ? (
                <><span style={{ animation:"spin .8s linear infinite", display:"inline-block" }}>⟳</span> Submitting...</>
              ) : (
                <><Send size={16}/> Submit Application</>
              )}
            </button>

            <p style={{ textAlign:"center", marginTop:14, fontSize:".75rem", color:"rgba(163,196,176,.35)" }}>
              We typically respond within 48 hours. No spam, ever.
            </p>
          </>
        ) : (
          <div className="cr-success-box">
            <div className="cr-success-icon">🎉</div>
            <p className="cr-success-title">Application Received!</p>
            <p className="cr-success-desc">
              Thanks for applying for <strong style={{ color:"#fff" }}>{job.title}</strong>.<br/>
              Our team will review your profile and reach out within 48 hours.
            </p>
            <button className="cr-form-submit" style={{ marginTop:24 }} onClick={onClose}>
              <CheckCircle2 size={16}/> Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   JOB CARD
══════════════════════════════════════════ */
function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`cr-job-card rv ${open ? "open" : ""}`}>
      <div className="cr-job-header" onClick={() => setOpen(o => !o)}>
        <div className="cr-job-left">
          <div className="cr-job-emoji">{job.icon}</div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:6 }}>
              <span className="cr-job-title">{job.title}</span>
            </div>
            <div className="cr-job-meta">
              <span className="cr-job-dept-badge">{job.dept}</span>
              <span className="cr-job-type-badge">{job.type}</span>
              <span className="cr-job-chip"><MapPin size={12}/>{job.location}</span>
              <span className="cr-job-chip"><Briefcase size={12}/>{job.exp}</span>
              <span className="cr-job-chip"><Clock size={12}/>{job.type}</span>
            </div>
          </div>
        </div>
        <ChevronDown size={20} className="cr-job-chevron"/>
      </div>

      <div className="cr-job-body">
        <div className="cr-job-body-inner">
          <p className="cr-job-desc">{job.desc}</p>

          <div className="cr-job-tags">
            {job.tags.map((t,i) => <span key={i} className="cr-job-tag">{t}</span>)}
          </div>

          <div className="cr-job-grid">
            <div>
              <p className="cr-job-section-title">Responsibilities</p>
              <ul className="cr-job-list">
                {job.resp.map((r,i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <p className="cr-job-section-title">Requirements</p>
              <ul className="cr-job-list">
                {job.req.map((r,i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          <button className="cr-apply-btn" onClick={() => onApply(job)}>
            <Send size={15}/> Apply for this Role
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Careers() {
  useReveal();
  useCursor();
  const [applyJob, setApplyJob] = useState(null);

  const scrollToJobs = () => {
    document.getElementById("cr-openings")?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <>
      <style>{CSS}</style>
      <div id="crr-glow"/>
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)}/>}

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ════ HERO ════ */}
        <section className="cr-hero">
          <div className="cr-hero-grid"/>
          <div className="cr-orb cr-orb1"/>
          <div className="cr-orb cr-orb2"/>

          <div className="wrap" style={{ position:"relative", zIndex:2, width:"100%" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:48, alignItems:"center" }}>

              {/* Left */}
              <div>
                <div className="cr-hero-badge rv">
                  <Sparkles style={{ width:13, height:13 }}/>
                  We're Hiring — Join the Growth Team
                </div>

                <h1 className="rv d1">
                  Build Your Career<br/>
                  in <span className="tg">Performance<br/>Marketing</span>
                </h1>

                <p className="cr-hero-sub rv d2">
                  At RoasBadhao, you won't be a small cog in a big machine.
                  You'll manage real budgets, work directly with the founder,
                  and make decisions that actually move the needle.
                </p>

                <div className="cr-count-pill rv d3">
                  <div className="cr-count-dot"/>
                  {openings.length} Open Positions · Delhi & Remote
                </div>

                <div className="rv d4" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                  <button className="btn-p" onClick={scrollToJobs}>
                    <span>View Open Roles</span>
                    <ArrowRight style={{ width:16, height:16 }}/>
                  </button>
                  <a href="mailto:careers@roasbadhao.com" className="btn-g">
                    <Send style={{ width:14, height:14 }}/>
                    Send Your CV
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════ QUICK STATS STRIP ════ */}
        <div style={{ background:"var(--dark2)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"36px 0" }}>
          <div className="wrap">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:0 }}>
              {[
                { val:"₹2 Cr+", lbl:"Ad Budget Managed" },
                { val:"200+",   lbl:"Clients Served" },
                { val:"3X",     lbl:"Average Team Growth" },
                { val:"48hr",   lbl:"Hiring Decision Time" },
              ].map((s,i) => (
                <div key={i} className="rv" style={{ padding:"20px 24px", borderRight: i%2===0 ? "1px solid var(--border)":"none", borderBottom: i<2?"1px solid var(--border)":"none", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(1.6rem,3vw,2.2rem)", background:"linear-gradient(135deg,var(--g4),var(--gold2))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:4 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize:".78rem", fontWeight:600, color:"#8ab09a", fontFamily:"'Poppins',sans-serif" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ VALUES ════ */}
        <div className="cr-values">
          <div className="wrap">
            <div style={{ textAlign:"center", maxWidth:580, margin:"0 auto 52px" }}>
              <p className="sec-lbl rv">Our Values</p>
              <div className="glow-line rv" style={{ margin:"0 auto 18px" }}/>
              <h2 className="sec-title rv">What We Believe In</h2>
              <p className="rv d1" style={{ color:"#8ab09a", fontSize:".88rem", lineHeight:1.72 }}>
                These aren't values we post on a wall. They're how we actually work every day.
              </p>
            </div>
            <div className="cr-vals-grid">
              {values.map((v,i) => (
                <div key={i} className="cr-val-card rv" style={{ transitionDelay:`${i*0.08}s` }}>
                  <div className="cr-val-num">{v.num}</div>
                  <h3 className="cr-val-title">{v.title}</h3>
                  <p className="cr-val-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ PERKS ════ */}
        <div style={{ background:"linear-gradient(180deg,var(--dark2) 0%,var(--dark3) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto 52px" }}>
              <p className="sec-lbl rv">Why Join Us</p>
              <div className="glow-line rv" style={{ margin:"0 auto 18px" }}/>
              <h2 className="sec-title rv">
                Perks That Actually <span className="tg">Matter</span>
              </h2>
              <p className="rv d1" style={{ color:"#8ab09a", fontSize:".88rem", lineHeight:1.72 }}>
                We don't offer ping-pong tables. We offer career-defining experiences.
              </p>
            </div>
            <div className="cr-perks-grid">
              {perks.map((p,i) => (
                <div key={i} className="cr-perk rv" style={{ transitionDelay:`${i*0.07}s` }}>
                  <div className="cr-perk-icon">
                    {React.cloneElement(p.icon, { style:{ width:22, height:22 } })}
                  </div>
                  <div>
                    <h3 className="cr-perk-title">{p.title}</h3>
                    <p className="cr-perk-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rb-divider"/>

        {/* ════ JOB LISTINGS ════ */}
        <div id="cr-openings" style={{ background:"linear-gradient(180deg,var(--dark3) 0%,var(--dark2) 100%)" }}>
          <div className="wrap sec">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:44 }}>
              <div>
                <p className="sec-lbl rv">Open Positions</p>
                <div className="glow-line rv" style={{ marginBottom:18 }}/>
                <h2 className="sec-title rv" style={{ marginBottom:0 }}>
                  Find Your <span className="tg">Perfect Role</span>
                </h2>
              </div>
              <div className="rv" style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div className="cr-count-dot"/>
                <span style={{ fontSize:".85rem", fontWeight:600, color:"#8ab09a" }}>{openings.length} positions open</span>
              </div>
            </div>

            <div className="cr-jobs">
              {openings.map((job, i) => (
                <div key={job.id} style={{ transitionDelay:`${i*0.07}s` }}>
                  <JobCard job={job} onApply={setApplyJob}/>
                </div>
              ))}
            </div>

            {/* No role fit — open application */}
            <div className="rv" style={{ marginTop:28, background:"rgba(0,96,57,.07)", border:"1px dashed rgba(0,180,110,.22)", borderRadius:22, padding:"28px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:18 }}>
              <div>
                <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:".98rem", color:"#fff", marginBottom:5 }}>
                  💡 Don't see a role that fits?
                </h3>
                <p style={{ color:"#8ab09a", fontSize:".84rem", lineHeight:1.65 }}>
                  If you're talented and hungry to grow in performance marketing, we always want to hear from you.
                </p>
              </div>
              <a href="mailto:careers@roasbadhao.com" className="btn-g" style={{ whiteSpace:"nowrap" }}>
                <Send style={{ width:14, height:14 }}/> Send Open Application
              </a>
            </div>
          </div>
        </div>

        <div className="rb-divider"/>

        {/* ════ PROCESS ════ */}
        <div style={{ background:"linear-gradient(180deg,var(--dark2) 0%,var(--dark) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign:"center", maxWidth:560, margin:"0 auto 52px" }}>
              <p className="sec-lbl rv">Hiring Process</p>
              <div className="glow-line rv" style={{ margin:"0 auto 18px" }}/>
              <h2 className="sec-title rv">
                Simple. Fast. <span className="tg">Honest.</span>
              </h2>
              <p className="rv d1" style={{ color:"#8ab09a", fontSize:".88rem", lineHeight:1.72 }}>
                No 6-round interviews. No ghosting. We respect your time.
              </p>
            </div>
            <div className="cr-process-grid">
              {process.map((step, i) => (
                <div key={i} className="cr-proc-card rv" style={{ transitionDelay:`${i*0.09}s`, position:"relative" }}>
                  {i < process.length - 1 && <div className="cr-proc-connector"/>}
                  <div className="cr-proc-num">{step.step}</div>
                  <h3 className="cr-proc-title">{step.title}</h3>
                  <p className="cr-proc-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ BOTTOM CTA ════ */}
        <div className="cr-cta">
          <div className="cr-orb cr-orb1" style={{ opacity:.18, filter:"blur(90px)" }}/>
          <div className="cr-orb cr-orb2" style={{ opacity:.18, filter:"blur(90px)" }}/>
          <div style={{ position:"relative", zIndex:2, maxWidth:720, margin:"0 auto" }}>
            <div className="glow-line rv" style={{ margin:"0 auto 24px" }}/>
            <h2 className="sec-title rv" style={{ color:"#fff", textAlign:"center", marginBottom:14 }}>
              Ready to Do the Best<br/><span className="tg-gold">Work of Your Career?</span>
            </h2>
            <p className="rv d1" style={{ color:"rgba(255,255,255,.7)", fontSize:"1rem", textAlign:"center", marginBottom:40, lineHeight:1.75 }}>
              Join a lean, performance-obsessed team where your work drives real business outcomes — every single day.
            </p>
            <div className="rv d2" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12 }}>
              <button className="btn-p" style={{ fontSize:"1rem", padding:"15px 36px" }} onClick={scrollToJobs}>
                <span>Browse Open Roles</span>
                <ArrowRight style={{ width:17, height:17 }}/>
              </button>
              <a href="mailto:careers@roasbadhao.com" className="btn-g" style={{ fontSize:".95rem", padding:"15px 26px" }}>
                <Send style={{ width:15, height:15 }}/>
                Email Us Directly
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}