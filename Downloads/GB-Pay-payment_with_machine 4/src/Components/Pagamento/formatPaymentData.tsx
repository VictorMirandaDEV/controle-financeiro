import { formatCPFCNPJ, formatName } from "../../utils/formatters";
import creditCardType from "credit-card-type";
import { dataPayProps} from './services/cardAuthorizaton'
import { Fees } from "./services/fees";

type Props ={
  data:{creditCard:string, cpfCnpj:string, fullName:string, validade:string, installments:number},
  valor:number
}

type ReturnProps = {
  cardNumber: string,
  brand: {type:string}[],
  documentNumber: string,
  clientSplittedName: {
    firstName:string;
    lastName:string
  },
  expirationMonth: number,
  expirationYear: number,
  dataPay: dataPayProps
}

export const formatPaymentData:({data:valor}:Props)=>ReturnProps  = ({ data, valor }:Props) => {
  const { creditCard, cpfCnpj, fullName, validade, installments } = data;

  const cardNumber = creditCard.toString().replaceAll(" ", "");
  const brand = creditCardType(creditCard.toString().substring(0, 3));

  const documentNumber = formatCPFCNPJ(cpfCnpj);
  const [firstName, lastName] = formatName(fullName);

  const clientSplittedName = {
    firstName,
    lastName,
  };
  const expirationMonth = parseInt(validade.substring(0, 2));
  const expirationYear = parseInt(validade.replaceAll("/", "").substring(2, 4));

  const dataPay =
    installments === 1
      ? {
          amount:parseInt(((valor +(valor*Fees[installments-1].fees)) * 100).toFixed(0)),
        }
      : {
          amount:parseInt(((valor +(valor*Fees[installments-1].fees)) * 100).toFixed(0)),
          installments: installments,
        };

  return {
    cardNumber,
    brand,
    documentNumber,
    clientSplittedName,
    expirationMonth,
    expirationYear,
    dataPay,
   } as ReturnProps;
};
