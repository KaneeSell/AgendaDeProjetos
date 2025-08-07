import axios from "axios";
import { NextRequest } from "next/server";

export default async function validate(req: NextRequest) {
  console.log("");
  const body = await req.json();
  const url_backend = process.env.API_BACKEND_URL || "";
  if (!url_backend) return { status: 500, message: "Sem URL da API Backend." };
  if (body.token) {
    try {
      const response = await axios.get(url_backend + "/login", {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      return { status: response.status, message: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const apiStatus = error.response?.status ?? 500;
        const apiMessage = error.response?.data?.message || "";
        if (apiStatus === 401)
          return { status: apiStatus, message: "Login expirado." };
        if (apiStatus !== 500 && apiMessage !== "") {
          return { status: apiStatus, message: apiMessage };
        } else {
          return { status: 500, message: "Erro desconhecido." };
        }
      }
    }
  } else {
    return { status: 401, message: "Login expirado, faça login novamente." };
  }
  return { status: 500, message: "Erro inesperado" };
}
