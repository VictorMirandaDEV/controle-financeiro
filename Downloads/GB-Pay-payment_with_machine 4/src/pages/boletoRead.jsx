import { useSession, getSession } from "next-auth/react";
import React from "react";
import Camera from "../Components/Camera";
import Loading from "../Components/Loading";
import { Auth } from "./_app";

export default function CameraBoleto() {
	const { status } = useSession();
	
	if (status === "loading") return <Loading />;
	if (status === "authenticated") {
		return<>
		 <Auth>
		 <Camera />
		 </Auth>
		</>
	}
	
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