import { addNewTextarea } from "./textArea";

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
