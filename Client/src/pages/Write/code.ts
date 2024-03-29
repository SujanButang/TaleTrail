import hljs from "highlight.js";
import { toggleClass } from "../../utils/utils";
import { addNewTextarea } from "./textArea";


/**
 * Handles adding a code block functionality to a given parent element.
 * It includes a dropdown for selecting the programming language, a code area for entering code,
 * and a pre/code element for displaying the formatted and highlighted code.
 * The code area is initially visible, and the pre/code element is hidden.
 * 
 * @param {HTMLElement} parentElement - The parent element to which the code block functionality will be added.
 * @returns {void} - This function does not return any value.
 */
export const handleAddCode = (parentElement: HTMLElement) => {
  parentElement.classList.add("relative");

  // Create and add the dropdown
  const dropdown: HTMLSelectElement = document.createElement("select");
  dropdown.classList.add("absolute", "right-[0px]", "top-0");
  const options: string[] = [
    "javascript",
    "python",
    "java",
    "c",
    "typescript",
    "c++",
  ];
  addDropdownOptions(dropdown, options);
  parentElement.appendChild(dropdown);

  // Create and configure the code area
  const codeArea: HTMLTextAreaElement = parentElement.querySelector(
    "textarea"
  ) as HTMLTextAreaElement;
  codeArea.placeholder = "Enter your code here ...";
  codeArea.id = "code";

  // Add event listener for focusout
  codeArea.addEventListener("focusout", () => {
    const code = codeArea.value;
    const language = dropdown.value.toLowerCase();

    // Create pre and code elements
    const pre: HTMLPreElement = document.createElement("pre");
    const codeElement: HTMLElement = document.createElement("code");

    // Set the language for syntax highlighting
    codeElement.classList.add(`language-${language}`);
    codeElement.textContent = code;
    pre.appendChild(codeElement);

    // Use Highlight.js to highlight the code
    hljs.highlightElement(codeElement);

    // Append the pre element to the parent
    parentElement.appendChild(pre);
    toggleClass(codeArea, { add: "hidden" });
    toggleClass(dropdown, { add: "hidden" });

    pre.addEventListener("click", (e: Event) => {
      e.preventDefault();
      toggleClass(pre, { add: "hidden" });
      toggleClass(codeArea, { remove: "hidden" });
      codeArea.focus();
    });
    addNewTextarea(codeArea);
  });
};

// Function to add options to the dropdown
const addDropdownOptions = (dropdown: HTMLSelectElement, options: string[]) => {
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    dropdown.appendChild(optionElement);
  });
};
