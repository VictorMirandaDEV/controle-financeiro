import { InputProps } from "@material-ui/core";
import React from "react";

import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface Props extends InputProps {
  label?: string;
  message?: string;
  nome: string;
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  children?: any;
  checked?: boolean;
}

export const Input = ({
  message,
  label,
  nome,
  type,
  onChange,
  register,
  className,
  checked,
  registerOptions,
  children,
}: Props) => {
  const classname = `w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
    message && "border-red-700"
  }`;
  return (
    <>
      <div className="relative">
        <label className={label ? "block font-Tw py-1  text-lg" : ""}>
          {label}
        </label>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-12">
          {children}
        </span>
        {register ? (
          <input
            type={type}
            className={className ? className : classname}
            checked={checked}
            name={nome}
            {...register(nome, { required: true, onChange })}
          />
        ) : (
          <input
            type={type}
            className={className ? className : classname}
            name={nome}
          />
        )}
      </div>
      <span className="text-xs text-red-600">{message}</span>
    </>
  );
};
