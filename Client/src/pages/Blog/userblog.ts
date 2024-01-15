import moment from "moment";
import { makeRequest } from "../../axios/axios";

interface IBlog {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  create_at: string;
  author: {
    username: string;
    profile_image: string;
  };
  likes: Array<{
    id: string;
    blog_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }>;
}

/**
 * Handles fetching and displaying additional blogs by the specified user in the more blog container.
 *
 * @param {string} userId - The unique identifier of the user whose blogs are to be displayed.
 * @returns {Promise<void>} - A Promise that resolves after fetching and displaying additional blogs in the more blog container.
 */
export const handleMoreBlog = async (userId: string): Promise<void> => {
  const moreBlogContainer = document.querySelector(
    "#more-blog-container"
  ) as HTMLElement;
  const moreBlogsRes = await makeRequest.get(
    `/blog/userBlogs?userId=${userId}`
  );
  const moreBlogs = moreBlogsRes.data as Array<IBlog>;
  moreBlogs.forEach(async (blog) => {
    const blogContainer = document.createElement("div") as HTMLElement;
    blogContainer.className =
      "max-h-[400px] w-[400px] flex-col gap-5 flex cursor-pointer";
    blogContainer.innerHTML = `
    <figure class="h-[40%]">
      <img
        src=${blog.cover_image}
        alt=""
        class="h-full w-full object-cover"
      />
    </figure>
    <figure class="flex items-center gap-5">
      <img
        src=${
          blog.author.profile_image
            ? blog.author.profile_image
            : "../../../no-profile.jpg"
        }
        alt=""
        class="h-5 w-5 object-cover rounded-full"
        id="author-image"
      />
      <span class="font-thin text-sm">${blog.author.username}</span>
    </figure>
    <h1 class="text-xl font-bold">
${blog.title}    </h1>
    <p class="leading-[1.5em] h-[3em] overflow-hidden">
      ${blog.description}
    </p>
    <span class="text-sm font-light"> ${moment(blog.create_at).format(
      "MMMM DD, YYYY"
    )} </span>
  `;
    moreBlogContainer.appendChild(blogContainer);
    blogContainer.addEventListener("click", () => {
      window.location.href =
        window.location.origin + "/src/pages/Blog/blog.html?blogId=" + blog.id;
    });
  });
};
