import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import {
  cookieValid,
  getCookie,
  logout,
  showToast,
  toggleClass,
  toggleFollowingStatus,
  toggleModal,
} from "../../utils/utils";
import axios from "axios";

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

signInBtn.addEventListener(
  "click",
  () =>
    (window.location.href =
      window.location.origin + "/src/pages/Login/login.html")
);

getStartedBtn.addEventListener(
  "click",
  () =>
    (window.location.href =
      window.location.origin + "/src/pages/Register/register.html")
);

const profileContainer = document.querySelector("#profile") as HTMLElement;

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

const userImages: HTMLImageElement[] = Array.from(
  document.querySelectorAll("#user-image")
);
const userEmail = document.querySelector("#user-email") as HTMLSpanElement;
const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  userEmail.innerText = userData.email || "";
  if (userData.profileImage) {
    userImages.forEach((userImage) => {
      userImage.src = userData.profileImage;
    });
  }
}

const profileOptionModal = document.querySelector(
  "#profile-option-div"
) as HTMLElement;
const userBtn = document.querySelector("#user-btn") as HTMLElement;

userBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(profileOptionModal);
});

const signOutButton = document.querySelector("#sign-out") as HTMLButtonElement;
signOutButton.addEventListener("click", async () => {
  await logout();
  window.location.href = window.location.origin;
});

const profileBtn = document.querySelector("#profile-btn") as HTMLElement;
profileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  window.location.href =
    window.location.origin +
    "/src/pages/Profile/profile.html?userId=" +
    userData.id;
});

const userId = window.location.href.split("=")[1] as string;

/**
 * Retrieves blogs associated with the specified user ID and dynamically populates the blog container.
 * @param userId - The ID of the user whose blogs are to be retrieved.
 */
const getUserBlogs = async (userId: string) => {
  try {
    const res = await makeRequest.get("/blog/userBlogs?userId=" + userId);
    const blogContainer = document.querySelector(
      "#blog-container"
    ) as HTMLElement;
    console.log(res.data);
    res.data.forEach(
      (blog: {
        title: string;
        cover_image: string;
        created_at: string;
        description: string;
        author: { id: string; username: string; profile_image: string };
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
        blog.author.profile_image !== null
          ? blog.author.profile_image
          : `${window.location.origin}/no-profile.jpg`
      }
      alt=""
      class="h-full w-full"
    />
  </figure>
  <span class="font-semibold"> ${blog.author.username} </span>
  <span class="font-light text-sm"> ${moment(blog.created_at).format(
    "MMMM DD, YYYY"
  )} </span>`;
        blogDiv.appendChild(authorInfo);

        const blogContent = document.createElement("div");
        blogContent.className = "flex gap-5";
        blogContent.innerHTML = `
        <div class="sm:w-[80%] w-full flex flex-col justify-between gap-3">
          <h1 class="md:text-2xl text-lg font-extrabold">${blog.title}</h1>
          <p class="text-justify font-medium md:flex hidden leading-[1.5em] h-[4.5em] overflow-hidden">${blog.description}</p>
          <div class="flex items-center justify-between">
           
            
          </div>
        </div>
        <figure class="sm:w-[20%] flex items-center justify-center object-cover">
          <img src="${blog.cover_image}" alt="" class="h-full w-full object-cover" />
        </figure>
      `;
        blogDiv.appendChild(blogContent);
        const anchor = document.createElement("a") as HTMLAnchorElement;
        anchor.href = `${window.location.origin}/src/pages/Blog/blog.html?blogId=${blog.id}`;
        anchor.appendChild(blogDiv);

        blogContainer.appendChild(anchor);
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

getUserBlogs(userId);

const getUserDetails = async (userId: string) => {
  try {
    const res = await makeRequest.get("/user/singleUser?userId=" + userId);
    const usernameDiv = document.querySelector(
      "#username"
    ) as HTMLHeadingElement;
    usernameDiv.innerText = res.data.username;
    const userBioDiv = document.querySelector(
      "#user-bio"
    ) as HTMLParagraphElement;
    userBioDiv.innerText = res.data.bio || "";
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getUserDetails(userId);

const getFollowers = async (userId: string) => {
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

const followBtn = document.querySelector("#follow-btn") as HTMLButtonElement;
const editProfileBtn = document.querySelector(
  "#edit-profile-btn"
) as HTMLButtonElement;
if (userId == userData.id) {
  toggleClass(followBtn, { add: "hidden" });
} else {
  toggleClass(editProfileBtn, { add: "hidden" });
}

const handleUserFollow = async (userId: string) => {
  try {
    followBtn.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      const followRes = await makeRequest.post(
        "/relationship?followingId=" + userId
      );
      toggleFollowingStatus(followBtn);
      showToast("success", followRes.data);
    });
    isUserFollowed(userId);
  } catch (error) {
    console.log(error);
  }
};

const isUserFollowed = async (authorId: string) => {
  try {
    const relationshipExists = await makeRequest.get(
      "/relationship/check?authorId=" + authorId
    );
    if (relationshipExists.data) {
      followBtn.innerText = "Following";
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

handleUserFollow(userId);

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
    console.log(error);
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
});
