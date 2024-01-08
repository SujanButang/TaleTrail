import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const showToast = (status: string, message: string) => {
  const backgroundColor = status === "success" ? "#28a745" : "#dc3545";

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: backgroundColor,
    },
  }).showToast();
};
