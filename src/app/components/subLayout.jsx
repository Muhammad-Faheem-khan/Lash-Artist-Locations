"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function SubLayout() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && pathname !== "/reset-password") {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Header handleDrawer={setOpen} />
      <Sidebar open={open} handleDrawer={setOpen} />
    </>
  );
}
