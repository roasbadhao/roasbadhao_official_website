import React, { useState, useEffect } from "react";
import { ChevronDown, Phone, Mail, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from '../../assets/images/roasbadhaoo.png';
import AuditModal from "../AuditModal/AuditModal";

/* ─── shared CSS vars (injected once via Header, used across all files) ─── */
export const THEME_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --g:      #006039;
    --g2:     #007f4c;
    --g3:     #00a862;
    --g4:     #00c975;
    --g5:     #00e888;
    --gold:   #b8952a;
    --gold2:  #e8bf50;
    --gold3:  #ffd97a;
    --dk:     #020e07;
    --dk2:    #041509;
    --dk3:    #071e0d;
    --dk4:    #0a2714;
    --border: rgba(0,200,120,0.14);
    --borderH:rgba(0,200,120,0.32);
    --text:   #e2f0e8;
    --muted:  #7aaa8e;
    --dim:    #3d6e52;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--dk);
    color: var(--text);
    overflow-x: hidden;
  }

  ::-webkit-scrollbar          { width: 3px; }
  ::-webkit-scrollbar-track    { background: var(--dk); }
  ::-webkit-scrollbar-thumb    { background: var(--g2); border-radius: 4px; }

  body::after {
    content: ''; position: fixed; inset: 0; z-index: 9998; pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  #rb-cursor {
    position: fixed; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,160,90,0.055), transparent 65%);
    pointer-events: none; z-index: 9997;
    transform: translate(-50%,-50%);
    transition: left .12s ease, top .12s ease;
  }

  .f-display { font-family:'Poppins',sans-serif }
  .f-body    { font-family: 'Plus Jakarta Sans', sans-serif; }

  .tg {
    background: linear-gradient(130deg, var(--g4) 0%, var(--gold3) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .tg-gold {
    background: linear-gradient(130deg, var(--gold) 0%, var(--gold3) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .glow-line {
    height: 2px; width: 56px; border-radius: 99px;
    background: linear-gradient(90deg, var(--g4), var(--gold3));
    box-shadow: 0 0 10px var(--g4);
  }

  .hdr-logo-box img {
    width: 150px;
    height: 100px;
    object-fit: contain;
  }

  .rb-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,100,60,0.18);
    border: 1px solid rgba(0,200,120,0.22);
    backdrop-filter: blur(10px);
    padding: 8px 18px; border-radius: 99px;
    font-size: 12.5px; font-weight: 600; letter-spacing: .03em;
    color: var(--g4);
  }

  .btn-p {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(130deg, var(--g) 0%, var(--g2) 50%, var(--g3) 100%);
    color: #fff; text-decoration: none;
    padding: 14px 30px; border-radius: 99px;
    font-family:'Poppins',sans-serif font-weight: 700; font-size: 15px;
    position: relative; overflow: hidden; border: none; cursor: pointer;
    box-shadow: 0 0 32px rgba(0,160,90,0.38), inset 0 1px 0 rgba(255,255,255,0.12);
    transition: transform .22s, box-shadow .22s;
  }
  .btn-p::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, var(--gold2), var(--gold3));
    opacity: 0; transition: opacity .3s;
  }
  .btn-p:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 0 55px rgba(0,200,120,0.55); }
  .btn-p:hover::after { opacity: .14; }
  .btn-p > * { position: relative; z-index: 1; }

  .btn-g {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: var(--text); text-decoration: none;
    padding: 13px 28px; border-radius: 99px;
    font-family:'Poppins',sans-serif font-weight: 600; font-size: 15px;
    border: 1.5px solid rgba(0,200,120,0.28); cursor: pointer;
    transition: border-color .2s, background .2s, transform .2s, color .2s;
  }
  .btn-g:hover {
    border-color: var(--g4); background: rgba(0,100,60,0.14);
    color: var(--g4); transform: translateY(-2px);
  }

  .rb-reveal {
    opacity: 0; transform: translateY(36px);
    transition: opacity .75s ease, transform .75s ease;
  }
  .rb-reveal.in { opacity: 1; transform: translateY(0); }
  .rb-d1 { transition-delay: .08s; }
  .rb-d2 { transition-delay: .18s; }
  .rb-d3 { transition-delay: .28s; }
  .rb-d4 { transition-delay: .38s; }
  .rb-d5 { transition-delay: .48s; }
  .rb-d6 { transition-delay: .58s; }

  .rb-hr {
    height: 1px;
    background: linear-gradient(90deg,transparent,rgba(0,200,120,0.16),rgba(232,191,80,0.1),rgba(0,200,120,0.16),transparent);
  }

  .pdot { position:relative; width:8px; height:8px; flex-shrink:0; }
  .pdot::before,.pdot::after { content:''; position:absolute; inset:0; background:var(--g4); border-radius:50%; }
  .pdot::before { animation:pdotA 1.6s ease-out infinite; opacity:.4; }
  @keyframes pdotA { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.6);opacity:0} }
`;

const HDR_CSS = `
  .hdr-top {
    overflow: hidden;
    background: linear-gradient(90deg, #021a0c 0%, #042e16 50%, #021a0c 100%);
    border-bottom: 1px solid rgba(0,200,120,0.1);
    transition: max-height .5s ease, opacity .4s ease;
  }
  .hdr-top.tb-on  { max-height: 48px; opacity: 1; }
  .hdr-top.tb-off { max-height: 0;    opacity: 0; }
  .hdr-top-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 28px;
    height: 48px; display: flex; align-items: center; justify-content: space-between;
  }
  .tb-link {
    display: inline-flex; align-items: center; gap: 7px;
    color: var(--muted); font-size: 12.5px; font-weight: 600; text-decoration: none;
    transition: color .2s, transform .2s;
  }
  .tb-link:hover { color: var(--g4); transform: scale(1.03); }
  .tb-icon {
    width: 24px; height: 24px; border-radius: 7px;
    background: rgba(0,160,90,0.12); display: flex; align-items: center; justify-content: center;
    color: var(--g3); transition: background .2s;
  }
  .tb-link:hover .tb-icon { background: rgba(0,160,90,0.26); }
  .tb-stat { display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 700; color: #a0c8b0; }

  .hdr-main {
    position: sticky; top: 0; z-index: 200;
    transition: background .4s, box-shadow .4s, border-color .4s;
    border-bottom: 1px solid transparent;
  }
  .hdr-main.hdr-top-s {
    background: rgba(2,14,7,0.96); backdrop-filter: blur(24px);
    box-shadow: 0 2px 40px rgba(0,80,40,0.28);
    border-color: rgba(0,200,120,0.18);
  }
  .hdr-main.hdr-top-u {
    background: rgba(2,14,7,0.82); backdrop-filter: blur(12px);
  }

  .hdr-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 28px;
    height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }

  .hdr-logo { display: flex; align-items: center; gap: 11px; text-decoration: none; }
  .hdr-logo-box-wrap { position: relative; }
  .hdr-logo-glow img {
    position: absolute; inset: -4px; border-radius: 16px;
    background: linear-gradient(135deg, var(--g), var(--g3));
    filter: blur(12px); opacity: .35; transition: opacity .3s;
  }
  .hdr-logo:hover .hdr-logo-glow { opacity: .7; }
  .hdr-logo-box { }
  .hdr-logo:hover .hdr-logo-box { transform: scale(1.08) rotate(-2deg); }
  .hdr-logo-txt { display: none; }
  @media(min-width:500px) { .hdr-logo-txt { display: block; } }
  .hdr-logo-name {
    font-family:'Poppins',sans-serif font-weight: 800; font-size: 1.25rem; line-height: 1;
    background: linear-gradient(130deg, var(--g4) 0%, var(--gold3) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hdr-logo-sub {
    font-size: 9.5px; font-weight: 600; letter-spacing: .18em;
    text-transform: uppercase; color: var(--dim); margin-top: 3px;
    display: flex; align-items: center; gap: 4px;
  }

  .hdr-nav { display: none; align-items: center; gap: 2px; }
  @media(min-width:1024px) { .hdr-nav { display: flex; } }

  .nav-a {
    padding: 8px 14px; border-radius: 9px;
    font-family:'Poppins',sans-serif; font-size: 13.5px; 
    color: var(--muted); text-decoration: none;
    transition: color .2s, background .2s;
  }
  .nav-a:hover  { color: var(--g4); background: rgba(0,100,60,0.12); }
  .nav-a.active { color: var(--g4); background: rgba(0,100,60,0.15); }

  .nav-dd-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 8px 14px; border-radius: 9px; border: none; cursor: pointer; background: transparent;
    font-family:'Poppins',sans-serif; font-size: 13.5px; 
    color: var(--muted);
    transition: color .2s, background .2s;
  }
  .nav-dd-btn:hover, .nav-dd-btn.open { color: var(--g4); background: rgba(0,100,60,0.12); }

  .nav-chev { transition: transform .35s; }
  .nav-chev.open { transform: rotate(180deg); }

  .dd-wrap { position: relative; }
  .dd-bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 14px; }
  .dd-box {
    position: absolute; top: calc(100% + 14px); left: 0; min-width: 360px;
    transition: opacity .28s ease, transform .28s ease;
    pointer-events: none; opacity: 0; transform: translateY(-10px);
  }
  .dd-box.open { pointer-events: auto; opacity: 1; transform: translateY(0); }

  .dd-glass {
    background: rgba(4,18,10,0.97); backdrop-filter: blur(28px);
    border: 1px solid rgba(0,200,120,0.18);
    border-radius: 18px; overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,80,40,0.1);
    position: relative;
  }
  .dd-glass::before {
    content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--g4), var(--gold3), var(--g4), transparent);
    opacity: .5;
  }

  .dd-head {
    padding: 13px 18px;
    background: rgba(0,80,40,0.14); border-bottom: 1px solid rgba(0,200,120,0.1);
    display: flex; align-items: center; gap: 8px;
    font-family:'Poppins',sans-serif font-size: 11px; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: var(--g4);
  }

  .dd-item {
    display: flex; align-items: center; gap: 13px;
    padding: 13px 18px; text-decoration: none; color: var(--muted);
    position: relative; overflow: hidden;
    transition: color .2s;
  }
  .dd-item::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(0,100,60,0.1); opacity: 0; transition: opacity .2s;
  }
  .dd-item:hover { color: var(--text); }
  .dd-item:hover::before { opacity: 1; }

  .dd-icon { font-size: 1.45rem; flex-shrink: 0; transition: transform .28s; position: relative; z-index:1; }
  .dd-item:hover .dd-icon { transform: scale(1.22) rotate(-6deg); }

  .dd-body { position: relative; z-index:1; flex:1; min-width:0; }
  .dd-name {
    font-family:'Poppins',sans-serif font-weight: 700; font-size: .875rem;
    color: #c8e8d4; display: flex; justify-content: space-between; align-items: center;
    transition: color .2s;
  }
  .dd-item:hover .dd-name { color: var(--g4); }
  .dd-arrow { opacity: 0; transform: translateX(-8px); transition: opacity .2s, transform .2s; }
  .dd-item:hover .dd-arrow { opacity: 1; transform: translateX(0); }
  .dd-desc { font-size: .76rem; color: var(--dim); margin-top: 2px; transition: color .2s; }
  .dd-item:hover .dd-desc { color: var(--muted); }

  .dd-foot {
    padding: 11px 18px;
    background: rgba(0,80,40,0.1); border-top: 1px solid rgba(0,200,120,0.08);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dd-foot-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-family:'Poppins',sans-serif font-size: 12px; font-weight: 700;
    color: var(--g3); text-decoration: none; transition: color .2s;
  }
  .dd-foot-link:hover { color: var(--gold3); }
  .dd-foot-link svg { transition: transform .2s; }
  .dd-foot-link:hover svg { transform: translateX(4px); }

  .hdr-cta-wrap { display: none; }
  @media(min-width:1024px) { .hdr-cta-wrap { display: flex; align-items: center; gap: 10px; } }

  .hdr-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(130deg, var(--g) 0%, var(--g2) 55%, var(--g3) 100%);
    color: #fff; border: none; cursor: pointer;
    padding: 9px 22px; border-radius: 99px;
    font-family:'Poppins',sans-serif font-weight: 700; font-size: 13.5px;
    position: relative; overflow: hidden;
    box-shadow: 0 0 24px rgba(0,160,90,0.32), inset 0 1px 0 rgba(255,255,255,0.1);
    transition: transform .2s, box-shadow .2s;
  }
  .hdr-cta::before {
    content: ''; position: absolute; top: -50%; left: -60%; width: 30%; height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transform: skewX(-20deg);
    animation: sheen 3s ease-in-out infinite;
  }
  @keyframes sheen {
    0% { left: -60%; opacity: 0; }
    40% { opacity: 1; }
    60% { left: 130%; opacity: 0; }
    100% { left: 130%; opacity: 0; }
  }
  .hdr-cta::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, var(--gold2), var(--gold3));
    opacity: 0; transition: opacity .3s;
  }
  .hdr-cta:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 0 42px rgba(0,200,120,0.5); }
  .hdr-cta:hover::after { opacity: .14; }
  .hdr-cta > * { position: relative; z-index: 1; }

  .hdr-cta-ring {
    position: absolute; inset: -3px; border-radius: 99px;
    border: 1px solid rgba(0,200,120,0.4);
    animation: ringBlink 2.5s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes ringBlink { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.04)} }

  .hdr-ham {
    display: flex; align-items: center; justify-content: center;
    width: 42px; height: 42px; border-radius: 11px; cursor: pointer;
    background: rgba(0,100,60,0.1); border: 1px solid var(--border);
    transition: background .2s; flex-direction: column; gap: 5px;
  }
  .hdr-ham:hover { background: rgba(0,100,60,0.22); }
  @media(min-width:1024px) { .hdr-ham { display: none; } }
  .hdr-ham-bar {
    width: 20px; height: 2px; background: var(--muted); border-radius: 2px;
    transition: transform .4s ease, opacity .3s ease, width .3s ease;
    transform-origin: center;
  }
  .hdr-ham.ham-x .hdr-ham-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hdr-ham.ham-x .hdr-ham-bar:nth-child(2) { opacity: 0; width: 0; }
  .hdr-ham.ham-x .hdr-ham-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mob-menu {
    overflow: hidden;
    transition: max-height .6s cubic-bezier(.22,.68,0,1), opacity .4s ease;
    background: rgba(2,14,7,0.98); backdrop-filter: blur(28px);
    border-top: 1px solid var(--border);
  }
  .mob-menu.mm-off { max-height: 0; opacity: 0; }
  .mob-menu.mm-on  { max-height: 100dvh; opacity: 1; }

  .mob-inner { padding: 24px 24px 40px; position: relative; }
  .mob-deco-a {
    position: absolute; width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,140,80,0.16), transparent 70%);
    top: 0; left: -40px; pointer-events: none;
  }
  .mob-deco-b {
    position: absolute; width: 160px; height: 160px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,160,50,0.1), transparent 70%);
    bottom: 40px; right: -20px; pointer-events: none;
  }

  .mob-nav-a {
    display: flex; align-items: center; gap: 12px; text-decoration: none;
    padding: 13px 0;
    font-family:'Poppins',sans-serif font-weight: 700; font-size: 1.05rem; color: var(--text);
    border-bottom: 1px solid rgba(0,200,120,0.07);
    transition: color .2s, transform .2s;
  }
  .mob-nav-a:hover { color: var(--g4); transform: translateX(5px); }
  .mob-nav-bar { width: 3px; height: 22px; border-radius: 3px; background: linear-gradient(180deg, var(--g3), var(--gold2)); flex-shrink: 0; }

  .mob-sec-title {
    font-family:'Poppins',sans-serif font-size: 10.5px; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase; color: var(--g3);
    margin: 22px 0 10px; display: flex; align-items: center; gap: 8px;
  }
  .mob-sec-title::after { content:''; flex:1; height:1px; background: rgba(0,200,120,0.1); }

  .mob-svc {
    display: flex; align-items: center; gap: 11px; text-decoration: none;
    padding: 9px 0; color: var(--muted);
    transition: color .2s, transform .2s;
  }
  .mob-svc:hover { color: #fff; transform: translateX(5px); }
  .mob-svc-emoji { font-size: 1.4rem; flex-shrink: 0; transition: transform .25s; }
  .mob-svc:hover .mob-svc-emoji { transform: scale(1.18) rotate(-5deg); }
  .mob-svc-name { font-family:'Poppins',sans-serif font-weight: 700; font-size: .88rem; color: #c0ddc8; transition: color .2s; }
  .mob-svc:hover .mob-svc-name { color: var(--g4); }
  .mob-svc-desc { font-size: .72rem; color: var(--dim); margin-top: 1px; }

  .mob-ind-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; padding-left: 4px; }

  .mob-cta-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    background: linear-gradient(130deg, var(--g) 0%, var(--g2) 55%, var(--g3) 100%);
    color: #fff; border: none; cursor: pointer;
    padding: 16px; border-radius: 14px; width: 100%; margin-top: 22px;
    font-family:'Poppins',sans-serif font-weight: 800; font-size: .98rem;
    box-shadow: 0 0 32px rgba(0,160,90,0.32);
    transition: transform .2s, box-shadow .2s;
    position: relative; overflow: hidden;
  }
  .mob-cta-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(130deg,var(--gold2),var(--gold3)); opacity:0; transition:opacity .3s; }
  .mob-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 52px rgba(0,200,120,0.45); }
  .mob-cta-btn:hover::after { opacity:.12; }
  .mob-cta-btn > * { position:relative; z-index:1; }

  .mob-contact {
    display: flex; align-items: center; gap: 13px; text-decoration: none;
    background: rgba(0,80,40,0.1); border: 1px solid rgba(0,200,120,0.1);
    border-radius: 13px; padding: 12px 16px; margin-bottom: 9px;
    transition: background .2s, transform .2s, border-color .2s;
  }
  .mob-contact:hover { background: rgba(0,80,40,0.2); border-color: rgba(0,200,120,0.25); transform: translateX(4px); }
  .mob-contact-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    background: rgba(0,120,70,0.16); display: flex; align-items: center; justify-content: center; color: var(--g3);
  }
  .mob-contact-lbl { font-size: 10px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: var(--dim); }
  .mob-contact-val { font-family:'Poppins',sans-serif font-weight: 700; font-size: .84rem; color: #c0ddc8; margin-top: 1px; }
  .mob-contact:hover .mob-contact-val { color: var(--g4); }

  .mob-trust {
    margin-top: 14px; padding: 11px 16px;
    background: rgba(0,80,40,0.07); border: 1px solid rgba(0,200,120,0.08); border-radius: 11px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 12px; font-weight: 600; color: var(--dim);
  }
`;

export default function Header() {
  const [scrolled,  setScrolled] = useState(false);
  const [topBar,    setTopBar]   = useState(true);
  const [mobOpen,   setMobOpen]  = useState(false);
  const [dd,        setDd]       = useState(null);
  const [auditOpen, setAuditOpen]= useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 24); setTopBar(window.scrollY < 90); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobOpen(false); setDd(null); }, [location]);

  useEffect(() => {
    if (!auditOpen) document.body.style.overflow = mobOpen ? "hidden" : "";
  }, [mobOpen, auditOpen]);

  useEffect(() => {
    const el = document.getElementById("rb-cursor");
    if (!el) return;
    const fn = e => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const openAudit = e => { e?.preventDefault(); setAuditOpen(true); };

  const services = [
    { name:"Meta Ads",         href:"/services/meta-ads",        icon:"📱", desc:"Facebook & Instagram advertising" },
    { name:"Google Ads",       href:"/services/google-ads",      icon:"🔍", desc:"Search, Display & YouTube ads" },
    { name:"GMB Optimisation", href:"/services/gmb",             icon:"📍", desc:"Local SEO & maps visibility" },
    { name:"Website Design",   href:"/services/website-design",  icon:"💻", desc:"Conversion-focused websites" },
    { name:"Lead Generation",  href:"/services/lead-generation", icon:"🎯", desc:"Quality lead systems" },
  ];
  const industries = [
    { name:"Real Estate", href:"/industries/real-estate", icon:"🏢" },
    { name:"Healthcare",  href:"/industries/healthcare",  icon:"🏥" },
    { name:"Salon & Spa", href:"/industries/salon",       icon:"💇" },
    { name:"Food & Bev",  href:"/industries/food",        icon:"🍔" },
    { name:"D2C Brands",  href:"/industries/d2c",         icon:"🛍️" },
  ];

  return (
    <>
      <style>{THEME_CSS + HDR_CSS}</style>
      <div id="rb-cursor" />

      {/* Shared Audit Modal */}
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      {/* TOP BAR */}
      <div className={`hdr-top ${topBar ? "tb-on" : "tb-off"} f-body`}>
        <div className="hdr-top-inner">
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <a href="tel:9911689427" className="tb-link">
              <span className="tb-icon"><Phone style={{width:13,height:13}}/></span>
              +91 99116 89427
            </a>
            <a href="mailto:help@roasbadhao.com" className="tb-link">
              <span className="tb-icon"><Mail style={{width:13,height:13}}/></span>
              help@roasbadhao.com
            </a>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div className="tb-stat"><div className="pdot"/>₹2 Cr+ Ad Spend Managed</div>
            <span style={{color:"rgba(120,180,140,0.25)",fontSize:12}}>•</span>
            <div className="tb-stat"><TrendingUp style={{width:13,height:13,color:"var(--g4)"}}/> ₹7.5 Cr+ Revenue Generated</div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`hdr-main ${scrolled ? "hdr-top-s" : "hdr-top-u"}`}>
        <div className="hdr-inner">

          {/* Logo */}
          <Link to="/" className="hdr-logo">
            <div className="hdr-logo-box-wrap">
              <div className="hdr-logo-glow"/>
              <div className="hdr-logo-box f-display"><img src={logo} alt="RoasBadhao" /></div>
            </div>
            <div className="hdr-logo-txt">
              <div className="hdr-logo-name"></div>
              <div className="hdr-logo-sub"><Sparkles style={{width:9,height:9}}/>Performance Marketing</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-nav">
            <NavLink to="/" className={({isActive})=>`nav-a${isActive?" active":""}`}>Home</NavLink>

            <div className="dd-wrap" onMouseEnter={()=>setDd("svc")} onMouseLeave={()=>setDd(null)}>
              <button className={`nav-dd-btn${dd==="svc"?" open":""}`}>
                Services
                <ChevronDown style={{width:14,height:14}} className={`nav-chev${dd==="svc"?" open":""}`}/>
              </button>
              <div className="dd-bridge"/>
              <div className={`dd-box${dd==="svc"?" open":""}`}>
                <div className="dd-glass">
                  <div className="dd-head"><Sparkles style={{width:12,height:12}}/>Our Services</div>
                  {services.map((s,i)=>(
                    <Link key={i} to={s.href} className="dd-item">
                      <span className="dd-icon">{s.icon}</span>
                      <div className="dd-body">
                        <div className="dd-name">{s.name}<ArrowRight className="dd-arrow" style={{width:13,height:13}}/></div>
                        <div className="dd-desc">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="dd-foot">
                    <Link to="/services" className="dd-foot-link">View All Services<ArrowRight style={{width:12,height:12}}/></Link>
                    <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"var(--dim)"}}>
                      <div className="pdot"/>6 services
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dd-wrap" onMouseEnter={()=>setDd("ind")} onMouseLeave={()=>setDd(null)}>
              <button className={`nav-dd-btn${dd==="ind"?" open":""}`}>
                Industries
                <ChevronDown style={{width:14,height:14}} className={`nav-chev${dd==="ind"?" open":""}`}/>
              </button>
              <div className="dd-bridge"/>
              <div className={`dd-box${dd==="ind"?" open":""}`} style={{minWidth:280}}>
                <div className="dd-glass">
                  <div className="dd-head"><TrendingUp style={{width:12,height:12}}/>Industries We Serve</div>
                  {industries.map((ind,i)=>(
                    <Link key={i} to={ind.href} className="dd-item">
                      <span className="dd-icon">{ind.icon}</span>
                      <div className="dd-body">
                        <div className="dd-name">{ind.name}<ArrowRight className="dd-arrow" style={{width:13,height:13}}/></div>
                      </div>
                    </Link>
                  ))}
                  <div className="dd-foot">
                    <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"var(--dim)"}}>
                      <div className="pdot"/>200+ clients across India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/portfolio" className={({isActive})=>`nav-a${isActive?" active":""}`}>Portfolio</NavLink>
            <NavLink to="/about"     className={({isActive})=>`nav-a${isActive?" active":""}`}>About</NavLink>
            <NavLink to="/contact"   className={({isActive})=>`nav-a${isActive?" active":""}`}>Contact</NavLink>
                        <NavLink to="/career"   className={({isActive})=>`nav-a${isActive?" active":""}`}>Career</NavLink>

          </nav>

          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div className="hdr-cta-wrap">
              <div style={{position:"relative"}}>
                <div className="hdr-cta-ring"/>
                <button onClick={openAudit} className="hdr-cta">
                  <Sparkles style={{width:14,height:14}}/>
                  <span>Free Audit</span>
                  <ArrowRight style={{width:13,height:13}}/>
                </button>
              </div>
            </div>

            <button className={`hdr-ham${mobOpen?" ham-x":""}`} onClick={()=>setMobOpen(!mobOpen)} aria-label="Menu">
              <span className="hdr-ham-bar"/>
              <span className="hdr-ham-bar"/>
              <span className="hdr-ham-bar"/>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mob-menu ${mobOpen?"mm-on":"mm-off"}`}>
          <div className="mob-inner">
            <div className="mob-deco-a"/><div className="mob-deco-b"/>
            <div style={{position:"relative",zIndex:2}}>

              <Link to="/" className="mob-nav-a"><div className="mob-nav-bar"/>Home</Link>

              <p className="mob-sec-title">Services</p>
              <div style={{paddingLeft:8}}>
                {services.map((s,i)=>(
                  <Link key={i} to={s.href} className="mob-svc">
                    <span className="mob-svc-emoji">{s.icon}</span>
                    <div><div className="mob-svc-name">{s.name}</div><div className="mob-svc-desc">{s.desc}</div></div>
                  </Link>
                ))}
              </div>

              <p className="mob-sec-title">Industries</p>
              <div className="mob-ind-grid" style={{paddingLeft:4}}>
                {industries.map((ind,i)=>(
                  <Link key={i} to={ind.href} className="mob-svc">
                    <span className="mob-svc-emoji" style={{fontSize:"1.25rem"}}>{ind.icon}</span>
                    <div className="mob-svc-name">{ind.name}</div>
                  </Link>
                ))}
              </div>

              <Link to="/portfolio" className="mob-nav-a"><div className="mob-nav-bar"/>Portfolio</Link>
              <Link to="/about"     className="mob-nav-a"><div className="mob-nav-bar"/>About Us</Link>
              <Link to="/contact"   className="mob-nav-a"><div className="mob-nav-bar"/>Contact</Link>
              

              <button onClick={openAudit} className="mob-cta-btn">
                <Sparkles style={{width:17,height:17}}/><span>Get Free Growth Audit</span>
                <ArrowRight style={{width:16,height:16}}/>
              </button>

              <p className="mob-sec-title" style={{marginTop:26}}>Reach Us</p>
              <a href="tel:9911689427" className="mob-contact">
                <div className="mob-contact-icon"><Phone style={{width:16,height:16}}/></div>
                <div><div className="mob-contact-lbl">Call</div><div className="mob-contact-val">+91 99116 89427</div></div>
              </a>
              <a href="mailto:help@roasbadhao.com" className="mob-contact">
                <div className="mob-contact-icon"><Mail style={{width:16,height:16}}/></div>
                <div><div className="mob-contact-lbl">Email</div><div className="mob-contact-val">help@roasbadhao.com</div></div>
              </a>

              <div className="mob-trust"><div className="pdot"/>Trusted by 200+ businesses across India</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
