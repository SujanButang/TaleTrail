import { makeRequest } from "./axios/axios";
import { IHTTPError } from "./interface/httpError";
import { populateBlogs } from "./utils/PopulateBlogs";
import {
  cookieValid,
  getCookie,
  logout,
  showToast,
  toggleClass,
  toggleModal,
} from "./utils/utils";

//nav
const homeLinkDiv = document.querySelector("#home-link") as HTMLElement;
homeLinkDiv.addEventListener(
  "click",
  () => (window.location.href = window.location.origin)
);

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
const profileContainer = document.querySelector("#profile") as HTMLElement;

const profileOptionModal = document.querySelector(
  "#profile-option-div"
) as HTMLElement;
const userBtn = document.querySelector("#user-btn") as HTMLElement;

userBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(profileOptionModal);
});

const userImage = document.querySelector("#user-image") as HTMLImageElement;
const userEmail = document.querySelector("#user-email") as HTMLSpanElement;
const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  userEmail.innerText = userData.email;
  if (userData.profileImage) {
    userImage.src = userData.profileImage;
  }
}

const signOutButton = document.querySelector("#sign-out") as HTMLButtonElement;
signOutButton.addEventListener("click", async () => {
  await logout();
  window.location.href = window.location.origin;
});

document.addEventListener("DOMContentLoaded", async () => {
  const cookie = getCookie("accessToken");
  if (!cookie) return;
  const validCookie = await cookieValid();
  if (!validCookie) return;
  toggleClass(signInBtn, { remove: "sm:flex" });
  toggleClass(getStartedBtn, { add: "hidden" });
  toggleClass(profileContainer, { add: "flex", remove: "hidden" });
  writeLink.href = window.location.origin + "/src/pages/Write/write.html";
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

export const getUsers = async () => {
  try {
    const followingsRes = await makeRequest.get(
      "/relationship/followings?userId=" + userData.id
    );
    console.log(followingsRes);
    const followingIds = followingsRes.data.map(
      (following: {
        id: string;
        following: {
          id: string;
          username: string;
          profile_image: string;
          bio: string;
        };
      }) => following.following.id
    );
    const usersRes = await makeRequest.get("/user/users?page=1&size=5");
    const usersArray = usersRes.data.filter(
      (user: {
        id: string;
        username: string;
        profile_image: string;
        bio: string;
      }) => user.id !== JSON.parse(localStorage.getItem("user") as string).id
    ) as Array<{
      id: string;
      username: string;
      profile_image: string;
      bio: string;
    }>;
    const usersContainerElement = document.querySelector(
      "#users-container"
    ) as HTMLElement;
    usersArray.forEach((user) => {
      console.log(user.id, followingIds);
      const userDiv = document.createElement("div") as HTMLElement;
      userDiv.className = "flex gap-2 items-center w-full";
      userDiv.innerHTML = `
      <figure class="w-8 h-8 rounded-full overflow-hidden object-cover">
        <img
          src=${
            user.profile_image !== null
              ? user.profile_image
              : `${window.location.origin}/no-profile.jpg`
          }
          alt=""
          class="h-full w-full"
        />
      </figure>
      <div class="flex flex-col w-[60%]">
        <h1 class="font-extrabold">${user.username}</h1>
        <p class="text-sm font-light text-[#7b7b7b]">
          ${user.bio !== null ? user.bio : ""}
        </p>
      </div>
      <div class="h-full flex items-center justify-center">
        <button class="border rounded-2xl text-sm p-2">${
          followingIds.includes(user.id) ? "Following" : "Follow"
        }</button>
      </div>
    `;

      usersContainerElement.appendChild(userDiv);
    });
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
getUsers();
