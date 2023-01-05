import { payingBillete } from "../services/payingBillete";
import { confirmPayment } from "../services/confirmPayment";

import { cardAuthorization } from "../services/cardAuthorizaton";
import { Box, Button, Input, Mask, TitlePayment } from "../../CustomComponents";
import { useCardCode, useLoading, useModal, usePayment } from "../../../context";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DataBox } from "./dataBox";
import moment from "moment";
import { Fees } from "../services/fees";

import axios from "axios";
import { paynet } from "../../../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tokenSchema } from "../../../utils/validation";
import { tokenValidation } from "../services/tokenTotp";
import { LoginService } from "../services/login";

let payment_id;

type Props = {
  valor: number;
  changePage: (prop: any) => void;
  boleto: any;
  dataBoleto: any;
  saveData: any;
  // cardCode: string;
};

export const ResumeBilling = ({
  valor,
  changePage,
  boleto,
  saveData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { cardCode } = useCardCode();
  const { billData, creditCardData } = usePayment();
  const { setIsLoading } = useLoading();
  const { data: session } = useSession();
  const [password, setPassword] = useState("");

  const { setIsModalOpened, setModalData } = useModal();
  const { data } = useSession();
  // console.log(boleto);
  // console.log(valor);
  console.log(billData);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tokenSchema),
  });
  const idGB = data?.user?.image.toString();
  const name = data?.user?.name.toString();
  const handlePayment = async (data) => {
    // console.log("token", watch("token").replaceAll(" ","") );
    // let isValid = await tokenSchema.isValid(data);


    try {
      const {id, nome, email} = await LoginService({cpf: watch("cpf"), password:watch("password") });
      // alert(id);

    // const {msg}=await tokenValidation({token: watch("token").replaceAll(" ",""),id: idGB});

    // alert(msg);

    // let isValid = await tokenSchema.isValid(data);
    // if (isValid) {

        setIsLoading(true);
        let today = new Date();

        const { dueDate } = boleto;

        const { transactionId, convenant,authenticationAPI, receipt  } = await payingBillete({
          token: cardCode,
          documentNumber: "10480314000192",
          totalUpdated: boleto?.registerData?.totalUpdated
            ? boleto.registerData.totalUpdated
            : valor,
          accessToken: session.accessToken as string,
          data: boleto.barCode,
          dueDate: dueDate ? dueDate : today.toISOString(),
          transactionId: boleto.transactionId,
          totalWithAdditional: boleto?.totalWithAdditional
            ? boleto.totalWithAdditional
            : 0,
          totalWithDiscount: boleto?.totalWithDiscount
            ? boleto.totalWithDiscount
            : 0,
          fullName: nome,
          originalValue: boleto?.registerData?.originalValue
            ? boleto.registerData.originalValue
            : valor,
          paynetId: cardCode,
          fees:Fees[installments].fees,
          client_id: id,
          description: billData.description,
        });

        // let message;
        // const { message } = await confirmPayment({
        // 	transactionId,
        // 	accessToken: session.accessToken as string,
        // });

        const payDate = moment();
        // if (message.toLowerCase() == "sucesso") {
          saveData({
            cardProof: cardCode,
            boleto: boleto.digitable,
            name: nome,
            document: "10480314000192",
            vencimento: boleto?.dueDate,
            datePay: payDate,
            id: authenticationAPI.BlocoCompleto,
            convenant: convenant,
            nsu: receipt?.receiptformatted,
            value:
              valor + valor * Fees[installments].fees,
            originalValue: valor,
            fees: Fees[installments].fees,
            installments: installments ? installments : 0,
            email
          });

          setIsLoading(false);
          changePage("paymentProof");
        // }
      
        
      } catch (error) {
        // console.error(error);
        if (payment_id != null) {
          await axios.post(paynet + "/cancel/" + payment_id);
          payment_id = null;
        }
        // console.log(error.response?.data);
        setModalData({
          errorCode: error.response?.status,
          errorMessage: "Falha ao finalizar o pagamento",
          errorDescription: error.response?.data?.msg
            ? error.response?.data.msg
            : error.response?.data?.error
            
            // : error.response?.data,
        });
        setIsModalOpened(true);
        setIsLoading(false);
        setLoading(false);

        payment_id = null;
      }

  };
  // const { dataPay }=creditCardData
  const { installments } = creditCardData;

  // console.log(installments);
  const pgtoCartao = installments
    ? `R$${(valor + valor * Fees[installments].fees)
        .toFixed(2)
        .toString()
        .replace(".", ",")} (${installments}X R$${(
        (valor + valor * Fees[installments].fees) /
        installments
      )
        .toFixed(2)
        .toString()
        .replace(".", ",")})`
    : `R$${(valor + valor * Fees[0].fees)
        .toFixed(2)
        .toString()
        .replace(".", ",")} `;

  function formatCnpjCpf(value) {
    const cnpjCpf = value.replace(/\D/g, "");

    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    return cnpjCpf.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
    );
  }

  const vencimento = boleto.dueDate
    ? moment(boleto.dueDate).add(1, "days").format("DD/MM/YYYY")
    : "Não informado";
  // console.log(vencimento);

  const beneficiario = boleto.registerData
    ? boleto.registerData.recipient
    : "Não informado";
  return (
    <>
      <Box>
        <TitlePayment
          title="Resumo de Pagamento"
          click={() => changePage("cardCode")}
        />

        <div className="mt-[15px]">
          <DataBox label="Transação" value={boleto.transactionId} />
          <DataBox
            label="Data de Pagamento"
            value={moment().format("DD/MM/YYYY")}
          />
          <DataBox
            label="Valor do boleto"
            value={`R$${valor.toFixed(2).toString().replace(".", ",")} `}
          />
          {/* <DataBox
            label="Juros"
            value={`${(
              Fees[installments].fees * 100
            ).toFixed(2)}%`}
          /> */}
          <DataBox
            label="Total pago"
            value={`R$${(
              valor +
              valor * Fees[installments].fees
            )
              .toFixed(2)
              .toString()
              .replace(".", ",")} `}
          />
        </div>

        <div className="mt-[15px]">
          <DataBox label="Descrição" value={"Descrição do Pgto"} />
          <DataBox label="Vencimento" value={vencimento} />
          <DataBox label="Beneficiário" value={beneficiario} />
          <DataBox label="Pagador" value={data?.user.name} />
          {/* <DataBox label="Documento do Pagador" value={formatCnpjCpf(creditCardData.documentNumber)} /> */}
          <DataBox
            label="Valor do documento"
            value={`R$${valor.toFixed(2).toString().replace(".", ",")} `}
          />
        </div>

        <form onSubmit={handleSubmit(handlePayment)}>
            {/* <Mask
              label="Token do dispositivo"
              nome="token"
              register={register}
              className="flex-1 w-auto py-2  focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none text-center"
              format={"# # # # # #"}
              
              controle={control}
              placeholder="_ _ _ _ _ _"
              mask={["_", "_", "_", "_", "_", "_"]}
              message={errors.token?.message}
            /> */}
            <div className="mt-4 flex justify-center items-center">
            <Mask
              controle={control}
              format="###.###.###-##"
              type="text"
              nome="cpf"
              label="CPF"
              register={register}
              message={errors.cpf?.message}
            />
          </div>
              <div className="mt-4 flex justify-center items-center">
            <Input nome={"password"} label="Senha" type="password" register={register}/>
            <span className="text-red-500 text-xs italic">
              {/* {errors.token?.message} */}
              {errors.token?.password}
            </span>
          </div>

          <Button label="Pagar" 
          type="button"  
          onClick={handlePayment}
           />
        </form>
      </Box>
    </>
  );
};
