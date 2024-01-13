import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast } from "../../utils/utils";
import { populateBlogContent } from "../../utils/PopulateBlogs";
import { handleBookmark } from "./bookmark";
import { handleLike } from "./like";
import { handleMoreBlog } from "./userblog";

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
