

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const verticalItems = [
  { 
    id: 1, 
    media: "https://ik.imagekit.io/en7u7mka0/Screenshot%202025-11-12%20at%209.07.11%E2%80%AFPM.png?updatedAt=1762963105467",
    links: {
      github: "https://github.com/adityameena99/RANCHO",
      
      visit: "https://rancho-livid.vercel.app/"
    }
  },
  { 
    id: 2, 
    media: "https://ik.imagekit.io/en7u7mka0/Screenshot%202025-11-12%20at%209.08.41%E2%80%AFPM.png?updatedAt=1762963399509",
    links: {
      github: "https://github.com/adityameena99/Centric-Health-Care",
 
      visit: "https://centric-health-care.vercel.app/"
    }
  },
  { 
    id: 3, 
    media: "https://ik.imagekit.io/en7u7mka0/Screenshot%202025-11-12%20at%209.10.05%E2%80%AFPM.png?updatedAt=1762963047225",
    links: {
      github: "https://github.com/adityameena99/BLOGGY",
 
      visit: "https://bloggy-rouge.vercel.app/"
    }
  },
  { 
    id: 4, 
    media: "https://ik.imagekit.io/en7u7mka0/Screenshot%202025-11-12%20at%209.11.49%E2%80%AFPM.png?updatedAt=1762963402854",
    links: {
      github: "https://github.com/adityameena99/Mocktail",
   
      visit: "https://mocktail-d7ib.vercel.app/"
    } 
  },
  { 
    id: 5, 
    media: "https://ik.imagekit.io/en7u7mka0/Screenshot%202025-11-12%20at%209.41.21%E2%80%AFPM.png?updatedAt=1762964235660", // naya image
    links: { github: "https://github.com/adityameena99/Sneaker", 
      visit: "https://sneaker-xi.vercel.app/" 
    }
  },
];

export default function VerticalStackCards() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = section.querySelectorAll(".card-wrap");

    
    cards.forEach((card, i) => {
      if (i !== 0) gsap.set(card, { yPercent: 100 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        scrub: 1,
      },
      defaults: { ease: "none" },
    });

   
    cards.forEach((card, i) => {
      tl.to(card, { scale: 0.9, borderRadius: "12px" });
      if (i + 1 < cards.length) {
        tl.to(cards[i + 1], { yPercent: 0 }, "<");
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={sectionRef} className="relative w-screen h-screen overflow-hidden bg-[#F7F7F7]">
      <div className="absolute top-14 left-24">
        <h1 className="text-[130px] font-a2">Projects</h1>
      </div>

      <div className="relative w-full h-full flex items-end justify-center m-6">
        {verticalItems.map((item) => (
          <div
            key={item.id}
            className="card-wrap absolute inset-0 flex items-end justify-center"
          >
            <div className="relative w-[90vw] h-[75vh] rounded-2xl overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.45)] bg-black">
              <img src={item.media} className="w-full h-full object-cover" alt={`Card ${item.id}`} />

              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-6 text-[11px] uppercase tracking-wider">
                <span className="font-semibold">Dive</span>
                <nav className="flex items-center gap-4">
                  <a href={item.links.github}><button className="hover:text-[#FFD03D] transition">Github</button></a>  
                  <a href={item.links.visit}><button className="hover:text-[#FFD03D] transition">Visit</button></a>  
                 
                </nav>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
