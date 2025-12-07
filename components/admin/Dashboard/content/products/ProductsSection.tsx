"use client";
import React, { useState, useMemo } from "react";
import AddProductModal from "./AddProductModal";
import { IProductFormData } from "./AddProductModal";
import ProductMetricsCard from "./ProductMetricsCard";
import ProductTableControls from "./ProductTableControls";
import ProductTable from "./ProductTable";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { api } from "@/lib/fetcher";
import { Search } from "lucide-react";

export interface IProduct extends IProductFormData {
  _id: string;
  isDraft: boolean;
  stock: number;
  count: number;
}

const ProductsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: products,
    error: swrError,
    isLoading: loading,
  } = useSWR<IProduct[]>("/api/products");

  const { mutate: globalMutate } = useSWRConfig();

  const error = swrError ? swrError.message : null;
  const productData = products || [];

  // Логіка фільтрації
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return productData;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return productData.filter((product) => {
      return (
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [productData, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // --- POST (Додавання) ---
  const handleSaveProduct = async (formData: IProductFormData) => {
    try {
      await api.post("/api/products", formData);

      globalMutate("/api/products", undefined, { revalidate: true });

      setMessage(`✅ Товар "${formData.name}" успішно додано!`);
    } catch (e: unknown) {
      console.error("Помилка збереження:", e);
      const messageText =
        e instanceof Error
          ? e.message
          : "Виникла невідома помилка при збереженні";
      setMessage(`❌ Помилка: ${messageText}`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
      setIsModalOpen(false);
    }
  };

  // --- DELETE ---
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Ви впевнені, що бажаєте видалити цей товар?")) {
      return;
    }

    try {
      await api.delete("/api/products", { data: { id } });
      globalMutate("/api/products");
      setMessage(`✅ Товар успішно видалено!`);
    } catch (e: unknown) {
      console.error("Помилка видалення:", e);
      const messageText =
        e instanceof Error
          ? e.message
          : "Виникла невідома помилка при видаленні";
      setMessage(`❌ Помилка: ${messageText}`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // --- EDIT HANDLER  ---
  const handleEditProduct = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // --- UPDATE  ---
  const handleUpdateProduct = async (formData: IProductFormData) => {
    if (!editingProduct) return;

    const updateData = {
      ...formData,
      id: editingProduct._id,
    };

    try {
      await api.patch("/api/products", updateData);

      globalMutate("/api/products", undefined, { revalidate: true });

      setMessage(`✅ Товар "${formData.name}" успішно оновлено!`);
    } catch (e: unknown) {
      console.error("Помилка оновлення:", e);
      const messageText =
        e instanceof Error
          ? e.message
          : "Виникла невідома помилка при оновленні";
      setMessage(`❌ Помилка: ${messageText}`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
      setEditingProduct(null);
      setIsModalOpen(false);
    }
  };

  // --- TOGGLE DRAFT ---
  const handleToggleDraft = async (id: string, isDraft: boolean) => {
    try {
      await api.patch("/api/products", { id, isDraft: !isDraft });
      globalMutate("/api/products", undefined, { revalidate: true });
      setMessage(`✅ Статус товару успішно змінено`);
    } catch (e: unknown) {
      console.error("Помилка оновлення статусу чернетки:", e);
      setMessage(`❌ Помилка при зміні статусу`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">
        Товари та Асортимент
      </h2>

      {/* Повідомлення про успіх/помилку */}
      {message && (
        <div
          className={`p-3 mb-4 rounded-lg font-medium ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Метрики товарів */}
      <ProductMetricsCard products={productData} />

      {/* Кнопки управління (Додати товар) */}
      <ProductTableControls
        isLoading={loading}
        onAddProduct={() => setIsModalOpen(true)}
        productCount={productData.length}
      />

      {/* Панель пошуку */}
      <div className="flex mb-6 items-center space-x-4 w-full md:w-1/2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Пошук за назвою або описом..."
          className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C5840]"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Таблиця/Список товарів */}
      <ProductTable
        error={error}
        isLoading={loading}
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        onToggleDraft={handleToggleDraft}
      />

      {/* Модальне вікно */}
      <AddProductModal
        isOpen={isModalOpen}
        onSave={editingProduct ? handleUpdateProduct : handleSaveProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        defaultData={editingProduct}
      />
    </div>
  );
};

export default ProductsSection;
