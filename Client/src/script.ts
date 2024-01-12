import { makeRequest } from "./axios/axios";
import { IHTTPError } from "./interface/httpError";
import { populateBlogs } from "./utils/PopulateBlogs";
import { cookieValid, getCookie, showToast, toggleClass } from "./utils/utils";

const signInBtn: HTMLElement = document.querySelector(
  "#sign-in"
) as HTMLElement;
const getStartedBtn: HTMLElement = document.querySelector(
  "#get-started"
) as HTMLElement;
const writeLink: HTMLAnchorElement = document.querySelector(
  "#write-link"
) as HTMLAnchorElement;

document.addEventListener("DOMContentLoaded", async () => {
  const cookie = getCookie("accessToken");
  if (!cookie) return;
  const validCookie = await cookieValid();
  if (!validCookie) return;
  toggleClass(signInBtn, { remove: "sm:flex" });
  toggleClass(getStartedBtn, { add: "hidden" });
  writeLink.href = "./src/pages/Write/write.html";
});

export const getBlogs = async () => {
  try {
    const res = await makeRequest.get("/blog?page=1&size=4");
    const blogContainer = document.querySelector(
      "#blog-container"
    ) as HTMLElement;
    populateBlogs(blogContainer, res.data);
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getBlogs();
