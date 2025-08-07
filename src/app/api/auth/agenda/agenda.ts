import axios from "axios";
import { novaAgendaType } from "../types/novaAgendaType";

export async function register(body: novaAgendaType, token: string) {
  const url_backend = process.env.API_BACKEND_URL || "";
  const bodyUpdate = {
    name: body.name,
    descricao: body.descricao
  }
  if (!url_backend)
    return { status: 500, message: "Sem URL da API Backend." };
  try {
    await axios.post(url_backend + "/agenda",bodyUpdate , {
        headers: {
          Authorization: `Bearer ${token}`,
        },});

    return { status: 201, message: "Evento criado com sucesso!" };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.message || "";
      const apiStatus = error.response?.data?.status || 500;
      if (apiMessage) {
        return { status: apiStatus, message: apiMessage };
      } else {
        return { status: 500, message: "Erro desconhecido." };
      }
    }
  }
}
export async function getAgenda(token: string) {
  const url_backend = process.env.API_BACKEND_URL || "";

  try {
    const res = await axios.get(url_backend + "/agenda", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: 200, message: "Dados carregados com sucesso.", data: res.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Erro ao buscar agendas.";
      return { status, message };
    }
    return { status: 500, message: "Erro inesperado." };
  }
}
