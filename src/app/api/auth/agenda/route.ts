import { NextRequest, NextResponse } from "next/server";
import { register, getAgenda } from "./agenda";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.token;
  const response = await register(body, token);
  return NextResponse.json(response);
}
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { status: 401, message: "Token não fornecido." },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const response = await getAgenda(token);
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error("Erro no getAgenda:", error);
    return NextResponse.json(
      { status: 500, message: "Erro ao buscar agendas." },
      { status: 500 }
    );
  }
}
