import axios from "axios";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import {
  cookieValid,
  getCookie,
  showToast,
  toggleModal,
} from "../../utils/utils";
import moment from "moment";

const homeLinkDiv = document.querySelector("#home-link") as HTMLElement;
homeLinkDiv.addEventListener(
  "click",
  () => (window.location.href = window.location.origin)
);

document.addEventListener("DOMContentLoaded", async () => {
  const cookie = getCookie("accessToken");
  const validCookie = await cookieValid();
  if (!cookie || !validCookie) window.location.href = window.location.origin;
});

const userImages: HTMLImageElement[] = Array.from(
  document.querySelectorAll("#user-image")
);
const username = document.querySelector("#username") as HTMLSpanElement;
const userEmail = document.querySelector("#user-email") as HTMLSpanElement;
const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  username.innerText = userData.username;
  userEmail.innerText = userData.email || "";
  if (userData.profileImage) {
    userImages.forEach((userImage) => {
      userImage.src = userData.profileImage;
    });
  }
}
const userId = userData.id;

/**
 * Gets the followers of a user by making a request to the backend API endpoint.
 * Updates the corresponding HTML element with the follower count.
 *
 * @param {string} userId - The unique identifier of the user to get followers for.
 * @returns {Promise<void>} - A Promise that resolves after fetching and updating the follower count.
 */
const getFollowers = async (userId: string): Promise<void> => {
  try {
    const res = await makeRequest.get(
      "/relationship/followers?userId=" + userId
    );
    const followerCountDiv = document.querySelector(
      "#follower-count"
    ) as HTMLSpanElement;
    followerCountDiv.innerText = res.data.length;
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getFollowers(userId);

/**
 * Retrieves the followers associated with the specified user ID and updates the follower count in the UI.
 * @param userId - The ID of the user whose followers are to be retrieved.
 */
const getFollowings = async (userId: string) => {
  try {
    const res = await makeRequest.get(
      "/relationship/followings?userId=" + userId
    );
    const followingCountDiv = document.querySelector(
      "#following-count"
    ) as HTMLSpanElement;
    followingCountDiv.innerText = res.data.length;
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getFollowings(userId);

const editProfileBtn = document.querySelector(
  "#edit-profile-btn"
) as HTMLButtonElement;
const profileEditModal = document.querySelector(
  "#profile-edit-modal"
) as HTMLElement;
editProfileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(profileEditModal);
});

const closeModalBtns = Array.from(document.querySelectorAll("#close-modal"));
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    toggleModal(profileEditModal);
  });
});

const saveBtn = document.querySelector("#save-btn") as HTMLButtonElement;
const profileImgs: HTMLImageElement[] = Array.from(
  document.querySelectorAll("#user-image")
);
const uploadProfileBtn = document.querySelector(
  "#upload-profile-img"
) as HTMLElement;
const profileImageInput = document.querySelector(
  "#profile-image-input"
) as HTMLInputElement;

uploadProfileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  profileImageInput.click();
});

profileImageInput.addEventListener("change", async (e: Event) => {
  e.preventDefault();
  const formData = new FormData();
  if (profileImageInput.files && profileImageInput.files.length > 0) {
    formData.append("file", profileImageInput.files[0]);
    formData.append("upload_preset", "wsugtigo");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/drrrbo5hw/image/upload",
        formData
      );
      profileImgs.forEach((profileImg) => {
        profileImg.src = res.data.url;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
});

saveBtn.addEventListener("click", async (e: Event) => {
  e.preventDefault();
  try {
    const profile_image = profileImgs[0].src;
    const username = (
      document.querySelector("#profile-update-username") as HTMLInputElement
    ).value;
    const bio = (
      document.querySelector("#profile-update-bio") as HTMLInputElement
    ).value;
    if (
      profile_image == `${window.location.origin}/no-profile.jpg` ||
      username.trim() == ""
    ) {
      showToast("fail", "Username and profile image are necessary");
    } else {
      const res = await makeRequest.put("/user/updateProfile", {
        username,
        profile_image,
        bio,
      });
      showToast("success", res.data);
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
});

/**
 * Retrieves blogs associated with the specified user ID and dynamically populates the blog container.
 * @param userId - The ID of the user whose blogs are to be retrieved.
 */
const getUserReadingList = async () => {
  try {
    const res = await makeRequest.get("/readingList");
    const blogContainer = document.querySelector(
      "#blog-container"
    ) as HTMLElement;
    res.data.forEach(
      (blog: {
        id: string;
        blog: {
          id: string;
          title: string;
          cover_image: string;
          description: string;
          created_at: string;
          topic: string;
          author: {
            id: string;
            profile_image: string;
            username: string;
          };
        };
      }) => {
        const blogDiv = document.createElement("div") as HTMLElement;
        blogDiv.classList.add(
          "flex",
          "flex-col",
          "gap-2",
          "border-b",
          "py-10",
          "cursor-pointer"
        );

        const authorInfo = document.createElement("div") as HTMLDivElement;
        authorInfo.className = "flex items-center gap-3";
        authorInfo.innerHTML = `<figure class="w-8 h-8 rounded-full object-cover overflow-hidden">
      <img
        src=${
          blog.blog.author.profile_image !== null
            ? blog.blog.author.profile_image
            : `${window.location.origin}/no-profile.jpg`
        }
        alt=""
        class="h-full w-full"
      />
    </figure>
    <span class="font-semibold"> ${blog.blog.author.username} </span>
    <span class="font-light text-sm"> ${moment(blog.blog.created_at).format(
      "MMMM DD, YYYY"
    )} </span>
    <div id="blog-option-${blog.blog.id}" class="relative">
        <img src="../../../option.png" alt="" class="h-5 w-5 object-cover"/>
        <div class="absolute bottom-[-100px] right-[-100px] h-18 w-40 bg-white border shadow-lg rounded-md hidden flex-col p-2 gap-2" id="blog-option-modal-${
          blog.blog.id
        }">
            <hr>
            <button class="p-1 flex gap-2 items-center" id="delete-blog-${
              blog.blog.id
            }">
            <img src="../../../delete.png" alt="" class="h-5 w-5 object-cover"/>

            Remove</button>
        </div>
    </div>
    `;
        blogDiv.appendChild(authorInfo);

        const blogContent = document.createElement("div");
        blogContent.className = "flex gap-5";
        blogContent.innerHTML = `
          <div class="sm:w-[80%] w-full flex flex-col justify-between gap-3">
            <h1 class="md:text-2xl text-lg font-extrabold">${blog.blog.title}</h1>
            <p class="text-justify font-medium md:flex hidden leading-[1.5em] h-[4.5em] overflow-hidden">${blog.blog.description}</p>
            <div class="flex items-center justify-between">
             
              
            </div>
          </div>
          <figure class="sm:w-[20%] flex items-center justify-center object-cover">
            <img src="${blog.blog.cover_image}" alt="" class="h-full w-full object-cover" />
          </figure>
        `;
        blogDiv.appendChild(blogContent);
        const anchor = document.createElement("a") as HTMLAnchorElement;
        anchor.href = `${window.location.origin}/src/pages/Blog/blog.html?blogId=${blog.blog.id}`;
        anchor.appendChild(blogDiv);

        blogContainer.appendChild(anchor);

        const blogOptionBtn = document.querySelector(
          `#blog-option-${blog.blog.id}`
        ) as HTMLButtonElement;
        const blogOptionModal = document.querySelector(
          `#blog-option-modal-${blog.blog.id}`
        ) as HTMLElement;
        blogOptionBtn.addEventListener("click", (e: Event) => {
          e.preventDefault();
          toggleModal(blogOptionModal);
        });

        const deletBlogBtn = document.querySelector(
          `#delete-blog-${blog.blog.id}`
        ) as HTMLButtonElement;
        deletBlogBtn.addEventListener("click", async (e: Event) => {
          e.preventDefault();
          try {
            const res = await makeRequest.delete(
              "/readingList?blogId=" + blog.blog.id
            );
            showToast("success", res.data);
            anchor.remove();
          } catch (error) {
            const errorMessage =
              typeof error === "object" && error !== null
                ? (error as IHTTPError)?.response?.data?.message
                : "";

            showToast("failed", errorMessage as string);
          }
        });
      }
    );
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getUserReadingList();
