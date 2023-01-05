import { Camera } from "./Icons/camera";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dropdown,
  DropdownAtendente,
  Input,
  Mask,
  Title,
} from "./CustomComponents";
import { boletoSchema } from "../utils/validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dropdown2 } from "./CustomComponents/dropdown2";
import { description } from "../utils/description";
import {  document } from "browser-monads";
export const TypeScreen = ({ onSubmit }) => {
  const [desc, setDesc] = useState("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(boletoSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  // useLayoutEffect111

  // auto focus on input when screen is with ref
  const inputRef = useRef(null);
  const input =
    "flex-1 w-full py-2 border-b-2 border-blue-400 focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none";
  const handleCode = async (data) => {
    const isValid = await boletoSchema.isValid(data);

    if (isValid) {
      const { boleto } = data;
      onSubmit(boleto, desc);
    }
  };

  let maskBoleto;
  if (watch("boleto")?.charAt(0) == "8") {
    maskBoleto = "########### # ########### # ########### # ########### #";
  } else {
    maskBoleto = "#####.##### #####.###### #####.###### # ############## #";
  }

  // inputDocument?.focus();
  
  useLayoutEffect(() => {
  const inputDocument = document.querySelector<HTMLInputElement>(`input[name=boleto]`).focus();
  inputDocument?.focus();
}, []);


// inputRef.current?.focus();

  return (
    <Box>
      <form className="w-80  sm:w-96 flex justify-center flex-col">
        <Title path="/boleto" title="Pagar boleto" col3="/boletoRead">
          <Camera />
        </Title>

        {/* <h3 className="text-2xl font-bold text-center">Login to your account</h3> */}
        {/* <form action> */}
        <div className="">
            <h1 className="font-Tw  text-sm flex justify-center py-2 mt-2 ">Use o leitor de codigo de barras ou digite o boleto abaixo</h1>
          <div className=" flex items-center justify-center">
            <div className="py-4 w-full">
              <Mask
                controle={control}
                onChange={() => setErrorMessage("")}
                format={maskBoleto}
                type="text"
                nome="boleto"
                label="Código de barras"
                register={register}
                className={input+"autoFocus"}
                message={errors.boleto?.message}
                autoFocus={true}
                ref={inputRef}
              />

              <div className="py-4 w-full">
                {/* <Input
                  type="text"
                  nome="description"
                  label="Descrição (opcional)"
                  onChange={(e) => setDesc(e.target.value)}
                  className={input}
                  register={register}
                  message={errors.description?.message}
                /> */}
                <Controller
                  control={control}
                  // defaultValue={options[0]?.value}
                  // nome="paf"
                  {...register("description", {
                    required: true,
                    onChange: (e) => setDesc(e.target.value),
                  })}
                  render={({ field: { onChange, name, value } }) => (
                    <Dropdown2
                      label="Descrição"
                      options={description}
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={input}
                      message={errors.description?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-baseline justify-center">
          <Button
            label="Próximo"
            onClick={handleSubmit(handleCode)}
            type="submit"
          />
        </div>
      </form>
    </Box>
  );
};
