"use client";
import { useRouter } from "next/navigation";
import LayoutPaiTema from "../components/theme/LayoutPaiTema";
import { PaginaSegura } from "../components/ValidateToken";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import validate from "../utils/validate";
import Menu from "../components/menu/Menu";

export default function Perfil() {
  const [blockPage, setBlockPage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verificar() {
      const { status } = await validate();
      if (status !== 200) {
        router.push("/login");
      } else {
        setBlockPage(false)
      }
    }
    verificar()
  }, []);

  if (blockPage) return <LayoutPaiTema><Loading/></LayoutPaiTema>

  return (
    <LayoutPaiTema>
      <PaginaSegura />
      <Menu/>
      <div className="w-full min-h-svh flex flex-col gap-3 items-center justify-center">
        <span>Perfil.</span>
      </div>
    </LayoutPaiTema>
  );
}
