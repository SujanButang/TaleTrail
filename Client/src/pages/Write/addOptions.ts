import { toggleClass } from "../../utils/utils";
import { handleAddCode } from "./code";
import { handleAddEmbed } from "./embed";
import { handleAddHeading } from "./heading";
import { handleImageUpload } from "./imageUpload";

interface OptionsConfig {
  id: string;
  iconSrc: string;
  altText: string;
  showClass: string;
  hideClass: string;
}

/**
 * Adds options (buttons) to the provided parent element based on the configuration.
 * @param parent - The parent HTML element to which options are added.
 */
export const addOptions = (parent: HTMLElement) => {
  parent.classList.remove("relative");
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
  if (config.id === "add-btn") {
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

  // Add event listener based on the button id
  switch (config.id) {
    case "img-btn":
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();
        handleImageUpload(parent.parentElement as HTMLElement);
      });
      break;
    case "code-btn":
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();
        handleAddCode(parent.parentElement as HTMLElement);
      });
      break;
    case "embed-btn":
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();
        handleAddEmbed(parent.parentElement as HTMLElement);
      });
      break;
    case "heading-btn":
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();
        handleAddHeading(parent.parentElement as HTMLElement);
      });
      break;
    default:
      break;
  }

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
