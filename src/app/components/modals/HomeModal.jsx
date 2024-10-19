"use client";
import React, { useState, useEffect } from "react";
import { Checkbox, Form, Modal } from "antd";
import Image from "next/image";
import Btn from "../uiComponents/Btn";
import { Noto_Serif } from "next/font/google";

const notoSerif = Noto_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export function HomeModal() {
  const [isopen, setIsOpen] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [form] = Form.useForm();

  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);


  const [checkboxColors, setCheckboxColors] = useState({
    lightHeart: "#2A2A2A",
    certifiedArtist: "#787777",
    educators: "#787777",
    retail: "#787777",
    lightHQ: "#787777",
  });

  const handleSearch = (values) => {
    try {
      setApiLoading(true);
      const { lightHeart, certifiedArtist, educators, retail, lightHQ } =
        values;

        console.log(lightHeart, certifiedArtist, educators, retail, lightHQ )
    } catch (error) {
      form.resetFields();
      messageApi.error(
        error?.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setApiLoading(false);
    }
  };

  const handleValuesChange = (changedValues, allValues) => {
    setCheckboxColors({
      lightHeart: allValues.lightHeart ? "#2A2A2A" : "#787777",
      certifiedArtist: allValues.certifiedArtist ? "#2A2A2A" : "#787777",
      educators: allValues.educators ? "#2A2A2A" : "#787777",
      retail: allValues.retail ? "#2A2A2A" : "#787777",
      lightHQ: allValues.lightHQ ? "#2A2A2A" : "#787777",
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <Modal
      title={<></>}
      centered
      open={isopen}
      footer={null}
      className={`${notoSerif.className}`}
      width={1250}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      closeIcon={
        <span className="p-2 rounded-full border bg-primary relative md:top-[-1.75rem] top-0 md:right-[-1.75rem] right-0 ">
          <Image
            src="/assets/svgs/icons/modal-close.svg"
            width={12}
            height={12}
            alt="close-icon"
          />
        </span>
      }
    >
      <div className="h-[75vh] relative flex flex-col items-center justify-center overflow-y-hidden bg-[#EDE6DE]  lg:grid lg:grid-cols-5 lg:justify-items-center lg:content-center rounded-2xl">
        <div className="relative lg:col-span-3 col-span-5 flex flex-col py-10 md:w-[70%] w-[80%] justify-center space-y-4 lg:mt-0">
          <div className="space-y-2">
            <h1 className="font-medium lg:text-3xl md:text-2xl">
              Find Light Heart Lash Artists, Educators, And Retail Locations
              Near You
            </h1>
          </div>

          <Form
            form={form}
            onFinish={handleSearch}
            initialValues={{
              lightHeart: true,
              certifiedArtist: false,
              educators: false,
              retail: false,
              lightHQ: false,
            }}
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              name="lightHeart"
              className="mb-1"
              valuePropName="checked"
            >
              <Checkbox>
                <p style={{ color: checkboxColors.lightHeart }}>
                  Artists Using Light Heart Products
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="certifiedArtist"
              className="mb-1"
              valuePropName="checked"
            >
              <Checkbox>
                <p style={{ color: checkboxColors.certifiedArtist }}>
                  Light Heart Certified Artists
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="educators"
              className="mb-1"
              valuePropName="checked"
            >
              <Checkbox>
                <p style={{ color: checkboxColors.educators }}>
                  Light Heart Certified Educators
                </p>
              </Checkbox>
            </Form.Item>

            <Form.Item name="retail" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.retail }}>Retail Locations</p>
              </Checkbox>
            </Form.Item>

            <Form.Item name="lightHQ" className="mb-1" valuePropName="checked">
              <Checkbox>
                <p style={{ color: checkboxColors.lightHQ }}>Light Heart HQ</p>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Btn
                type="submit"
                color="#746253"
                text="Search"
                isLoading={apiLoading}
                className="w-[90%] text-white bg-[#746253]"
              />
            </Form.Item>
          </Form>
        </div>

        <div className="hidden col-span-2 w-[100%] h-[100%] lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EDE6DE] to-transparent w-[40%] h-full z-10"></div>
          <Image
            width={500}
            height={600}
            src="/assets/images/home-img.png"
            className="w-full h-full object-cover"
            alt="showcase"
          />
        </div>
      </div>
    </Modal>
  );
}
