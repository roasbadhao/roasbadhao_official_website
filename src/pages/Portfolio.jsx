import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS — inject once into <head>
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --rb-green: #00c853;
    --rb-green2: #00e676;
    --rb-green3: #1de9b6;
    --rb-dark: #050d08;
    --rb-dark2: #081209;
    --rb-card: #0a1a0d;
    --rb-border: rgba(0,200,83,0.15);
  }

  /* Scanline sweep */
  @keyframes rb-scan {
    0%   { top: -2px; }
    100% { top: 100vh; }
  }
  .rb-scanline {
    position: fixed; left: 0; right: 0; height: 1px; pointer-events: none; z-index: 3;
    background: linear-gradient(90deg, transparent, rgba(0,200,83,0.3), transparent);
    animation: rb-scan 6s linear infinite;
  }

  /* Float animations */
  @keyframes rb-fa { 0%,100% { transform: translateY(0);   } 50% { transform: translateY(-10px); } }
  @keyframes rb-fb { 0%,100% { transform: translateY(-7px); } 50% { transform: translateY(5px);  } }
  @keyframes rb-fc { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(7px);  } }
  .rb-fa { animation: rb-fa 5.4s ease-in-out infinite; }
  .rb-fb { animation: rb-fb 6.8s ease-in-out infinite; }
  .rb-fc { animation: rb-fc 4.9s ease-in-out infinite; }

  /* Device hover lifts */
  .rb-card:hover .rb-phone-wrap  { transform: translateY(-16px) scale(1.05); }
  .rb-card:hover .rb-desk-wrap   { transform: translateY(-16px) scale(1.04); }
  .rb-phone-wrap, .rb-desk-wrap  { transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); }

  /* Card label reveal */
  .rb-card-label {
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .rb-card:hover .rb-card-label { opacity: 1; transform: translateY(0); }

  /* Corner brackets */
  .rb-corner-tl, .rb-corner-br { opacity: 0; transition: opacity 0.3s; }
  .rb-card:hover .rb-corner-tl,
  .rb-card:hover .rb-corner-br  { opacity: 1; }

  /* Camera dot */
  .rb-cam { transition: background 0.3s, box-shadow 0.3s; }
  .rb-card:hover .rb-cam { background: var(--rb-green) !important; box-shadow: 0 0 10px var(--rb-green); }

  /* Glow reveal */
  .rb-glow { opacity: 0; transition: opacity 0.4s; }
  .rb-card:hover .rb-glow { opacity: 1; }

  /* Swipe gesture */
  @keyframes rb-swipe {
    0%   { opacity: 0.8; transform: translateY(0)    scaleX(1);   }
    65%  { opacity: 1;   transform: translateY(-26px) scaleX(0.8); }
    100% { opacity: 0;   transform: translateY(-48px) scaleX(0.5); }
  }
  .rb-sw0 { animation: rb-swipe 2.5s ease-in-out 0.00s infinite; }
  .rb-sw1 { animation: rb-swipe 2.5s ease-in-out 0.18s infinite; }
  .rb-sw2 { animation: rb-swipe 2.5s ease-in-out 0.36s infinite; }

  /* Tap gesture */
  @keyframes rb-ripple {
    0%   { transform: scale(0);   opacity: 0.9; }
    100% { transform: scale(3.8); opacity: 0;   }
  }
  .rb-tap-r  { animation: rb-ripple 1.8s ease-out 0.0s infinite; }
  .rb-tap-r2 { animation: rb-ripple 1.8s ease-out 0.9s infinite; }

  /* Scroll bar */
  @keyframes rb-scroll { 0%,100% { transform: translateY(0); } 50% { transform: translateY(13px); } }
  .rb-scr-b { animation: rb-scroll 2.2s ease-in-out infinite; }

  /* Fade up entrance */
  @keyframes rb-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .rb-fi    { opacity: 0; animation: rb-fadeUp 0.85s ease forwards; }
  .rb-d0    { animation-delay: 0.10s; }
  .rb-d1    { animation-delay: 0.25s; }
  .rb-d2    { animation-delay: 0.40s; }
  .rb-d3    { animation-delay: 0.58s; }
  .rb-d4    { animation-delay: 0.76s; }
  .rb-d5    { animation-delay: 0.94s; }

  /* CTA button */
  .rb-cta-btn:hover  { background: var(--rb-green2) !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,200,83,0.35); }
  .rb-cta-ghost:hover { border-color: rgba(0,200,83,0.4) !important; color: #fff !important; }

  /* Mobile responsive */
  @media (max-width: 720px) {
    .rb-row { gap: 12px !important; }
    .rb-stats { flex-wrap: wrap !important; }
    .rb-stat { min-width: 50% !important; flex: 0 0 50% !important; }
    .rb-stat:nth-child(2) { border-right: none !important; }
    .rb-stat:nth-child(3),
    .rb-stat:nth-child(4) { border-top: 1px solid rgba(0,200,83,0.1) !important; padding-top: 20px !important; }
    .rb-stat:nth-child(3) { border-right: 1px solid rgba(0,200,83,0.1) !important; }
    .rb-cta-row { flex-direction: column !important; align-items: center !important; }
    .rb-cta-ghost { margin-left: 0 !important; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const ROW1 = [
  {
    id: "app", to: "/app-portfolio", label: "App Development", float: "rb-fa",
    color: "#00c853", colorDim: "rgba(0,200,83,0.07)", colorBorder: "rgba(0,200,83,0.3)",
    device: "phone", gesture: "swipe",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
  },
  {
    id: "web", to: "/portfolio/web", label: "Web Development", float: "rb-fb",
    color: "#00c853", colorDim: "rgba(0,200,83,0.07)", colorBorder: "rgba(0,200,83,0.3)",
    device: "desktop", gesture: "scroll", center: true,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    id: "meta", to: "/portfolio/meta-ads", label: "Meta Ads", float: "rb-fc",
    color: "#00e676", colorDim: "rgba(0,230,118,0.07)", colorBorder: "rgba(0,230,118,0.3)",
    device: "phone", gesture: "tap",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
  },
];

const ROW2 = [
  {
    id: "google", to: "/portfolio/google-ads", label: "Google Ads", float: "rb-fb",
    color: "#69f0ae", colorDim: "rgba(105,240,174,0.07)", colorBorder: "rgba(105,240,174,0.3)",
    device: "phone", gesture: "tap",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80",
  },
  {
    id: "gmb", to: "/portfolio/gmb-optimization", label: "GMB Optimization", float: "rb-fa",
    color: "#1de9b6", colorDim: "rgba(29,233,182,0.07)", colorBorder: "rgba(29,233,182,0.3)",
    device: "desktop", gesture: "scroll", center: true,
    image: "https://images.unsplash.com/photo-1553484771-47a3e2d7c7f1?w=800&q=80",
  },
  {
    id: "lead", to: "/portfolio/lead-generation", label: "Lead Generation", float: "rb-fc",
    color: "#00c853", colorDim: "rgba(0,200,83,0.07)", colorBorder: "rgba(0,200,83,0.3)",
    device: "phone", gesture: "swipe",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
  },
];

const STATS = [
  { num: "200+", label: "Projects Delivered" },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "6",    label: "Service Verticals"   },
  { num: "4+",   label: "Years of Excellence" },
];

/* ─────────────────────────────────────────────────────────────
   GESTURE COMPONENTS
───────────────────────────────────────────────────────────── */
function SwipeGesture({ color }) {
  const dot = { width: 4, height: 4, borderRadius: "50%", background: color, position: "absolute", bottom: 20, left: "calc(50% - 2px)" };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none" }}>
      <div className="rb-sw0" style={{ ...dot }} />
      <div className="rb-sw1" style={{ ...dot, left: "calc(50% + 2px)", opacity: 0.7 }} />
      <div className="rb-sw2" style={{ ...dot, left: "calc(50% + 6px)", opacity: 0.4 }} />
    </div>
  );
}

function TapGesture({ color }) {
  const ring = { position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${color}` };
  return (
    <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 8, width: 22, height: 22 }}>
      <div className="rb-tap-r"  style={ring} />
      <div className="rb-tap-r2" style={ring} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 6, height: 6, borderRadius: "50%", background: color }} />
    </div>
  );
}

function ScrollGesture({ color }) {
  return (
    <div style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", zIndex: 5, width: 3, height: 32, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div className="rb-scr-b" style={{ width: "100%", height: 12, borderRadius: 3, background: color, opacity: 0.9 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────────────────────── */
function PhoneMockup({ item }) {
  const W = 118, H = 236;
  return (
    <div style={{ position: "relative" }}>
      {/* Glow */}
      <div className="rb-glow" style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", width: "65%", height: 22, borderRadius: "50%", background: item.color, filter: "blur(14px)" }} />

      <div className="rb-phone-wrap">
        <div style={{
            position: "relative",
    width: W,
    height: H,
    borderRadius: "20px",
    background: "linear-gradient(145deg, rgb(17, 26, 18), rgb(8, 15, 9))",
    border: '1.5px solid #198754',
    boxShadow: "rgba(0, 200, 83, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.75) 0px 40px 80px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    overflow: "hidden"
        }}>
          {/* Screen image */}
          <img src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

          {/* Notch */}
          <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 76, height: 24, background: "#000", borderRadius: 16, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
            <div className="rb-cam" style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a" }} />
          </div>

          {/* Status bar */}
          <div style={{ position: "absolute", top: 14, left: 12, right: 12, zIndex: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: "'Poppins',sans-serif" }}>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              {[5, 8, 11].map((h, i) => <div key={i} style={{ width: 2.5, height: h, background: "rgba(255,255,255,0.75)", borderRadius: 1 }} />)}
            </div>
          </div>

          {/* Side button */}
          <div style={{ position: "absolute", right: -2.5, top: "28%", width: 2.5, height: "12%", background: "linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.06))", borderRadius: 2 }} />

          {/* Overlay + shine */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(0,0,0,0.6) 100%)", zIndex: 3, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "38%", background: "linear-gradient(180deg,rgba(255,255,255,0.06),transparent)", zIndex: 4, pointerEvents: "none" }} />

          {/* Gesture */}
          {item.gesture === "swipe" && <SwipeGesture color={item.color} />}
          {item.gesture === "tap"   && <TapGesture   color={item.color} />}

          {/* Home bar */}
          <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: 44, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.25)", zIndex: 6 }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP MOCKUP
───────────────────────────────────────────────────────────── */
function DesktopMockup({ item }) {
  const W = 310, SH = 175;
  return (
    <div style={{ position: "relative" }}>
      <div className="rb-glow" style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", width: "55%", height: 18, borderRadius: "50%", background: item.color, filter: "blur(16px)" }} />

      <div className="rb-desk-wrap">
        {/* Monitor */}
        <div style={{
          position: "relative", width: W,
          borderRadius: 12,
          background: "linear-gradient(145deg,#0e1a10,#070e08)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 0 1px rgba(0,200,83,0.05), 0 40px 90px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
          padding: "8px 8px 6px",
        }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 4px 6px" }}>
            {["#ff5f57","#ffbd2e","#27c93f"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
            <div className="rb-cam" style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a" }} />
          </div>

          {/* Screen */}
          <div style={{ borderRadius: 6, overflow: "hidden", position: "relative", height: SH }}>
            <img src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.45) 100%)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(180deg,rgba(255,255,255,0.04),transparent)", zIndex: 3, pointerEvents: "none" }} />
            {item.gesture === "scroll" && <ScrollGesture color={item.color} />}
          </div>
        </div>

        {/* Stand */}
        <div style={{ margin: "0 auto", width: 28, height: 13, background: "linear-gradient(180deg,#0e1a10,#060d07)" }} />
        <div style={{ margin: "0 auto", width: 86, height: 5, borderRadius: "0 0 6px 6px", background: "linear-gradient(90deg,#0a1209,#141f12,#0a1209)", boxShadow: "0 5px 16px rgba(0,0,0,0.6)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DEVICE CARD
───────────────────────────────────────────────────────────── */
function DeviceCard({ item }) {
  const cornerStyle = {
    position: "absolute", width: 12, height: 12,
    border: `1.5px solid var(--rb-green)`,
  };
  return (
    <Link to={item.to} className={`rb-card ${item.float}`} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", textDecoration: "none" }}>
      <div style={{ position: "relative" }}>
        {/* Corner brackets */}
        <div className="rb-corner-tl" style={{ ...cornerStyle, top: -4, left: -4, borderRight: "none", borderBottom: "none" }} />
        <div className="rb-corner-br" style={{ ...cornerStyle, bottom: -4, right: -4, borderLeft: "none", borderTop: "none" }} />

        {item.device === "phone"   ? <PhoneMockup   item={item} /> : <DesktopMockup item={item} />}
      </div>

      {/* Label */}
      <div className="rb-card-label" style={{ marginTop: 14 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: item.colorDim,
          border: `1px solid ${item.colorBorder}`,
          borderRadius: 4, padding: "5px 13px",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: item.color }}>
            {item.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   DIVIDER
───────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "52px 0 48px" }}>
      <div style={{ flex: 1, maxWidth: 100, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,200,83,0.25))" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {[false, true, false].map((big, i) => (
          <div key={i} style={{
            width: big ? 8 : 6, height: big ? 8 : 6,
            border: "1px solid rgba(0,200,83,0.5)",
            transform: "rotate(45deg)",
            background: big ? "rgba(0,200,83,0.2)" : "transparent",
          }} />
        ))}
      </div>
      <div style={{ flex: 1, maxWidth: 100, height: 1, background: "linear-gradient(90deg,rgba(0,200,83,0.25),transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <div className="rb-stats rb-fi rb-d4" style={{
      display: "flex", justifyContent: "center",
      margin: "60px auto 0", maxWidth: 700,
      borderTop: "1px solid rgba(0,200,83,0.1)",
      borderBottom: "1px solid rgba(0,200,83,0.1)",
      padding: "28px 0",
    }}>
      {STATS.map((s, i) => (
        <div key={i} className="rb-stat" style={{
          flex: 1, textAlign: "center", padding: "0 20px",
          borderRight: i < STATS.length - 1 ? "1px solid rgba(0,200,83,0.1)" : "none",
        }}>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
            {s.num.replace(/[+%]/g, "")}
            <span style={{ color: "var(--rb-green)" }}>{s.num.match(/[+%]/)?.[0] ?? ""}</span>
          </div>
          <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BACKGROUND LAYERS
───────────────────────────────────────────────────────────── */
function Background() {
  const bgMain = {
    position: "fixed", inset: 0, zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,200,83,0.13) 0%, transparent 55%),
      radial-gradient(ellipse 40% 30% at 10% 60%, rgba(0,200,83,0.06) 0%, transparent 50%),
      radial-gradient(ellipse 40% 30% at 90% 80%, rgba(0,230,118,0.05) 0%, transparent 50%),
      #050d08
    `,
  };
  const bgGrid = {
    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
    backgroundImage: `linear-gradient(rgba(0,200,83,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,83,0.04) 1px,transparent 1px)`,
    backgroundSize: "50px 50px",
  };
  const bgNoise = {
    position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.18,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: "200px 200px",
    mixBlendMode: "overlay",
  };
  return (
    <>
      <div style={bgMain} />
      <div style={bgGrid} />
      <div style={bgNoise} />
      <div className="rb-scanline" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export default function PortfolioSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Inject global CSS once
    if (!document.getElementById("rb-portfolio-css")) {
      const tag = document.createElement("style");
      tag.id = "rb-portfolio-css";
      tag.textContent = GLOBAL_CSS;
      document.head.appendChild(tag);
    }
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Background />

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 10, padding: "80px 20px 100px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>

        {/* HEADER */}
        <div className="rb-fi rb-d0">
          {/* Section tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.25)", borderRadius: 4, padding: "5px 14px", marginBottom: 20 }}>
            <div style={{ width: 18, height: 2, background: "var(--rb-green)", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rb-green)" }}>Our Portfolio</span>
          </div>

          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 14px" }}>
            Work That <span style={{ color: "var(--rb-green)" }}>Drives Real</span><br />ROAS &amp; Results
          </h2>

          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 56px" }}>
            From app development to performance campaigns — every project is built to generate leads, scale revenue, and grow your business.
          </p>
        </div>

        {/* ROW 1 */}
        <div className="rb-row rb-fi rb-d1" style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
          {ROW1.map(item => <DeviceCard key={item.id} item={item} />)}
        </div>

        {/* DIVIDER */}
        <div className="rb-fi rb-d2"><Divider /></div>

        {/* ROW 2 */}
        <div className="rb-row rb-fi rb-d3" style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
          {ROW2.map(item => <DeviceCard key={item.id} item={item} />)}
        </div>

        {/* STATS */}
        <StatsBar />

        {/* CTA */}
        <div className="rb-cta-row rb-fi rb-d5" style={{ marginTop: 48, display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Link to="/contact" className="rb-cta-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#000", background: "var(--rb-green)",
            border: "none", borderRadius: 4, padding: "14px 32px",
            textDecoration: "none", cursor: "pointer", transition: "all 0.3s ease",
          }}>
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* <Link to="/portfolio" className="rb-cta-ghost" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)", background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4,
            padding: "14px 28px", textDecoration: "none", cursor: "pointer",
            transition: "all 0.3s ease",
          }}>
            View All Work
          </Link> */}
        </div>

      </div>
    </div>
  );
}
