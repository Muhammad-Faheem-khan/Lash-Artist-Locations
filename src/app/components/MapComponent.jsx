"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import useGoogleMapsApi from "../context/GoogleMapContext";
import Loading from "./uiComponents/loading";
import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import { userCardIcons, userTypeIcons } from "../../../utils/constants";
import { useRouter } from "next/navigation";

const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapComponent = ({ location, users, sortValue }) => {
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  const [zoomLevel, setZoomLevel] = useState(14);
  const [activeMarker, setActiveMarker] = useState(null);
  const router = useRouter();

  const handleIconClick = (markerIndex) => {
    if (activeMarker === markerIndex) {
      setActiveMarker(null);
    } else {
      setActiveMarker(markerIndex);
    }
  };

  const handleProfileRouting = (user) => {
    router.push(`/profile/${user.customer.id}`);
  };

  const handleMapClick = () => {
    setActiveMarker(null);
  };

  const radiusToZoomLevel = () => {
    if (sortValue == 5) return 17;
    if (sortValue == 10) return 15;
    if (sortValue == 20) return 14;
    if (sortValue == 50) return 12;
    return 10;
  };

  useEffect(() => {
    setZoomLevel(radiusToZoomLevel(sortValue));
  }, [sortValue]);

  return (
    <div className="h-screen">
      {isLoaded && window.google ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: location?.length && location[0],
            lng: location?.length && location[1],
          }}
          zoom={zoomLevel}
          onClick={handleMapClick}
        >
          {users?.map((user, index) => (
            <Marker
              key={index}
              position={{
                lat: +user?.addresses[0]?.latitude,
                lng: +user?.addresses[0]?.longitude,
              }}
              icon={{
                url: userTypeIcons[user?.customer?.role],
                scaledSize: new window.google.maps.Size(40, 60),
              }}
              onClick={() => {
                handleIconClick(index);
              }}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={{
                    lat: +user?.addresses[0]?.latitude,
                    lng: +user?.addresses[0]?.longitude,
                  }}
                >
                  <div className={`w-[15rem] p-3 ${notoSerif.className}`}>
                    <div className="flex items-center">
                      <Image
                        src={userCardIcons[user?.customer?.role]}
                        width={40}
                        height={40}
                        alt={userCardIcons[user?.customer?.role]}
                      />
                      <h3 className="text-[#4B4B4B] text-xl ml-3 font-bold capitalize">
                        {user?.customer?.firstName} {user?.customer?.lastName}
                      </h3>
                    </div>
                    <p className="text-[#787474] text-xs my-5">
                      {user.description ||
                        "This Artist Uses Light Heart Products."}
                    </p>
                    <div className="flex">
                      <Image
                        src="/assets/svgs/icons/open-at.svg"
                        width={20}
                        height={20}
                        alt="open at"
                      />
                      <p className="ml-2">
                        Open at -{" "}
                        <span className="text-primary">
                          {user.openAt || "10:00 am"}
                        </span>
                      </p>
                    </div>
                    <div className="flex mt-2">
                      <Image
                        src="/assets/svgs/icons/close-at.svg"
                        width={20}
                        height={20}
                        alt="close at"
                      />
                      <p className="ml-2">
                        Close at -{" "}
                        <span className="text-primary">
                          {user.closedAt || "12:00 pm"}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleProfileRouting(user);
                      }}
                      className="bg-[#EDE6DE3D] border border-[#E8E8E8] w-full py-3 text-[#746253] rounded-md mt-5"
                    >
                      More Details
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default React.memo(MapComponent);
