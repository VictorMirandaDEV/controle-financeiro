import React from "react";

import { useSession, getSession } from "next-auth/react";
import Loading from "../Components/Loading";
import { useRouter } from "next/router";
import { Auth } from "./_app";
import { TypeScreen } from "../Components/TypeScreen";
import Pagamento from "../Components/Pagamento";
import { usePayment } from "../context";

export default function Page() {
  const { status } = useSession();
  const { validateBillInfo, billData } = usePayment();
// log("billData", validateBillInfo);
  if (status === "authenticated") {
    return  (
      !billData ? (
      <Auth>
            <TypeScreen  onSubmit={validateBillInfo} />
      </Auth>
  ) : (
      <Auth>
    <Pagamento />
      </Auth>
    )
    );
  }
  if (status === "loading")return <Loading />
      
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