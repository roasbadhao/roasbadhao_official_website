import React, { useState } from "react";
import {
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin,
  Sparkles, ArrowRight, TrendingUp, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import AuditModal from "../AuditModal/AuditModal";

const FTR_CSS = `
  .ftr {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--dk);
    border-top: 1px solid var(--border);
    position: relative; overflow: hidden;
  }

  .ftr::before {
    content: '';
    position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--g4) 30%, var(--gold3) 50%, var(--g4) 70%, transparent);
    opacity: .55;
  }

  .ftr-orb1 {
    position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,120,70,0.1), transparent 68%);
    top: -120px; left: -120px; pointer-events: none;
  }
  .ftr-orb2 {
    position: absolute; width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,160,50,0.07), transparent 68%);
    bottom: 80px; right: -60px; pointer-events: none;
  }

  /* ── CTA STRIP ── */
  .ftr-cta-strip {
    position: relative; z-index: 1;
    background: linear-gradient(135deg, rgba(0,80,40,0.22) 0%, rgba(0,50,25,0.18) 100%);
    border-bottom: 1px solid rgba(0,200,120,0.1);
    padding: 52px 28px;
  }
  .ftr-cta-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 28px; flex-wrap: wrap;
  }
  .ftr-cta-tag {
    display: flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: var(--g4); margin-bottom: 10px;
  }
  .ftr-cta-h {
    font-family:'Poppins',sans-serif font-weight: 800;
    font-size: clamp(1.4rem, 2.8vw, 2rem); color: #fff; line-height: 1.15;
  }
  .ftr-cta-h span {
    background: linear-gradient(130deg, var(--g4), var(--gold3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ftr-cta-sub { font-size: .875rem; color: var(--dim); margin-top: 8px; }

  .ftr-cta-checks { display: flex; flex-wrap: wrap; gap: 10px 20px; margin-top: 16px; }
  .ftr-cta-check {
    display: flex; align-items: center; gap: 6px;
    font-size: .8rem; font-weight: 600; color: var(--muted);
  }

  .ftr-cta-right { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
  @media(min-width:640px) { .ftr-cta-right { align-items: flex-end; } }

  .ftr-cta-stat {
    display: flex; align-items: center; gap: 8px;
    background: rgba(0,80,40,0.16); border: 1px solid rgba(0,200,120,0.12);
    border-radius: 10px; padding: 8px 14px;
    font-size: .8rem; font-weight: 600; color: var(--muted);
  }
  .ftr-cta-stat strong { font-family:'Poppins',sans-serif font-weight: 800; color: var(--g4); }

  /* ── MAIN BODY ── */
  .ftr-body {
    position: relative; z-index: 1;
    max-width: 1280px; margin: 0 auto;
    padding: 64px 28px 52px;
    display: grid; gap: 48px;
    grid-template-columns: 1fr;
  }
  @media(min-width:640px)  { .ftr-body { grid-template-columns: 1fr 1fr; } }
  @media(min-width:1024px) { .ftr-body { grid-template-columns: 2.2fr 1fr 1fr 1.5fr; } }

  /* Brand col */
  .ftr-brand-a { display: flex; align-items: center; gap: 11px; text-decoration: none; margin-bottom: 18px; }
  .ftr-logo-box {
    background: linear-gradient(135deg, var(--g) 0%, var(--g2) 55%, var(--g3) 100%);
    padding: 9px 13px; border-radius: 13px; flex-shrink: 0;
    font-family:'Poppins',sans-serif font-weight: 900; font-size: 1rem; color: #fff;
    box-shadow: 0 0 18px rgba(0,150,80,0.28), inset 0 1px 0 rgba(255,255,255,0.12);
    transition: transform .3s;
  }
  .ftr-brand-a:hover .ftr-logo-box { transform: scale(1.07) rotate(-2deg); }
  .ftr-logo-name {
    font-family:'Poppins',sans-serif font-weight: 800; font-size: 1.2rem; line-height: 1;
    background: linear-gradient(130deg, var(--g4), var(--gold3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ftr-logo-sub {
    font-size: 9.5px; font-weight: 600; letter-spacing: .16em;
    text-transform: uppercase; color: var(--dim); margin-top: 3px;
  }

  .ftr-desc { font-size: .86rem; color: var(--dim); line-height: 1.72; margin-bottom: 20px; max-width: 290px; }

  .ftr-stat-pills { display: flex; flex-direction: column; gap: 9px; margin-bottom: 22px; }
  .ftr-stat-pill {
    display: flex; align-items: center; gap: 9px;
    background: rgba(0,80,40,0.1); border: 1px solid rgba(0,200,120,0.1);
    border-radius: 9px; padding: 8px 12px;
    transition: border-color .2s, background .2s;
  }
  .ftr-stat-pill:hover { background: rgba(0,80,40,0.18); border-color: rgba(0,200,120,0.22); }
  .ftr-stat-num {
    font-family:'Poppins',sans-serif font-weight: 800; font-size: .95rem;
    background: linear-gradient(130deg, var(--g4), var(--gold3));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ftr-stat-lbl { font-size: .76rem; color: var(--dim); }

  .ftr-socials { display: flex; gap: 9px; }
  .ftr-social {
    width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
    background: rgba(0,80,40,0.1); border: 1px solid rgba(0,200,120,0.1);
    color: var(--dim); transition: background .2s, color .2s, transform .2s, border-color .2s;
    text-decoration: none;
  }
  .ftr-social:hover { transform: translateY(-3px); border-color: rgba(0,200,120,0.3); }
  .ftr-social.s-fb:hover  { background: rgba(24,119,242,.18);  color: #5aa3ff; }
  .ftr-social.s-ig:hover  { background: rgba(193,53,132,.18);  color: #f07ec0; }
  .ftr-social.s-li:hover  { background: rgba(10,102,194,.18);  color: #5aa3ff; }

  /* Link cols */
  .ftr-col-h {
    font-family:'Poppins',sans-serif font-weight: 700; font-size: .85rem;
    color: #d0e8d8; margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }
  .ftr-col-h::after { content:''; flex:1; height:1px; background: rgba(0,200,120,0.1); }

  .ftr-link-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .ftr-link-list a {
    font-size: .86rem; color: var(--dim); text-decoration: none;
    display: flex; align-items: center; gap: 8px;
    transition: color .2s, transform .2s;
  }
  .ftr-link-list a::before {
    content:''; width:5px; height:5px; border-radius:50%; background:rgba(0,150,80,0.4); flex-shrink:0;
    transition: background .2s, transform .2s;
  }
  .ftr-link-list a:hover { color: var(--g4); transform: translateX(5px); }
  .ftr-link-list a:hover::before { background: var(--g4); transform: scale(1.5); }

  /* Contact col */
  .ftr-contact-item {
    display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;
    text-decoration: none; color: var(--dim);
    transition: color .2s;
  }
  .ftr-contact-item:not(.no-hover):hover { color: var(--g4); }
  .ftr-cicon {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: rgba(0,100,60,0.12); border: 1px solid rgba(0,200,120,0.1);
    display: flex; align-items: center; justify-content: center; color: var(--g3);
    transition: background .2s;
  }
  .ftr-contact-item:not(.no-hover):hover .ftr-cicon { background: rgba(0,120,70,0.24); }
  .ftr-clbl { font-size: 10px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: rgba(60,110,80,0.8); }
  .ftr-cval { font-size: .84rem; color: #aacaba; font-weight: 500; line-height: 1.5; margin-top: 2px; }
  .ftr-contact-item:not(.no-hover):hover .ftr-cval { color: var(--g4); }

  .ftr-div {
    height: 1px; max-width: 1280px; margin: 0 auto;
    background: linear-gradient(90deg, transparent, rgba(0,200,120,0.12), rgba(230,185,70,0.08), rgba(0,200,120,0.12), transparent);
  }

  /* Bottom bar */
  .ftr-bottom {
    position: relative; z-index: 1;
    max-width: 1280px; margin: 0 auto; padding: 22px 28px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
  }
  .ftr-copy { font-size: .78rem; color: var(--dim); }
  .ftr-copy strong { color: var(--muted); }
  .ftr-badge-b {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(0,80,40,0.1); border: 1px solid rgba(0,200,120,0.08);
    border-radius: 99px; padding: 5px 14px;
    font-size: 11px; font-weight: 600; color: var(--dim);
  }
  .ftr-bot-links { display: flex; align-items: center; gap: 18px; }
  .ftr-bot-links a { font-size: .78rem; color: var(--dim); text-decoration: none; transition: color .2s; }
  .ftr-bot-links a:hover { color: var(--g4); }

  /* Footer audit CTA button */
  .ftr-audit-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(130deg, var(--g) 0%, var(--g2) 50%, var(--g3) 100%);
    color: #fff; border: none; cursor: pointer;
    padding: 14px 30px; border-radius: 99px;
    font-family:'Poppins',sans-serif font-weight: 700; font-size: 15px;
    position: relative; overflow: hidden;
    box-shadow: 0 0 32px rgba(0,160,90,0.38), inset 0 1px 0 rgba(255,255,255,0.12);
    transition: transform .22s, box-shadow .22s;
  }
  .ftr-audit-btn::before {
    content: ''; position: absolute; top: -50%; left: -60%; width: 30%; height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transform: skewX(-20deg);
    animation: ftrSheen 3s ease-in-out infinite;
  }
  @keyframes ftrSheen {
    0% { left: -60%; opacity: 0; }
    40% { opacity: 1; }
    60% { left: 130%; opacity: 0; }
    100% { left: 130%; }
  }
  .ftr-audit-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(130deg, var(--gold2), var(--gold3));
    opacity: 0; transition: opacity .3s;
  }
  .ftr-audit-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 0 55px rgba(0,200,120,0.55); }
  .ftr-audit-btn:hover::after { opacity: .14; }
  .ftr-audit-btn > * { position: relative; z-index: 1; }
`;

export default function Footer() {
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      <style>{FTR_CSS}</style>
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />

      <footer className="ftr">
        <div className="ftr-orb1"/><div className="ftr-orb2"/>

        {/* ── CTA STRIP ── */}
        <div className="ftr-cta-strip">
          <div className="ftr-cta-inner">
            <div>
              <div className="ftr-cta-tag"><Sparkles style={{width:12,height:12}}/>Free Growth Audit</div>
              <div className="ftr-cta-h">
                Ready to Scale Your <span>Revenue?</span>
              </div>
              <p className="ftr-cta-sub">Get a personalized performance strategy — no commitments, no fluff.</p>
              <div className="ftr-cta-checks">
                {["No Ad Spend Wasted","Dedicated Strategy","Results in 30 Days"].map((t,i)=>(
                  <div key={i} className="ftr-cta-check">
                    <CheckCircle2 style={{width:14,height:14,color:"var(--g4)"}}/>{t}
                  </div>
                ))}
              </div>
              <div style={{marginTop:24}}>
                <button className="ftr-audit-btn" onClick={() => setAuditOpen(true)}>
                  <Sparkles style={{width:15,height:15}}/>
                  Get Free Audit
                  <ArrowRight style={{width:15,height:15}}/>
                </button>
              </div>
            </div>
            <div className="ftr-cta-right">
              <div className="ftr-cta-stat">
                <TrendingUp style={{width:14,height:14,color:"var(--g4)"}}/>
                <strong>₹2 Cr+</strong>Ad Spend Managed
              </div>
              <div className="ftr-cta-stat">
                <TrendingUp style={{width:14,height:14,color:"var(--gold3)"}}/>
                <strong style={{background:"linear-gradient(130deg,var(--gold),var(--gold3))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹7.5 Cr+</strong>
                Revenue Generated
              </div>
              <div className="ftr-cta-stat">
                <span className="pdot" style={{marginRight:2}}/>
                <strong>15+</strong>Happy Clients
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="ftr-body">

          {/* Brand */}
          <div>
            <Link to="/" className="ftr-brand-a">
              <div className="ftr-logo-box">RB</div>
              <div>
                <div className="ftr-logo-name">RoasBadhao</div>
                <div className="ftr-logo-sub">Performance Marketing</div>
              </div>
            </Link>
            <p className="ftr-desc">
              A performance marketing agency based in Delhi, built for businesses that care about results — not vanity metrics.
            </p>
            <div className="ftr-stat-pills">
              <div className="ftr-stat-pill">
                <TrendingUp style={{width:13,height:13,color:"var(--g4)"}}/>
                <span className="ftr-stat-num">₹2 Cr+</span>
                <span className="ftr-stat-lbl">Ad Spend Managed</span>
              </div>
              <div className="ftr-stat-pill">
                <TrendingUp style={{width:13,height:13,color:"var(--gold3)"}}/>
                <span className="ftr-stat-num" style={{background:"linear-gradient(130deg,var(--gold),var(--gold3))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹7.5 Cr+</span>
                <span className="ftr-stat-lbl">Revenue Generated</span>
              </div>
            </div>
            <div className="ftr-socials">
              <a href="https://www.facebook.com/roasbadhao" target="_blank" rel="noopener noreferrer" className="ftr-social s-fb">
                <Facebook style={{width:15,height:15}}/>
              </a>
              <a href="https://www.instagram.com/roasbadhao/" target="_blank" rel="noopener noreferrer" className="ftr-social s-ig">
                <Instagram style={{width:15,height:15}}/>
              </a>
              <a href="https://www.linkedin.com/company/roasbadhao/" target="_blank" rel="noopener noreferrer" className="ftr-social s-li">
                <Linkedin style={{width:15,height:15}}/>
              </a>
            </div>
          </div>

          {/* Services — with correct routes from App.jsx */}
          <div>
            <h4 className="ftr-col-h">Services</h4>
            <ul className="ftr-link-list">
              {[
                ["Meta Ads",          "/services/meta-ads"],
                ["Google Ads",        "/services/google-ads"],
                ["GMB Optimisation",  "/services/gmb"],
                ["Website Design",    "/services/website-design"],
                ["Lead Generation",   "/services/lead-generation"],
              ].map(([n,h],i)=>(
                <li key={i}><Link to={h}>{n}</Link></li>
              ))}
            </ul>
          </div>

          {/* Industries — with correct routes from App.jsx */}
          <div>
            <h4 className="ftr-col-h">Industries</h4>
            <ul className="ftr-link-list">
              {[
                ["Real Estate",  "/industries/real-estate"],
                ["Healthcare",   "/industries/healthcare"],
                ["Salon & Spa",  "/industries/salon"],
                ["Food & Bev",   "/industries/food"],
                ["D2C Brands",   "/industries/d2c"],
              ].map(([n,h],i)=>(
                <li key={i}><Link to={h}>{n}</Link></li>
              ))}
            </ul>

            <h4 className="ftr-col-h" style={{marginTop:28}}>Portfolio</h4>
            <ul className="ftr-link-list">
              {[
                ["All Work",        "/portfolio"],
                ["Web Design",      "/portfolio/web"],
                ["Meta Ads",        "/portfolio/meta-ads"],
                ["Google Ads",      "/portfolio/google-ads"],
                ["GMB",             "/portfolio/gmb-optimization"],
                ["Lead Generation", "/portfolio/lead-generation"],
              ].map(([n,h],i)=>(
                <li key={i}><Link to={h}>{n}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="ftr-col-h">Contact Us</h4>
            <a href="tel:9911689427" className="ftr-contact-item">
              <div className="ftr-cicon"><Phone style={{width:15,height:15}}/></div>
              <div><div className="ftr-clbl">Call Us</div><div className="ftr-cval">+91 99116 89427</div></div>
            </a>
            <a href="mailto:help@roasbadhao.com" className="ftr-contact-item">
              <div className="ftr-cicon"><Mail style={{width:15,height:15}}/></div>
              <div><div className="ftr-clbl">Email</div><div className="ftr-cval">help@roasbadhao.com</div></div>
            </a>
            <div className="ftr-contact-item no-hover" style={{cursor:"default"}}>
              <div className="ftr-cicon"><MapPin style={{width:15,height:15}}/></div>
              <div>
                <div className="ftr-clbl">Office</div>
                <div className="ftr-cval">2nd Floor, Plot No 330, Kakrola,<br/>Dwarka Mor, Delhi 110059</div>
              </div>
            </div>

            {/* Quick links */}
            <h4 className="ftr-col-h" style={{marginTop:20}}>Quick Links</h4>
            <ul className="ftr-link-list">
              {[
                ["Home",    "/"],
                ["About",   "/about"],
                ["Contact", "/contact"],
              ].map(([n,h],i)=>(
                <li key={i}><Link to={h}>{n}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftr-div"/>

        {/* Bottom */}
        <div className="ftr-bottom">
          <p className="ftr-copy">© 2026 <strong>RoasBadhao</strong>. All rights reserved.</p>
          <div className="ftr-badge-b"><div className="pdot"/>Built for businesses that care about results</div>
          <div className="ftr-bot-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
}
