"use client";
import { useRouter } from "next/navigation";
import LayoutPaiTema from "./components/theme/LayoutPaiTema";
import { PaginaSegura } from "./components/ValidateToken";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import validate from "./utils/validate";
import Menu from "./components/menu/Menu";
import Article from "./components/Article";

export default function Inicio() {
  const [blockPage, setBlockPage] = useState(true);
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
      <div className="w-full pt-15 flex flex-col gap-3 items-center justify-center">
        <Article id="1" titulo="Inicio">
          <span className="flex text-center text-nowrap">
            Seja bem vindo a<strong className="ms-1">Agenda</strong>!
          </span>
        </Article>
      </div>
    </LayoutPaiTema>
  );
}
