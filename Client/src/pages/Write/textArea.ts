import { addOptions } from "./addOptions";

/**
 * Handles keyboard events for textareas, focusing on the addition of new textareas on "Enter".
 * Also defers auto-expanding to the next tick for updated height.
 * @param event - The keyboard event.
 */
export const handleTextareaInput = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;

  if (event.key === "Enter" && textarea.value.trim() !== "") {
    event.preventDefault();
    addNewTextarea(textarea);
  }
  if (event.key === "Backspace" && textarea.value.trim() == "") {
    event.preventDefault();
    if (textarea.parentElement) {
      removeAndFocusNextTextarea(textarea.parentElement);
    }
  }

  // Defer autoExpand until the next tick to ensure the height has updated
  setTimeout(() => {
    autoExpand(textarea);
  });
};

/**
 * Adds a new textarea element below the current textarea and focuses on it.
 * @param currentTextarea - The textarea element that triggers the addition of a new textarea.
 */
export const addNewTextarea = (currentTextarea: HTMLElement) => {
  const newDiv: HTMLElement = document.createElement("div") as HTMLElement;
  newDiv.classList.add("w-full");

  const newTextarea = document.createElement("textarea");
  newTextarea.placeholder = "Type here...";
  newTextarea.classList.add(
    "w-full",
    "text-lg",
    "focus:outline-none",
    "resize-none",
    "overflow-y-hidden"
  );

  newDiv.appendChild(newTextarea);

  // Get the parent node of the current textarea
  const parentOfCurrentTextarea = currentTextarea.parentNode as HTMLElement;

  // Check if parent node exists, then insert the new div after it using insertAdjacentElement
  if (parentOfCurrentTextarea) {
    parentOfCurrentTextarea.insertAdjacentElement("afterend", newDiv);
  }

  //order the textareas' parent divs
  orderTextAreas();

  newTextarea.addEventListener("focusin", (e: Event) => {
    e.preventDefault();
    const addOptionBtn = document.querySelector("#options-btn") as HTMLElement;
    if (!addOptionBtn) {
      addOptions(newTextarea.parentNode as HTMLElement);
    }
  });

  newTextarea.addEventListener("input", (e: Event) => {
    e.preventDefault();
    if (newTextarea.value == "") {
      const addOptionBtn = document.querySelector(
        "#options-btn"
      ) as HTMLElement;
      if (!addOptionBtn) {
        addOptions(newTextarea.parentNode as HTMLElement);
      }
    } else {
      document.querySelector("#options-btn")?.remove();
    }
  });

  // Set focus on the new textarea
  newTextarea.focus();
};

const removeAndFocusNextTextarea = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }

  const prevSibling = element.previousSibling as HTMLElement;
  console.log(prevSibling);

  if (prevSibling && prevSibling.firstChild instanceof HTMLTextAreaElement) {
    element.remove();
    prevSibling.firstChild.focus();
  } else {
    removeAndFocusNextTextarea(prevSibling as HTMLElement);
  }
};

/**
 * Sets up the provided textarea with necessary event listeners for focus and keyboard input.
 * @param textarea - The textarea element to be set up.
 */
const setupTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.addEventListener("focus", (e: Event) => {
    e.preventDefault();
    if (textarea.value == "") {
      addOptions(textarea.parentNode as HTMLElement);
    }
  });

  textarea.addEventListener("input", (e: Event) => {
    e.preventDefault();
    if (textarea.value == "") {
      addOptions(textarea.parentNode as HTMLElement);
    }
  });

  textarea.addEventListener("keydown", (event: KeyboardEvent) => {
    if (textarea.value !== "") {
      document.querySelector("#options-btn")?.remove();
    }
    if (event.key === "Enter" && textarea.value !== "") {
      event.preventDefault();
      addNewTextarea(textarea);
    }

    // Defer autoExpand until the next tick to ensure the height has updated
    setTimeout(() => {
      autoExpand(textarea);
    });
  });
};

/**
 * Sets up event listeners for all existing textareas on page load.
 * This ensures that each textarea has the necessary behavior.
 */
export const setupTextareas = () => {
  const textareas = Array.from(document.querySelectorAll("textarea"));
  textareas.shift();
  textareas.forEach((textarea) => {
    setupTextarea(textarea);
  });
};

/**
 * Updates the "id" attribute of each textarea's parent element to maintain a consistent order.
 * The updated "id" is based on the index of the textarea in the document order.
 * Also, reorders the 'data' array to match the order of textareas.
 */
const orderTextAreas = () => {
  const textAreas: HTMLTextAreaElement[] = Array.from(
    document.querySelectorAll("textarea")
  );

  textAreas.forEach((textArea, index) => {
    const parentElement = textArea.parentElement;
    if (parentElement) {
      parentElement.setAttribute("id", `text-area-div-${index}`);
    }
  });
};

/**
 * Automatically adjusts the height of a textarea to fit its content.
 * @param textarea - The textarea element to be auto-expanded.
 */
const autoExpand = (textarea: HTMLElement) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};
