import React, { useState } from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getSession, useSession, signIn } from "next-auth/react";
import { userSchema } from "../utils/validation";
import { useRouter } from "next/router";
import { SignInError } from "../utils/errorLogin";
import { Logo } from "../Components/Icons/logo";
import { Button, Input, Box, Mask } from "../Components/CustomComponents";

export default function Introduction() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const [loading, setLoading] = useState(false);
  const { error } = useRouter().query;
  const userData = useSession();

  const handleLogin = async (data) => {
    const isValid = await userSchema.isValid(data);

    if (isValid) {
      setLoading(true);
      const res = await signIn("credentials", {
        cpf: data.cpf
          .replaceAll(".", "")
          .replaceAll("-", "")
          .replaceAll("/", ""),
        senha: data.senha,

        callbackUrl: `${window.location.origin}/boleto`,
      });
      if (res?.error) {
        setLoading(false);
      } else {
        sessionStorage.setItem(
          "gb-pay-userinfo",
          JSON.stringify(userData.data)
        );
      }
    }
  };

  return (
    <Box notShow={true}>
      <Logo />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mt-4" />
        {/* <Input
          nome="email"
          label="Login"
          register={register}
          message={errors.email?.message}
        /> */}

        <Mask
          controle={control}
          format="###.###.###-##"
          type="text"
          nome="cpf"
          label="CPF"
          register={register}
          message={errors.cpf?.message}
        />
        <div className="mt-4">
          <Input
            nome="senha"
            label="Senha"
            type="password"
            register={register}
            message={errors.senha?.message}
          />
        </div>
        <div className="flex items-baseline justify-center">
          <Button
            onClick={handleLogin}
            label={loading ? "Carregando" : "Entrar"}
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="currentColor"
                  strokeWidth={4}
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </Button>
        </div>
        {error && <SignInError error={error} />}
        {/* <div className="flex pt-2  justify-center">
          <span className="text-xs tracking-wide text-gray font-Tw ">
            Atualizar a conta
            <Link
              href="/atualizar_cadastro"
              passHref={true}
              className=" px-1 text-sm text-blue-700 hover:underline font-Tw "
            >
              <span className="cursor-context-menu px-1 text-sm text-blue-700 hover:underline font-Tw ">
                aqui
              </span>
            </Link>
          </span>
          
        </div> */}
        <div className="flex pt-4  justify-center">
          <span className="text-xs tracking-wide text-gray font-Tw ">
            Não tem conta?
            <Link
              href="/cadastro"
              passHref={true}
              className=" px-1 text-sm text-blue-700 hover:underline font-Tw "
            >
              <span className="cursor-context-menu px-1 text-sm text-blue-700 hover:underline font-Tw ">
                cadastre-se
              </span>
            </Link>
          </span>

        </div>
        <div className="flex py-2 justify-center">
          <span className="text-xs tracking-wide text-gray font-Tw ">
            Recuperar a
            <Link
              href="/recuperar"
              passHref={true}
              className=" px-1 text-sm text-blue-700 hover:underline font-Tw"
            >
              <span className="cursor-context-menu px-1 text-sm text-blue-700 hover:underline font-Tw ">
                senha
              </span>
            </Link>
          </span>
        </div>
        <div className="flex justify-center">
          <Link
            href="/simulacao"
            passHref={true}
            className=" px-1 text-sm text-blue-700 hover:underline font-Tw "
          >
            <span className="cursor-context-menu px-1 text-sm text-blue-700 hover:underline font-Tw ">
              Simulação de valores
            </span>
          </Link>
        </div>
      </form>
    </Box>
  );
}

export async function getServerSideProps(context) {
  var session = await getSession(context);
  if (!session) {
    return {
      props: {
        session
      }
    }
  }
  return {
    props: {
      session: null
    }
  }
}