"use client";
import { useState, useEffect } from "react";
import LanguageSwitch from "@/components/LanguageSwitch/LanguageSwitch";
import Menu from "@/components/Menu/Menu";
import MenuButton from "@/components/MenuButton/MenuButton";
import Image from "next/image";
import Link from "next/link";
import logo from "static/img/logo.svg";
import search from "static/img/search.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header>
      <div className="w-full bg-[#F8F8F8] h-[86px] relative z-20">
        <div className="container flex items-center w-full h-full justify-between relative tb:justify-end">
          <Link
            href="/"
            className="tb:absolute tb:left-1/2 tb:top-1/2 tb:-translate-x-1/2 tb:-translate-y-1/2"
          >
            <Image src={logo} height={67} width={127} alt="logo" />
          </Link>
          <div className="flex items-center">
            <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
            <button className="mr-10 ml-[30px]">
              <Image src={search} height={21} width={21} alt="search" />
            </button>
            <LanguageSwitch />
          </div>
        </div>
      </div>
      <Menu isOpen={isOpen && isMobile} />
    </header>
  );
}
