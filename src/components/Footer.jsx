import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="w-full h-120 z-10 flex flex-col justify-center items-center gap-10 text-[#ededed] bg-[#bf1b2b]">
        <img
          src="/YashLogo.jpeg"
          alt="logo"
          className=" flex-start w-50 h-50"
        ></img>
        <div className="w-full px-15 flex flex-row items-center justify-between text-lg">
          <div className="flex flex-col">
            <Link href="https://www.whatsapp.com">WhatsApp</Link>
            <Link href="https://www.linkedin.com">LinkedIn</Link>
            <Link href="https://www.gmail.com" alt="">
              Gmail
            </Link>
            <Link href="https://www.instagram.com" alt="">
              Instagram
            </Link>
          </div>
          <div className="flex flex-col">
            <p>Shop No 174, Pycrofts Road, Royapettah,</p>
            <p>Chennai, Tamil Nadu 600014, India</p>
          </div>
          <div className="flex flex-col">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
