import React from "react";

interface InputProps {
  title: string;
  placeholder?: string;
  rows?: number;
  isRequired: boolean;
}

const Input: React.FC<InputProps> = ({ title, placeholder, rows, isRequired }) => {
  const inputStyles =
    "border border-gray-400 text-base rounded-md block w-full p-3";

  return (
    <>
      <label className="mt-6 block text-base font-bold mb-2">{title}</label>
      {rows && rows > 0 ? (
        <textarea
          className={`${inputStyles}`}
          placeholder={placeholder}
          rows={rows}
          required = {isRequired}
        />
      ) : (
        <input
          className={`${inputStyles}`}
          placeholder={placeholder}
          required = {isRequired}
        />
      )}
    </>
  );
};

export default Input;
