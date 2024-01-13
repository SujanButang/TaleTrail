import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { handleHasLiked, handleLike, handleLikeCount } from "./like";

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

export const handleMoreBlog = async (userId: string) => {
  const moreBlogContainer = document.querySelector(
    "#more-blog-container"
  ) as HTMLElement;
  const moreBlogsRes = await makeRequest.get(
    `/blog/userBlogs?userId=${userId}`
  );
  const moreBlogs = moreBlogsRes.data as Array<IBlog>;
  console.log(moreBlogs);
  moreBlogs.forEach(async (blog) => {
    const blogContainer = document.createElement("div") as HTMLElement;
    blogContainer.className =
      "max-h-[400px] w-[335px] flex-col gap-3 flex cursor-pointer";
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
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button class="h-4 w-4 overflow-hidden object-cover">
          <img
            src=${
              (await handleHasLiked(blog.id))
                ? "../../../heartfilled.png"
                : "../../../heart.png"
            }
            alt=""
            class="h-[100%] w-[100%] object-cover"
            id="like-${blog.id}"
          />
        </button>
        <span class="text-[#6b6b6b] text-sm" id="count-${blog.id}"></span>
        <button class="h-5 w-5 overflow-hidden object-cover">
          <img
            src="../../../comment.png"
            alt=""
            class="h-[100%] w-[100%] object-cover"
          />
        </button>
      </div>
      <div class="flex items-center gap-3">
        <button class="h-5 w-5 overflow-hidden object-cover">
          <img
            src="../../../bookmark.png"
            alt=""
            class="h-[100%] w-[100%] object-cover"
          />
        </button>
      </div>
    </div>
  `;
    moreBlogContainer.appendChild(blogContainer);
    await handleLikeCount(blog.id, `count-${blog.id}`);
    const likeBtn = document.querySelector(
      `#like-${blog.id}`
    ) as HTMLImageElement;
    likeBtn.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      await handleLike(blog.id, `like-${blog.id}`, `count-${blog.id}`);
    });
  });
//   moreBlogContainer.addEventListener("click", async (e: Event) => {
//     const target = e.target as HTMLElement;
//     // Check if the clicked element is a like button
//     if (target.tagName === "IMG" && target.id.startsWith("like-")) {
//       const blogId = target.id.substring("like-".length);
//       await handleLike(blogId, target.id, `count-${blogId}`);
//     }
//   });
};
