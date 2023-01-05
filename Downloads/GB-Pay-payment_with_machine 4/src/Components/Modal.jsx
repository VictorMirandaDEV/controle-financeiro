import { useRouter } from "next/router";
import React from "react";
import { useModal } from "../context/modalContext";
export default function Modal(props) {
  const { isModalOpened, modalData, setIsModalOpened, setModalData } =
    useModal();

  const router = useRouter();
  function handleClose() {
    // router.push(!props.rota ? "/boleto": props.rota)
    setIsModalOpened(false);
  }
  return (
    <>
      {isModalOpened ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto sm:max-w-3xl  max-w-xs">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-5 ">
                  <h3 className="text-3xl font-semibold">
                    Error {modalData.errorCode ?? modalData.errorCode} :
                    {modalData.errorMessage}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 sm:max-w-3xl  max-w-xs text-lg leading-relaxed  inline-block  break-words text-red-600">
                    {modalData.errorDescription ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: modalData.errorDescription,
                          }}
                        />
                      </>
                    ) : (
                      "Erro desconhecido"
                    )}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
                  <button
                    className="bg-button-submit hover:bg-button-submit text-white active:bg-button-submit font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
