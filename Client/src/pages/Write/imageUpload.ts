import axios from "axios";
import { addNewTextarea } from "./textArea";

export const handleImageUpload = async (parentElement: HTMLElement) => {
  parentElement.innerHTML = "";
  parentElement.classList.add("h-auto");

  const fileInput: HTMLInputElement = document.createElement("input");
  fileInput.type = "file";
  fileInput.classList.add("hidden");

  // Add a change event listener to detect when a file is selected
  fileInput.addEventListener("change", async () => {
    const formData = new FormData();
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);
      formData.append("upload_preset", "wsugtigo");
      try {
        const image: HTMLImageElement = document.createElement("img");
        image.classList.add(
          "h-[500px]",
          "w-full",
          "object-contain",
          "rounded-md",
          "animate-pulse",
          "bg-slate-200"
        );
        parentElement.appendChild(image);
        if (parentElement.id != "cover-image") {
          addNewTextarea(image);
        }

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/drrrbo5hw/image/upload",
          formData
        );

        image.classList.remove("animate-pulse", "bg-slate-200");
        image.src = res.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  });

  parentElement.appendChild(fileInput);

  // Trigger the click event after the change event listener has been set up
  fileInput.click();
};
