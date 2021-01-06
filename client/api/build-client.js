import axios from "axios";

export default function buildApiClient({ headers } = {}) {
  if (typeof window === "undefined") {
    // on server
    return axios.create({
      baseURL: "http://www.dailyworkoutpro.com",
      headers,
    });
  }

  // on browser
  return axios;
}
