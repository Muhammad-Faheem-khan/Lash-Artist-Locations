"use client";
import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { Drawer } from "antd";

export function Sidebar({ open, handleDrawer }) {
  let pathname = usePathname();
  const noLayoutNeeded = ["/login", "/signup"];

  const isAuthPage = noLayoutNeeded.includes(pathname);

  if (isAuthPage) {
    return <></>;
  }

  const onClose = () => {
    handleDrawer(false);
  };

  return (
    <Drawer
      title="Basic Drawer"
      onClose={onClose}
      open={open}
      placement="left"
      width={280}
    >
      <div
        className={`sticky top-0 h-screen z-[200] sidebar  md:sidebar-expanded sidebar-collapsed bg-white shadow-sm`}
        style={{ maxHeight: "calc(100vh)" }}
      >
        <div
          className={`sidebar-inner flex flex-shrink-0 flex-col justify-between px-4 py-6 text-base bg-white  text-carbon-800 font-medium `}
          style={{ height: "calc(100vh - 70px)" }}
        >
          <div className="flex justify-center">
            <Link href="/">
              <Image
                className="mx-2"
                src="/assets/svgs/logo.svg"
                width={160}
                height={55}
                alt="light heart"
              />
            </Link>
          </div>

          <div className="pt-12 flex-grow">
            <SidebarItem
              icon="/assets/svgs/sidebar/dashboard.svg"
              route="/home"
              name="Home"
            />
            <SidebarItem
              icon="/assets/svgs/sidebar/profile.svg"
              route="/profile"
              name="Profile"
            />
            <SidebarItem
              icon="/assets/svgs/sidebar/search.svg"
              route="/search"
              name="Search"
            />
          </div>
        </div>
        <div className="flex justify-between py-2 px-4 border-t-2">
          <div className="flex">
            <img
              className="mr-2 rounded-full w-[45px] h-[45px] object-cover"
              src="/assets/images/image.png"
            />
            <div>
              <p className="text-sm font-extralight">Welcome back 👋</p>
              <p className="mt-0">Anaya</p>
            </div>
          </div>
          <Image
            src="/assets/svgs/icons/angle-right.svg"
            width={20}
            height={20}
            alt="btn"
          />
        </div>
      </div>
    </Drawer>
  );
}
