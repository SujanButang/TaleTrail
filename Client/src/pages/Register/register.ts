import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast } from "../../utils/utils";
import { toggleClass } from "../../utils/utils";

const emailInput: HTMLInputElement = document.querySelector(
  "#email"
) as HTMLInputElement;
const otpInput: HTMLInputElement = document.querySelector(
  "#otp"
) as HTMLInputElement;
const emailVerification: HTMLElement = document.querySelector(
  "#email-verification"
) as HTMLElement;
const otpVerification: HTMLElement = document.querySelector(
  "#otp-verification"
) as HTMLElement;
const emailVerificationForm: HTMLElement = document.querySelector(
  "#email-verification-form"
) as HTMLElement;
const otpVerificationForm: HTMLElement = document.querySelector(
  "#otp-verification-form"
) as HTMLElement;
const userRegistration: HTMLElement = document.querySelector(
  "#user-registration"
) as HTMLElement;
const userRegistrationForm: HTMLElement = document.querySelector(
  "#user-registration-form"
) as HTMLElement;
const userNameInput: HTMLInputElement = document.querySelector(
  "#username"
) as HTMLInputElement;
const passwordInput: HTMLInputElement = document.querySelector(
  "#password"
) as HTMLInputElement;
const confirmPasswordInput: HTMLInputElement = document.querySelector(
  "#confirm-password"
) as HTMLInputElement;
const invalidPassword: HTMLElement = document.querySelector(
  "#invalid-password"
) as HTMLElement;
const invalidConfirmPassword: HTMLElement = document.querySelector(
  "#invalid-confirm-password"
) as HTMLElement;

/**
 * Handles the form submission for email verification.
 * Sends a request to verify the provided email, and toggles visibility
 * between email verification and OTP verification sections based on the response.
 * Displays success or failure toast messages accordingly.
 * @param e - The event object from the form submission.
 */
const handleEmailVerification = async (e: Event) => {
  e.preventDefault();
  const email = emailInput.value;
  try {
    const res = await makeRequest.post("/auth/verifyEmail", { email });
    if (res.status == 200) {
      showToast("success", res.data);
      toggleClass(emailVerification, { add: "hidden", remove: "flex" });
      toggleClass(otpVerification, { add: "flex", remove: "hidden" });
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

emailVerificationForm.addEventListener("submit", handleEmailVerification);

/**
 * Handles the click event for the "Back to Email" button in the OTP verification section.
 * Toggles visibility between OTP verification and email verification sections.
 * @param e - The event object from the button click.
 */
const backToEmailBtn: HTMLElement = document.querySelector(
  "#back-to-email"
) as HTMLElement;

const handleBackToEmail = (e: Event) => {
  e.preventDefault();
  toggleClass(emailVerification, { add: "flex", remove: "hidden" });
  toggleClass(otpVerification, { add: "hidden", remove: "flex" });
};

backToEmailBtn.addEventListener("click", handleBackToEmail);

/**
 * Handles the form submission for OTP verification.
 * Sends a request to verify the provided OTP and email,
 * and toggles visibility between OTP verification and user registration sections based on the response.
 * Displays success or failure toast messages accordingly.
 * @param e - The event object from the form submission.
 */
const handleOtpVerification = async (e: Event) => {
  e.preventDefault();
  const otp = otpInput.value;
  const email = emailInput.value;
  try {
    const res = await makeRequest.post("/auth/verifyOTP", { email, otp });
    if (res.status == 200) {
      showToast("success", res.data);
      toggleClass(otpVerification, { add: "hidden", remove: "flex" });
      toggleClass(userRegistration, { add: "flex", remove: "hidden" });
    }
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as IHTTPError)?.response?.data?.message
        : "";

    showToast("failed", errorMessage as string);
  }
};

otpVerificationForm.addEventListener("submit", handleOtpVerification);

/**
 * Validates a password against a specified pattern.
 * Displays error messages and applies styles if the password is invalid.
 * @param password - The password to validate.
 * @param confirmPassword - The confirmation password for comparison.
 * @returns True if the password is valid; false otherwise.
 */
const validatePassword = (password: string, confirmPassword: string) => {
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!passwordPattern.test(password)) {
    toggleClass(invalidPassword, { add: "flex", remove: "hidden" });
    toggleClass(passwordInput, {
      add: "border-red-700",
      remove: "border-black",
    });
    return false;
  }
  if (password !== confirmPassword) {
    toggleClass(invalidConfirmPassword, { add: "flex", remove: "hidden" });
    toggleClass(confirmPasswordInput, {
      add: "border-red-700",
      remove: "border-black",
    });
    return false;
  }
  return true;
};

/**
 * Handles the form submission for user registration.
 * Validates the password, and if valid, sends a request to register the user.
 * Displays success or failure toast messages accordingly.
 * @param e - The event object from the form submission.
 */
const handleUserLogin = async (e: Event) => {
  e.preventDefault();
  const email = emailInput.value;
  const username = userNameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const validPassword = validatePassword(password, confirmPassword);
  if (validPassword) {
    try {
      const res = await makeRequest.post("/auth/register", {
        email,
        username,
        password,
      });
      if (res.status == 200) {
        showToast("success", res.data);
        window.location.href = `${window.location.origin}/src/pages/Login/Login.html`;
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null
          ? (error as IHTTPError)?.response?.data?.message
          : "";

      showToast("failed", errorMessage as string);
    }
  }
};

userRegistrationForm.addEventListener("submit", handleUserLogin);

// Event listeners for focus on password and confirm password inputs
passwordInput.addEventListener("focusin", (e: Event) => {
  e.preventDefault();
  toggleClass(invalidPassword, { add: "hidden", remove: "flex" });
  toggleClass(passwordInput, { remove: "border-red-700", add: "border-black" });
});

confirmPasswordInput.addEventListener("focusin", (e: Event) => {
  e.preventDefault();
  toggleClass(invalidConfirmPassword, { add: "hidden", remove: "flex" });
  toggleClass(confirmPasswordInput, {
    remove: "border-red-700",
    add: "border-black",
  });
});
