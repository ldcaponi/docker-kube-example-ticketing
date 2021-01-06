import axios from "axios";

export default function buildApiClient({ headers } = {}) {
  if (typeof window === "undefined") {
    // on server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers,
    });
  }

  // on browser
  return axios;
}
