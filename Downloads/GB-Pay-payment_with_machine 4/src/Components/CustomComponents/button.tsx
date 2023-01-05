import { ButtonProps } from "@material-ui/core";
import React from "react";
interface Props extends ButtonProps {
  label: string;
  children?: any;
}

export const Button = ({ type, onClick, className, label, children, disabled }: Props) => {
  const classname = `relative w-full px-1 py-2 mt-4 text-white text-1xl bg-button-submit rounded-lg transition-all duration-200 hover:bg-gray font-TwBold`;
  return (
    <button
      type={type}
      className={className ? className : classname}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
      {children} {label}
      </div>
    </button>
  );
};
