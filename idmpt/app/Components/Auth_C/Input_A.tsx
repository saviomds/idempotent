import React from "react";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  htmlFor?: string;
  required: boolean;
}

function Input_A({
  label,
  placeholder,
  type,
  name,
  htmlFor,
  required,
}: InputProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-xl font-normal text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </>
  );
}

export default Input_A;
