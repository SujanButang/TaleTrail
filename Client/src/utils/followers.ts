import { makeRequest } from "../axios/axios";

export const getFollowers = async (userId: string) => {
  try {
    const data = await makeRequest.get(
      "/relationship/followers?userId=" + userId
    );
    return data.data;
  } catch (error) {
    return [];
  }
};
