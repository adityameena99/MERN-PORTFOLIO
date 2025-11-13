

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
      content: "Hi, I'm Aditya Meena, a MERN stack developer with a strong passion for building scalable, efficient, and user-friendly web applications. I enjoy solving challenging problems, learning new technologies, and constantly improving my skills to deliver the best solutions for real-world applications."
    },
    {
      title: "Education",
      content: "I have completed my B.Tech in Computer Science from Trinity Institute of Technology (2020-2024), maintaining a CGPA of 8.42. During my academic journey, I have gained in-depth knowledge in web development, data structures, algorithms, and project management, which helps me excel in real-world development tasks."
    },
    {
      title: "Achievements",
      content: "I have earned multiple certifications including Cisco Certification and Alphawizz Frontend Certification. Additionally, I secured 4th place in a highly competitive Web Hackathon out of 100 teams, which strengthened my problem-solving, teamwork, and project implementation skills."
    },
    {
      title: "Strength",
      content: "I am a quick learner with a strong problem-solving mindset and adaptability to new technologies. I excel at teamwork, communication, and paying attention to details in coding practices, which ensures high-quality and efficient solutions in all my projects."
    },
  ];

  const columns = [2, 1, 0, 2];

  useLayoutEffect(() => {
    const blocks = sectionRef.current.querySelectorAll(".text-block");

    blocks.forEach((block, i) => {
      gsap.fromTo(
        block,
        { y: 50, opacity: 0, scale: 0.95 },
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-screen bg-[#101010] min-h-screen flex flex-col items-center py-12 gap-12">
      <div className="grid grid-rows-4 grid-cols-3 gap-4 w-full max-w-7xl px-8">
        {details.map((detail, rowIndex) => {
          const colIndex = columns[rowIndex];

          return Array.from({ length: 3 }).map((_, i) => {
            if (i === colIndex) {
              return (
                <div
                  key={`row${rowIndex}-col${i}`}
                  className="text-block flex flex-col items-start justify-center bg-[#101010] shadow-lg rounded-lg p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-a5 text-[#FDFDFD]">{detail.title}</h2>
                    <GoArrowDownRight className="text-xl text-[#FDFDFD]" />
                  </div>
                  <p className="text-sm text-[#FDFDFD] font-a5 leading-relaxed">{detail.content}</p>
                </div>
              );
            } else {
              return <div key={`row${rowIndex}-col${i}`} />; 
            }
          });
        })}
      </div>

      <div className="w-full relative top-12">
        <Enquiry />
      </div>
    </div>
  );
};

export default MyDetails;

