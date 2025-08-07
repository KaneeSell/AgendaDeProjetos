import { MouseEventHandler, useState } from "react";
import Article from "../components/Article";
import { IoMdClose } from "react-icons/io";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../components/Loading";
import axios from "axios";

export default function CadastroAgenda(props: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const novoEventoSchema = z.object({
    name: z
      .string()
      .min(4, "Nome deve ter no mínimo 4 caracteres.")
      .nonempty("Campo Nome não pode estar vazio."),
    descricao: z.string(),
  });
  type novoEventoData = z.infer<typeof novoEventoSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<novoEventoData>({
    resolver: zodResolver(novoEventoSchema),
  });

  const cadastrar = async (data: novoEventoData) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    const dataUpdate = {
      name: data.name,
      descricao: data.descricao,
      token: token,
    };

    try {
      await axios.post("/api/auth/agenda", dataUpdate).then((res) => {
        const resStatus = res.data.status;
        const resMessage = res.data.message;
        if (resStatus === 201) {
          alert("Registro realizado com sucesso!");
          setIsLoading(false);
          reset({ name: "", descricao: "" });
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          if (handleClose) handleClose;
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
  const handleClose = props.onClick;
  return (
    <div className="border-1 border-green-400 rounded-2xl px-10 pb-10 relative">
      {isLoading && <Loading />}
      <button
        className="absolute right-3 top-1 hover:text-red-500 cursor-pointer"
        onClick={handleClose}
      >
        <IoMdClose size={"30px"} />
      </button>
      <Article id="1" titulo="Novo Evento">
        <form onSubmit={handleSubmit(cadastrar)}>
          <span className="flex flex-col mb-1 mt-4 items-center relative">
            <label
              className="text-sm absolute top-[-10px] left-2 bg-black px-2 cursor-text"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              required
              type="text"
              id="nome"
              {...register("name")} // registra o campo com o RHF
              className="border-1 rounded-lg w-50 text-base px-2 pb-1 pt-2"
            />
          </span>
          {/* Mensagem de erro Nome */}
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <span className="flex flex-col mb-1 mt-4 items-center relative">
            <label
              className="text-sm absolute top-[-10px] left-2 bg-black px-2 cursor-text"
              htmlFor="descricao"
            >
              Descrição
            </label>
            <textarea
              required
              id="descricao"
              rows={5}
              {...register("descricao")} // registra o campo com o RHF
              className="border-1 rounded-lg w-50 text-base px-2 pb-1 pt-2"
            />
          </span>
          {/* Mensagem de erro Nome */}
          {errors.descricao && (
            <p className="text-red-500 text-sm">{errors.descricao.message}</p>
          )}
          {/* Botões */}
          <span className="flex gap-1 flex-col items-center mt-3 w-full">
            <button
              type="submit"
              className="bg-blue-500 border-1 border-blue-500 rounded-lg w-full hover:bg-blue-400 py-1 px-3 cursor-pointer"
            >
              Confirmar
            </button>
          </span>
        </form>
      </Article>
    </div>
  );
}
