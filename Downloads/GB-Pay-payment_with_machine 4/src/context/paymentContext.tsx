import { createContext, useContext, useEffect, useState } from "react";
import { CreditCardProps, BillDataProps, BroletoProps } from "./types";
import { getBoletoByCode } from "../Components/Scanner/boleto";
import api from "../api";
import { useModal, useLoading } from "../context/";
import { useSession } from "next-auth/react";
import Router from "next/router";
type PaymentContextProps = {
  creditCardData: CreditCardProps;
  setCreditCardData: (props: CreditCardProps) => void;
  billData: BillDataProps;
  setBillData: (props: BillDataProps) => void;
  validateBillInfo: (code: string, description?:string) => void;
};

const PaymentContext = createContext<PaymentContextProps>(
  {} as PaymentContextProps
);

const PaymentProvider = ({ children }: { children: JSX.Element }) => {
  const [creditCardData, setCreditCardData] = useState<CreditCardProps>();
  const [billData, setBillData] = useState<any>();
  const { data: session } = useSession();
  const { setModalData, setIsModalOpened } = useModal();
  const { setIsLoading } = useLoading();
  const token =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("gp-pay-userinfo"))
      : "";
  const getBillDateInfoFromBackend = async (barCode) => {
    try {
      const response = await api.post(
        "/pagamentos/consulta",
        {
          externalNSU: 0,
          barCode: barCode,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      // console.log(error);
      Router.push("/boleto");

      setModalData({
        errorCode: error.response?.status,
        errorMessage: "Falha ao consultar o boleto",
        errorDescription: error.response?.data,
      });
      setIsModalOpened(true);
      setIsLoading(false);
    }
  };

  const validateBillInfo = async ( code:string, description?:string ) => {
    setIsLoading(true);
    const data = getBoletoByCode(code);
    const sub = data ? data.valido.mensagem : "";

    const newBillData = sub == "Boleto válido" ? data : null;

    const barCode = {
      type: newBillData.type === "BANCO" ? 2 : 1,
      digitable: newBillData.number,
      barCode: newBillData.barcode,
    };
    const res = await getBillDateInfoFromBackend(barCode);
    setBillData({
      ...res,
      valor: newBillData?.valido?.valor || res.value,
      barCode,
      description
    });
    setIsLoading(false);
    //  setBillData(getBoletoByCode(code))
  };

  return (
    <PaymentContext.Provider
      value={{
        creditCardData,
        setCreditCardData,
        billData,
        setBillData,
        validateBillInfo,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

function usePayment() {
  const context = useContext<PaymentContextProps>(PaymentContext);

  if (!context) {
    throw new Error(
      "usePayment card most be used whitin an PaymentContext Provider"
    );
  }

  return context;
}

export { PaymentProvider, usePayment };
