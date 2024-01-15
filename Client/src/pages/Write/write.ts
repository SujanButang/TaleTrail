import { makeRequest } from "../../axios/axios";
import {
  CodeContent,
  EmbedContent,
  HeadingContent,
  IBlogSubmit,
  ImageContent,
  ParagraphContent,
} from "../../interface/blog";
import { IHTTPError } from "../../interface/httpError";
import {
  cookieValid,
  getCookie,
  showToast,
  toggleModal,
} from "../../utils/utils";
import { handleImageUpload } from "./imageUpload";
import { handleTextareaInput, setupTextareas } from "./textArea";

const cookie = getCookie("accessToken");
const validCookie = cookieValid().then(() => {
  if (!validCookie || !cookie) {
    window.location.href = window.location.origin;
  }
});

//nav
const logo = document.querySelector("#logo") as HTMLElement;
logo.addEventListener(
  "click",
  () => (window.location.href = window.location.origin)
);

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
publishBtn.addEventListener("click", async (): Promise<void> => {
  const titleElement = document.querySelector(
    "#title-input"
  ) as HTMLInputElement;
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

  const data: IBlogSubmit = {
    title: titleElement.value,
    description: descriptionElement.value,
    cover_image: coverImage.src,
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
      return;
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
      return;
    }

    //embed input
    const embedElement = input.querySelector("#embed") as HTMLInputElement;
    if (embedElement) {
      const embed: EmbedContent = {
        type: "embed",
        url: embedElement.value as string,
      };
      data.content.push(embed);
      return;
    }

    //heading input
    const headingElement = input.querySelector("#heading") as HTMLInputElement;
    if (headingElement) {
      const heading: HeadingContent = {
        type: "heading",
        text: headingElement.value as string,
      };
      data.content.push(heading);
      return;
    }

    const textAreaElement = input.querySelector(
      "textarea"
    ) as HTMLTextAreaElement;

    if (textAreaElement) {
      const paragraph: ParagraphContent = {
        type: "paragraph",
        text: textAreaElement.value,
      };
      data.content.push(paragraph);
      return;
    }
  });

  //paragraph

  try {
    const res = await makeRequest.post("/blog", { blog: data });
    if (res.status == 200) {
      showToast("success", res.data);
    }
    setTimeout(() => {
      window.location.href = `${window.location.origin}`;
    }, 2000);
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
});

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (e: Event) => e.preventDefault());
// Initial setup
observeDocumentChanges();
setupTextareas();

const optionButton = document.getElementById("option") as HTMLElement;
const optionDiv = document.querySelector("#option-div") as HTMLElement;

optionButton.addEventListener("click", (e: Event) => {
  e.preventDefault();

  toggleModal(optionDiv);
});

const addTopicModal = document.querySelector("#topic-div") as HTMLElement;
const addTopicBtn = document.querySelector("#add-topic") as HTMLButtonElement;
addTopicBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(addTopicModal);
});

const cancelBtn = document.querySelector("#cancel-btn") as HTMLButtonElement;
cancelBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(addTopicModal);
});
