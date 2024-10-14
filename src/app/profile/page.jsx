import Image from "next/image";
import React from "react";
import InfoUnit from "../components/uiComponents/infoUnit";
import SocialUnit from "../components/uiComponents/socialUnit";
import ProfileLayout from "../components/ProfileLayout";
import Link from "next/link";

function Profile() {
  return (
    <ProfileLayout>
      <div className="relative z-[300">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl text-[#746253]">Basic Information</h3>
        </div>
        <div className="grid grid-cols-3 mt-6">
          <InfoUnit heading="Age" value="24 Years" />
          <InfoUnit heading="Years of Experince" value="6 Years" />
          <InfoUnit heading="Phone" value="+123 456 7890" />
          <InfoUnit heading="Location" value="6969 E shea Evd" />
          <InfoUnit heading="Email" value="xyz@gamil.com" />
        </div>
        <div className="mt-12">
          <h3 className="text-xl text-[#746253]">Social Media</h3>
          <div className="grid grid-cols-5 flex items-center">
            <SocialUnit
              icon="/assets/svgs/icons/insta-icon.svg"
              value="luckygirls.beautyclub"
            />
            <SocialUnit
              icon="/assets/svgs/icons/web-icon.svg"
              value="www.lushartist.com"
            />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default Profile;
