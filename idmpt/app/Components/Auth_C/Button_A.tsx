import React from "react";

interface Button_AProps {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
}
function Button_A({ type, text }: Button_AProps) {
  return (
    <button
      type={type}
      className="w-full py-3 bg-blue-600 text-white text-lg font-normal rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {text}
    </button>
  );
}

export default Button_A;
