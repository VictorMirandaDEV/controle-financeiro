import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Mask } from "../Components/CustomComponents";

import { Logo } from "../Components/Icons/logo";
import Router from "next/router";
import { updateUserSchema } from "../utils/validation";
import api from "../api";
import { useModal } from "../context";
import { string } from "prop-types";

export const Recovery = () => {

  const { setIsModalOpened, setModalData } = useModal();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  const handleRecovery = async (data) => {

    const { email, cpf, telefone } = data;
    const isValid = await updateUserSchema.isValid(data);
    // alert(isValid);
    if (isValid) {
      try {
        api.get("/auth", {
          params: {
            email,
            cpf
          },
        }).then((res) => {
          const info = res.data[0];
          if (info.email != email) {
            setModalData({
              errorCode: 404,
              errorMessage: "",
              errorDescription: "Email não foi encontrado"
            });
            setIsModalOpened(true);
            // throw new Error("Email não encontrado", email);
            return;
          }
          if (info.cpf != cpf.replaceAll(".", "")
            .replaceAll("-", "")
            .replaceAll("/", "")) {
            setModalData({
              errorCode: 404,
              errorMessage: "",
              errorDescription: `O CPF não foi encontrado` 
            });
            setIsModalOpened(true);
            // throw new Error("CPF não encontrado");
            return;
          }

          api.put("/auth/" + info.id, {

            telefone: telefone,

          }
          ).then((res) => {
            // alert("Dados atualizados com sucesso!");
            Router.push("/");
          })
        });



      } catch (error) {
        // console.error(error);

        setModalData({
          errorCode: 404,
          errorMessage: "Usuario não encontrado",
          errorDescription: error.message
        });
        setIsModalOpened(true);
        alert(error.message);

      }
    }
  };

  return (
    <Box notShow={true}>
      <Logo />
      <form className="">
        <div className="mt-4">
          <label className="font-Tw  max-w-screen-md  text-lg">
            Atualizar o Cadastro
          </label>
        </div>
        <Input label="E-mail cadastrado" nome="email" type="email" message={errors.email?.message} register={register} />
        <Mask
          controle={control}
          format="###.###.###-##"
          type="text"
          nome="cpf"
          label="CPF"
          register={register}
          message={errors.cpf?.message}
        />
        <Mask
          type="text"
          nome="telefone"
          label="Telefone"
          register={register}
          format="(##) #####-####"
          controle={control}
          message={errors.telefone?.message}
        />
        <Button
          type="button"
          onClick={() => Router.push("/")} label={""}
        >
          Voltar
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(handleRecovery)} label={""}
        >
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default Recovery;