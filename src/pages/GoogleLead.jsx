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
  Search,
  MousePointer,
  ShoppingCart,
  PlayCircle,
  Globe,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const problems = [
  { icon: "💸", title: "High CPC, Low Conversions",     description: "Paying premium for clicks that never turn into customers" },
  { icon: "🎯", title: "Wrong Audience Targeting",       description: "Ads showing to people who will never buy from you" },
  { icon: "📉", title: "Wasted Budget on Broad Match",   description: "Keywords draining budget without generating quality leads" },
  { icon: "🔍", title: "Poor Quality Score",             description: "Low Ad Rank means you pay more and rank lower than competitors" },
  { icon: "📊", title: "No Conversion Tracking",         description: "Running blind campaigns without knowing what's actually working" },
  { icon: "🗑️", title: "Irrelevant Search Terms",        description: "Showing up for searches that have nothing to do with your business" },
];

const adTypes = [
  { icon: <Search className="w-7 h-7" />,       title: "Search Ads",    description: "Capture high-intent buyers the moment they search for your product or service on Google" },
  { icon: <Globe className="w-7 h-7" />,         title: "Display Ads",   description: "Visual banner ads across millions of websites to build awareness and retarget visitors" },
  { icon: <PlayCircle className="w-7 h-7" />,    title: "YouTube Ads",   description: "Engage potential customers with compelling video content on the world's largest video platform" },
  { icon: <ShoppingCart className="w-7 h-7" />,  title: "Shopping Ads",  description: "Showcase your products directly in search results with images, prices and ratings" },
];

const solutions = [
  { icon: <Target className="w-8 h-8" />,       title: "Keyword Research & Strategy",     description: "Deep competitor analysis and intent-based keyword mapping to capture the right searches at the right cost" },
  { icon: <MousePointer className="w-8 h-8" />, title: "Conversion-Optimised Ad Copy",    description: "Headlines and descriptions crafted to maximise CTR and drive action — not just impressions" },
  { icon: <Shield className="w-8 h-8" />,       title: "Negative Keyword Management",     description: "Aggressive negative keyword lists to eliminate wasted spend and improve lead quality dramatically" },
  { icon: <TrendingUp className="w-8 h-8" />,   title: "Bid Strategy & ROAS Optimisation", description: "Smart bidding configuration, Quality Score improvement and budget allocation for maximum returns" },
];

const industries = [
  { name: "Real Estate",      icon: "🏢" },
  { name: "Doctors & Clinics",icon: "👨‍⚕️" },
  { name: "D2C Brands",       icon: "🛍️" },
  { name: "Education",        icon: "🎓" },
  { name: "Local Services",   icon: "🏪" },
];

const process = [
  { number: "01", title: "Account Audit",       description: "Complete audit of your existing Google Ads account — keywords, bids, Quality Scores, wastage, and missed opportunities", icon: <Target className="w-6 h-6" /> },
  { number: "02", title: "Strategy & Setup",    description: "Custom campaign architecture, keyword mapping, ad group structure, landing page alignment and conversion tracking setup", icon: <Zap className="w-6 h-6" /> },
  { number: "03", title: "Launch & Monitor",    description: "Careful launch with daily monitoring, search term analysis, and rapid iteration in the first 30 days", icon: <BarChart3 className="w-6 h-6" /> },
  { number: "04", title: "Scale for Profit",    description: "Proven performers scaled up, underperformers cut — systematically growing ROAS while reducing CPA month over month", icon: <TrendingUp className="w-6 h-6" /> },
];

const results = [
  { value: "60%",   label: "Lower Cost Per Lead",     metric: "Average CPA reduction" },
  { value: "4x",    label: "Return on Ad Spend",      metric: "Average ROAS delivered" },
  { value: "500+",  label: "Campaigns Managed",       metric: "Across multiple industries" },
];

const faqs = [
  { question: "How is Google Ads different from Meta Ads?",     answer: "Google Ads captures people who are actively searching for your product or service — they have buying intent. Meta Ads is better for awareness and interest-based targeting. Both work well together, but Google Search Ads typically deliver higher-quality leads for service businesses." },
  { question: "What budget should I start with?",               answer: "We recommend a minimum monthly ad spend of ₹25,000–₹50,000 for Search campaigns to get meaningful data. Shopping and Display campaigns can work with slightly lower budgets. Our management fee is separate from your ad spend." },
  { question: "How long before I see results?",                 answer: "Google Ads can deliver leads from day 1 after launch. However, campaigns typically improve significantly in the first 30–60 days as we gather data and optimise. Maximum performance usually comes at the 90-day mark." },
  { question: "Do you handle landing pages too?",               answer: "Yes — we review and advise on landing page improvements as part of our strategy. A high-converting landing page is critical for Google Ads success and directly impacts your Quality Score and CPC." },
  { question: "Will you manage our existing Google Ads account?",answer: "Absolutely. We can either take over and optimise your existing account or set up a fresh one with the right structure. We provide full transparency — you always own the account." },
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
  body { font-family: 'DM Sans', sans-serif; background: var(--dark); color: #e8f5ee; overflow-x: hidden; }
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

  .glow-line { width:80px; height:3px; background:linear-gradient(90deg,var(--g3),var(--gold2)); border-radius:99px; box-shadow:0 0 12px var(--g3); }

  .badge {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,96,57,0.2); border:1px solid rgba(0,180,110,0.3);
    backdrop-filter:blur(12px); padding:8px 20px; border-radius:99px;
    font-size:13px; font-weight:600; letter-spacing:0.04em; color:var(--g4);
  }

  /* ── LAYOUT ── */
  .ga-section { padding:100px 24px; }
  .ga-inner   { max-width:1280px; margin:0 auto; }

  .section-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--g3); margin-bottom:16px; }
  .section-title { font-family:'Poppins',sans-serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; color:#fff; margin-bottom:20px; }
  .section-desc  { color:#8ab09a; font-size:0.95rem; line-height:1.75; }

  /* ── HERO ── */
  .ga-hero {
    position:relative; min-height:100vh;
    display:flex; align-items:center; overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 60%),
      var(--dark);
  }
  .ga-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,180,110,0.06) 1px, transparent 1px),
      linear-gradient(90deg,rgba(0,180,110,0.06) 1px, transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    animation:gridScroll 20s linear infinite;
  }
  @keyframes gridScroll { from{background-position:0 0;} to{background-position:60px 60px;} }

  .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:orbFloat 8s ease-in-out infinite;}
  .orb1{width:500px;height:500px;background:radial-gradient(circle,rgba(0,140,70,0.25),transparent 70%);top:-10%;left:-10%;}
  .orb2{width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%);bottom:0;right:-5%;animation-delay:3s;}
  .orb3{width:300px;height:300px;background:radial-gradient(circle,rgba(0,96,57,0.3),transparent 70%);top:40%;left:40%;animation-delay:1.5s;}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-20px) scale(1.05);}66%{transform:translate(-20px,15px) scale(0.97);}}

  .aura-ring{position:absolute;border-radius:50%;border:1px solid rgba(0,180,110,0.3);pointer-events:none;}
  .ring1{width:400px;height:400px;left:-100px;top:100px;animation:ringPulse 4s ease-out infinite;}
  .ring2{width:600px;height:600px;left:-200px;top:0;   animation:ringPulse 4s ease-out 1.3s infinite;}
  .ring3{width:800px;height:800px;left:-300px;top:-100px;animation:ringPulse 4s ease-out 2.6s infinite;}
  @keyframes ringPulse{0%{transform:scale(1);opacity:0.4;}100%{transform:scale(1.5);opacity:0;}}

  .ga-hero-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:20px 0px;width:100%;}
  .hero-grid{display:grid;gap:48px;align-items:flex-start;}
  @media(min-width:900px){.hero-grid{grid-template-columns:1fr 1fr;}}

  .ga-hero h1{
    font-family:'Poppins',sans-serif;
    font-size:clamp(2.8rem,3.5vw,5rem);
    font-weight:900;line-height:1.05;letter-spacing:-0.03em;color:#fff;
    margin:24px 0;
  }
  .hero-sub{font-size:1.1rem;color:#a3c4b0;line-height:1.7;margin-bottom:32px;}

  .trust-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:36px;}
  .trust-pill-stat{
    background:rgba(0,96,57,0.15);border:1px solid rgba(0,180,110,0.2);
    backdrop-filter:blur(8px);border-radius:16px;padding:12px 20px;text-align:center;
  }
  .trust-pill-num{
    font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;
    background:linear-gradient(135deg,var(--g4),var(--gold2));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;
  }
  .trust-pill-label{font-size:0.72rem;color:#8ab09a;}

  /* ── BUTTONS ── */
  .btn-primary{
    display:inline-flex;align-items:center;gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff;padding:16px 36px;border-radius:99px;
    font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;
    border:none;cursor:pointer;text-decoration:none;
    position:relative;overflow:hidden;
    box-shadow:0 0 30px rgba(0,140,70,0.4),inset 0 1px 0 rgba(255,255,255,0.15);
    transition:transform 0.2s,box-shadow 0.2s;
  }
  .btn-primary:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 0 50px rgba(0,180,110,0.6);}

  .btn-whatsapp{
    display:inline-flex;align-items:center;gap:10px;
    background:rgba(37,211,102,0.12);border:1.5px solid rgba(37,211,102,0.35);
    color:#25d366;padding:16px 36px;border-radius:99px;
    font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;
    cursor:pointer;text-decoration:none;
    transition:background 0.2s,border-color 0.2s,transform 0.2s;
  }
  .btn-whatsapp:hover{background:rgba(37,211,102,0.2);border-color:rgba(37,211,102,0.6);transform:translateY(-2px);}

  /* ── FORM ── */
  .form-card{
    background:rgba(0,30,15,0.7);
    border:1px solid rgba(0,180,110,0.22);
    backdrop-filter:blur(24px);
    border-radius:28px;padding:40px 36px;
    box-shadow:0 32px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(0,180,110,0.08);
  }
  .form-title{font-family:'Poppins',sans-serif;font-weight:800;font-size:1.7rem;margin-bottom:6px;}
  .form-sub{color:#8ab09a;font-size:0.88rem;margin-bottom:28px;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-size:0.8rem;font-weight:600;color:#a3c4b0;margin-bottom:6px;letter-spacing:0.04em;}
  .form-input,.form-select{
    width:100%;background:rgba(0,96,57,0.08);
    border:1px solid rgba(0,180,110,0.18);
    border-radius:14px;padding:13px 16px;
    color:#e8f5ee;font-family:'DM Sans',sans-serif;font-size:0.92rem;
    outline:none;transition:border-color 0.2s,box-shadow 0.2s;appearance:none;
  }
  .form-input::placeholder{color:rgba(163,196,176,0.4);}
  .form-input:focus,.form-select:focus{border-color:var(--g3);box-shadow:0 0 0 3px rgba(0,180,110,0.12);}
  .form-select option{background:#031a0f;color:#e8f5ee;}
  .form-row{display:grid;gap:16px;}
  @media(min-width:500px){.form-row{grid-template-columns:1fr 1fr;}}
  .btn-form-submit{
    width:100%;margin-top:8px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff;padding:16px;border-radius:14px;
    font-family:'Poppins',sans-serif;font-weight:800;font-size:1.05rem;
    border:none;cursor:pointer;
    box-shadow:0 0 30px rgba(0,140,70,0.4);
    transition:transform 0.2s,box-shadow 0.2s;
  }
  .btn-form-submit:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 0 50px rgba(0,180,110,0.5);}
  .form-privacy{font-size:0.75rem;color:rgba(163,196,176,0.5);text-align:center;margin-top:12px;}

  /* ── CARDS ── */
  .glass-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:28px;
    transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;
  }
  .glass-card:hover{transform:translateY(-6px);border-color:rgba(0,212,125,0.35);box-shadow:0 20px 60px rgba(0,96,57,0.25);}

  .prob-card{
    background:rgba(180,30,30,0.06);border:1px solid rgba(220,60,60,0.15);
    border-radius:24px;padding:32px 24px;
    transition:transform 0.3s,border-color 0.3s;
  }
  .prob-card:hover{transform:translateY(-4px);border-color:rgba(220,60,60,0.35);}

  /* ad type strip card */
  .adtype-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:24px;padding:28px 24px;
    display:flex;align-items:flex-start;gap:18px;
    transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;
  }
  .adtype-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,0.4);box-shadow:0 16px 40px rgba(0,96,57,0.25);}
  .adtype-icon{
    width:56px;height:56px;flex-shrink:0;border-radius:16px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;box-shadow:0 0 20px rgba(0,140,70,0.35);
    transition:transform 0.3s;
  }
  .adtype-card:hover .adtype-icon{transform:scale(1.1) rotate(-4deg);}

  /* result card */
  .result-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:28px;padding:48px 28px;text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.2),border-color 0.3s,box-shadow 0.3s;
  }
  .result-card:hover{transform:translateY(-8px) scale(1.03);border-color:rgba(0,212,125,0.4);box-shadow:0 24px 60px rgba(0,96,57,0.3);}
  .result-val{
    font-family:'Poppins',sans-serif;font-weight:900;
    font-size:clamp(3rem,6vw,4.5rem);line-height:1;
    background:linear-gradient(135deg,var(--g4),var(--gold2));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    display:block;margin-bottom:8px;
  }

  /* industry chip */
  .ind-chip{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:20px;padding:28px 20px;text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.4),border-color 0.3s,box-shadow 0.3s;
  }
  .ind-chip:hover{transform:translateY(-6px) scale(1.06);border-color:rgba(0,212,125,0.4);box-shadow:0 20px 50px rgba(0,96,57,0.3);}
  .ind-chip-icon{font-size:2.8rem;display:block;margin-bottom:12px;transition:transform 0.3s;}
  .ind-chip:hover .ind-chip-icon{transform:scale(1.2);}

  /* process card */
  .proc-card{
    position:relative;overflow:hidden;
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:28px;padding:36px 28px;
    transition:transform 0.35s,border-color 0.3s,box-shadow 0.3s;
  }
  .proc-card:hover{transform:translateY(-6px);border-color:rgba(0,212,125,0.4);box-shadow:0 20px 50px rgba(0,96,57,0.2);}
  .proc-num{font-family:'Poppins',sans-serif;font-weight:900;font-size:5rem;color:rgba(0,180,110,0.1);line-height:1;margin-bottom:12px;transition:color 0.3s;}
  .proc-card:hover .proc-num{color:rgba(0,180,110,0.2);}
  .proc-connector{display:none;position:absolute;top:68px;left:100%;width:100%;height:1px;background:linear-gradient(90deg,rgba(0,180,110,0.4),transparent);}
  @media(min-width:900px){.proc-connector{display:block;}}

  /* ── ICON WRAPS ── */
  .icon-wrap{
    width:72px;height:72px;border-radius:20px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;margin-bottom:20px;
    box-shadow:0 0 24px rgba(0,140,70,0.35);
  }
  .icon-wrap-sm{
    width:56px;height:56px;border-radius:16px;
    background:linear-gradient(135deg,rgba(0,96,57,0.3),rgba(0,140,70,0.2));
    border:1px solid rgba(0,180,110,0.2);
    display:flex;align-items:center;justify-content:center;
    color:var(--g3);margin-bottom:16px;transition:transform 0.3s;
  }
  .glass-card:hover .icon-wrap-sm{transform:scale(1.1);}

  /* ── GRIDS ── */
  .grid-2{display:grid;gap:24px;} @media(min-width:900px){.grid-2{grid-template-columns:1fr 1fr;}}
  .grid-3{display:grid;gap:24px;} @media(min-width:600px){.grid-3{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-3{grid-template-columns:repeat(3,1fr);}}
  .grid-4{display:grid;gap:24px;} @media(min-width:600px){.grid-4{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-4{grid-template-columns:repeat(4,1fr);}}
  .grid-5{display:grid;gap:20px;} @media(min-width:600px){.grid-5{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-5{grid-template-columns:repeat(3,1fr);}} @media(min-width:1100px){.grid-5{grid-template-columns:repeat(5,1fr);}}

  /* ── OFFER BLOCK ── */
  .offer-block{background:rgba(0,96,57,0.08);border:1px solid rgba(0,180,110,0.2);border-radius:28px;padding:64px 48px;text-align:center;}
  .offer-pill-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:32px;}
  .offer-pill{
    background:rgba(0,96,57,0.12);border:1px solid rgba(0,180,110,0.2);
    border-radius:99px;padding:10px 24px;
    display:flex;align-items:center;gap:8px;
    font-size:0.88rem;font-weight:600;color:#b0d4be;
  }

  /* ── FOUNDER BLOCK ── */
  .founder-block{background:rgba(0,96,57,0.08);border:1px solid var(--border);border-radius:28px;padding:64px 48px;text-align:center;}
  .founder-avatar{
    width:96px;height:96px;border-radius:50%;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    font-family:'Poppins',sans-serif;font-weight:900;font-size:2rem;color:#fff;
    margin:0 auto 24px;
    box-shadow:0 0 40px rgba(0,140,70,0.45);
    border:3px solid rgba(0,180,110,0.3);
  }

  /* ── FAQ ── */
  .faq-item{background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-bottom:12px;transition:border-color 0.3s;}
  .faq-item.open{border-color:rgba(0,212,125,0.35);}
  .faq-btn{width:100%;padding:22px 28px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;text-align:left;transition:background 0.2s;}
  .faq-btn:hover{background:rgba(0,96,57,0.08);}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:#fff;padding-right:16px;}
  .faq-chevron{color:var(--g3);flex-shrink:0;transition:transform 0.3s;}
  .faq-chevron.open{transform:rotate(180deg);}
  .faq-answer{padding:0 28px 22px;color:#8ab09a;font-size:0.92rem;line-height:1.7;}

  /* ── CTA SECTION ── */
  .cta-section{
    padding:100px 24px;text-align:center;position:relative;overflow:hidden;
    background:linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%);
  }
  .cta-section::before{
    content:'';position:absolute;inset:0;
    background-image:radial-gradient(circle at 2px 2px,rgba(0,180,110,0.12) 1px,transparent 0);
    background-size:40px 40px;
  }

  /* ── DIVIDER ── */
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,180,110,0.2),rgba(201,168,76,0.15),rgba(0,180,110,0.2),transparent);}

  /* ── REVEAL ── */
  .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-delay-1{transition-delay:0.1s;} .reveal-delay-2{transition-delay:0.2s;}
  .reveal-delay-3{transition-delay:0.3s;} .reveal-delay-4{transition-delay:0.4s;}
  .stagger>*:nth-child(1){transition-delay:0.05s;} .stagger>*:nth-child(2){transition-delay:0.15s;}
  .stagger>*:nth-child(3){transition-delay:0.25s;} .stagger>*:nth-child(4){transition-delay:0.35s;}
  .stagger>*:nth-child(5){transition-delay:0.45s;} .stagger>*:nth-child(6){transition-delay:0.55s;}

  .cursor-glow{position:fixed;width:400px;height:400px;background:radial-gradient(circle,rgba(0,140,70,0.06),transparent 70%);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;}

  /* ── GOOGLE SEARCH PREVIEW ── */
  .search-preview{
    background:rgba(0,20,10,0.6);border:1px solid rgba(0,180,110,0.2);
    border-radius:20px;padding:24px;margin-top:28px;
  }
  .sp-label{font-size:0.72rem;color:var(--g3);font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px;}
  .sp-ad-tag{
    display:inline-block;background:rgba(0,180,110,0.15);border:1px solid rgba(0,180,110,0.3);
    color:var(--g3);font-size:0.65rem;font-weight:700;
    padding:2px 7px;border-radius:4px;margin-right:8px;letter-spacing:0.06em;
  }
  .sp-url{font-size:0.8rem;color:#8ab09a;margin-bottom:4px;}
  .sp-headline{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.05rem;color:var(--g4);margin-bottom:4px;}
  .sp-desc{font-size:0.82rem;color:#8ab09a;line-height:1.5;}

  /* ── COMPARE TABLE ── */
  .compare-row{
    display:grid;grid-template-columns:1fr 1fr;gap:20px;
    background:rgba(0,96,57,0.06);border:1px solid var(--border);
    border-radius:24px;padding:32px;
  }
  @media(min-width:900px){.compare-row{grid-template-columns:1fr 1fr;}}
  .compare-col{padding:8px;}
  .compare-title{font-family:'Poppins',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:16px;color:#fff;}
  .compare-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:10px;font-size:0.88rem;color:#a3c4b0;line-height:1.5;}
  .compare-dot-green{width:7px;height:7px;background:var(--g3);border-radius:50%;margin-top:5px;flex-shrink:0;}
  .compare-dot-gold{width:7px;height:7px;background:var(--gold2);border-radius:50%;margin-top:5px;flex-shrink:0;}
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

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:16 }}>🎉</div>
      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#fff", marginBottom:12 }}>Request Received!</h3>
      <p style={{ color:"#8ab09a", fontSize:"0.95rem" }}>We'll contact you within 24 hours to schedule your free Google Ads audit.</p>
    </div>
  );

  return (
    <>
      <h3 className="form-title text-grad" style={{ fontSize: compact ? "1.4rem" : "1.7rem" }}>
        {compact ? "Claim Your Free Google Ads Audit" : "Get Your Free Audit"}
      </h3>
      <p className="form-sub">{compact ? "We'll get back to you within 24 hours" : "Fill the form and we'll audit your Google Ads account"}</p>

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
              <option value="d2c">D2C Brand</option>
              <option value="ecommerce">E-commerce</option>
              <option value="education">Education</option>
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
              <option value="25-50k">₹25,000 – ₹50,000</option>
              <option value="50-100k">₹50,000 – ₹1,00,000</option>
              <option value="100-200k">₹1,00,000 – ₹2,00,000</option>
              <option value="200k+">₹2,00,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Campaign Goal *</label>
            <select className="form-select" name="goal" required value={formData.goal} onChange={handleChange}>
              <option value="">Select goal</option>
              <option value="leads">Generate Leads</option>
              <option value="sales">Drive Online Sales</option>
              <option value="calls">Phone Calls</option>
              <option value="traffic">Website Traffic</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-form-submit">Get My Free Google Ads Audit →</button>
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
export default function GoogleAdsPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow" className="cursor-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════ HERO ════════════════ */}
        <section className="ga-hero">
          <div className="ga-hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="aura-ring ring1" /><div className="aura-ring ring2" /><div className="aura-ring ring3" />

          <div className="ga-hero-inner">
            <div className="hero-grid">
              {/* Left */}
              <div>
                <div className="badge reveal">
                  <Search style={{ width: 16, height: 16 }} />
                  Google Ads Experts — Delhi
                </div>

                <h1 className="reveal reveal-delay-1">
                  Google Ads Agency<br />That Captures<br />
                  <span className="text-grad">High-Intent Buyers</span><br />
                  at the Right Moment
                </h1>

                <p className="hero-sub reveal reveal-delay-2">
                  We help{" "}
                  <strong style={{ color: "var(--g4)" }}>Real Estate, Doctors, D2C brands & local businesses</strong>{" "}
                  appear at the top of Google when their customers are actively searching — and convert those clicks into qualified leads and sales.
                </p>

                <div className="trust-row reveal reveal-delay-2">
                  {[
                    { num: "₹2 Cr+", label: "Ad Spend Managed" },
                    { num: "4x",     label: "Avg. ROAS Delivered" },
                    { num: "500+",   label: "Campaigns Delivered" },
                  ].map((t, i) => (
                    <div key={i} className="trust-pill-stat">
                      <span className="trust-pill-num">{t.num}</span>
                      <span className="trust-pill-label">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <a href="#audit-form" className="btn-primary">
                    <span>Get Free Google Ads Audit</span>
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </a>
                  <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                </div>

                {/* Google Search Ad Preview */}
                <div className="search-preview reveal reveal-delay-4">
                  <p className="sp-label">How Your Ad Will Look on Google</p>
                  <div>
                    <p className="sp-url"><span className="sp-ad-tag">Ad</span> roasbadhao.com › google-ads</p>
                    <p className="sp-headline">Best Google Ads Agency Delhi | Free Audit</p>
                    <p className="sp-desc">High-ROAS Google Ads for Real Estate, Doctors & D2C. ₹2 Cr+ Managed. Get a Free Strategy Call Today!</p>
                  </div>
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

        {/* ════════════════ AD TYPES ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Campaign Types</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Google Ads <span className="text-grad">Campaigns We Run</span></h2>
              <p className="section-desc reveal">From search to shopping — we pick the right campaign type for your business goal</p>
            </div>
            <div className="grid-2 stagger">
              {adTypes.map((a, i) => (
                <div key={i} className="adtype-card reveal">
                  <div className="adtype-icon">{a.icon}</div>
                  <div>
                    <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.15rem", color:"#fff", marginBottom:8 }}>{a.title}</h3>
                    <p style={{ color:"#8ab09a", fontSize:"0.9rem", lineHeight:1.65 }}>{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ PROBLEMS ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark)" }}>
          <div className="ga-inner">
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
              <h2 className="section-title reveal">
                Is Your Google Ads Budget{" "}
                <span className="text-grad-red">Being Wasted?</span>
              </h2>
              <p className="section-desc reveal">These are the most common problems we fix for new clients</p>
            </div>
            <div className="grid-3 stagger">
              {problems.map((p, i) => (
                <div key={i} className="prob-card reveal">
                  <div style={{ fontSize:"2.5rem", marginBottom:16 }}>{p.icon}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.05rem", color:"#fff", marginBottom:8 }}>{p.title}</h3>
                  <p style={{ color:"#8a9a93", fontSize:"0.88rem", lineHeight:1.6 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ SOLUTIONS ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Our Approach</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">How We Fix Your <span className="text-grad">Google Ads Performance</span></h2>
            </div>
            <div className="grid-2 stagger">
              {solutions.map((s, i) => (
                <div key={i} className="glass-card reveal" style={{ padding:"36px 32px" }}>
                  <div className="icon-wrap">{s.icon}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.3rem", color:"#fff", marginBottom:12 }}>{s.title}</h3>
                  <p style={{ color:"#8ab09a", fontSize:"0.9rem", lineHeight:1.65 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ RESULTS ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark)" }}>
          <div className="ga-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Numbers That Matter</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Real <span className="text-grad">Google Ads Results</span></h2>
            </div>
            <div className="grid-3 stagger">
              {results.map((r, i) => (
                <div key={i} className="result-card reveal">
                  <span className="result-val">{r.value}</span>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:4 }}>{r.label}</p>
                  <p style={{ fontSize:"0.8rem", color:"#8ab09a" }}>{r.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ GOOGLE vs META COMPARE ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner" style={{ maxWidth: 900 }}>
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
              <p className="section-label reveal">Google Ads vs Meta Ads</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Which One Is <span className="text-grad">Right for You?</span></h2>
            </div>
            <div className="compare-row reveal">
              <div className="compare-col">
                <p className="compare-title" style={{ color:"var(--g4)" }}>🔍 Google Ads — Best for:</p>
                {["High-intent buyers actively searching", "Service businesses (doctors, lawyers, consultants)", "Local businesses wanting foot traffic or calls", "E-commerce with Google Shopping", "Competitors bidding on your brand name"].map((item, i) => (
                  <div key={i} className="compare-item"><div className="compare-dot-green" />{item}</div>
                ))}
              </div>
              <div className="compare-col" style={{ borderLeft:"1px solid var(--border)", paddingLeft:28 }}>
                <p className="compare-title" style={{ color:"var(--gold2)" }}>📱 Meta Ads — Best for:</p>
                {["Awareness campaigns targeting cold audiences", "D2C brands with strong visual creatives", "Interest-based & demographic targeting", "Retargeting website visitors", "Low-ticket impulse purchase products"].map((item, i) => (
                  <div key={i} className="compare-item"><div className="compare-dot-gold" />{item}</div>
                ))}
              </div>
            </div>
            <p className="reveal" style={{ textAlign:"center", color:"#8ab09a", fontSize:"0.9rem", marginTop:24, lineHeight:1.7 }}>
              💡 Best results come from running both together — we can manage your full paid media strategy.
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ INDUSTRIES ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark)" }}>
          <div className="ga-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Who We Serve</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Industries <span className="text-grad">We Work With</span></h2>
            </div>
            <div className="grid-5 stagger">
              {industries.map((ind, i) => (
                <div key={i} className="ind-chip reveal">
                  <span className="ind-chip-icon">{ind.icon}</span>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"0.88rem", color:"#e8f5ee" }}>{ind.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ PROCESS ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">How We Work</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">4-Step Process</span></h2>
            </div>
            <div className="grid-4 stagger">
              {process.map((step, i) => (
                <div key={i} className="proc-card reveal" style={{ position:"relative" }}>
                  {i < process.length - 1 && <div className="proc-connector" />}
                  <div className="proc-num">{step.number}</div>
                  <div className="icon-wrap" style={{ marginBottom:16 }}>{step.icon}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.15rem", color:"#fff", marginBottom:10 }}>{step.title}</h3>
                  <p style={{ color:"#8ab09a", fontSize:"0.88rem", lineHeight:1.65 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ OFFER BLOCK ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark)" }}>
          <div className="ga-inner">
            <div className="offer-block reveal">
              <div className="icon-wrap" style={{ margin:"0 auto 24px" }}>
                <Sparkles style={{ width:32, height:32 }} />
              </div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Get a Free <span className="text-grad">Google Ads Account Audit</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", maxWidth:600, margin:"0 auto", lineHeight:1.7 }}>
                We'll review your campaigns and show you exactly where your budget is being wasted — and how to fix it
              </p>
              <div className="offer-pill-row">
                {["Keyword Analysis", "Quality Score Review", "Wastage Identification", "Growth Roadmap"].map((pill, i) => (
                  <div key={i} className="offer-pill">
                    <CheckCircle2 style={{ width:16, height:16, color:"var(--g3)" }} />
                    {pill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ FORM (Bottom) ════════════════ */}
        <section id="audit-form" className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner" style={{ maxWidth:860 }}>
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
              <p className="section-label reveal">Free Audit</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Claim Your <span className="text-grad">Free Google Ads Audit</span></h2>
            </div>
            <div className="form-card reveal">
              <LeadForm compact={true} />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FOUNDER ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark)" }}>
          <div className="ga-inner">
            <div className="founder-block reveal">
              <div className="founder-avatar">RS</div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Founded by <span className="text-grad">Raushan Saxena</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", lineHeight:1.75, maxWidth:680, margin:"0 auto" }}>
                Hands-on Google Ads management with a focus on Quality Score, conversion tracking, and ROAS — not just clicks. Raushan brings a data-first methodology built from real campaign experience across Real Estate, Healthcare, and D2C industries.
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FAQ ════════════════ */}
        <section className="ga-section" style={{ background: "var(--dark2)" }}>
          <div className="ga-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">FAQ</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Frequently Asked <span className="text-grad">Questions</span></h2>
            </div>
            <div className="reveal"><FaqSection /></div>
          </div>
        </section>

        {/* ════════════════ FINAL CTA ════════════════ */}
        <div className="cta-section">
          <div className="orb orb1" style={{ left:"-15%", top:"-20%", opacity:0.4 }} />
          <div className="orb orb2" style={{ right:"-15%", bottom:"-20%", opacity:0.4 }} />
          <div style={{ position:"relative", zIndex:2, maxWidth:800, margin:"0 auto" }}>
            <div className="glow-line reveal" style={{ margin:"0 auto 28px" }} />
            <h2 className="section-title reveal" style={{ textAlign:"center", fontSize:"clamp(2rem,4vw,3.2rem)" }}>
              Be at the Top of Google<br />
              <span className="text-grad-gold">When Your Customers Search</span>
            </h2>
            <p className="reveal" style={{ color:"rgba(255,255,255,0.75)", fontSize:"1.05rem", textAlign:"center", marginBottom:48, lineHeight:1.7 }}>
              Let's build a Google Ads campaign that captures ready-to-buy customers and delivers real ROI
            </p>
            <div className="reveal" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:16 }}>
              <a href="#audit-form" className="btn-primary" style={{ fontSize:"1.05rem", padding:"16px 40px" }}>
                <span>Book Strategy Call</span>
                <ArrowRight style={{ width:20, height:20 }} />
              </a>
              <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize:"1rem", padding:"16px 32px" }}>
                <MessageCircle style={{ width:18, height:18 }} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}