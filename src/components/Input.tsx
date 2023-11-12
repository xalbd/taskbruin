import React, { ChangeEvent } from "react";

interface InputProps {
  title: string;
  placeholder?: string;
  rows?: number;
  type?: string;
  isRequired: boolean;
  value: string | number;
  onInputChange: (value: any) => void;
}

const Input: React.FC<InputProps> = ({ title, placeholder, rows, type, value, isRequired, onInputChange }) => {
  const inputStyles =
    "border border-gray-400 text-base rounded-md block w-full p-3";

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    onInputChange(value);
  };

  return (
    <>
      <label className="mt-6 block text-base font-bold mb-2">{title}</label>
      {rows && rows > 0 ? (
        <textarea
          className={`${inputStyles}`}
          placeholder={placeholder}
          rows={rows}
          required={isRequired}
          value={value} 
          onChange={handleChange}
        />
      ) : (
        <input
          className={`${inputStyles}`}
          placeholder={placeholder}
          type={type}
          required={isRequired}
          value={value} 
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default Input;
