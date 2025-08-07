import axios from "axios";
import { registerType } from "../types/registerType";

export default async function register(body: registerType) {
  const url_backend = process.env.API_BACKEND_URL || "";
  if (!url_backend)
    return { status: 500, message: "Sem URL da API Backend." };
  try {
    await axios.post(url_backend + "/users", body);

    return { status: 201, message: "Cadastrado com sucesso!" };
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
