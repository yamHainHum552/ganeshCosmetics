import React from "react";

export function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100 border-b">{children}</thead>;
}

export function TableHead({ children, className }) {
  return (
    <th className={`px-4 py-2 font-medium text-gray-600 ${className}`}>
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b ">{children}</tr>;
}

export function TableCell({ children, className }) {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}
