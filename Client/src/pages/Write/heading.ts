import { addNewTextarea } from "./textArea";

/**
 * Handles adding a heading functionality to a given parent element.
 * It includes an input for entering the heading, and when the user presses Enter
 * (and the entered heading is not empty), it replaces the input with a heading element.
 * The heading element is initially visible, and the input is hidden.
 * 
 * @param {HTMLElement} parentElement - The parent element to which the heading functionality will be added.
 * @returns {void} - This function does not return any value.
 */
export const handleAddHeading = (parentElement: HTMLElement) => {
  parentElement.innerHTML = "";
  const headingInput: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  headingInput.classList.add(
    "focus:outline-none",
    "w-full",
    "text-2xl",
    "font-bold"
  );
  headingInput.placeholder = "Enter your heading here ...";
  headingInput.id = "heading";
  parentElement.appendChild(headingInput);
  headingInput.focus();

  headingInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" && headingInput.value.trim() !== "") {
      addNewTextarea(headingInput);
    }
  });
};
