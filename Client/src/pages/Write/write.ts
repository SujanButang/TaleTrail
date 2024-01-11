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
  console.log(document.querySelector("main"));
});

const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (e: Event) => e.preventDefault());
// Initial setup
observeDocumentChanges();
setupTextareas();
