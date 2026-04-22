import React, { useEffect, useState } from "react";
import {
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Search,
  Building,
  MapPin,
  Star,
  PenTool,
  Facebook,
  Instagram,
  Youtube,
  Sparkles,
  Heart,
  UserCheck,
  TrendingUp,
  Award,
  Zap,
  Shield,
  ShoppingBag,
  Package,
  Repeat,
  BarChart2,
  Globe,
  Truck,
  Tag,
  MousePointer,
  Mail,
  RefreshCw,
  DollarSign,
  Layers,
} from "lucide-react";

/* ─────────────────────────────── DATA ─────────────────────────────── */
const problems = [
  { icon: "🛒", title: "High Cart Abandonment", description: "Shoppers add to cart but never checkout — you're losing 70%+ of potential revenue before the sale even happens" },
  { icon: "💸", title: "Rising CAC on Meta & Google", description: "Ad costs keep climbing while ROAS drops — your cost to acquire each customer is eating your margins" },
  { icon: "🔁", title: "Zero Repeat Purchases", description: "Customers buy once and vanish. No loyalty, no LTV growth, no predictable monthly revenue from your existing base" },
  { icon: "📦", title: "Scaling Without Profitability", description: "Revenue grows but profits don't — you're spending more on ads, returns, and ops than you're actually making" },
  { icon: "📉", title: "Low ROAS on Paid Ads", description: "Spending ₹1 lakh on ads but only getting ₹1.5–2L back. Every month feels like gambling, not growing" },
  { icon: "⚠️", title: "No Retention Strategy", description: "No email flows, no WhatsApp sequences, no loyalty programs — you're starting from zero every single month" },
];

const services = [
  { icon: <Instagram className="w-7 h-7" />, title: "Meta & Instagram Performance Ads", description: "High-converting D2C ad creatives and campaigns — UGC-style, product demos, social proof ads that stop the scroll and drive purchases" },
  { icon: <Search className="w-7 h-7" />, title: "Google Shopping & Search Ads", description: "Capture buyers actively searching your product category — Shopping, Performance Max, and branded search campaigns optimised for ROAS" },
  { icon: <Mail className="w-7 h-7" />, title: "Email & WhatsApp Automation", description: "Abandoned cart flows, post-purchase sequences, win-back campaigns and loyalty nudges that turn one-time buyers into regulars" },
  { icon: <BarChart2 className="w-7 h-7" />, title: "D2C Growth & Analytics", description: "Full-funnel tracking — CAC, LTV, ROAS, repeat purchase rate — with weekly dashboards so every decision is data-backed" },
];

const solutions = [
  { icon: <Target className="w-8 h-8" />, title: "Buyer Intent Targeting", description: "We build custom audiences from your customer data — lookalikes, retargeting pools, and intent-based segments to drive high-quality traffic" },
  { icon: <RefreshCw className="w-8 h-8" />, title: "Retention-First Marketing", description: "We build post-purchase flows that bring customers back — email, WhatsApp, and retargeting that grow LTV month over month" },
  { icon: <Layers className="w-8 h-8" />, title: "Creative Testing Engine", description: "We test 10–15 ad creatives every month — UGC, static, video, carousels — to find your winning formats and scale them" },
  { icon: <DollarSign className="w-8 h-8" />, title: "Profitable Scaling Framework", description: "We scale only what's working. No guessing — structured budget scaling based on ROAS thresholds and contribution margin" },
];

const d2cCategories = [
  { name: "Beauty & Skincare", icon: "💄" },
  { name: "Health & Wellness", icon: "💊" },
  { name: "Fashion & Apparel", icon: "👗" },
  { name: "Home & Lifestyle", icon: "🏠" },
  { name: "Baby & Kids", icon: "🍼" },
  { name: "Pet Products", icon: "🐾" },
  { name: "Food & Nutraceuticals", icon: "🥗" },
  { name: "Electronics & Gadgets", icon: "📱" },
];

const clientTypes = [
  { name: "Bootstrapped D2C Brands", icon: "🚀" },
  { name: "Funded Startups", icon: "💰" },
  { name: "Amazon/Flipkart Sellers", icon: "📦" },
  { name: "Shopify Store Owners", icon: "🛍️" },
  { name: "Influencer-Led Brands", icon: "⭐" },
  { name: "Brand Aggregators", icon: "🏢" },
];

const process = [
  { number: "01", title: "Brand & Funnel Audit", description: "We analyse your current ad accounts, website CRO, product pages, and email/WhatsApp flows to find exactly where you're leaking revenue", icon: <Target className="w-6 h-6" /> },
  { number: "02", title: "Creative & Messaging Strategy", description: "We build your winning creative angle — hook, offer, CTA — and launch 10–15 ad variations to find what converts for your audience", icon: <PenTool className="w-6 h-6" /> },
  { number: "03", title: "Performance Campaign Launch", description: "Full-funnel campaigns on Meta, Google & YouTube — prospecting, retargeting, and lookalike audiences all working together", icon: <TrendingUp className="w-6 h-6" /> },
  { number: "04", title: "LTV Maximisation", description: "Post-purchase email sequences, loyalty triggers, and re-engagement flows that turn your CAC into a profitable long-term asset", icon: <Repeat className="w-6 h-6" /> },
];

const results = [
  { value: "250+", label: "D2C Brands Grown", metric: "Across beauty, fashion, health & lifestyle" },
  { value: "3.8x", label: "Average ROAS", metric: "Across all managed ad accounts" },
  { value: "40%", label: "Lower CAC", metric: "Average reduction after 60 days" },
];

const benefits = [
  { text: "Dedicated D2C Growth Manager" },
  { text: "Creative Testing — 10+ Ads/Month" },
  { text: "Full-Funnel Meta & Google Setup" },
  { text: "Email & WhatsApp Automation" },
  { text: "Weekly ROAS & CAC Reports" },
  { text: "CRO & Landing Page Feedback" },
  { text: "Audience Research & Segmentation" },
  { text: "Competitor Ad Intelligence" },
];

const faqs = [
  { question: "What makes D2C marketing different from regular eCommerce marketing?", answer: "D2C brands own the customer relationship directly — no marketplace middlemen. This means you need to master the full funnel: acquisition, conversion, and retention. We specialise in all three, helping you build a customer base you own rather than renting traffic from Zomato or Amazon." },
  { question: "Which platforms work best for D2C brands in India?", answer: "Meta (Facebook + Instagram) is your primary acquisition engine for most D2C categories. Google Shopping and Search capture high-intent buyers. WhatsApp and email are gold for retention — 40–60% of your revenue should come from returning customers within 12 months." },
  { question: "How do you improve ROAS when costs keep rising?", answer: "Three levers: better creatives (we test 10–15 per month), smarter audiences (custom, lookalike, retargeting), and improved landing pages. Most brands we onboard have 1–2 of these working — we fix all three simultaneously." },
  { question: "Can you help brands that sell on Amazon/Flipkart as well as their own website?", answer: "Absolutely. We run separate strategies for marketplace vs DTC — protecting your Amazon BSR while building owned-channel revenue on your Shopify/WooCommerce store to reduce platform dependency over time." },
  { question: "How long before we see results?", answer: "For paid ads, most brands see improved metrics within 2–3 weeks of our creative testing engine kicking in. Email/WhatsApp flows typically drive measurable repeat purchase lift within 30–45 days. Full-funnel optimisation compounds over 60–90 days." },
  { question: "What monthly ad spend do I need to start?", answer: "We recommend a minimum of ₹50,000/month in ad spend for meaningful testing and scaling. For brands with proven products, ₹1–3L/month unlocks the full potential of our creative testing and multi-platform approach." },
];

const testimonials = [
  { name: "Neha Kapoor", role: "Founder, Glow Lab Skincare (D2C Beauty Brand)", text: "We were burning ₹80k/month on ads with a 1.4x ROAS. In 90 days they got us to 3.6x with the same budget. The creative testing framework they built completely changed how we think about ads.", rating: 5 },
  { name: "Rahul Agarwal", role: "Co-founder, FitFuel Nutrition", text: "Our repeat purchase rate went from 12% to 31% in 4 months after they set up our post-purchase WhatsApp and email flows. That alone changed our unit economics completely.", rating: 5 },
  { name: "Ananya Bose", role: "CEO, The Little Label (Kids Fashion D2C)", text: "We scaled from ₹8L to ₹45L monthly revenue in 6 months. Every decision was backed by data — CAC, LTV, payback period — I finally understood where my money was going and why.", rating: 5 },
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

  .proof-banner{
    background:linear-gradient(135deg,rgba(0,96,57,0.15),rgba(201,168,76,0.08));
    border:1px solid rgba(0,180,110,0.2);
    border-radius:20px;padding:24px 32px;
    display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;
    margin-bottom:40px;
  }
  .proof-stat{text-align:center;}
  .proof-num{font-weight:900;font-size:2rem;background:linear-gradient(135deg,var(--g4),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;line-height:1;}
  .proof-label{font-size:0.72rem;color:#8ab09a;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;}

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
  .form-input::placeholder{color:#4a7060;}
  .form-select option{background:#180f00;color:#e8f5ee;}
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
  .form-privacy{font-size:0.75rem;color:rgba(196,160,128,0.5);text-align:center;margin-top:12px;}

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

  .trust-strip{
    display:flex;flex-wrap:wrap;justify-content:center;gap:32px;
    background:rgba(0,96,57,0.06);border-top:1px solid var(--border);border-bottom:1px solid var(--border);
    padding:32px 24px;
  }
  .trust-item{display:flex;align-items:center;gap:10px;color:#8ab09a;font-size:0.9rem;font-weight:600;}
  .trust-item-icon{
    width:36px;height:36px;border-radius:10px;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;flex-shrink:0;
    box-shadow:0 0 12px rgba(0,140,70,0.3);
  }

  .marquee-wrap{overflow:hidden;padding:20px 0;background:rgba(0,96,57,0.04);border-top:1px solid var(--border);}
  .marquee-track{display:flex;gap:48px;animation:marquee 22s linear infinite;width:max-content;}
  .marquee-track:hover{animation-play-state:paused;}
  @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .marquee-item{display:flex;align-items:center;gap:10px;color:rgba(0,180,110,0.5);font-size:0.85rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;}
  .marquee-dot{width:6px;height:6px;border-radius:50%;background:var(--gold2);flex-shrink:0;}

  .benefits-block{
    background:rgba(0,96,57,0.08);border:1px solid rgba(0,180,110,0.2);
    border-radius:28px;padding:64px 48px;text-align:center;
  }
  .benefit-pill{
    background:rgba(0,96,57,0.12);border:1px solid rgba(0,180,110,0.2);
    border-radius:99px;padding:10px 24px;
    display:inline-flex;align-items:center;gap:8px;
    font-size:0.88rem;font-weight:600;color:#b0d4be;
  }

  .testimonial-card{
    background:rgba(0,96,57,0.07);border:1px solid var(--border);
    border-radius:28px;padding:32px 28px;
    transition:transform 0.3s,border-color 0.3s;
    position:relative;overflow:hidden;
  }
  .testimonial-card::before{
    content:'"';position:absolute;top:-10px;right:20px;
    font-size:8rem;color:rgba(0,180,110,0.06);font-weight:900;line-height:1;
    pointer-events:none;
  }
  .testimonial-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,0.3);}
  .stars{display:flex;gap:4px;margin-bottom:16px;color:var(--gold2);}
  .testimonial-name-row{display:flex;align-items:center;gap:12px;}
  .testimonial-avatar{
    width:44px;height:44px;border-radius:50%;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    font-weight:800;font-size:0.9rem;color:#fff;flex-shrink:0;
    box-shadow:0 0 12px rgba(0,140,70,0.3);
  }

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

  .guarantee-box{
    background:rgba(0,96,57,0.1);border:2px solid rgba(0,180,110,0.25);
    border-radius:20px;padding:28px 32px;
    display:flex;align-items:flex-start;gap:16px;
    transition:border-color 0.3s;
  }
  .guarantee-box:hover{border-color:rgba(0,212,125,0.5);}
  .guarantee-icon{
    width:52px;height:52px;border-radius:14px;flex-shrink:0;
    background:linear-gradient(135deg,var(--g),var(--g2));
    display:flex;align-items:center;justify-content:center;
    color:#fff;box-shadow:0 0 16px rgba(0,140,70,0.35);
  }

  /* Metric pill - D2C specific */
  .metric-pill{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(0,180,110,0.08);border:1px solid rgba(0,180,110,0.2);
    border-radius:12px;padding:10px 20px;
    font-size:0.85rem;font-weight:700;color:var(--g4);
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

  .grid-2{display:grid;gap:24px;} @media(min-width:900px){.grid-2{grid-template-columns:repeat(2,1fr);}}
  .grid-3{display:grid;gap:24px;} @media(min-width:600px){.grid-3{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-3{grid-template-columns:repeat(3,1fr);}}
  .grid-4{display:grid;gap:24px;} @media(min-width:600px){.grid-4{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-4{grid-template-columns:repeat(4,1fr);}}
  .grid-6{display:grid;gap:20px;} @media(min-width:600px){.grid-6{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-6{grid-template-columns:repeat(3,1fr);}} @media(min-width:1100px){.grid-6{grid-template-columns:repeat(6,1fr);}}
  .grid-8{display:grid;gap:20px;} @media(min-width:600px){.grid-8{grid-template-columns:repeat(2,1fr);}} @media(min-width:900px){.grid-8{grid-template-columns:repeat(4,1fr);}} @media(min-width:1100px){.grid-8{grid-template-columns:repeat(8,1fr);}}

  @media(max-width:600px){
    .hero-inner{padding:80px 20px;}
    .benefits-block{padding:40px 20px;}
    .founder-block{padding:40px 20px;}
    .proof-banner{padding:20px;}
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
    const cursor = document.getElementById("cursor-glow-d2c");
    if (!cursor) return;
    const move = (e) => { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}

/* ─────────────────────── LEAD FORM ─────────────────────── */
function LeadForm({ compact = false }) {
  const [formData, setFormData] = useState({ name:"", brand:"", city:"", budget:"", category:"", phone:"", revenue:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{ fontSize:"3.5rem", marginBottom:16 }}>🚀</div>
      <h3 style={{ fontWeight:800, fontSize:"1.5rem", color:"#fff", marginBottom:12 }}>Audit Request Received!</h3>
      <p style={{ color:"#8ab09a", fontSize:"0.95rem" }}>We'll analyse your ad account & brand funnel and reach out within 24 hours with a growth plan.</p>
    </div>
  );

  return (
    <>
      <h3 className="form-title text-grad" style={{ fontSize: compact ? "1.4rem" : "1.7rem" }}>
        {compact ? "Get Your Free D2C Brand Audit" : "Fill the Form"}
      </h3>
      <p className="form-sub">{compact ? "We'll review your CAC, ROAS, retention metrics & growth bottlenecks" : "Get a free audit of your D2C brand's digital marketing"}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input className="form-input" type="text" name="name" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-input" type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required value={formData.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Brand Name *</label>
            <input className="form-input" type="text" name="brand" placeholder="Your D2C brand name" required value={formData.brand} onChange={handleChange} />
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
              <option value="20-50k">₹20,000 – ₹50,000</option>
              <option value="50-100k">₹50,000 – ₹1,00,000</option>
              <option value="1-3L">₹1,00,000 – ₹3,00,000</option>
              <option value="3L+">₹3,00,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Brand Category *</label>
            <select className="form-select" name="category" required value={formData.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="beauty">Beauty & Skincare</option>
              <option value="health">Health & Wellness</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="home">Home & Lifestyle</option>
              <option value="food">Food & Nutraceuticals</option>
              <option value="baby">Baby & Kids</option>
              <option value="pet">Pet Products</option>
              <option value="electronics">Electronics & Gadgets</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Revenue Range</label>
          <select className="form-select" name="revenue" value={formData.revenue} onChange={handleChange}>
            <option value="">Select revenue range</option>
            <option value="0-5L">₹0 – ₹5 Lakhs</option>
            <option value="5-20L">₹5 – ₹20 Lakhs</option>
            <option value="20-50L">₹20 – ₹50 Lakhs</option>
            <option value="50L+">₹50 Lakhs+</option>
          </select>
        </div>
        <button type="submit" className="btn-form-submit">Get Free D2C Brand Audit →</button>
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

const marqueeItems = ["Meta Performance Ads","Google Shopping","Email Automation","WhatsApp Flows","CAC Reduction","ROAS Optimisation","Creative Testing","Retention Marketing","LTV Growth","D2C Scaling","Shopify Marketing","UGC Ad Creatives"];

/* ─────────────────────── MAIN ─────────────────────── */
export default function D2CPage() {
  useReveal();
  useCursorGlow();

  return (
    <>
      <style>{globalCSS}</style>
      <div id="cursor-glow-d2c" className="cursor-glow" />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid" />
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />

          <div className="hero-inner">
            <div className="hero-grid-layout">
              <div>
                <div className="badge reveal">
                  <ShoppingBag style={{ width: 16, height: 16 }} />
                  D2C Brand Growth Specialists — Delhi NCR
                </div>

                <h1 className="reveal reveal-delay-1">
                  Scale Your D2C Brand.<br />
                  <span className="text-grad">Lower CAC.</span><br />
                  <span className="text-grad-gold">Higher ROAS. Every Month.</span>
                </h1>

                <p className="hero-sub reveal reveal-delay-2">
                  We help <strong style={{ color: "var(--g4)" }}>D2C brands, Shopify stores & eCommerce startups</strong> scale profitably through Meta Ads, Google Shopping, and retention marketing that turns one-time buyers into loyal customers.
                </p>

                <div className="proof-banner reveal reveal-delay-2">
                  {[
                    { num: "250+", label: "D2C Brands" },
                    { num: "3.8x", label: "Avg ROAS" },
                    { num: "40%", label: "Lower CAC" },
                    { num: "4.9★", label: "Client Rating" },
                  ].map((t, i) => (
                    <div key={i} className="proof-stat">
                      <span className="proof-num">{t.num}</span>
                      <span className="proof-label">{t.label}</span>
                    </div>
                  ))}
                </div>

                <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <a href="#consult-form" className="btn-primary">
                    <span>Get Free Brand Audit</span>
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </a>
                  <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <MessageCircle style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                </div>

                <div className="reveal reveal-delay-4" style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", marginRight: 8 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 16, height: 16, color: "#f0c95e", fill: "#f0c95e" }} />)}
                    </div>
                    <span style={{ color: "#8ab09a", fontSize: "0.85rem" }}>4.9 (180+ reviews)</span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Facebook style={{ width: 18, height: 18, color: "#8ab09a" }} />
                    <Instagram style={{ width: 18, height: 18, color: "#8ab09a" }} />
                    <Youtube style={{ width: 18, height: 18, color: "#8ab09a" }} />
                  </div>
                </div>

                {/* D2C specific metric pills */}
                <div className="reveal reveal-delay-4" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["Meta & Google Certified","Shopify Experts","CAC / LTV Focused"].map((m, i) => (
                    <div key={i} className="metric-pill">
                      <CheckCircle2 style={{ width: 14, height: 14 }} />
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-card reveal reveal-delay-2">
                <LeadForm compact={false} />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust-strip">
          {[
            { icon: <Shield style={{width:18,height:18}}/>, text: "No Long-Term Lock-ins" },
            { icon: <Zap style={{width:18,height:18}}/>, text: "Live Campaigns in 5 Days" },
            { icon: <Award style={{width:18,height:18}}/>, text: "250+ D2C Brands Scaled" },
            { icon: <TrendingUp style={{width:18,height:18}}/>, text: "Avg 3.8x ROAS Delivered" },
            { icon: <CheckCircle2 style={{width:18,height:18}}/>, text: "Profit-First Approach" },
          ].map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-item-icon">{item.icon}</div>
              {item.text}
            </div>
          ))}
        </div>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="marquee-item">
                <div className="marquee-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* SERVICES */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
              <p className="section-label reveal">What We Do</p>
              <div className="glow-line reveal" style={{ margin: "0 auto 24px" }} />
              <h2 className="section-title reveal">D2C Brand <span className="text-grad">Growth Services</span></h2>
              <p className="section-desc reveal">End-to-end performance marketing for D2C brands — from paid acquisition and creative testing to retention automation and profitability scaling</p>
            </div>
            <div className="grid-2 stagger">
              {services.map((s, i) => (
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
                Is Your D2C Brand Stuck With<br />
                <span className="text-grad-red">These Growth Blockers?</span>
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
              <h2 className="section-title reveal">How We <span className="text-grad">Scale D2C Brands</span> Profitably</h2>
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
              <h2 className="section-title reveal">Real <span className="text-grad">D2C Growth Numbers</span></h2>
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

        {/* GUARANTEES */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 56px" }}>
              <p className="section-label reveal">Why Trust Us</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">Commitment to Your Brand</span></h2>
            </div>
            <div className="grid-2 stagger">
              {[
                { icon: <BarChart2 style={{width:26,height:26}}/>, title: "ROAS or We Optimise Free", desc: "If we don't hit the agreed ROAS target in 60 days, we continue managing your campaigns at no extra charge until we do. We're in it with you." },
                { icon: <Zap style={{width:26,height:26}}/>, title: "Live Within 5 Business Days", desc: "Full campaign setup — creatives, audiences, tracking, flows — live in 5 days. No weeks of 'strategy sessions' before a single ad goes live." },
                { icon: <TrendingUp style={{width:26,height:26}}/>, title: "Transparent Unit Economics", desc: "Weekly reports with CAC, ROAS, LTV, payback period — real numbers. No vanity metrics, no reach or impressions as success KPIs." },
                { icon: <UserCheck style={{width:26,height:26}}/>, title: "D2C-Only Specialist Team", desc: "We exclusively work with D2C & eCommerce brands. No generalist agency that also does dentists and law firms — your account manager lives and breathes D2C." },
              ].map((g, i) => (
                <div key={i} className="guarantee-box reveal">
                  <div className="guarantee-icon">{g.icon}</div>
                  <div>
                    <h3 style={{fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:8}}>{g.title}</h3>
                    <p style={{color:"#8ab09a", fontSize:"0.88rem", lineHeight:1.65}}>{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* D2C CATEGORIES */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Brand Categories</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">We Scale All <span className="text-grad">D2C Categories</span></h2>
            </div>
            <div className="grid-8 stagger">
              {d2cCategories.map((type, i) => (
                <div key={i} className="ind-chip reveal">
                  <span className="ind-chip-icon">{type.icon}</span>
                  <p style={{ fontWeight:700, fontSize:"0.88rem", color:"#e8f5ee" }}>{type.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* CLIENT TYPES */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Who We Work With</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">D2C Founders & <span className="text-grad">Brand Builders</span></h2>
            </div>
            <div className="grid-6 stagger">
              {clientTypes.map((client, i) => (
                <div key={i} className="ind-chip reveal">
                  <span className="ind-chip-icon">{client.icon}</span>
                  <p style={{ fontWeight:700, fontSize:"0.88rem", color:"#e8f5ee" }}>{client.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* PROCESS */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">How We Work</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Our <span className="text-grad">4-Step D2C Growth Framework</span></h2>
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

        {/* BENEFITS */}
        <section className="section" style={{ background: "var(--dark2)" }}>
          <div className="container">
            <div className="benefits-block reveal">
              <div className="icon-wrap" style={{ margin:"0 auto 24px" }}>
                <Sparkles style={{ width:32, height:32 }} />
              </div>
              <h2 className="section-title" style={{ marginBottom:16 }}>
                What You Get <span className="text-grad">With Us</span>
              </h2>
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", maxWidth:600, margin:"0 auto 32px", lineHeight:1.7 }}>
                Complete D2C performance marketing — from acquisition and creative testing to retention flows that compound your growth month over month
              </p>
              <div className="grid-3" style={{ maxWidth:900, margin:"0 auto", gap:"12px" }}>
                {benefits.map((benefit, i) => (
                  <div key={i} className="benefit-pill" style={{ justifyContent:"center" }}>
                    <CheckCircle2 style={{ width:16, height:16, color:"var(--g3)" }} />
                    {benefit.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* TESTIMONIALS */}
        <section className="section" style={{ background: "var(--dark)" }}>
          <div className="container">
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 64px" }}>
              <p className="section-label reveal">Real Success Stories</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">What D2C Founders <span className="text-grad">Say About Us</span></h2>
            </div>
            <div className="grid-3 stagger">
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card reveal">
                  <div className="stars">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} style={{ width:18, height:18, fill:"var(--gold2)", color:"var(--gold2)" }} />)}
                  </div>
                  <p style={{ color:"#d0e6da", fontSize:"0.95rem", lineHeight:1.7, marginBottom:24 }}>"{t.text}"</p>
                  <div className="testimonial-name-row">
                    <div className="testimonial-avatar">{t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div>
                      <p style={{ fontWeight:700, color:"#fff", marginBottom:2, fontSize:"0.95rem" }}>{t.name}</p>
                      <p style={{ fontSize:"0.78rem", color:"#8ab09a" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* CONSULT FORM */}
        <section id="consult-form" className="section" style={{ background: "var(--dark2)" }}>
          <div className="container" style={{ maxWidth:860 }}>
            <div style={{ textAlign:"center", maxWidth:640, margin:"0 auto 48px" }}>
              <p className="section-label reveal">Free Consultation</p>
              <div className="glow-line reveal" style={{ margin:"0 auto 24px" }} />
              <h2 className="section-title reveal">Get Your <span className="text-grad">Free D2C Brand Growth Audit</span></h2>
              <p className="section-desc reveal" style={{marginTop:8}}>We'll review your ad account, website funnel, and retention strategy — then show you exactly where you're leaving money on the table</p>
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
              <p style={{ color:"#a3c4b0", fontSize:"1.05rem", lineHeight:1.75, maxWidth:680, margin:"0 auto 32px" }}>
                8+ years scaling D2C brands across beauty, health, fashion and lifestyle. Raushan has helped 250+ direct-to-consumer brands reduce CAC, improve ROAS, and build the retention engines that turn paid acquisition into profitable, compounding growth.
              </p>
              <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
                {["250+ D2C Brands Scaled","3.8x Average ROAS Delivered","Meta & Google Certified Partner","D2C-Only Specialist Agency"].map((tag,i)=>(
                  <span key={i} style={{background:"rgba(0,96,57,0.15)",border:"1px solid rgba(0,180,110,0.2)",borderRadius:"99px",padding:"8px 20px",fontSize:"0.82rem",fontWeight:700,color:"var(--g4)"}}>✓ {tag}</span>
                ))}
              </div>
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
              <h2 className="section-title reveal">D2C Marketing <span className="text-grad">FAQs</span></h2>
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
              Ready to Scale Your D2C Brand<br />
              <span className="text-grad-gold">Profitably — Month After Month?</span>
            </h2>
            <p className="reveal" style={{ color:"rgba(255,255,255,0.75)", fontSize:"1.05rem", textAlign:"center", marginBottom:48, lineHeight:1.7 }}>
              Stop burning budget on ads that don't convert. Get a performance-first D2C marketing partner who's obsessed with your CAC, ROAS, and LTV — not just impressions.
            </p>
            <div className="reveal" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:16 }}>
              <a href="#consult-form" className="btn-primary" style={{ fontSize:"1.05rem", padding:"16px 40px" }}>
                <span>Get Free Brand Audit</span>
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