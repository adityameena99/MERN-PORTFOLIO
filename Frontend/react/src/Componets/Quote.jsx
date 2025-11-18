

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
  const sectionRef = useRef(null);
  const lettersRef = useRef(null);
  const newQuoteRef = useRef(null);

  const textLines = [
    "DESIGN",
    "IS NOT JUST",
    "DECORATION",
    "BUT A TOOL FOR INFLUENCE",
    "AND GROWTH"
  ];

  const secondQuote = "CREATIVITY STARTS HERE";

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const letters = lettersRef.current.querySelectorAll("span");
    const newQuoteEl = newQuoteRef.current;

    if (!section || !letters.length) return;

    const targets = Array.from(letters).map(() => ({
      x: gsap.utils.random(-250, 250),
      y: gsap.utils.random(-300, 300),
      rotation: gsap.utils.random(-360, 360),
    }));

    letters.forEach(l =>
      gsap.set(l, {
        display: "inline-block",
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1
      })
    );

    gsap.set(newQuoteEl, { opacity: 0, y: 50 });

    const tl = gsap.timeline({ paused: true })
      .to(letters, {
        x: (i) => targets[i].x,
        y: (i) => targets[i].y,
        rotation: (i) => targets[i].rotation,
        opacity: 0,
        stagger: 0.02,
        ease: "power2.out",
      })
      .to(letters, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.02,
        ease: "power2.inOut",
      })
      .to(newQuoteEl, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      });

    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: "top top",
      end: "+=2200",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#101010",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "1rem"
      }}
    >
      <h1
        ref={lettersRef}
        style={{
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.2,
          whiteSpace: "pre-wrap",
          margin: 0,
          fontSize: "clamp(2.2rem, 5vw, 6.4rem)",   
        }}
      >
        {textLines.map((line, i) => (
          <React.Fragment key={i}>
            {line.split("").map((char, idx) => {
              const color =
                line === "DECORATION" && char !== " " ? "#A9A9A9" : "white";
              return (
                <span key={i + "-" + idx} style={{ color }}>
                  {char}
                </span>
              );
            })}
            <br />
          </React.Fragment>
        ))}
      </h1>

      <h2
        ref={newQuoteRef}
        style={{
          color: "#38ffad",
          textAlign: "center",
          marginTop: "2rem",
          fontSize: "clamp(1.4rem, 3vw, 3rem)",  
        }}
      >
        {secondQuote}
      </h2>
    </section>
  );
}
