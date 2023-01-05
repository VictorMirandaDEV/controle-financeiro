import React, { useState } from "react";
import {
  PaymentDataReview,
  CreditCardForm,
  ResumeBilling,
  PaymentProof,
  CardCode,
  TokenTotp

} from "./pages";
import { usePayment } from "../../context/";
import { getBoletoByCode } from "../Scanner/boleto";

export default function Pagamento() {
  const [activeForm, setActiveForm] = useState("paymentReview");

  const [finish, setFinish] = useState({});
  const [cardCode, setCardCode] = useState("");

  const newBillData = getBoletoByCode(billData?.digitable);

  const dataBoleto = {
    type: newBillData?.type === "BANCO" ? 2 : 1,
    digitable: newBillData?.number,
    barCode: newBillData?.barcode,
  };


  const { billData } = usePayment();
  const valor = billData?.registerData?.totalUpdated
    ? billData.registerData.totalUpdated
    : billData?.valor;

  const forms = {
    paymentReview: (
      <PaymentDataReview changePage={(prop) => setActiveForm(prop)} />
    ),

    creditCardForm: (
      <CreditCardForm
        valor={valor}
        changePage={(prop) => setActiveForm(prop)}
      />
    ),

    cardCode:(
      <CardCode
      // valor={valor}
      changePage={(prop) => setActiveForm(prop)} 
      // cardCode={(prop)=>setCardCode(prop.cardCode)}
      />
    ),
    billingResume: (
      <ResumeBilling
        changePage={(prop) => setActiveForm(prop)}
        valor={valor}
        boleto={billData}
        dataBoleto={dataBoleto}
        // cardCode={cardCode}
        saveData={({
          cardProof,
          boleto,
          name,
          document,
          datePay,
          vencimento,
          id,
          convenant,
          nsu,
          value,
          originalValue,
          fees,
          installments,
          email
        }) =>
          setFinish({
            cardProof,
            boleto,
            name,
            document,
            datePay,
            vencimento,
            id,
            convenant,
            nsu,
            value,
            originalValue,
            fees,
            installments,
            email
          })
        }
      />
    ),
    paymentProof: (
      <PaymentProof
        cardProof={finish.cardProof}
        boleto={finish.boleto}
        name={finish.name}
        document={finish.document}
        datePay={finish.datePay}
        vencimento={finish.vencimento}
        id={finish.id}
        convenant={finish.convenant}
        nsu={finish.nsu}
        value={finish.value}
        originalValue={finish.originalValue}
        fees={finish.fees}
        installments={finish.installments}
        email={finish.email}
      />
    ),
  };

  return forms[activeForm];
}
