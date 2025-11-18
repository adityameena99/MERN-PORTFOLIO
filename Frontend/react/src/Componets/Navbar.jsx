

  import React, { useRef, useEffect, useState } from "react";
  import { gsap } from "gsap";
  import { PiSmileyWink } from "react-icons/pi";
  import { Link } from "react-router-dom";
  import { IoMenu, IoClose } from "react-icons/io5";

  const Navbar = () => {
    const logoRef = useRef(null);
    const sectionRef = useRef(null);
    const focusRef = useRef(null);

    const [open, setOpen] = useState(false);

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

      if (!sectionEl) return;

      const handleMouseEnter = (e) => {
        const target = e.target;
        if (target.tagName === "A") {
          const containerRect = sectionEl.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();

          const left = targetRect.left - containerRect.left - 6;
          const top = targetRect.top - containerRect.top - 6;
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
        gsap.to(focusEl, { opacity: 0, duration: 0.3 });
      };

      const navLinks = sectionEl.querySelectorAll("a");

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
      <>

        <div className="pointer-events-none fixed top-0 left-0 w-full z-[99]">
<div
  ref={logoRef}
  className="
    pointer-events-auto
    fixed left-3 top-3 
    text-4xl 
    md:left-4 md:top-6 
    md:text-7xl 
    cursor-pointer
  "
>
  <PiSmileyWink />
</div>


          
          <div
            ref={sectionRef}
            className="
              pointer-events-auto
              hidden md:flex 
              justify-center items-center 
              fixed top-6 left-1/2 -translate-x-1/2 
              px-10 py-4
            "
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.25))",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
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

            <div className="flex items-center gap-10 text-[18px] font-medium z-[10]">
              <Link to="/">Home</Link>
              <Link to="/extras">Extras</Link>
              <Link to="/about">About</Link>
              <Link to="/skills">Skills</Link>
            </div>
          </div>

       
          <div className="pointer-events-auto md:hidden fixed top-3 right-4">
            <button
              onClick={() => setOpen(!open)}
              className="text-4xl p-2  shadow-md"
            >
              {open ? <IoClose /> : <IoMenu />}
            </button>

            {open && (
              <div className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg py-4 flex flex-col gap-4 text-lg">
                <Link onClick={() => setOpen(false)} to="/" className="px-4">
                  Home
                </Link>
                <Link onClick={() => setOpen(false)} to="/extras" className="px-4">
                  Extras
                </Link>
                <Link onClick={() => setOpen(false)} to="/about" className="px-4">
                  About
                </Link>
                <Link onClick={() => setOpen(false)} to="/skills" className="px-4">
                  Skills
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  export default Navbar;
