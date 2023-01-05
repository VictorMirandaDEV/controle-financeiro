import { InputProps } from "@material-ui/core";
import {
  Controller,
  RegisterOptions,
  useForm,
  UseFormRegister,
  Control,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
interface Props extends InputProps {
  label?: string;
  message?: string;
  nome: string;
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  controle?: any;
  format: string;
  mask?: string[];
  cnpj?: boolean;
  children?: any;
  autoFocus?: boolean;
}

export const Mask = ({
  label,
  message,
  nome,
  controle,
  className,
  onChange,
  register,
  format,
  mask,
  cnpj,
  placeholder,
  registerOptions,
  children,
  autoFocus
}: Props) => {
  const classname = `${
    children && "pl-10"
  } w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
    message && "border-red-700"
  }`;
  return (
    <>
      <div className="relative">
        {cnpj != true ? (
          <>
            <label className={label ? "block font-Tw py-1  text-lg" : ""}>
              {label}
            </label>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-12">
              {children}
            </span>
            <Controller
              control={controle}
              // autoFocus={autoFocus}
              name={nome}
              {...register(nome, {
                required: true,
                onChange,
              })}
              render={({ field: { onChange, name, value } }) => (
                <NumberFormat
                  displayType="input"
                  type="text"
                  // placeholder="Login"
                  mask={mask}
                  className={className ? className : classname}
                  name={name}
                  value={value}
                  format={format}
                  placeholder={placeholder}
                  onChange={onChange}
                />
              )}
            />
          </>
        ) : (
          <>
            <label className={label ? "block font-Tw py-1  text-lg" : ""}>
              {label}
            </label>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-12">
              {children}
            </span>
            <Controller
              control={controle}
              name={nome}
              {...register(nome, {
                required: true,
                onChange,
              })}
              render={({ field: { onChange, name, value } }) => (
                <CpfCnpj
                  type="tel"
                  value={value}
                  placeholder={placeholder}
                  name={name}
                  onChange={onChange}
                  className={className ? className : classname}
                  autoFocus={autoFocus}
                />
              )}
            />
          </>
        )}
      </div>
      <span className="text-xs text-red-600">{message}</span>
    </>
  );
};
