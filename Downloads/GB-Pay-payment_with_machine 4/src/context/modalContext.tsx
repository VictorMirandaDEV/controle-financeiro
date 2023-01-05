import { createContext, useContext, useState } from "react";

type ModalDataProps ={
    errorCode:number,
    errorMessage:string,
    errorDescription:string, 
}
type ModalProviderProps={
    modalData:ModalDataProps,
    setModalData:(props:ModalDataProps)=>void,
    isModalOpened:boolean,
    setIsModalOpened:(props:boolean) =>void,
}

const ModalContext = createContext<ModalProviderProps>({} as ModalProviderProps);

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const [modalData, setModalData] = useState<ModalDataProps>({
      errorCode:0,
      errorMessage:'',
      errorDescription:'',
  });

  const [isModalOpened,setIsModalOpened] = useState(false)

  return (
    <ModalContext.Provider value={{ modalData, setModalData, isModalOpened, setIsModalOpened }}>
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext<ModalProviderProps>(ModalContext);

  if (!context) {
    throw new Error("modal must be used whithin an ModalContext Provider");
  }
  return context;
}

export { ModalProvider, useModal };
