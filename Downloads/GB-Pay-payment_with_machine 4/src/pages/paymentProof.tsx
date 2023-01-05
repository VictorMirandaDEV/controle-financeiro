import React from "react";
import moment from "moment";
import { PaymentProof } from "../Components/Pagamento/pages/paymentProof";

export default function Comprovante() {
  return (
    <>
      <PaymentProof
        value={50.66}
        name="Marcus Vinícius peixoto paulo"
        document="00703573233"
        id="fa98b26e-4488-4f32-a2fb-76c8eb835340"
        cardProof="51c3e1d5-ff5b-42d9-9cba-5963f6669ea2"
        convenant="0932840983204923840239840"
        nsu="000000240107"
        boleto="34191092633781358252750059440003689350000056874"
        datePay={moment()}
        vencimento=""
        fees={0.1355}
        originalValue={40}
        installments={1}
        email="mvp.paulo@gmail.com"
      />
    </>
  );
}
