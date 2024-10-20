import { axiosGet, axiosPost } from "../../../../utils/axiosMethods";

export const getNearByUsers = async (payload) => {
    const res = await axiosPost({
      path: "customers/nearby",
      payload
    });
  
    return res;
  };

// export const getUserById = async (id) => {
//   const res = await axiosGet({
//     path: `find-by-userId?userId=${id}`,
//   });

//   return res;
// };