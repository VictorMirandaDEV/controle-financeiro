import Image from "next/image";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import { cartaoCreditoEnderecoSchema } from "../../../utils/validation";
import arrowLeft from "../../../../assets/arrow-left.png";
import { formatPaymentData } from "../formatPaymentData";
import { cardAuthorizationProps } from "../services/cardAuthorizaton";
import { CreditCardProps } from "../../../context/types";
import { Fees } from "../services/fees";

import { useEffect, useState } from "react";
import { usePayment } from "../../../context";
import {
  Box,
  Button,
  Input,
  Mask,
  TitlePayment,
  Dropdown,
} from "../../CustomComponents";
import {
  UserIcon,
  CreditCardIcon,
  CalendarIcon,
  LockOpenIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

type Props = {
  valor: number;
  changePage: (prop: any) => void;
  // saveCreditCardData:(Props:cardAuthorizationProps)=>void;
};

export const CreditCardForm = ({ valor, changePage }: Props) => {
  //const onBackwardClick = () => // console.log("onBackwardClick actived");
  let { setCreditCardData, creditCardData }: any = usePayment();

  const [installments, setInstallments] = useState(1);

  useEffect(() => {
    if (creditCardData != null) {
      setValue("installments", creditCardData?.installments, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setInstallments(creditCardData?.installments)
    }

  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(cartaoCreditoEnderecoSchema),
  });

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

  const installmentsOptions = [
    {
      value: 0,
      label: `Débito de R$
     ${fees[0].toFixed(2).toString().replace(".", ",")}`,
    },
    {
      value: 1,
      label: `Cartão de Crédito 1x de R$
     ${fees[1].toFixed(2).toString().replace(".", ",")}`,
    },
    {
      value: 2,
      label: `Cartão de Crédito 2x de R$
     ${(fees[2] / 2).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[2].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 3,
      label: `Cartão de Crédito 3x de R$
     ${(fees[3] / 3).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[3].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 4,
      label: `Cartão de Crédito 4x de R$
     ${(fees[4] / 4).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[4].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 5,
      label: `Cartão de Crédito 5x de R$
     ${(fees[5] / 5).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[5].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 6,
      label: `Cartão de Crédito 6x de R$
     ${(fees[6] / 6).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[6].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 7,
      label: `Cartão de Crédito 7x de R$
     ${(fees[7] / 7).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[7].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 8,
      label: `Cartão de Crédito 8x de R$
     ${(fees[8] / 8).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[8].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 9,
      label: `Cartão de Crédito 9x de R$
     ${(fees[9] / 9).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[9].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 10,
      label: `Cartão de Crédito 10x de R$
     ${(fees[10] / 10).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[10].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 11,
      label: `Cartão de Crédito 11x de R$
     ${(fees[11] / 11).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[11].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
    {
      value: 12,
      label: `Cartão de Crédito 12x de R$
     ${(fees[12] / 12).toFixed(2).toString().replace(".", ",")}, total de R$
     ${fees[12].toFixed(2).toString().replace(".", ",")}
     
     `,
    },
  ];

  const handleAddNewCreditCard = async (data) => {
    // console.log("data", data);
    const isValid = await cartaoCreditoEnderecoSchema.isValid(data);

    if (isValid) {
      setCreditCardData({
        installments: creditCardData.installments,
      });

      changePage("cardCode");
    }
  };
  // console.log(installments);
  useEffect(() => {
    setCreditCardData({installments: installments});
  }
  , [installments]);

  {
    /* <Controller
                    control={control}
                    defaultValue={creditCardInfo.installments}
                    name={creditCardInfo.installments}
                    {...register("installments", {
                      required: true,
                      onChange: (e) =>
                        setCreditCardInfo((prev) => ({
                          ...prev,
                          installments: Number(e.target.value),
                        })),
                    })}
                    render={({ field: { onChange, name, value } }) => (
                      <Dropdown
                        options={installmentsOptions}
                        name={name}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  /> */
  }

  return (
    <Box>
      <TitlePayment
        click={() => {
          changePage("paymentReview");
        }}
        title="Forma de Pagamento"
      />
      <div className="">
        <div className="flex items-center justify-center">
          <form>
            <div className="mt-4">
              <div>
                {installmentsOptions.map((option) => (
                  <div key={option.value.toString()}>
                    <div className="flex items-center px-4 py-1 rounded  ">
                      <input
                        id={option.value.toString()}
                        type="radio"
                        value={option.value}
                        name={"installments"}
                        // checked={installments === option.value ? true : false}
                        // register={register}
                        onClick={(e) => {
                          setInstallments(Number((e.target as HTMLInputElement).value));
                        }}
                        checked={installments === option.value}
                        className="w-8 h-4 text-blue-600  dark:ring-offset-gray-800 focus:ring-2"
                        // nome={"installments"}
                        // checked={installments.toString() === option.value.toString()}
                      />
                      <label
                        htmlFor={option.value.toString()}
                        className="py-2 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {option.label}
                      </label>
                    </div>
                    {/* {option.label} */}
                    {/* </label> */}
                  </div>
                ))}
              </div>

              <div className="flex items-baseline justify-center">
                <Button
                  label="Continuar"
                  type="button"
                  onClick={handleSubmit(handleAddNewCreditCard)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
};
