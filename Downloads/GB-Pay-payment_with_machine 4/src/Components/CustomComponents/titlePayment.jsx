import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
// import arrowLeft from '../../assets/arrow-left.png'
import { ArrowLeft } from "../Icons/arrowleft";
export const TitlePayment = (props) => {
  return (
    <>
      <div className="flex w-full py-8   align-middle ">
        {/* <Image src={logo}  width={273} height={71} />
      hover:bg-blue-100 hover:rounded-full
    */}
        <div
          onClick={props.click}
          className="flex px-2   justify-center 
      align-middle"
        >
          {/* <ArrowLeft /> */}
          <Image
            src="/assets/arrow-left.svg"
            width="40"
            height="15"
            alt="voltar"
          />
        </div>

        <label className="flex justify-center align-middle w-full text-center font-bold font-Tw py-1 max-w-none text-3xl">
          {props.title}
        </label>
      </div>
    </>
  );
};
