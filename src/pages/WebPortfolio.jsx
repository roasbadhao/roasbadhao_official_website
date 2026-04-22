import React, { useState, useEffect, useRef, useCallback } from "react";

const list = [
  {
    name: "Roas Badhao",
    desc: "Business website developed for a digital marketing brand. The project focused on creating a modern, responsive design with clear service presentation, fast loading performance and strong conversion-focused layout.",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    thumbImg: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=200&q=80",
    additionalLink1: "https://roasbadhao.com/",
  },
  {
    name: "Laser Iberic",
    desc: "Professional website built for a laser service company. The design emphasizes service clarity, user friendly navigation and a responsive layout to provide a seamless experience across all devices.",
    img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    thumbImg: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=200&q=80",
    additionalLink1: "https://laseriberic.es/",
  },
  {
    name: "Invoicemint",
    desc: "Modern business website created for an invoicing platform. The project focused on clean UI design, structured content sections and responsive performance for a professional SaaS style presentation.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    thumbImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80",
    additionalLink1: "https://invoicemint.in/",
  },
  {
    name: "Famreliable",
    desc: "Service based business website designed with a focus on brand credibility and clear service communication. The layout ensures easy navigation and optimized user experience across devices.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    thumbImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80",
    additionalLink1: "https://famreliable.in/",
  },
  {
    name: "Rudra Hair Solutions",
    desc: "High-converting landing page developed for a hair treatment brand. The page is designed with a strong conversion focus, clear call-to-actions and mobile responsive layout to maximize lead generation.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    thumbImg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80",
    additionalLink1: "https://rudrahairsolutions.com/",
  }
];

const GMBPortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const rafRef = useRef(null);

  const goTo = useCallback((newIndex) => {
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
  }, [activeIndex]);

  const handleScroll = useCallback((event) => {
    event.preventDefault();
    const now = Date.now();
    // Accumulate scroll delta
    scrollAccumulator.current += event.deltaY;

    if (now - lastScrollTime.current > 80) {
      lastScrollTime.current = now;
      if (Math.abs(scrollAccumulator.current) > 30) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        scrollAccumulator.current = 0;
        setActiveIndex(prev => {
          let newIndex = prev + direction;
          if (newIndex < 0) newIndex = list.length - 1;
          if (newIndex >= list.length) newIndex = 0;
          setPrevIndex(prev);
          setAnimating(true);
          setTimeout(() => setAnimating(false), 600);
          return newIndex;
        });
      }
    }
  }, []);

  useEffect(() => {
    const el = document.getElementById("gmb-portfolio-root");
    if (el) {
      el.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  const activeInfo = list[activeIndex];

  const getItemTransform = (index) => {
    const total = list.length;
    const deg = (360 / total) * index - 90;
    const radius = 130;
    const rad = (deg * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    return { x, y };
  };

  const styles = {
    root: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      fontFamily: "'DM Sans', sans-serif",
    },
    bgImage: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${activeInfo.img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
      filter: "brightness(0.25) saturate(1.2)",
      zIndex: 0,
    },
    bgOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, rgba(0,0,0,0.92) 40%, rgba(0,200,200,0.08) 100%)",
      zIndex: 1,
    },
    leftCol: {
      position: "relative",
      zIndex: 10,
      width: "50%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rightCol: {
      position: "relative",
      zIndex: 10,
      width: "50%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: "20px",
    },
    orbitWrapper: {
      position: "relative",
      width: "300px",
      height: "300px",
    },
    orbitRing: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      border: "1.5px solid rgba(0,210,200,0.25)",
      animation: "orbitSpin 12s linear infinite",
    },
    orbitRing2: {
      position: "absolute",
      inset: "20px",
      borderRadius: "50%",
      border: "1px dashed rgba(255,255,255,0.08)",
    },
    centerDot: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: "radial-gradient(circle, #00d4c8, #007a73)",
      boxShadow: "0 0 20px rgba(0,212,200,0.8)",
      zIndex: 5,
    },
    infoCard: {
      width: "380px",
      maxWidth: "90vw",
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "24px",
      padding: "40px 36px",
      boxShadow: "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(0,212,200,0.15)",
      border: "1px solid rgba(0,212,200,0.3)",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "11px",
      fontWeight: "600",
      color: "#00d4c8",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#ffffff",
      lineHeight: "1.3",
      marginBottom: "14px",
      letterSpacing: "-0.3px",
    },
    cardDesc: {
      fontSize: "13.5px",
      lineHeight: "1.75",
      color: "rgba(255,255,255,0.55)",
      marginBottom: "28px",
    },
    viewBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "linear-gradient(135deg, #00d4c8, #007a73)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "12px 28px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "none",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 8px 24px rgba(0,212,200,0.3)",
      letterSpacing: "0.02em",
    },
    counter: {
      position: "absolute",
      bottom: "32px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    dot: (isActive) => ({
      width: isActive ? "24px" : "6px",
      height: "6px",
      borderRadius: "3px",
      background: isActive ? "#00d4c8" : "rgba(255,255,255,0.2)",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
    }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,200,0.8); }
          50% { box-shadow: 0 0 35px rgba(0,212,200,1), 0 0 60px rgba(0,212,200,0.4); }
        }
        .gmb-orbit-item {
          position: absolute;
          width: 62px;
          height: 62px;
          top: 50%;
          left: 50%;
          margin-top: -31px;
          margin-left: -31px;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, box-shadow 0.3s ease;
          border-radius: 50%;
          overflow: hidden;
          border: 2.5px solid rgba(255,255,255,0.12);
          opacity: 0.55;
        }
        .gmb-orbit-item:hover {
          opacity: 0.9;
          border-color: rgba(0,212,200,0.5);
        }
        .gmb-orbit-item.is-active {
          opacity: 1;
          border: 2.5px solid #00d4c8;
          box-shadow: 0 0 0 4px rgba(0,212,200,0.2), 0 0 20px rgba(0,212,200,0.5);
          z-index: 10;
        }
        .gmb-orbit-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gmb-orbit-item:hover img {
          transform: scale(1.08);
        }
        .gmb-info-card {
          animation: fadeSlideIn 0.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        .gmb-view-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 32px rgba(0,212,200,0.45);
        }
        .gmb-center-dot {
          animation: pulse 2.5s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .gmb-layout {
            flex-direction: column !important;
          }
          .gmb-left-col {
            width: 100% !important;
            height: 45vh !important;
            padding-top: 20px;
          }
          .gmb-right-col {
            width: 100% !important;
            height: 55vh !important;
            justify-content: center !important;
            padding-left: 0 !important;
            padding: 0 20px;
          }
          .gmb-info-card {
            width: 100% !important;
            max-width: 100% !important;
            padding: 24px 20px !important;
          }
          .gmb-orbit-wrapper {
            width: 220px !important;
            height: 220px !important;
          }
        }
      `}</style>

      <div id="gmb-portfolio-root" style={styles.root}>
        {/* Background */}
        <div style={styles.bgImage} key={activeIndex} />
        <div style={styles.bgOverlay} />

        {/* Layout */}
        <div className="gmb-layout" style={{ display: "flex", width: "100%", height: "100%", position: "relative", zIndex: 10 }}>

          {/* LEFT: Orbit */}
          <div className="gmb-left-col" style={styles.leftCol}>
            <div className="gmb-orbit-wrapper" style={styles.orbitWrapper}>
              <div style={styles.orbitRing} />
              <div style={styles.orbitRing2} />
              <div className="gmb-center-dot" style={styles.centerDot} />

              {list.map((el, key) => {
                const { x, y } = getItemTransform(key);
                const isActive = activeIndex === key;
                return (
                  <div
                    key={key}
                    className={`gmb-orbit-item${isActive ? " is-active" : ""}`}
                    onClick={() => {
                      if (key !== activeIndex) goTo(key);
                    }}
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${isActive ? 1.18 : 1})`,
                    }}
                  >
                    <img src={el.img} alt={el.name} loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Info Card */}
          <div className="gmb-right-col" style={styles.rightCol}>
            <div
              className="gmb-info-card"
              style={styles.infoCard}
              key={activeIndex}
            >
              <div style={styles.badge}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4c8", display: "inline-block" }} />
                GMB Optimization
              </div>

              <h2 style={styles.cardTitle}>{activeInfo.name}</h2>
              <p style={styles.cardDesc}>{activeInfo.desc}</p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <a
                  href={activeInfo.additionalLink1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gmb-view-btn"
                  style={styles.viewBtn}
                >
                  View Live
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: "500" }}>
                  {activeIndex + 1} / {list.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom dots */}
        <div style={styles.counter}>
          {list.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{ ...styles.dot(i === activeIndex), cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GMBPortfolio;