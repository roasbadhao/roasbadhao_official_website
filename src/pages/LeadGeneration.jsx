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
  Mail,
  PhoneCall,
  UserPlus,
  Database,
  Filter,
  Clock,
  Award,
  Star,
  Calendar,
  DollarSign,
  ThumbsUp,
  Link2,
  Download,
  Upload,
  Share2,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const problems = [
  { icon: "📉", title: "Low Quality Leads", description: "Getting inquiries but they never convert to customers — wasting your sales team's time" },
  { icon: "💰", title: "High Cost Per Lead", description: "Paying too much for leads that don't justify the investment" },
  { icon: "🎯", title: "Wrong Targeting", description: "Your ads are showing to people who will never buy from you" },
  { icon: "📊", title: "No Tracking Setup", description: "Running campaigns blindly without knowing what's actually working" },
  { icon: "⏱️", title: "Slow Lead Response", description: "Taking hours to respond to leads — by then they've already chosen a competitor" },
  { icon: "🔄", title: "Inconsistent Flow", description: "Some days 10 leads, some days zero — unpredictable business growth" },
];

const leadSources = [
  { icon: <Facebook className="w-7 h-7" />, title: "Facebook & Instagram", description: "Targeted lead generation campaigns that fill your pipeline with interested prospects" },
  { icon: <Search className="w-7 h-7" />, title: "Google Ads", description: "Capture high-intent buyers actively searching for your services" },
  { icon: <Linkedin className="w-7 h-7" />, title: "LinkedIn", description: "B2B lead generation — connect with decision-makers and professionals" },
  { icon: <Mail className="w-7 h-7" />, title: "Email Marketing", description: "Nurture leads with automated sequences that convert cold traffic into customers" },
];

const solutions = [
  { icon: <Target className="w-8 h-8" />, title: "Multi-Channel Strategy", description: "We don't rely on one source. Google, Meta, LinkedIn — we find where YOUR customers are" },
  { icon: <Filter className="w-8 h-8" />, title: "Lead Qualification", description: "Not all leads are equal. We filter out tire-kickers so you only talk to serious buyers" },
  { icon: <Database className="w-8 h-8" />, title: "CRM Integration", description: "Leads automatically go to your CRM — no manual work, no delays, no missed opportunities" },
  { icon: <Clock className="w-8 h-8" />, title: "Instant Lead Alerts", description: "Get notified via WhatsApp/call within 60 seconds of lead generation — strike while the iron is hot" },
];

const industries = [
  { name: "Real Estate", icon: "🏢" },
  { name: "Healthcare", icon: "👨‍⚕️" },
  { name: "Education", icon: "🎓" },
  { name: "Financial Services", icon: "💰" },
  { name: "Home Services", icon: "🔧" },
  { name: "B2B Software", icon: "💻" },
  { name: "Legal", icon: "⚖️" },
  { name: "Automotive", icon: "🚗" },
];

const process = [
  { number: "01", title: "Audit & Strategy", description: "We analyse your current lead generation, identify gaps, and create a custom acquisition plan", icon: <Target className="w-6 h-6" /> },
  { number: "02", title: "Campaign Setup", description: "Multi-channel campaign launch with proper tracking, pixel setup, and conversion APIs", icon: <Zap className="w-6 h-6" /> },
  { number: "03", title: "Lead Generation", description: "Daily monitoring, optimisation, and scaling — we bring consistent leads to your pipeline", icon: <UserPlus className="w-6 h-6" /> },
  { number: "04", title: "Nurture & Convert", description: "Automated follow-up sequences that turn cold leads into paying customers", icon: <TrendingUp className="w-6 h-6" /> },
];

const results = [
  { value: "60%", label: "Lower Cost Per Lead", metric: "Average reduction in CPL" },
  { value: "3x", label: "More Qualified Leads", metric: "Compared to DIY campaigns" },
  { value: "10M+", label: "Leads Generated", metric: "Across all industries" },
];

const leadMagnet = [
  { text: "Facebook/Instagram Lead Ads" },
  { text: "Google Search Campaigns" },
  { text: "LinkedIn Outreach" },
  { text: "Email Sequences" },
  { text: "WhatsApp Automation" },
  { text: "CRM Integration" },
];

const faqs = [
  { question: "What's the difference between leads and qualified leads?", answer: "Any inquiry is a lead. A qualified lead fits your ideal customer profile — right budget, right need, ready to buy. We focus on delivering qualified leads, not just filling your inbox." },
  { question: "Which platform works best for lead generation?", answer: "It depends on your business. B2B works well on LinkedIn, local services on Google, D2C on Instagram. We test multiple channels and double down on what works for YOU." },
  { question: "How many leads can you guarantee?", answer: "We don't guarantee exact numbers because every business and budget is different. But we guarantee consistent optimisation to get you the lowest possible cost per lead." },
  { question: "Do you handle the follow-up as well?", answer: "Yes — we can set up automated email/SMS/WhatsApp sequences to nurture leads. If you want us to handle calls, we offer a done-for-you appointment setting service." },
  { question: "How soon will I start getting leads?", answer: "Most campaigns start generating leads within 3-5 days of launch. We optimise continuously to improve quality and volume." },
  { question: "What budget do I need to start?", answer: "For Meta/Google, we recommend ₹30,000+ monthly ad spend. For LinkedIn/B2B, slightly higher. Our management fee is separate." },
];

const testimonials = [
  { name: "Vikram Reddy", role: "Director, VBR Constructions", text: "We went from 2-3 inquiries a week to 8-10 qualified buyer calls daily. Our sales team is actually busy now!", rating: 5 },
  { name: "Neha Gupta", role: "Founder, NutriD2C", text: "The leads we get are actually interested in buying. Cost per lead dropped by 40% in the first month itself.", rating: 5 },
  { name: "Rajesh Khanna", role: "Partner, Khanna & Associates", text: "Finally a team that understands B2B lead generation. Our pipeline is full of qualified prospects.", rating: 5 },
];

/* ─────────────────────── STYLES ─────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

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
  body { font-family: 'Inter', sans-serif; background: var(--dark); color: #e8f5ee; overflow-x: hidden; }
  body::before {
    content:''; position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px;
  }
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:var(--dark);} ::-webkit-scrollbar-thumb{background:var(--g2);border-radius:4px;}

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

  .section { padding:100px 24px; }
  .container { max-width:1280px; margin:0 auto; }

  .section-label { font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--g3); margin-bottom:16px; }
  .section-title { font-size:clamp(2rem,4vw,3.2rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; color:#fff; margin-bottom:20px; }
  .section-desc  { color:#8ab09a; font-size:0.95rem; line-height:1.75; }

  /* Hero */
  .hero {
    position:relative; min-height:100vh;
    display:flex; align-items:center; overflow:hidden;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.08) 0%, transparent 60%),
      var(--dark);
  }
  .hero-grid {
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

  .hero-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;padding:20px 0px;width:100%;}
  .hero-grid-layout{display:grid;gap:48px;align-items:flex-start;}
  @media(min-width:900px){.hero-grid-layout{grid-template-columns:1fr 1fr;}}

  .hero h1{
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
    font-weight:800;font-size:1.4rem;
    background:linear-gradient(135deg,var(--g4),var(--gold2));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;
  }
  .trust-pill-label{font-size:0.72rem;color:#8ab09a;}

  .btn-primary{
    display:inline-flex;align-items:center;gap:10px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff;padding:16px 36px;border-radius:99px;
    font-weight:700;font-size:1rem;
    border:none;cursor:pointer;text-decoration:none;
    box-shadow:0 0 30px rgba(0,140,70,0.4);
    transition:transform 0.2s,box-shadow 0.2s;
  }
  .btn-primary:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 0 50px rgba(0,180,110,0.6);}

  .btn-whatsapp{
    display:inline-flex;align-items:center;gap:10px;
    background:rgba(37,211,102,0.12);border:1.5px solid rgba(37,211,102,0.35);
    color:#25d366;padding:16px 36px;border-radius:99px;
    font-weight:700;font-size:1rem;
    cursor:pointer;text-decoration:none;
    transition:background 0.2s,border-color 0.2s,transform 0.2s;
  }
  .btn-whatsapp:hover{background:rgba(37,211,102,0.2);border-color:rgba(37,211,102,0.6);transform:translateY(-2px);}

  .form-card{
    background:rgba(0,30,15,0.7);
    border:1px solid rgba(0,180,110,0.22);
    backdrop-filter:blur(24px);
    border-radius:28px;padding:40px 36px;
    box-shadow:0 32px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(0,180,110,0.08);
  }
  .form-title{font-weight:800;font-size:1.7rem;margin-bottom:6px;}
  .form-sub{color:#8ab09a;font-size:0.88rem;margin-bottom:28px;}
  .form-group{margin-bottom:16px;}
  .form-label{display:block;font-size:0.8rem;font-weight:600;color:#a3c4b0;margin-bottom:6px;letter-spacing:0.04em;}
  .form-input,.form-select{
    width:100%;background:rgba(0,96,57,0.08);
    border:1px solid rgba(0,180,110,0.18);
    border-radius:14px;padding:13px 16px;
    color:#e8f5ee;font-size:0.92rem;
    outline:none;transition:border-color 0.2s,box-shadow 0.2s;appearance:none;
  }
  .form-input:focus,.form-select:focus{border-color:var(--g3);box-shadow:0 0 0 3px rgba(0,180,110,0.12);}
  .form-select option{background:#031a0f;color:#e8f5ee;}
  .form-row{display:grid;gap:16px;}
  @media(min-width:500px){.form-row{grid-template-columns:1fr 1fr;}}
  .btn-form-submit{
    width:100%;margin-top:8px;
    background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);
    color:#fff;padding:16px;border-radius:14px;
    font-weight:800;font-size:1.05rem;
    border:none;cursor:pointer;
    box-shadow:0 0 30px rgba(0,140,70,0.4);
    transition:transform 0.2s,box-shadow 0.2s;
  }
  .btn-form-submit:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 0 50px rgba(0,180,110,0.5);}
  .form-privacy{font-size:0.75rem;color:rgba(163,196,176,0.5);text-align:center;margin-top:12px;}

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

  .service-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:24px;padding:28px 24px;
    display:flex;align-items:flex-start;gap:18px;
    transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;
  }
  .service-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,0.4);box-shadow:0 16px 40px rgba(0,96,57,0.25);}
  .service-icon{
    width:56px;height:56px;flex-shrink:0;border-radius:16px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;box-shadow:0 0 20px rgba(0,140,70,0.35);
    transition:transform 0.3s;
  }
  .service-card:hover .service-icon{transform:scale(1.1) rotate(-4deg);}

  .result-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:28px;padding:48px 28px;text-align:center;
    transition:transform 0.35s cubic-bezier(.22,.68,0,1.2),border-color 0.3s,box-shadow 0.3s;
  }
  .result-card:hover{transform:translateY(-8px) scale(1.03);border-color:rgba(0,212,125,0.4);box-shadow:0 24px 60px rgba(0,96,57,0.3);}
  .result-val{
    font-weight:900;
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
  .proc-num{font-weight:900;font-size:5rem;color:rgba(0,180,110,0.1);line-height:1;margin-bottom:12px;transition:color 0.3s;}
  .proc-card:hover .proc-num{color:rgba(0,180,110,0.2);}

  .icon-wrap{
    width:72px;height:72px;border-radius:20px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;margin-bottom:20px;
    box-shadow:0 0 24px rgba(0,140,70,0.35);
  }

  .grid-2{display:grid;gap:24px;} @media(min-width:900px){.grid-2{grid-template-columns:repeat(2,1fr);}}
  .grid-3{display:grid;gap:24px;} @media(min-width:600px){.grid-3{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-3{grid-template-columns:repeat(3,1fr);}}
  .grid-4{display:grid;gap:24px;} @media(min-width:600px){.grid-4{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-4{grid-template-columns:repeat(4,1fr);}}
  .grid-5{display:grid;gap:20px;} @media(min-width:600px){.grid-5{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-5{grid-template-columns:repeat(3,1fr);}} @media(min-width:1100px){.grid-5{grid-template-columns:repeat(4,1fr);}}
  .grid-6{display:grid;gap:20px;} @media(min-width:600px){.grid-6{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-6{grid-template-columns:repeat(3,1fr);}} @media(min-width:1100px){.grid-6{grid-template-columns:repeat(6,1fr);}}
  .grid-8{display:grid;gap:20px;} @media(min-width:600px){.grid-8{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-8{grid-template-columns:repeat(4,1fr);}} @media(min-width:1100px){.grid-8{grid-template-columns:repeat(6,1fr);}}

  .leadmagnet-block{
    background:rgba(0,96,57,0.08);border:1px solid rgba(0,180,110,0.2);
    border-radius:28px;padding:64px 48px;text-align:center;
  }
  .leadmagnet-pill{
    background:rgba(0,96,57,0.12);border:1px solid rgba(0,180,110,0.2);
    border-radius:99px;padding:10px 24px;
    display:inline-flex;align-items:center;gap:8px;
    font-size:0.88rem;font-weight:600;color:#b0d4be;
  }

  .testimonial-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:28px;padding:32px 28px;
    transition:transform 0.3s,border-color 0.3s;
  }
  .testimonial-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,0.3);}
  .stars{display:flex;gap:4px;margin-bottom:16px;color:var(--gold2);}

  .founder-block{background:rgba(0,96,57,0.08);border:1px solid var(--border);border-radius:28px;padding:64px 48px;text-align:center;}
  .founder-avatar{
    width:96px;height:96px;border-radius:50%;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    font-weight:900;font-size:2rem;color:#fff;
    margin:0 auto 24px;
    box-shadow:0 0 40px rgba(0,140,70,0.45);
    border:3px solid rgba(0,180,110,0.3);
  }

  .faq-item{background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-bottom:12px;transition:border-color 0.3s;}
  .faq-item.open{border-color:rgba(0,212,125,0.35);}
  .faq-btn{width:100%;padding:22px 28px;display:flex;justify-content:space-between;align-items:center;background:none;border:none;cursor:pointer;text-align:left;transition:background 0.2s;}
  .faq-btn:hover{background:rgba(0,96,57,0.08);}
  .faq-q{font-weight:700;font-size:1rem;color:#fff;padding-right:16px;}
  .faq-chevron{color:var(--g3);flex-shrink:0;transition:transform 0.3s;}
  .faq-chevron.open{transform:rotate(180deg);}
  .faq-answer{padding:0 28px 22px;color:#8ab09a;font-size:0.92rem;line-height:1.7;}

  .cta-section{
    padding:100px 24px;text-align:center;position:relative;overflow:hidden;
    background:linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%);
  }
  .cta-section::before{
    content:'';position:absolute;inset:0;
    background-image:radial-gradient(circle at 2px 2px,rgba(0,180,110,0.12) 1px,transparent 0);
    background-size:40px 40px;
  }

  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,180,110,0.2),rgba(201,168,76,0.15),rgba(0,180,110,0.2),transparent);}

  .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .reveal-delay-1{transition-delay:0.1s;} .reveal-delay-2{transition-delay:0.2s;}
  .reveal-delay-3{transition-delay:0.3s;} .reveal-delay-4{transition-delay:0.4s;}
  .stagger>*:nth-child(1){transition-delay:0.05s;} .stagger>*:nth-child(2){transition-delay:0.15s;}
  .stagger>*:nth-child(3){transition-delay:0.25s;} .stagger>*:nth-child(4){transition-delay:0.35s;}
  .stagger>*:nth-child(5){transition-delay:0.45s;} .stagger>*:nth-child(6){transition-delay:0.55s;}

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

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:16 }}>🎉</div>
      <h3 style={{ fontWeight:800, fontSize:"1.5rem", color:"#fff", marginBottom:12 }}>Request Received!</h3>
      <p style={{ color:"#8ab09a", fontSize:"0.95rem" }}>We'll contact you within 24 hours to discuss your lead generation strategy.</p>
    </div>
  );

  return (
    <>
      <h3 className="form-title text-grad" style={{ fontSize: compact ? "1.4rem" : "1.7rem" }}>
        {compact ? "Get Your Free Lead Audit" : "Fill the Form"}
      </h3>
      <p className="form-sub">{compact ? "We'll analyse your current lead generation" : "Get a free audit of your current lead generation strategy"}</p>

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
              <option value="healthcare">Healthcare</option>
              <option value="d2c">D2C / E-commerce</option>
              <option value="education">Education</option>
              <option value="b2b">B2B / SaaS</option>
              <option value="local">Local Business</option>
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
            <label className="form-label">Monthly Budget *</label>
            <select className="form-select" name="budget" required value={formData.budget} onChange={handleChange}>
              <option value="">Select budget</option>
              <option value="20-50k">₹20,000 – ₹50,000</option>
              <option value="50-100k">₹50,000 – ₹1,00,000</option>
              <option value="100-200k">₹1,00,000 – ₹2,00,000</option>
              <option value="200k+">₹2,00,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Lead Goal *</label>
            <select className="form-select" name="goal" required value={formData.goal} onChange={handleChange}>
              <option value="">Select goal</option>
              <option value="calls">Phone Calls</option>
              <option value="forms">Form Submissions</option>
              <option value="whatsapp">WhatsApp Inquiries</option>
              <option value="qualified">Qualified Meetings</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-form-submit">Get Free Lead Generation Audit →</button>
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
export default function LeadGenerationPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow" className="cursor-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />

          <div className="hero-inner">
            <div className="hero-grid-layout">
              <div>
                <div className="badge reveal">
                  <UserPlus style={{ width: 16, height: 16 }} />
                  Lead Generation Experts — Delhi
                </div>

                <h1 className="reveal reveal-delay-1">
                  Stop Chasing Clients.<br />
                  <span className="text-grad">Let Them Chase You.</span><br />
                  <span className="text-grad-gold">Consistent, Qualified Leads</span><br />
                  Delivered Daily
                </h1>

                <p className="hero-sub reveal reveal-delay-2">
                  We generate <strong style={{ color: "var(--g4)" }}>high-quality leads</strong> for Real Estate, Healthcare, B2B, and D2C brands — through Facebook, Google, LinkedIn & Email. No junk. Just serious buyers.
                </p>

                <div className="trust-row reveal reveal-delay-2">
                  {[
                    { num: "10M+", label: "Leads Generated" },
                    { num: "60%",   label: "Lower CPL" },
                    { num: "200+",   label: "Happy Clients" },
                  ].map((t, i) => (
                    <div key={i} className="trust-pill-stat">
                      <span className="trust-pill-num">{t.num}</span>
                      <span className="trust-pill-label">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <a href="#audit-form" className="btn-primary">
                    <span>Get Free Lead Audit</span>
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </a>
                  <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                </div>

                {/* Social Proof */}
                <div className="reveal reveal-delay-4" style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", marginRight: 8 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 16, height: 16, color: "#f0c95e", fill: "#f0c95e" }} />)}
                    </div>
                    <span style={{ color: "#8ab09a", fontSize: "0.85rem" }}>4.9 (200+ reviews)</span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Facebook style={{ width: 18, height: 18, color: "#8ab09a" }} />
                    <Instagram style={{ width: 18, height: 18, color: "#8ab09a" }} />
                    <Linkedin style={{ width: 18, height: 18, color: "#8ab09a" }} />
                  </div>
                </div>
              </div>

              <div className="form-card reveal reveal-delay-2">
                <LeadForm compact={false} />
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* LEAD SOURCES */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Where We Generate Leads</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">Multi-Channel <span className="text-grad">Lead Generation</span></h2>
              <p className="section-desc reveal">We don't rely on one platform. We find your customers everywhere.</p>
            </div>
            <div className="grid-2 stagger">
              {leadSources.map((s, i) => (
                <div key={i} className="service-card reveal">
                  <div className="service-icon">{s.icon}</div>
                  <div>
                    <h3 style={{ fontWeight:700, fontSize:"1.15rem", color:"#fff", marginBottom:8 }}>{s.title}</h3>
                    <p style={{ color:"#8ab09a", fontSize:"0.9rem", lineHeight:1.65 }}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* PROBLEMS */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
              <h2 className="section-title reveal">
                Common Lead Generation<br />
                <span className="text-grad-red">Problems We Fix</span>
              </h2>
            </div>
            <div className="grid-3 stagger">
              {problems.map((p, i) => (
                <div key={i} className="prob-card reveal">
                  <div style={{ fontSize:"2.5rem", marginBottom:16 }}>{p.icon}</div>
                  <h3 style={{ fontWeight:700, fontSize:"1.05rem", color:"#fff", marginBottom:8 }}>{p.title}</h3>
                  <p style={{ color:"#8a9a93", fontSize:"0.88rem", lineHeight:1.6 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* SOLUTIONS */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">Our Approach</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">How We Generate <span className="text-grad">Qualified Leads</span></h2>
            </div>
            <div className="grid-2 stagger">
              {solutions.map((s, i) => (
                <div key={i} className="glass-card reveal" style={{ padding:"36px 32px" }}>
                  <div className="icon-wrap">{s.icon}</div>
                  <h3 style={{ fontWeight:700, fontSize:"1.3rem", color:"#fff", marginBottom:12 }}>{s.title}</h3>
                  <p style={{ color:"#8ab09a", fontSize:"0.9rem", lineHeight:1.65 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* RESULTS */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Numbers That Matter</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Real <span className="text-grad">Lead Generation Results</span></h2>
            </div>
            <div className="grid-3 stagger">
              {results.map((r, i) => (
                <div key={i} className="result-card reveal">
                  <span className="result-val">{r.value}</span>
                  <p style={{ fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:4 }}>{r.label}</p>
                  <p style={{ fontSize:"0.8rem", color:"#8ab09a" }}>{r.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* LEAD MAGNET */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div className="leadmagnet-block reveal">
              <div className="icon-wrap" style={{ margin:"0 auto 24px" }}>
                <Database style={{ width:32, height:32 }} />
              </div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Complete <span className="text-grad">Lead Generation System</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", maxWidth:600, margin:"0 auto 32px", lineHeight:1.7 }}>
                We don't just run ads. We build a complete system that fills your pipeline consistently.
              </p>
              <div className="grid-3" style={{ maxWidth:800, margin:"0 auto", gap:"12px" }}>
                {leadMagnet.map((item, i) => (
                  <div key={i} className="leadmagnet-pill" style={{ justifyContent:"center" }}>
                    <CheckCircle2 style={{ width:16, height:16, color:"var(--g3)" }} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* INDUSTRIES */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Who We Generate Leads For</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Industries <span className="text-grad">We Serve</span></h2>
            </div>
            <div className="grid-6 stagger">
              {industries.map((ind, i) => (
                <div key={i} className="ind-chip reveal">
                  <span className="ind-chip-icon">{ind.icon}</span>
                  <p style={{ fontWeight:700, fontSize:"0.88rem", color:"#e8f5ee" }}>{ind.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* PROCESS */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">How We Work</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">4-Step Process</span></h2>
            </div>
            <div className="grid-4 stagger">
              {process.map((step, i) => (
                <div key={i} className="proc-card reveal">
                  <div className="proc-num">{step.number}</div>
                  <div className="icon-wrap" style={{ marginBottom:16 }}>{step.icon}</div>
                  <h3 style={{ fontWeight:700, fontSize:"1.15rem", color:"#fff", marginBottom:10 }}>{step.title}</h3>
                  <p style={{ color:"#8ab09a", fontSize:"0.88rem", lineHeight:1.65 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* TESTIMONIALS */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Client Results</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">What Our <span className="text-grad">Clients Say</span></h2>
            </div>
            <div className="grid-3 stagger">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card reveal">
                  <div className="stars">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} style={{ width:18, height:18, fill:"var(--gold2)", color:"var(--gold2)" }} />)}
                  </div>
                  <p style={{ color:"#d0e6da", fontSize:"0.95rem", lineHeight:1.7, marginBottom:20 }}>"{t.text}"</p>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff", marginBottom:2 }}>{t.name}</p>
                    <p style={{ fontSize:"0.8rem", color:"#8ab09a" }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* AUDIT FORM */}
        <section id="audit-form" className="section" style={{ background: "var(--dark2)" }}>
          <div className="container" style={{ maxWidth:860 }}>
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
              <p className="section-label reveal">Free Lead Audit</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Get Your <span className="text-grad">Free Lead Generation Audit</span></h2>
            </div>
            <div className="form-card reveal">
              <LeadForm compact={true} />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* FOUNDER */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div className="founder-block reveal">
              <div className="founder-avatar">RS</div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                Founded by <span className="text-grad">Raushan Saxena</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", lineHeight:1.75, maxWidth:680, margin:"0 auto" }}>
                8+ years of performance marketing experience. Raushan has generated over 10 million leads for businesses across real estate, healthcare, education, and B2B. His philosophy: quality over quantity, always.
              </p>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* FAQ */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">FAQ</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Frequently Asked <span className="text-grad">Questions</span></h2>
            </div>
            <div className="reveal"><FaqSection /></div>
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="cta-section">
          <div className="orb orb1" style={{ left:"-15%", top:"-20%", opacity:0.4 }} />
          <div className="orb orb2" style={{ right:"-15%", bottom:"-20%", opacity:0.4 }} />
          <div style={{ position:"relative", zIndex:2, maxWidth:800, margin:"0 auto" }}>
            <div className="glow-line reveal" style={{ margin:"0 auto 28px" }} />
            <h2 className="section-title reveal" style={{ textAlign:"center", fontSize:"clamp(2rem,4vw,3.2rem)" }}>
              Ready to Fill Your Pipeline<br />
              <span className="text-grad-gold">With Qualified Leads?</span>
            </h2>
            <p className="reveal" style={{ color:"rgba(255,255,255,0.75)", fontSize:"1.05rem", textAlign:"center", marginBottom:48, lineHeight:1.7 }}>
              Stop wasting money on leads that don't convert. Let's build a system that delivers consistently.
            </p>
            <div className="reveal" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:16 }}>
              <a href="#audit-form" className="btn-primary" style={{ fontSize:"1.05rem", padding:"16px 40px" }}>
                <span>Get Free Audit</span>
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