import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteStoredData, get_auth_key } from "../../utils";

const Logout = () => {
  useEffect(() => {
    deleteStoredData(get_auth_key());
    const doLogOut = async () => {
      let result = await axios
        .get("/api/user/logout")
        .then((resp) => {
          return resp.data;
        })
        .catch((e) => {
          toast.error(e.message);
          window.location = "/";
          return null;
        });

      if (result) {
        if (result.data && result.data.auth === false) {
          toast.success("Logged out succesfully");
          window.location = "/";
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      }
    };
    doLogOut();
  }, []);

  return <p className="mt-3">Logging out . . .</p>;
};

export default Logout;
