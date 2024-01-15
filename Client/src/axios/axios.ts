import axios from "axios";

/**
 * Creates an Axios instance configured for making HTTP requests to a specific base URL.
 * The instance includes credentials with requests.
 * @returns {AxiosInstance} An Axios instance with the specified configuration.
 */
export const makeRequest = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});