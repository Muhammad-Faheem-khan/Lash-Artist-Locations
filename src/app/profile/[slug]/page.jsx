'use client'
import ProfileLayout from "@/app/components/ProfileLayout";
import InfoUnit from "@/app/components/uiComponents/infoUnit";
import SocialUnit from "@/app/components/uiComponents/socialUnit";
import React from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

function Profile() {
  const router = useRouter()
  const user = router.query;

  return (
    <ProfileLayout>
      <div className="relative z-[300">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl text-[#746253]">Basic Information</h3>
          <Link
            href={"1/edit"}
            className="text-[#746253]  flex items-center bg-primary rounded-full px-3 py-2"
          >
            <Image
              className="mr-2"
              src="/assets/svgs/icons/edit-icon.svg"
              width={12}
              height={12}
              alt="edit"
            />
            <span className="text-xs">Edit Profile</span>
          </Link>
        </div>
        <div className="grid grid-cols-3 mt-6">
          <InfoUnit heading="Age" value={user?.customer?.age || "24 Years"} />
          <InfoUnit
            heading="Years of Experince"
            value={user?.customer?.experience || "6 Years"}
          />
          <InfoUnit
            heading="Phone #"
            value={user?.customer?.phone || "+123 456 7890"}
          />
          <InfoUnit
            heading="Location"
            value={user && (
              user?.addresses[0]?.address1 +
              user?.addresses[0]?.address2 +
              user?.addresses[0]?.city +
              user?.addresses[0]?.province +
              user?.addresses[0]?.country
            ) || "19 Sreet New Mexico."}
          />
          <InfoUnit heading="Email" value="xyz@gamil.com" />
          <InfoUnit heading="Business Name" value="Dummy business Name" />
          <InfoUnit heading="Business Address" value="Dummy address" />
          <InfoUnit heading="Business Phone #" value="919110029202" />
        </div>
        <div className="mt-12">
          <h3 className="text-xl text-[#746253]">Social Media</h3>
          <div className="grid grid-cols-5 flex items-center">
            <SocialUnit
              icon="/assets/svgs/icons/insta-icon.svg"
              value= {user?.customer?.social || "luckygirls.beautyclub"}
            />
            <SocialUnit
              icon="/assets/svgs/icons/web-icon.svg"
              value= {user?.customer?.website || "www.lashartist.com"}
            />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default Profile;
