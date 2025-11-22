"use client";
import React, { useState } from "react";
import AddProductModal from "./AddProductModal";
import { IProductFormData } from "./AddProductModal";
import ProductMetricsCard from "./ProductMetricsCard";
import ProductTableControls from "./ProductTableControls";
import ProductTable from "./ProductTable";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { api } from "@/lib/fetcher";

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

  const {
    data: products,
    error: swrError,
    isLoading: loading,
    mutate: revalidateProducts,
  } = useSWR<IProduct[]>("/api/products");

  const { mutate: globalMutate } = useSWRConfig();

  const error = swrError ? swrError.message : null;
  const productData = products || [];

  // --- POST ---
  const handleSaveProduct = async (formData: IProductFormData) => {
    try {
      await api.post("/api/products", formData);

      globalMutate("/api/products", undefined, { revalidate: true });

      setMessage(`✅ Товар "${formData.name}" успешно добавлен!`);
    } catch (e: unknown) {
      console.error("Ошибка сохранения:", e);
      const messageText =
        e instanceof Error
          ? e.message
          : "Произошла неизвестная ошибка при сохранении";
      setMessage(`❌ Ошибка: ${messageText}`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
      setIsModalOpen(false);
    }
  };

  // --- DELETE ---
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      return;
    }

    try {
      await api.delete("/api/products", { data: { id } });
      globalMutate("/api/products");
      setMessage(`✅ Товар успешно удален!`);
    } catch (e: unknown) {
      console.error("Ошибка удаления:", e);
      const messageText =
        e instanceof Error
          ? e.message
          : "Произошла неизвестная ошибка при удалении";
      setMessage(`❌ Ошибка: ${messageText}`);
    } finally {
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // --- EDIT HANDLER ---
  const handleEditProduct = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // --- UPDATE (PATCH) ---
  const handleUpdateProduct = async (formData: IProductFormData) => {
    if (!editingProduct) return;

    const updateData = {
      ...formData,
      id: editingProduct._id,
    };

    try {
      await api.patch("/api/products", updateData);

      globalMutate("/api/products", undefined, { revalidate: true });

      setMessage(`✅ Товар "${formData.name}" успешно обновлен!`);
    } catch (e: unknown) {
    } finally {
      setTimeout(() => setMessage(""), 5000);
      setEditingProduct(null);
      setIsModalOpen(false);
    }
  };

  const handleToggleDraft = async (id: string, isDraft: boolean) => {
    try {
      await api.patch("/api/products", { id, isDraft: !isDraft });
      globalMutate("/api/products", undefined, { revalidate: true }); 
      setMessage(`✅ Статус товара успешно изменен`);
    } catch (e: unknown) {
      console.error("Ошибка обновления статуса черновика:", e);
      setMessage(`❌ Ошибка при изменении статуса`);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-[#7C5840] mb-6 border-b pb-3">
        Товары и Ассортимент
      </h2>

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

      {/* Метрики товаров */}
      <ProductMetricsCard products={productData} />

      <ProductTableControls
        isLoading={loading}
        onAddProduct={() => setIsModalOpen(true)}
        onRefresh={() => revalidateProducts()}
        productCount={productData.length}
      />

      {/* Таблица/Список товаров */}
      <ProductTable
        error={error}
        isLoading={loading}
        products={productData}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        onToggleDraft={handleToggleDraft}
      />

      {/* Модальное окно */}
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
