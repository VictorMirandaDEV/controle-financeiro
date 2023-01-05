import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  message?: string;
  options: {
    label: string;
    value: any;
  }[];
};

export const Dropdown2 = ({ label, options,message, onChange, ...rest }: Props) => {
  return (
    <>
    <label className="block font-Tw py-1  text-lg" htmlFor="Login">
      {label}
      <select
        className={
          "w-full px-4 py-2 mt-2 appearance-none border after:text-cyan-800 after:content-['_↗'] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
        }
        style={{}}
        onChange={onChange}
        {...rest}
      >
        <option value={null} key={1}>
          Selecione uma opção
        </option>

        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      
    </label>
    <span className="text-xs text-red-600">{message}</span></>
  );
};
