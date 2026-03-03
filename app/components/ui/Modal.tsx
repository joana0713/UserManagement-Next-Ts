"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Content */}
      <div className="relative bg-white dark:bg-gray-900
                      w-full max-w-md rounded-2xl
                      p-6 shadow-xl border
                      border-gray-200 dark:border-gray-800">
        {children}
      </div>
    </div>
  );
}