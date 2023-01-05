// import axios from "axios";
import api from "../../../api";

// Language: typescript
type tokenProps = {
  token: string;
  id: string;
};
type tokenResponseProps = {
  msg: string;
  delta?: number;
};

export const tokenValidation = async ({ token, id }: tokenProps) => {
  const response = await api
    .post(
      `/token/verify`,
      {
        token,
        id
      },
      {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*"
        },
      }
    )

  return response.data as tokenResponseProps;
};
