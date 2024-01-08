import { NextFunction, Request, Response } from "express";
import {
  IUserLogin,
  IUserRegister,
  IVerifyEmail,
  IVerifyOTP,
} from "../interfaces/authInterface";
import {
  login,
  logout,
  registerUser,
  verifyOTP,
  verifyUserEmail,
} from "../services/authService";

/**
 * Handles the verification of a user's email address.
 * @param req - The Express request object containing the user's email.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleVerifyEmail = async (
  req: IVerifyEmail,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const data = await verifyUserEmail(email);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Handles the verification of an OTP (One-Time Password) for a user.
 * @param req - The Express request object containing the email and OTP.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleVerifyOTP = async (
  req: IVerifyOTP,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    const data = await verifyOTP(email, otp);
    res.status(data.status).json(data.message);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Handles the registration of a new user.
 * @param req - The Express request object containing the user registration details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleUserRegistration = async (
  req: IUserRegister,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;
    const data = await registerUser(email, username, password);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the user login process, including authentication and token generation.
 * Sets cookies with access and refresh tokens in the response.
 * @param req - The Express request object containing the user login details.
 * @param res - The Express response object to send the result and set cookies.
 * @param next - The Express next function to handle errors.
 */
export const handleUserLogin = async (
  req: IUserLogin,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res
      .status(data.status)
      .cookie("accessToken", data.data.accessToken)
      .cookie("refreshToken", data.data.refreshToken)
      .json(data.message);
  } catch (error) {
    next(error);
  }
};

export const handleUserLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    const data = await logout(accessToken, refreshToken);
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      secure: true,
      sameSite: "none",
    });
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};
