import React from "react";

interface ProductStatusBadgeProps {
  isDraft: boolean;
  onClick: () => void;
}

const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({
  isDraft,
  onClick,
}) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-xs font-semibold transition-colors";

  const statusClasses = isDraft
    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
    : "bg-green-100 text-green-700 hover:bg-green-200";

  const text = isDraft ? "Черновик (Скрыт)" : "Активен (Виден)";

  return (
    <button onClick={onClick} className={`${baseClasses} ${statusClasses}`}>
      {text}
    </button>
  );
};

export default ProductStatusBadge;
