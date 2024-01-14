import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { getFollowers } from "../../utils/followers";
import { showToast, toggleFollowingStatus } from "../../utils/utils";

const authorNames: HTMLSpanElement[] = Array.from(
  document.querySelectorAll("#author-name")
);
const authorBio: HTMLParagraphElement = document.querySelector(
  "#author-bio"
) as HTMLParagraphElement;

export const getUserDetails = async (userId: string) => {
  try {
    const userDataRes = await makeRequest.get(
      "/user/singleUser?userId=" + userId
    );
    authorNames.forEach((authorName) => {
      authorName.innerText = userDataRes.data.username;
    });
    authorBio.innerText = userDataRes.data.bio;
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

const followBtns: HTMLButtonElement[] = Array.from(
  document.querySelectorAll("#follow-btn")
);

export const handleUserFollow = async (userId: string) => {
  try {
    followBtns.forEach((followBtn: HTMLButtonElement) => {
      followBtn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        const followRes = await makeRequest.post(
          "/relationship?followingId=" + userId
        );
        followBtns.forEach((btn) => toggleFollowingStatus(btn));
        showToast("success", followRes.data);
      });
    });
    isAuthorFollowed(userId);
  } catch (error) {
    console.log(error);
  }
};

export const isAuthorFollowed = async (authorId: string) => {
  try {
    getFollowerCount(authorId);
    const relationshipExists = await makeRequest.get(
      "/relationship/check?authorId=" + authorId
    );
    if (relationshipExists.data) {
      followBtns.forEach((btn) => {
        btn.innerText = "Following";
      });
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

const followerCount = document.querySelector(
  "#follower-count"
) as HTMLSpanElement;
export const getFollowerCount = async (userId: string) => {
  const followers = await getFollowers(userId);
  followerCount.innerText = followers.length;
};
