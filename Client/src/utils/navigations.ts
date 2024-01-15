import {
  cookieValid,
  getCookie,
  logout,
  toggleClass,
  toggleModal,
} from "./utils";

const homeLinkDiv = document.querySelector("#home-link") as HTMLElement;
homeLinkDiv.addEventListener(
  "click",
  () => (window.location.href = window.location.origin)
);

const profileBtn = document.querySelector("#profile-btn") as HTMLElement;
profileBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  window.location.href =
    window.location.origin +
    "/src/pages/Profile/profile.html?userId=" +
    userData.id;
});

const signInBtn: HTMLElement = document.querySelector(
  "#sign-in"
) as HTMLElement;
const getStartedBtn: HTMLElement = document.querySelector(
  "#get-started"
) as HTMLElement;
const writeLink: HTMLAnchorElement = document.querySelector(
  "#write-link"
) as HTMLAnchorElement;

const profileContainer = document.querySelector("#profile") as HTMLElement;

const profileOptionModal = document.querySelector(
  "#profile-option-div"
) as HTMLElement;
const userBtn = document.querySelector("#user-btn") as HTMLElement;

userBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  toggleModal(profileOptionModal);
});

const userImage = document.querySelector("#user-image") as HTMLImageElement;
const userEmail = document.querySelector("#user-email") as HTMLSpanElement;
const userData = JSON.parse(localStorage.getItem("user") as string);
if (userData) {
  userEmail.innerText = userData.email;
  if (userData.profileImage) {
    userImage.src = userData.profileImage;
  }
}

const signOutButton = document.querySelector("#sign-out") as HTMLButtonElement;
signOutButton.addEventListener("click", async () => {
  await logout();
  window.location.href = window.location.origin;
});

signInBtn.addEventListener(
  "click",
  () =>
    (window.location.href =
      window.location.origin + "/src/pages/Login/login.html")
);

getStartedBtn.addEventListener(
  "click",
  () =>
    (window.location.href =
      window.location.origin + "/src/pages/Register/register.html")
);

document.addEventListener("DOMContentLoaded", async () => {
  const cookie = getCookie("accessToken");
  if (!cookie) return;
  const validCookie = await cookieValid();
  if (!validCookie) return;
  toggleClass(signInBtn, { remove: "sm:flex" });
  toggleClass(getStartedBtn, { add: "hidden" });
  toggleClass(profileContainer, { add: "flex", remove: "hidden" });
  writeLink.href = window.location.origin + "/src/pages/Write/write.html";
});

const readingListBtn = document.querySelector(
  "#reading-list-btn"
) as HTMLButtonElement;
readingListBtn.addEventListener(
  "click",
  () =>
    (window.location.href =
      window.location.origin + "/src/pages/Readinglist/readinglist.html")
);
