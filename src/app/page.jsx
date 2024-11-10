"use client";

import { Suspense, useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { HomeModal } from "./components/modals/HomeModal";
import { SearchSiderbar } from "./components/searchComponent";
import Loading from "./components/uiComponents/loading";
import { Radius } from "../../utils/constants";
import { getNearByUsers } from "./api/user";

export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [sortValue, setSortValue] = useState(5);
  const [rolesArray, setRolesArray] = useState([]);

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
          setLocationError(null); 
          localStorage.setItem('location', JSON.stringify([latitude, longitude]))
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

  const fetchUsers = async (
    radius = Radius,
    roles = [],
    lat = userLocation[0],
    lng = userLocation[1],
    page = 1,
    limit = 10
  ) => {
    const payload = {
      lat,
      lng,
      radius,
      page,
      limit,
      roles,
    };
    const response = await getNearByUsers(payload);
    setUserList(response);
  };

  useEffect(() => {
    if (userLocation) {
      fetchUsers(sortValue, rolesArray);
    }
  }, [userLocation]);

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
    <Suspense fallback={<Loading />}>
      <main>
        {userLocation && (
          <>
            <HomeModal setRolesArray={setRolesArray} fetchUsers={fetchUsers} />
            <MapComponent
              sortValue={sortValue}
              location={userLocation}
              users={userList?.customers}
            />
            <SearchSiderbar
              resposne={userList}
              sortValue={sortValue}
              handleSort={setSortValue}
              location={userLocation}
              fetchUsers={fetchUsers}
              setRolesArray={setRolesArray}
              rolesArray={rolesArray}
              handleLocationChange={setUserLocation}
            />
          </>
        )}
      </main>
    </Suspense>
  );
}
