import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { blogInReadingList } from "../../utils/utils";
import { showToast, toggleIcon, userLoggedIn } from "../../utils/utils";

/**
 * Handles bookmark functionality for a specific blog. Checks if the blog is already in the user's reading list
 * and updates the bookmark button's appearance accordingly. Listens for bookmark button clicks and triggers
 * the appropriate actions such as adding or removing the blog from the reading list.
 *
 * @param {string} blogId - The unique identifier of the blog.
 * @returns {Promise<void>} - A Promise that resolves after handling the bookmark functionality.
 */
export const handleBookmark = async (blogId: string): Promise<void> => {
  const readingList = (await blogInReadingList()) as
    | {
        id: string;
        blogId: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
      }[]
    | [];
  const blogsInReadingList = readingList.map((blog) => blog.blogId);
  const bookmarkImages: Array<HTMLImageElement> = Array.from(
    document.querySelectorAll("#bookmark-btn")
  );
  bookmarkImages.forEach((bookmarkImage) => {
    if (blogsInReadingList.includes(blogId))
      bookmarkImage.src = `${window.location.origin}/bookmark-filled.png`;

    bookmarkImage.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      const user = await userLoggedIn();
      if (user) {
        try {
          const res = await makeRequest.post(`/readingList?blogId=${blogId}`);
          if (res.status == 200) {
            bookmarkImages.forEach((bookmarkImage) => {
              toggleIcon(
                bookmarkImage as HTMLImageElement,
                "bookmark.png",
                "bookmark-filled.png"
              );
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
      } else {
        showToast("failed", "Log in first to save! ☹️");
      }
    });
  });
};
