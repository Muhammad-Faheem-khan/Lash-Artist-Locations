"use client";
import { UploadImgModal } from "@/app/components/modals/uploadImgModal";
import ProfileLayout from "@/app/components/ProfileLayout";
import CustomInput from "@/app/components/uiComponents/InputField";
import { Form, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Profile() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

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
                href="/profile"
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
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
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
              name="service"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
              rules={[
                {
                  required: true,
                  message: "Please select services",
                },
              ]}
            >
              <div>
                <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-1px] flex">
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
                  defaultValue="service"
                  size="large"
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
              rules={[
                {
                  required: true,
                  message: "Please select gender",
                },
              ]}
            >
              <div>
                <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-1px] flex">
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
                  ]}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="state"
              className="you-are-select md:col-span-1 col-span-2 mr-3"
              rules={[
                {
                  required: true,
                  message: "Please select state",
                },
              ]}
            >
              <div>
                <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-1px] flex">
                  <Image
                    className="mr-2"
                    src="/assets/svgs/icons/state-icon.svg"
                    width={15}
                    height={15}
                    alt="icon"
                  />
                  State
                </label>
                <Select
                  defaultValue="lucy"
                  size="large"
                  className="w-full  text-gray-800 bg-[#EDE6DE3D] outline-none rounded-lg"
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                  ]}
                />
              </div>
            </Form.Item>

            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <CustomInput
                labelText="City"
                type="text"
                placeholder="London"
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
              name="postalCode"
              rules={[
                {
                  required: true,
                  message: "Please input your postal code!",
                },
              ]}
            >
              <CustomInput
                labelText="Postal Code"
                type="text"
                placeholder="65776"
                icon={
                  <Image
                    src="/assets/svgs/icons/postbox.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="postbox"
                  />
                }
              />
            </Form.Item>

            <Form.Item
              className="relative md:col-span-1 col-span-2 mr-3"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <CustomInput
                labelText="Address"
                type="text"
                placeholder="8003 Wilson CircleRome, NY 13440"
                icon={
                  <Image
                    src="/assets/svgs/icons/location-pin.svg"
                    width={20}
                    height={20}
                    className="mr-2"
                    alt="address"
                  />
                }
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </ProfileLayout>
  );
}

export default Profile;
