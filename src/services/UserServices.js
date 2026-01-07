import { topWriters } from "../data/topWritersData";
const MOCK_ENDPOINT = "/api/v1/top-writers";
export const UserServices = {
  getTopWriters: function (limit = 3) {
    console.log("Mock Fetching Top Writers from:", MOCK_ENDPOINT);
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = topWriters.slice(0, limit);
        resolve(result);
      }, 1000);
    });
  },
};
