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
const topicContainer = document.querySelector(
  "#topic-container"
) as HTMLElement;

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
    const res = await makeRequest.get("/blog?page=1&size=6");
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

const getTopics = async () => {
  try {
    const res = await makeRequest.get("/topic?page=1&size=7");
    const topicData: Array<{
      id: string;
      topic: string;
      created_at: Date;
      updated_at: Date;
    }> = res.data;
    topicData.forEach(
      (topic: {
        id: string;
        topic: string;
        created_at: Date;
        updated_at: Date;
      }) => {
        const topicBtn = document.createElement("button") as HTMLButtonElement;
        topicBtn.className =
          "flex px-3 py-2 rounded-2xl bg-[#f2f2f2] text-sm font-semibold text-[#242424]";
        topicBtn.innerText = topic.topic;
        topicContainer.appendChild(topicBtn);
      }
    );
  } catch (error) {
    console.log(error);
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getBlogs();
getTopics();
