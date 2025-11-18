

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";

const heading = "MERN STACK DEVELOPER";
const subheading = "ADITYA • MEENA • PHENOMENAL • ONE";

function CircularTextRing({
  text,
  radius,
  rotationSpeed,
  mouse,
  yOffset = 0,
  fontSize = 0.4,
  fontWeight = "normal",
  angularSpread = 2.5,
}) {
  const groupRef = useRef();
  const letters = text.split("");

  const letterPositions = letters.map((char, i) => {
    const angle = (i / letters.length) * angularSpread;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    const rotY = angle;
    return { x, y: yOffset, z, rotY, char };
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x = mouse.y * 0.4;
      groupRef.current.rotation.z = mouse.x * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {letterPositions.map((pos, idx) => (
        <Text
          key={idx}
          position={[pos.x, pos.y, pos.z]}
          rotation={[0, pos.rotY, 0]}
          fontSize={fontSize}
          color="black"
          anchorX="center"
          anchorY="middle"
          fontWeight={fontWeight}
        >
          {pos.char}
        </Text>
      ))}
    </group>
  );
}

export default function Loader({ onFinish }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(0);
  const loaderRef = useRef();

  // 🔥 PC mouse
  const handleMouseMove = (e) => {
    setMouse({
      x: ((e.clientX / window.innerWidth) - 0.5) * 2,
      y: ((e.clientY / window.innerHeight) - 0.5) * 2,
    });
  };

  const handleTouchMove = (e) => {
    const t = e.touches[0];
    setMouse({
      x: ((t.clientX / window.innerWidth) - 0.5) * 2,
      y: ((t.clientY / window.innerHeight) - 0.5) * 2,
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onFinish && onFinish(),
    });

   
    tl.to({}, {
      duration: 2.5,
      onUpdate: function () {
        setLoading(Math.round(this.progress() * 100));
      },
    });

   
    tl.to(loaderRef.current, {
      y: "-100%",
      duration: 1.1,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#F7F7F7",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
   
      <h1
        style={{
          color: "#000",
          fontSize: window.innerWidth < 500 ? "2rem" : "3.5rem",
          marginBottom: "2rem",
          fontFamily: "monospace",
        }}
      >
        {loading}%
      </h1>

      <Canvas
        camera={{ position: [0, 3, 12] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <CircularTextRing
          text={heading}
          radius={window.innerWidth < 500 ? 2.5 : 4}
          rotationSpeed={0.01}
          mouse={mouse}
          yOffset={window.innerWidth < 500 ? 1 : 1.5}
          fontSize={window.innerWidth < 500 ? 0.6 : 1}
          fontWeight="bold"
          angularSpread={6}
        />

        <CircularTextRing
          text={subheading}
          radius={window.innerWidth < 500 ? 2.5 : 4}
          rotationSpeed={0.012}
          mouse={mouse}
          yOffset={0}
          fontSize={window.innerWidth < 500 ? 0.22 : 0.35}
          angularSpread={5}
        />
      </Canvas>
    </div>
  );
}
