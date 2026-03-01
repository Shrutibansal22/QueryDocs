import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex space-x-2 justify-center items-center min-h-[50vh]">
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce"></div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex space-x-2 justify-start items-center p-4">
      <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};