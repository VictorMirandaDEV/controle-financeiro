import moment from 'moment';
import React from 'react';
import { Box, Button, Input, Mask, MaskSimple, TitlePayment } from '../../CustomComponents';
import { Fees } from '../services/fees';
import { DataBox } from './dataBox';
import { useSession } from "next-auth/react";



export const TokenTotp = ({ }: any) => {
  let valor = 50.79;
  let installments = 6;
  const { data } = useSession();
  const [token, setToken] = React.useState('');
  return (
    <>
      <Box>
        <TitlePayment
          title="Resumo de Pagamento"
        // click={() => changePage("billingAddressForm")}
        />

        <div className="mt-[15px]">
          {/* <DataBox label="Transação" value={boleto.transactionId} /> */}
          <DataBox label="Data de Pagamento" value={moment().format("DD/MM/YYYY")} />
        </div>

        <div className="mt-[15px]">
          {/* <DataBox label="Final do Cartão de Crédito" value={creditCardData.cardNumber.substring(creditCardData.cardNumber.length -4)} /> */}
          {/* <DataBox label="Pgto. Cartão" value={pgtoCartao} /> */}
          {/* <DataBox label="Juros" value={`${(Fees[installments ?installments-1 :0].fees *100).toFixed(2)}%`} /> */}
          <DataBox label="Valor do boleto" value={`R$${(valor).toFixed(2).toString().replace(".", ",")} `} />
          <DataBox label="Total pago" value={`R$${(valor + (valor * Fees[installments ? installments - 1 : 0].fees)).toFixed(2).toString().replace(".", ",")} `} />
        </div>

        <div className="mt-[15px]">
          <DataBox label="Descrição" value={"Descrição do Pgto"} />
          {/* <DataBox label="Vencimento" value={vencimento} /> */}
          <DataBox label="Vencimento" value={moment().format("DD/MM/YYYY")} />
          <DataBox label="Beneficiário" value={"Beneficiario"} />
          <DataBox label="Pagador" value={data?.user.name} />
          {/* <DataBox label="Documento do Pagador" value={formatCnpjCpf(creditCardData.documentNumber)} /> */}
          <DataBox label="Valor do documento" value={`R$${(valor).toFixed(2).toString().replace(".", ",")} `} />
        </div>
        <div className='mt-4 flex justify-center items-center'>

          <MaskSimple label='Token do dispositivo' nome={token} 
          className="flex-1 w-auto py-2  focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none text-center" 
          format={'# # # # # #'}
          placeholder="# # # # # #"
          mask={["#", "#", "#", "#", "#", "#"]} />
        </div>

        <Button label="Pagar" type="button" onClick={() => { }} />

      </Box>
    </>
  );
};

