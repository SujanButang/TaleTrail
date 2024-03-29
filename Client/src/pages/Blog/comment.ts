import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { cookieValid, showToast, toggleModal } from "../../utils/utils";
import { IComment } from "../../interface/comment";

const commentModal = document.querySelector("#comment-modal") as HTMLElement;
const commentBtns = Array.from(document.querySelectorAll("#comment-btn"));
const closeCommentBtn = document.querySelector(
  "#close-comment"
) as HTMLButtonElement;

const commentUser = document.querySelector("#comment-user") as HTMLSpanElement;

const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  commentUser.innerText = userData.username;
}
commentBtns.forEach((commentBtn) => {
  commentBtn.addEventListener("click", async(e: Event):Promise<void> => {
    e.preventDefault();
    if (userData && await cookieValid()) {
      toggleModal(commentModal);
    } else {
      showToast("failed", "Sign in to leave a comment. ☹️");
    }
  });
});
closeCommentBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(commentModal);
});

const commentCountSpan = document.querySelector(
  "#comment-count"
) as HTMLSpanElement;
const commentContainer = document.querySelector(
  "#comments-container"
) as HTMLElement;

/**
 * Handles fetching and displaying comments for a specific blog. Retrieves comments for the specified blogId,
 * updates the comment count, and dynamically creates HTML elements to display each comment.
 *
 * @param {string} blogId - The unique identifier of the blog.
 * @returns {Promise<void>} - A Promise that resolves after handling comment retrieval and display.
 */
export const handleComment = async (blogId: string) => {
  try {
    const commentRes = await makeRequest.get("/comment?blogId=" + blogId);
    const comments = commentRes.data;
    console.log(comments);
    commentCountSpan.innerText = comments.length;
    comments.forEach((comment: IComment) => {
      const commentElement = document.createElement("div") as HTMLElement;
      commentElement.className = "flex flex-col";
      commentElement.innerHTML = `<div class="flex items-center gap-3">
      <img src="../../../no-profile.jpg" alt="" class="h-10 w-10 rounded object-cover">
      <div class="flex flex-col">
        <span class="text-lg font-semibold">${comment.user.username}</span>
        <span class="text-sm font-light">${moment(
          comment.created_at
        ).fromNow()}</span>
      </div>
    </div>
    <p class="p-3">
          ${comment.comment}
    </p>`;
      commentContainer.appendChild(commentElement);
    });
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};
