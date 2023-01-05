import HeaderInfo from "../Header";
import Deslogar from "../Logoff";
export const Box = (props) => {
  return (
    <>
    <div className="flex  flex-col min-h-[75vh] ">

      <div className="flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-0 text-left bg-white shadow-lg">
          <div className="mx-auto">{props.children}</div>
        </div>
      </div>
      { !props.notShow && 
      (
        <div className="flex flex-row justify-center  grid-cols-4 gap-4">
          <div className="w-1/4"/>
          <div className="mt-4"><Deslogar /></div></div>
          )  } 
          </div>
      
          
    </>
  );
};
