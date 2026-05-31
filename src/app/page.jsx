"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Card from "@/components/Card";
import Link from "next/link";

export default function Page() {
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const tl = useRef(null);
  const hasPlayed = useRef(false);

  // create timeline once
  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(dotRef.current, {
        y: 400,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        pointerEvents: "none", // disables interaction after animation
      })
      .to(
        textRef.current,
        {
          color: "#bf1b1b",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<",
      );
  }, []);

  const handleHover = () => {
    if (hasPlayed.current) return;

    hasPlayed.current = true;
    tl.current.play();
  };

  //image animation
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3); // 0.3 = slower movement
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //2nd section animation

  const sectionRef = useRef(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const images = [
      "/landing.jpg",
      "/login.jpg",
      "/parallax.jpg",
      "/trail1.jpg",
      "/trail2.jpg",
    ];

    let current = 0;
    let lastX = 0;
    let lastY = 0;
    const threshold = 80;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();

      // Correct relative position inside section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) return;

      lastX = x;
      lastY = y;

      const img = document.createElement("img");
      img.src = images[current];
      img.style.position = "absolute";
      img.style.width = "220px";
      img.style.height = "160px";
      img.style.objectFit = "cover";
      img.style.pointerEvents = "none";
      img.style.top = "0";
      img.style.left = "0";

      container.appendChild(img);

      current = (current + 1) % images.length;

      gsap.set(img, {
        x: x,
        y: y,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-10, 10),
      });

      gsap
        .timeline({
          onComplete: () => img.remove(),
        })
        .to(img, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        })
        .to(img, {
          scale: 0.2,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        });
    };

    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div id="home"></div>
      <div className="text-black w-full min-h-screen  bg-[#ededed] text-[#ededed]">
        {/* SECTION 1 */}
        <div className="flex flex-col gap-14 px-13 w-full box-border">
          <div className="font-extrabold text-[126px]">
            ELEVATE EVERY CORNER
          </div>

          <div className="flex flex-row justify-between gap-[10%] h-[80vh] w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-7">
              <div className="subheading">
                Transforming Spaces with Elegance and Style
              </div>

              <div className="description">
                At Yash Home Decors, we provide end-to-end interior design
                solutions tailored to each clients unique space and preferences.
                Our team personally visits your home to conduct detailed site
                measurements, assess layouts, and understand your vision and
                functional requirements.
              </div>
            </div>

            <div className="relative flex-1">
              <img
                src="landing.jpg"
                alt="img"
                className="h-full w-full object-cover object-top rounded-[40px]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 — GSAP Animation Section */}
        <div
          ref={sectionRef}
          className="relative min-h-[90vh] w-full bg-black text-[#ededed] flex flex-col items-center justify-between py-8 px-13 mt-14 overflow-hidden"
        >
          {/* Heading */}
          <div className="heading">
            TIMELESS DESIGN, THOUGHTFUL SPACES{" "}
            <span
              ref={dotRef}
              className="inline-block text-[#bf1b1b] cursor-pointer will-change-transform"
            >
              .
            </span>
          </div>

          {/* Paragraph */}
          <div className="flex items-end justify-end w-full">
            <div
              ref={textRef}
              className="
              text-2xl
              font-light
              w-[50%]
              transition-colors
            "
            >
              At Yash Home Decors, we design and customize curtains and décor
              tailored to your space, measurements, and lifestyle. Our
              client-focused approach ensures elegant, functional interiors that
              fit perfectly and feel uniquely yours.
            </div>
          </div>
        </div>

        {/* services section */}
        <div
          id="services"
          className="flex flex-col w-full h-[170vh] bg-black px-13 mt-14 text-[#ededed] "
        >
          <div className="w-full h-full flex-col flex justify-center ">
            <div className="flex w-full flex-col h-[20vh] gap-3 border-b-2 border-white px-8">
              <div className="subheading ">OUR SERVICES</div>
              <div className=" ">
                <p>From concept to completion,we handle it all</p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full flex-row h-[40vh] border-b-2 border-white  py-10  px-8 ">
              <div className="flex flex-col w-40  gap-1.5 subheading">
                <h3>Signature</h3>
                <div className="text-lg">
                  <p>Tailored Elegance</p>
                </div>
              </div>
              <div className="w-100 text-lg">
                <p>
                  At Yash Home Decors, we specialize in transforming everyday
                  spaces into refined living experiences. From bespoke curtains
                  and blinds to custom sofas and soft furnishings, every element
                  is carefully curated to reflect your taste, lifestyle, and
                  vision.
                </p>
              </div>
              <div className="">
                <i
                  className="fa-solid fa-pen text-5xl"
                  style={{ color: "rgb(241, 241, 241)" }}
                ></i>
              </div>
            </div>
            <div className="flex justify-between items-center w-full flex-row h-[40vh] border-b-2 border-white  py-10  px-8 ">
              <div className="flex flex-col w-40  gap-1.5 subheading">
                <h3>Calibration</h3>
                <div className="w-55 text-lg">
                  <p>Precision Planning</p>
                </div>
              </div>
              <div className="w-100 text-lg">
                <p>
                  We believe great interiors begin with understanding. Our
                  expert team works closely with you to understand your
                  preferences, conduct accurate on-site measurements, and guide
                  you through fabric selection and design choices — ensuring
                  every detail aligns perfectly with your space.
                </p>
              </div>
              <div className="">
                <i
                  className="fa-solid fa-diagram-project text-5xl"
                  style={{ color: "rgb(241, 241, 241)" }}
                ></i>
              </div>
            </div>
            <div className="flex justify-between items-center w-full flex-row h-[40vh] border-b-2 border-white  py-10  px-8 ">
              <div className="flex flex-col w-40  gap-1.5 subheading">
                <h3>Craftsmanship</h3>
                <div className="w-55 text-lg">
                  <p>Seamless Transformation</p>
                </div>
              </div>
              <div className="w-100 text-lg">
                <p>
                  From concept to completion, we handle production and
                  professional installation with precision and care. Our focus
                  is delivering flawless finishes, quality craftsmanship, and a
                  smooth experience that brings your dream interiors to life.
                </p>
              </div>
              <div className="">
                {" "}
                <i
                  className="fa-solid fa-box text-5xl"
                  style={{ color: "rgb(241, 241, 241)" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full h-[600px] bg-center bg-cover"
          style={{
            backgroundImage: "url('/parallax.jpg')",
            backgroundPosition: `50% calc(50% + ${offset}px)`,
          }}
        ></div>

        <div className=" px-13 mt-14 w-full min-h-screen">
          <p className="subheading pb-5 ">OUR PROJECTS.</p>
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row grid-cols-12 gap-8 border-y-2 py-10">
              <div className="col-span-4 ">
                <img
                  src="/Beds.jpg"
                  alt="img"
                  className="w-200 h-100 rounded-2xl"
                ></img>
              </div>
              <div className="col-span-8 flex flex-col w-full h-full">
                <p className="subheading">1. Modern Bed Design</p>
                <p className="description py-10">
                  A sleek and contemporary bed design with a padded geometric
                  headboard that adds depth and texture to the space. The
                  neutral color palette enhances the room’s calm and luxurious
                  feel, while the clean finish and balanced proportions reflect
                  modern minimal elegance.
                </p>
              </div>
            </div>
            <div className="flex flex-row grid-cols-12 gap-8 py-10 border-b-2">
              <div className="col-span-8 flex flex-col w-full h-full">
                <p className="subheading">2. Luxury Drapery Curtains</p>
                <p className="description py-10 ">
                  Premium floor-length curtains designed to enhance natural
                  lighting while adding a touch of luxury. The soft fabric,
                  elegant draping, and precise tailoring create a warm and
                  inviting ambiance, perfectly complementing the overall
                  interior aesthetic.
                </p>
              </div>
              <div className="col-span-4 ">
                <img
                  src="/Curtains.jpg"
                  alt="img"
                  className="w-200 h-100 rounded-2xl"
                ></img>
              </div>
            </div>
            <div className="flex flex-row grid-cols-12 gap-8 py-10 border-b-2">
              <div className="col-span-4 ">
                <img
                  src="/Sofas.jpg"
                  alt="img"
                  className="w-200 h-100 rounded-2xl"
                ></img>
              </div>
              <div className="col-span-8 flex flex-col w-full h-full">
                <p className="subheading">3. Classic Upholstery Sofa</p>
                <p className="description py-10">
                  A beautifully crafted classic sofa featuring intricate wooden
                  detailing and premium upholstered fabric. The soft pastel
                  tones and floral patterns create a timeless, elegant look,
                  while the plush cushioning ensures both comfort and
                  sophistication. Designed to elevate traditional interiors with
                  refined craftsmanship.
                </p>
              </div>
            </div>
          </div>
          <div className="py-10">
            <Link href="/projects" className="w-full flex justify-center  ">
              <button className="bg-black border-2 rounded-3xl w-fit text-[#ededed] px-5 py-2 cursor-pointer">
                Create Your Own Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
