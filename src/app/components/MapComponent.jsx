"use client";
import React, { useState } from "react";
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

const MapComponent = ({ location, users }) => {
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  const [activeMarker, setActiveMarker] = useState(null);
  const router = useRouter();

  const handleIconClick = (markerIndex) => {
    if (activeMarker === markerIndex) {
      setActiveMarker(null);
    } else {
      setActiveMarker(markerIndex);
    }
  };

  const handleProfileRouting = () => {
    router.push("/profile");
  };

  const handleMapClick = () => {
    setActiveMarker(null);
  };

  return (
    <div className="h-screen">
      {isLoaded && window.google ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: location?.length ? location[0] : 24.774265,
            lng: location?.length ? location[1] : 46.738586,
          }}
          zoom={17}
          onClick={handleMapClick}
        >
          {users?.map((user, index) => (
            <Marker
              key={index}
              position={{
                lat: user.latitude,
                lng: user.longitude,
              }}
              icon={{
                url: userTypeIcons[user.type],
                scaledSize: new window.google.maps.Size(40, 60),
              }}
              onClick={() => {
                handleIconClick(index);
              }}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={{ lat: user.latitude, lng: user.longitude }}
                >
                  <div className={`w-[15rem] p-3 ${notoSerif.className}`}>
                    <div className="flex items-center">
                      <Image
                        src={userCardIcons[user.type]}
                        width={40}
                        height={40}
                        alt={userCardIcons[user.type]}
                      />
                      <h3 className="text-[#4B4B4B] text-xl ml-3 font-bold text-wrap">
                        {user.name}
                      </h3>
                    </div>
                    <p className="text-[#787474] text-sm my-3">
                      {user.description}
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
                        <span className="text-primary">{user.openAt}</span>
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
                        <span className="text-primary">{user.closedAt}</span>
                      </p>
                    </div>
                    <button
                      onClick={handleProfileRouting}
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
