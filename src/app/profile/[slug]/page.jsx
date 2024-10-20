'use client'
import ProfileLayout from "@/app/components/ProfileLayout";
import InfoUnit from "@/app/components/uiComponents/infoUnit";
import SocialUnit from "@/app/components/uiComponents/socialUnit";
import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation';


function Profile() {
  const router = useRouter()
  const user = router.query;

  return (
    <ProfileLayout>
      <div className="relative z-[300">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl text-[#746253]">Basic Information</h3>
        </div>
        <div className="grid grid-cols-3 mt-6">
          <InfoUnit heading="Age" value={user?.customer?.age || "24 Years"} />
          <InfoUnit
            heading="Years of Experince"
            value={user?.customer?.experience || "6 Years"}
          />
          <InfoUnit
            heading="Phone"
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
              value= {user?.customer?.website || "www.lushartist.com"}
            />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default Profile;
