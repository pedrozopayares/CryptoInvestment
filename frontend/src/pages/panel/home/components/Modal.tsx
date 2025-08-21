import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-lg relative max-h-[80vh] flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex-1 overflow-y-auto pt-6 px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
