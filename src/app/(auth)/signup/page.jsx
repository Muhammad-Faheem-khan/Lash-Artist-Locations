"use client";
import React, { useState } from "react";
import { Form, message, Checkbox, Select } from "antd";
import CustomInput from "@/app/components/uiComponents/InputField";
import { useRouter } from "next/navigation";
import Btn from "@/app/components/uiComponents/Btn";
import Image from "next/image";
import Link from "next/link";

function Signup() {
  const router = useRouter();
  const [apiLoading, setApiLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSignup = async (values) => {
    try {
      setApiLoading(true);
      const { email, password } = values;
      // const res = await loginUser({ email, password });
      let accessToken = true;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        const currentUser = true;
        if (currentUser) {
          router.push("/dashboard");
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
          form.resetFields();
          messageApi.error("This portal is for Admin");
        }
      }
    } catch (error) {
      form.resetFields();
      messageApi.error(
        error?.response?.data?.message || "Invalid Email or Password",
      );
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center overflow-y-hidden bg-white lg:grid lg:grid-cols-5 lg:justify-items-center lg:content-center">
      {contextHolder}
      <div className="relative lg:col-span-3 col-span-5 flex flex-col md:w-[70%] w-[80%] justify-center space-y-6 2xl:space-y-8 pt-0 lg:mt-0">
        <div className="space-y-2">
          <h1 className="font-medium text-4xl mb-4">Create new account.</h1>
          <p className="text-secondary text-sm ">
            Already have an account.
            <Link
              href="/login"
              className="text-[#746253] text-xs hover:text-primary"
            >
              Login
            </Link>
          </p>
        </div>

        <Form form={form} onFinish={handleSignup}>
          <Form.Item
            className="relative"
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
            name="you Are"
            className="you-are-select"
            rules={[
              {
                required: true,
                message: "Please select who you are!",
              },
            ]}
          >
            <>
              <label className="block z-[300] opacity-50 font-medium w-full my-1 ml-1 px-2 text-xs absolute top-[-2px]">
                You are
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
            </>
          </Form.Item>

          <div className="grid grid-cols-2">
            <Form.Item
              name="password"
              className="col-span-1 mr-2"
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
              name="confirmPassword"
              className="col-span-1 ml-2"
              rules={[
                {
                  required: true,
                  message: "Please confirm password!",
                },
              ]}
            >
              <CustomInput
                labelText="Confirm Password"
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
          </div>

          <div className="flex items-center mt-2">
            <Checkbox />
            <p className="ml-3">
              I agree to terms and conditions and privacy policy
            </p>
          </div>

          <Form.Item>
            <Btn
              type="submit"
              color="primary"
              text="Create Account"
              isLoading={apiLoading}
              className="w-[200px]"
            />
          </Form.Item>
        </Form>
      </div>

      <div className="hidden col-span-2 w-[75%] h-[70%] lg:block w-full h-screen flex justify-center items-center space-y-12">
        <Image
          width={500}
          height={500}
          src="/assets/login-page.svg"
          className="w-full h-full"
          alt="showcase"
        />
      </div>
    </div>
  );
}

export default Signup;
