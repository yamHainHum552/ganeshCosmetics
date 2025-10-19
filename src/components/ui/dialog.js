import React from "react";
import { X } from "lucide-react";

// Main Dialog wrapper
export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => onOpenChange(false)} // click backdrop closes
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent close on content click
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {children}
      </div>
    </div>
  );
}

// Subcomponents
export function DialogContent({ children }) {
  return <div className="space-y-3">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="text-xl font-bold text-gray-900">{children}</h3>;
}
