const ButtonClose = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="text-[#261C1A] hover:text-[#7C5840] transition"
      aria-label="Закрыть корзину"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};

export default ButtonClose;
