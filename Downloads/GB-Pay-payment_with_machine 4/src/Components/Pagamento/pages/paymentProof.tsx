import React from "react";

import Link from "next/link";
import moment, { Moment } from "moment";
import "moment/locale/pt-br";
import NumberFormat from "react-number-format";
import pdfMake from "../services/pdfMake";
import { Button } from "../../CustomComponents";
import emailjs from "emailjs-com";
import { OkImage } from "../../Icons/okimage";
moment.locale("pt-br");

type Props = {
  value: number;
  name: string;
  document: string;
  id: string;
  datePay: Moment;
  vencimento?: string;
  cardProof: string;
  convenant: string;
  nsu: string;
  boleto: string;
  originalValue: number;
  fees: number;
  installments: number;
  email: string;
};

export const PaymentProof = ({
  value,
  name,
  document,
  id,
  datePay,
  vencimento,
  cardProof,
  convenant,
  nsu,
  boleto,
  originalValue,
  fees,
  installments,
  email
}: Props) => {
  const template = {
    to_name: name,
    to_email: email,
    // format message nsu with \n to break line \r to break page
    message: nsu?.replace(/\\n/g, " ").replace(/\\r/g, " "),
  };

  const [buttonEmail, setButtonEmail] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const sendEmail = () => {
    // e.preventDefault();
    // emailjs.init('rBZ3pcj53KkjWtn_T')
    setLoading(true);

    emailjs
      .send(
        "service_t73oovn",
        "template_ohaesbe",
        template,
        "rBZ3pcj53KkjWtn_T"
      )
      .then(
        (result) => {
          console.log(result.text);
          setButtonEmail(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const labelLeft = "font-bold";

  const input =
    "flex-1 w-full py-2 border-b-2 border-blue-400 focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none";
  const label =
    "block font-Tw py-1  text-lg flex items-baseline justify-center flex-col";
  const label1 = "text-gray font-thin";
  const label2 = "text-gray font-thin text-sm";

  function formatCnpjCpf(documentValue: string) {
    const cnpjCpf = documentValue.replace(/\D/g, "");

    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    return cnpjCpf.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
    );
  }
  const vencimentoDate = vencimento
    ? moment(vencimento).add(1, "days").format("DD/MM/YYYY")
    : "Não informado";

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100 ">
      <div className="px-8  py-6 mt-4 text-left bg-white shadow-lg">
        <div className="mt-4 ">
          <div className="flex items-center justify-center">
            <OkImage />
          </div>
          <div className="flex  justify-center">
            {/* <Image src={logo}  width={273} height={71} />
             */}
            <label className="flex text-center items-center justify-center w-full font-bold font-Tw py-1  text-3xl">
              {" "}
              Comprovante de Pagamento
            </label>
          </div>
          <div className="flex items-baseline justify-center">
            {/* <label className="flex items-center justify-center w-full text-gray font-semibold font-Tw py-1  text-1xl">
                  {moment().format("DD [de] MMMM [de] YYYY [às] H[h]")} 
                </label> */}
          </div>
          <div className="w-full flex my-4  justify-center border-t border-gray text-xs font-Tw" />
          {/* <h3 className="text-2xl font-bold text-center">Login to your account</h3> */}
          {/* <form action> */}
          {/* <Link href='/boletoRead' passHref={true}> */}
          <div className="mt-4 ">
            <div className="flex items-start justify-start">
              {/* <div className=""> */}
              <div className="flex items-baseline justify-center flex-col">
                {/* <div className={label}>
                  <label className={label1}>Valor Pago</label>
                  <label className={labelLeft}>
                    R${value.toFixed(2).toString().replace(".", ",")}
                  </label>
                </div> */}
                <div className={label}>
                  <label className={label1}>Valor</label>
                  <label className={labelLeft}>
                    R${originalValue.toFixed(2).toString().replace(".", ",")}
                  </label>
                </div>
                {/* <div className={label}>
                  <label className={label1}>Parcelas</label>
                  <label className={labelLeft}>
                    {installments >= 1
                      ? `${installments}X de R$${(value / installments)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")} no cartão de Crédito`
                      : "No Débito"}
                  </label>
                </div> */}
                {/* <div className={label}>
                  <label className={label1}>Juros</label>
                  <label className={labelLeft}>
                    {(fees * 100).toFixed(2).toString().replace(".", ",")}%
                  </label>
                </div> */}
                <div className={label}>
                  <label className={label1}>Quem vai receber</label>
                  <label className={label2}>Nome da empresa</label>
                  <label className={labelLeft}>GB Pay - Empresa Credenciada pela COSANPA.</label>
                </div>
                <div className={label}>
                  <label className={label1}>Quem pagou</label>
                  <label className={label2}>Nome</label>
                  <label className={labelLeft}>{name.toUpperCase()}</label>
                </div>
                <div className={label}>
                  <label className={label1}>Data de Pagamento</label>
                  <label className={labelLeft}>
                    {moment(datePay).format("DD/MM/YYYY [ás] HH:mm:ss")}
                  </label>
                </div>
                <div className={label}>
                  <label className={label1}>Vencimento</label>
                  <label className={labelLeft}>{vencimentoDate}</label>
                </div>
                <div className={label}>
                  <label className={label1}>CPF/CNPJ</label>
                  <label className={labelLeft}>{formatCnpjCpf(document)}</label>
                </div>

                <div className={label}>
                  <label className={label1}>Autenticação bancária</label>
                  <label className={labelLeft}>{id}</label>
                </div>
                {/* <div className={label}>
                  <label className={label1}>Comprovante do Cartão</label>
                  <label className={labelLeft}>{cardProof}</label>
                </div> */}
                <div className={label}>
                  <label className={label1}>Agência/Operação/Conta</label>
                  <label className={labelLeft}>{convenant}</label>
                </div>
                {/* {nsu && (
                  <div className={label}>
                    <label className={label1}>NSU</label>
                    <label className={labelLeft}>{nsu}</label>
                  </div>
                )} */}
                <div className={label}>
                  <label className={label1}>Código de barras</label>
                  <label className={labelLeft}>
                    <NumberFormat
                      displayType="text"
                      value={`${boleto}`}
                      format="
                              #####.#####
                              #####.###### 
                              #####.###### # 
                              ############## #"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center mx-4 px-4 flex-row">
          {/* <Button
            label="Gerar PDF"
            className="w-full px-2 py-2 my-8 mx-2 text-white text- font-semibold bg-button-submit rounded-lg hover:bg-gray font-Tw"
            onClick={() =>
              pdfMake({
                value,
                name,
                document,
                id,
                datePay,
                vencimento,
                cardProof,
                convenant,
                nsu,
                boleto,
                originalValue,
                fees,
                installments,
              })
            }
          /> */}
                    {!buttonEmail ? (

                      <Button
                      
                      label={loading ? "Enviando" : "Enviar por e-mail"}
                      className="w-full px-2 py-2 my-8 mx-2 text-white text- font-semibold bg-button-submit rounded-lg hover:bg-gray font-Tw"
                      onClick={(e) => {
                        e.preventDefault()
                        sendEmail()
                      }}
                      >
                                 {loading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="currentColor"
                  strokeWidth={4}
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
                      </Button>
                    ):
                    (
                      <Button
                      label="Enviado"
                      className="w-full px-2 py-2 my-8 mx-2 text-white text- font-semibold bg-button-submit rounded-lg font-Tw cursor-not-allowed"
                      />
                    )
                    }

          <Link href="/boleto" passHref>
            <Button
              label="Voltar para pagina inicial"
              className="w-full px-2 py-2 my-8 mx-2 text-white text- font-semibold bg-button-submit rounded-lg hover:bg-gray font-Tw"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};