import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  Building2,
  Users,
  Target,
  Zap
} from 'lucide-react';

/* ─────────────────────────────── DATA ─────────────────────────────── */
const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    details: "+91 9911689427",
    link: "tel:9911689427",
    gradient: "linear-gradient(135deg, var(--g), var(--g2))"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: "help@roasbadhao.com",
    link: "mailto:help@roasbadhao.com",
    gradient: "linear-gradient(135deg, var(--gold), var(--gold2))"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Office",
    details: "2nd Floor, Plot No 330, Kakrola, Dwarka Mor, Delhi 110059",
    link: "https://maps.google.com/?q=Kakrola+Dwarka+Mor+Delhi",
    gradient: "linear-gradient(135deg, var(--g2), var(--g3))"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Working Hours",
    details: "Mon - Sat: 10:00 AM - 07:00 PM",
    gradient: "linear-gradient(135deg, var(--g3), var(--gold))"
  }
];

const reasons = [
  { icon: <Target className="w-6 h-6" />, title: "Performance-First Approach", description: "We focus on delivering measurable ROI, not vanity metrics" },
  { icon: <Users className="w-6 h-6" />, title: "Founder-Led Strategy", description: "Direct involvement from leadership in your campaigns" },
  { icon: <Zap className="w-6 h-6" />, title: "Quick Response Time", description: "We respond to all inquiries within 24 hours" },
  { icon: <CheckCircle2 className="w-6 h-6" />, title: "Transparent Communication", description: "Clear, honest updates throughout our engagement" }
];

const services = [
  "Meta Ads Management", "Google Ads Campaigns",
  "GMB Optimisation", "Website Design",
  "Lead Generation", "E-commerce Sales"
];

/* ─────────────────────── STYLES ─────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --g: #006039;
    --g2: #008a52;
    --g3: #00b86e;
    --g4: #00d47d;
    --gold: #c9a84c;
    --gold2: #f0c95e;
    --dark: #010d08;
    --dark2: #031a0f;
    --dark3: #052918;
    --border: rgba(0,180,110,0.18);
  }

  .cp-root {
    font-family:'Poppins', sans-serif;
    background: var(--dark);
    color: #e8f5ee;
    overflow-x: hidden;
    position: relative;
  }

  .cp-root::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  /* ── HERO ── */
  .cp-hero {
    position: relative; min-height: 70vh;
    display: flex; align-items: center; overflow: hidden;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,140,70,0.18), transparent 70%), var(--dark);
  }

  .cp-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(0,180,110,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,110,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    animation: cpGridScroll 20s linear infinite;
  }
  @keyframes cpGridScroll {
    from { background-position: 0 0; }
    to   { background-position: 60px 60px; }
  }

  .cp-orb {
    position: absolute; border-radius: 50%;
    filter: blur(90px); pointer-events: none;
  }
  .cp-orb1 { width: 500px; height: 500px; top: -100px; left: -100px; background: radial-gradient(circle, rgba(0,140,70,0.22), transparent 70%); }
  .cp-orb2 { width: 400px; height: 400px; bottom: -80px; right: -80px; background: radial-gradient(circle, rgba(201,168,76,0.14), transparent 70%); }

  .cp-aura { position: absolute; border-radius: 50%; border: 1px solid rgba(0,180,110,0.25); pointer-events: none; }
  .cp-aura1 { width: 400px; height: 400px; left: -50px; top: 80px; animation: cpRing 4s ease-out infinite; }
  .cp-aura2 { width: 600px; height: 600px; left: -150px; top: -20px; animation: cpRing 4s ease-out 1.4s infinite; }
  @keyframes cpRing {
    0%   { transform: scale(1); opacity: 0.35; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .cp-hero-inner {
    position: relative; z-index: 2;
    max-width: 1280px; 
    padding: 20px 0px;
    width: 100%;
    margin :  0px auto;
  }

  .cp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,96,57,0.2); border: 1px solid rgba(0,180,110,0.3);
    backdrop-filter: blur(12px); padding: 8px 20px; border-radius: 99px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
    color: var(--g4); margin-bottom: 28px;
  }

  .cp-hero h1 {
       font-family: 'Poppins', sans-serif;
    font-size: clamp(2.6rem, 3vw, 5.2rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #fff;
    max-width: 800px; margin-bottom: 24px;
  }

  .cp-grad {
    background: linear-gradient(135deg, var(--g3) 0%, var(--gold2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .cp-grad-gold {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .cp-hero p {
    font-size: clamp(1rem, 2vw, 1.2rem); color: #a3c4b0;
    line-height: 1.7; max-width: 640px; margin-bottom: 40px;
  }

  .cp-hero-btns { display: flex; flex-wrap: wrap; gap: 16px; }

  .cp-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, #00a855, var(--g3));
    color: #fff; padding: 15px 34px; border-radius: 99px;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem;
    border: none; cursor: pointer; text-decoration: none;
    box-shadow: 0 0 30px rgba(0,180,110,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cp-btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 50px rgba(0,180,110,0.6); }

  .cp-btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: #d1edd8;
    padding: 15px 34px; border-radius: 99px;
    font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1rem;
    border: 1.5px solid rgba(0,180,110,0.35); cursor: pointer; text-decoration: none;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .cp-btn-ghost:hover { border-color: var(--g3); background: rgba(0,96,57,0.12); transform: translateY(-2px); }

  /* ── INFO CARDS ── */
  .cp-info-wrap {
    background: linear-gradient(180deg, var(--dark) 0%, var(--dark2) 100%);
    border-top: 1px solid var(--border);
    padding: 80px 0;
  }
  .cp-info-grid {
    max-width: 1280px; margin: 0 auto; padding: 0 48px;
    display: grid; gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .cp-info-card {
    position: relative; overflow: hidden;
    background: rgba(0,96,57,0.08); border: 1px solid var(--border);
    border-radius: 24px; padding: 32px 24px;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .cp-info-card::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(0,180,110,0.1), transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .cp-info-card:hover { transform: translateY(-6px); border-color: rgba(0,212,125,0.4); box-shadow: 0 20px 50px rgba(0,96,57,0.25); }
  .cp-info-card:hover::before { opacity: 1; }

  .cp-info-icon {
    width: 56px; height: 56px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 18px;
    box-shadow: 0 0 20px rgba(0,140,70,0.3);
  }
  .cp-info-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 8px; color: #fff; }
  .cp-info-detail { font-size: 0.88rem; color: #8ab09a; line-height: 1.5; transition: color 0.2s; }
  .cp-info-detail:hover { color: var(--g4); }
  a.cp-info-detail { text-decoration: none; }

  /* ── DIVIDER ── */
  .cp-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,180,110,0.2), rgba(201,168,76,0.15), rgba(0,180,110,0.2), transparent);
  }

  /* ── MAIN SECTION ── */
  .cp-main {
    background: linear-gradient(180deg, var(--dark2) 0%, var(--dark3) 50%, var(--dark2) 100%);
    padding: 100px 0;
  }
  .cp-main-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  }
  @media(max-width: 900px) { .cp-main-inner { grid-template-columns: 1fr; gap: 60px; } .cp-hero-inner, .cp-info-grid, .cp-main-inner { padding-left: 24px; padding-right: 24px; } }

  .cp-section-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g3); margin-bottom: 16px; }

  .cp-section-title {
    font-family: 'Poppins', sans-serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; color: #fff; margin-bottom: 16px;
  }

  .cp-form-lead { color: #8ab09a; font-size: 0.95rem; line-height: 1.7; margin-bottom: 36px; }

  /* ── FORM CARD ── */
  .cp-form-card {
    background: rgba(0,96,57,0.07); border: 1px solid var(--border);
    border-radius: 28px; padding: 48px;
    position: relative; overflow: hidden;
  }
  .cp-form-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--g3), var(--gold2), transparent);
  }

  .cp-form { display: flex; flex-direction: column; gap: 20px; }

  .cp-label { display: block; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--g4); margin-bottom: 8px; }

  .cp-input, .cp-select, .cp-textarea {
    width: 100%; background: rgba(0,50,30,0.3); border: 1px solid var(--border);
    border-radius: 14px; padding: 14px 18px;
    font-family:'Poppins', sans-serif; font-size: 0.95rem; color: #e8f5ee;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    appearance: none;
  }
  .cp-input::placeholder, .cp-textarea::placeholder { color: rgba(163,196,176,0.4); }
  .cp-input:focus, .cp-select:focus, .cp-textarea:focus {
    border-color: var(--g3); background: rgba(0,80,40,0.2);
    box-shadow: 0 0 0 3px rgba(0,180,110,0.12);
  }
  .cp-select option { background: #031a0f; color: #e8f5ee; }
  .cp-textarea { resize: none; }

  .cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media(max-width: 600px) { .cp-row { grid-template-columns: 1fr; } }

  /* radio buttons */
  .cp-radio-group { display: flex; flex-wrap: wrap; gap: 10px; }
  .cp-radio-label {
    display: flex; align-items: center; gap: 8px;
    background: rgba(0,50,30,0.3); border: 1px solid var(--border);
    border-radius: 12px; padding: 11px 20px; cursor: pointer;
    font-size: 0.9rem; color: #b0d4be;
    transition: border-color 0.2s, background 0.2s, color 0.2s;
  }
  .cp-radio-label:hover { border-color: var(--g3); background: rgba(0,80,40,0.2); }
  .cp-radio-label input { accent-color: var(--g3); width: 15px; height: 15px; }
  .cp-radio-label.checked { border-color: var(--g3); background: rgba(0,120,60,0.15); color: var(--g4); }

  /* submit button */
  .cp-submit {
    width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
    background: linear-gradient(135deg, var(--g) 0%, var(--g2) 60%, var(--g3) 100%);
    color: #fff; padding: 18px 32px; border-radius: 14px;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1.05rem;
    border: none; cursor: pointer;
    box-shadow: 0 0 30px rgba(0,140,70,0.4), inset 0 1px 0 rgba(255,255,255,0.12);
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    position: relative; overflow: hidden;
  }
  .cp-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    opacity: 0; transition: opacity 0.3s;
  }
  .cp-submit:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(0,180,110,0.6); }
  .cp-submit:hover::before { opacity: 0.12; }
  .cp-submit span { position: relative; }
  .cp-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .cp-privacy { font-size: 0.8rem; color: rgba(163,196,176,0.45); text-align: center; margin-top: 4px; }

  /* success state */
  .cp-success {
    text-align: center; padding: 60px 20px;
  }
  .cp-success-icon {
    width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
    background: linear-gradient(135deg, var(--g), var(--g3));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 40px rgba(0,180,110,0.5);
    animation: cpPop 0.4s cubic-bezier(.22,.68,0,1.4);
  }
  @keyframes cpPop { from { transform: scale(0); } to { transform: scale(1); } }
  .cp-success h3 { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.5rem; color: var(--g4); margin-bottom: 10px; }
  .cp-success p { color: #8ab09a; font-size: 0.95rem; }

  /* glow line */
  .cp-glow-line { width: 80px; height: 3px; background: linear-gradient(90deg, var(--g3), var(--gold2)); border-radius: 99px; box-shadow: 0 0 12px var(--g3); margin-bottom: 20px; }

  /* ── RIGHT COLUMN ── */
  .cp-reasons { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }

  .cp-reason-card {
    background: rgba(0,96,57,0.07); border: 1px solid var(--border);
    border-radius: 20px; padding: 22px 24px;
    display: flex; align-items: flex-start; gap: 16px;
    transition: transform 0.3s, border-color 0.3s;
  }
  .cp-reason-card:hover { transform: translateX(6px); border-color: rgba(0,212,125,0.35); }

  .cp-reason-icon {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--g), var(--g2));
    display: flex; align-items: center; justify-content: center;
    color: #fff; box-shadow: 0 0 16px rgba(0,140,70,0.3);
  }
  .cp-reason-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 4px; color: #fff; }
  .cp-reason-desc { font-size: 0.85rem; color: #8ab09a; line-height: 1.5; }

  /* services grid */
  .cp-services-box {
    background: rgba(0,96,57,0.08); border: 1px solid var(--border);
    border-radius: 24px; padding: 32px; margin-bottom: 32px;
  }
  .cp-services-box h3 { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.2rem; margin-bottom: 20px; color: #fff; }
  .cp-services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .cp-service-item { display: flex; align-items: center; gap: 8px; font-size: 0.87rem; color: #b0d4be; }
  .cp-service-item svg { color: var(--g3); flex-shrink: 0; }

  /* map & social */
  .cp-map-card {
    background: rgba(0,96,57,0.07); border: 1px solid var(--border);
    border-radius: 24px; overflow: hidden; margin-bottom: 24px;
  }
  .cp-map-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
  .cp-map-header svg { color: var(--g3); }
  .cp-map-header h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; color: #fff; }
  .cp-map-header p { font-size: 0.8rem; color: #8ab09a; margin-top: 2px; }
  .cp-map-frame { width: 100%; height: 220px; display: block; border: none; }

  .cp-social-card {
    background: rgba(0,96,57,0.07); border: 1px solid var(--border);
    border-radius: 20px; padding: 24px;
  }
  .cp-social-card h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 16px; }
  .cp-social-row { display: flex; gap: 12px; }
  .cp-social-btn {
    display: flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(0,50,30,0.4); border: 1px solid var(--border);
    color: #b0d4be; text-decoration: none;
    transition: transform 0.2s, border-color 0.2s, background 0.2s, color 0.2s;
  }
  .cp-social-btn:hover { transform: translateY(-3px) scale(1.1); border-color: var(--g3); background: rgba(0,140,70,0.2); color: var(--g4); }

  /* ── CTA SECTION ── */
  .cp-cta {
    padding: 100px 24px; text-align: center;
    background: linear-gradient(135deg, #003520 0%, #005030 40%, #003a22 100%);
    position: relative; overflow: hidden;
  }
  .cp-cta::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle at 2px 2px, rgba(0,180,110,0.12) 1px, transparent 0);
    background-size: 40px 40px;
  }
  .cp-cta-inner { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; }
  .cp-cta h2 { font-family: 'Poppins', sans-serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; color: #fff; margin-bottom: 16px; line-height: 1.1; }
  .cp-cta p { color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-bottom: 48px; line-height: 1.7; }
  .cp-cta-btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; }

  .cp-spin { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: cpSpin 0.7s linear infinite; }
  @keyframes cpSpin { to { transform: rotate(360deg); } }
`;

/* ─────────────────────── COMPONENT ─────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    businessType: '', message: '', budget: '',
    preferredContact: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({ name:'', email:'', phone:'', businessType:'', message:'', budget:'', preferredContact:'phone' });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <style>{css}</style>
      <div className="cp-root">

        {/* ══════════ HERO ══════════ */}
        <section className="cp-hero">
          <div className="cp-hero-grid" />
          <div className="cp-orb cp-orb1" />
          <div className="cp-orb cp-orb2" />
          <div className="cp-aura cp-aura1" />
          <div className="cp-aura cp-aura2" />
          <div className="cp-hero-inner">
            <div className="cp-badge">
              <Sparkles style={{ width: 16, height: 16 }} />
              Get in Touch with RoasBadhao
            </div>
            <h1>
              Let's Build a<br />
              <span className="cp-grad">High-ROAS Marketing</span><br />
              Strategy Together
            </h1>
            <p>
              Whether you're looking to scale your business or just starting with performance marketing,{' '}
              <strong style={{ color: 'var(--g4)' }}>we're here to help you achieve measurable growth.</strong>
            </p>
            <div className="cp-hero-btns">
              <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="cp-btn-primary">
                <MessageCircle style={{ width: 18, height: 18 }} />
                <span>WhatsApp Us</span>
              </a>
              <a href="tel:9911689427" className="cp-btn-ghost">
                <Phone style={{ width: 18, height: 18 }} />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ══════════ INFO CARDS ══════════ */}
        <div className="cp-info-wrap">
          <div className="cp-info-grid">
            {contactInfo.map((info, i) => (
              <div key={i} className="cp-info-card">
                <div className="cp-info-icon" style={{ background: info.gradient }}>
                  {info.icon}
                </div>
                <div className="cp-info-title">{info.title}</div>
                {info.link ? (
                  <a href={info.link} className="cp-info-detail" target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {info.details}
                  </a>
                ) : (
                  <p className="cp-info-detail">{info.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="cp-divider" />

        {/* ══════════ MAIN: FORM + RIGHT ══════════ */}
        <div className="cp-main">
          <div className="cp-main-inner">

            {/* ── LEFT: FORM ── */}
            <div>
              <p className="cp-section-label">Send Us a Message</p>
              <div className="cp-glow-line" />
              <h2 className="cp-section-title">
                Ready to <span className="cp-grad">Scale Your Business?</span>
              </h2>
              <p className="cp-form-lead">
                Fill out the form below and our team will get back to you within 24 hours with a customized growth strategy for your business.
              </p>

              <div className="cp-form-card">
                {submitSuccess ? (
                  <div className="cp-success">
                    <div className="cp-success-icon">
                      <CheckCircle2 style={{ width: 36, height: 36, color: '#fff' }} />
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="cp-form">
                    <div>
                      <label className="cp-label">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="cp-input" placeholder="Enter your full name" />
                    </div>
                      <div>
                      <label className="cp-label">Business Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="cp-input" placeholder="Enter your Business name" />
                    </div>

                    <div className="cp-row">
                      <div>
                        <label className="cp-label">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="cp-input" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="cp-label">Phone Number *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="cp-input" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>

                    <div className="cp-row">
                      <div>
                        <label className="cp-label">Business Type *</label>
                        <select name="businessType" required value={formData.businessType} onChange={handleChange} className="cp-select">
                          <option value="">Select business type</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="healthcare">Healthcare / Doctors</option>
                          <option value="diagnostics">Diagnostics</option>
                          <option value="d2c">D2C Brand</option>
                          <option value="salon">Salon & Spa</option>
                          <option value="food">Food & Beverage</option>
                          <option value="local">Local Business</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="cp-label">Monthly Budget *</label>
                        <select name="budget" required value={formData.budget} onChange={handleChange} className="cp-select">
                          <option value="">Select budget range</option>
                          <option value="30-50k">₹30,000 – ₹50,000</option>
                          <option value="50-100k">₹50,000 – ₹1,00,000</option>
                          <option value="100-200k">₹1,00,000 – ₹2,00,000</option>
                          <option value="200k+">₹2,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="cp-label">Your Message *</label>
                      <textarea name="message" required rows="5" value={formData.message} onChange={handleChange} className="cp-textarea" placeholder="Tell us about your business goals and what you're looking to achieve..." />
                    </div>

                    <div>
                      <label className="cp-label">Preferred Contact Method *</label>
                      <div className="cp-radio-group">
                        {[
                          { val: 'phone', icon: <Phone style={{ width: 15, height: 15 }} />, label: 'Phone' },
                          { val: 'email', icon: <Mail style={{ width: 15, height: 15 }} />, label: 'Email' },
                          { val: 'whatsapp', icon: <MessageCircle style={{ width: 15, height: 15 }} />, label: 'WhatsApp' },
                        ].map(({ val, icon, label }) => (
                          <label key={val} className={`cp-radio-label${formData.preferredContact === val ? ' checked' : ''}`}>
                            <input type="radio" name="preferredContact" value={val} checked={formData.preferredContact === val} onChange={handleChange} />
                            {icon} {label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="cp-submit">
                      {isSubmitting ? (
                        <><div className="cp-spin" /><span>Sending…</span></>
                      ) : (
                        <><Send style={{ width: 18, height: 18, position: 'relative' }} /><span>Send Message</span></>
                      )}
                    </button>

                    <p className="cp-privacy">🔒 Your information is safe with us. We respect your privacy.</p>
                  </form>
                )}
              </div>
            </div>

            {/* ── RIGHT: INFO ── */}
            <div>
              <p className="cp-section-label">Why Choose Us</p>
              <div className="cp-glow-line" />
              <h2 className="cp-section-title" style={{ marginBottom: 32 }}>
                Why <span className="cp-grad">Work With RoasBadhao?</span>
              </h2>

              <div className="cp-reasons">
                {reasons.map((r, i) => (
                  <div key={i} className="cp-reason-card">
                    <div className="cp-reason-icon">{r.icon}</div>
                    <div>
                      <div className="cp-reason-title">{r.title}</div>
                      <div className="cp-reason-desc">{r.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cp-services-box">
                <h3>Services We Offer</h3>
                <div className="cp-services-grid">
                  {services.map((s, i) => (
                    <div key={i} className="cp-service-item">
                      <CheckCircle2 style={{ width: 15, height: 15 }} />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cp-map-card">
                <div className="cp-map-header">
                  <Building2 style={{ width: 20, height: 20 }} />
                  <div>
                    <h4>Visit Our Office</h4>
                    <p>2nd Floor, Plot No 330, Kakrola, Dwarka Mor, Delhi 110059</p>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5821174839745!2d77.04437931508076!3d28.611799882422716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzQyLjUiTiA3N8KwMDInNDguMyJF!5e0!3m2!1sen!2sin!4v1234567890123"
                  className="cp-map-frame"
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RoasBadhao Office"
                />
              </div>

              <div className="cp-social-card">
                <h4>Connect With Us</h4>
                <div className="cp-social-row">
                  <a href="https://www.facebook.com/roasbadhao" target="_blank" rel="noopener noreferrer" className="cp-social-btn" title="Facebook">
                    <Facebook style={{ width: 20, height: 20 }} />
                  </a>
                  <a href="https://www.instagram.com/roasbadhao/" target="_blank" rel="noopener noreferrer" className="cp-social-btn" title="Instagram">
                    <Instagram style={{ width: 20, height: 20 }} />
                  </a>
                  <a href="https://www.linkedin.com/company/roasbadhao/" target="_blank" rel="noopener noreferrer" className="cp-social-btn" title="LinkedIn">
                    <Linkedin style={{ width: 20, height: 20 }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cp-divider" />

        {/* ══════════ CTA ══════════ */}
        <section className="cp-cta">
          <div className="cp-cta-inner">
            <div className="cp-glow-line" style={{ margin: '0 auto 28px' }} />
            <h2>
              Can't Wait to<br />
              <span className="cp-grad-gold">Get Started?</span>
            </h2>
            <p>Skip the form and reach out to us directly</p>
            <div className="cp-cta-btns">
              <a href="https://wa.me/919911689427" target="_blank" rel="noopener noreferrer" className="cp-btn-primary" style={{ fontSize: '1.05rem', padding: '17px 40px' }}>
                <MessageCircle style={{ width: 20, height: 20 }} />
                <span>WhatsApp Now</span>
              </a>
              <a href="tel:9911689427" className="cp-btn-ghost" style={{ fontSize: '1.05rem', padding: '17px 40px' }}>
                <Phone style={{ width: 20, height: 20 }} />
                Call Us Now
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}