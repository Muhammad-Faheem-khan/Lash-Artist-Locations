"use client";
import React, { useEffect, useState } from "react";
import { Form, message, Checkbox } from "antd";
import CustomInput from "@/app/components/uiComponents/InputField";
import { useRouter } from "next/navigation";
import Btn from "@/app/components/uiComponents/Btn";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/components/uiComponents/loading";
function Login() {
  const router = useRouter();
  const [apiLoading, setApiLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleLogin = async (values) => {
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

  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <div className="h-screen relative flex flex-col items-center justify-center overflow-y-hidden bg-white lg:grid lg:grid-cols-5 lg:justify-items-center lg:content-center">
      {contextHolder}
      <div className="relative lg:col-span-3 col-span-5 flex flex-col md:w-[70%] w-[80%] justify-center space-y-10 2xl:space-y-12 pt-0 lg:mt-0">
        <div className="space-y-2">
          <h1 className="font-medium text-4xl">Enter your login details</h1>
          <p className="text-secondary text-sm mt-2">
            Don’t have an account.{" "}
            <Link
              href="/signup"
              className="text-[#746253] text-xs hover:text-primary"
            >
              Register
            </Link>
          </p>
        </div>
        <Form form={form} onFinish={handleLogin}>
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
          <div className="flex justify-end">
            <Link
              href="#"
              className="text-secondary text-xs hover:text-primary"
            >
              {" "}
              Forget Password
            </Link>
          </div>
          <div className="flex items-center mt-2">
            <Checkbox />
            <p className="ml-3">Remember me</p>
          </div>
          <Form.Item>
            <Btn
              type="submit"
              color="primary"
              text="Login"
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
export default Login;