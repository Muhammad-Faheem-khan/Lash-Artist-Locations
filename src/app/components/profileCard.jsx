import Image from "next/image";
import React from "react";

export function ProfileCard() {
  const SERVICES = [
    "Lash extensions",
    "Lash lifts",
    "Lash fills or touch-ups",
    "Lash lifts",
    "Lash fills or touch-ups",
  ];
  return (
    <div className="lg:col-span-2 col-span-6 lg:mr-4 mr-0 flex flex-col items-center rounded-xl shadow-lg bg-white px-6 py-6 mt-4">
      <Image
        src="/assets/images/image2.png"
        width={155}
        height={155}
        alt="profile img"
      />
      <h3 className="text-2xl text-[#746253]">Anaya Groover</h3>
      <p className=" text-secondary mt-1">Lush Artist</p>
      <p className="text-secondary text-xs text-center mt-4 leading-6">
        Some information Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Some information Lorem Ipsum is simply dummy text
        of the printing and typesetting industry.
      </p>
      <div className="mt-8 pt-10 border-t-2 w-full">
        <h3 className="text-xl text-[#746253] ">Services</h3>
        <div className="flex flex-wrap mt-3">
          {SERVICES.map((service, index) => (
            <p
              key={service + index}
              className="text-secondary text-xs font-thin border border-secondary rounded-full px-3 py-2 mr-2 mt-2 "
            >
              {service}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
