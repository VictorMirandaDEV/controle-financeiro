import { useSession } from "next-auth/react";
import Image from "next/image";
import Cosanpa from "../assets/cosanpa.png";

const HeaderInfo = (props: { children: any; notShow: boolean }) => {
  const { data } = useSession();
  return (
    <>
      {!props.notShow && (
        <div className="" id="header">
          <div className="flex justify-center items-center pt-2 ">
            <div className="mr-2">
              <span className="font-semibold ">
                GB Pay empresa credenciada{" "}
              </span>
            </div>
            <Image src={Cosanpa} height={75} width={75} />
          </div>
          {data?.user.name && (
            <div className="flex justify-center items-center mt-8 font-semibold">
              {/* Olá, {data?.user.name.split(" ")[0]}{" "} */}
              {/* {data?.user.name.split(" ")[1] + " "}  */}
            </div>
          )}
          {props.children}
        </div>
      )}
    </>
  );
};
export default HeaderInfo;
