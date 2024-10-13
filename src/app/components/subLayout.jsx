"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function SubLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header handleDrawer={setOpen} />
      <Sidebar open={open} handleDrawer={setOpen} />
    </>
  );
}
