import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast } from "../../utils/utils";

const loginForm: HTMLElement = document.querySelector(
  "#login-form"
) as HTMLElement;
const emailInput: HTMLInputElement = document.querySelector(
  "#email"
) as HTMLInputElement;
const passwordInput: HTMLInputElement = document.querySelector(
  "#password"
) as HTMLInputElement;


/**
 * Handles the form submission for user login.
 * Retrieves the email and password from the input fields,
 * sends a request to authenticate the user, and redirects to the home page on success.
 * Displays a toast message on login failure.
 * @param e - The event object from the form submission.
 */
const handleLogin = async (e: Event) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    const res = await makeRequest.post("/auth/login", { email, password });
    if (res.status == 200) {
      window.location.href = `${window.location.origin}`;
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

loginForm.addEventListener("submit", handleLogin);
