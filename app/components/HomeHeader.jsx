"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuTally4 } from "react-icons/lu";
import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const navUrls = [
  { url: "/", name: "Home" },
  { url: "/dashboard", name: "Dashboard" },
  { url: "/question", name: "Take Tests" },
  { url: "/about", name: "About" },
];

export default function HomeHeader() {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  return (
    <div className="  bg-slate-600 relative px-2 md:px-12 flex justify-between items-center bg-transparent/5 shadow">
      <Image
        src={"/image/logo.png"}
        alt="logo"
        width={60}
        height={60}
        className="cursor-pointer"
      />
      <nav className="hidden md:flex gap-12">
        {navUrls.map(({ url, name }) => (
          <li
            key={url}
            className={`list-none cursor-pointer px-4 py-2 border rounded-md hover:font-Dancing_Script ${
              url === pathname &&
              "text-green-400 font-Dancing_Script font-extrabold"
            }`}>
            <Link href={url}>{name}</Link>
          </li>
        ))}
      </nav>

      <div className="max-w-fit flex justify-center items-center space-x-6">
        <UserButton />
        <LuTally4
          size={30}
          className="md:hidden"
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <nav
        className={`fixed left-0 top-0 h-screen w-screen bg-black text-white z-30 justify-center items-center flex flex-col gap-12 text-base text-[0.6rem] transform ${
          showNav ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-700`}>
        <MdOutlineClose
          size={50}
          className="mt-6 self-center rounded border p-2"
          onClick={() => setShowNav(!showNav)}
        />
        {navUrls.map(({ url, name }) => (
          <li
            key={url}
            onClick={() => setShowNav(false)}
            className={`list-none self-center cursor-pointer px-4 py-2 border-b hover:font-Dancing_Script ${
              url === pathname &&
              "text-green-400 font-Dancing_Script font-extrabold"
            }`}>
            <Link href={url}>{name}</Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
