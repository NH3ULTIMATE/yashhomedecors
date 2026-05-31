"use client";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  //image animation
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const animation = gsap.fromTo(
      imageRef.current,
      { scale: 1.3 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  //who are we animation

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // CONTENT (vertical movement)
      gsap.fromTo(
        ".who-content",
        {
          y: 60,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".who-section",
            start: "top 30% ",
          },
          stagger: 0.3,
          duration: 0.5,
        },
      );

      // IMAGE
      gsap.fromTo(
        ".who-image",
        {
          y: 60,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".who-section",
            start: "top 30% ",
          },
          duration: 0.5,
        },
      );
    });

    return () => ctx.revert(); // clean up properly
  }, []);

  return (
    <>
      <section
        id="top"
        className=" w-full min-h-screen flex flex-col justify-center py-10 px-8 scroll-mt-15"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-center leading-tight">
          WE DON’T JUST DECORATE SPACES <br />
          WE CRAFT LIVING EXPERIENCES.
        </h1>
      </section>

      <section className="who-section px-8 h-200 bg-black text-[#ededed] ">
        <div className="w-full min-h-screen px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Text Side */}
          <div className="who-content">
            <h2 className="text-5xl font-extrabold mb-10">WHO WE ARE</h2>

            <p className="text-lg">
              Yash Home Decors is a dedicated interior décor studio committed to
              transforming everyday living spaces into refined and personalized
              environments. With a deep understanding of design aesthetics,
              material selection, and spatial harmony, we bring together
              creativity and craftsmanship to deliver interiors that reflect
              individuality and elegance.
              <br />
              <br />
              Our expertise spans across custom curtains, blinds, upholstery,
              sofas, and tailored décor solutions designed to complement modern
              and traditional lifestyles alike. Every project we undertake is
              guided by attention to detail, quality workmanship, and a passion
              for creating interiors that are both functional and visually
              captivating.
              <br />
              <br />
              At Yash Home Decors, we believe that great design is not just
              about decoration — it is about creating spaces that inspire
              comfort, confidence, and a sense of belonging.
            </p>
          </div>

          {/* Image Side */}
          <div className="who-content">
            <img
              src="/trail2.jpg"
              alt="Yash Home Decors Interior"
              className="w-full h-[500px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      <div
        ref={wrapperRef}
        className=" flex justify-center w-full h-screen mt-30 px-15"
      >
        <div className="w-[90%] h-screen rounded-3xl overflow-hidden">
          <div
            ref={imageRef}
            className=" w-full h-full bg-center bg-cover rounded-3xl"
            style={{
              backgroundImage: "url('/parallax.jpg')",
            }}
          ></div>
        </div>
      </div>
      <section id="top" className="py-32">
        <div className="flex flex-col items-start w-full p-16">
          <h2 className="text-5xl font-extrabold uppercase mb-10">
            Our Process.
          </h2>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-16 mt-10">
            <div className=" process-item transition-all duration-500 hover:-translate-y-3 rounded-3xl bg-neutral-200 shadow-xl p-3">
              <p className="text-6xl mb-6">01</p>
              <h3 className="text-xl tracking-wide">Consultation</h3>
              <p className="mt-4 leading-relaxed">
                Understanding your vision, preferences, and spatial needs.
              </p>
            </div>

            <div className="process-item transition-all duration-500 hover:-translate-y-3 rounded-3xl bg-neutral-200 shadow-xl p-3">
              <p className="text-6xl mb-6">02</p>
              <h3 className="text-xl tracking-wide">Measurement</h3>
              <p className="mt-4 leading-relaxed">
                Accurate on-site measurements for flawless execution.
              </p>
            </div>

            <div className="process-item transition-all duration-500 hover:-translate-y-3 rounded-3xl bg-neutral-200 shadow-xl p-3">
              <p className="text-6xl mb-6">03</p>
              <h3 className="text-xl tracking-wide">Curation</h3>
              <p className="mt-4 leading-relaxed">
                Selecting fabrics, materials, and finishes tailored to your
                space.
              </p>
            </div>
          </div>
        </div>
        <section className="w-full py-24 px-14">
          <div className="text-5xl text-black font-extrabold py-10">
            <p>WHY CHOOSE US?</p>
          </div>
          <div className="max-w-[1400px] mx-auto flex flex-col gap-3">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* SMALL LEFT */}
              <div className="col-span-1 md:col-span-4 bg-[#111] text-white rounded-[50px] flex flex-col items-center justify-center p-12 min-h-[320px]">
                <div className="w-3 h-3 bg-white mb-6 rotate-45"></div>
                <h3 className="text-2xl mb-4">Proven Expertise</h3>
                <p className="text-gray-300">
                  Over 20 years of experience in the industry.
                </p>
              </div>

              {/* BIG RIGHT */}
              <div className="col-span-1 md:col-span-8 rounded-[50px] overflow-hidden h-[320px]">
                <img
                  src="/login.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* BIG LEFT */}
              <div className="col-span-1 md:col-span-8 rounded-[50px] overflow-hidden h-[320px]">
                <img
                  src="/parallax.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              {/* SMALL RIGHT */}
              <div className="col-span-1 md:col-span-4 bg-[#111] text-white rounded-[50px] flex flex-col items-center justify-center p-12 min-h-[320px]">
                <div className="w-3 h-3 bg-white mb-6 rotate-45"></div>
                <h3 className="text-2xl mb-4">Design Excellence</h3>
                <p className="text-gray-300">
                  Recognized for innovative designs and dedicated service.
                </p>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-12 gap-8">
              {/* SMALL LEFT */}
              <div className="col-span-12 md:col-span-4 bg-[#111] text-white rounded-[50px] flex flex-col items-center justify-center p-12 min-h-[320px]">
                <div className="w-3 h-3 bg-white mb-6 rotate-45 "></div>
                <h3 className="text-2xl mb-4">Premium Materials</h3>
                <p className="text-gray-300">
                  High-quality fabrics and finishes built to last.
                </p>
              </div>

              {/* BIG RIGHT */}
              <div className="col-span-12 md:col-span-8 rounded-[50px] overflow-hidden h-[320px]">
                <img
                  src="/trail1.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
