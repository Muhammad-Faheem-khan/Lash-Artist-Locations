"use client";

import { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { HomeModal } from "./components/modals/HomeModal";
import { SearchSiderbar } from "./components/searchComponent";
import Loading from "./components/uiComponents/loading";

const users = [
  {
    latitude: 24.774365,
    longitude: 46.738686,
    type: "lashArtist",
    name: "Lash Studio A",
    description: "Professional Lash Artist.",
    openAt: "09:00 AM",
    closedAt: "06:00 PM",
  },
  {
    latitude: 24.775365,
    longitude: 46.739686,
    type: "student",
    name: "Student B",
    description: "Beauty School Student.",
    openAt: "10:00 AM",
    closedAt: "05:00 PM",
  },
  {
    latitude: 24.776365,
    longitude: 46.740686,
    type: "retailPartner",
    name: "Retail Partner C",
    description: "Lash product distributor.",
    openAt: "08:00 AM",
    closedAt: "08:00 PM",
  },
  {
    latitude: 24.773265,
    longitude: 46.737586,
    type: "educator",
    name: "Educator D",
    description: "Lash educator and trainer.",
    openAt: "07:00 AM",
    closedAt: "03:00 PM",
  },
  {
    latitude: 24.774165,
    longitude: 46.739586,
    type: "lashArtist",
    name: "Lash Studio E",
    description: "Expert Lash Artist.",
    openAt: "09:00 AM",
    closedAt: "06:00 PM",
  },
  {
    latitude: 24.774065,
    longitude: 46.741586,
    type: "student",
    name: "Student F",
    description: "Training in Lash Extension.",
    openAt: "08:30 AM",
    closedAt: "05:30 PM",
  },
  {
    latitude: 24.772365,
    longitude: 46.738786,
    type: "retailPartner",
    name: "Retail Partner G",
    description: "Supplier of lash tools.",
    openAt: "10:00 AM",
    closedAt: "07:00 PM",
  },
  {
    latitude: 24.775465,
    longitude: 46.742586,
    type: "educator",
    name: "Educator H",
    description: "Advanced lash trainer.",
    openAt: "09:00 AM",
    closedAt: "04:00 PM",
  },
  {
    latitude: 24.774965,
    longitude: 46.739986,
    type: "lashArtist",
    name: "Lash Studio I",
    description: "Lash extension specialist.",
    openAt: "11:00 AM",
    closedAt: "07:00 PM",
  },
  {
    latitude: 24.773665,
    longitude: 46.738186,
    type: "student",
    name: "Student J",
    description: "Learning advanced lash techniques.",
    openAt: "09:30 AM",
    closedAt: "05:30 PM",
  },
];

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    fetchUserLocation();
    setIsPageLoaded(true);
  }, []);

  const handleLocationRetry = () => {
    setUserLocation(null);
    setLocationError(null);
    fetchUserLocation();
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLocationError(null); // Reset any previous error state
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError(error); // Set the error state

          if (error.code === 1) {
            alert(
              "Location access denied. Please allow location access for full functionality."
            );
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  if (!isPageLoaded) {
    return <Loading />;
  }

  if (locationError) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center bg-center bg-no-repeat bg-contain opacity-75"
        style={{ backgroundImage: "url('/assets/svgs/loading-img.svg')" }}
      >
        <div className="flex flex-col items-center">
          <p>
            Unable to retrieve location. Please check your location settings.
          </p>
          <button
            onClick={handleLocationRetry}
            className="bg-blue-500 text-white mt-5 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <HomeModal />
      <MapComponent
        location={userLocation || [24.77431, 46.738586]}
        users={users}
      />
      {userLocation && (
        <SearchSiderbar
          location={userLocation}
          handleLocationChange={setUserLocation}
        />
      )}
    </main>
  );
}
