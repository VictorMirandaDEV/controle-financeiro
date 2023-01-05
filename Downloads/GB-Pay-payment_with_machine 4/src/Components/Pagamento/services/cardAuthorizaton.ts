import axios from "axios";
import { paynet , paynet_cnpj } from "../../../api";

type brandProps = {
  type: string;
};
export type dataPayProps = {
  amount: number;
  installments?: number;
};

export type cardAuthorizationProps = {
  cardNumber: string;
  fullName: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  expirationMonth: number;
  expirationYear: number;
  securityCode: string;
  brand: brandProps[];
  dataPay: dataPayProps;
};

type paymentProps = {
  paymentId: string;
  status: string;
  nsu: string;
  returnCode: string;
  authorizationCode: string;
  orderNumber: string;
  retryAfter: number;
  createAt: number;
  amount: number;
  description: string;
  id: string;
  document: string;
};

export const cardAuthorization = async ({
  cardNumber,
  fullName,
  firstName,
  lastName,
  documentNumber,
  expirationMonth,
  expirationYear,
  securityCode,
  brand,
  dataPay
}:cardAuthorizationProps) => {
  const response = await axios.post(paynet+
    "/authorize",
    {
      card: {
        cardNumber,
        cardHolder: fullName,
        cardHolderDocument: documentNumber,
        expirationMonth,
        expirationYear,
        securityCode: securityCode,
        brand: brand[0].type,
      },
      payment: dataPay,
      customer: {
        firstName,
        lastName,
        documentNumber: paynet_cnpj 
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },
    }
  );

  return response.data as paymentProps;
};
