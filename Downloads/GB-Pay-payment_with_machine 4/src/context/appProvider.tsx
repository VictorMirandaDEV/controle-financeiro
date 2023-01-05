import { SessionProvider } from "next-auth/react";

import { PaymentProvider, ModalProvider, LoadingProvider,CardCodeProvider } from "./";

import Modal from "../Components/Modal";

export const AppProvider = ({
  children,
  session,
}: {
  children: JSX.Element;
  session: any;
}) => (
  <SessionProvider session={session}>
     <LoadingProvider>
      <CardCodeProvider>
       <ModalProvider>
        <PaymentProvider>
           <>
              <Modal />
              {children}
           </>
        </PaymentProvider>
       </ModalProvider>
      </CardCodeProvider>
    </LoadingProvider>
  </SessionProvider>
);
