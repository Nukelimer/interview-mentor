"use client";
import React from "react";
import HomeHeader from "./HomeHeader";
import { usePathname } from "next/navigation";

function NestedHeader() {
  const pathname = usePathname();
  return (
    pathname == "/" && (
      <div>
        <HomeHeader />
      </div>
    )
  );
}

export default NestedHeader;
