"use client";

import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

const links = [
  { label: "Missions", href: "#" },
  { label: "Media", href: "#" },
  { label: "Publications", href: "#" },
  { label: "Software", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Our Organization", href: "#" },
  { label: "Apply", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[999]">
      {/* Top bar */}
      <div className="bg-black/70 flex items-center justify-between px-[2vw] min-h-[50px]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-10 w-auto" src="/images/ssrl.svg" alt="SSRL Logo" />
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center m-0 p-0">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="block text-[#9d9d9d] text-center px-3 py-3.5 no-underline font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 hover:text-white"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="block font-['Azeret_Mono',monospace] text-xs transition-colors duration-200 bg-white text-black font-extrabold px-3.5 py-1.5 ml-1 hover:bg-[#ddd]"
              href="#"
            >
              Donate
            </a>
          </li>
        </ul>

        {/* Hamburger button — mobile/tablet only */}
        <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            color="#9d9d9d"
            label="Toggle menu"
          />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col bg-black/90 m-0 p-0 pb-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                className="block text-[#9d9d9d] px-6 py-3 no-underline font-['Azeret_Mono',monospace] text-sm transition-colors duration-200 hover:text-white"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="px-6 py-3">
            <a
              className="inline-block font-['Azeret_Mono',monospace] text-sm transition-colors duration-200 bg-white text-black font-extrabold px-3.5 py-1.5 hover:bg-[#ddd]"
              href="#"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
