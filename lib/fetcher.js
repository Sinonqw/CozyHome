import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

const fetcher = (url) =>
  api
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        const errorMessage = error.response.data.error;

        if (errorMessage) {
          throw new Error(errorMessage);
        }

        throw new Error(
          `Ошибка ${error.response.status}: ${error.response.statusText}`
        );
      }
      throw new Error(error.message || "Произошла неизвестная ошибка сети.");
    });

export default fetcher;
