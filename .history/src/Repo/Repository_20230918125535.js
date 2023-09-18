/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

const Baseurl = "https://mr-sushruth-backend-ecommerce.vercel.app/";

export const AdminLogin = async (payload) => {
  try {
    const res = await axios.post(`${Baseurl}api/v1/admin/signin`);
    Store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  } catch {}
};
