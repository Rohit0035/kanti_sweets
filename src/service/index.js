import axios from "axios";

export const getUserAccountDetail = () => {
  return axios
    .get("/api/kc/userInfo")
    .then((resp) => {
      return resp && resp.data;
    })
    .catch((error) => {
      //throw error;
      return {
        name: "Admin",
        sub: "51286891738912835812739821",
        displayName: "Admin User"
      };
    });
};
