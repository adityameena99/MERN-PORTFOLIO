

import React, { useRef } from "react";
import { gsap } from "gsap";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";
import Footer from "./Footer";

const skills = [
  { title: "MONGO DB", color: "#4DB33D", Icon: SiMongodb, desc: { duration: "1 Years", experience: "NoSQL DB, Aggregations, Indexing" } },
  { title: "EXPRESS", color: "#000000", Icon: SiExpress, desc: { duration: "1 Years", experience: "REST APIs, Middleware, Routing" } },
  { title: "REACT", color: "#61DAFB", Icon: SiReact, desc: { duration: "1 Years", experience: "Hooks, Components, State Management" } },
  { title: "NODE JS", color: "#8CC84B", Icon: SiNodedotjs, desc: { duration: "1 Years", experience: "Server-side JS, Async, Express" } },
];

const Skills = () => {
  const descRefs = useRef([]);
  const titleRef = useRef(null);

  const defaultTitle = "Skills"; 

  const handleHover = (skill, index) => {
    descRefs.current.forEach((el, i) => {
      if (i === index) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
        );
      } else {
        el.style.display = "none";
      }
    });

    if (titleRef.current) {
      titleRef.current.textContent = skill.title;
      titleRef.current.style.color = skill.color;
    }
  };

  const handleLeave = () => {
    descRefs.current.forEach((el) => (el.style.display = "none"));
    if (titleRef.current) {
      titleRef.current.textContent = defaultTitle;
      titleRef.current.style.color = "#4B5563"; 
    }
  };

  return (
    <section className="intro min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#F7F7F7] pt-40">
      <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-gray-700 tracking-wide">
         {defaultTitle}
      </h2>

      <div className="hex-grid flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            className="hex-wrap w-32 h-32 flex flex-col items-center justify-center cursor-pointer bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2"
            onMouseEnter={() => handleHover(skill, index)}
            onMouseLeave={handleLeave}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-inner text-3xl text-gray-700">
              <skill.Icon />
            </div>
          </div>
        ))}
      </div>

      <div className="code-display mt-10 w-96 min-h-[180px] bg-white shadow-2xl rounded-xl p-6 relative">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            ref={(el) => (descRefs.current[index] = el)}
            className="desc absolute top-6 left-6 w-[85%] bg-gray-50 rounded-lg p-4 shadow-md text-gray-700 transition-opacity duration-300"
            style={{ display: "none" }}
          >
            <p className="font-semibold text-gray-800 mb-2">Duration: {skill.desc.duration}</p>
            <p className="text-gray-600">Experience: {skill.desc.experience}</p>
          </div>
        ))}
      </div>
       <div className="mt-auto w-full">
    <Footer />
  </div>
    </section>
    

  );
};

export default Skills;
