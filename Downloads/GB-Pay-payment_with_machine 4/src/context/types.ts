type brandProps = {
    type: string;
  };
  export type dataPayProps = {
    amount: number;
    installments?: number;
  };
  
  export type CreditCardProps = {
    installments?: number;
    // cardNumber: string;
    // fullName: string;
    // firstName: string;
    // lastName: string;
    // documentNumber: string;
    // expirationMonth: number;
    // expirationYear: number;
    // securityCode: string;
    // brand: brandProps[];
    // dataPay: dataPayProps;
  };

  type RegisterDataProps ={
    originalValue?:number;
    totalUpdated?:number;
    totalWithDiscount?:number;
    totalWithAdditional?:number;
    recipient?:string;
}

export type BillDataProps = {
    dueDate?:Date;
    value:number;
    assignor:string;
    registerData?:RegisterDataProps
    transactionId:number;
    type:number;
    banks:string;
    digitable:string;
    valor:number;
    description?:string;
}

type ValidProps ={
  sucesso:string
  codigoInput:string
  mensagem:string
  tipoCodigoInput:string
  tipoBoleto:string
  codigoBarras:string
  linhaDigitavel:string
  vencimento:Date
  valor:number
}

export type BroletoProps ={
  type:string;
  number:string;
  barcode:string;
  expirationDate:Date | null;
  banks:string;
  valido:ValidProps
  amount:number

}