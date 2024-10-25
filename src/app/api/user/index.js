import { axiosGet, axiosPost } from "../../../../utils/axiosMethods";

export const getNearByUsers = async (payload) => {
    const res = await axiosPost({
      path: "customers/nearby",
      payload
    });
  
    return res;
  };