"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useState } from "react";
// import useSWR from 'swr'
// import Image from 'next/image'
// import LoginImage from '@/../public/Login Image.jpg'

const loginSchema = z.object({
  email: z
    .string()
    .email("Email inválido.")
    .nonempty("Campo Email não pode estar vazio."),
  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres.")
    .nonempty("Campo Senha não pode estar vazio."),
});


type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await axios.post("/api/auth/login", data).then((res) => {
        if(res.data.status === 200){
            localStorage.setItem('token', res.data.access_token)
            alert("Login realizado com sucesso!");
            router.push('/')
        } else {
            alert(res.data.status + ": " + res.data.message);
        }
        setIsLoading(false)
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        if (apiMessage) {
          alert("Erro ao cadastrar: " + apiMessage);
        } else {
          alert("Erro inesperado: " + error.message);
          console.error(error);
        }
      } else {
        alert("Erro inesperado: " + error);
        console.error(error);
      }
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-svh px-5">
      {isLoading && <Loading/>}
      <div className="border-1 rounded-2xl flex flex-col items-centerh-110 lg:flex-row ">
        {/* <figure className='overflow-hidden h-1/4'>
                <Image alt='Login Image'
                src={LoginImage} className='object-center'/>
            </figure> */}
        <form
          className="flex flex-col justify-center items-center px-10 py-10"
          onSubmit={handleSubmit(login)}
        >
          <span className="text-3xl font-bold font-serif">Login Agenda</span>
          {/* Email */}
          <span className="flex flex-col mb-1 mt-4 items-center relative">
            <label
              className="text-sm absolute top-[-10px] left-2 bg-black px-2 cursor-text"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              {...register("email")} // registra o campo com o RHF
              className="border-1 rounded-lg w-50 text-base px-2 pb-1 pt-2"
            />
            {/* Mensagem de erro Email */}
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </span>
          {/* Password */}
          <span className="flex flex-col mb-1 mt-4 items-center relative">
            <label
              className="text-sm absolute top-[-10px] left-2 bg-black px-2 cursor-text"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              required
              {...register("password")} // registra o campo com o RHF
              className="border-1 rounded-lg w-50 text-lg px-2 pb-1 pt-2"
            />
            {/* Mensagem de erro Password */}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </span>
          {/* Botões */}
          <span className="flex flex-col w-full gap-1 mt-3">
            <Link href={"/register"} className="flex items-center gap-1 text-sm cursor-default">
            <span>Não possui login?</span>
              <span
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              >
                Criar cadastro
              </span>
            </Link>
            <button
              className="bg-blue-500 rounded-lg py-1 px-3 cursor-pointer"
              type="submit"
            >
              Entrar
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
