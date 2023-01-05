import React, {
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { window, document } from "browser-monads";
import {
  BoletoBarcodeReader,
  BoletoBarcodeReaderSupport,
  BoletoBarcodeReaderProvider,
  isSmartDevice,
  Stop,
  getBoletoByCode,
} from "../Scanner/boleto";
import Scanner from "../Scanner/quagga2";
import "react-boleto-reader/dist/index.css";
import { useRouter } from "next/router";
import Quagga from "@ericblade/quagga2";
import _require from "nothing-mock";
import { useLoading, usePayment } from "../../context";
import Loading from "../Loading";
import Pagamento from "../Pagamento";
import style from "./style.module.css"



export default function Camera() {
  const { validateBillInfo, billData } = usePayment();
  var screen = typeof screen !== "undefined" ? screen : "";
  /** Not important: example definitions */
  const tabs = ["boleto"];
  const tabsId = "example_tabs";
  const headerId = "example_header";
  const [reading, setReading] = useState(true);
  const [boleto, setBoleto] = useState(null);
  const [readersHeight, setReadersHeight] = useState();
  const [readersWidth, setReadersWidth] = useState();
  const [openCamera, setOpenCamera] = useState(true);
  const { setIsLoading } = useLoading();

  const scannerRef = useRef(null);
  /**
   * Not important: example stuff
   */
  const router = useRouter();
  const stopScanner = async () => {
    await Quagga.offProcessed();
    await Quagga.offDetected();
    await Quagga.stop();
  };
  const reset = useCallback(async () => {
    setBoleto(null);
    setReading(false);
    setTimeout(async () => {
      await stopScanner();
    }, 3*1000);
    router.push("/digitar-boleto");

  }, []);

  /**
   * Not important: example stuff
   */
  const restart = useCallback(() => {

    setReading(true);
  }, []);
  const onStop = useCallback(() => {

    setReading(null);
  }, [onStop]);

  /**
   *
   */
  const onCancel = useCallback(() => {
    reset();
  }, [reset]);

  /**
   * Important:
   *
   * This is the callback defined to receive boleto data
   * when the reader have sucesse identifying that big barcode.
   *
   * In this example we have the `reading` variable,
   * who helps to render or not render the BoletoBarcodeReader component.
   *
   * You don't need to do like this.
   *
   * @param {Object} detectedBoleto
   */
  const onDetectBoleto = useCallback(
    (detectedBoleto) => {
      const broletinho = getBoletoByCode(detectedBoleto);

      if (broletinho?.valido?.sucesso) {
        try {

          if (broletinho?.valido?.mensagem == "Boleto válido") {

            setOpenCamera(false);

            validateBillInfo(broletinho?.valido.linhaDigitavel);
            setBoleto(true);

          }
        } catch (error) {
          if (detectedBoleto.valido.sucesso == false) {

            setOpenCamera(true);

          }
        } finally {

        }
      } else {
        return;
      }
    },
    [setIsLoading, validateBillInfo]
  );


  () => {
    function start() {
      restart;
    }
    start();
  },
    [];

  /**
   * Not important: example stuff
   */

  const getElementHeight = useCallback((elementId = "") => {
    const element = document.getElementById(elementId);

    return !element || !element.offsetHeight ? 0 : element.offsetHeight;
  }, []);

  /**
   * Not important: example stuff
   */
  useLayoutEffect(() => {
    function calcReaderHeight() {
      const tabsHeight = getElementHeight(tabsId);
      const headerHeight = getElementHeight(headerId);

      setReadersHeight(window.innerHeight);
      setReadersWidth(window.innerWidth);
    }

    calcReaderHeight();

    window.addEventListener("resize", calcReaderHeight);

    return () => {
      window.removeEventListener("resize", calcReaderHeight);
    };
  }, [getElementHeight]);


  if (!boleto) {
    return openCamera ? (
      <div
      className={style.header}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#6B6B6B",
        }}
      >
        <p
          className="text-white text-xs "
          id="billScanInstructions"
          style={{
            marginBottom: "50px",
            textAlign: "center",
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          Para a melhor leitura do boleto, deixe o celular na horizontal
          <br /> Com boa iluminação, posicione o código de barras na área
          delimitada
        </p>
        <div ref={scannerRef} className="video-container">
          <Scanner
            scannerRef={scannerRef}
            style={{ objectFill: "cover" }}
            onDetected={onDetectBoleto}
            constraints={{
              facingMode: "environment",
              aspectRatio: 16 / 9,
              marginottom: "19px",
            }}
          />
        </div>
        <button
          type="button"
          className="bg-button-submit z-50"
          id="typeBarcode"
          onClick={() => {
            onCancel();
          }}
          style={{
            height: "50px",
            width: "400px",
            borderRadius: "8px",
            marginTop: "50px",
          }}
        >
          Digitar código de barras
        </button>
      </div>
    ) : (
      <div>oiiie</div>
    );
  } else {


    return billData?.transactionId == null ? (
      <Loading />
    ) : (
      <>
        <div className="hidden">
          {setTimeout(async () => {
            await stopScanner();
          }, 3 * 1000)}
        </div>
        <Pagamento />
      </>
    );
  }
}
export async function getServerSideProps(context) {
  // const session = await getSession(context);
   return {
    props: {
      notShow:true,
    },
  };
  };