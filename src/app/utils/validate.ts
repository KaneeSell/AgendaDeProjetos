import axios from "axios";

export default async function validate() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post("/api/auth/validate", { token: token });
    return { status: response.data.status, message: response.data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.message;
      const apiData = error.response?.data;
      if (apiData) {
        return { status: 500, message: "Erro ao cadastrar: " + apiData}
      }
      if (apiMessage) {
        return { status: 500, message: "Erro ao cadastrar: " + apiMessage}
      } else {
        return { status: 500, message: "Erro inesperado: " + error.message}
      }
    } else {
        return { status: 500, message: "Erro inesperado."}
    }
  }
}
