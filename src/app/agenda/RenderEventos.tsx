"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { LuLoaderCircle } from "react-icons/lu";
import { GrEdit } from "react-icons/gr";
import { PiTrashDuotone } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

type Evento = {
  id: number | string;
  name: string;
  descricao: string;
  isActive: boolean;
};
export default function RenderEventos() {
  const [isLoading, setIsLoading] = useState(false);
  const [clickEvent, setClickEvent] = useState<Evento | null>(null);
  const [resData, setResData] = useState<Evento[]>([]);
  const hasFetched = useRef(false);
  const loadingAgenda = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado.");
      return;
    }
    try {
      await axios
        .get("/api/auth/agenda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const resStatus = res.data.status;
          const resMessage = res.data.message;
          const resData = res.data.data;
          if (resStatus === 200) {
            setResData(resData);
            setIsLoading(false);
          } else {
            if (resStatus && resMessage) {
              alert(resStatus + " : " + resMessage);
            } else {
              alert("Erro inesperado ao criar evento, tente novamente.");
            }
          }
          setIsLoading(false);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        if (apiMessage) {
          alert("Erro ao criar evento: " + apiMessage);
        } else {
          alert("Erro inesperado: " + error.message);
        }
      } else {
        alert("Erro inesperado: " + error);
        console.error(error);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setIsLoading(true);
      loadingAgenda();
    }
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center px-10 md:w-2/3">
      {isLoading && <LuLoaderCircle size={"30px"} className="animate-spin" />}
      {!isLoading && clickEvent && (
        <div className="flex flex-wrap gap-4">
          <div
            className={`
                border-1 rounded-xl p-2 cursor-default
                relative min-h-60 py-10 gap-5 flex flex-col items-center
                min-w-70 md:max-w-2/3 text-wrap
                `}
            id={clickEvent.id.toString()}
          >
            <span className={`
            hover:brightness-75
            h-5 w-5 rounded-full absolute top-2 right-3 cursor-pointer border-1
              ${clickEvent.isActive ? "bg-green-400" : "bg-red-400"}
              `}/>
            <p className="text-2xl">
              <strong>{clickEvent.name}</strong>
            </p>
            <hr className="w-full"/>
            <p>
              <strong></strong> {clickEvent.descricao}
            </p>
            <hr className="w-full"/>
            <span className="flex items-center gap-3">
                <IoMdArrowRoundBack
                  onClick={() => setClickEvent(null)}
                  size={"25px"}
                  className="text-sky-400 absolute top-2 left-3 cursor-pointer hover:brightness-75"
                />
                <GrEdit
                  size={"25px"}
                  className="text-amber-300 cursor-pointer hover:brightness-75"
                />
                <PiTrashDuotone
                  size={"25px"}
                  className="text-red-500 cursor-pointer hover:brightness-75"
                />
              </span>
          </div>
        </div>
      )}
      {!isLoading && !clickEvent && (
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {resData.map((e, index) => (
            <div
              key={index}
              className={`
                border-1 rounded-xl p-2 cursor-default
                h-30 w-full relative flex justify-evenly
                items-center
                `}
              id={e.id.toString()}
            >
              <span
                className={`
                h-5 w-5 absolute rounded-full right-3 top-2
                hover:brightness-75 cursor-pointer border-1 font-serif
                ${e.isActive ? "bg-green-400" : "bg-red-400"}
                `}
              />
              <p className="text-2xl w-1/5">
                <strong>{e.name}</strong>
              </p>
              <p className="w-3/5">
                <strong></strong> {e.descricao}
              </p>
              <span className="flex w-1/5 items-center gap-3">
                <FaRegEye
                  onClick={() => setClickEvent(e)}
                  size={"25px"}
                  className="text-sky-400 cursor-pointer hover:brightness-75"
                />
                <GrEdit
                  size={"25px"}
                  className="text-amber-300 cursor-pointer hover:brightness-75"
                />
                <PiTrashDuotone
                  size={"25px"}
                  className="text-red-500 cursor-pointer hover:brightness-75"
                />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
