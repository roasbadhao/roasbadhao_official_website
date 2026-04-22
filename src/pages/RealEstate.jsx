import React, { useEffect, useState } from "react";
import {
  ArrowRight, Eye, Star, Smartphone, Monitor,
  Megaphone, Search, MapPin, TrendingUp,
} from "lucide-react";

/* ─────────────────────── DATA ─────────────────────── */
const categories = [
  {
    id: "app", label: "App Development", emoji: "📱",
    color: "#00d47d", accent: "#00b86e", device: "mobile",
    tagline: "Native & Cross-Platform Apps",
    projects: [
      { title: "FoodZap Delivery App", tag: "React Native", desc: "On-demand food delivery app with real-time tracking, push notifications & integrated payments", stat: "50K+ Downloads" },
      { title: "FitPulse Health Tracker", tag: "Flutter", desc: "Health & fitness app with AI workout plans, diet tracking and wearable sync", stat: "4.8★ App Store" },
      { title: "QuickKart Shopping", tag: "React Native", desc: "D2C brand shopping app with AR try-on, loyalty rewards and one-tap checkout", stat: "₹2Cr+ GMV" },
      { title: "TalkEase EdTech", tag: "Flutter", desc: "Language learning app with live tutors, AI speech analysis and gamified lessons", stat: "30K+ Users" },
    ],
  },
  {
    id: "web", label: "Web Development", emoji: "💻",
    color: "#f0c95e", accent: "#c9a84c", device: "desktop",
    tagline: "High-Performance Web Experiences",
    projects: [
      { title: "LuxeStay Hotels", tag: "Next.js", desc: "Luxury hotel booking portal with dynamic pricing engine, booking calendar and CRM integration", stat: "3x Bookings" },
      { title: "MediCare Clinic Portal", tag: "React + Node", desc: "Healthcare platform with patient portal, online appointments and records management", stat: "500+ Patients" },
      { title: "TradeForge B2B Portal", tag: "Next.js", desc: "Wholesale marketplace with RFQ management, vendor catalogues and bulk order workflows", stat: "₹5Cr+ Orders" },
      { title: "LearnLoop LMS", tag: "React + Django", desc: "Learning management system with live classes, course builder and certification engine", stat: "10K+ Learners" },
    ],
  },
  {
    id: "meta", label: "Meta Ads", emoji: "🎯",
    color: "#60a5fa", accent: "#3b82f6", device: "mobile",
    tagline: "Facebook & Instagram Performance Ads",
    projects: [
      { title: "Bloom Skincare", tag: "D2C Beauty", desc: "UGC-style video ad funnel — prospecting + retargeting + lookalike stack for D2C skincare brand", stat: "4.2x ROAS" },
      { title: "Spice Route Restaurant", tag: "F&B", desc: "Instagram reach campaigns with story ads and WhatsApp CTA driving table bookings & catering leads", stat: "3x Walk-ins" },
      { title: "FitFuel Supplements", tag: "Health D2C", desc: "Full-funnel Meta campaign with dynamic product ads, cart recovery and 14-day retargeting", stat: "38% Lower CAC" },
      { title: "The Little Label Kids", tag: "Fashion D2C", desc: "Seasonal collection launch — creative testing of 12 ad variants across 30 days", stat: "5.1x ROAS" },
    ],
  },
  {
    id: "google", label: "Google Ads", emoji: "🔍",
    color: "#f87171", accent: "#ef4444", device: "desktop",
    tagline: "Search, Shopping & Performance Max",
    projects: [
      { title: "LawMinds Legal Services", tag: "B2B Services", desc: "Branded + non-branded search campaigns for corporate law firm capturing high-intent queries", stat: "₹800 CPL" },
      { title: "HomeCraft Furniture", tag: "eCommerce", desc: "Google Shopping + Performance Max — product feed optimisation and smart bid strategy", stat: "3.6x ROAS" },
      { title: "CloudKitchen Co.", tag: "F&B", desc: "Local search ads for 'biryani near me' queries — cutting Zomato dependency by 60%", stat: "40% Direct Orders" },
      { title: "Dr. Mehta's Clinic", tag: "Healthcare", desc: "Search ads for specialist consultations — keyword sculpting and quality score optimisation", stat: "250+ Leads/Mo" },
    ],
  },
  {
    id: "gmb", label: "GMB Optimization", emoji: "📍",
    color: "#34d399", accent: "#10b981", device: "mobile",
    tagline: "Google My Business & Local SEO",
    projects: [
      { title: "Aroma Bakers Chain", tag: "F&B", desc: "GMB optimization for 8-outlet bakery chain — reviews, posts, Q&A and photo strategy", stat: "Top 3 Maps Pack" },
      { title: "VisionCare Eye Clinic", tag: "Healthcare", desc: "Local SEO + GMB audit for ophthalmology clinic — 180% increase in 'directions' clicks", stat: "+180% Clicks" },
      { title: "AutoPro Service Center", tag: "Automotive", desc: "GMB profile rebuild with service menus, booking integration and review response templates", stat: "4.7★ Rating" },
      { title: "GlowUp Salon Chain", tag: "Beauty", desc: "Multi-location GMB management — weekly posts, offer cards, and review generation campaigns", stat: "+220% Calls" },
    ],
  },
  {
    id: "leadgen", label: "Lead Generation", emoji: "⚡",
    color: "#a78bfa", accent: "#8b5cf6", device: "desktop",
    tagline: "Qualified Lead Pipelines at Scale",
    projects: [
      { title: "BuildRight Realty", tag: "Real Estate", desc: "Multi-channel lead gen for luxury housing — Meta, Google and WhatsApp automation funnel", stat: "1,200+ Leads" },
      { title: "EduPath Coaching", tag: "Education", desc: "Lead generation for JEE/NEET coaching — YouTube pre-roll, search and lead form ads", stat: "₹180 CPL" },
      { title: "Wealth Nest Finance", tag: "BFSI", desc: "Compliant lead gen for mutual fund advisory — intent targeting and 5-step WhatsApp nurture", stat: "30% Conversion" },
      { title: "SolarNow Energy", tag: "B2B", desc: "Inbound lead pipeline — landing page + Google + Meta + email sequence working in tandem", stat: "450+ Leads/Mo" },
    ],
  },
];

/* ─────────────────────── CSS ─────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --g:#006039;--g2:#008a52;--g3:#00b86e;--g4:#00d47d;
    --gold:#c9a84c;--gold2:#f0c95e;
    --dark:#010d08;--dark2:#031a0f;
    --border:rgba(0,180,110,0.16);
  }
  html{scroll-behavior:smooth;}
  body{font-family:'Poppins',sans-serif;background:var(--dark);color:#e8f5ee;overflow-x:hidden;}
  body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.022;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:var(--dark);}::-webkit-scrollbar-thumb{background:var(--g2);border-radius:4px;}

  .syne{font-family:'Poppins',sans-serif;}
  .text-grad{background:linear-gradient(135deg,var(--g3) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .text-grad-gold{background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

  .container{max-width:1300px;margin:0 auto;padding:0 32px;}
  .section{padding:88px 0;}

  .glow-line{width:72px;height:3px;background:linear-gradient(90deg,var(--g3),var(--gold2));border-radius:99px;box-shadow:0 0 12px var(--g3);}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,180,110,0.18),rgba(201,168,76,0.12),rgba(0,180,110,0.18),transparent);}

  .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,96,57,0.18);border:1px solid rgba(0,180,110,0.28);backdrop-filter:blur(12px);padding:8px 20px;border-radius:99px;font-size:13px;font-weight:600;letter-spacing:0.04em;color:var(--g4);}

  /* HERO */
  .hero{position:relative;min-height:68vh;display:flex;align-items:center;overflow:hidden;
    background:radial-gradient(ellipse 90% 70% at 50% -10%,rgba(0,140,70,0.2) 0%,transparent 65%),
      radial-gradient(ellipse 50% 60% at 85% 90%,rgba(201,168,76,0.1) 0%,transparent 55%),var(--dark);}
  .hero-bg{position:absolute;inset:0;pointer-events:none;
    background-image:linear-gradient(rgba(0,180,110,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,110,0.055) 1px,transparent 1px);
    background-size:64px 64px;mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black,transparent);animation:bgScroll 24s linear infinite;}
  @keyframes bgScroll{from{background-position:0 0}to{background-position:64px 64px}}
  .orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;animation:orbF 9s ease-in-out infinite;}
  .orb-a{width:540px;height:540px;background:radial-gradient(circle,rgba(0,130,70,0.22),transparent 70%);top:-15%;left:-10%;}
  .orb-b{width:380px;height:380px;background:radial-gradient(circle,rgba(201,168,76,0.13),transparent 70%);bottom:-5%;right:-5%;animation-delay:3.5s;}
  @keyframes orbF{0%,100%{transform:translate(0,0);}40%{transform:translate(25px,-18px);}70%{transform:translate(-18px,12px);}}
  .hero-inner{position:relative;z-index:2;padding:20px 20px 0px;max-width:1300px;}
  .hero h1{font-family:'Poppins',sans-serif;font-size:clamp(2.8rem,4.5vw,5.8rem);font-weight:800;line-height:1.0;letter-spacing:-0.03em;color:#fff;margin:22px 0 18px;}
  .hero-sub{font-size:1.05rem;color:#9abfac;line-height:1.72;max-width:540px;}

  /* STATS BAR */
  .stats-bar{display:flex;flex-wrap:wrap;gap:0;background:rgba(0,96,57,0.08);border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-top:52px;}
  .stat-item{flex:1;min-width:130px;padding:26px 20px;text-align:center;border-right:1px solid var(--border);transition:background 0.3s;}
  .stat-item:last-child{border-right:none;}
  .stat-item:hover{background:rgba(0,180,110,0.07);}
  .stat-val{font-family:'Poppins',sans-serif;font-weight:800;font-size:2.1rem;background:linear-gradient(135deg,var(--g4),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;display:block;}
  .stat-lbl{font-size:0.75rem;color:#8ab09a;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-top:4px;}

  /* TABS */
  .tab-strip{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:56px;}
  .tab-btn{display:inline-flex;align-items:center;gap:9px;padding:11px 22px;border-radius:99px;border:1.5px solid rgba(0,180,110,0.2);background:rgba(0,96,57,0.06);color:#8ab09a;font-size:0.88rem;font-weight:600;cursor:pointer;transition:all 0.25s;white-space:nowrap;font-family:'DM Sans',sans-serif;}
  .tab-btn:hover{border-color:rgba(0,212,125,0.4);color:#e8f5ee;background:rgba(0,96,57,0.14);}
  .tab-btn.active{border-color:var(--active-color,var(--g3));background:rgba(0,180,110,0.12);color:#fff;box-shadow:0 0 22px rgba(0,180,110,0.2);}

  /* DEVICE STAGE */
  .device-stage{position:relative;display:flex;align-items:center;justify-content:center;min-height:480px;margin-bottom:56px;perspective:1200px;}

  /* Desktop mockup */
  .mock-desktop{position:relative;display:inline-block;animation:floatD 6s ease-in-out infinite;z-index:2;}
  .mon-body{width:540px;max-width:88vw;background:linear-gradient(160deg,#1a2830,#0e1a14);border:2px solid rgba(0,180,110,0.28);border-radius:14px 14px 0 0;padding:9px;box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 60px rgba(0,180,110,0.1);}
  .mon-screen{width:100%;aspect-ratio:16/10;border-radius:7px;overflow:hidden;}
  .mon-stand{width:100px;height:26px;margin:0 auto;background:linear-gradient(180deg,#1a2830,#111c16);border:1px solid rgba(0,180,110,0.14);}
  .mon-base{width:170px;height:9px;margin:0 auto;background:linear-gradient(180deg,#1a2830,#111c16);border-radius:0 0 7px 7px;border:1px solid rgba(0,180,110,0.14);border-top:none;}

  /* Mobile mockup */
  .mock-mobile{position:relative;display:inline-block;animation:floatD 6s ease-in-out infinite;z-index:2;}
  .phone-body{width:198px;background:linear-gradient(160deg,#1a2830,#0e1a14);border:2px solid rgba(0,180,110,0.28);border-radius:34px;padding:11px 9px;box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 60px rgba(0,180,110,0.1);}
  .phone-notch{width:56px;height:9px;background:rgba(0,180,110,0.14);border-radius:99px;margin:0 auto 7px;}
  .phone-screen{width:100%;aspect-ratio:9/16;border-radius:22px;overflow:hidden;}
  .phone-bar{width:38px;height:4px;background:rgba(0,180,110,0.22);border-radius:99px;margin:7px auto 0;}

  @keyframes floatD{0%,100%{transform:translateY(0) rotateX(2deg);}50%{transform:translateY(-12px) rotateX(-1deg);}}

  /* Side phones */
  .side-phones{position:absolute;inset:0;pointer-events:none;display:flex;align-items:center;justify-content:space-between;padding:0 32px;}
  .sp{width:128px;background:linear-gradient(160deg,#1a2830,#0e1a14);border:2px solid rgba(0,180,110,0.16);border-radius:26px;padding:7px 6px;box-shadow:0 20px 60px rgba(0,0,0,0.55);opacity:0.72;}
  .sp:first-child{transform:scale(0.87) rotate(-4deg);animation:floatD 7s ease-in-out -2s infinite;}
  .sp:last-child{transform:scale(0.87) rotate(4deg);animation:floatD 7.5s ease-in-out -4s infinite;}
  .sp-notch{width:36px;height:6px;background:rgba(0,180,110,0.1);border-radius:99px;margin:0 auto 5px;}
  .sp-scr{width:100%;aspect-ratio:9/16;border-radius:17px;overflow:hidden;}
  .sp-bar{width:26px;height:3px;background:rgba(0,180,110,0.14);border-radius:99px;margin:5px auto 0;}

  /* Screen fill */
  .scr-fill{width:100%;height:100%;position:relative;overflow:hidden;}
  .scr-grad{position:absolute;inset:0;}
  .scr-ui{position:absolute;inset:0;padding:14px 12px;display:flex;flex-direction:column;gap:7px;}
  .scr-bar{height:5px;border-radius:99px;background:rgba(255,255,255,0.11);}
  .scr-bar.hi{background:rgba(255,255,255,0.32);}
  .scr-label{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#fff;text-shadow:0 2px 20px rgba(0,0,0,0.9);white-space:nowrap;text-align:center;}
  .scr-sub{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);font-size:0.68rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.55);white-space:nowrap;}
  .scr-arr{position:absolute;bottom:26px;right:18px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.14);border:1.5px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;}

  /* Project cards */
  .proj-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));}
  .proj-card{background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:22px;padding:26px 22px;position:relative;overflow:hidden;transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;}
  .proj-card::before{content:'';position:absolute;inset:0;background:var(--pc-bg,transparent);border-radius:22px;pointer-events:none;}
  .proj-card:hover{transform:translateY(-5px);border-color:rgba(0,212,125,0.32);box-shadow:0 18px 55px rgba(0,96,57,0.2);}
  .proj-tag{display:inline-block;padding:4px 11px;border-radius:99px;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:12px;}
  .proj-title{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.05rem;color:#fff;margin-bottom:7px;}
  .proj-desc{font-size:0.85rem;color:#8ab09a;line-height:1.62;margin-bottom:14px;}
  .proj-stat{display:inline-flex;align-items:center;gap:5px;font-weight:700;font-size:0.84rem;border-radius:99px;padding:5px 13px;}

  /* Quick grid */
  .quick-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));}
  .q-chip{background:rgba(0,96,57,0.07);border:1px solid var(--border);border-radius:22px;padding:30px 18px;text-align:center;cursor:pointer;transition:all 0.3s;}
  .q-chip:hover{transform:translateY(-5px);}
  .q-emoji{font-size:2.6rem;display:block;margin-bottom:12px;}
  .q-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:0.92rem;color:#e8f5ee;margin-bottom:5px;}
  .q-tag{font-size:0.73rem;color:#6a8a7a;line-height:1.45;}

  /* CTA buttons */
  .btn-primary{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--g) 0%,var(--g2) 60%,var(--g3) 100%);color:#fff;padding:14px 34px;border-radius:99px;font-weight:700;font-size:0.95rem;border:none;cursor:pointer;text-decoration:none;box-shadow:0 0 28px rgba(0,140,70,0.35);transition:transform 0.2s,box-shadow 0.2s;font-family:'DM Sans',sans-serif;}
  .btn-primary:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 0 46px rgba(0,180,110,0.55);}
  .btn-wa{display:inline-flex;align-items:center;gap:10px;background:rgba(37,211,102,0.1);border:1.5px solid rgba(37,211,102,0.32);color:#25d366;padding:14px 28px;border-radius:99px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
  .btn-wa:hover{background:rgba(37,211,102,0.18);border-color:rgba(37,211,102,0.55);transform:translateY(-2px);}

  /* Reveal */
  .reveal{opacity:0;transform:translateY(34px);transition:opacity 0.62s ease,transform 0.62s ease;}
  .reveal.visible{opacity:1;transform:translateY(0);}
  .rd1{transition-delay:0.08s;}.rd2{transition-delay:0.18s;}.rd3{transition-delay:0.28s;}.rd4{transition-delay:0.38s;}
  .stagger>*:nth-child(1){transition-delay:0.05s;}.stagger>*:nth-child(2){transition-delay:0.13s;}
  .stagger>*:nth-child(3){transition-delay:0.21s;}.stagger>*:nth-child(4){transition-delay:0.29s;}

  .cursor-glow{position:fixed;width:360px;height:360px;background:radial-gradient(circle,rgba(0,140,70,0.055),transparent 70%);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.08s ease,top 0.08s ease;}

  @media(max-width:768px){
    .hero-inner{padding:80px 20px 60px;}.container{padding:0 18px;}
    .side-phones{display:none;}.mon-body{width:92vw;}
    .stats-bar{flex-direction:column;}.stat-item{border-right:none;border-bottom:1px solid var(--border);}
    .stat-item:last-child{border-bottom:none;}
  }
`;

/* ─────────────────────── SCREEN GRADIENTS ─────────────────────── */
const screenGrads = {
  app:     "linear-gradient(135deg,#00b86e28,#00d47d14,#00603998)",
  web:     "linear-gradient(135deg,#c9a84c28,#f0c95e14,#00603988)",
  meta:    "linear-gradient(135deg,#3b82f628,#60a5fa14,#00603988)",
  google:  "linear-gradient(135deg,#ef444428,#f8717114,#00603988)",
  gmb:     "linear-gradient(135deg,#10b98128,#34d39914,#00603988)",
  leadgen: "linear-gradient(135deg,#8b5cf628,#a78bfa14,#00603988)",
};

function ScreenFill({ id, label, tagline }) {
  return (
    <div className="scr-fill">
      <div className="scr-grad" style={{ background: screenGrads[id] || screenGrads.app }} />
      <div className="scr-ui">
        {[1,0,1,0,1].map((h,i) => (
          <div key={i} className={`scr-bar${h?" hi":""}`} style={{ width:`${[80,55,70,40,65][i]}%` }} />
        ))}
      </div>
      <div className="scr-label">{label}</div>
      <div className="scr-sub">{tagline}</div>
      <div className="scr-arr"><ArrowRight style={{ width:14, height:14, color:"#fff" }} /></div>
    </div>
  );
}

function SideFill({ g }) {
  return (
    <div className="scr-fill">
      <div className="scr-grad" style={{ background: g }} />
      <div className="scr-ui" style={{ padding:"7px" }}>
        {[80,55,70,40,65].map((w,i) => (
          <div key={i} className={`scr-bar${i===0?" hi":""}`} style={{ width:`${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── DEVICE MOCKUP ─────────────────────── */
function DeviceMockup({ cat }) {
  const isMobile = cat.device === "mobile";
  return (
    <div className="device-stage">
      <div className="side-phones">
        <div className="sp">
          <div className="sp-notch"/><div className="sp-scr"><SideFill g="linear-gradient(135deg,#00b86e33,#00603966)"/></div><div className="sp-bar"/>
        </div>
        <div className="sp">
          <div className="sp-notch"/><div className="sp-scr"><SideFill g="linear-gradient(135deg,#c9a84c33,#00603966)"/></div><div className="sp-bar"/>
        </div>
      </div>

      {isMobile ? (
        <div className="mock-mobile">
          <div className="phone-body">
            <div className="phone-notch"/>
            <div className="phone-screen"><ScreenFill id={cat.id} label={cat.label} tagline={cat.tagline}/></div>
            <div className="phone-bar"/>
          </div>
        </div>
      ) : (
        <div className="mock-desktop">
          <div className="mon-body">
            <div className="mon-screen"><ScreenFill id={cat.id} label={cat.label} tagline={cat.tagline}/></div>
          </div>
          <div className="mon-stand"/><div className="mon-base"/>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────── HOOKS ─────────────────────── */
function useReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.08 }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    };
    const cleanup = run();
    return cleanup;
  }, []);
}
function useCursor() {
  useEffect(() => {
    const c = document.getElementById("pf-cursor");
    if (!c) return;
    const h = (e) => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
}

/* ─────────────────────── MAIN ─────────────────────── */
export default function PortfolioPage() {
  const [active, setActive] = useState("app");
  const cat = categories.find((c) => c.id === active);
  useReveal();
  useCursor();

  const switchTab = (id) => {
    setActive(id);
    // small scroll to showcase
    setTimeout(() => {
      document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <style>{css}</style>
      <div id="pf-cursor" className="cursor-glow"/>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="orb orb-a"/><div className="orb orb-b"/>
        <div className="hero-inner">
          <div className="badge reveal"><Eye style={{width:15,height:15}}/>Our Work — Results That Speak</div>
          <h1 className="reveal rd1">
            Work We're<br/>
            <span className="text-grad">Proud Of.</span>
          </h1>
          <p className="hero-sub reveal rd2">
            From mobile apps and high-converting websites to performance ad campaigns and local SEO — here's how we've helped&nbsp;
            <strong style={{color:"var(--g4)"}}>500+ brands</strong> grow and dominate their markets.
          </p>
          <div className="stats-bar reveal rd3">
            {[
              {val:"500+",lbl:"Projects Delivered"},
              {val:"3.8x",lbl:"Avg ROAS (Ads)"},
              {val:"250+",lbl:"D2C Brands Scaled"},
              {val:"4.9★",lbl:"Client Rating"},
              {val:"8 Yrs",lbl:"In Business"},
            ].map((s,i)=>(
              <div key={i} className="stat-item">
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── PORTFOLIO SHOWCASE ── */}
      <section className="section" id="showcase">
        <div className="container">

          {/* Header */}
          <div className="reveal" style={{textAlign:"center",maxWidth:660,margin:"0 auto 48px"}}>
            <p style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--g3)",marginBottom:12}}>Portfolio</p>
            <div className="glow-line" style={{margin:"0 auto 20px"}}/>
            <h2 className="syne" style={{fontSize:"clamp(1.9rem,4vw,3rem)",fontWeight:800,lineHeight:1.1,letterSpacing:"-0.025em",color:"#fff",marginBottom:14}}>
              Explore Our <span className="text-grad">Work by Category</span>
            </h2>
            <p style={{color:"#8ab09a",fontSize:"0.92rem",lineHeight:1.7}}>
              Select a service to see device mockups and real project results from our portfolio
            </p>
          </div>

          {/* Category tabs */}
          <div className="tab-strip reveal rd1">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`tab-btn ${active===c.id?"active":""}`}
                style={active===c.id?{"--active-color":c.color,borderColor:c.color,color:c.color,boxShadow:`0 0 22px ${c.color}30`}:{}}
                onClick={()=>switchTab(c.id)}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {/* Device mockup */}
          <div key={active} className="reveal">
            <DeviceMockup cat={cat}/>
          </div>

          {/* Active category badge */}
          <div className="reveal" style={{textAlign:"center",marginBottom:36}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(0,96,57,0.1)",border:`1px solid ${cat.color}44`,borderRadius:"99px",padding:"10px 28px"}}>
              <span style={{fontSize:"1.35rem"}}>{cat.emoji}</span>
              <span className="syne" style={{fontWeight:700,fontSize:"1.1rem",color:"#fff"}}>{cat.label}</span>
              <span style={{color:"#8ab09a",fontSize:"0.83rem"}}>— {cat.tagline}</span>
            </div>
          </div>

          {/* Project cards */}
          <div className="proj-grid stagger" style={{marginBottom:44}}>
            {cat.projects.map((p,i)=>(
              <div
                key={`${active}-${i}`} className="proj-card reveal"
                style={{"--pc-bg":`${cat.color}0a`}}
              >
                <div className="proj-tag" style={{background:`${cat.color}18`,border:`1px solid ${cat.color}40`,color:cat.color}}>{p.tag}</div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-stat" style={{color:cat.color,background:`${cat.color}10`,border:`1px solid ${cat.color}30`}}>
                  <Star style={{width:12,height:12,fill:"currentColor"}}/> {p.stat}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal" style={{textAlign:"center"}}>
            <a href="#contact" className="btn-primary">
              <span>Start Your Project</span>
              <ArrowRight style={{width:18,height:18}}/>
            </a>
            <p style={{marginTop:14,color:"#5a7a6a",fontSize:"0.8rem"}}>Free consultation · No contracts · Results in days</p>
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── ALL SERVICES QUICK GRID ── */}
      <section className="section" style={{background:"var(--dark2)",padding:"76px 0"}}>
        <div className="container">
          <div className="reveal" style={{textAlign:"center",marginBottom:48}}>
            <h2 className="syne" style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#fff",marginBottom:10}}>
              All Services. <span className="text-grad-gold">One Agency.</span>
            </h2>
            <p style={{color:"#8ab09a",fontSize:"0.9rem"}}>Tap any service to explore our work</p>
          </div>
          <div className="quick-grid stagger">
            {categories.map((c)=>(
              <div
                key={c.id} className="q-chip reveal"
                style={{
                  border:`1px solid ${active===c.id?c.color+"55":"rgba(0,180,110,0.15)"}`,
                  background:active===c.id?`${c.color}12`:"rgba(0,96,57,0.07)",
                  boxShadow:active===c.id?`0 0 28px ${c.color}1a`:"none",
                }}
                onClick={()=>{ switchTab(c.id); window.scrollTo({top:0,behavior:"smooth"}); }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor=c.color+"66";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.borderColor=active===c.id?c.color+"55":"rgba(0,180,110,0.15)";}}
              >
                <span className="q-emoji">{c.emoji}</span>
                <p className="q-name" style={{color:active===c.id?c.color:"#e8f5ee"}}>{c.label}</p>
                <p className="q-tag">{c.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── FINAL CTA ── */}
      <section style={{padding:"96px 32px",textAlign:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#003520 0%,#005030 40%,#003a22 100%)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 2px 2px,rgba(0,180,110,0.1) 1px,transparent 0)",backgroundSize:"40px 40px"}}/>
        <div className="orb" style={{width:"500px",height:"500px",background:"radial-gradient(circle,rgba(0,130,70,0.2),transparent 70%)",top:"-20%",left:"-10%",opacity:0.5}}/>
        <div className="orb" style={{width:"380px",height:"380px",background:"radial-gradient(circle,rgba(201,168,76,0.12),transparent 70%)",bottom:"-10%",right:"-5%",animationDelay:"3s",opacity:0.5}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:700,margin:"0 auto"}}>
          <div className="glow-line reveal" style={{margin:"0 auto 26px"}}/>
          <h2 className="syne reveal rd1" style={{fontSize:"clamp(2rem,4vw,3.1rem)",fontWeight:800,color:"#fff",marginBottom:18,lineHeight:1.08}}>
            Want Results Like These<br/>
            <span className="text-grad-gold">For Your Brand?</span>
          </h2>
          <p className="reveal rd2" style={{color:"rgba(255,255,255,0.7)",fontSize:"1.02rem",marginBottom:42,lineHeight:1.72}}>
            App, website, paid ads or local SEO — whatever you need, we deliver it with measurable, trackable results you can see every week.
          </p>
          <div className="reveal rd3" style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:14}}>
            <a href="#contact" className="btn-primary" style={{fontSize:"1.02rem",padding:"16px 40px"}}>
              <span>Let's Work Together</span>
              <ArrowRight style={{width:20,height:20}}/>
            </a>
            <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="btn-wa" style={{fontSize:"1rem",padding:"16px 28px"}}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}