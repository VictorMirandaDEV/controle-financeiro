import { createContext, useContext, useState } from "react";
import Loading from "../Components/Loading";

type LoadingProps = {
  isLoading: boolean;
  setIsLoading: (props: boolean) => void;
};

const LoadingContext = createContext<LoadingProps>({} as LoadingProps);

const LoadingProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <Loading /> : ""}
      {children}
    </LoadingContext.Provider>
  );
};

function useLoading() {
  const context = useContext<LoadingProps>(LoadingContext);

  if (!context)
    throw new Error("loading must be used whithin an Loading Provider");

  return context;
}

export { LoadingProvider, useLoading };
