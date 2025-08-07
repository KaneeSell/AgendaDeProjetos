import { NextRequest, NextResponse } from "next/server";
import login from "./login";

export async function POST(req: NextRequest){
    const body = await req.json()
    const response = await login(body)
    console.log(response)
    if(!response) return NextResponse.json({status: 500, message: 'Erro Desconhecido.'})
    return NextResponse.json(response)
}