import { cookieValid, getCookie, toggleClass } from "./utils/utils";

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
