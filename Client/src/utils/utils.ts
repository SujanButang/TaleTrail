import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { makeRequest } from "../axios/axios";

export interface ClassToggleOptions {
  add?: string;
  remove?: string;
}

/**
 * Toggles CSS classes on a given HTML element based on the provided options.
 * @param element - The HTML element to toggle classes on.
 * @param options - Options for adding and removing classes.
 *                  - `add`: CSS class to add to the element.
 *                  - `remove`: CSS class to remove from the element.
 */
export const toggleClass = (
  element: HTMLElement,
  options: ClassToggleOptions
): void => {
  if (options.remove) {
    element.classList.remove(options.remove);
  }
  if (options.add) {
    element.classList.add(options.add);
  }
};

/**
 * Displays a toast notification using Toastify.
 * @param status - The status of the notification (e.g., "success" or "failed").
 * @param message - The message to be displayed in the toast notification.
 */
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

// Given a cookie key `name`, returns the value of
// the cookie or `null`, if the key is not found.
export const getCookie = (name: string): string | null => {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
};

/**
 * Checks the validity of the user's session by making an asynchronous request to the "/user/me" endpoint.
 * Returns a Promise that resolves to true if the request is successful (status code 200), otherwise false.
 * @returns A Promise<boolean> representing the validity of the user's session.
 */
export const cookieValid = async (): Promise<boolean> => {
  const res = await makeRequest.get("/user/me");
  if (res.status == 200) return true;
  return false;
};