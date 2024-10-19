"use client"; 
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import useGoogleMapsApi from "../context/GoogleMapContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const userTypeIcons = {
  lashArtist: "/assets/icons/star-icon.svg",
  student: "/assets/icons/heart.png",
  retailPartner: "/assets/icons/shopping-cart.png",
  educator: "/assets/icons/graduation-cap.png",
};

const MapComponent = ({
  location
}) => {
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  return (
      <div className="h-screen" >
        {isLoaded && window.google ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: location?.coordinates?.length
                ? location.coordinates[0]
                : 24.774265,
              lng: location?.coordinates?.length
                ? location.coordinates[1]
                : 46.738586,
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: location?.coordinates?.length
                  ? location.coordinates[0]
                  : 24.774265,
                lng: location?.coordinates?.length
                  ? location.coordinates[1]
                  : 46.738586,
              }}
              draggable={false}
            />
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
  );
};

export default React.memo(MapComponent);
