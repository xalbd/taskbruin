import React, { ChangeEvent, useId } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  title: string;
  setValue: (value: any) => void;
}

const Input: React.FC<InputProps> = ({ title, setValue, ...rest }) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setValue(value);
  };

  return (
    <>
      <label htmlFor={id} className="mt-6 block text-base font-bold mb-2">
        {title}
      </label>
      <input
        id={id}
        className="border border-gray-400 text-base rounded-md block w-full p-3"
        onChange={handleChange}
        {...rest}
      />
    </>
  );
};

export default Input;
