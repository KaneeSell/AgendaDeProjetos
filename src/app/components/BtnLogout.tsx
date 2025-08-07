'use client'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BtnLogout(props: {className?: string}){
    const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();

    function logout() {
        setIsLoading(true);
        localStorage.removeItem("token");
        router.push("/login");
        setIsLoading(false);
      }

    return (
        <>
        {isLoading && <Loading />}
        <span
          onClick={() => logout()}
          className={`
            flex gap-1 items-center border-1 py-1 px-3 rounded-2xl hover:border-transparent 
            cursor-pointer hover:bg-neutral-200 light:hover:bg-neutral-600 light:hover:text-white hover:text-black ${props.className}
            `}
        >
          <FaArrowRightFromBracket size={"20px"} />
          Logout
        </span>
        </>
    )
}