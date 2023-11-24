import React, { ChangeEvent, useId } from "react";

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  title: string;
  rows: number;
  setValue: (value: any) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  title,
  rows,
  setValue,
  ...rest
}) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setValue(value);
  };

  return (
    <>
      <label htmlFor={id} className="mt-6 block text-base font-bold mb-2">
        {title}
      </label>
      <textarea
        id={id}
        className="border border-gray-400 text-base rounded-md block w-full p-3"
        rows={rows}
        onChange={handleChange}
        {...rest}
      />
    </>
  );
};

export default TextArea;
