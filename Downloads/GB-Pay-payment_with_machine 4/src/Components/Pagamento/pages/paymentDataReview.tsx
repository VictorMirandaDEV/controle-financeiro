
import { useState } from "react";
import Router from "next/router";
import { Barcode } from "../../Icons/barcode";
import moment from "moment";
import { usePayment } from "../../../context";
import { Box,  Button,  TitlePayment } from "../../CustomComponents";

type Props = {
  changePage: (prop: any) => void;
};

export const PaymentDataReview = ({ changePage }: Props) => {
  const { billData } = usePayment();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [confirmar, setConfirmar] = useState(false);
  const label = "font-Tw text-gray flex w-full justify-between";
  const labelLeft = "text-slate-800 text-right mx-4";



  function handleBoleto() {
    changePage("creditCardForm");
    return setConfirmar(!confirmar);
  }

  return (
    <Box>

      <TitlePayment
        click={() => Router.push("/boleto")}
        title="Novo Pagamento"
      />

      <div className="mt-4">
        <div className="flex items-start justify-start">
          <div className=" p-2 m-1 w-20 h-20 bg-button-submit rounded-full flex items-center justify-center">
            <Barcode />
          </div>
          <div className="block m-2 ">
            <div className="block ">
              <label className="font-medium">Pagar conta</label>
            </div>
            <label className=" text-2xl text-green-500 font-bold">
              R$
              {billData.registerData?.totalUpdated
                ? billData.registerData?.totalUpdated
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                : billData.valor.toFixed(2).toString().replace(".", ",")}
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex py-4 mt-6  justify-center border-t border-gray text-xs font-Tw"></div>
      <div className={label}>
        <label>Data de Pagamento</label>
        <label className={labelLeft}>{moment().format("DD/MM/yyyy")}</label>
      </div>
      <div className={label}>
        <label>Beneficiário</label>
        <label className={labelLeft}>
          {billData.assignor != "Unknown" ? billData.assignor : "Não informado"}
        </label>
      </div>
      <>
        <div className={label}>
          <label>Vencimento</label>
          <label className={labelLeft}>
            {billData?.dueDate
              ? moment(billData.dueDate).add(1,"days").format("DD/MM/YYYY")
              : "sem vencimento"}
          </label>
        </div>
      </>
      <div className={label}>
        <label className="text-left">Forma de Pagamento</label>
        <label className={labelLeft}>Cartão</label>
      </div>

      <div className="flex items-baseline justify-center">
        <Button label="Confirmar" onClick={handleBoleto} />
      </div>
    </Box>
  );
};
