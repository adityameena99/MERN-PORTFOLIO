

  import React, { useRef, useEffect } from "react";
  import { gsap } from "gsap";
  import { PiSmileyWink } from "react-icons/pi";
  import { Link } from "react-router-dom"; // <-- import Link


  const Navbar = () => {
    const logoRef = useRef(null);
    const sectionRef = useRef(null);
    const focusRef = useRef(null);

    useEffect(() => {
      const logoEl = logoRef.current;
      const hoverAnimation = () => {
        gsap.to(logoEl, {
          rotation: 360,
          scale: 1.2,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () =>
            gsap.to(logoEl, { rotation: 0, scale: 1, duration: 0.3 }),
        });
      };
      logoEl.addEventListener("mouseenter", hoverAnimation);
      return () => logoEl.removeEventListener("mouseenter", hoverAnimation);
    }, []);

    useEffect(() => {
      const focusEl = focusRef.current;
      const sectionEl = sectionRef.current;

      const handleMouseEnter = (e) => {
        const target = e.target;
        if (target.tagName === "A") { 
          const sectionRect = sectionEl.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();

          const left = targetRect.left - sectionRect.left - 6;
          const top = targetRect.top - sectionRect.top - 6;
          const width = target.offsetWidth + 12;
          const height = target.offsetHeight + 12;

          gsap.to(focusEl, {
            left,
            top,
            width,
            height,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(focusEl, { opacity: 0, duration: 0.4, ease: "power3.out" });
      };

      const navLinks = sectionEl.querySelectorAll("a"); // <-- select all links
      navLinks.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        navLinks.forEach((link) => {
          link.removeEventListener("mouseenter", handleMouseEnter);
          link.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }, []);

    return (
      <div className="relative w-full">
        {/* Glassy Gradient Navbar */}
        <div
          ref={sectionRef}
          className="relative flex justify-center items-center px-20 py-6 mx-auto w-80 mt-10"
          style={{
            position:"fixed",
            top:"0%",
            left:"40%",
            zIndex:9999,

            background:
              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            overflow: "hidden",
          }}
        >
         
          <div
            ref={focusRef}
            className="absolute rounded-lg pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              opacity: 0,
              background: "yellow",
              filter: "blur(12px)",
            }}
          ></div>

          <div className="flex items-center gap-8 relative z-10">
            <Link
              to="/"
              className="hover:text-black transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/extras"
              className="hover:text-black transition-colors duration-300 font-medium"
            >
              Extras
            </Link>
            <Link
              to="/about"
              className="hover:text-black transition-colors duration-300 font-medium"
            >
            About
            </Link>
            <Link
              to="/skills"
              className="hover:text-black transition-colors duration-300 font-medium"
            >
              Skills
            </Link>
          </div>
        </div>

        <div
          ref={logoRef}
          style={{
            position: "fixed",
            left: 20,
            top: "10%",
            transform: "translateY(-50%)",
            fontSize: "80px",
            cursor: "pointer",
            color: "black",
            zIndex: 1000,
          }}
        >
          <PiSmileyWink />
        </div>
      </div>
    );
  };

  export default Navbar;
    