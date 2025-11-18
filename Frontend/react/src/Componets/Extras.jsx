
import React, { useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";

export default function Extras() {
  const canvasRef = useRef(null);
  const irisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

  
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

 
    const centerX = () => W / 2;
    const centerY = () => H / 2 + (H * 0.07); 

    
    const scleraRadius = () => Math.min(W, H) * 0.34;

    
    const veins = [];
    const genVeins = () => {
      veins.length = 0;
      const r = scleraRadius();
      const count = 54;

      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sr = r * (0.22 + Math.random() * 0.45);
        const len = r * (0.10 + Math.random() * 0.38);

        const sx = centerX() + Math.cos(a) * sr;
        const sy = centerY() + Math.sin(a) * sr;

        const cx1 = sx + (Math.random() - 0.5) * len;
        const cy1 = sy + (Math.random() - 0.5) * len;
        const ex = sx + (Math.random() - 0.5) * len;
        const ey = sy + (Math.random() - 0.5) * len;

        veins.push({
          sx,
          sy,
          cx1,
          cy1,
          ex,
          ey,
          a: 0.035 + Math.random() * 0.07,
          lw: 0.45 + Math.random() * 1.0,
        });
      }
    };
    genVeins();


    let mouseX = W / 2;
    let mouseY = H / 2;

    let targetIrisX = 0,
      targetIrisY = 0;
    let irisX = 0,
      irisY = 0;

    let targetSclX = 0,
      targetSclY = 0;
    let sclX = 0,
      sclY = 0;

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const dx = mouseX - centerX();
      const dy = mouseY - centerY();
      const dist = Math.hypot(dx, dy) || 1;
      const ang = Math.atan2(dy, dx);
      const r = scleraRadius();

      const maxIrisMove = r * 0.3;
      const irisMove = Math.min(dist * 0.28, maxIrisMove);

      targetIrisX = Math.cos(ang) * irisMove;
      targetIrisY = Math.sin(ang) * irisMove;

      const maxSclMove = Math.min(r * 0.06, 28);
      const sclMove = Math.min(dist * 0.02, maxSclMove);

      targetSclX = Math.cos(ang) * sclMove;
      targetSclY = Math.sin(ang) * sclMove;
    };

    window.addEventListener("mousemove", handleMouse);

   
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      irisX += (targetIrisX - irisX) * 0.12;
      irisY += (targetIrisY - irisY) * 0.12;
      sclX += (targetSclX - sclX) * 0.08;
      sclY += (targetSclY - sclY) * 0.08;

      ctx.clearRect(0, 0, W, H);

      const sCx = centerX() + sclX;
      const sCy = centerY() + sclY;
      const r = scleraRadius();

      
      const baseG = ctx.createRadialGradient(
        sCx - r * 0.1,
        sCy - r * 0.1,
        r * 0.02,
        sCx,
        sCy,
        r
      );
      baseG.addColorStop(0, "#FFFFFF");
      baseG.addColorStop(0.5, "#EDEAE6");
      baseG.addColorStop(1, "#CDCAC8");

      ctx.fillStyle = baseG;
      ctx.beginPath();
      ctx.arc(sCx, sCy, r, 0, Math.PI * 2);
      ctx.fill();

     
      ctx.lineCap = "round";
      for (const v of veins) {
        ctx.beginPath();
        ctx.moveTo(v.sx + sclX, v.sy + sclY);
        ctx.quadraticCurveTo(
          v.cx1 + sclX,
          v.cy1 + sclY,
          v.ex + sclX,
          v.ey + sclY
        );
        ctx.strokeStyle = `rgba(170,25,40,${v.a})`;
        ctx.lineWidth = v.lw;
        ctx.stroke();
      }

      const rimG = ctx.createRadialGradient(sCx, sCy, r * 0.6, sCx, sCy, r);
      rimG.addColorStop(0, "rgba(255,255,255,0)");
      rimG.addColorStop(0.75, "rgba(255,255,255,0.15)");
      rimG.addColorStop(0.9, "rgba(255,255,255,0.25)");
      rimG.addColorStop(1, "rgba(255,255,255,0.4)");
      ctx.fillStyle = rimG;
      ctx.beginPath();
      ctx.arc(sCx, sCy, r, 0, Math.PI * 2);
      ctx.fill();

    
      const invX = -(mouseX - centerX()) * 0.08;
      const invY = -(mouseY - centerY()) * 0.08;

      const lightX = sCx - r * 0.32 + invX;
      const lightY = sCy - r * 0.36 + invY;

      const lightGrad = ctx.createRadialGradient(
        lightX,
        lightY,
        r * 0.035,
        sCx,
        sCy,
        r * 0.92
      );
      lightGrad.addColorStop(0, "rgba(255,255,255,0.98)");
      lightGrad.addColorStop(0.12, "rgba(245,250,255,0.55)");
      lightGrad.addColorStop(0.35, "rgba(230,240,255,0.3)");
      lightGrad.addColorStop(1, "rgba(210,230,255,0)");

      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.arc(sCx, sCy, r, 0, Math.PI * 2);
      ctx.fill();

  
      const mx = mouseX - centerX();
      const my = mouseY - centerY();
      const angleOpp = Math.atan2(-my, -mx);

      ctx.save();
      ctx.translate(sCx, sCy);
      ctx.rotate(angleOpp * 0.18);
      ctx.beginPath();
      ctx.ellipse(
        -r * 0.32 + invX * 0.55,
        -r * 0.42 + invY * 0.55,
        r * 0.26,
        r * 0.16,
        -0.36,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fill();
      ctx.restore();

    
      if (irisRef.current) {
        irisRef.current.style.transform = `translate(-50%,-50%) translate(${irisX}px, ${irisY}px)`;

        const targetDiam = Math.round(r * 0.7 * 2);
        irisRef.current.style.width = `${targetDiam}px`;
        irisRef.current.style.height = `${targetDiam}px`;
      }
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#FFFFFF",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 11111,
          pointerEvents: "none",
        }}
      />

      
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%)",
          fontSize: "clamp(80px, 20vw, 250px)",
          fontWeight: "bold",
          color: "#fff",
          mixBlendMode: "difference",
          backgroundImage:
            'url("https://images.ctfassets.net/beeay9aupl8z/3OjJBowBdb47lZ3a6VeoK8/9a9f1b554ab05c2f714dd98714768bf2/creative-hover-a.png?q=75&fm=webp&w=640")',
          backgroundSize: "cover",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        CREATIVE
      </div>

      <div
        ref={irisRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "1px",
          height: "1px",
          zIndex: 111111,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform, width, height",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.85)",
          border: "none",
          transition:
            "transform 0.06s linear, width 0.18s linear, height 0.18s linear",
        }}
      >
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcThqaGppdHczMmVmMHY0NnA1eG81b2QyNW9wZHg1ZGV6ZTRoYm9tciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Jz6HULJWICbycVy/giphy.gif"
          alt="iris"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />

        
        <div
          className="play-circle"
          style={{
            position: "absolute",
            width: "40%",
            aspectRatio: "1",
            borderRadius: "50%",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "0.3s ease, background-color 0.3s ease",
            zIndex: 3,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "green";
            const icon = e.currentTarget.querySelector(".play-icon");
            if (icon) icon.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "black";
            const icon = e.currentTarget.querySelector(".play-icon");
            if (icon) icon.style.color = "green";
          }}
        >
          <FaPlay
            className="play-icon"
            style={{
              color: "green",
              width: "28px",
              height: "28px",
              zIndex: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
