"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";

export default function RenderEventos() {
  const [isLoading, setIsLoading] = useState(false);
  const [clickEvent, setClickEvent] = useState(null);
  const [resData, setResData] = useState<any[]>([]);
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
    <div>
      {isLoading && <Loading />}
      {!isLoading && clickEvent && (
        <div className="flex flex-wrap gap-4">
          <div
            className={`
                border-1 rounded-xl p-2 hover:brightness-80 cursor-pointer
                ${clickEvent.isActive? 'bg-green-400': 'bg-red-400'}
                `}
            onClick={() => setClickEvent(null)}
            id={clickEvent.id}
          >
            <p className="text-2xl">
              <strong>Nome:</strong> {clickEvent.name}
            </p>
            <hr />
            <p>
              <strong>Descrição:</strong> {clickEvent.descricao}
            </p>
          </div>
        </div>
      )}
      {!isLoading && !clickEvent && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {resData.map((e, index) => (
            <div
              key={index}
              className={`
                border-1 rounded-xl p-2 hover:brightness-80 cursor-pointer
                ${e.isActive? 'bg-green-400': 'bg-red-400'}
                `}
              onClick={() => setClickEvent(e)}
              id={e.id}
            >
              <p>
                <strong>Nome:</strong> {e.name}
              </p>
              <p>
                <strong>Descrição:</strong> {e.descricao}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
