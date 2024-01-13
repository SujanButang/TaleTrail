import {
  CodeContent,
  EmbedContent,
  HeadingContent,
  IBlog,
  ImageContent,
  ParagraphContent,
} from "../interface/blog";
import moment from "moment";
import hljs from "highlight.js";
import { makeRequest } from "../axios/axios";
import { showToast, toggleIcon } from "./utils";
import { IHTTPError } from "../interface/httpError";

export const populateBlogs = async (
  containerElement: HTMLElement,
  blogs: Array<IBlog>
) => {
  const readingList = (await blogInReadingList()) as {
    id: string;
    blogId: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
  }[];
  const blogsInReadingList = readingList.map((blog) => blog.blogId);
  blogs.forEach((blog: IBlog) => {
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
          <button class="flex px-2 py-1 rounded-2xl bg-gray-200 text-sm font-semibold">${
            blog.topics.topic
          }</button>
          <span class="font-light text-[#6b6b6b] sm:flex hidden">Selected for you</span>
        </div>
        <div class="flex gap-5 px-10">
          <button class="h-5 w-5">
            <img src=${
              blogsInReadingList.includes(blog.id)
                ? "bookmark-filled.png"
                : "bookmark.png"
            } alt="" class="w-full h-full object-cover" id="save-btn-${
      blog.id
    }"/>
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

    const anchor = document.createElement("a") as HTMLAnchorElement;
    anchor.href = `${window.location.origin}/src/pages/Blog/blog.html?blogId=${blog.id}`;
    anchor.appendChild(blogDiv);

    containerElement.appendChild(anchor);

    const saveBtn = document.querySelector(
      `#save-btn-${blog.id}`
    ) as HTMLElement;
    saveBtn.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      try {
        const res = await makeRequest.post(`/readingList?blogId=${blog.id}`);
        if (res.status == 200) {
          toggleIcon(
            saveBtn as HTMLImageElement,
            "bookmark.png",
            "bookmark-filled.png"
          );
          showToast("success", res.data);
        }
      } catch (error) {
        showToast("failed", "Sign in to save. ☹️");
      }
    });
  });
};

export const populateBlogContent = (
  containerElement: HTMLElement,
  contents: Array<
    | ParagraphContent
    | HeadingContent
    | CodeContent
    | ImageContent
    | EmbedContent
  >
) => {
  contents.forEach((content) => {
    const paragraphElement = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    paragraphElement.className = "text-xl text-justify";

    const figureElement = document.createElement("figure") as HTMLElement;
    figureElement.className = "h-[500px] w-full object-cover";

    const imageElement = document.createElement("img") as HTMLImageElement;
    imageElement.className = "h-[100%] w-[100%] object-cover";

    figureElement.appendChild(imageElement);

    const headingElement = document.createElement("h3") as HTMLHeadingElement;
    headingElement.className = "text-2xl font-bold";

    const anchorElement = document.createElement("a") as HTMLAnchorElement;
    anchorElement.className = "text-[blue] underline";

    const pre: HTMLPreElement = document.createElement("pre");
    const codeElement: HTMLElement = document.createElement("code");

    switch (content.type) {
      case "paragraph":
        paragraphElement.innerText = content.text;
        containerElement.appendChild(paragraphElement);
        break;
      case "image":
        imageElement.src = content.url;
        containerElement.appendChild(figureElement);
        break;
      case "heading":
        headingElement.innerText = content.text;
        containerElement.appendChild(headingElement);
        break;
      case "embed":
        anchorElement.href = content.url;
        anchorElement.innerText = content.url;
        containerElement.appendChild(anchorElement);
        break;
      case "code":
        codeElement.classList.add(`language-${content.language}`);
        codeElement.textContent = content.code;
        pre.appendChild(codeElement);
        containerElement.appendChild(pre);
        hljs.highlightElement(codeElement);
        break;
      default:
        break;
    }
  });
};


