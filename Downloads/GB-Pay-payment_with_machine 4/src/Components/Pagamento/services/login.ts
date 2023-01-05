import api from "../../../api";

type Props={
  cpf: string;
  password: string;
}

type ResponseProps={
	id: number;
	nome: string;
	cpf: string;
	email: string;
	accessToken: string;
	tokenType: string;
}

 export const LoginService = async({cpf, password}:Props) => {
  const response = await api.post("/auth/login", {
    cpf: cpf
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", ""),
    senha:password,
  });

  return response.data as ResponseProps;
}