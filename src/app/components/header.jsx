"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ handleDrawer }) {
  let pathname = usePathname();
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(pathname);

  const showDrawer = () => {
    handleDrawer((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center px-10 bg-white shadow-b-lg h-[65px] w-full z-[200]">
      {isAuthPage ? (
        <button>
          <Image
            src="/assets/svgs/icons/back-arrow.svg"
            width={25}
            height={25}
            alt="back arrow"
          />
        </button>
      ) : (
        <button onClick={showDrawer}>
          <Image
            src="/assets/svgs/icons/toggle-btn.svg"
            width={25}
            height={25}
            alt="toggle btn"
          />
        </button>
      )}

      <Link href="/">
        <Image
          src="/assets/svgs/logo.svg"
          width={160}
          height={55}
          alt="Lash Atrist"
        />
      </Link>
      <button>
        <Image
          src="/assets/svgs/icons/close-btn.svg"
          width={25}
          height={25}
          alt="close"
        />
      </button>
    </div>
  );
}
