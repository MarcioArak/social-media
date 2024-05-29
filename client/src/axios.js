import axios from "axios";

export const makeRequest = axios.create({
  baseURL: `social-media-production-5b7b.up.railway.app/api/`,
  withCredentials: true,
});
