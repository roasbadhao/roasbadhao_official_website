import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MobilePortfolio.css";

const GooglePortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  const list = [
    {
      name: "Dale3joa3ak (Food App)",
      desc: "Food ordering platform description...",
      img: "",
      thumbImg: "",
      additionalImage1: "",
      additionalImage2: "",
      additionalLink1: "#",
      additionalLink2: "#",
    },
    {
      name: "One2One (Placement Test)",
      desc: "English placement test app description...",
      img: "",
      thumbImg: "",
      additionalImage1: "",
      additionalImage2: "",
      additionalLink1: "#",
      additionalLink2: "#",
    },
    {
      name: "Reson8 (Music)",
      desc: "Music healing app description...",
      img: "",
      thumbImg: "",
      additionalImage1: "",
      additionalImage2: "",
      additionalLink1: "#",
      additionalLink2: "#",
    },
  ];

  const activeInfo = list[activeIndex];

  const itemPosition = list.map((_, key) => {
    const deg = (360 / list.length) * key - 90;
    const radius = "8rem";
    return `rotate(${deg}deg) translate(${radius}) rotate(${-deg}deg)`;
  });

  const handleScroll = (event) => {
    if (isScrolling) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    let newIndex = activeIndex + direction;

    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex >= list.length) newIndex = 0;

    setActiveIndex(newIndex);
    setIsScrolling(true);

    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    if (location.pathname === "/app-portfolio") {
      document.body.classList.add("bodys-1");
    }

    window.addEventListener("wheel", handleScroll);

    return () => {
      document.body.classList.remove("bodys-1");
      window.removeEventListener("wheel", handleScroll);
    };
  }, [location.pathname, activeIndex, isScrolling]);

  return (
    <div className="container-fluid" id="portolio">
      <Link to="/mobile-inner">
        <button id="viewallbutton">View All</button>
      </Link>

      <div className="row portrow">
        <div className="col-md-6 opcity">
          <div
            className="hero-bg"
            style={
              activeInfo.img
                ? { backgroundImage: `url(${activeInfo.img})` }
                : {}
            }
          ></div>

          <div className="round">
            {list.map((el, key) => (
              <div
                className={`item ${activeIndex === key ? "active" : ""}`}
                onClick={() => setActiveIndex(key)}
                key={key}
                style={{ transform: itemPosition[key] }}
              >
                <div className="inner">
                  {el.thumbImg && <img src={el.thumbImg} alt="" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          {activeInfo && (
            <div className="hero-info">
              <div className="content">{activeInfo.name}</div>
              <div className="content desc">{activeInfo.desc}</div>

              <div
                className="row appbtn"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {activeInfo.additionalImage1 && (
                  <a href={activeInfo.additionalLink1}>
                    <img src={activeInfo.additionalImage1} alt="" />
                  </a>
                )}

                {activeInfo.additionalImage2 && (
                  <a href={activeInfo.additionalLink2}>
                    <img src={activeInfo.additionalImage2} alt="" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GooglePortfolio;