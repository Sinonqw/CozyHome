"use client";
import React, { useState, FormEvent } from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  // Обработчик изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // --- ИМИТАЦИЯ ОТПРАВКИ ДАННЫХ ---
    console.log("Отправка данных формы:", formData);

    try {
      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // В реальном приложении здесь был бы вызов API
      // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })

      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Очистка формы
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
      // Сброс статуса через 5 секунд
      setTimeout(() => setSubmissionStatus(null), 5000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-[#261C1A] mb-6">
        Надіслати Повідомлення
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Ім'я
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7C5840] focus:border-[#7C5840] transition duration-150"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7C5840] focus:border-[#7C5840] transition duration-150"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Повідомлення
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7C5840] focus:border-[#7C5840] transition duration-150"
          ></textarea>
        </div>

        {/* Сообщение о статусе отправки */}
        {submissionStatus === "success" && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg font-medium">
            Ваше повідомлення успішно надіслано! Дякуємо!
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="p-3 bg-red-100 text-red-800 rounded-lg font-medium">
            Виникла помилка під час надсилання. Будь ласка, спробуйте пізніше
            або зателефонуйте нам.
          </div>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-4 bg-[#7C5840] text-white font-bold rounded-lg shadow-lg hover:bg-[#261C1A] transform transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isSubmitting ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Надіслати"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
