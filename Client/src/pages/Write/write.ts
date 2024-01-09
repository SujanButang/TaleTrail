import { toggleClass } from "../../utils/utils";

interface OptionsConfig {
  id: string;
  iconSrc: string;
  altText: string;
  showClass: string;
  hideClass: string;
}

/**
 * Creates an option button based on the provided configuration and appends it to the given parent element.
 * @param config - Configuration for the option button.
 * @param parent - The parent HTML element to which the option button is appended.
 * @returns The created option button element.
 */
const createOptionButton = (
  config: OptionsConfig,
  parent: HTMLElement
): HTMLElement => {
  const button = document.createElement("div");
  button.classList.add(
    "h-10",
    "w-10",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "border",
    "cursor-pointer",
    "border-[#1a8917]",
    config.hideClass
  );
  if (config.id == "add-btn") {
    button.classList.add("duration-300");
  }
  button.setAttribute("id", config.id);

  const icon = document.createElement("img");
  icon.src = config.iconSrc;
  icon.alt = config.altText;
  icon.classList.add("h-full", "w-full", "object-cover");

  const figure = document.createElement("figure");
  figure.classList.add("h-5", "w-5", "p-0", "m-0");
  figure.appendChild(icon);

  button.appendChild(figure);
  parent.appendChild(button);

  return button;
};

/**
 * Handles mouseover and mouseleave events on the options container, showing or hiding options based on configuration.
 * @param optionsDiv - The container element for options.
 * @param options - An array of option configurations.
 * @param parent - The parent HTML element associated with the options.
 */
const handleMouseEvents = (
  optionsDiv: HTMLElement,
  options: OptionsConfig[],
  parent: HTMLElement
) => {
  optionsDiv.addEventListener("mouseover", (e: Event) => {
    e.preventDefault();
    toggleClass(parent.querySelector("textarea") as HTMLElement, {
      add: "invisible",
    });

    options.forEach((option) => {
      toggleClass(parent.querySelector(`#${option.id}`) as HTMLElement, {
        add: option.showClass,
        remove: option.hideClass,
      });
    });
  });

  optionsDiv.addEventListener("mouseleave", (e: Event) => {
    e.preventDefault();
    toggleClass(parent.querySelector("textarea") as HTMLElement, {
      remove: "invisible",
    });

    options.forEach((option) => {
      toggleClass(parent.querySelector(`#${option.id}`) as HTMLElement, {
        add: option.hideClass,
        remove: option.showClass,
      });
    });
  });
};

/**
 * Adds options (buttons) to the provided parent element based on the configuration.
 * @param parent - The parent HTML element to which options are added.
 */
const addOptions = (parent: HTMLElement) => {
  parent.classList.add("relative");

  const optionsDiv: HTMLElement = document.createElement("div") as HTMLElement;
  optionsDiv.classList.add(
    "absolute",
    "flex",
    "gap-5",
    "items-center",
    "justify-center",
    "left-[-60px]",
    "top-0",
    "group"
  );
  optionsDiv.setAttribute("id", "options-btn");

  const options: OptionsConfig[] = [
    {
      id: "add-btn",
      iconSrc: "../../../add.png",
      altText: "Add",
      showClass: "group-hover:rotate-45",
      hideClass: "add",
    },
    {
      id: "img-btn",
      iconSrc: "../../../image.png",
      altText: "Image",
      showClass: "flex",
      hideClass: "hidden",
    },
    {
      id: "code-btn",
      iconSrc: "../../../code.png",
      altText: "Code",
      showClass: "flex",
      hideClass: "hidden",
    },
    {
      id: "embed-btn",
      iconSrc: "../../../embed.png",
      altText: "Embed",
      showClass: "flex",
      hideClass: "hidden",
    },
    {
      id: "heading-btn",
      iconSrc: "../../../heading.png",
      altText: "Heading",
      showClass: "flex",
      hideClass: "hidden",
    },
  ];

  options.forEach((option) => {
    createOptionButton(option, optionsDiv);
  });

  handleMouseEvents(optionsDiv, options, parent);

  parent.appendChild(optionsDiv);
};

/**
 * Automatically adjusts the height of a textarea to fit its content.
 * @param textarea - The textarea element to be auto-expanded.
 */
const autoExpand = (textarea: HTMLElement) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};
/**
 * Adds a new textarea element below the current textarea and focuses on it.
 * @param currentTextarea - The textarea element that triggers the addition of a new textarea.
 */
const addNewTextarea = (currentTextarea: HTMLElement) => {
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

  // Set focus on the new textarea
  newTextarea.focus();
};

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

/**
 * Handles keyboard events for textareas, focusing on the addition of new textareas on "Enter".
 * Also defers auto-expanding to the next tick for updated height.
 * @param event - The keyboard event.
 */
const handleTextareaInput = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;

  if (event.key === "Enter" && textarea.value.trim() !== "") {
    event.preventDefault();
    addNewTextarea(textarea);
  }

  // Defer autoExpand until the next tick to ensure the height has updated
  setTimeout(() => {
    autoExpand(textarea);
  });
};

/**
 * Sets up the provided textarea with necessary event listeners for focus and keyboard input.
 * @param textarea - The textarea element to be set up.
 */
const setupTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.addEventListener("focusin", (e: Event) => {
    e.preventDefault();
    addOptions(textarea.parentNode as HTMLElement);
  });

  textarea.addEventListener("keydown", (event: KeyboardEvent) => {
    document.querySelector("#options-btn")?.remove();
    if (event.key === "Enter" && textarea.value.trim() !== "") {
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
const setupTextareas = () => {
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    setupTextarea(textarea);
  });
};

/**
 * Updates the "id" attribute of each textarea's parent element to maintain a consistent order.
 * The updated "id" is based on the index of the textarea in the document order.
 */
const orderTextAreas = () => {
  const textAreas: HTMLTextAreaElement[] = Array.from(
    document.querySelectorAll("textarea")
  );

  textAreas.forEach((textArea, index) => {
    textArea.parentElement?.setAttribute("id", `text-area-div-${index}`);
  });
};

// Initial setup
observeDocumentChanges();
setupTextareas();
