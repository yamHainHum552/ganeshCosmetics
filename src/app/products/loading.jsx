import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-full border-t-4 border-white border-solid h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loading;
