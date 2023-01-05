import "../../styles/globals.css";
import "../../build.css";

import "../../styles/styles.css";
import "react-boleto-reader/dist/index.css";

import { Helmet } from "react-helmet";
import { AppProvider } from "../context";
import { useSession } from "next-auth/react";
import Loading from "../Components/Loading";
import HeaderInfo from "../Components/Header";
import Deslogar from "../Components/Logoff";
import Router from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "pt-BR" }}
        title="GB PAY"
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          { property: "og:title", content: "GB PAY" },
        ]}
      />
      
      <AppProvider session={session}>
        {Component.auth ? (
          <Auth>
            <HeaderInfo />
            <Component {...pageProps} />
            <Deslogar />
          </Auth>
        ) : (
          <><HeaderInfo /><Component {...pageProps} /></>
        )}
      </AppProvider>
    </>
  );
}

export function Auth({ children, session }) {
  const { status } = useSession({ required: true });
  const isUser = !!session;
  // console.log("status", status);
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return Router.push("/");
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return children;
}

export const getServerSideProps = async (context) => {
  const token = await getToken(context);
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: process.env.NEXTAUTH_URL,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      token,
      // status: await getSession(context)
    },
  };
  // return {
  //   props: {
  //   } };
};
