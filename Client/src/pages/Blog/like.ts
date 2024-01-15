import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast, toggleIcon, userLoggedIn } from "../../utils/utils";

/**
 * Handles the like functionality for a blog, including updating the like count and toggling the like icon.
 *
 * @param {string} blogId - The unique identifier of the blog.
 * @param {string} likeElementId - The ID of the HTML element representing the like button/icon.
 * @param {string} likeCountSpanId - The ID of the HTML element displaying the like count.
 * @returns {Promise<void>} - A Promise that resolves after handling the like functionality.
 */
export const handleLike = async (
  blogId: string,
  likeElementId: string,
  likeCountSpanId: string
): Promise<void> => {
  handleLikeCount(blogId, likeCountSpanId);

  const hasLiked = await handleHasLiked(blogId);
  const likeImages: Array<HTMLImageElement> = Array.from(
    document.querySelectorAll(`#${likeElementId}`)
  );
  likeImages.forEach((likeImage) => {
    if (hasLiked) likeImage.src = `${window.location.origin}/heartfilled.png`;

    likeImage.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      const user = await userLoggedIn();
      if (user) {
        try {
          const res = await makeRequest.post(`/like?blogId=${blogId}`);
          if (res.status == 200) {
            likeImages.forEach((likeImg) => {
              toggleIcon(
                likeImg as HTMLImageElement,
                "heart.png",
                "heartfilled.png"
              );
            });
            handleLikeCount(blogId, likeCountSpanId);
            showToast("success", res.data);
          }
        } catch (error) {
          const errorMessage =
            typeof error === "object" && error !== null
              ? (error as IHTTPError)?.response?.data?.message
              : "";

          showToast("failed", errorMessage as string);
        }
      } else {
        showToast("failed", "Log in first to like! ☹️");
      }
    });
  });
};

/**
 * Handles fetching and updating the like count for a blog in the specified span elements.
 *
 * @param {string} blogId - The unique identifier of the blog.
 * @param {string} spanId - The ID of the HTML element displaying the like count.
 * @returns {Promise<void>} - A Promise that resolves after updating the like count in the specified span elements.
 */
export const handleLikeCount = async (blogId: string, spanId: string): Promise<void> => {
  const likeCountRes = await makeRequest.get(`/like?blogId=${blogId}`);
  const likeCount = likeCountRes.data;
  const likeSpans: Array<HTMLSpanElement> = Array.from(
    document.querySelectorAll(`#${spanId}`)
  );
  likeSpans.forEach((likeSpan) => (likeSpan.innerText = likeCount));
};

/**
 * Checks whether the logged-in user has already liked the specified blog.
 *
 * @param {string} blogId - The unique identifier of the blog.
 * @returns {Promise<boolean>} - A Promise that resolves with a boolean indicating whether the user has already liked the blog.
 */
export const handleHasLiked = async (blogId: string): Promise<boolean> => {
  try {
    const hasLikeRes = await makeRequest.get(`/like/hasLiked?blogId=${blogId}`);
    const hasLiked = hasLikeRes.data;
    return hasLiked;
  } catch (error) {
    return false;
  }
};
