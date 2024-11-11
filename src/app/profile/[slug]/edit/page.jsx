"use client";
import { UploadImgModal } from "@/app/components/modals/uploadImgModal";
import ProfileLayout from "@/app/components/ProfileLayout";
import CustomInput from "@/app/components/uiComponents/InputField";
import Loading from "@/app/components/uiComponents/loading";
import useGoogleMapsApi from "@/app/context/GoogleMapContext";
import { AutoComplete, Form, Input, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Profile() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [personalAddress, setPersonalAddress] = useState("");
  const [personalOptions, setPersonalOptions] = useState([]);

  const [businessAddress, setBusinessAddress] = useState("");
  const [businessOptions, setBusinessOptions] = useState([]);
  const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAP_KEY);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handlePersonalAddressChange = (value) => {
    if (isLoaded && window.google) {
      try {
        setPersonalAddress(value);
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
                setPersonalOptions(
                  predictions.map((prediction) => ({
                    value: prediction.description,
                    placeId: prediction.place_id,
                  }))
                );
              }
            }
          );
        } else {
          setPersonalOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBusinessAddressChange = (value) => {
    if (isLoaded && window.google) {
      try {
        setBusinessAddress(value);
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
                setBusinessOptions(
                  predictions.map((prediction) => ({
                    value: prediction.description,
                    placeId: prediction.place_id,
                  }))
                );
              }
            }
          );
        } else {
          setBusinessOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlePersonalSelect = (value, option) => {
    if (isLoaded && window.google) {
      try {
        setPersonalAddress(value);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: option.placeId }, (results, status) => {
          if (status === "OK") {
            const location = results[0]?.geometry.location;
            const newLocation = [location.lat(), location.lng()];
          } else {
            console.error("Geocode failed: " + status);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBusinessSelect = (value, option) => {
    if (isLoaded && window.google) {
      try {
        setBusinessAddress(value);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: option.placeId }, (results, status) => {
          if (status === "OK") {
            const location = results[0]?.geometry.location;
            const newLocation = [location.lat(), location.lng()];
          } else {
            console.error("Geocode failed: " + status);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <ProfileLayout>
      <UploadImgModal showModal={showModal} handleModal={setShowModal} />
      <div className="relative z-[300]">
        <Form form={form}>
          <div className="flex justify-between items-center">
            <h3
              className="text-xl text-[#746253]"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Basic Information
            </h3>
            <div className="flex">
              <Link
                href="/profile/1"
                className="text-[#993456] text-xs rounded-full px-5 py-2 mr-3 mt-4"
              >
                Cancel
              </Link>
              <Form.Item className="mt-4">
                <button className="text-[#746253] text-xs bg-primary rounded-full px-5 py-2">
                  Save
                </button>
              </Form.Item>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-6">
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <CustomInput
                labelText="Name"
                type="text"
                placeholder="Shawn Murphy MD"
                icon={
                  <Image
                    src="/assets/svgs/icons/profile-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="name"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <CustomInput
                labelText=" Email"
                type="email"
                placeholder="xyz@mail.com"
                icon={
                  <Image
                    src="/assets/svgs/icons/email-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="email"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <CustomInput
                labelText="Phone"
                type="text"
                placeholder="+123 456 7899"
                icon={
                  <Image
                    src="/assets/svgs/icons/phone-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="phone"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="password"
            >
              <CustomInput
                labelText="Password"
                type="password"
                placeholder="*******"
                icon={
                  <Image
                    src="/assets/svgs/icons/lock-icon.svg"
                    width={20}
                    height={20}
                    className="ml-2 mr-2"
                    alt="password"
                  />
                }
              />
            </Form.Item>

            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="businessName"
            >
              <CustomInput
                labelText="Business Name"
                type="text"
                placeholder="11 American Express"
                icon={
                  <Image
                    src="/assets/svgs/icons/city-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="city"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="businessPhone"
            >
              <CustomInput
                labelText="Business Phone #"
                type="text"
                placeholder="678977917"
                icon={
                  <Image
                    src="/assets/svgs/icons/phone-icon.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="phone"
                  />
                }
              />
            </Form.Item>
            <Form.Item
              name="address"
              className="relative md:col-span-1 col-span-2 mr-3"
            >
              <label className="block z-[300] opacity-50 font-medium w-full my-1  px-2 text-xs absolute top-[-3px]">
                Personal Address
              </label>
              <AutoComplete
                value={personalAddress}
                options={personalOptions}
                onChange={handlePersonalAddressChange}
                onSelect={handlePersonalSelect}
                className="w-full"
              >
                <Input
                  placeholder="Personal Address"
                  value={personalAddress}
                  onChange={(e) => setPersonalAddress(e.target.value)}
                  className="px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
                  suffix={
                    <Image
                      src={
                        personalAddress
                          ? "/assets/svgs/icons/close-btn.svg"
                          : "/assets/svgs/icons/search-icon.svg"
                      }
                      onClick={() => setPersonalAddress("")}
                      width={20}
                      height={20}
                      alt="search"
                    />
                  }
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="businessAddress"
              className="relative md:col-span-1 col-span-2 mr-3"
            >
              <label className="block z-[300] opacity-50 font-medium w-full my-1  px-2 text-xs absolute top-[-3px]">
                Business Address
              </label>
              <AutoComplete
                value={businessAddress}
                options={businessOptions}
                onChange={handleBusinessAddressChange}
                onSelect={handleBusinessSelect}
                className="w-full"
              >
                <Input
                  placeholder="Business Address"
                  value={businessAddress}
                  className="w-full px-2 py-1 pt-3 text-gray-800 bg-[#EDE6DE3D] outline-none border border-[#E8E8E8] focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  suffix={
                    <Image
                      src={
                        businessAddress
                          ? "/assets/svgs/icons/close-btn.svg"
                          : "/assets/svgs/icons/search-icon.svg"
                      }
                      onClick={() => setBusinessAddress("")}
                      width={20}
                      height={20}
                      alt="search"
                    />
                  }
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="service"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
            >
              <div>
                <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-4px] flex">
                  <Image
                    className="mr-1"
                    src="/assets/svgs/icons/service-icon.svg"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                  Services
                </label>
                <Select
                  defaultValue={["services"]}
                  size="large"
                  mode="multiple"
                  className="w-full  text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "service", label: "Services" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="Gender"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
            >
              <div>
                <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-4px] flex">
                  <Image
                    className="mr-1"
                    src="/assets/svgs/icons/gender-icon.svg"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                  Gender
                </label>
                <Select
                  defaultValue="male"
                  size="large"
                  className="w-full  text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </ProfileLayout>
  );
}
export default Profile;
