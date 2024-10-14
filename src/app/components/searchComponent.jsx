"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AutoComplete, Input, Select } from "antd";
import useGoogleMapsApi from "../context/GoogleMapContext";
import { ARTISTINFO } from "../../../utils/constants";

export function SearchSiderbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState("");
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);

  const handleSider = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddressChange = (value) => {
    if (isLoaded && window.google) {
      try {
        setAddress(value);
        if (value) {
          const autocompleteService =
            new window.google.maps.places.AutocompleteService();
          autocompleteService.getPlacePredictions(
            { input: value },
            (predictions, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                setOptions(
                  predictions.map((prediction) => ({
                    value: prediction.description,
                    placeId: prediction.place_id,
                  }))
                );
              }
            }
          );
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSelect = (value, option) => {
    if (isLoaded && window.google) {
      try {
        setAddress(value);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: option.placeId }, (results, status) => {
          if (status === "OK") {
            const location = results[0]?.geometry.location;
            const newLocation = {
              type: "Point",
              coordinates: [location.lat(), location.lng()],
            };
            setLocation(newLocation);
            onLocationChange(newLocation, results[0]?.formatted_address);
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = () => {};

  return (
    <div
      className={`fixed top-[5rem] left-[1rem] h-[88vh] py-2 mb-10 z-[300] bg-white rounded-xl ${!isOpen && "left-[-1.2rem]"}`}
    >
      {isOpen ? (
        <button
          className="absolute right-[-1rem] top-[-0.5rem]"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Image
            src="/assets/svgs/icons/close-icon.svg"
            width={30}
            height={30}
            alt="close"
          />
        </button>
      ) : (
        <button
          className="relative right-[-1.25rem] top-[-1rem]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            src="/assets/svgs/icons/open-icon.svg"
            width={30}
            height={30}
            alt="open"
          />
        </button>
      )}

      <div
        className={`h-full w-full mt-2 overflow-scroll py-6 px-4  ${!isOpen ? "hidden" : "w-[320px]"}`}
      >
        <AutoComplete
          value={address}
          options={options}
          onChange={handleAddressChange}
          onSelect={handleSelect}
          className="w-full"
        >
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 pt-4 pb-2 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
            suffix={
              <Image
                src="/assets/svgs/icons/search-icon.svg"
                width={20}
                height={20}
                className="mr-2"
                alt="search"
              />
            }
          />
        </AutoComplete>

        <div className="mt-5 flex justify-between">
          <div className="w-[75%]">
            <label className="font-medium w-full my-1 text-[#545454] text-sm">
              Sort By
            </label>
            <Select
              defaultValue="lucy"
              size="large"
              className="w-full  text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium w-full my-1 text-[#545454] text-sm">
              Filter
            </label>
            <button className="mt-2">
              <Image
                src="/assets/svgs/icons/filter-icon.svg"
                width={40}
                height={40}
                alt="filter"
              />
            </button>
          </div>
        </div>

        <div className="mt-8 ">
          {[1, 2, 3].map((value) => (
            <div className="flex items-start mb-4 pb-4 border-b-2 border-[#5B5B5B]" key={value}>
              <Image
                src="/assets/images/demo-img.png"
                width={110}
                height={110}
                alt="img"
              />
              <div className="ml-6">
                <h3 className="text-[#746253] text-lg">
                  Lucky Girls Beauty Club
                </h3>
                {ARTISTINFO.map((artist) => (
                  <div className="flex items-center mt-2" key={artist.icon}>
                    <Image
                      src={artist.icon}
                      width={16}
                      height={16}
                      alt="icon"
                    />
                    <p className="ml-3 text-[#5B5B5B] text-sm">{artist.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#746253] p-4 bg-[#F0F0F0] text-xs mt-5">
          There are no results found based on your current search
        </p>
      </div>
    </div>
  );
}
