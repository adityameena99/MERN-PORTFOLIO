
import React, { useLayoutEffect, useRef } from "react";
import { GoArrowDownRight } from "react-icons/go";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Enquiry from "./Enquiry";

gsap.registerPlugin(ScrollTrigger);

const MyDetails = () => {
  const sectionRef = useRef(null);

  const details = [
    {
      title: "About Me",
      content:
        "Hi, I'm Aditya Meena, a MERN stack developer with a strong passion for building scalable, efficient, and user-friendly web applications.",
    },
    {
      title: "Education",
      content:
        "B.Tech in Computer Science (2020–2024) with a CGPA of 8.42 from Trinity Institute of Technology.",
    },
    {
      title: "Achievements",
      content:
        "Cisco Certification, Alphawizz Frontend Certification, and ranked 4th in a Web Hackathon out of 100 teams.",
    },
    {
      title: "Strength",
      content:
        "Quick learner, problem-solving mindset, teamwork, communication, and strong attention to detail.",
    },
  ];

  useLayoutEffect(() => {
    const blocks = sectionRef.current.querySelectorAll(".text-block");

    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
          ease: "power3.out",
          duration: 1.2,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-screen bg-[#101010] min-h-screen flex flex-col items-center py-12 gap-12"
    >
      
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          w-full 
          max-w-7xl 
          px-8
        "
      >
        {details.map((detail, index) => (
          <div
            key={index}
            className="
              text-block 
              flex 
              flex-col 
              items-start 
              justify-center 
              bg-[#101010] 
              shadow-xl 
              rounded-xl 
              p-6 
              border 
              border-[#2A2A2A]
            "
          >
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-a5 text-[#FDFDFD]">{detail.title}</h2>
              <GoArrowDownRight className="text-xl text-[#FDFDFD]" />
            </div>

            <p className="text-sm text-[#FDFDFD] font-a5 leading-relaxed">
              {detail.content}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full relative top-12">
        <Enquiry />
      </div>
    </div>
  );
};

export default MyDetails;
