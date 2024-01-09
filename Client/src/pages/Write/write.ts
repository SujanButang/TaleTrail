import { toggleClass } from "../../utils/utils";

interface OptionsConfig {
  id: string;
  iconSrc: string;
  altText: string;
  showClass: string;
  hideClass: string;
}

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

const addOptions = (parent: HTMLElement) => {
  parent.classList.add("relative");

  const existingOptionsBtn: HTMLElement = document.querySelector(
    "#options-btn"
  ) as HTMLElement;

  if (existingOptionsBtn) {
    parent.removeChild(existingOptionsBtn);
  }

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

const autoExpand = (textarea: HTMLElement) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

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
  currentTextarea.parentNode?.parentNode?.appendChild(newDiv);

  // Set focus on the new textarea
  newTextarea.focus();
};

// Initial setup
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

const handleTextareaInput = (event: KeyboardEvent) => {
  event.preventDefault();
  const textarea = event.target as HTMLTextAreaElement;

  if (event.key === "Enter") {
    event.preventDefault();
    addNewTextarea(textarea);
  }

  // Defer autoExpand until the next tick to ensure the height has updated
  setTimeout(() => {
    autoExpand(textarea);
  });
};

const setupTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.addEventListener("focusin", (e: Event) => {
    e.preventDefault();
    addOptions(textarea.parentNode as HTMLElement);
  });

  textarea.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addNewTextarea(textarea);
    }

    // Defer autoExpand until the next tick to ensure the height has updated
    setTimeout(() => {
      autoExpand(textarea);
    });
  });
};

const setupTextareas = () => {
  const textareas = document.querySelectorAll("textarea");
  console.log(textareas);

  textareas.forEach((textarea) => {
    setupTextarea(textarea);
  });
};

// Initial setup
observeDocumentChanges();
setupTextareas();
