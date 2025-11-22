import axios from "axios";

export const api = axios.create({
  baseURL: "/"
});

const fetcher = (url) => api.get(url).then((res) => res.data);

export default fetcher;
