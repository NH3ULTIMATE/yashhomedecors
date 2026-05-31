"use client";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";

const grok = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>YashHomeDecors</title>
        <link rel="icon" href="/YashLogo.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${grok.className} antialiased`}>
        <Intro />
        <Navbar />
        <div className=" bg-[#ededed] mt-25">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
