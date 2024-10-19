"use client";
import { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { HomeModal } from "./components/modals/HomeModal";
import { SearchSiderbar } from "./components/searchComponent";
import Loading from "./components/uiComponents/loading";

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <main className={isPageLoaded ? "" : "opacity-0"}>
      <HomeModal />
      <MapComponent />
      <SearchSiderbar />
    </main>
  );
}
