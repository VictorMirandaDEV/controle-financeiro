import { createContext, useContext, useState } from "react";
import { AddressProps } from "../Components/Pagamento/services/address";


type AddressContextProps={
    addressData:AddressProps,
    setAddressData:(props:AddressProps)=>void,
}

const AddressContext = createContext<AddressContextProps>({} as AddressContextProps);

const AddressProvider = ({ children }: { children: JSX.Element }) => {
    const [addressData,setAddressData] = useState<AddressProps>();
    
    
    return(
        <AddressContext.Provider value={{addressData,setAddressData}}>
            {children}
        </AddressContext.Provider>
    )
};

function useAddress(){
    const context = useContext<AddressContextProps>(AddressContext);

    if(!context){
        throw new Error(
            "Address mus be used whithin an AddressContex Provider"
            );
    }


    return context;
}

export {AddressProvider, useAddress};