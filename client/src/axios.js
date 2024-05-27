import axios from "axios";

export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  withCredentials: true,
});

// export const makeRequest = axios.create({
//   baseURL: `http://localhost:8800/api/`,
//   withCredentials: true,
// });
