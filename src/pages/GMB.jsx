import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Shield,
  Sparkles,
  ChevronDown,
  MessageCircle,
  Phone,
  MapPin,
  Star,
  Search,
  Eye,
  Users,
  Clock,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const problems = [
  { icon: "📍", title: "Not Appearing in Google Maps",      description: "Customers search nearby but your business doesn't show up in the local 3-pack" },
  { icon: "⭐", title: "Low Star Rating & Few Reviews",     description: "Poor reviews or no reviews making customers choose competitors over you" },
  { icon: "👻", title: "Incomplete GMB Profile",            description: "Missing photos, hours, services — your profile looks abandoned and untrustworthy" },
  { icon: "📉", title: "Low Calls & Direction Requests",    description: "Profile exists but generates almost zero phone calls or footfall" },
  { icon: "🔍", title: "Wrong Keywords & Categories",       description: "Appearing for irrelevant searches instead of the high-intent ones that convert" },
  { icon: "🗺️", title: "Competitors Outranking You",        description: "Rivals with weaker businesses rank above you simply because they've optimised better" },
];

const services = [
  { icon: <Target className="w-8 h-8" />,   title: "Profile Setup & Optimisation",    description: "Complete GMB profile buildout — categories, service areas, attributes, business description and keyword-rich copy that ranks" },
  { icon: <Star className="w-8 h-8" />,     title: "Review Generation Strategy",      description: "Systems to consistently collect 5-star reviews from happy customers through follow-up templates and WhatsApp flows" },
  { icon: <MapPin className="w-8 h-8" />,   title: "Local SEO & Map Ranking",         description: "Citation building, NAP consistency, geo-targeted keywords and proximity signals to push you into the Google 3-pack" },
  { icon: <Eye className="w-8 h-8" />,      title: "GMB Posts & Content",             description: "Weekly posts, offers, and updates to keep your profile active — Google rewards fresh, engaging content with higher visibility" },
  { icon: <BarChart3 className="w-8 h-8" />,title: "Insights & Performance Tracking", description: "Monthly reports on views, calls, direction requests and search queries so you see exactly how your profile is growing" },
  { icon: <Shield className="w-8 h-8" />,   title: "Competitor Analysis & Strategy",  description: "We analyse what top-ranking competitors are doing and reverse-engineer their strategy to put you ahead of them" },
];

const process = [
  { number: "01", title: "Audit & Research",     description: "Complete audit of your current GMB profile, competitor analysis, keyword research and local ranking opportunities", icon: <Search className="w-6 h-6" /> },
  { number: "02", title: "Profile Optimisation", description: "Full profile buildout — description, categories, photos, Q&A, services, attributes and everything Google looks for", icon: <Target className="w-6 h-6" /> },
  { number: "03", title: "Review & Post System", description: "Review collection system setup + weekly GMB posts with offers, updates and local keywords to keep profile active", icon: <Star className="w-6 h-6" /> },
  { number: "04", title: "Rank & Grow",          description: "Citation building, local link signals and ongoing optimisation to push your listing up in Maps rankings month over month", icon: <TrendingUp className="w-6 h-6" /> },
];

const results = [
  { value: "3x",   label: "More Profile Views",   metric: "Average visibility increase" },
  { value: "60%",  label: "More Phone Calls",      metric: "From GMB listing" },
  { value: "200+", label: "Profiles Optimised",    metric: "Across multiple cities" },
];

const industries = [
  { name: "Doctors & Clinics",  icon: "👨‍⚕️" },
  { name: "Salon & Spa",        icon: "💇" },
  { name: "Real Estate",        icon: "🏢" },
  { name: "Restaurants",        icon: "🍔" },
  { name: "Local Services",     icon: "🔧" },
  { name: "Education",          icon: "🎓" },
];

const rankingFactors = [
  { icon: <MapPin className="w-5 h-5" />,   title: "Proximity",          desc: "How close you are to the searcher" },
  { icon: <Target className="w-5 h-5" />,   title: "Relevance",          desc: "How well your profile matches the search" },
  { icon: <TrendingUp className="w-5 h-5" />,title: "Prominence",         desc: "Reviews, citations, and authority signals" },
  { icon: <Eye className="w-5 h-5" />,      title: "Profile Completeness",desc: "Filled-out, active, and keyword-optimised" },
  { icon: <Star className="w-5 h-5" />,     title: "Review Quality",      desc: "Star rating, quantity & response rate" },
  { icon: <Clock className="w-5 h-5" />,    title: "Fresh Content",       desc: "Regular posts, photos and Q&A updates" },
];

const faqs = [
  { question: "How long does it take to rank on Google Maps?",          answer: "Most businesses start seeing movement in local rankings within 4–8 weeks of full optimisation. Competitive markets may take 3–4 months. Factors like review count, citation strength and competitor activity all play a role." },
  { question: "Do I need a physical address to use GMB?",               answer: "Yes — Google My Business requires a verified physical location. Service-area businesses (like plumbers or consultants) can hide their address but must serve a defined area. We help with the best setup for your business type." },
  { question: "Can you get me fake reviews?",                           answer: "No — and we strongly advise against it. Fake reviews violate Google's policies and can get your listing permanently suspended. Our review generation system helps you collect genuine 5-star reviews from real customers consistently." },
  { question: "What if my GMB listing was suspended?",                  answer: "We have experience handling GMB suspensions and reinstatement requests. We'll audit the reason, clean up any violations, and submit a reinstatement request with the correct documentation." },
  { question: "Is GMB optimisation a one-time thing?",                  answer: "No — GMB is an ongoing channel. Regular posts, fresh photos, review responses and citation building are all needed to maintain and improve rankings. We offer monthly management packages for continued results." },
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
  body { font-family:'DM Sans',sans-serif; background:var(--dark); color:#e8f5ee; overflow-x:hidden; }
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
  .gmb-section { padding:100px 24px; }
  .gmb-inner   { max-width:1280px; margin:0 auto; }

  .section-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--g3); margin-bottom:16px; }
  .section-title { font-family:'Poppins',sans-serif; font-size:clamp(2rem,4vw,3.2rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; color:#fff; margin-bottom:20px; }
  .section-desc  { color:#8ab09a; font-size:0.95rem; line-height:1.75; }

  /* ── HERO ── */
  .gmb-hero {
    position:relative; min-height:100vh;
    display:flex; align-items:center; overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 60%),
      var(--dark);
  }
  .gmb-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,180,110,0.06) 1px, transparent 1px),
      linear-gradient(90deg,rgba(0,180,110,0.06) 1px, transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    animation:gridScroll 20s linear infinite;
  }
  @keyframes gridScroll{from{background-position:0 0;}to{background-position:60px 60px;}}

  .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:orbFloat 8s ease-in-out infinite;}
  .orb1{width:500px;height:500px;background:radial-gradient(circle,rgba(0,140,70,0.25),transparent 70%);top:-10%;left:-10%;}
  .orb2{width:400px;height:400px;background:radial-gradient(circle,rgba(201,168,76,0.15),transparent 70%);bottom:0;right:-5%;animation-delay:3s;}
  .orb3{width:300px;height:300px;background:radial-gradient(circle,rgba(0,96,57,0.3),transparent 70%);top:40%;left:40%;animation-delay:1.5s;}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-20px) scale(1.05);}66%{transform:translate(-20px,15px) scale(0.97);}}

  .aura-ring{position:absolute;border-radius:50%;border:1px solid rgba(0,180,110,0.3);pointer-events:none;}
  .ring1{width:400px;height:400px;left:-100px;top:100px;animation:ringPulse 4s ease-out infinite;}
  .ring2{width:600px;height:600px;left:-200px;top:0;animation:ringPulse 4s ease-out 1.3s infinite;}
  .ring3{width:800px;height:800px;left:-300px;top:-100px;animation:ringPulse 4s ease-out 2.6s infinite;}
  @keyframes ringPulse{0%{transform:scale(1);opacity:0.4;}100%{transform:scale(1.5);opacity:0;}}

  .gmb-hero-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:20px 0px;width:100%;}
  .hero-grid{display:grid;gap:48px;align-items:flex-start;}
  @media(min-width:900px){.hero-grid{grid-template-columns:1fr 1fr;}}

  .gmb-hero h1{
    font-family:'Poppins',sans-serif;
    font-size:clamp(2.8rem,4.5vw,5rem);
    font-weight:900;line-height:1.05;letter-spacing:-0.03em;color:#fff;margin:24px 0;
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
    background:rgba(0,30,15,0.7);border:1px solid rgba(0,180,110,0.22);
    backdrop-filter:blur(24px);border-radius:28px;padding:40px 36px;
    box-shadow:0 32px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(0,180,110,0.08);
  }
  .form-title{font-family:'Poppins',sans-serif;font-weight:800;font-size:1.7rem;margin-bottom:6px;}
  .form-sub{color:#8ab09a;font-size:0.88rem;margin-bottom:28px;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-size:0.8rem;font-weight:600;color:#a3c4b0;margin-bottom:6px;letter-spacing:0.04em;}
  .form-input,.form-select{
    width:100%;background:rgba(0,96,57,0.08);border:1px solid rgba(0,180,110,0.18);
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

  .ind-chip{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:20px;padding:28px 20px;text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.4),border-color 0.3s,box-shadow 0.3s;
  }
  .ind-chip:hover{transform:translateY(-6px) scale(1.06);border-color:rgba(0,212,125,0.4);box-shadow:0 20px 50px rgba(0,96,57,0.3);}
  .ind-chip-icon{font-size:2.8rem;display:block;margin-bottom:12px;transition:transform 0.3s;}
  .ind-chip:hover .ind-chip-icon{transform:scale(1.2);}

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
  .icon-wrap{width:72px;height:72px;border-radius:20px;background:linear-gradient(135deg,var(--g),var(--g2));display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:20px;box-shadow:0 0 24px rgba(0,140,70,0.35);}
  .icon-wrap-sm{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,rgba(0,96,57,0.3),rgba(0,140,70,0.2));border:1px solid rgba(0,180,110,0.2);display:flex;align-items:center;justify-content:center;color:var(--g3);margin-bottom:16px;transition:transform 0.3s;}
  .glass-card:hover .icon-wrap-sm{transform:scale(1.1);}

  /* ── GRIDS ── */
  .grid-2{display:grid;gap:24px;} @media(min-width:900px){.grid-2{grid-template-columns:1fr 1fr;}}
  .grid-3{display:grid;gap:24px;} @media(min-width:600px){.grid-3{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-3{grid-template-columns:repeat(3,1fr);}}
  .grid-4{display:grid;gap:24px;} @media(min-width:600px){.grid-4{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-4{grid-template-columns:repeat(4,1fr);}}
  .grid-6{display:grid;gap:20px;} @media(min-width:600px){.grid-6{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-6{grid-template-columns:repeat(3,1fr);}}

  /* ── GMB MOCK PREVIEW ── */
  .gmb-preview{
    background:rgba(0,20,10,0.65);border:1px solid rgba(0,180,110,0.2);
    border-radius:20px;padding:24px;margin-top:28px;
  }
  .gp-label{font-size:0.72rem;color:var(--g3);font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:16px;}
  .gp-card{
    background:rgba(0,40,20,0.5);border:1px solid rgba(0,180,110,0.15);
    border-radius:14px;padding:16px 18px;
  }
  .gp-biz{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:#fff;margin-bottom:4px;}
  .gp-cat{font-size:0.8rem;color:#8ab09a;margin-bottom:8px;}
  .gp-stars{display:flex;align-items:center;gap:6px;margin-bottom:8px;}
  .gp-star{color:var(--gold2);font-size:0.85rem;}
  .gp-rating{font-size:0.8rem;color:#a3c4b0;font-weight:600;}
  .gp-actions{display:flex;gap:8px;margin-top:12px;}
  .gp-btn{
    flex:1;padding:8px;border-radius:10px;text-align:center;
    font-size:0.75rem;font-weight:700;cursor:pointer;border:none;
  }
  .gp-btn-call{background:rgba(0,180,110,0.2);color:var(--g4);}
  .gp-btn-dir {background:rgba(201,168,76,0.15);color:var(--gold2);}
  .gp-btn-web{background:rgba(255,255,255,0.07);color:#e8f5ee;}
  .gp-pack-label{
    font-size:0.7rem;font-weight:700;letter-spacing:0.1em;color:rgba(163,196,176,0.4);
    text-transform:uppercase;margin-bottom:10px;
  }
  .gp-rank-item{
    display:flex;align-items:center;gap:10px;
    padding:8px 0;border-bottom:1px solid rgba(0,180,110,0.08);
  }
  .gp-rank-item:last-child{border-bottom:none;}
  .gp-rank-num{
    width:22px;height:22px;border-radius:50%;
    background:rgba(0,96,57,0.4);border:1px solid rgba(0,180,110,0.3);
    display:flex;align-items:center;justify-content:center;
    font-size:0.7rem;font-weight:800;color:var(--g3);flex-shrink:0;
  }
  .gp-rank-you{background:rgba(0,180,110,0.25);border-color:var(--g3);}
  .gp-rank-name{font-size:0.82rem;font-weight:600;color:#e8f5ee;}
  .gp-rank-stars{font-size:0.72rem;color:#8ab09a;margin-left:auto;}

  /* ── RANKING FACTORS ── */
  .factor-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:20px;padding:24px;
    display:flex;align-items:flex-start;gap:14px;
    transition:transform 0.3s,border-color 0.3s;
  }
  .factor-card:hover{transform:translateY(-4px);border-color:rgba(0,212,125,0.35);}
  .factor-icon{
    width:44px;height:44px;flex-shrink:0;border-radius:12px;
    background:linear-gradient(135deg,rgba(0,96,57,0.3),rgba(0,140,70,0.2));
    border:1px solid rgba(0,180,110,0.2);
    display:flex;align-items:center;justify-content:center;color:var(--g3);
  }

  /* ── OFFER BLOCK ── */
  .offer-block{background:rgba(0,96,57,0.08);border:1px solid rgba(0,180,110,0.2);border-radius:28px;padding:64px 48px;text-align:center;}
  .offer-pill-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:32px;}
  .offer-pill{background:rgba(0,96,57,0.12);border:1px solid rgba(0,180,110,0.2);border-radius:99px;padding:10px 24px;display:flex;align-items:center;gap:8px;font-size:0.88rem;font-weight:600;color:#b0d4be;}

  /* ── FOUNDER ── */
  .founder-block{background:rgba(0,96,57,0.08);border:1px solid var(--border);border-radius:28px;padding:64px 48px;text-align:center;}
  .founder-avatar{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,var(--g),var(--g2));display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:900;font-size:2rem;color:#fff;margin:0 auto 24px;box-shadow:0 0 40px rgba(0,140,70,0.45);border:3px solid rgba(0,180,110,0.3);}

  /* ── FAQ ── */
  .faq-item{background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-bottom:12px;transition:border-color 0.3s;}
  .faq-item.open{border-color:rgba(0,212,125,0.35);}
  .faq-btn{width:100%;padding:22px 28px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;text-align:left;transition:background 0.2s;}
  .faq-btn:hover{background:rgba(0,96,57,0.08);}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:#fff;padding-right:16px;}
  .faq-chevron{color:var(--g3);flex-shrink:0;transition:transform 0.3s;}
  .faq-chevron.open{transform:rotate(180deg);}
  .faq-answer{padding:0 28px 22px;color:#8ab09a;font-size:0.92rem;line-height:1.7;}

  /* ── CTA ── */
  .cta-section{padding:100px 24px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%);}
  .cta-section::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 2px 2px,rgba(0,180,110,0.12) 1px,transparent 0);background-size:40px 40px;}

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

  /* ── STAR ANIMATION ── */
  @keyframes starPop{0%{transform:scale(0.5);opacity:0;}70%{transform:scale(1.2);}100%{transform:scale(1);opacity:1;}}
  .star-pop{animation:starPop 0.4s ease forwards;}
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

/* ─────────────────────── GMB MOCK PREVIEW ─────────────────────── */
function GmbPreview() {
  return (
    <div className="gmb-preview">
      <p className="gp-label">📍 How You'll Appear on Google Maps</p>

      {/* 3-pack mockup */}
      <p className="gp-pack-label">Google Local 3-Pack — Top Results</p>
      {[
        { name: "Your Business (After Optimisation)", cat: "Healthcare · Open Now", stars: 5, count: "148 reviews", you: true },
        { name: "Competitor A",                        cat: "Healthcare",           stars: 4, count: "32 reviews",  you: false },
        { name: "Competitor B",                        cat: "Healthcare",           stars: 3, count: "11 reviews",  you: false },
      ].map((item, i) => (
        <div key={i} className="gp-rank-item">
          <div className={`gp-rank-num ${item.you ? "gp-rank-you" : ""}`}>{i + 1}</div>
          <div style={{ flex: 1 }}>
            <p className="gp-rank-name" style={{ color: item.you ? "var(--g4)" : "#e8f5ee" }}>{item.name}</p>
            <p style={{ fontSize: "0.72rem", color: "#8ab09a" }}>{item.cat}</p>
          </div>
          <div className="gp-rank-stars">
            {"★".repeat(item.stars)}{"☆".repeat(5 - item.stars)} {item.count}
          </div>
        </div>
      ))}

      {/* GMB card */}
      <div className="gp-card" style={{ marginTop: 16 }}>
        <p className="gp-biz">Your Business Name</p>
        <p className="gp-cat">Healthcare · Clinic · Open · Delhi</p>
        <div className="gp-stars">
          {[1,2,3,4,5].map(i => <span key={i} className="gp-star">★</span>)}
          <span className="gp-rating">4.9 (148 reviews)</span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "#8ab09a", marginBottom: 4 }}>📍 Connaught Place, New Delhi</p>
        <p style={{ fontSize: "0.78rem", color: "var(--g4)", fontWeight: 600 }}>✓ Verified · Profile Score: 98%</p>
        <div className="gp-actions">
          <button className="gp-btn gp-btn-call">📞 Call</button>
          <button className="gp-btn gp-btn-dir">🗺️ Directions</button>
          <button className="gp-btn gp-btn-web">🌐 Website</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── LEAD FORM ─────────────────────── */
function LeadForm({ compact = false }) {
  const [formData, setFormData] = useState({ name:"", businessType:"", city:"", gmb:"", goal:"", phone:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:16 }}>🎉</div>
      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#fff", marginBottom:12 }}>Request Received!</h3>
      <p style={{ color:"#8ab09a", fontSize:"0.95rem" }}>We'll contact you within 24 hours to begin your GMB audit.</p>
    </div>
  );

  return (
    <>
      <h3 className="form-title text-grad" style={{ fontSize: compact ? "1.4rem" : "1.7rem" }}>
        {compact ? "Get Your Free GMB Audit" : "Get Your Free Audit"}
      </h3>
      <p className="form-sub">
        {compact ? "We'll review your profile and show you exactly what to fix" : "Fill the form and we'll audit your Google Business Profile"}
      </p>
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
              <option value="healthcare">Healthcare / Doctors</option>
              <option value="salon">Salon & Spa</option>
              <option value="restaurant">Restaurant / Café</option>
              <option value="real-estate">Real Estate</option>
              <option value="education">Education</option>
              <option value="local-service">Local Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">City *</label>
            <input className="form-input" type="text" name="city" placeholder="Your city" required value={formData.city} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">GMB Listing Status</label>
          <select className="form-select" name="gmb" value={formData.gmb} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="none">No GMB listing yet</option>
            <option value="unoptimised">Listed but not optimised</option>
            <option value="suspended">Listing was suspended</option>
            <option value="running">Running but low visibility</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Your Goal *</label>
          <select className="form-select" name="goal" required value={formData.goal} onChange={handleChange}>
            <option value="">Select goal</option>
            <option value="calls">More Phone Calls</option>
            <option value="footfall">More Walk-ins / Footfall</option>
            <option value="rank">Rank in Google 3-Pack</option>
            <option value="reviews">More Reviews</option>
            <option value="all">All of the Above</option>
          </select>
        </div>
        <button type="submit" className="btn-form-submit">Get My Free GMB Audit →</button>
        <p className="form-privacy">🔒 Your details are safe. No spam, guaranteed.</p>
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
            <ChevronDown className={`faq-chevron ${open === i ? "open" : ""}`} style={{ width:22, height:22 }} />
          </button>
          {open === i && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── MAIN ─────────────────────── */
export default function GmbPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow" className="cursor-glow" />
      <div style={{ position:"relative", zIndex:1 }}>

        {/* ════════════════ HERO ════════════════ */}
        <section className="gmb-hero">
          <div className="gmb-hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="aura-ring ring1" /><div className="aura-ring ring2" /><div className="aura-ring ring3" />

          <div className="gmb-hero-inner">
            <div className="hero-grid">
              {/* Left */}
              <div>
                <div className="badge reveal">
                  <MapPin style={{ width:16, height:16 }} />
                  Google My Business Experts — Delhi
                </div>

                <h1 className="reveal reveal-delay-1">
                  Rank #1 on<br />
                  <span className="text-grad">Google Maps</span><br />
                  & Get More Calls,<br />Walk-ins & Reviews
                </h1>

                <p className="hero-sub reveal reveal-delay-2">
                  We help{" "}
                  <strong style={{ color:"var(--g4)" }}>Doctors, Salons, Restaurants & local businesses</strong>{" "}
                  dominate the Google Local 3-Pack — so when customers search nearby, they find <strong style={{ color:"var(--g4)" }}>you first</strong>.
                </p>

                <div className="trust-row reveal reveal-delay-2">
                  {[
                    { num:"200+", label:"Profiles Optimised" },
                    { num:"3x",   label:"Avg. Visibility Boost" },
                    { num:"60%",  label:"More Calls on Avg." },
                  ].map((t, i) => (
                    <div key={i} className="trust-pill-stat">
                      <span className="trust-pill-num">{t.num}</span>
                      <span className="trust-pill-label">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="reveal reveal-delay-3" style={{ display:"flex", flexWrap:"wrap", gap:14 }}>
                  <a href="#audit-form" className="btn-primary">
                    <span>Get Free GMB Audit</span>
                    <ArrowRight style={{ width:18, height:18 }} />
                  </a>
                  <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle style={{ width:18, height:18 }} />
                    WhatsApp Us
                  </a>
                </div>

                {/* GMB Preview Widget */}
                <div className="reveal reveal-delay-4">
                  <GmbPreview />
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
        <section className="gmb-section" style={{ background:"var(--dark2)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:700, margin:"0 auto 60px" }}>
              <h2 className="section-title reveal">
                Why Isn't Your Business<br />
                <span className="text-grad-red">Showing Up on Google Maps?</span>
              </h2>
              <p className="section-desc reveal">These are the most common GMB problems we fix every day</p>
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

        {/* ════════════════ SERVICES ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 64px" }}>
              <p className="section-label reveal">What We Do</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Complete <span className="text-grad">GMB Management</span></h2>
              <p className="section-desc reveal">Everything your Google Business Profile needs to rank, attract, and convert</p>
            </div>
            <div className="grid-3 stagger">
              {services.map((s, i) => (
                <div key={i} className="glass-card reveal" style={{ padding:"36px 28px" }}>
                  <div className="icon-wrap-sm">{s.icon}</div>
                  <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:10 }}>{s.title}</h3>
                  <p style={{ color:"#8ab09a", fontSize:"0.88rem", lineHeight:1.65 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ RANKING FACTORS ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark2)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:680, margin:"0 auto 64px" }}>
              <p className="section-label reveal">How Google Ranks Local Businesses</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">The 6 Factors That <span className="text-grad">Decide Your Rank</span></h2>
              <p className="section-desc reveal">We optimise every single one of these signals for maximum local visibility</p>
            </div>
            <div className="grid-6 stagger">
              {rankingFactors.map((f, i) => (
                <div key={i} className="factor-card reveal">
                  <div className="factor-icon">{f.icon}</div>
                  <div>
                    <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"0.92rem", color:"#fff", marginBottom:4 }}>{f.title}</h3>
                    <p style={{ color:"#8ab09a", fontSize:"0.8rem", lineHeight:1.5 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ RESULTS ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Real Results</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">What Our <span className="text-grad">Clients See</span></h2>
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

        {/* ════════════════ INDUSTRIES ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark2)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Who We Serve</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Industries <span className="text-grad">We Work With</span></h2>
            </div>
            <div className="grid-6 stagger">
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
        <section className="gmb-section" style={{ background:"var(--dark)" }}>
          <div className="gmb-inner">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">How We Work</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">4-Step GMB Process</span></h2>
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

        {/* ════════════════ OFFER ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark2)" }}>
          <div className="gmb-inner">
            <div className="offer-block reveal">
              <div className="icon-wrap" style={{ margin:"0 auto 24px" }}>
                <Sparkles style={{ width:32, height:32 }} />
              </div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Get a Free <span className="text-grad">GMB Profile Audit</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", maxWidth:600, margin:"0 auto", lineHeight:1.7 }}>
                We'll audit your Google Business Profile and show you exactly why you're not ranking — and what we'll do to fix it
              </p>
              <div className="offer-pill-row">
                {["Profile Score Review", "Ranking Analysis", "Competitor Comparison", "Growth Roadmap"].map((pill, i) => (
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
        <section id="audit-form" className="gmb-section" style={{ background:"var(--dark)" }}>
          <div className="gmb-inner" style={{ maxWidth:860 }}>
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
              <p className="section-label reveal">Free Audit</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Claim Your <span className="text-grad">Free GMB Audit</span></h2>
            </div>
            <div className="form-card reveal">
              <LeadForm compact={true} />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FOUNDER ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark2)" }}>
          <div className="gmb-inner">
            <div className="founder-block reveal">
              <div className="founder-avatar">RS</div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Founded by <span className="text-grad">Raushan Saxena</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", lineHeight:1.75, maxWidth:680, margin:"0 auto" }}>
                Hands-on local SEO and GMB management built from real results across Delhi and pan-India clients. Raushan's approach focuses on the signals that actually move rankings — reviews, profile completeness, citations and consistent content — not shortcuts that get your listing suspended.
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ════════════════ FAQ ════════════════ */}
        <section className="gmb-section" style={{ background:"var(--dark)" }}>
          <div className="gmb-inner">
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
              Your Customers Are Searching.<br />
              <span className="text-grad-gold">Make Sure They Find You First.</span>
            </h2>
            <p className="reveal" style={{ color:"rgba(255,255,255,0.75)", fontSize:"1.05rem", textAlign:"center", marginBottom:48, lineHeight:1.7 }}>
              Let's rank your business at the top of Google Maps and turn local searches into real customers
            </p>
            <div className="reveal" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:16 }}>
              <a href="#audit-form" className="btn-primary" style={{ fontSize:"1.05rem", padding:"16px 40px" }}>
                <span>Get Free GMB Audit</span>
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