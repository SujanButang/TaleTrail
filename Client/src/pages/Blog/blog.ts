import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import {
  cookieValid,
  getCookie,
  logout,
  showToast,
  toggleClass,
  toggleModal,
} from "../../utils/utils";
import { populateBlogContent } from "../../utils/PopulateBlogs";
import { handleBookmark } from "./bookmark";
import { handleLike } from "./like";
import { handleMoreBlog } from "./userblog";
import { getUserDetails, handleUserFollow } from "./authorDetails";
import { handleComment } from "./comment";

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

const profileBtn = document.querySelector("#profile-btn") as HTMLElement;
profileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  window.location.href =
    window.location.origin +
    "/src/pages/Profile/profile.html?userId=" +
    userData.id;
});

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

const userImage = document.querySelector("#user-image") as HTMLImageElement;
const userEmail = document.querySelector("#user-email") as HTMLSpanElement;
const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  userEmail.innerText = userData.email || "";
  if (userData.profileImage) {
    userImage.src = userData.profileImage;
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

const blogId = window.location.href.split("=")[1] as string;
const blogTitleElement = document.querySelector(
  "#blog-title"
) as HTMLHeadingElement;
const descriptionElement = document.querySelector(
  "#description"
) as HTMLElement;
const coverImageElement = document.querySelector(
  "#cover-image"
) as HTMLImageElement;
const userImageElement = document.querySelector(
  "#author-image"
) as HTMLImageElement;

const authorNameElement = document.querySelector(
  "#author-name"
) as HTMLSpanElement;
const publishedDateElement = document.querySelector(
  "#published-date"
) as HTMLSpanElement;
const blogContentElement = document.querySelector(
  "#blog-content"
) as HTMLElement;

let userId;

export const getBlogContents = async (id: string) => {
  try {
    const res = await makeRequest.get("/blog/single?blogId=" + id);
    console.log(res.data);
    userId = res.data.author_id;
    blogTitleElement.innerText = res.data.title;
    coverImageElement.src = res.data.cover_image;
    descriptionElement.innerText = res.data.description;
    if (res.data.author.profile_image) {
      userImageElement.src = res.data.author.profile_image;
    }
    authorNameElement.innerText = res.data.author.username;
    publishedDateElement.innerText = moment(res.data.created_at).format(
      "MMMM DD, YYYY"
    );
    const blogContent = res.data.content;
    populateBlogContent(blogContentElement, blogContent);
    handleMoreBlog(userId);
    getUserDetails(userId);
    handleUserFollow(userId);
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

getBlogContents(blogId);

handleBookmark(blogId);
handleLike(blogId, "like-btn", "like-count");
handleComment(blogId);

const commentInput = document.querySelector("textarea") as HTMLTextAreaElement;
const commentSubmitBtn = document.querySelector(
  "#comment-submit"
) as HTMLButtonElement;
commentSubmitBtn.addEventListener("click", async (e: Event) => {
  e.preventDefault();
  try {
    const comment = commentInput.value;
    if (comment.trim() !== "") {
      const res = await makeRequest.post("/comment?blogId=" + blogId, {
        comment: comment,
      });
      showToast("success", res.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
});
