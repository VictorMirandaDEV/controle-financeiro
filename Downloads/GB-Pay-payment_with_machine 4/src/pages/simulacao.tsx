import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { Box, Button, Mask, Title, TitlePayment } from "../Components/CustomComponents"
import { Fees } from "../Components/Pagamento/services/fees";
import { boletoSchema } from "../utils/validation";

export const Simulacao = () => {

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(boletoSchema),
  });

  const [simulacao1, setSimulacao1] = useState<string>("R$ 20,40");
  const [valor, setValor] = useState<number>(20.40);
  const [show, setShow] = useState(false);

  const handleSimulation = () => {
    let value1 = simulacao1.replace("R$ ", "").replaceAll(".", "");

    let value = parseFloat(value1.replace(",", "."));

    setShow(true);

    if (value == 0) {
      setShow(false);
    }
    if (value == NaN) {
      setShow(false);
    }
    if (value == undefined) {
      setShow(false);
    }
    if (value == null) {
      setShow(false);
    }
    if(simulacao1==""){
      setShow(false);
    }

    return setValor(value);

  }

  const fees = [
    valor + valor * Fees[0].fees,
    valor + valor * Fees[1].fees,
    valor + valor * Fees[2].fees,
    valor + valor * Fees[3].fees,
    valor + valor * Fees[4].fees,
    valor + valor * Fees[5].fees,
    valor + valor * Fees[6].fees,
    valor + valor * Fees[7].fees,
    valor + valor * Fees[8].fees,
    valor + valor * Fees[9].fees,
    valor + valor * Fees[10].fees,
    valor + valor * Fees[11].fees,
    valor + valor * Fees[12].fees,
  ];


  return (

    <Box notShow={true} >
      <TitlePayment title="Simulação de valores" click={Router.back} />
      <NumberFormat format={null}
        // value={2002.50}
        defaultValue={parseFloat(simulacao1) as number}
        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        decimalScale={2}
        fixedDecimalScale={true}
        name="simulacao"
        prefix={"R$ "}
        autoFocus={true}
        decimalSeparator=","
        thousandSeparator={"."}
        onChange={(e) => setSimulacao1((e.target.value))}
        placeholder="R$ 20,40"
      />
      <Button label={"Simular os Valores"} onClick={(handleSimulation)} />
      {show && (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-1 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-button-submit px-6 py-4 text-left">
                        Parcela
                      </th>
                      <th scope="col" className="text-sm font-medium text-button-submit px-6 py-4 text-left">
                        Valor da Parcela
                      </th>
                      <th scope="col" className="text-sm font-medium text-button-submit px-6 py-4 text-left">
                        Valor Final
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee, index) => (
                      <tr className="border-t" key={index}>
                        <td className="text-sm text-gray-900 font-Tw px-6 py-2 ">
                          {index === 0 ? "Debito" : `Crédito ${index}X`}
                        </td>
                        <td className="text-sm text-gray-900 font-Tw px-6 py-2 ">
                          {
                            index >= 1 ?

                              [index] + "X de R$" + (fee / index).toFixed(2).toString().replace(".", ",")
                              :
                              "R$ " + fee.toFixed(2).toString().replace(".", ",")
                          }
                        </td>
                        <td className="text-sm text-gray-900 font-Tw px-6 py-2 whitespace-nowrap">
                          R$ {fee.toFixed(2).toString().replace(".", ",")}
                        </td>
                      </tr>
                    ))}


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
      }
      
    </Box>
  )
}

export default Simulacao