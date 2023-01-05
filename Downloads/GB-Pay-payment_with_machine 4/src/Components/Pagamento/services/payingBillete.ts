import api from "../../../api";

type paymentProps = {
  totalUpdated: number;
  originalValue: number;
  totalWithDiscount: number;
  totalWithAdditional: number;
  fullName: string;
  documentNumber: string;
  data: barCodeProps;
  dueDate: Date;
  transactionId: number;
  accessToken: string;
  paynetId: string;
  token: number;
  client_id: number;
  fees: number;
  description: string;
};

type barCodeProps = {
  type: number;
  digitable: string;
  barCode: string;
};

type responseProps = {
  isExpired: boolean;
  authentication: number;
  convenant: string;
  authenticationAPI: {
    Bloco1: string;
    Bloco2: string;
    BlocoCompleto: string;
  };
  receipt: {
    receiptData: string;
    receiptformatted: string;
  };
  settleDate: Date;
  createDate: Date;
  transactionId: number;
  Urlreceipt: any;
  errorCode: string;
  message: any;
  status: number;
};

export const payingBillete = async ({
  token,
  documentNumber,
  totalUpdated,
  originalValue,
  totalWithDiscount,
  totalWithAdditional,
  fullName,
  data,
  dueDate,
  transactionId,
  accessToken,
  paynetId,
  client_id,
  fees,
  description
}: paymentProps) => {
  const response = await api.post(
    `/pagamentos/efetua2`,

    {
      convenant: "string",
      externalNSU: 1,
      cpfcnpj: documentNumber,
      billData: {
        value: totalUpdated,
        originalValue: originalValue,
        valueWithDiscount: totalWithDiscount,
        valueWithAdditional: totalWithAdditional,
      },
      infoBearer: {
        nameBearer: fullName,
        documentBearer: documentNumber,
        methodPaymentCode: 2,
      },
      barCode: data,
      dueDate: dueDate,
      transactionIdAuthorize: transactionId,
      userType: 1,
      corban: "",
      paynetId,
      cliente:{
        id:client_id
      },
      fees,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data as responseProps;
};
