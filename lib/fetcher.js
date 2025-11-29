import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

// Глобальная функция-загрузчик для useSWR
const fetcher = (url) =>
  api
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      // --- ЛОГИКА ОБРАБОТКИ ОШИБКИ ---

      // Если у нас есть объект ответа от сервера (т.е., ошибка 4xx или 5xx)
      if (error.response) {
        // Мы знаем, что наши API-маршруты Next.js возвращают объект { error: "Сообщение об ошибке" }
        const errorMessage = error.response.data.error;

        // Бросаем только строку сообщения об ошибке
        if (errorMessage) {
          throw new Error(errorMessage);
        }

        // Запасной вариант для других ошибок axios
        throw new Error(
          `Ошибка ${error.response.status}: ${error.response.statusText}`
        );
      }

      // Обработка сетевых ошибок (нет подключения) или других ошибок, не связанных с ответом
      throw new Error(error.message || "Произошла неизвестная ошибка сети.");
    });

export default fetcher;
