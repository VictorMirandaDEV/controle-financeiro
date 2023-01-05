import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Input, Button, Mask } from "../Components/CustomComponents";

import { Logo } from "../Components/Icons/logo";
import Router from "next/router";
import { recoveryUserSchema, updateUserSchema } from "../utils/validation";
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
    resolver: yupResolver(recoveryUserSchema),
  });

  const handleRecovery = async (data) => {
    var { email, cpf, senha } = data;
    cpf = cpf
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", "");
    const isValid = await recoveryUserSchema.isValid(data);
    // alert(isValid);

    if (isValid) {
      try {
        api
          .get("/auth", {
            params: {
              email,
              cpf,
            },
          })
          .then((res) => {
            const info = res.data[0];

            if (res.data[1]) {
              setModalData({
                errorCode: 404,
                errorMessage: "",
                errorDescription: `O Usuario não foi encontrado`,
              });
              setIsModalOpened(true);
            }
            if (info == null || undefined) {
              setModalData({
                errorCode: 404,
                errorMessage: "",
                errorDescription: `O Usuario não foi encontrado`,
              });
              setIsModalOpened(true);
            }

            if (info?.email != email) {
              setModalData({
                errorCode: 404,
                errorMessage: "",
                errorDescription: "O Email não foi encontrado",
              });
              setIsModalOpened(true);
              // throw new Error("Email não encontrado", email);
              return;
            }
            if (
              info?.cpf !=
              cpf.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "")
            ) {
              setModalData({
                errorCode: 404,
                errorMessage: "",
                errorDescription: `O CPF não foi encontrado`,
              });
              setIsModalOpened(true);
              // throw new Error("CPF não encontrado");
              return;
            }

            api
              .put("/auth/forgot/" + info.id, {
                senha: senha,
              })
              .then((res) => {
                // alert("Dados atualizados com sucesso!");
                Router.push("/boleto");
              });
          });
      } catch (error) {
        // console.error(error);

        setModalData({
          errorCode: 404,
          errorMessage: "Usuario não encontrado",
          errorDescription: error.message,
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
        <Input
          label="E-mail cadastrado"
          nome="email"
          type="email"
          message={errors.email?.message}
          register={register}
        />
        <Mask
          controle={control}
          format="###.###.###-##"
          type="text"
          nome="cpf"
          label="CPF"
          register={register}
          message={errors.cpf?.message}
        />
        <Input
          // onChange={onChange}
          type="password"
          nome="senha"
          label="Senha"
          register={register}
          message={errors.senha?.message}
        />
        <Input
          // onChange={onChange}
          type="password"
          nome="senha2"
          label="Confirmar a Senha"
          register={register}
          message={errors.senha2?.message}
        />
        <Button type="button" onClick={handleSubmit(handleRecovery)} label={""}>
          Continuar
        </Button>
        <Button type="button" onClick={() => Router.push("/boleto")} label={""}>
          Voltar
        </Button>
      </form>
    </Box>
  );
};

export default Recovery;
