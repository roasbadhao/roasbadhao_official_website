import React, { useState, useEffect, useRef } from "react";
import {
  X, Sparkles, ArrowRight, CheckCircle, Zap, Target, BarChart3,
  User, Building2, MessageSquare, Phone, Mail, TrendingUp
} from "lucide-react";

const MODAL_CSS = `
  /* ══════════════════════════════════════════════
     FREE AUDIT MODAL — PREMIUM, FULLY RESPONSIVE
     No overflow. No scroll issues. Screen-fit.
  ══════════════════════════════════════════════ */

  .audit-overlay {
    position: fixed; inset: 0; z-index: 9000;
    background: rgba(1,8,4,0.92);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    opacity: 0; pointer-events: none;
    transition: opacity .35s ease;
    /* prevent any stray overflow */
    overflow: hidden;
  }
  .audit-overlay.open {
    opacity: 1; pointer-events: auto;
  }

  /* ── MODAL SHELL ── */
  .audit-modal {
    position: relative;
    width: 100%;
    max-width: 600px;
    /* key: fills available height minus padding, never overflows */
    max-height: calc(100dvh - 32px);
    display: flex;
    flex-direction: column;
    background: linear-gradient(145deg, #041509 0%, #021007 55%, #061a0b 100%);
    border: 1px solid rgba(0,200,120,0.22);
    border-radius: 24px;
    overflow: hidden; /* clips decorations */
    transform: scale(0.92) translateY(24px);
    transition: transform .42s cubic-bezier(.175,.885,.32,1.275);
    box-shadow:
      0 0 0 1px rgba(0,200,120,0.06),
      0 40px 100px rgba(0,0,0,0.75),
      0 0 80px rgba(0,100,60,0.1);
  }
  .audit-overlay.open .audit-modal {
    transform: scale(1) translateY(0);
  }

  /* top glow line */
  .audit-modal-topline {
    position: absolute; top: 0; left: 12%; right: 12%; height: 1px; z-index: 4;
    background: linear-gradient(90deg, transparent, var(--g4), var(--gold3), var(--g4), transparent);
    opacity: .6;
    pointer-events: none;
  }

  /* scan animation */
  .audit-scan-line {
    position: absolute; left: 0; right: 0; height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(0,200,120,0.7), transparent);
    z-index: 3; pointer-events: none;
    animation: scanMove 4s ease-in-out infinite;
    top: 0;
  }
  @keyframes scanMove {
    0%   { top: 0%;   opacity: .8; }
    45%  { opacity: .25; }
    100% { top: 100%; opacity: 0; }
  }

  /* corner brackets */
  .audit-corner {
    position: absolute; width: 18px; height: 18px;
    pointer-events: none; z-index: 5;
  }
  .audit-corner-tl { top: 14px; left: 14px; border-top: 1.5px solid var(--g4); border-left: 1.5px solid var(--g4); border-radius: 3px 0 0 0; }
  .audit-corner-tr { top: 14px; right: 14px; border-top: 1.5px solid var(--g4); border-right: 1.5px solid var(--g4); border-radius: 0 3px 0 0; }
  .audit-corner-bl { bottom: 14px; left: 14px; border-bottom: 1.5px solid var(--g4); border-left: 1.5px solid var(--g4); border-radius: 0 0 0 3px; }
  .audit-corner-br { bottom: 14px; right: 14px; border-bottom: 1.5px solid var(--g4); border-right: 1.5px solid var(--g4); border-radius: 0 0 3px 0; }

  /* bg orbs — decorative only */
  .audit-orb-a {
    position: absolute; bottom: -80px; left: -80px;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,160,90,0.07), transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .audit-orb-b {
    position: absolute; top: -40px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,149,42,0.06), transparent 70%);
    pointer-events: none; z-index: 0;
  }

  /* close button */
  .audit-close {
    position: absolute; top: 14px; right: 14px; z-index: 20;
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(0,60,30,0.35); border: 1px solid rgba(0,200,120,0.14);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); cursor: pointer; flex-shrink: 0;
    transition: background .2s, color .2s, transform .25s, border-color .2s;
  }
  .audit-close:hover {
    background: rgba(200,50,50,0.16); border-color: rgba(220,80,80,0.32);
    color: #f87171; transform: rotate(90deg) scale(1.1);
  }

  /* ── SCROLLABLE CONTENT AREA ── */
  .audit-scroll-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    /* smooth momentum on iOS */
    -webkit-overflow-scrolling: touch;
    /* thin styled scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(0,160,90,0.25) transparent;
    position: relative; z-index: 2;
  }
  .audit-scroll-body::-webkit-scrollbar { width: 3px; }
  .audit-scroll-body::-webkit-scrollbar-track { background: transparent; }
  .audit-scroll-body::-webkit-scrollbar-thumb { background: rgba(0,160,90,0.25); border-radius: 4px; }

  /* fade hint at bottom when scrollable */
  .audit-scroll-fade {
    position: absolute; bottom: 0; left: 0; right: 0; height: 32px; z-index: 6;
    background: linear-gradient(transparent, rgba(4,21,9,0.9));
    pointer-events: none;
    opacity: 0; transition: opacity .3s;
  }
  .audit-scroll-fade.visible { opacity: 1; }

  /* ── HEADER SECTION ── */
  .audit-header {
    padding: 32px 28px 22px;
    position: relative;
  }
  @media(min-width: 480px) { .audit-header { padding: 36px 36px 24px; } }

  .audit-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(0,200,120,0.08);
    border: 1px solid rgba(0,200,120,0.2);
    padding: 4px 13px; border-radius: 99px;
    font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--g4); margin-bottom: 14px;
  }

  .audit-title {
    font-family:'Poppins',sans-serif font-weight: 900;
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.12; color: var(--text); margin-bottom: 9px;
  }
  .audit-subtitle {
    font-size: 13.5px; color: var(--muted); line-height: 1.65;
  }

  .audit-benefits {
    display: flex; gap: 7px; margin-top: 16px; flex-wrap: wrap;
  }
  .audit-benefit-chip {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(0,80,40,0.2); border: 1px solid rgba(0,200,120,0.12);
    padding: 4px 11px; border-radius: 7px;
    font-size: 11px; font-weight: 600; color: #9ed4b8;
  }

  .audit-divider {
    height: 1px; margin: 0 28px;
    background: linear-gradient(90deg, transparent, rgba(0,200,120,0.15), transparent);
  }
  @media(min-width:480px) { .audit-divider { margin: 0 36px; } }

  /* ── FORM BODY ── */
  .audit-body {
    padding: 22px 28px 28px;
    position: relative;
  }
  @media(min-width:480px) { .audit-body { padding: 24px 36px 32px; } }

  .audit-form-grid {
    display: grid; grid-template-columns: 1fr; gap: 12px;
  }
  @media(min-width:440px) { .audit-form-grid { grid-template-columns: 1fr 1fr; } }
  .audit-form-full { grid-column: 1 / -1; }

  .audit-field { display: flex; flex-direction: column; gap: 6px; }

  .audit-label {
    font-family:'Poppins',sans-serif font-size: 11px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase; color: var(--g3);
    display: flex; align-items: center; gap: 5px;
  }

  .audit-input, .audit-select, .audit-textarea {
    background: rgba(0,60,30,0.2);
    border: 1px solid rgba(0,200,120,0.15);
    border-radius: 11px;
    padding: 11px 14px;
    color: var(--text);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    width: 100%; outline: none;
    transition: border-color .22s, background .22s, box-shadow .22s;
    -webkit-appearance: none;
  }
  .audit-input::placeholder, .audit-textarea::placeholder { color: var(--dim); }
  .audit-input:focus, .audit-select:focus, .audit-textarea:focus {
    border-color: rgba(0,200,120,0.42);
    background: rgba(0,80,40,0.2);
    box-shadow: 0 0 0 3px rgba(0,200,120,0.07), 0 0 18px rgba(0,150,80,0.1);
  }
  .audit-select { cursor: pointer; color: var(--text); }
  .audit-select option { background: #041509; color: var(--text); }
  .audit-textarea {
    resize: none; min-height: 72px; max-height: 100px;
    line-height: 1.6;
  }

  .audit-input-wrap { position: relative; }
  .audit-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--dim); pointer-events: none; display: flex; align-items: center;
  }
  .audit-input-wrap .audit-input { padding-left: 40px; }

  /* ── SUBMIT BUTTON ── */
  .audit-submit {
    width: 100%; margin-top: 16px;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    background: linear-gradient(130deg, var(--g) 0%, var(--g2) 50%, var(--g3) 100%);
    color: #fff; border: none; cursor: pointer;
    padding: 14px 28px; border-radius: 13px;
    font-family:'Poppins',sans-serif font-weight: 800; font-size: 14.5px;
    position: relative; overflow: hidden;
    box-shadow: 0 0 28px rgba(0,160,90,0.32), inset 0 1px 0 rgba(255,255,255,0.1);
    transition: transform .22s, box-shadow .22s;
  }
  .audit-submit::before {
    content: ''; position: absolute; top: -50%; left: -60%; width: 28%; height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
    transform: skewX(-20deg);
    animation: auditSheen 2.8s ease-in-out infinite;
  }
  @keyframes auditSheen {
    0%   { left: -60%; opacity: 0; }
    35%  { opacity: 1; }
    55%  { left: 130%; opacity: 0; }
    100% { left: 130%; opacity: 0; }
  }
  .audit-submit::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, var(--gold2), var(--gold3));
    opacity: 0; transition: opacity .3s;
  }
  .audit-submit:hover { transform: translateY(-2px) scale(1.015); box-shadow: 0 0 50px rgba(0,200,120,0.5); }
  .audit-submit:hover::after { opacity: .13; }
  .audit-submit > * { position: relative; z-index: 1; }
  .audit-submit:disabled { opacity: .65; cursor: not-allowed; transform: none; }

  /* trust row */
  .audit-trust-row {
    display: flex; align-items: center; justify-content: center;
    gap: 10px 16px; margin-top: 13px; flex-wrap: wrap;
  }
  .audit-trust-item {
    display: flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; color: var(--dim);
  }

  /* spinner */
  .audit-spinner {
    width: 17px; height: 17px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.28);
    border-top-color: #fff;
    animation: auditSpin .7s linear infinite;
  }
  @keyframes auditSpin { to { transform: rotate(360deg); } }

  /* ── SUCCESS STATE ── */
  .audit-success {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 48px 32px 52px;
    position: relative; z-index: 2;
    min-height: 320px; justify-content: center;
  }

  .audit-success-icon-wrap { position: relative; margin-bottom: 22px; }
  .audit-success-icon {
    width: 76px; height: 76px; border-radius: 50%;
    background: linear-gradient(135deg, var(--g), var(--g3));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 55px rgba(0,180,100,0.38);
    animation: successPop .5s cubic-bezier(.175,.885,.32,1.275) both;
    position: relative; z-index: 1;
  }
  @keyframes successPop {
    0%   { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .audit-success-ripple {
    position: absolute; inset: -8px; border-radius: 50%;
    border: 1.5px solid rgba(0,200,120,0.28);
    animation: rippleOut 1.9s ease-out infinite;
  }
  .audit-success-ripple:nth-child(2) { animation-delay: .65s; }
  @keyframes rippleOut {
    0%   { transform: scale(.75); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  .audit-success-title {
    font-family:'Poppins',sans-serif font-weight: 900;
    font-size: clamp(1.4rem, 5vw, 1.7rem);
    margin-bottom: 10px;
    background: linear-gradient(130deg, var(--g4), var(--gold3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .audit-success-sub {
    font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 360px;
  }
  .audit-success-steps {
    display: flex; gap: 10px; margin-top: 24px;
    flex-wrap: wrap; justify-content: center;
  }
  .audit-success-step {
    background: rgba(0,80,40,0.18); border: 1px solid rgba(0,200,120,0.13);
    border-radius: 11px; padding: 10px 14px; text-align: left; min-width: 130px;
    animation: stepFadeIn .4s ease both;
  }
  .audit-success-step:nth-child(1) { animation-delay: .15s; }
  .audit-success-step:nth-child(2) { animation-delay: .28s; }
  .audit-success-step:nth-child(3) { animation-delay: .41s; }
  @keyframes stepFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .audit-success-step-num {
    font-family:'Poppins',sans-serif font-size: 10.5px; font-weight: 700;
    color: var(--g4); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 3px;
  }
  .audit-success-step-txt { font-size: 12px; color: var(--muted); font-weight: 500; }

  /* ── MOBILE TWEAKS ── */
  @media(max-width: 380px) {
    .audit-header  { padding: 28px 20px 18px; }
    .audit-body    { padding: 18px 20px 24px; }
    .audit-divider { margin: 0 20px; }
    .audit-title   { font-size: 1.35rem; }
    .audit-benefits { gap: 5px; }
    .audit-benefit-chip { font-size: 10px; padding: 3px 9px; }
  }
`;

export default function AuditModal({ open, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [showFade,   setShowFade]   = useState(false);
  const [formData,   setFormData]   = useState({
    name:"", phone:"", email:"", business:"", service:"", budget:"", goal:""
  });
  const scrollRef = useRef(null);

  // Reset on reopen
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setFormData({ name:"", phone:"", email:"", business:"", service:"", budget:"", goal:"" });
      // scroll to top
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, 50);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const fn = e => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  // Lock body scroll — only when overlay is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Scroll fade hint — shows when content is scrollable & not at bottom
  const handleScroll = e => {
    const el = e.currentTarget;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
    setShowFade(!atBottom && el.scrollHeight > el.clientHeight);
  };

  // Check on mount / resize if content overflows
  useEffect(() => {
    if (!open) return;
    const check = () => {
      const el = scrollRef.current;
      if (!el) return;
      setShowFade(el.scrollHeight > el.clientHeight + 8);
    };
    const t = setTimeout(check, 100);
    window.addEventListener("resize", check);
    return () => { clearTimeout(t); window.removeEventListener("resize", check); };
  }, [open, submitted]);

  const handleChange = e =>
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    // ── Replace with your API / WhatsApp / CRM call ──
    // const msg = encodeURIComponent(`New Audit!\nName: ${formData.name}\nPhone: ${formData.phone}\nBusiness: ${formData.business}\nService: ${formData.service}\nBudget: ${formData.budget}`);
    // window.open(`https://wa.me/919911689427?text=${msg}`, "_blank");
    await new Promise(r => setTimeout(r, 1700));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{MODAL_CSS}</style>
      <div
        className={`audit-overlay${open ? " open" : ""}`}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        aria-hidden={!open}
      >
        <div
          className="audit-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Free Growth Audit"
        >
          {/* Static decorations — outside scroll area */}
          <div className="audit-modal-topline"/>
          <div className="audit-scan-line"/>
          <div className="audit-corner audit-corner-tl"/>
          <div className="audit-corner audit-corner-tr"/>
          <div className="audit-corner audit-corner-bl"/>
          <div className="audit-corner audit-corner-br"/>
          <div className="audit-orb-a"/>
          <div className="audit-orb-b"/>

          {/* Close button — always visible, outside scroll */}
          <button className="audit-close" onClick={onClose} aria-label="Close modal">
            <X style={{width:15,height:15}}/>
          </button>

          {/* ── SCROLLABLE CONTENT ── */}
          <div
            className="audit-scroll-body"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {!submitted ? (
              <>
                {/* Header */}
                <div className="audit-header">
                  <div className="audit-badge">
                    <div className="pdot"/>Free Growth Audit — Limited Slots
                  </div>
                  <h2 className="audit-title">
                    Unlock Your{" "}
                    <span style={{
                      background:"linear-gradient(130deg,var(--g4),var(--gold3))",
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
                    }}>
                      Hidden Revenue
                    </span>
                  </h2>
                  <p className="audit-subtitle">
                    Get a personalized analysis of your ad accounts, website, and growth leaks — completely free.
                  </p>
                  <div className="audit-benefits">
                    <span className="audit-benefit-chip">
                      <Zap style={{width:10,height:10,color:"var(--gold3)"}}/>Ad Account Review
                    </span>
                    <span className="audit-benefit-chip">
                      <Target style={{width:10,height:10,color:"var(--g4)"}}/>ROAS Boost Plan
                    </span>
                    <span className="audit-benefit-chip">
                      <BarChart3 style={{width:10,height:10,color:"var(--gold2)"}}/>Competitor Analysis
                    </span>
                  </div>
                </div>

                <div className="audit-divider"/>

                {/* Form */}
                <div className="audit-body">
                  <form onSubmit={handleSubmit}>
                    <div className="audit-form-grid">

                      <div className="audit-field">
                        <label className="audit-label"><User style={{width:10,height:10}}/>Your Name</label>
                        <div className="audit-input-wrap">
                          <span className="audit-input-icon"><User style={{width:13,height:13}}/></span>
                          <input
                            className="audit-input" name="name"
                            placeholder="Rahul Sharma" required
                            value={formData.name} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="audit-field">
                        <label className="audit-label"><Phone style={{width:10,height:10}}/>Phone</label>
                        <div className="audit-input-wrap">
                          <span className="audit-input-icon"><Phone style={{width:13,height:13}}/></span>
                          <input
                            className="audit-input" name="phone"
                            placeholder="+91 98765 43210" required
                            value={formData.phone} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="audit-field">
                        <label className="audit-label"><Mail style={{width:10,height:10}}/>Email</label>
                        <div className="audit-input-wrap">
                          <span className="audit-input-icon"><Mail style={{width:13,height:13}}/></span>
                          <input
                            className="audit-input" type="email" name="email"
                            placeholder="you@company.com" required
                            value={formData.email} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="audit-field">
                        <label className="audit-label"><Building2 style={{width:10,height:10}}/>Business</label>
                        <div className="audit-input-wrap">
                          <span className="audit-input-icon"><Building2 style={{width:13,height:13}}/></span>
                          <input
                            className="audit-input" name="business"
                            placeholder="Your Company"
                            value={formData.business} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="audit-field">
                        <label className="audit-label"><Sparkles style={{width:10,height:10}}/>Service</label>
                        <select className="audit-select" name="service" value={formData.service} onChange={handleChange}>
                          <option value="">Select service</option>
                          <option value="meta">Meta Ads</option>
                          <option value="google">Google Ads</option>
                          <option value="gmb">GMB Optimisation</option>
                          <option value="website">Website Design</option>
                          <option value="leadgen">Lead Generation</option>
                          <option value="all">Full Growth Suite</option>
                        </select>
                      </div>

                      <div className="audit-field">
                        <label className="audit-label"><TrendingUp style={{width:10,height:10}}/>Budget/Month</label>
                        <select className="audit-select" name="budget" value={formData.budget} onChange={handleChange}>
                          <option value="">Select range</option>
                          <option value="under30k">Under ₹30,000</option>
                          <option value="30-75k">₹30k – ₹75k</option>
                          <option value="75-2l">₹75k – ₹2 Lakh</option>
                          <option value="2l+">₹2 Lakh+</option>
                        </select>
                      </div>

                      <div className="audit-field audit-form-full">
                        <label className="audit-label"><MessageSquare style={{width:10,height:10}}/>Goal (Optional)</label>
                        <textarea
                          className="audit-textarea" name="goal"
                          placeholder="E.g. Double my leads from Google Ads in 3 months..."
                          value={formData.goal} onChange={handleChange}
                        />
                      </div>
                    </div>

                    <button className="audit-submit" type="submit" disabled={submitting}>
                      {submitting ? (
                        <><div className="audit-spinner"/><span>Sending...</span></>
                      ) : (
                        <><Sparkles style={{width:15,height:15}}/><span>Get My Free Audit Report</span><ArrowRight style={{width:14,height:14}}/></>
                      )}
                    </button>

                    <div className="audit-trust-row">
                      {["100% Free","No Spam","Reply in 24h","200+ Audits Done"].map(t=>(
                        <span key={t} className="audit-trust-item">
                          <CheckCircle style={{width:11,height:11,color:"var(--g4)"}}/>{t}
                        </span>
                      ))}
                    </div>
                  </form>
                </div>
              </>
            ) : (
              /* SUCCESS */
              <div className="audit-success">
                <div className="audit-success-icon-wrap">
                  <div className="audit-success-ripple"/>
                  <div className="audit-success-ripple"/>
                  <div className="audit-success-icon">
                    <CheckCircle style={{width:36,height:36,color:"#fff"}}/>
                  </div>
                </div>
                <h3 className="audit-success-title">You're In! 🚀</h3>
                <p className="audit-success-sub">
                  Our growth specialist will personally review your business and reach out within{" "}
                  <strong style={{color:"var(--g4)"}}>24 hours</strong> with your custom audit report.
                </p>
                <div className="audit-success-steps">
                  {[
                    ["Step 01","We review your ad accounts & website"],
                    ["Step 02","We identify revenue leaks & opportunities"],
                    ["Step 03","You get a free growth roadmap"],
                  ].map(([num,txt])=>(
                    <div key={num} className="audit-success-step">
                      <div className="audit-success-step-num">{num}</div>
                      <div className="audit-success-step-txt">{txt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scroll fade hint — shows when more content below */}
          <div className={`audit-scroll-fade${showFade ? " visible" : ""}`}/>
        </div>
      </div>
    </>
  );
}
