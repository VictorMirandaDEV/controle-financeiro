import api from "../../../api";

type confirmProps ={
    transactionId: number;
    accessToken: string;
}

type responseProps ={
	errorCode: string,
	message: string,
	status: number
}

export const confirmPayment = async ({ transactionId, accessToken }:confirmProps) => {
 const response = await api.put(`/pagamentos/confirma/${transactionId}`,
    { externalNSU: 0 },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data as responseProps;
};

