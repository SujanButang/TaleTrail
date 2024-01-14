import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast, toggleIcon, userLoggedIn } from "../../utils/utils";

export const handleLike = async (
  blogId: string,
  likeElementId: string,
  likeCountSpanId: string
) => {
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

export const handleLikeCount = async (blogId: string, spanId: string) => {
  const likeCountRes = await makeRequest.get(`/like?blogId=${blogId}`);
  const likeCount = likeCountRes.data;
  const likeSpans: Array<HTMLSpanElement> = Array.from(
    document.querySelectorAll(`#${spanId}`)
  );
  likeSpans.forEach((likeSpan) => (likeSpan.innerText = likeCount));
};

export const handleHasLiked = async (blogId: string) => {
  try {
    const hasLikeRes = await makeRequest.get(`/like/hasLiked?blogId=${blogId}`);
    const hasLiked = hasLikeRes.data;
    return hasLiked;
  } catch (error) {
    return false;
  }
};
