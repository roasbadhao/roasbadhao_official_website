import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Shield,
  Sparkles,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const problems = [
  { icon: "❌", title: "Ads running but no conversions",  description: "Spending money without seeing results" },
  { icon: "💰", title: "High cost per lead",              description: "Paying too much for each lead generated" },
  { icon: "🗑️", title: "Junk enquiries",                  description: "Getting irrelevant leads that waste your time" },
  { icon: "📉", title: "Poor follow-up system",           description: "Missing opportunities due to bad lead management" },
  { icon: "📊", title: "Low ROAS Sales",                  description: "Not making profit from your ad spend" },
];

const solutions = [
  { icon: <Target className="w-8 h-8" />,    title: "Audience Targeting Strategy",        description: "Precision targeting to reach the right people who are most likely to convert" },
  { icon: <Sparkles className="w-8 h-8" />,  title: "High-Converting Ad Creatives",       description: "Eye-catching designs and compelling copy that stop the scroll and drive action" },
  { icon: <Shield className="w-8 h-8" />,    title: "Lead Qualification Funnels",         description: "Smart filtering to ensure you only get quality leads ready to buy" },
  { icon: <TrendingUp className="w-8 h-8" />,title: "Continuous Optimisation & Scaling",  description: "Ongoing testing and refinement to maximize ROAS and scale profitably" },
];

const industries = [
  { name: "Doctors & Clinics", icon: "👨‍⚕️" },
  { name: "Diagnostics",       icon: "🔬" },
  { name: "D2C Brands",        icon: "🛍️" },
  { name: "Real Estate",       icon: "🏢" },
  { name: "Local Businesses",  icon: "🏪" },
];

const process = [
  { number: "01", title: "Audit & Strategy",  description: "We analyze your current campaigns, audience, and create a custom strategy for your business goals",            icon: <Target className="w-6 h-6" /> },
  { number: "02", title: "Campaign Setup",    description: "Professional setup of campaigns, audiences, creatives, and tracking systems",                                    icon: <Zap className="w-6 h-6" /> },
  { number: "03", title: "Optimisation",      description: "Daily monitoring and optimization to improve performance and reduce costs",                                      icon: <BarChart3 className="w-6 h-6" /> },
  { number: "04", title: "Scale for ROAS",    description: "Strategic scaling to increase revenue while maintaining or improving ROAS",                                      icon: <TrendingUp className="w-6 h-6" /> },
];

const results = [
  { value: "85%+", label: "Quality Leads",       metric: "Lead qualification %" },
  { value: "3x",   label: "More Bookings",        metric: "Appointment growth" },
  { value: "5x",   label: "Return on Ad Spend",   metric: "ROAS improvements" },
];

const faqs = [
  { question: "Do you guarantee results?",    answer: "We don't make unrealistic guarantees. However, we have a proven track record of delivering high-ROAS campaigns. Our strategies are data-driven and continuously optimized for the best possible results." },
  { question: "What budget is required?",     answer: "We recommend a minimum monthly ad spend of ₹30,000–₹50,000 to see meaningful results. This allows us to test different audiences and creatives effectively. Our agency fee is separate from ad spend." },
  { question: "Is ad spend included?",        answer: "No, ad spend goes directly to Meta (Facebook/Instagram). Our service fee covers strategy, campaign management, creative guidance, and optimization. This ensures transparency in your marketing investment." },
  { question: "How fast will I see leads?",   answer: "Typically, you'll start seeing leads within 7–14 days of campaign launch. Quality and consistency improve significantly after the first month as we optimize based on data. Best results come at the 60–90 day mark." },
];

/* ─────────────────────── STYLES ─────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --g:     #006039;
    --g2:    #008a52;
    --g3:    #00b86e;
    --g4:    #00d47d;
    --gold:  #c9a84c;
    --gold2: #f0c95e;
    --dark:  #010d08;
    --dark2: #031a0f;
    --dark3: #052918;
    --border: rgba(0,180,110,0.18);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark); color: #e8f5ee; overflow-x: hidden;
  }
  body::before {
    content:''; position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px;
  }
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:var(--dark);} ::-webkit-scrollbar-thumb{background:var(--g2);border-radius:4px;}

  /* ── UTILS ── */
  .text-grad      { background:linear-gradient(135deg,var(--g3) 0%,var(--gold2) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .text-grad-gold { background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .text-grad-red  { background:linear-gradient(135deg,#e05555 0%,#f0a040 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .glow-line { width:80px;height:3px; background:linear-gradient(90deg,var(--g3),var(--gold2)); border-radius:99px; box-shadow:0 0 12px var(--g3); }

  .badge {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,96,57,0.2); border:1px solid rgba(0,180,110,0.3);
    backdrop-filter:blur(12px); padding:8px 20px; border-radius:99px;
    font-size:13px; font-weight:300; letter-spacing:0.04em; color:var(--g4);
  }

  /* ── LAYOUT ── */
  .ma-section { padding:100px 24px; position:relative; }
  .ma-inner   { max-width:1280px; margin:0 auto; }

  .section-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:400; letter-spacing:0.2em; text-transform:uppercase; color:var(--g3); margin-bottom:16px; }
  .section-title { font-family:'Poppins',sans-serif; font-size:clamp(2rem,3vw,3.2rem);  line-height:1.1; letter-spacing:-0.02em; color:#fff; margin-bottom:20px; }
  .section-desc  { color:#8ab09a; font-size:0.95rem; line-height:1.75; }

  /* ── HERO ── */
  .ma-hero {
    position:relative; min-height:100vh;
    display:flex; align-items:center; overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 60%),
      var(--dark);
  }
  .ma-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,180,110,0.06) 1px, transparent 1px),
      linear-gradient(90deg,rgba(0,180,110,0.06) 1px, transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    animation:gridScroll 20s linear infinite;
  }
  @keyframes gridScroll { from{background-position:0 0;} to{background-position:60px 60px;} }

  .orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; animation:orbFloat 8s ease-in-out infinite; }
  .orb1{width:500px;height:500px;background:radial-gradient(circle,rgba(0,140,70,0.25),transparent 70%);top:-10%;left:-10%;}
  .orb2{width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%);bottom:0;right:-5%;animation-delay:3s;}
  .orb3{width:300px;height:300px;background:radial-gradient(circle,rgba(0,96,57,0.3),transparent 70%);top:40%;left:40%;animation-delay:1.5s;}
  @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-20px) scale(1.05);} 66%{transform:translate(-20px,15px) scale(0.97);} }

  .aura-ring { position:absolute; border-radius:50%; border:1px solid rgba(0,180,110,0.3); pointer-events:none; }
  .ring1{width:400px;height:400px;left:-100px;top:100px;animation:ringPulse 4s ease-out infinite;}
  .ring2{width:600px;height:600px;left:-200px;top:0;   animation:ringPulse 4s ease-out 1.3s infinite;}
  .ring3{width:800px;height:800px;left:-300px;top:-100px;animation:ringPulse 4s ease-out 2.6s infinite;}
  @keyframes ringPulse { 0%{transform:scale(1);opacity:0.4;} 100%{transform:scale(1.5);opacity:0;} }

  .ma-hero-inner { position:relative;z-index:2; max-width:1280px; margin:0 auto; padding:20px 0px; width:100%; }

  .hero-grid { display:grid; gap:48px; align-items:center; }
  @media(min-width:900px){ .hero-grid{grid-template-columns:1fr 1fr;} }

  .ma-hero h1 {
    font-family:'Poppins',sans-serif;
    font-size:clamp(2.1rem,3.5vw,5rem);
    font-weight:600; line-height:1.05; letter-spacing:-0.03em; color:#fff;
    margin:24px 0;
  }
  .hero-sub { font-size:1.1rem; color:#a3c4b0; line-height:1.7; margin-bottom:32px; }

  /* trust pills row */
  .trust-row { display:flex; flex-wrap:wrap; gap:12px; margin-bottom:36px; }
  .trust-pill-stat {
    background:rgba(0,96,57,0.15); border:1px solid rgba(0,180,110,0.2);
    backdrop-filter:blur(8px); border-radius:16px; padding:12px 20px;
    text-align:center;
  }
  .trust-pill-num {
    font-family:'Poppins',sans-serif; font-weight:800; font-size:1.4rem;
    background:linear-gradient(135deg,var(--g4),var(--gold2));
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    display:block;
  }
  .trust-pill-label { font-size:0.72rem; color:#8ab09a; }

  /* ── BUTTONS ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff; padding:16px 36px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-size:1rem;
    border:none; cursor:pointer; text-decoration:none;
    position:relative; overflow:hidden;
    box-shadow:0 0 30px rgba(0,140,70,0.4),inset 0 1px 0 rgba(255,255,255,0.15);
    transition:transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 0 50px rgba(0,180,110,0.6); }

  .btn-whatsapp {
    display:inline-flex; align-items:center; gap:10px;
    background:rgba(37,211,102,0.12); border:1.5px solid rgba(37,211,102,0.35);
    color:#25d366; padding:16px 36px; border-radius:99px;
    font-family:'Poppins',sans-serif;  font-size:1rem;
    cursor:pointer; text-decoration:none;
    transition:background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .btn-whatsapp:hover { background:rgba(37,211,102,0.2); border-color:rgba(37,211,102,0.6); transform:translateY(-2px); }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:10px;
    background:transparent; color:#d1edd8; padding:16px 36px; border-radius:99px;
    font-family:'Poppins',sans-serif; font-weight:600; font-size:1rem;
    border:1.5px solid rgba(0,180,110,0.35); cursor:pointer; text-decoration:none;
    transition:border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .btn-ghost:hover { border-color:var(--g3); background:rgba(0,96,57,0.12); transform:translateY(-2px); }

  /* ── FORM CARD ── */
  .form-card {
    background:rgba(0,30,15,0.7);
    border:1px solid rgba(0,180,110,0.22);
    backdrop-filter:blur(24px);
    border-radius:28px; padding:40px 36px;
    box-shadow:0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,180,110,0.08);
  }
  .form-title {
    font-family:'Poppins',sans-serif; font-size:1.7rem;
    margin-bottom:6px;
  }
  .form-sub { color:#8ab09a; font-size:0.88rem; margin-bottom:28px; }

  .form-group { margin-bottom:16px; }
  .form-label { display:block; font-size:0.8rem; color:#a3c4b0; margin-bottom:6px; letter-spacing:0.04em; }

  .form-input, .form-select {
    width:100%; background:rgba(0,96,57,0.08);
    border:1px solid rgba(0,180,110,0.18);
    border-radius:14px; padding:13px 16px;
    color:#e8f5ee; font-family:'Poppins',sans-serif; font-size:0.92rem;
    outline:none; transition:border-color 0.2s, box-shadow 0.2s;
    appearance:none;
  }
  .form-input::placeholder { color:rgba(163,196,176,0.4); }
  .form-input:focus, .form-select:focus { border-color:var(--g3); box-shadow:0 0 0 3px rgba(0,180,110,0.12); }
  .form-select option { background:#031a0f; color:#e8f5ee; }

  .form-row { display:grid; gap:16px; }
  @media(min-width:500px){ .form-row{ grid-template-columns:1fr 1fr; } }

  .btn-form-submit {
    width:100%; margin-top:8px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff; padding:16px; border-radius:14px;
    font-family:'Poppins',sans-serif; font-size:1.05rem;
    border:none; cursor:pointer;
    box-shadow:0 0 30px rgba(0,140,70,0.4);
    transition:transform 0.2s, box-shadow 0.2s;
  }
  .btn-form-submit:hover { transform:translateY(-2px) scale(1.01); box-shadow:0 0 50px rgba(0,180,110,0.5); }

  .form-privacy { font-size:0.75rem; color:rgba(163,196,176,0.5); text-align:center; margin-top:12px; }

  /* ── GLASS CARD ── */
  .glass-card {
    background:rgba(0,96,57,0.07); border:1px solid var(--border); border-radius:28px;
    transition:transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  }
  .glass-card:hover { transform:translateY(-6px); border-color:rgba(0,212,125,0.35); box-shadow:0 20px 60px rgba(0,96,57,0.25); }

  /* problem card */
  .prob-card {
    background:rgba(180,30,30,0.06); border:1px solid rgba(220,60,60,0.15);
    border-radius:24px; padding:32px 24px;
    transition:transform 0.3s, border-color 0.3s;
  }
  .prob-card:hover { transform:translateY(-4px); border-color:rgba(220,60,60,0.35); }

  /* ── GRIDS ── */
  .grid-2{display:grid;gap:24px;} @media(min-width:900px){.grid-2{grid-template-columns:1fr 1fr;}}
  .grid-3{display:grid;gap:24px;} @media(min-width:600px){.grid-3{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-3{grid-template-columns:repeat(3,1fr);}}
  .grid-4{display:grid;gap:24px;} @media(min-width:600px){.grid-4{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-4{grid-template-columns:repeat(4,1fr);}}
  .grid-5{display:grid;gap:20px;} @media(min-width:600px){.grid-5{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-5{grid-template-columns:repeat(3,1fr);}} @media(min-width:1100px){.grid-5{grid-template-columns:repeat(5,1fr);}}

  /* ── ICON WRAP ── */
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
  .glass-card:hover .icon-wrap-sm{transform:scale(1.1);}

  /* ── RESULT CARD ── */
  .result-card {
    background:rgba(0,96,57,0.07); border:1px solid var(--border);
    border-radius:28px; padding:48px 28px; text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.2), border-color 0.3s, box-shadow 0.3s;
  }
  .result-card:hover { transform:translateY(-8px) scale(1.03); border-color:rgba(0,212,125,0.4); box-shadow:0 24px 60px rgba(0,96,57,0.3); }
 .result-val {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: clamp(3rem, 6vw, 2.5rem);
    line-height: 1;
    background: linear-gradient(135deg, var(--g4), var(--gold2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    margin-bottom: 8px;
}
  /* ── INDUSTRY CARD ── */
  .ind-chip {
    background:rgba(0,96,57,0.07); border:1px solid var(--border);
    border-radius:20px; padding:28px 20px; text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.4), border-color 0.3s, box-shadow 0.3s;
  }
  .ind-chip:hover { transform:translateY(-6px) scale(1.06); border-color:rgba(0,212,125,0.4); box-shadow:0 20px 50px rgba(0,96,57,0.3); }
  .ind-chip-icon { font-size:2.8rem; display:block; margin-bottom:12px; transition:transform 0.3s; }
  .ind-chip:hover .ind-chip-icon { transform:scale(1.2); }

  /* ── PROCESS CARD ── */
  .proc-card {
    position:relative; overflow:hidden;
    background:rgba(0,96,57,0.07); border:1px solid var(--border);
    border-radius:28px; padding:36px 28px;
    transition:transform 0.35s, border-color 0.3s, box-shadow 0.3s;
  }
  .proc-card:hover { transform:translateY(-6px); border-color:rgba(0,212,125,0.4); box-shadow:0 20px 50px rgba(0,96,57,0.2); }
  .proc-num {
    font-family:'Poppins',sans-serif; font-weight:900; font-size:5rem;
    color:rgba(0,180,110,0.1); line-height:1; margin-bottom:12px;
    transition:color 0.3s;
  }
  .proc-card:hover .proc-num { color:rgba(0,180,110,0.2); }
  .proc-connector {
    display:none; position:absolute; top:68px; left:100%;
    width:100%; height:1px;
    background:linear-gradient(90deg, rgba(0,180,110,0.4), transparent);
  }
  @media(min-width:900px){ .proc-connector{display:block;} }

  /* ── FOUNDER BLOCK ── */
  .founder-block {
    background:rgba(0,96,57,0.08); border:1px solid var(--border);
    border-radius:28px; padding:64px 48px; text-align:center;
  }
  .founder-avatar {
    width:96px;height:96px;border-radius:50%;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    font-family:'Poppins',sans-serif; font-weight:900; font-size:2rem; color:#fff;
    margin:0 auto 24px;
    box-shadow:0 0 40px rgba(0,140,70,0.45);
    border:3px solid rgba(0,180,110,0.3);
  }

  /* ── OFFER BLOCK ── */
  .offer-block {
    background:rgba(0,96,57,0.08); border:1px solid rgba(0,180,110,0.2);
    border-radius:28px; padding:64px 48px; text-align:center;
  }
  .offer-pill-row { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:32px; }
  .offer-pill {
    background:rgba(0,96,57,0.12); border:1px solid rgba(0,180,110,0.2);
    border-radius:99px; padding:10px 24px;
    display:flex; align-items:center; gap:8px;
    font-size:0.88rem;  color:#b0d4be;
  }

  /* ── FAQ ── */
  .faq-item {
    background:rgba(0,96,57,0.07); border:1px solid var(--border);
    border-radius:20px; overflow:hidden; margin-bottom:12px;
    transition:border-color 0.3s;
  }
  .faq-item.open { border-color:rgba(0,212,125,0.35); }
  .faq-btn {
    width:100%; padding:22px 28px;
    display:flex; justify-content:space-between; align-items:center;
    background:none; border:none; cursor:pointer; text-align:left;
    transition:background 0.2s;
  }
  .faq-btn:hover { background:rgba(0,96,57,0.08); }
  .faq-q { font-family:'Poppins',sans-serif;  font-size:1rem; color:#fff; padding-right:16px; }
  .faq-chevron { color:var(--g3); flex-shrink:0; transition:transform 0.3s; }
  .faq-chevron.open { transform:rotate(180deg); }
  .faq-answer { padding:0 28px 22px; color:#8ab09a; font-size:0.92rem; line-height:1.7; }

  /* ── CTA SECTION ── */
  .cta-section {
    padding:100px 24px; text-align:center; position:relative; overflow:hidden;
    background:linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%);
  }
  .cta-section::before {
    content:''; position:absolute; inset:0;
    background-image:radial-gradient(circle at 2px 2px, rgba(0,180,110,0.12) 1px, transparent 0);
    background-size:40px 40px;
  }

  /* ── DIVIDER ── */
  .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(0,180,110,0.2),rgba(201,168,76,0.15),rgba(0,180,110,0.2),transparent); }

  /* ── REVEAL ── */
  .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-delay-1{transition-delay:0.1s;} .reveal-delay-2{transition-delay:0.2s;}
  .reveal-delay-3{transition-delay:0.3s;} .reveal-delay-4{transition-delay:0.4s;}
  .stagger>*:nth-child(1){transition-delay:0.05s;} .stagger>*:nth-child(2){transition-delay:0.15s;}
  .stagger>*:nth-child(3){transition-delay:0.25s;} .stagger>*:nth-child(4){transition-delay:0.35s;}
  .stagger>*:nth-child(5){transition-delay:0.45s;} .stagger>*:nth-child(6){transition-delay:0.55s;}

  /* ── CURSOR GLOW ── */
  .cursor-glow{position:fixed;width:400px;height:400px;background:radial-gradient(circle,rgba(0,140,70,0.06),transparent 70%);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;}
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

/* ─────────────────────── LEAD FORM ─────────────────────── */
function LeadForm({ compact = false }) {
  const [formData, setFormData] = useState({ name:"", businessType:"", city:"", budget:"", goal:"", phone:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:16 }}>🎉</div>
      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#fff", marginBottom:12 }}>
        Request Received!
      </h3>
      <p style={{ color:"#8ab09a", fontSize:"0.95rem" }}>We'll contact you within 24 hours to schedule your free audit.</p>
    </div>
  );

  return (
    <>
      {!compact && (
        <>
          <h3 className="form-title text-grad">Get Your Free Audit</h3>
          <p className="form-sub">Fill the form below and we'll analyze your campaigns</p>
        </>
      )}
      {compact && (
        <>
          <h3 className="form-title text-grad" style={{ fontSize:"1.4rem" }}>Claim Your Free Audit</h3>
          <p className="form-sub">We'll get back to you within 24 hours</p>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input className="form-input" type="text" name="name" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-input" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Business Type *</label>
            <select className="form-select" name="businessType" required value={formData.businessType} onChange={handleChange}>
              <option value="">Select type</option>
              <option value="real-estate">Real Estate</option>
              <option value="healthcare">Healthcare / Doctors</option>
              <option value="diagnostics">Diagnostics</option>
              <option value="d2c">D2C Brand</option>
              <option value="local-business">Local Business</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">City *</label>
            <input className="form-input" type="text" name="city" placeholder="Your city" required value={formData.city} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Monthly Ad Budget *</label>
            <select className="form-select" name="budget" required value={formData.budget} onChange={handleChange}>
              <option value="">Select budget</option>
              <option value="30-50k">₹30,000 – ₹50,000</option>
              <option value="50-100k">₹50,000 – ₹1,00,000</option>
              <option value="100-200k">₹1,00,000 – ₹2,00,000</option>
              <option value="200k+">₹2,00,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Goal *</label>
            <select className="form-select" name="goal" required value={formData.goal} onChange={handleChange}>
              <option value="">Select goal</option>
              <option value="leads">Leads</option>
              <option value="sales">Sales</option>
              <option value="visibility">Visibility</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-form-submit">Get My Free Audit →</button>
        <p className="form-privacy">🔒 We respect your privacy. No spam, guaranteed.</p>
      </form>
    </>
  );
}

/* ─────────────────────── FAQ ─────────────────────── */
function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
            <span className="faq-q">{faq.question}</span>
            <ChevronDown className={`faq-chevron ${open === i ? "open" : ""}`} style={{ width: 22, height: 22 }} />
          </button>
          {open === i && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── MAIN ─────────────────────── */
export default function MetaAdsPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow" className="cursor-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════ HERO ════════════════ */}
        <section className="ma-hero">
          <div className="ma-hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="aura-ring ring1" /><div className="aura-ring ring2" /><div className="aura-ring ring3" />

          <div className="ma-hero-inner">
            <div className="hero-grid">
              {/* Left */}
              <div>
                <div className="badge reveal">
                  <Sparkles style={{ width: 16, height: 16 }} />
                  Meta Ads Experts — Delhi
                </div>

                <h1 className="reveal reveal-delay-1">
                  Meta Ads Agency<br />That Delivers<br />
                  <span className="text-grad">High-ROAS Sales</span><br />
                  and Leads
                </h1>

                <p className="hero-sub reveal reveal-delay-2">
                  We help{" "}
                  <strong style={{ color: "var(--g4)" }}>Real Estate, Doctors, D2C brands & service businesses</strong>{" "}
                  generate qualified leads and scale profitably with Facebook & Instagram Ads.
                </p>

                <div className="trust-row reveal reveal-delay-2">
                  {[
                    { num: "₹2 Cr+", label: "Ad Spend Managed" },
                    { num: "₹7.5 Cr+", label: "Revenue Generated" },
                    { num: "200+", label: "Happy Clients" },
                  ].map((t, i) => (
                    <div key={i} className="trust-pill-stat">
                      <span className="trust-pill-num">{t.num}</span>
                      <span className="trust-pill-label">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <a href="#audit-form" className="btn-primary">
                    <span>Get Free Meta Ads Audit</span>
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </a>
                  <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Right — Form */}
              <div className="form-card reveal reveal-delay-2">
                <LeadForm compact={false} />
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ PROBLEMS ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark2)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
              <h2 className="section-title reveal">
                Are Your Meta Ads Bringing{" "}
                <span className="text-grad-red">Low-Quality Leads?</span>
              </h2>
            </div>
            <div className="grid-2 stagger">
              {problems.map((p, i) => (
                <div key={i} className="prob-card reveal">
                  <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif",  fontSize: "1.05rem", color: "#fff", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "#8a9a93", fontSize: "0.88rem", lineHeight: 1.6 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ SOLUTIONS ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Our Meta Ads Solution</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">How We Drive <span className="text-grad">High-ROAS Results</span></h2>
            </div>

            <div className="grid-2 stagger">
              {solutions.map((s, i) => (
                <div key={i} className="glass-card reveal" style={{ padding: "36px 32px" }}>
                  <div className="icon-wrap">{s.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.3rem", color: "#fff", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "#8ab09a", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ RESULTS ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark2)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Proof of Performance</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Real <span className="text-grad">Campaign Results</span></h2>
              <p className="section-desc reveal">Proven track record of delivering measurable outcomes</p>
            </div>
            <div className="grid-3 stagger">
              {results.map((r, i) => (
                <div key={i} className="result-card reveal">
                  <span className="result-val">{r.value}</span>
                  <p style={{ fontFamily: "'Poppins',sans-serif",  fontSize: "1.1rem", color: "#fff", marginBottom: 4 }}>{r.label}</p>
                  <p style={{ fontSize: "0.8rem", color: "#8ab09a" }}>{r.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ INDUSTRIES ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Who We Serve</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Industries <span className="text-grad">We Work With</span></h2>
            </div>
            <div className="grid-5 stagger">
              {industries.map((ind, i) => (
                <div key={i} className="ind-chip reveal">
                  <span className="ind-chip-icon">{ind.icon}</span>
                  <p style={{ fontFamily: "'Poppins',sans-serif",  fontSize: "0.88rem", color: "#e8f5ee" }}>{ind.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ PROCESS ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark2)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">How We Work</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">Process</span></h2>
            </div>
            <div className="grid-4 stagger">
              {process.map((step, i) => (
                <div key={i} className="proc-card reveal" style={{ position: "relative" }}>
                  {i < process.length - 1 && <div className="proc-connector" />}
                  <div className="proc-num">{step.number}</div>
                  <div className="icon-wrap" style={{ marginBottom: 16 }}>{step.icon}</div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.15rem", color: "#fff", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ color: "#8ab09a", fontSize: "0.88rem", lineHeight: 1.65 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FOUNDER AUTHORITY ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark)" }}>
          <div className="ma-inner">
            <div className="founder-block reveal">
              <div className="founder-avatar">RS</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                Founded by <span className="text-grad">Raushan Saxena</span>
              </h2>
              <p style={{ color: "#a3c4b0", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 680, margin: "0 auto" }}>
                Performance-focused approach built on real campaign execution. With hands-on experience managing Meta Ads campaigns across industries, Raushan brings a data-driven methodology that prioritizes ROI over vanity metrics.
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ OFFER ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark2)" }}>
          <div className="ma-inner">
            <div className="offer-block reveal">
              <div className="icon-wrap" style={{ margin: "0 auto 24px" }}>
                <Sparkles style={{ width: 32, height: 32 }} />
              </div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                Get a Free <span className="text-grad">Meta Ads Performance Audit</span>
              </h2>
              <p style={{ color: "#a3c4b0", fontSize: "1.05rem", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
                Includes campaign review, audience analysis and actionable growth suggestions
              </p>
              <div className="offer-pill-row">
                {["Campaign Review", "Audience Analysis", "Growth Suggestions"].map((pill, i) => (
                  <div key={i} className="offer-pill">
                    <CheckCircle2 style={{ width: 16, height: 16, color: "var(--g3)" }} />
                    {pill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ LEAD FORM (repeated bottom) ════════════════ */}
        <section id="audit-form" className="ma-section" style={{ background: "var(--dark)" }}>
          <div className="ma-inner" style={{ maxWidth: 860 }}>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
              <p className="section-label reveal">Free Audit</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Claim Your <span className="text-grad">Free Audit</span></h2>
            </div>
            <div className="form-card reveal">
              <LeadForm compact={true} />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FAQ ════════════════ */}
        <section className="ma-section" style={{ background: "var(--dark2)" }}>
          <div className="ma-inner">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
              <p className="section-label reveal">FAQ</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Frequently Asked <span className="text-grad">Questions</span></h2>
            </div>
            <div className="reveal">
              <FaqSection />
            </div>
          </div>
        </section>

        {/* ════════════════ FINAL CTA ════════════════ */}
        <div className="cta-section">
          <div className="orb orb1" style={{ left: "-15%", top: "-20%", opacity: 0.4 }} />
          <div className="orb orb2" style={{ right: "-15%", bottom: "-20%", opacity: 0.4 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
            <div className="glow-line reveal" style={{ margin: "0 auto 28px" }} />
            <h2 className="section-title reveal" style={{ textAlign: "center", fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Stop Wasting Budget on<br />
              <span className="text-grad-gold">Low-Quality Leads</span>
            </h2>
            <p className="reveal" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", textAlign: "center", marginBottom: 48, lineHeight: 1.7 }}>
              Let's build a Meta Ads campaign that delivers real ROI
            </p>
            <div className="reveal" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
              <a href="#audit-form" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 40px" }}>
                <span>Book Strategy Call</span>
                <ArrowRight style={{ width: 20, height: 20 }} />
              </a>
              <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "1rem", padding: "16px 32px" }}>
                <MessageCircle style={{ width: 18, height: 18 }} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}