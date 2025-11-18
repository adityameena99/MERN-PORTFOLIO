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
    <section className="intro min-h-screen overflow-hidden flex flex-col items-center justify-start bg-[#F7F7F7] pt-32 pb-20 px-4 md:px-8">
      
      {/* Responsive Title */}
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-gray-700 tracking-wide text-center"
      >
        {defaultTitle}
      </h2>

      {/* Responsive Skills Grid */}
      <div className="hex-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 place-items-center w-full max-w-5xl">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            className="hex-wrap w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center cursor-pointer bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2"
            onMouseEnter={() => handleHover(skill, index)}
            onMouseLeave={handleLeave}
            onClick={() => handleHover(skill, index)}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-inner text-2xl sm:text-3xl text-gray-700">
              <skill.Icon />
            </div>
          </div>
        ))}
      </div>

     
      <div className="code-display mt-10 w-full max-w-md bg-white shadow-2xl rounded-xl p-6 relative min-h-[180px]">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            ref={(el) => (descRefs.current[index] = el)}
            className="desc absolute top-6 left-6 w-[85%] bg-gray-50 rounded-lg p-4 shadow-md text-gray-700 transition-opacity duration-300"
            style={{ display: "none" }}
          >
            <p className="font-semibold text-gray-800 mb-2">
              Duration: {skill.desc.duration}
            </p>
            <p className="text-gray-600">
              Experience: {skill.desc.experience}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 w-full">
        <Footer />
      </div>
    </section>
  );
};

export default Skills;
