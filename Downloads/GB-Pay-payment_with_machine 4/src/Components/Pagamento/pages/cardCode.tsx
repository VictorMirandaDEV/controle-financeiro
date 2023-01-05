import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Input, Mask, TitlePayment } from "../../CustomComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardCodeSchema, tokenSchema } from "../../../utils/validation";
import { useCardCode } from "../../../context";
type Props = {
  valor: number;
  cardCode: string;
  changePage: (prop: any) => void;
  // saveCreditCardData:(Props:cardAuthorizationProps)=>void;
};
export const CardCode = ({ valor, changePage, cardCode }: Props) => {
  // const [cardCode, setCardCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState("");
  const {setCardCode} = useCardCode();

  // const handleCardCode = (e: any) => {
  //   setCardCode(e.target.value);
  // }
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cardCodeSchema),
  });
  
  // useEffect(() => {
  //   console.log(watch(cardCode).toString());
   
  //   if(watch(cardCode).toString().replaceAll(" ", "").replaceAll("_", "").length ===6)
  //   setError(null);


  // }, [watch(cardCode)]);

  const ChangePage =() => {
    changePage("billingResume");
  };
  // };
  const handleCardCode = async (data) => {
    let isValid = await cardCodeSchema.isValid(data);
    if(data.cardCode.replaceAll(" ", "").replaceAll("_", "").length <6){
      
      setError("O código de autorização deve ter 6 dígitos");
      return isValid =false
  }
    // console.log(isValid);
    if (isValid) {

      let { cardCode } = data;
      setCardCode(cardCode);

      // console.log(cardCode);
      setLoading(true);
      try {
        const { data: data1 } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/paynet/cardCode`,
          {
            cardCode,
          }
        );
        // setPaymentId(data1.paymentId);
        ChangePage();
      } catch (error) {
        // setError(error?.response?.data1?.message);
        setLoading(false);
        ChangePage();


      }
    }
  };
  return (
    <>
      <div className="m-16 flex justify-center items-center">
        <Box>
          <TitlePayment
            click={() => {
              changePage("creditCardForm");
            }}
            title="Autorização do cartão"
          />
          <div className="">
            <form onSubmit={handleSubmit(handleCardCode)}>
              <div>
                <Input
                // controle={control}
                  type="text"
                  
                  placeholder="Digite o código do Autorização"
                  label="Digite o código do Autorização"
                  value={cardCode}
                  register={register}
                  className={` flex justify-center items-center text-center w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    errors.cardCode?.message || error && "border-red-700  tracking-widest"
                  }`}
                  message={errors.cardCode?.message || error}
                  nome={"cardCode"} 
                  // format={"# # # # # #"}
                  // mask={["_", "_", "_", "_", "_", "_"]}
                              />
              </div>
              <div>
                <Button
                  onClick={handleSubmit(handleCardCode)}
                  label={loading ? "Carregando" : "Avançar"}
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
              </div>
            </form>
            {/* {loading && <div>Pagando...</div>}
      {error && <div>{error}</div>} */}
            {/* {success && <div>Pagamento realizado com sucesso</div>} */}
          </div>
        </Box>
      </div>
    </>
  );
};
