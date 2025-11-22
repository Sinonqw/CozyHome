
const Overlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
      onClick={onClose}
      aria-hidden="false"
    ></div>
  );
};

export default Overlay;
