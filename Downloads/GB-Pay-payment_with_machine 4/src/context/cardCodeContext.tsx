import { createContext, useContext, useState } from "react";
// import { CardCodeProps } from "../Components/Pagamento/services/cardCode";


type CardCodeProps={
    cardCode:any,
    setCardCode:(string)=>void,
}

const CardCodContext = createContext<CardCodeProps>({} as CardCodeProps);

const CardCodeProvider = ({ children }: { children: JSX.Element }) => {
    const [cardCode,setCardCode] = useState<CardCodeProps>();
    
    
    return(
        <CardCodContext.Provider value={{cardCode,setCardCode}}>
            {children}
        </CardCodContext.Provider>
    )
};

function useCardCode(){
    const context = useContext<CardCodeProps>(CardCodContext);

    if(!context){
        throw new Error(
            "CardCode must be used whithin an CardCodContext Provider"
            );
    }


    return context;
}

export {CardCodeProvider, useCardCode};