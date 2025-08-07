'use client'
import { useEffect, useState } from "react";
import LoginForm from "../components/loginform/LoginForm";
import LayoutPaiTema from "../components/theme/LayoutPaiTema";
import validate from "../utils/validate";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function Login() {
  const [blockPage, setBlockPage] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function verificar() {
      const { status } = await validate();
      if (status !== 200) {
        setBlockPage(false)
      } else {
        router.push("/");
      }
    }
    verificar();
  }, [router]);
  if (blockPage) return <LayoutPaiTema><Loading/></LayoutPaiTema>
  return (
    <LayoutPaiTema>
      <LoginForm />
    </LayoutPaiTema>
  );
}
