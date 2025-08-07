"use client";
import { useRouter } from "next/navigation";
import LayoutPaiTema from "../components/theme/LayoutPaiTema";
import { PaginaSegura } from "../components/ValidateToken";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import validate from "../utils/validate";
import Menu from "../components/menu/Menu";
import CadastroAgenda from "./CadastroAgenda";
import RenderEventos from "./RenderEventos";

export default function Agenda() {
  const [blockPage, setBlockPage] = useState(true);
  const [btnNovoEvento, setBtnNovoEvento] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verificar() {
      const { status } = await validate();
      if (status !== 200) {
        router.push("/login");
      } else {
        setBlockPage(false);
      }
    }
    verificar();
  }, [router]);

  if (blockPage)
    return (
      <LayoutPaiTema>
        <Loading />
      </LayoutPaiTema>
    );

  return (
    <LayoutPaiTema>
      <PaginaSegura />
      <Menu />
      <div className="w-full mt-15 flex flex-col gap-3 items-center justify-center">
        {btnNovoEvento && <CadastroAgenda onClick={()=>setBtnNovoEvento(false)}/>}
        {!btnNovoEvento && (
          <div className="w-full flex flex-col gap-5 justify-center items-center ">
            <button
              className="border-1 border-green-400 rounded-2xl px-2 hover:bg-green-400 cursor-pointer"
              onClick={() => setBtnNovoEvento(true)}
            >
              Novo Evento
            </button>
            <hr className="h-0.5 w-11/12 " />
            <RenderEventos/>
          </div>
        )}
      </div>
    </LayoutPaiTema>
  );
}
