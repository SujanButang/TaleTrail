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

/**
 * Fetches user details for a specified user ID and updates the displayed author names and bio on the web page.
 *
 * @param {string} userId - The unique identifier for the user whose details need to be retrieved.
 * @returns {Promise<void>} - A Promise that resolves after updating the UI with the fetched user details.
 * @throws {IHTTPError} - An error object representing the HTTP error, if any, during the request.
 */
export const getUserDetails = async (userId: string): Promise<void> => {
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

const userData = JSON.parse(localStorage.getItem("user") as string);

/**
 * Handles the user follow functionality, including adding an event listener to follow buttons,
 * sending a follow request to the server, updating UI on successful follow, and checking if the author is already followed.
 *
 * @param {string} userId - The unique identifier for the user to follow.
 * @returns {Promise<void>} - A Promise that resolves after updating the UI based on follow actions.
 * @throws {IHTTPError} - An error object representing the HTTP error, if any, during the request.
 */
export const handleUserFollow = async (userId: string): Promise<void> => {
  try {
    followBtns.forEach((followBtn: HTMLButtonElement) => {
      if (userId == userData.id) {
        followBtn.classList.add("hidden");
      }
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

/**
 * Checks if the specified author is followed and updates the UI accordingly.
 *
 * @param {string} authorId - The unique identifier for the author whose follow status needs to be checked.
 * @returns {Promise<void>} - A Promise that resolves after updating the UI based on the follow status.
 * @throws {IHTTPError} - An error object representing the HTTP error, if any, during the request.
 */
export const isAuthorFollowed = async (authorId: string): Promise<void> => {
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
