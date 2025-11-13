
import React, { useEffect, useRef } from "react";
import MyDetails from "./MyDetails";
import Footer from "./Footer";
import { gsap } from "gsap";

const About = () => {
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const skillsRef = useRef(null);

  const txt = "MERN-STACK";

 
  const CHARSETS = {
    hex: "/ 0123456789ABCDEF",
    binary: "/ 01",
    alnum: "/ ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  };

  
  const createBlip = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      return (freq = 900, time = 0.05, type = "sine", gain = 0.02) => {
        try {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = type;
          o.frequency.value = freq;
          g.gain.value = gain;
          o.connect(g);
          g.connect(ctx.destination);
          o.start();
          g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + time);
          o.stop(ctx.currentTime + time + 0.02);
        } catch (e) {
          console.log("ignore sound erros")
        }
      };
    } catch (e) {
      
      return () => {};
    }
  };

  
  const randFrom = (str) => str[Math.floor(Math.random() * str.length)];

  const scramble = (el, finalText, opts = {}) => {
    if (!el) return Promise.resolve();
    const { duration = 1200, flicker = true, charset = CHARSETS.alnum, blip } = opts;
    const chars = finalText.split("");
    const len = chars.length;

    
    const originalStyle = el.style.cssText;
    el.style.whiteSpace = "pre"; 

    const start = performance.now();
    const end = start + duration;

    
    const revealTimes = Array.from({ length }).map(() => start + Math.random() * duration);

    return new Promise((resolve) => {
      const frame = (now) => {
        if (now >= end) {
          el.textContent = finalText;
          el.style.cssText = originalStyle;
          return resolve();
        }

        let out = "";
        for (let i = 0; i < len; i++) {
          if (now >= revealTimes[i]) {
            out += chars[i];
          } else {
            
            if (flicker && Math.random() < 0.05) out += " ";
            else out += randFrom(charset);
          }
        }

        el.textContent = out;

      
        if (blip && Math.random() < 0.06) {
          try {
            blip(600 + Math.random() * 1200, 0.035, "sawtooth", 0.01);
          } catch (e) {}
        }

        requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    });
  };

  useEffect(() => {

    const chars = Array.from(textRef.current.children);
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.08, ease: "power3.out" }
    );

  
    gsap.fromTo(
      cardRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power3.out", delay: 1.35 }
    );

    
    const items = skillsRef.current.querySelectorAll(".skill-item");
    if (!items || items.length === 0) return;

    
    const blip = createBlip();

    
    const configs = [
      { charset: CHARSETS.alnum, duration: 1000 }, 
      { charset: CHARSETS.hex, duration: 900 },   
      { charset: CHARSETS.binary, duration: 1100 } 
    ];

    
    const promises = Array.from(items).map((el, idx) => {
      const final = el.dataset.final || el.textContent.trim();
      el.textContent = ""; 
      const cfg = configs[idx % configs.length];
      return new Promise((res) => {
        setTimeout(() => {
          scramble(el, final, { duration: cfg.duration, charset: cfg.charset, flicker: true, blip }).then(res);
        }, idx * 150);
      });
    });

    Promise.all(promises).then(() => {
      
      gsap.fromTo(
        items,
        { y: -6 },
        { y: 0, duration: 0.6, ease: "elastic.out(1,0.6)", stagger: 0.03 }
      );
    });

    
    return () => {
    
    };
  }, []);

  return (
    <>
      
      <div className="relative grid h-screen place-items-center overflow-hidden bg-[#F7F7F7]">
        <h1
          ref={textRef}
          aria-label={txt}
          className="absolute flex font-a3 font-bold text-[270px] uppercase z-10"
          style={{ top: "15%" }}
        >
          {txt.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char}
            </span>
          ))}
        </h1>
          <h5
    className="absolute text-[17px] flex gap-9 font-a6 text-[#101010]"
    style={{ top: "51%", left: "83.5%" }} // adjust left/top for exact placement
  >
    BASED IN BHOPAL
  </h5>

        <div
          ref={skillsRef}
          className="w-[650px] h-[350px] flex flex-col leading-tight m-5 bg-[#F1F1F1] relative top-48 left-24"
        >

          

          <h6
            className="skill-item font-a4 text-[25px] relative top-52"
            data-final="/ MERN STACK DEVELOPER"
          >
            / MERN STACK DEVELOPER
          </h6>

          <h6
            className="skill-item font-a4 text-[25px] relative top-56"
            data-final="/ ART DIRECTION"
          >
            / ART DIRECTION
          </h6>

          <h6
            className="skill-item font-a4 text-[25px] relative top-60"
            data-final="/ WEB DEVELOPER"
          >
            / WEB DEVELOPER
          </h6>
        </div>

        <div
          ref={cardRef}
          className="absolute z-5"
          style={{ top: "48%", left: "65%", transform: "translateX(-50%)" }}
        >
         <img src="https://ik.imagekit.io/en7u7mka0/IMG_2726.jpeg?updatedAt=1762961354484" alt=""  className="w-[300px] h-[350px] object-cover" />
        </div>
      </div>

      <MyDetails />
      <Footer />
    </>
  );
};

export default About;
