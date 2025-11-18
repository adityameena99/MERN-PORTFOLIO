




import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";


const getCardSize = (width) => {
  if (width < 400) return 130; 
  if (width < 768) return 160;
  if (width < 1024) return 200; 
  return 250; 
};

export default function Home() {
  const cardsRef = useRef(null);
  const tweenRef = useRef(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const cardSize = getCardSize(windowSize.width);

 const cardsPositions = [
  { top: "83.3%", left: "0%", width: 250, height: 250,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e0a059ea93d0fb2bc73_Clou_Canvas-Arcon.avif"},
  { top: "83.3%", left: "33.3%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_Clou_Portfolio_TFL_Tiny.avif"},
  { top: "83.3%", left: "66.6%", width: 250, height: 250,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_Clou_Canvas-New-Hope.avif" },
  { top: "83.3%", left: "0%", width: 250, height: 250,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_Clou_Canvas-New-Hope.avif" },
  { top: "83.3%", left: "33.3%", width: 250, height: 250,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/6792613a5d497ebec43738c6_RZ_Clou_Portfolio_LIV_Achte_auf_dich_Home_04_Tiny.avif" },
  { top: "83.3%", left: "66.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e40966b042051b90fb8_Clou_Canvas-Charles-Nguela.avif"},
  { top: "0%", left: "16.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e52ade312753d5f2878_Clou_Canvas-Vitality-Cards.avif"},
  { top: "0%", left: "50%", width: 250, height: 250,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_Clou_Canvas-Beialge-Magazin-p-800.avif" },
  { top: "16.6%", left: "0%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_Clou_Canvas-Die-Goettliche-Ordnung.avif"},
  { top: "16.6%", left: "33.3%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e733244c9eb3d3ffa63_Clou_Canvas-Loris-Mate-p-800.avif" },
  { top: "16.6%", left: "66.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_Clou_Canvas-Sachaklemm.avif"},
  { top: "33.3%", left: "16.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e82c8259eeb5be828b6_Clou_Canvas-Spinnerei.avif"},
  { top: "33.3%", left: "50%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e882afc6a8848e76033_Clou_Canvas-Stans-Lacht-p-800.avif"},
  { top: "50%", left: "0%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/662ada89cc9223abd9d38e9d_LAY_Clou_Portfolio_Entwu%CC%88rfe_01_Test_Lostly_24_Tiny.avif"},
  { top: "50%", left: "33.3%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/690b7d2438e3ee9b3b49aa77_Clou_202510_Journal_Fabian_Georgien_00_Teaser_tinyy.avif"},
  { top: "50%", left: "66.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/68ef62e36b95e84de25a889f_251015_Clou_Journal_Caldetes_Bilder9.avif"},
  { top: "66.6%", left: "16.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/68b7f07fd8cb5c4ce5bbe55a_250903_Clou_Journal_Rauszeit-Sam_thumbnail_tiny.avif"},
  { top: "66.6%", left: "50%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/67a0cb349bff4cd3b45cc8ce_250203_Clou_Fokus8_Teil3_DSCF6915_thumbnail_tiny.avif"},
  { top: "83.3%", left: "0%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/670fd213bda6e101f6de1919_LB_2024_Valencia_DSCF4034_Hero.avif"},
  { top: "83.3%", left: "33.3%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66ffb6aaf22949f5857e556e_LB_2024_Valencia-DSCF3599.jpg"},
  { top: "83.3%", left: "66.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/666323e0d6a44b157fb38189_LAY_Clou_Rauszeit_Michelle_Tipps2_Tiny.avif"},
  { top: "83.3%", left: "0%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/6657083003a0bb8927c30844_LAY_Clou_Rauszeit_Michelle_Tiny.avif"},
  { top: "83.3%", left: "33.3%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/665dd9c8d3348ec5e2062ca9_Clou_Rauszeit_CDMX_thumbnail_1080x1080_tiny.avif"},
  { top: "83.3%", left: "66.6%", width: 250, height: 250 ,img: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/662f47f4a2a1a64094d11c8e_Clou_Journal_Rauszeit_Albi_Kapstadt_tiny_1080x1080.avif"},
];

  
  useEffect(() => {
    const cardsDiv = cardsRef.current;

    const handleMouseMove = (e) => {
      const speedFactor = windowSize.width < 600 ? 0.7 : 2; // slow movement for mobile
      const targetX = (e.clientX / window.innerWidth - 0.5) * 400 * speedFactor;
      const targetY = (e.clientY / window.innerHeight - 0.5) * 400 * speedFactor;

      if (tweenRef.current) tweenRef.current.kill();
      tweenRef.current = gsap.to(cardsDiv, {
        x: targetX,
        y: targetY,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [windowSize]);

 
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fefefe]">

      <div
        className="absolute top-1/2 left-1/2 z-[9999] text-center mix-blend-difference pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ color: "white" }}
      >
        <div className="font-a1 font-bold leading-none whitespace-nowrap"
          style={{
            fontSize: windowSize.width < 400 ? "60px" :
                      windowSize.width < 768 ? "120px" :
                      "200px",
          }}>
          HELLO I'M
        </div>

        <div className="font-a1 leading-none whitespace-nowrap"
          style={{
            fontSize: windowSize.width < 400 ? "40px" :
                      windowSize.width < 768 ? "80px" :
                      "140px",
          }}>
          Aditya Meena
        </div>
      </div>

      
      <div
        ref={cardsRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: windowSize.width * 2,
          height: windowSize.height * 2,
        }}
      >
        {cardsPositions.map((card, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: card.top,
              left: card.left,
              width: cardSize,
              height: cardSize,
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <img
              src={card.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
