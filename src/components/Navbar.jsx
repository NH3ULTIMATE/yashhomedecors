import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path, sectionId) => {
    if (pathname === path) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(path);

      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  //NavBar Pop in and Out
  const navRef = useRef(null);
  const lastScroll = useRef(0);
  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 100) {
        navRef.current?.classList.add("nav-hidden");
      } else if (currentScroll < lastScroll.current) {
        navRef.current?.classList.remove("nav-hidden");
      }
      lastScroll.current = currentScroll;
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={navRef}
      className="fixed top-0 w-full h-25 flex justify-between items-center px-13 bg-[#bf1b2b] z-10 transition-transform duration-300 ease-in-out "
    >
      <div>
        <Link href={"/"} className="flex-1">
          <img src="/YashLogo.jpeg" alt="logo" className="w-25 h-25" />
        </Link>
      </div>
      <div className=" flex justify-between items-center gap-20 text-[#ededed] text-lg [&>button]:cursor-pointer ">
        <button onClick={() => handleNavClick("/", "home")}>Home</button>

        <button onClick={() => handleNavClick("/about", "top")}>About</button>

        <button onClick={() => handleNavClick("/", "services")}>
          Services
        </button>
      </div>
      <div>
        <button
          onClick={() => handleNavClick("/projects", "top")}
          className="bg-[#ededed] px-5 py-2 rounded-[40px] text-black translate-y-[-5px] shadow-[0px_4px_0px_2px_black] hover:shadow-[0px_0px_0px_0px_black] hover:translate-y-[0px] transition-all duration-300"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Navbar;
