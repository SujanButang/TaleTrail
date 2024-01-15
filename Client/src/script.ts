import { makeRequest } from "./axios/axios";
import { IHTTPError } from "./interface/httpError";
import { IFollowings, IUsers } from "./interface/user";
import { populateBlogs } from "./utils/PopulateBlogs";
import { showToast, toggleFollowingStatus } from "./utils/utils";

const topicContainer = document.querySelector(
  "#topic-container"
) as HTMLElement;

export const getBlogs = async () => {
  try {
    const res = await makeRequest.get("/blog?page=1&size=20");
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

const userData = JSON.parse(localStorage.getItem("user") as string);

export const getUsers = async () => {
  try {
    let followingsData = [];
    if (userData) followingsData = await getFollowings(userData.id);
    const followingIds = followingsData.map(
      (following: IFollowings) => following.following.id
    );
    const usersRes = await makeRequest.get("/user/users?page=1&size=5");
    let usersArray: Array<IUsers> = [];
    if (userData) {
      usersArray = usersRes.data.filter(
        (user: IUsers) =>
          user.id !== JSON.parse(localStorage.getItem("user") as string).id
      ) as Array<IUsers>;
    } else {
      usersArray = usersRes.data;
    }

    const usersContainerElement = document.querySelector(
      "#users-container"
    ) as HTMLElement;
    usersArray.forEach((user) => {
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
        <h1 class="font-extrabold cursor-pointer hover:underline" id="user-profile-${
          user.id
        }">${user.username}</h1>
        <p class="text-sm font-light text-[#7b7b7b]">
          ${user.bio !== null ? user.bio : ""}
        </p>
      </div>
      <div class="h-full flex items-center justify-center">
        <button class="border rounded-2xl text-sm p-2" id="follow-${user.id}">${
        followingIds.includes(user.id) ? "Following" : "Follow"
      }</button>
      </div>
    `;
      usersContainerElement.appendChild(userDiv);
      const userProfileBtn = document.querySelector(
        `#user-profile-${user.id}`
      ) as HTMLHeadingElement;
      userProfileBtn.addEventListener(
        "click",
        () =>
          (window.location.href =
            window.location.origin +
            "/src/pages/Profile/profile.html?userId=" +
            user.id)
      );

      const followBtn = document.querySelector(
        `#follow-${user.id}`
      ) as HTMLButtonElement;
      followBtn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        try {
          const res = await makeRequest.post(
            "/relationship?followingId=" + user.id
          );
          if (res.status == 200) {
            toggleFollowingStatus(followBtn);
            showToast("success", res.data);
          }
        } catch (error) {
          showToast("failed", "Sign in to start following. ☹️");
        }
      });
    });
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

export const getFollowings = async (userId: string) => {
  try {
    if (userId) {
      const res = await makeRequest.get(
        "/relationship/followings?userId=" + userId
      );
      return res.data;
    } else return [];
  } catch (error) {
    return [];
  }
};

getBlogs();
getTopics();
getUsers();
