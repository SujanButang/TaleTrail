import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast } from "../../utils/utils";
import { populateBlogContent } from "../../utils/PopulateBlogs";
import { handleBookmark } from "./bookmark";
import { handleLike } from "./like";
import { handleMoreBlog } from "./userblog";
import { getUserDetails, handleUserFollow } from "./authorDetails";
import { handleComment } from "./comment";

const profileBtn = document.querySelector("#profile-btn") as HTMLElement;
profileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  window.location.href =
    window.location.origin +
    "/src/pages/Profile/profile.html?userId=" +
    userData.id;
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

/**
 * Fetches the content of a specific blog using its unique identifier, updates the UI with the retrieved data,
 * and sets up various interactions like handling user details, follow button, and more blog content.
 *
 * @param {string} id - The unique identifier of the blog.
 * @returns {Promise<void>} - A Promise that resolves after updating the UI with the blog details.
 * @throws {IHTTPError} - An error object representing the HTTP error, if any, during the request.
 */
export const getBlogContents = async (id: string) => {
  try {
    const res = await makeRequest.get("/blog/single?blogId=" + id);
    userId = res.data.author_id;
    blogTitleElement.innerText = res.data.title;
    coverImageElement.src = res.data.cover_image;
    descriptionElement.innerText = res.data.description;
    if (res.data.author.profile_image) {
      userImageElement.src = res.data.author.profile_image;
    }
    authorNameElement.innerText = res.data.author.username;
    authorNameElement.classList.add("cursor-pointer", "hover:underline");
    authorNameElement.addEventListener(
      "click",
      () =>
        (window.location.href =
          window.location.origin +
          "/src/pages/Profile/profile.html?userId=" +
          res.data.author_id)
    );

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
