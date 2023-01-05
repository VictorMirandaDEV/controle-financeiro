import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: {
    label: string;
    value: any;
  }[];
};

export const Dropdown = ({ options, onChange, ...rest }: Props) => {
  return (
    <select
      className={
        "w-full px-4 py-2 mt-2 appearance-none border after:text-cyan-800 after:content-['_↗'] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
      }
      style={{}}
      onChange={onChange}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
