import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading(){
    return(
        <div className="z-20 w-full h-screen fixed flex items-center justify-center bg-black/40 light:text-white">
            <AiOutlineLoading3Quarters size={'40px'} className="animate-spin"/>
        </div>
    )
}