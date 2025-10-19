import React from "react";

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
