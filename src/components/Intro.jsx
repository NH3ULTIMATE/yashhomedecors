"use client ";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Intro() {
  const containerRef = useRef(null);
  const text = ["", "", "Y", "H", "D", "", ""];
  useEffect(() => {
    const q = gsap.utils.selector(containerRef.current);
    document.body.style.overflow = "hidden";
    const boxes = q("div");

    gsap.to(q("div"), {
      duration: 2,
      stagger: 0.2,
      yPercent: (i) => (i === 3 ? 100 : -100),
      ease: "power3.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });
  }, []);
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-1000  flex items-center justify-center pointer-events-none "
    >
      {text.map((text, index) => (
        <div
          key={index}
          className="text-3xl w-full min-h-screen flex items-center justify-center uppercase bg-[#bf1b2b] text-white"
        >
          <h1>{text}</h1>
        </div>
      ))}
    </div>
  );
}
