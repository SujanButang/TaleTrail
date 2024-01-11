import { toggleClass } from "../../utils/utils";
import { addNewTextarea } from "./textArea";

export const handleAddEmbed = (parentElement: HTMLElement) => {
  parentElement.innerHTML = "";
  const embedInput: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  embedInput.classList.add("focus:outline-none", "w-full");
  embedInput.placeholder = "Enter your link here ...";
  parentElement.appendChild(embedInput);
  embedInput.focus();

  embedInput.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      toggleClass(embedInput, { add: "hidden" });
      const anchorElement = document.createElement("a") as HTMLElement;
      anchorElement.innerHTML = embedInput.value;
      anchorElement.classList.add("text-blue-500");
      parentElement.append(anchorElement);

      anchorElement.addEventListener("click", () => {
        toggleClass(anchorElement, { add: "hidden" });
        toggleClass(embedInput, { remove: "hidden" });
        embedInput.focus();
      });
      addNewTextarea(embedInput);
    }
  });
};
