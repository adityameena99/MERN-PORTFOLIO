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
      groupRef.current.rotation.x = mouse.y * 0.5;
      groupRef.current.rotation.z = mouse.x * 0.5;
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

  const handleMouseMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    tl.to({}, {
      duration: 4,
      onUpdate: function () {
        setLoading(Math.round(this.progress() * 100));
      },
    });

    tl.to(
      loaderRef.current,
      { y: "-100%", duration: 1, ease: "power2.inOut" },
      "+=0.3"
    );
  }, [onFinish]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "#F7F7F7",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
    >
      <h1
        style={{
          color: "black",
          fontSize: "3rem",
          marginBottom: "2rem",
          fontFamily: "monospace",
        }}
      >
        {loading}%
      </h1>
      <Canvas camera={{ position: [0, 3, 12] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Heading ring */}
        <CircularTextRing
          text={heading}
          radius={4}
          rotationSpeed={0.01}
          mouse={mouse}
          yOffset={1.5}
          fontSize={1}
          fontWeight="bold"
          angularSpread={6}
        />
        {/* Subheading ring */}
        <CircularTextRing
          text={subheading}
          radius={4}
          rotationSpeed={0.012}
          mouse={mouse}
          yOffset={0}
          fontSize={0.35}
          fontWeight="normal"
          angularSpread={5} 
        />
      </Canvas>
    </div>
  );
}
