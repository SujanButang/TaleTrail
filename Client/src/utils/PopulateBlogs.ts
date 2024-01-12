import { IBlog } from "../interface/blog";
import moment from "moment";

export const populateBlogs = (
  containerElement: HTMLElement,
  blogs: Array<IBlog>
) => {
  blogs.forEach((blog: IBlog) => {
    console.log("here");
    const blogDiv = document.createElement("div") as HTMLElement;
    blogDiv.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "border-b",
      "py-10",
      "cursor-pointer"
    );

    //author
    const authorInfo = document.createElement("div") as HTMLDivElement;
    authorInfo.className = "flex items-center gap-3";
    authorInfo.innerHTML = `<figure class="w-8 h-8 rounded-full object-cover overflow-hidden">
    <img
      src="${
        blog.author.profileImage ? blog.author.profileImage : "no-profile.jpg"
      }"
      alt=""
      class="h-full w-full"
    />
  </figure>
  <span class="font-semibold"> ${blog.author.username} </span>
  <span class="font-light text-sm"> ${moment(blog.created_at).format(
    "MMMM DD, YYYY"
  )} </span>`;
    blogDiv.appendChild(authorInfo);

    //blog
    const blogContent = document.createElement("div");
    blogContent.className = "flex gap-5";
    blogContent.innerHTML = `
    <div class="sm:w-[80%] w-full flex flex-col justify-between gap-3">
      <h1 class="md:text-2xl text-lg font-extrabold">${blog.title}</h1>
      <p class="text-justify font-medium md:flex hidden leading-[1.5em] h-[4.5em] overflow-hidden">${
        blog.description
      }</p>
      <div class="flex items-center justify-between">
        <div class="flex gap-5">
          <button class="flex px-2 py-1 rounded-2xl bg-gray-200 text-sm font-semibold">Website</button>
          <span class="font-light text-[#6b6b6b] sm:flex hidden">${"Selected for you"}</span>
        </div>
        <div class="flex gap-5 px-10">
          <button class="h-5 w-5">
            <img src="bookmark.png" alt="" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
    <figure class="sm:w-[20%] flex items-center justify-center object-cover">
      <img src="${
        blog.cover_image
      }" alt="" class="h-full w-full object-cover" />
    </figure>
  `;
    blogDiv.appendChild(blogContent);

    containerElement.appendChild(blogDiv);
  });
};
