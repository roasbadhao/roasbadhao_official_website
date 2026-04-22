import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  TrendingUp, Target, BarChart3, Users, CheckCircle2,
  ArrowRight, Sparkles, Shield, Zap, Phone,
} from "lucide-react";
import ClientShowcase from "../clientShowcase/ClientShowCase";
import AuditModal from "../AuditModal/AuditModal";
import heroVideo from '../../assets/video/home-hero-clip1.mp4'

const partnerRow1 = [
  { 
    name: "Meta Ads", 
    // sub: "Certified Partner", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" 
  },
  { 
    name: "Google Ads", 
    // sub: "Partner Agency", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" 
  },
  { 
    name: "Shopify", 
    // sub: "E-commerce Expert", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" 
  },
  { 
    name: "WordPress", 
    // sub: "Web Development", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" 
  },
  { 
    name: "WhatsApp", 
    // sub: "Business API", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
  },
  { 
    name: "Analytics", 
    // sub: "Google Analytics", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg" 
  },
  { 
    name: "Meta Pixel", 
    // sub: "Tracking & Events", 
    icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png" 
  },
  { 
    name: "GMB", 
    // sub: "Google My Business", 
icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png"  },
];

const partnerRow2 = [
  { 
    name: "Real Estate", 
    // sub: "Lead Generation", 
    icon: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
  },
  { 
    name: "Healthcare", 
    // sub: "Doctor Marketing", 
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966488.png" 
  },
  { 
    name: "D2C Brands", 
    // sub: "Direct-to-Consumer", 
    icon: "https://cdn-icons-png.flaticon.com/512/891/891462.png" 
  },
  { 
    name: "Salon & Spa", 
    // sub: "Local Marketing", 
icon: "https://cdn-icons-png.flaticon.com/512/3075/3075978.png"  },
  { 
    name: "Food & Bev", 
    // sub: "Restaurant Ads", 
    icon: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" 
  },
  { 
    name: "E-commerce", 
    // sub: "Sales Campaigns", 
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
  },
  { 
    name: "Education", 
    // sub: "Lead Funnels", 
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" 
  },
  { 
    name: "Finance", 
    // sub: "BFSI Marketing", 
icon: "https://cdn-icons-png.flaticon.com/512/2331/2331943.png"  },
];

const stats = [
  { value: 2, suffix: " Cr+", label: "Ad Spend Managed", icon: <TrendingUp />, decimals: 1 },
  { value: 7.5, suffix: " Cr+", label: "Revenue Generated", icon: <BarChart3 />, decimals: 1 },
  { value: 85, suffix: "+", label: "Successful Campaigns", icon: <Target />, decimals: 0 },
  { value: 15, suffix: "+", label: "Happy Clients", icon: <Users />, decimals: 0 },
];

const services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png", // Meta (Facebook)
    title: "Meta Ads",
    desc: "Audience research, creative strategy, lead campaigns and funnel optimisation for maximum ROAS.",
    feat: ["Custom Audiences", "A/B Testing", "Retargeting", "Performance Analytics"]
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/281/281764.png", // Google Ads
    title: "Google Ads",
    desc: "Capture high-intent customers with Search, Display & YouTube Ads with conversion tracking.",
    feat: ["Search Campaigns", "Display Network", "YouTube Ads", "Shopping Ads"]
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", // Location / GMB
    title: "GMB Optimisation",
    desc: "GMB setup, optimisation, ranking strategy, reviews and local visibility growth.",
    feat: ["Profile Optimisation", "Review Management", "Local SEO", "Post Scheduling"]
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png", // Website / Code
    title: "Website Design",
    desc: "Conversion-focused WordPress & Shopify websites — mobile-first, fast, and lead-ready.",
    feat: ["Responsive Design", "Fast Loading", "Lead Integration", "SEO Optimised"]
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Target / Leads
    title: "Lead Generation",
    desc: "Lead systems designed for quality, WhatsApp integration and higher closing rates.",
    feat: ["Quality Filtering", "WhatsApp Integration", "CRM Setup", "Follow-up Automation"]
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png", // E-commerce
    title: "E-commerce Sales",
    desc: "D2C sales strategies, product listing optimisation, cart recovery and CRO.",
    feat: ["Product Optimization", "Cart Recovery", "Sales Funnel", "Analytics Dashboard"]
  },
];
const problems = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png", // Cross / error
    title: "Ads Running, No Conversions",
    desc: "Clicks are coming but leads aren't converting into actual sales."
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png", // Down chart
    title: "Low ROAS",
    desc: "Spending more on ads than you're making back in revenue."
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Map pin
    title: "Poor Google Maps Visibility",
    desc: "Your customers simply can't find you when they search nearby."
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1214/1214428.png", // Trash / bad leads
    title: "Junk Enquiries",
    desc: "Getting irrelevant leads that waste your team's time and budget."
  },
];
const process = [
  { num: "01", title: "Audit & Strategy", desc: "Deep analysis of your business, audience research, and a custom growth plan.", icon: <Target /> },
  { num: "02", title: "Setup & Launch", desc: "Campaign setup, pixel integration, tracking, and a strategic go-live.", icon: <Zap /> },
  { num: "03", title: "Optimisation", desc: "Continuous A/B testing, creative refresh, audience refinement and tuning.", icon: <BarChart3 /> },
  { num: "04", title: "Scale & Growth", desc: "Strategic scaling, budget expansion, new channels, and sustained growth.", icon: <TrendingUp /> },
];
const whyUs = [
  { icon: <Users />, title: "Founder-led Strategy", desc: "Direct founder involvement in your campaign strategy — not delegated to juniors." },
  { icon: <Target />, title: "Performance-first Mindset", desc: "Focused on ROAS and real business results, never vanity metrics." },
  { icon: <BarChart3 />, title: "Transparent Reporting", desc: "Clear, detailed reports showing exactly where every rupee goes." },
  { icon: <Shield />, title: "No Fake Guarantees", desc: "Honest communication and realistic expectations from day one." },
];

// Real SVG icons for industries
const industryIcons = {
  "Real Estate": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "Healthcare": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Salon & Spa": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  "Food & Beverage": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  "D2C Brands": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  "E-commerce": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
    </svg>
  ),
};

const industries = [
  { name: "Real Estate", tag: "Lead Generation · Meta & Google Ads", image: "data:image/webp;base64,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", desc: "We generate high-intent property leads through hyper-targeted Meta & Google Ads — reaching serious buyers and investors, not tyre-kickers.", results: ["3x More Site Visits", "₹40L+ Leads/Month", "60% Lower CPL"] },
  { name: "Healthcare", tag: "Patient Acquisition · GMB Ranking", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=900", desc: "We help doctors, clinics, and hospitals attract the right patients through Google Search Ads, GMB optimisation, and Meta campaigns.", results: ["2x Patient Bookings", "Top 3 GMB Rank", "40% Lower CPA"] },
  { name: "Salon & Spa", tag: "Local Marketing · Instagram Ads", image: "https://th.bing.com/th/id/OIP.C4AUyum7smjzaf1tjSEJwwHaE8?w=280&h=187&c=7&r=0&o=7&pid=1.7&rm=3", desc: "We drive walk-ins, bookings, and brand loyalty for salons and spas through local Google Ads, Instagram campaigns, and GMB ranking.", results: ["5x Instagram Reach", "Daily Walk-ins", "₹8L Revenue/Mo"] },
  { name: "Food & Beverage", tag: "Order Growth · Google Maps", image: "data:image/webp;base64,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", desc: "From cloud kitchens to restaurant chains, we grow your orders and footfall with targeted Meta Ads and Google Maps visibility.", results: ["4x Online Orders", "#1 on Google Maps", "35% More Footfall"] },
  { name: "D2C Brands", tag: "ROAS Growth · Full Funnel", image: "https://th.bing.com/th/id/OIP.49pbLMVoIJiP-Rjca1ctiAHaD3?w=278&h=180&c=7&r=0&o=7&pid=1.7&rm=3", desc: "We scale D2C brands profitably with full-funnel Meta & Google strategies — from awareness to conversion and repeat purchase.", results: ["6.2x ROAS Achieved", "₹1Cr+ Monthly Rev", "LTV Optimised"] },
  { name: "E-commerce", tag: "Revenue Scaling · Shopping Ads", image: "https://th.bing.com/th/id/OIP.tNA7ml1W_5V1hdeb1oVtHQHaEK?w=247&h=180&c=7&r=0&o=7&pid=1.7&rm=3", desc: "We turn browsers into buyers with high-converting Shopping Ads, dynamic retargeting, and cart recovery campaigns.", results: ["8x Revenue Growth", "45% Cart Recovery", "₹2Cr+ Managed"] },
];

/* ══════════════════════════════════════════ CSS ══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --g:#005c35; --g2:#007f4c; --g3:#00a862; --g4:#00c975; --g5:#00e888;
    --gold:#c9a84c; --gold2:#f0c95e;
    --dark:#010d08; --dark2:#031a0f; --dark3:#052015;
    --border:rgba(0,180,110,0.16); --text:#e8f5ee; --muted:#7aaa8e; --dim:#3d6e52;
  }
  html { scroll-behavior:smooth; scroll-padding-top:80px; }
  body { font-family:'Poppins',sans-serif; background:var(--dark); color:var(--text); overflow-x:hidden; overscroll-behavior-y:none; }
  body::before { content:''; position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.028;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; }
  ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:var(--dark)} ::-webkit-scrollbar-thumb{background:var(--g2);border-radius:4px}
  .syne{font-family:'Poppins',sans-serif}
  .tg{background:linear-gradient(135deg,var(--g4) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .tg-gold{background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .tg-red{background:linear-gradient(135deg,#e05555,#f0a040);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .tg-amber{background:linear-gradient(135deg,#f0a040,#f5d060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .glow-line{width:60px;height:3px;border-radius:99px;background:linear-gradient(90deg,var(--g3),var(--gold2));box-shadow:0 0 12px var(--g3)}
  .wrap{max-width:1280px;margin:0 auto;padding:0 0px}
  .sec{padding:96px 0} .sec-sm{padding:72px 0}
  .sec-lbl{font-family:'Poppins',sans-serif;font-size:11px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:var(--g3);margin-bottom:14px}
  .sec-title{font-size:clamp(1.85rem,3.6vw,2.9rem);font-weight:500;line-height:1.1;letter-spacing:-0.025em;color:#fff;margin-bottom:18px}

  /* BUTTONS */
  .btn-p{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--g) 0%,var(--g2) 55%,var(--g3) 100%);color:#fff;padding:14px 32px;border-radius:99px;font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;border:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;box-shadow:0 0 30px rgba(0,140,70,0.38),inset 0 1px 0 rgba(255,255,255,0.14);transition:transform .22s,box-shadow .22s}
  .btn-p::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--gold),var(--gold2));opacity:0;transition:opacity .3s}
  .btn-p::after{content:'';position:absolute;top:-50%;left:-60%;width:28%;height:200%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);transform:skewX(-20deg);animation:btnSheen 3.5s ease-in-out infinite}
  @keyframes btnSheen{0%{left:-60%;opacity:0}35%{opacity:1}55%{left:130%;opacity:0}100%{left:130%;opacity:0}}
  .btn-p:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 0 52px rgba(0,180,110,0.6)} .btn-p:hover::before{opacity:.15} .btn-p>*{position:relative;z-index:1}
  .btn-g{display:inline-flex;align-items:center;gap:9px;background:transparent;color:#d1edd8;padding:13px 28px;border-radius:99px;font-family:'Poppins',sans-serif;font-weight:600;font-size:15px;border:1.5px solid rgba(0,180,110,0.3);cursor:pointer;text-decoration:none;transition:border-color .2s,background .2s,transform .2s,color .2s}
  .btn-g:hover{border-color:var(--g3);background:rgba(0,96,57,0.12);transform:translateY(-2px);color:#fff}

  /* HERO */
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding:20px 0 80px;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,140,70,.18),transparent 70%),radial-gradient(ellipse 60% 80% at 80% 80%,rgba(201,168,76,.08),transparent 60%),var(--dark)}
  .hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(0,180,110,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,110,.055) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);animation:gridDrift 24s linear infinite}
  @keyframes gridDrift{from{background-position:0 0}to{background-position:56px 56px}}
  .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:orbFloat 9s ease-in-out infinite}
  .orb1{width:520px;height:520px;background:radial-gradient(circle,rgba(0,140,70,.22),transparent 70%);top:-10%;left:-10%}
  .orb2{width:420px;height:420px;background:radial-gradient(circle,rgba(201,168,76,.14),transparent 70%);bottom:0;right:-5%;animation-delay:3s}
  .orb3{width:300px;height:300px;background:radial-gradient(circle,rgba(0,96,57,.3),transparent 70%);top:40%;left:40%;animation-delay:1.5s}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(26px,-16px) scale(1.04)}66%{transform:translate(-16px,12px) scale(.97)}}
  .aura-ring{position:absolute;border-radius:50%;border:1px solid rgba(0,180,110,.28);pointer-events:none}
  .ring1{width:380px;height:380px;left:-80px;top:120px;animation:ringPulse 4.2s ease-out infinite}
  .ring2{width:580px;height:580px;left:-190px;top:10px;animation:ringPulse 4.2s ease-out 1.4s infinite}
  .ring3{width:780px;height:780px;left:-300px;top:-100px;animation:ringPulse 4.2s ease-out 2.8s infinite}
  @keyframes ringPulse{0%{transform:scale(1);opacity:.35}100%{transform:scale(1.5);opacity:0}}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,96,57,.2);border:1px solid rgba(0,180,110,.3);backdrop-filter:blur(12px);padding:8px 20px;border-radius:99px;font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--g4);margin-bottom:28px;animation:badgeFloat 3s ease-in-out infinite}
  @keyframes badgeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  .hero h1{font-size:clamp(2.1rem,3.2vw,5rem);font-weight:900;line-height:1.04;letter-spacing:-.025em;color:#fff;margin-bottom:0}
  .hero-sub{font-size:clamp(.9rem,1.8vw,1.12rem);color:#a3c4b0;line-height:1.78;max-width:620px;margin:18px 0 18px}
  .trust-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(0,96,57,.15);border:1px solid rgba(0,180,110,.2);backdrop-filter:blur(8px);padding:9px 18px;border-radius:99px;font-size:13px;font-weight:500;color:#d1edd8}

  /* PARTNER ROWS */
  .partner-sec{background:linear-gradient(180deg,var(--dark) 0%,#020f09 100%);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:72px 0;position:relative;overflow:hidden}
  .partner-sec::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,96,57,.06),transparent)}
  .partner-hd{text-align:center;margin-bottom:48px;padding:0 24px}
  .partner-hd-lbl{display:inline-block;font-family:'Poppins',sans-serif;font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:rgba(163,196,176,.5);margin-bottom:12px}
  .partner-hd-title{font-family:'Poppins',sans-serif;font-size:clamp(1.5rem,3vw,2.3rem);font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.2}
  .scroll-wrap{overflow:hidden;position:relative;width:100%;margin-bottom:14px}
  .scroll-wrap:last-of-type{margin-bottom:0}
  .scroll-wrap::before,.scroll-wrap::after{content:'';position:absolute;top:0;bottom:0;width:140px;z-index:2;pointer-events:none}
  .scroll-wrap::before{left:0;background:linear-gradient(90deg,#010d08,transparent)}
  .scroll-wrap::after{right:0;background:linear-gradient(-90deg,#010d08,transparent)}
  .scroll-track{display:flex;gap:14px;width:max-content;will-change:transform;backface-visibility:hidden}
  .scroll-track.go-left{animation:goLeft 36s linear infinite} .scroll-track.go-right{animation:goRight 36s linear infinite}
  @keyframes goLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes goRight{from{transform:translateX(-50%)}to{transform:translateX(0)}}
  .scroll-wrap:hover .scroll-track{animation-play-state:paused}
  .logo-card{position:relative;overflow:hidden;background:#0c1c12;border:1px solid rgba(0,180,110,.13);border-radius:18px;padding:20px 24px 16px;display:flex;flex-direction:column;align-items:center;gap:7px;min-width:148px;flex-shrink:0;text-align:center;cursor:pointer;transition:transform .3s cubic-bezier(.22,.68,0,1.4),border-color .3s,box-shadow .3s,background .3s}
  .logo-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(0,180,110,.12),transparent 65%);opacity:0;transition:opacity .3s}
  .logo-card::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);transform:skewX(-20deg);transition:left .5s}
  .logo-card:hover{border-color:rgba(0,212,125,.42);box-shadow:0 14px 38px rgba(0,96,57,.32);background:#0f2a1a}
  .logo-card:hover::before{opacity:1} .logo-card:hover::after{left:150%}
  .logo-icon{font-size:2.1rem;display:block;transition:transform .3s;line-height:1}
  .logo-card:hover .logo-icon{transform:scale(1.2) translateY(-2px)}
.logo-name {
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    font-size: .78rem;
    color: #12c975;
    white-space: nowrap;
}  .logo-sub{font-size:.64rem;color:rgba(163,196,176,.4);white-space:nowrap}

  /* STATS */
  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
  @media(min-width:768px){.stats-grid{grid-template-columns:repeat(4,1fr)}}
  .stat-card{position:relative;overflow:hidden;background:rgba(0,96,57,.08);border:1px solid var(--border);border-radius:22px;padding:34px 24px;text-align:center;transition:transform .3s,box-shadow .3s,border-color .3s}
  .stat-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(0,180,110,.12),transparent 60%);opacity:0;transition:opacity .3s}
  .stat-card:hover{transform:translateY(-5px) scale(1.02);box-shadow:0 18px 55px rgba(0,96,57,.28);border-color:rgba(0,212,125,.38)}
  .stat-card:hover::before{opacity:1}
  .stat-icon{color:var(--g3);margin-bottom:11px;display:flex;justify-content:center}
  .stat-num{font-family:'Poppins',sans-serif;font-weight:800;font-size:clamp(2.1rem,3.8vw,3rem);line-height:1;display:block;margin-bottom:7px;background:linear-gradient(135deg,var(--g4) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .stat-lbl{font-family:'Poppins',sans-serif;font-size:.82rem;font-weight:600;color:#8ab09a}
/* HERO BASE */

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


  /* ABOUT */
  .about-grid{display:grid;gap:56px;align-items:center}
  @media(min-width:900px){.about-grid{grid-template-columns:1fr 1fr}}
  .about-imgs-inner{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
  .about-img{border-radius:18px;overflow:hidden;border:1px solid var(--border);position:relative}
  .about-img::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,80,40,.45))}
  .about-img img{width:100%;height:196px;object-fit:cover;display:block}
  .about-img:nth-child(2){margin-top:28px} .about-img:nth-child(3){margin-top:-28px}
  .about-glow{position:absolute;inset:-20px;background:radial-gradient(ellipse,rgba(0,140,70,.14),transparent 70%);pointer-events:none;z-index:-1}
  .about-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:26px}
  .about-mini{background:rgba(0,96,57,.1);border:1px solid var(--border);border-radius:18px;padding:20px 18px;transition:border-color .2s,transform .2s}
  .about-mini:hover{border-color:rgba(0,212,125,.3);transform:translateY(-3px)}
  .about-mini-num{font-family:'Poppins',sans-serif;font-weight:800;font-size:1.9rem;background:linear-gradient(135deg,var(--g3),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .about-mini-lbl{font-size:.76rem;color:#8ab09a;margin-top:3px}

  /* SERVICES */
  .services-grid{display:grid;gap:20px}
  @media(min-width:600px){.services-grid{grid-template-columns:repeat(2,1fr)}}
  @media(min-width:900px){.services-grid{grid-template-columns:repeat(3,1fr)}}
  .svc-card{position:relative;overflow:hidden;background:rgba(0,96,57,.06);border:1px solid var(--border);border-radius:24px;padding:32px 24px;transition:transform .35s cubic-bezier(.22,.68,0,1.2),box-shadow .35s,border-color .3s}
  .svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--g3),transparent);opacity:0;transition:opacity .3s}
  .svc-card:hover{transform:translateY(-7px) scale(1.01);border-color:rgba(0,212,125,.32);box-shadow:0 26px 72px rgba(0,96,57,.22)} .svc-card:hover::before{opacity:1}
.svc-icon {
    /* font-size: 2.6rem; */
    margin-bottom: 16px;
    display: block;
    transition: transform .3s;
    height: 60px;
    object-fit: contain;
    border: 4px dashed #198754;
    border-radius: 50%;
    padding: 10px;
}  .svc-card:hover .svc-icon{transform:scale(1.14) rotate(-5deg)}
  .svc-title{font-family:'Poppins',sans-serif;font-size:1.2rem;margin-bottom:9px;color:#fff}
  .svc-desc{color:#8ab09a;font-size:.875rem;line-height:1.65;margin-bottom:16px}
  .svc-feat{list-style:none; padding: 0px;}
  .svc-feat li{display:flex;align-items:center;gap:7px;font-size:.8rem;color:#b0d4be;margin-bottom:6px}
  .svc-feat li::before{content:'';width:5px;height:5px;background:var(--g3);border-radius:50%;flex-shrink:0}

  /* PROBLEMS */
  .prb-grid{display:grid;gap:18px}
  @media(min-width:600px){.prb-grid{grid-template-columns:repeat(2,1fr)}}
  .prb-card{background:rgba(180,30,30,.06);border:1px solid rgba(220,60,60,.14);border-radius:22px;padding:28px 22px;transition:transform .3s,border-color .3s,box-shadow .3s}
  .prb-card:hover{transform:translateY(-4px);border-color:rgba(220,60,60,.32);box-shadow:0 14px 38px rgba(120,20,20,.14)}
  .prb-icon{height: 60px; object-fit: contain; border: 4px dashed #198754; padding: 10px; border-radius: 50%; margin-bottom:13px} .prb-title{font-family:'Poppins',sans-serif;font-size:1rem;margin-bottom:7px;color:#fff} .prb-desc{color:#8a9a93;font-size:.86rem;line-height:1.65}

  /* PROCESS */
  .prc-grid{display:grid;gap:20px}
  @media(min-width:900px){.prc-grid{grid-template-columns:repeat(4,1fr)}}
  .prc-card{position:relative;overflow:hidden;background:rgba(0,96,57,.07);border:1px solid var(--border);border-radius:24px;padding:32px 24px;transition:transform .35s,border-color .3s,box-shadow .3s}
  .prc-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,.38);box-shadow:0 18px 48px rgba(0,96,57,.2)}
  .prc-num{font-family:'Poppins',sans-serif;font-weight:900;font-size:4.2rem;color:rgba(0,180,110,.1);line-height:1;margin-bottom:10px;transition:color .3s}
  .prc-card:hover .prc-num{color:rgba(0,180,110,.2)}
  .prc-icon-wrap{width:64px;height:64px;border-radius:17px;background:linear-gradient(135deg,var(--g),var(--g2));display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:17px;box-shadow:0 0 22px rgba(0,140,70,.32);transition:transform .3s,box-shadow .3s}
  .prc-card:hover .prc-icon-wrap{transform:scale(1.08);box-shadow:0 0 38px rgba(0,180,110,.45)}
  .prc-title{font-family:'Poppins',sans-serif;font-size:1.15rem;margin-bottom:8px;color:#fff} .prc-desc{color:#8ab09a;font-size:.875rem;line-height:1.65}
  .prc-connector{display:none;position:absolute;top:63px;left:100%;width:100%;height:1px;background:linear-gradient(90deg,rgba(0,180,110,.35),transparent)}
  @media(min-width:900px){.prc-connector{display:block}}

  /* ════ INDUSTRIES — PORTFOLIO GRID ════ */
  .ind-section { padding: 96px 0; }
  .ind-header { text-align:center; max-width:600px; margin:0 auto 64px; }

  .ind-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 28px;
    overflow: hidden;
  }
  @media(max-width:900px) { .ind-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:580px) { .ind-grid { grid-template-columns: 1fr; } }

  .ind-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    aspect-ratio: 4/3;
    background: var(--dark2);
  }
  .ind-card:nth-child(3n) { border-right: none; }
  @media(max-width:900px) { .ind-card:nth-child(2n) { border-right: none; } .ind-card:nth-child(3n) { border-right: 1px solid var(--border); } }
  @media(max-width:580px) { .ind-card { border-right: none; } }
  .ind-card:nth-last-child(-n+3) { border-bottom: none; }
  @media(max-width:900px) { .ind-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--border); } .ind-card:nth-last-child(-n+2) { border-bottom: none; } }

  /* BG image */
  .ind-card-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 0.65s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease;
    filter: brightness(0.35) saturate(0.6);
    transform: scale(1.04);
  }
  .ind-card:hover .ind-card-bg {
    transform: scale(1.12);
    filter: brightness(0.22) saturate(0.4);
  }

  /* Overlay gradient */
  .ind-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0,10,5,0.2) 40%,
      rgba(0,10,5,0.85) 100%
    );
    transition: background 0.4s;
    z-index: 1;
  }
  .ind-card:hover .ind-card-overlay {
    background: linear-gradient(
      180deg,
      rgba(0,20,12,0.3) 0%,
      rgba(0,10,5,0.7) 40%,
      rgba(0,5,2,0.95) 100%
    );
  }

  /* Default content (always visible) */
  .ind-card-default {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 24px 22px 22px;
    z-index: 3;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
  }
  .ind-card:hover .ind-card-default {
    transform: translateY(-6px);
    opacity: 0;
    pointer-events: none;
  }

  .ind-card-svg-icon {
    width: 36px; height: 36px;
    color: var(--g4);
    margin-bottom: 10px;
    display: block;
    filter: drop-shadow(0 0 8px rgba(0,200,117,0.5));
    transition: transform 0.35s, filter 0.35s;
  }
  .ind-card:hover .ind-card-svg-icon {
    transform: scale(1.18) translateY(-2px);
    filter: drop-shadow(0 0 16px rgba(0,200,117,0.8));
  }

  .ind-card-name {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    color: #fff;
    margin-bottom: 4px;
  }
  .ind-card-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--g4);
    opacity: 0.75;
  }

  /* Hover reveal content */
  .ind-card-hover {
    position: absolute; inset: 0;
    padding: 24px 22px;
    z-index: 4;
    display: flex; flex-direction: column; justify-content: flex-end;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.4,0,0.2,1);
    pointer-events: none;
  }
  .ind-card:hover .ind-card-hover {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .ind-card-hover-icon-row {
    display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  }
  .ind-card-hover-svg {
    width: 28px; height: 28px; color: var(--g4);
    filter: drop-shadow(0 0 8px rgba(0,200,117,0.6));
  }
  .ind-card-hover-name {
    font-family: 'Poppins', sans-serif; font-weight: 700;
    font-size: clamp(.9rem,1.5vw,1.1rem); color: #fff;
  }

  .ind-card-desc {
    font-size: 0.78rem; color: rgba(180,220,200,0.8);
    line-height: 1.65; margin-bottom: 14px;
  }

  .ind-card-results {
    display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;
  }
  .ind-result-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 9px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--g4);
    background: rgba(0,180,110,0.14);
    border: 1px solid rgba(0,180,110,0.28);
    padding: 4px 10px; border-radius: 99px;
    backdrop-filter: blur(8px);
    transition: background 0.2s, transform 0.2s;
  }
  .ind-result-pill:hover { background: rgba(0,180,110,0.28); transform: scale(1.04); }

  .ind-card-cta {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--g4);
    cursor: pointer; background: none; border: none; padding: 0;
    transition: gap 0.2s, color 0.2s;
  }
  .ind-card-cta:hover { gap: 10px; color: var(--gold2); }

  /* Animated border on hover */
  .ind-card::after {
    content: '';
    position: absolute; inset: 0; z-index: 5;
    border-radius: 0;
    box-shadow: inset 0 0 0 0 transparent;
    transition: box-shadow 0.35s;
    pointer-events: none;
  }
  .ind-card:hover::after {
    box-shadow: inset 0 0 0 1.5px rgba(0,200,117,0.45);
  }

  /* Top accent line per card */
  .ind-card-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 6;
    background: linear-gradient(90deg, var(--g3), var(--gold2));
    box-shadow: 0 0 10px var(--g3);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .ind-card:hover .ind-card-accent { transform: scaleX(1); }

  /* Number badge */
  .ind-card-num {
    position: absolute; top: 16px; right: 18px; z-index: 3;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(3rem,5vw,4.5rem); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.05);
    letter-spacing: -0.04em; user-select: none;
    transition: color 0.4s, transform 0.4s;
  }
  .ind-card:hover .ind-card-num {
    color: rgba(0,180,110,0.08);
    transform: scale(1.08) translate(4px,-4px);
  }

  /* WHY */
  .why-grid{display:grid;gap:20px}
  @media(min-width:600px){.why-grid{grid-template-columns:repeat(2,1fr)}}
  .why-card{background:rgba(0,96,57,.07);border:1px solid var(--border);border-radius:24px;padding:32px 24px;transition:transform .3s,border-color .3s,box-shadow .3s}
  .why-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,.32);box-shadow:0 18px 48px rgba(0,96,57,.2)}
  .why-icon{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,rgba(0,96,57,.3),rgba(0,140,70,.18));border:1px solid rgba(0,180,110,.2);display:flex;align-items:center;justify-content:center;color:var(--g3);margin-bottom:17px}
  .why-title{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.02rem;margin-bottom:7px;color:#fff} .why-desc{color:#8ab09a;font-size:.875rem;line-height:1.65}

  /* CTA */
  .cta-sec{padding:96px 24px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(135deg,#002a1a 0%,#003d24 45%,#002e1e 100%)}
  .cta-sec::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle at 2px 2px,rgba(0,180,110,.1) 1px,transparent 0);background-size:40px 40px}
  .rb-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,180,110,.2),rgba(201,168,76,.12),rgba(0,180,110,.2),transparent)}
  .rv{opacity:0;transform:translateY(32px);transition:opacity .68s ease,transform .68s ease}
  .rv.vis{opacity:1;transform:translateY(0)}
  .d1{transition-delay:.07s} .d2{transition-delay:.14s} .d3{transition-delay:.21s}
  .d4{transition-delay:.28s} .d5{transition-delay:.35s} .d6{transition-delay:.42s}
  #rb-glow{position:fixed;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(0,140,70,.055),transparent 70%);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);will-change:transform}
  @media(max-width:600px){.sec{padding:72px 0}.hero{padding:96px 0 72px}.partner-sec{padding:56px 0}}
  img.logo-icon {
    width: 60px;
    height: 30px;
    object-fit: contain;
}
`;

/* ══════════════════════════════════════════ HOOKS ══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    const el = document.getElementById("rb-glow");
    if (!el) return;
    let rafId;
    const fn = e => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.left = e.clientX + "px";
        el.style.top = e.clientY + "px";
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(rafId); };
  }, []);
}

function CounterCard({ value, suffix, label, icon, decimals = 0, start }) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start || doneRef.current) return;
    const target = parseFloat(value);
    if (isNaN(target)) { setDisplay("0"); return; }
    doneRef.current = true;

    const duration = 1600;
    const startTime = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = easeOut(progress) * target;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target.toFixed(decimals));
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start]);

  return (
    <div className="stat-card rv">
      <div className="stat-icon">{React.cloneElement(icon, { style: { width: 36, height: 36 } })}</div>
      <span className="stat-num">{display}{suffix}</span>
      <span className="stat-lbl">{label}</span>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.22 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ padding: "76px 0", background: "var(--dark2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <CounterCard
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              icon={s.icon}
              decimals={s.decimals}
              start={go}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ SCROLL ROWS ══════════════════════════════════════════ */
function ScrollRow({ items, dir }) {
  const quad = [...items, ...items, ...items, ...items];
  return (
    <div className="scroll-wrap">
      <div className={`scroll-track ${dir === "left" ? "go-left" : "go-right"}`}>
        {quad.map((c, i) => (
          <div key={i} className="logo-card">
            <img src={c.icon} className="logo-icon"/>
            <span className="logo-name">{c.name}</span>
            <span className="logo-sub">{c.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   INDUSTRIES — Portfolio Grid with hover reveal
══════════════════════════════════════════ */
function Industries({ openAudit }) {
  return (
    <div style={{ background: "linear-gradient(180deg,var(--dark3) 0%,var(--dark) 100%)" }}>
      <div className="wrap ind-section">
        {/* Header */}
        <div className="ind-header">
          <p className="sec-lbl rv">Industries We Serve</p>
          <div className="glow-line rv" style={{ margin: "0 auto 20px" }} />
          <h2 className="sec-title rv">Built for <span className="tg">Every Vertical</span></h2>
          <p className="rv d1" style={{ color: "#8ab09a", fontSize: ".9rem", lineHeight: 1.72 }}>
            From real estate to restaurants — we have deep expertise across high-growth industries.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="ind-grid rv d2">
          {industries.map((ind, i) => {
            const SvgIcon = () => industryIcons[ind.name] || null;
            return (
              <div key={i} className="ind-card">
                {/* Animated top accent */}
                <div className="ind-card-accent" />

                {/* Background image */}
                <div
                  className="ind-card-bg"
                  style={{ backgroundImage: `url(${ind.image})` }}
                />

                {/* Overlay */}
                <div className="ind-card-overlay" />

                {/* Number */}
                <div className="ind-card-num">{String(i + 1).padStart(2, "0")}</div>

                {/* Default visible content */}
                <div className="ind-card-default">
                  <span className="ind-card-svg-icon">
                    {industryIcons[ind.name]}
                  </span>
                  <div className="ind-card-name">{ind.name}</div>
                  <div className="ind-card-tag">{ind.tag}</div>
                </div>

                {/* Hover reveal */}
                <div className="ind-card-hover">
                  <div className="ind-card-hover-icon-row">
                    <span className="ind-card-hover-svg">
                      {industryIcons[ind.name]}
                    </span>
                    <span className="ind-card-hover-name">{ind.name}</span>
                  </div>
                  <p className="ind-card-desc">{ind.desc}</p>
                  <div className="ind-card-results">
                    {ind.results.map((r, ri) => (
                      <span key={ri} className="ind-result-pill">{r}</span>
                    ))}
                  </div>
                  <button className="ind-card-cta" onClick={openAudit}>
                    Get Free Audit
                    <ArrowRight style={{ width: 11, height: 11 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ PAGE ══════════════════════════════════════════ */
export default function Home() {
  useReveal();
  useCursor();
  const [auditOpen, setAuditOpen] = useState(false);
  const openAudit = () => setAuditOpen(true);

  return (
    <>
      <style>{CSS}</style>
      <div id="rb-glow" />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════ HERO ════ */}
        <section className="hero">
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
          <div className="hero-grid" />
          {/* <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="aura-ring ring1" /><div className="aura-ring ring2" /><div className="aura-ring ring3" /> */}
          <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
            <div className="hero-badge rv">
              <Sparkles style={{ width: 14, height: 14 }} />
              India's Trusted Performance Marketing Agency
            </div>
            <h1 className="rv d1">
              Performance Marketing<br />
              That Drives{" "}
              <span className="tg">High-ROAS<br />Leads & Sales</span>
            </h1>
            <p className="hero-sub rv d2">
              RoasBadhao helps{" "}
              <strong style={{ color: "var(--g4)" }}>Doctors, D2C brands, Real Estate & service businesses</strong>{" "}
              grow faster with data-driven{" "}
              <strong style={{ color: "var(--g4)" }}>Meta Ads, Google Ads, GMB optimisation, and lead generation.</strong>
            </p>
            <div className="rv d3" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 30 }}>
              {["₹2 Cr+ Ad Spend Managed", "₹7.5 Cr+ Revenue Generated", "ROAS-Focused Campaigns"].map((t, i) => (
                <div key={i} className="trust-pill">
                  <CheckCircle2 style={{ width: 14, height: 14, color: "var(--g3)" }} />{t}
                </div>
              ))}
            </div>
            <div className="rv d4" style={{ display: "flex", flexWrap: "wrap", gap: 13 }}>
              <button className="btn-p" onClick={openAudit}>
                <span>Get a Free Growth Audit</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <a href="tel:+919911689427" className="btn-g">
                <Phone style={{ width: 15, height: 15 }} />
                Talk to a Performance Expert
              </a>
            </div>
          </div>
        </section>

        {/* ════ PARTNER ROWS ════ */}
        <div className="partner-sec">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="partner-hd rv">
              <span className="partner-hd-lbl">Platforms & Industries We Master</span>
              <h2 className="partner-hd-title">Trusted Across <span className="tg">Platforms & Verticals</span></h2>
            </div>
            <ScrollRow items={partnerRow1} dir="left" />
            <div style={{ height: 14 }} />
            <ScrollRow items={partnerRow2} dir="right" />
          </div>
        </div>

        {/* ════ STATS ════ */}
        <StatsSection />

        {/* ════ ABOUT ════ */}
        <div style={{ background: "linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%)" }}>
          <div className="wrap sec">
            <div className="about-grid">
              <div>
                <p className="sec-lbl rv">About RoasBadhao</p>
                <div className="glow-line rv" style={{ marginBottom: 22 }} />
                <h2 className="sec-title rv">Built for Businesses That <span className="tg">Care About Results</span></h2>
                <p className="rv d1" style={{ color: "#8ab09a", lineHeight: 1.78, marginBottom: 14, fontSize: ".92rem" }}>
                  RoasBadhao is a performance marketing agency based in Delhi, built for businesses that care about results, not vanity metrics.
                </p>
                <p className="rv d2" style={{ color: "#8ab09a", lineHeight: 1.78, marginBottom: 26, fontSize: ".92rem" }}>
                  We run ads to generate leads, bookings, and profitable growth. Our focus is on measurable ROI through data-driven strategies and continuous optimisation.
                </p>
                <div className="about-mini-grid rv d3">
                  <div className="about-mini"><div className="about-mini-num">₹2 Cr+</div><p className="about-mini-lbl">Ad Spend Managed</p></div>
                  <div className="about-mini"><div className="about-mini-num" style={{ background: "linear-gradient(135deg,var(--gold),var(--gold2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₹7.5 Cr+</div><p className="about-mini-lbl">Revenue Generated</p></div>
                </div>
              </div>
              <div style={{ position: "relative" }} className="rv d2">
                <div className="about-glow" />
                <div className="about-imgs-inner">
                  {["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800", "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800", "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800"].map((src, i) => (
                    <div key={i} className="about-img"><img src={src} alt="" /></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rb-divider" />

        {/* ════ SERVICES ════ */}
        <div id="services" style={{ background: "linear-gradient(180deg,var(--dark2) 0%,var(--dark3) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 56px" }}>
              <p className="sec-lbl rv">Our Services</p>
              <div className="glow-line rv" style={{ margin: "0 auto 20px" }} />
              <h2 className="sec-title rv">Complete <span className="tg">Marketing Solutions</span></h2>
              <p className="rv d1" style={{ color: "#8ab09a", fontSize: ".9rem", lineHeight: 1.72 }}>From strategy to execution end-to-end performance marketing.</p>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="svc-card rv" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <img src={s.icon} className="svc-icon" alt="icon" />
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <ul className="svc-feat">{s.feat.map((f, j) => <li key={j}>{f}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rb-divider" />

        {/* ════ PROBLEMS ════ */}
        <div style={{ background: "linear-gradient(180deg,var(--dark3) 0%,var(--dark2) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
              <h2 className="sec-title rv">Tired of <span className="tg-red">Low-Quality Leads</span> & <span className="tg-amber">Wasted Ad Budget?</span></h2>
              <p className="rv d1" style={{ color: "#8ab09a", fontSize: ".9rem", lineHeight: 1.72 }}>We solve the most common marketing challenges businesses face.</p>
            </div>
            <div className="prb-grid">
              {problems.map((p, i) => (
                <div key={i} className="prb-card rv" style={{ transitionDelay: `${i * 0.09}s` }}>
                  <img className="prb-icon" src={p.icon} alt="icon" />
                  <h3 className="prb-title">{p.title}</h3>
                  <p className="prb-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rb-divider" />

        {/* ════ PROCESS ════ */}
        <div style={{ background: "linear-gradient(180deg,var(--dark2) 0%,var(--dark3) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 52px" }}>
              <p className="sec-lbl rv">Our Process</p>
              <div className="glow-line rv" style={{ margin: "0 auto 20px" }} />
              <h2 className="sec-title rv">How <span className="tg">RoasBadhao Works</span></h2>
            </div>
            <div className="prc-grid">
              {process.map((step, i) => (
                <div key={i} className="prc-card rv" style={{ transitionDelay: `${i * 0.09}s`, position: "relative" }}>
                  {i < process.length - 1 && <div className="prc-connector" />}
                  <div className="prc-num">{step.num}</div>
                  <div className="prc-icon-wrap">{React.cloneElement(step.icon, { style: { width: 27, height: 27 } })}</div>
                  <h3 className="prc-title">{step.title}</h3>
                  <p className="prc-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rb-divider" />

        {/* ════ INDUSTRIES ════ */}
        <Industries openAudit={openAudit} />

        <ClientShowcase />

        <div className="rb-divider" />

        {/* ════ WHY US ════ */}
        <div style={{ background: "linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%)" }}>
          <div className="wrap sec">
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 52px" }}>
              <p className="sec-lbl rv">Why Us</p>
              <div className="glow-line rv" style={{ margin: "0 auto 20px" }} />
              <h2 className="sec-title rv">Why Choose <span className="tg">RoasBadhao</span></h2>
            </div>
            <div className="why-grid">
              {whyUs.map((w, i) => (
                <div key={i} className="why-card rv" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="why-icon">{React.cloneElement(w.icon, { style: { width: 23, height: 23 } })}</div>
                  <h3 className="why-title">{w.title}</h3>
                  <p className="why-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ CTA ════ */}
        <div id="audit" className="cta-sec">
          <div className="orb orb1" style={{ left: "-15%", top: "-20%", opacity: .25, filter: "blur(100px)" }} />
          <div className="orb orb2" style={{ right: "-15%", bottom: "-20%", opacity: .25, filter: "blur(100px)" }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
            <div className="glow-line rv" style={{ margin: "0 auto 24px" }} />
            <h2 className="sec-title rv" style={{ color: "#fff", textAlign: "center", marginBottom: 14 }}>Ready to Scale<br /><span className="tg-gold">Your Business?</span></h2>
            <p className="rv d1" style={{ color: "rgba(255,255,255,.72)", fontSize: "1rem", textAlign: "center", marginBottom: 42, lineHeight: 1.75 }}>Let's build a performance marketing strategy that actually works for your business.</p>
            <div className="rv d2" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 13 }}>
              <button className="btn-p" style={{ fontSize: "1rem", padding: "15px 38px" }} onClick={openAudit}>
                <span>Get Your Free Growth Audit</span>
                <ArrowRight style={{ width: 17, height: 17 }} />
              </button>
              <a href="tel:+919911689427" className="btn-g" style={{ fontSize: ".95rem", padding: "15px 26px" }}>
                <Phone style={{ width: 16, height: 16 }} />
                Call Us Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}