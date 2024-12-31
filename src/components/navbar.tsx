"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const TedNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleUser = (): void => {
    setIsOpen(!isOpen);
    setIsClicked(false);
  };

  const handleMenu = (): void => {
    setIsClicked(!isClicked);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center h-20 bg-transparent text-black relative font-sans px-6">
      {/* User Icon Button */}
      <button
        className={`flex justify-center items-center ${isOpen ? "bg-black text-white" : "hover:bg-gray-300"
          } w-12 h-12 rounded-full transition-all duration-300`}
        onClick={handleUser}
      >
        <Image
          src={isOpen ? "/icons/x-icon.png" : "/icons/profile-icon.png"}
          alt="User Icon"
          width={32}
          height={32}
        />
      </button>

      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/images/logo-black.png"
          alt="TEDxCITBengaluru"
          width={346}
          height={59}
        />
      </div>

      {/* Menu Icon Button */}
      <button
        className={`flex justify-center items-center ${isClicked ? "bg-black text-white" : "hover:bg-gray-300"
          } w-12 h-12 rounded-full transition-all duration-300`}
        onClick={handleMenu}
      >
        <Image
          src={isClicked ? "/icons/x-icon.png" : "/icons/menu-icon.png"}
          alt="Menu Icon"
          width={24}
          height={24}
        />
      </button>

      {/* User Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 bg-[#1f1f1f] text-white rounded-lg p-4 shadow-lg z-20 w-20 animate-fade-in">
          <ul className="space-y-4">
            <li className="flex justify-center">
              <Link href="https://www.instagram.com/tedxcitbengaluru/">
                <Image src="/icons/insta.png" alt="Instagram" width={32} height={32} />
              </Link>
            </li>
            <li className="flex justify-center">
              <Link href="https://www.linkedin.com/company/tedxcitbengaluru/">
                <Image src="/icons/linkedin.png" alt="LinkedIn" width={32} height={32} />
              </Link>
            </li>
            <li className="flex justify-center">
              <Link href="https://youtube.com/playlist?list=PLvIWO-VMTq9M8-dfEfpf6eGSoD0RVW6XV&si=VDFDSdzEz5XcfaG2">
                <Image src="/icons/youtube.png" alt="YouTube" width={32} height={32} />
              </Link>
            </li>
            <li className="flex justify-center">
              <Link href="mailto:tedxcitbengaluru@cambridge.edu.in">
                <Image src="/icons/envelope.png" alt="YouTube" width={32} height={32} />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Menu Dropdown */}
      {isClicked && (
        <div className="absolute top-20 right-4 bg-[#1f1f1f] text-white rounded-lg shadow-lg p-4 z-20 w-48 animate-fade-in">
          <ul className="space-y-3">
            <li className="text-right hover:text-[#eb0028] transition-all duration-300">
              <Link href="/">HOME</Link>
            </li>
            <li className="text-right hover:text-[#eb0028] transition-all duration-300">
              <Link href="/blogs">BLOGS</Link>
            </li>
            <li className="text-right hover:text-[#eb0028] transition-all duration-300">
              <Link href="/events">EVENTS</Link>
            </li>
            <li className="text-right hover:text-[#eb0028] transition-all duration-300">
              <Link href="/speakers">SPEAKERS</Link>
            </li>
            <li className="text-right hover:text-[#eb0028] transition-all duration-300">
              <Link href="/about">ABOUT US</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Styles for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TedNavbar;
