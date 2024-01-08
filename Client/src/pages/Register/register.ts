import { makeRequest } from "../../axios/axios";
import { IHTTPError } from "../../interface/httpError";
import { showToast } from "../../utils/Toast";
import { toggleClass } from "../../utils/editClass";

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

const handleEmailVerification = async (e: Event) => {
  e.preventDefault();
  const email = emailInput.value;
  try {
    const res = await makeRequest.post("/auth/verifyEmail", { email });
    if (res.status == 200) {
      showToast("success", res.data.message);
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

const backToEmailBtn: HTMLElement = document.querySelector(
  "#back-to-email"
) as HTMLElement;

const handleBackToEmail = (e: Event) => {
  e.preventDefault();
  toggleClass(emailVerification, { add: "flex", remove: "hidden" });
  toggleClass(otpVerification, { add: "hidden", remove: "flex" });
};

backToEmailBtn.addEventListener("click", handleBackToEmail);

const handleOtpVerification = async (e: Event) => {
  e.preventDefault();
  const otp = otpInput.value;
  const email = emailInput.value;
  try {
    const res = await makeRequest.post("/auth/verifyOTP", { email, otp });
    console.log(res && res);
    if (res.status == 200) {
      showToast("success", res.data.message);
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
