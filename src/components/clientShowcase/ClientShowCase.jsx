import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const clients = [
  { id:0, name:"DrSkin Clinic", category:"Healthcare", logo:"🏥", cardBg:"#e8f5e9", cardText:"#1a2e1f", accentBg:"#00b86e", tagline:"Scaled patient appointments with precision Google Ads & GMB ranking strategy.", metrics:[{value:"3.2X",label:"ROAS Achieved"},{value:"68%",label:"Drop in CPL"}], features:[{icon:"🎯",text:"Google Search & Display Ads"},{icon:"📍",text:"GMB rank #1 in local area"}], image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600" },
  { id:1, name:"LuxeHomes Realty", category:"Real Estate", logo:"🏢", cardBg:"#fffde7", cardText:"#2a2000", accentBg:"#f0c95e", tagline:"Generated 500+ qualified buyer leads in 90 days via Meta & Google Ads funnels.", metrics:[{value:"500+",label:"Leads in 90 Days"},{value:"₹42L",label:"Revenue Closed"}], features:[{icon:"📱",text:"Meta Ads with retargeting funnel"},{icon:"💰",text:"WhatsApp CRM integration"}], image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600" },
  { id:2, name:"GlowSpa Chain", category:"Salon & Spa", logo:"💇", cardBg:"#e3f2fd", cardText:"#0a1929", accentBg:"#4fc3f7", tagline:"Drove 4X walk-ins with hyper-local Instagram and Google campaigns across 3 cities.", metrics:[{value:"4X",label:"Walk-in Growth"},{value:"#1",label:"Google Maps Rank"}], features:[{icon:"📸",text:"Instagram reels ad campaigns"},{icon:"📍",text:"Local SEO & GMB optimization"}], image:"https://images.unsplash.com/photo-1560066984-138daaa4bb30?q=80&w=600" },
  { id:3, name:"NourishBox D2C", category:"D2C Brand", logo:"🛍️", cardBg:"#fce4ec", cardText:"#2a0010", accentBg:"#f06292", tagline:"Scaled from ₹50K to ₹8L monthly revenue in under 6 months with full-funnel ads.", metrics:[{value:"16X",label:"Revenue Scale"},{value:"2.8X",label:"Avg ROAS"}], features:[{icon:"🛒",text:"Shopify + Meta dynamic ads"},{icon:"🔄",text:"Cart recovery automation"}], image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600" },
  { id:4, name:"CrispBites Cloud", category:"Food & Beverage", logo:"🍔", cardBg:"#fff3e0", cardText:"#2a1000", accentBg:"#ff7043", tagline:"Grew daily orders by 220% using location-targeted food delivery ad campaigns.", metrics:[{value:"220%",label:"Order Growth"},{value:"₹2.1L",label:"Monthly Revenue"}], features:[{icon:"📍",text:"Geo-targeted Meta Ads"},{icon:"⭐",text:"Google Maps visibility boost"}], image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600" },
  { id:5, name:"EduReach Academy", category:"Education", logo:"🎓", cardBg:"#e8eaf6", cardText:"#0d0d2b", accentBg:"#5c6bc0", tagline:"Filled 3 batches in 30 days with high-intent student leads at ₹80 CPL.", metrics:[{value:"3",label:"Batches Filled"},{value:"₹80",label:"Cost Per Lead"}], features:[{icon:"🎯",text:"Google lead gen campaigns"},{icon:"💬",text:"WhatsApp funnel automation"}], image:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600" },
];

const css = `
.cs-section {
  background: #010d08;
  padding: 10px 0 80px;
  position: relative;
  overflow: hidden;
  font-family:'Poppins',sans-serif
}
.cs-section::before {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(0,180,110,0.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,180,110,0.03) 1px,transparent 1px);
  background-size:60px 60px; pointer-events:none;
  mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black,transparent);
}
.cs-orb-a { position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,120,60,0.09),transparent 70%);top:-160px;left:-120px;pointer-events:none;filter:blur(60px); }
.cs-orb-b { position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,160,60,0.06),transparent 70%);bottom:-100px;right:-80px;pointer-events:none;filter:blur(60px); }

.cs-hd { text-align:center; padding:0 24px; margin-bottom:5px; position:relative; z-index:2; }
.cs-hd-lbl { display:inline-block; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#00b86e; margin-bottom:12px; }
.cs-hd-title { font-family:'Poppins',sans-serif; font-size:clamp(1.6rem,3vw,2.6rem); font-weight:800; color:#fff; line-height:1.12; letter-spacing:-0.02em; }
.cs-hd-title .g { background:linear-gradient(135deg,#00d47d 0%,#f0c95e 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.cs-hd-sub { color:#8ab09a; font-size:0.9rem; max-width:440px; margin:0px auto 0; line-height:1.6; }

/* TABS */
.cs-tabs-row { display:flex; align-items:center; justify-content:center; gap:0; padding:0 24px; position:relative; z-index:10; }
.cs-arrow-btn { width:36px; height:36px; border-radius:50%; flex-shrink:0; background:rgba(0,96,57,0.12); border:1px solid rgba(0,180,110,0.2); color:#8ab09a; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
.cs-arrow-btn:hover { background:rgba(0,96,57,0.3); border-color:#00b86e; color:#fff; }
.cs-tabs-scroll { display:flex; gap:5px; padding:0 10px; overflow-x:auto; scrollbar-width:none; }
.cs-tabs-scroll::-webkit-scrollbar { display:none; }
.cs-tab-btn { font-family:'Poppins',sans-serif; font-size:12.5px; font-weight:600; padding:8px 18px; border-radius:99px; border:1.5px solid transparent; background:transparent; color:rgba(163,196,176,0.38); cursor:pointer; white-space:nowrap; transition:all 0.25s ease; }
.cs-tab-btn:hover { color:rgba(255,255,255,0.6); background:rgba(0,96,57,0.08); }
.cs-tab-btn.cs-tab-active { background:rgba(0,96,57,0.22); border-color:rgba(0,180,110,0.4); color:#fff; box-shadow:0 0 16px rgba(0,140,70,0.16); }

/* CAROUSEL */
.cs-stage {
  position: relative;
  height: 400px;
  display: flex; align-items: center; justify-content: center;
  perspective: 1400px;
  perspective-origin: 50% 40%;
  overflow: visible;
  cursor: grab;
  user-select: none;
  z-index: 2;
  touch-action: pan-y;
}
.cs-stage.cs-dragging { cursor: grabbing; }
.cs-stage::before,.cs-stage::after { content:''; position:absolute; top:0; bottom:0; width:180px; z-index:20; pointer-events:none; }
.cs-stage::before { left:0; background:linear-gradient(90deg,#010d08 0%,transparent 100%); }
.cs-stage::after  { right:0; background:linear-gradient(-90deg,#010d08 0%,transparent 100%); }

/* CARD */
.cs-card {
  position: absolute;
  width: 320px;
  border-radius: 22px;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  transition:
    transform 0.52s cubic-bezier(0.22,0.68,0,1.12),
    opacity 0.42s ease,
    box-shadow 0.42s ease;
}
.cs-card-inner { position:relative; display:flex; flex-direction:column; padding:22px 22px 0; }
.cs-card-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.cs-card-logo-wrap { width:38px; height:38px; border-radius:10px; background:rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex-shrink:0; }
.cs-card-cname { font-family:'Poppins',sans-serif; font-size:1.1rem; font-weight:700; line-height:1.1; }
.cs-card-tagline { font-size:0.8rem; line-height:1.5; margin-bottom:16px; opacity:0.7; }
.cs-card-metrics { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
.cs-card-mval { font-family:'Poppins',sans-serif; font-size:1.55rem; font-weight:800; line-height:1; margin-bottom:2px; display:block; }
.cs-card-mlbl { font-size:0.68rem; opacity:0.55; font-weight:500; }
.cs-card-features { display:flex; flex-direction:column; gap:6px; }
.cs-card-feat { display:flex; align-items:flex-start; gap:7px; font-size:0.76rem; opacity:0.65; line-height:1.4; }
.cs-card-mockup { width:100%; height:130px; object-fit:cover; object-position:center top; display:block; margin-top:16px; flex-shrink:0; }
.cs-card-mockup-overlay { position:absolute; left:0; right:0; bottom:0; height:70px; pointer-events:none; }

/* Center card glow */
.cs-card-center-glow {
  position:absolute; inset:-1px; border-radius:23px;
  background: transparent;
  box-shadow: 0 0 0 0 transparent;
  transition: box-shadow 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

/* View btn */
.cs-view-btn {
  position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%) scale(0.88);
  opacity:0; transition:opacity 0.22s, transform 0.22s;
  font-family:'Poppins',sans-serif; font-size:12.5px; font-weight:600;
  padding:10px 22px; border-radius:99px;
  background:rgba(5,20,10,0.88);
  border:1px solid rgba(255,255,255,0.18);
  backdrop-filter:blur(12px); color:#fff; cursor:pointer;
  white-space:nowrap; display:flex; align-items:center; gap:7px;
  z-index:30; pointer-events:none;
}
.cs-card:hover .cs-view-btn { opacity:1; transform:translate(-50%,-50%) scale(1); pointer-events:auto; }

/* DOTS */
.cs-dots { display:flex; justify-content:center; gap:6px; margin-top:28px; position:relative; z-index:2; }
.cs-dot { height:3px; border-radius:99px; cursor:pointer; transition:all 0.38s ease; flex:1; max-width:26px; background:rgba(0,180,110,0.16); }
.cs-dot.cs-dot-active { background:linear-gradient(90deg,#00d47d,#f0c95e); max-width:50px; box-shadow:0 0 7px #00b86e; }

/* NAV */
.cs-nav-row { display:flex; justify-content:center; align-items:center; gap:12px; margin-top:22px; position:relative; z-index:2; }
.cs-nav-arrow { width:46px; height:46px; border-radius:50%; border:1.5px solid rgba(0,180,110,0.26); background:rgba(0,96,57,0.1); color:#8ab09a; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.22s; backdrop-filter:blur(8px); }
.cs-nav-arrow:hover { background:rgba(0,96,57,0.26); border-color:#00b86e; color:#fff; transform:scale(1.08); box-shadow:0 0 16px rgba(0,140,70,0.26); }
.cs-nav-counter { font-family:'Poppins',sans-serif; font-size:12.5px; font-weight:700; color:rgba(163,196,176,0.38); min-width:44px; text-align:center; }
.cs-nav-counter span { color:#fff; }
.cs-drag-hint { text-align:center; margin-top:10px; font-size:0.68rem; color:rgba(163,196,176,0.22); letter-spacing:0.14em; text-transform:uppercase; position:relative; z-index:2; }
`;

/* Card 3D transform calculator */
function getCardTransform(index, active, total) {
  let offset = ((index - active) % total + total) % total;
  if (offset > total / 2) offset -= total;
  const abs = Math.abs(offset);
  if (abs > 2) return { style:{ opacity:0, transform:"translateX(0) scale(0.4)", zIndex:0 }, visible:false };

  const cfg = {
    "0":  { x:0,    scale:1,    rotY:0,   rotZ:0,  z:0,    opacity:1,    zIdx:10, shadow:"0 24px 60px rgba(0,0,0,0.55)" },
    "1":  { x:290,  scale:0.83, rotY:-17, rotZ:4,  z:-80,  opacity:0.72, zIdx:7,  shadow:"0 12px 30px rgba(0,0,0,0.35)" },
    "-1": { x:-290, scale:0.83, rotY:17,  rotZ:-4, z:-80,  opacity:0.72, zIdx:7,  shadow:"0 12px 30px rgba(0,0,0,0.35)" },
    "2":  { x:498,  scale:0.65, rotY:-24, rotZ:7,  z:-170, opacity:0.4,  zIdx:4,  shadow:"none" },
    "-2": { x:-498, scale:0.65, rotY:24,  rotZ:-7, z:-170, opacity:0.4,  zIdx:4,  shadow:"none" },
  };

  const c = cfg[offset.toString()] || cfg["0"];
  return {
    style: {
      opacity: c.opacity,
      zIndex: c.zIdx,
      boxShadow: c.shadow,
      transform: `translateX(${c.x}px) scale(${c.scale}) rotateY(${c.rotY}deg) rotateZ(${c.rotZ}deg) translateZ(${c.z}px)`,
    },
    visible: true,
    isCenter: offset === 0,
  };
}

export default function ClientShowcaseSection() {
  const [active, setActive]   = useState(0);
  const total  = clients.length;
  const drag   = useRef({ on:false, startX:0, lastX:0, vel:0, moved:false });
  const stageRef = useRef(null);

  const goTo = useCallback(i => setActive(((i % total) + total) % total), [total]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  /* ── Inertia drag ── */
  const velRef   = useRef(0);
  const rafInert = useRef(null);

  const startInertia = useCallback(() => {
    const vel = velRef.current;
    if (Math.abs(vel) < 1) return;
    // Flick threshold
    if (Math.abs(vel) > 5) { vel < 0 ? next() : prev(); }
  }, [next, prev]);

  const onDragStart = (x) => {
    cancelAnimationFrame(rafInert.current);
    drag.current = { on:true, startX:x, lastX:x, vel:0, moved:false };
    velRef.current = 0;
  };
  const onDragMove = (x) => {
    if (!drag.current.on) return;
    const dx = x - drag.current.lastX;
    velRef.current = dx;
    drag.current.lastX = x;
    if (Math.abs(x - drag.current.startX) > 5) drag.current.moved = true;
  };
  const onDragEnd = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    const totalDiff = drag.current.lastX - drag.current.startX;
    if (Math.abs(totalDiff) > 60)         { totalDiff < 0 ? next() : prev(); }
    else if (Math.abs(velRef.current) > 5) { startInertia(); }
    stageRef.current?.classList.remove("cs-dragging");
  };

  useEffect(() => {
    const mv = e => onDragMove(e.clientX);
    const up = () => onDragEnd();
    window.addEventListener("mousemove", mv, { passive:true });
    window.addEventListener("mouseup",  up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, [active]);

  /* keyboard */
  useEffect(() => {
    const h = e => { if (e.key==="ArrowLeft") prev(); if (e.key==="ArrowRight") next(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active]);

  /* auto-play */
  useEffect(() => {
    const t = setTimeout(() => goTo(active + 1), 5500);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      <style>{css}</style>
      <div className="cs-section">
        <div className="cs-orb-a"/><div className="cs-orb-b"/>

        {/* Header */}
        <div className="cs-hd">
          <span className="cs-hd-lbl">Client Success Stories</span>
          <h2 className="cs-hd-title">
            Real Businesses.<br/>
            <span className="g">Real Results. Real Growth.</span>
          </h2>
          <p className="cs-hd-sub">200+ businesses scaled across India — here's how we did it.</p>
        </div>

        {/* Tabs */}
        <div className="cs-tabs-row">
          <button className="cs-arrow-btn" onClick={prev} aria-label="prev"><ArrowLeft size={14}/></button>
          <div className="cs-tabs-scroll">
            {clients.map((c,i) => (
              <button
                key={i}
                className={"cs-tab-btn" + (active===i?" cs-tab-active":"")}
                onClick={() => goTo(i)}
              >
                {c.logo} {c.name}
              </button>
            ))}
          </div>
          <button className="cs-arrow-btn" onClick={next} aria-label="next"><ArrowRight size={14}/></button>
        </div>

        {/* Carousel */}
        <div
          className="cs-stage"
          ref={stageRef}
          onMouseDown={e => { e.preventDefault(); onDragStart(e.clientX); stageRef.current?.classList.add("cs-dragging"); }}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e => { e.stopPropagation(); onDragMove(e.touches[0].clientX); }}
          onTouchEnd={onDragEnd}
        >
          {clients.map((client, i) => {
            const { style, visible, isCenter } = getCardTransform(i, active, total);
            if (!visible) return null;
            return (
              <div
                key={i}
                className="cs-card"
                style={{ ...style, backgroundColor:client.cardBg, color:client.cardText }}
                onClick={() => { if (!drag.current.moved) { if (!isCenter) goTo(i); } drag.current.moved = false; }}
              >
                <div className="cs-card-inner">
                  <div className="cs-card-header">
                    <div className="cs-card-logo-wrap">{client.logo}</div>
                    <span className="cs-card-cname">{client.name}</span>
                  </div>
                  <p className="cs-card-tagline">{client.tagline}</p>
                  <div className="cs-card-metrics">
                    {client.metrics.map((m,j) => (
                      <div key={j}>
                        <span className="cs-card-mval">{m.value}</span>
                        <span className="cs-card-mlbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cs-card-features">
                    {client.features.map((f,j) => (
                      <div key={j} className="cs-card-feat"><span>{f.icon}</span><span>{f.text}</span></div>
                    ))}
                  </div>
                </div>

                <img
                  className="cs-card-mockup"
                  src={client.image}
                  alt={client.name}
                  draggable={false}
                />
                <div
                  className="cs-card-mockup-overlay"
                  style={{ background:`linear-gradient(to bottom, ${client.cardBg} 0%, transparent 100%)` }}
                />

                {isCenter && (
                  <div className="cs-view-btn">
                    View Case Study <ExternalLink size={12}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="cs-drag-hint">← drag to explore →</p>

        <div className="cs-dots">
          {clients.map((_,i) => (
            <div
              key={i}
              className={"cs-dot" + (active===i?" cs-dot-active":"")}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="cs-nav-row">
          <button className="cs-nav-arrow" onClick={prev}><ArrowLeft size={18}/></button>
          <span className="cs-nav-counter">
            <span>{String(active+1).padStart(2,"0")}</span> / {String(total).padStart(2,"0")}
          </span>
          <button className="cs-nav-arrow" onClick={next}><ArrowRight size={18}/></button>
        </div>
      </div>
    </>
  );
}