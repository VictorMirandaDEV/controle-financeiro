import React from "react";
import Link from "next/link";
import { useCardCode, usePayment } from "../context";
import { BarcodeBig } from "../Components/Icons/barcodeBig";
import { Box, Button } from "../Components/CustomComponents";
import { useSession, getSession } from "next-auth/react";
import { Auth } from "./_app";
import Deslogar from "../Components/Logoff";
export default function Boleto({ session }) {
  const { data } = useSession();

  const { setBillData, setCreditCardData } = usePayment();
  const { setCardCode } = useCardCode();

  console.log("leu mesmo?", data);
  return (
    <>
      <Auth>
        <Box>
          <div className="flex  justify-center">
            <label className="flex items-center justify-center w-full font-bold font-Tw py-1  text-3xl">
              Pagar boleto
            </label>
          </div>
          <div className="mt-4 ">
            <div className="flex items-center justify-center">
              <div className=" h-36 w-36 bg-button-submit rounded-full flex items-center justify-center">
                <BarcodeBig />
              </div>
            </div>
            <Link href="/digitar-boleto" passHref={true}>
              <div className="flex items-baseline justify-center">
                <Button
                  label="Pagamento de boleto"
                  onClick={() => {
                    setBillData(null);
                    setCreditCardData(null);
                    setCardCode(null);
                  }}
                />
              </div>
            </Link>
            <Link href="/cadastro" passHref={true}>
              <div className="flex items-baseline justify-center">
                <Button
                  label="Cadastrar Cliente"
                  onClick={() => {
                    setBillData(null);
                    setCreditCardData(null);
                    setCardCode(null);
                  }}
                />
              </div>
            </Link>
            <Link href="/recuperar" passHref={true}>
              <div className="flex items-baseline justify-center">
                <Button
                  label="Recuperar senha de cliente"
                  onClick={() => {
                    setBillData(null);
                    setCreditCardData(null);
                    setCardCode(null);
                  }}
                />
              </div>
            </Link>
          </div>
        </Box>
      </Auth>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("session", session?.user);
  function redirect() {
    return {
      redirect: {
        destination: process.env.NEXTAUTH_URL,
        permanent: false,
      },
    };
  }

  if (!session) {
    return redirect();
  }
  if (!session?.user?.atendente) {
    return redirect();
  }

  return {
    props: {
      session,
    },
  };
}
