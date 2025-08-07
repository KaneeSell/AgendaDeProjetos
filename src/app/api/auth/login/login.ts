import axios from "axios";
import { loginType } from "../types/loginType";

export default async function login(
  body: loginType
): Promise<
  { status: number; message: string; access_token?: string } | undefined
> {
  const url_backend = process.env.API_BACKEND_URL || "";
  if (!url_backend) return { status: 500, message: "Sem URL da API Backend." };

  try {
    const response = await axios.post(`${url_backend}/login`, body);
    return {
      status: response.status,
      message: "Logado com sucesso!",
      access_token: response.data.access_token,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const apiStatus = error.response?.status ?? 500;
      const apiMessage = error.response?.data?.message || "";
      if (apiMessage !== 500 && apiMessage !== "") {
        return { status: apiStatus, message: apiMessage };
      } else {
        return { status: 500, message: "Erro desconhecido." };
      }
    }
  }
}
