import { toggleClass } from "../../utils/utils";
import { addNewTextarea } from "./textArea";

/**
 * Handles adding an embed link functionality to a given parent element.
 * It includes an input for entering the link, and when the user presses Enter,
 * it replaces the input with an anchor element containing the entered link.
 * The anchor element is initially visible, and the input is hidden.
 *
 * @param {HTMLElement} parentElement - The parent element to which the embed link functionality will be added.
 * @returns {void} - This function does not return any value.
 */
export const handleAddEmbed = (parentElement: HTMLElement) => {
  parentElement.innerHTML = "";
  const embedInput: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  embedInput.classList.add("focus:outline-none", "w-full");
  embedInput.placeholder = "Enter your link here ...";
  embedInput.id = "embed";
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
