'use client'
import { useRouter } from "next/navigation";
import RegisterForm from "../components/registerForm/RegisterForm";
import LayoutPaiTema from "../components/theme/LayoutPaiTema";
import validate from "../utils/validate";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Register() {
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
      <RegisterForm />
    </LayoutPaiTema>
  );
}
