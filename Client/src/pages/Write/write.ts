import {
  CodeContent,
  EmbedContent,
  HeadingContent,
  IBlog,
  ImageContent,
} from "../../interface/blog";
import { showToast } from "../../utils/utils";
import { handleImageUpload } from "./imageUpload";
import { handleTextareaInput, setupTextareas } from "./textArea";

const imageUpload = document.querySelector("#image-upload") as HTMLInputElement;

imageUpload.addEventListener("click", (e: Event) => {
  e.preventDefault;
  handleImageUpload(imageUpload?.parentElement as HTMLElement);
});

/**
 * Observes changes in the document to dynamically attach event listeners to new textareas.
 * This ensures that each newly added textarea receives the necessary setup.
 */
const observeDocumentChanges = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const addedNodes = Array.from(mutation.addedNodes) as HTMLElement[];
        addedNodes.forEach((node) => {
          if (node.tagName === "DIV") {
            const textarea = node.firstChild as HTMLTextAreaElement;
            textarea.addEventListener("keydown", handleTextareaInput);
          }
        });
      }
    });
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
};

const publishBtn = document.querySelector("#publish") as HTMLButtonElement;
publishBtn.addEventListener("click", () => {
  const titleElement = document.querySelector("#title") as HTMLInputElement;
  if (titleElement.value == "") {
    showToast("fail", "Please give your blog a title. ☹️");
    return;
  }
  const descriptionElement = document.querySelector(
    "#description"
  ) as HTMLInputElement;
  if (descriptionElement.value == "") {
    showToast("fail", "Please give your blog some description. ☹️");
    return;
  }
  document.querySelector("#options-btn")?.remove();
  const coverFigure = document.querySelector("#cover-image") as HTMLElement;
  const coverInput = coverFigure.querySelector("input");
  if (!coverInput) {
    showToast("failed", "Cover image is required! ☹️");
    return;
  }
  const coverImage = coverFigure.querySelector("img") as HTMLImageElement;

  const data: IBlog = {
    title: titleElement.value,
    description: descriptionElement.value,
    coverImage: coverImage.src,
    topic: "some topic",
    content: [],
  };

  const inputs = Array.from(
    document.querySelectorAll(".input-div")
  ) as HTMLElement[];
  inputs.forEach((input: HTMLElement) => {
    //image input
    const imgElement = input.querySelector("img");
    if (imgElement) {
      const image: ImageContent = {
        type: "image",
        url: imgElement.src as string,
      };
      data.content.push(image);
    }

    //code input
    const codeElement = input.querySelector("#code") as HTMLTextAreaElement;
    if (codeElement) {
      const code: CodeContent = {
        type: "code",
        language: input.querySelector("select")?.value as string,
        code: codeElement.value,
      };
      data.content.push(code);
    }

    //embed input
    const embedElement = input.querySelector("#embed") as HTMLInputElement;
    if (embedElement) {
      const embed: EmbedContent = {
        type: "embed",
        url: embedElement.value as string,
      };
      data.content.push(embed);
    }

    //heading input
    const headingElement = input.querySelector("#heading") as HTMLInputElement;
    if (headingElement) {
      const heading: HeadingContent = {
        type: "heading",
        text: headingElement.value as string,
      };
      data.content.push(heading);
    }
  });

  //

  console.log(data);
});

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (e: Event) => e.preventDefault());
// Initial setup
observeDocumentChanges();
setupTextareas();
