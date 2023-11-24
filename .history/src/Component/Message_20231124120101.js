/** @format */

import { Store } from "react-notifications-component";

export const showMessage = ({title , message , type}) => {
  Store.addNotification({
    title: "",
    message: "Deleted",
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
};
