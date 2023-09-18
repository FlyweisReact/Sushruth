/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

const Baseurl = "https://mr-sushruth-backend-ecommerce.vercel.app/";

export const AdminLogin = async (payload) => {
  try {
    const res = await axios.post(`${Baseurl}api/v1/admin/signin`);
    const token = res.data.accessToken
    localStorage.setItem("token" , token)
    Store.addNotification({
      title: "",
      message: "Welcome Admin",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  } catch {}
};