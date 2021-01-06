import axios from "axios";

export default function buildApiClient({ headers } = {}) {
  if (typeof window === "undefined") {
    // on server
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers,
    });
  }

  // on browser
  return axios;
}
