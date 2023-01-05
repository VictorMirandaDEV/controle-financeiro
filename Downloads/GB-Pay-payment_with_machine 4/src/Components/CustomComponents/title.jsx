import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

// import arrowLeft from "../../assets/arrow-left.svg";

// import { ArrowLeft } from "../Icons/arrow-left.svg";
// import { arrowLeft } from "../Icons/arrow-left.svg";
const route = Router;

export const Title = (props) => {
  return (
    <div className="flex w-full py-4 justify-evenly align-middle ">
      {/* <Image src={logo}  width={273} height={71} />
       */}
      <div
        onClick={() => route.push(props.path)}
        className="flex w-1/4 px-4 justify-center   align-middle"
      >
        <Image
          src="/assets/arrow-left.svg"
          width="40"
          height="15"
          alt="voltar"
        />
        {/* <ArrowLeft  /> */}
      </div>
      <label className="flex justify-items-center  justify-center w-full font-bold font-Tw py-4  text-3xl">
        {props.title}
      </label>
      {props.col3 && (
        <div
          className="p-3 w-1/4 py-4 align-middle hover:rounded-full"
          onClick={() => route.push(props?.col3)}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
