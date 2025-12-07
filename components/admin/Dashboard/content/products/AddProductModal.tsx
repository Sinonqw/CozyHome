"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { FormEvent, ChangeEvent } from "react";
import Overlay from "../../../../ui/Overlay";
import { IProduct } from "./ProductsSection";

export interface IProductFormData {
  name: string;
  description: string;
  priceUSD: number;
  imageUrl?: string;
  count: number;
}

interface IAddProductModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: IProductFormData) => Promise<void>;
  defaultData?: IProduct | null;
}

const AddProductModal = ({
  isOpen,
  onClose,
  onSave,
  defaultData,
}: IAddProductModal) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [count, setCount] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultData) {
      setName(defaultData.name);
      setDescription(defaultData.description);
      setPriceUSD(defaultData.priceUSD.toString());
      setImageUrl(defaultData.imageUrl || "");
      setCount(defaultData.count.toString());
    } else {
      setName("");
      setDescription("");
      setPriceUSD("");
      setImageUrl("");
      setCount("0");
    }
  }, [defaultData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const productData: IProductFormData = {
      name,
      description,
      priceUSD: parseFloat(priceUSD),
      imageUrl: imageUrl || undefined,
      count: parseInt(count, 10),
    };

    await onSave(productData);

    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClose={onClose} />

      <div className="fixed inset-0 flex justify-center items-center z-51">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative z-52">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-bold text-[#261C1A] mb-6 border-b pb-2">
            {defaultData ? "Редагувати товар" : "Додати Новий Товар"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Назва товару
              </label>
              <input
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#7C5840] focus:border-[#7C5840]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опис
              </label>
              <textarea
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#7C5840] focus:border-[#7C5840]"
                rows={3}
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ціна (ГРН)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={priceUSD}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceUSD(e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#7C5840] focus:border-[#7C5840]"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Кількість на складі
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCount(e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#7C5840] focus:border-[#7C5840]"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Зображення (опціонально)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImageUrl(e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#7C5840] focus:border-[#7C5840]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 rounded-lg font-semibold transition duration-200 
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#7C5840] hover:bg-[#A0886F] text-white"
                  }
                `}
            >
              {loading
                ? "Збереження..."
                : defaultData
                ? "Зберегти Зміни"
                : "Зберегти Товар"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProductModal;
