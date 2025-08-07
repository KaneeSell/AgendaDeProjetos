import { NextRequest, NextResponse } from "next/server"
import validate from "./validate"

export async function POST(req: NextRequest){
    const body = await req
    const response = await validate(body)
    if(!response) return NextResponse.json({status: 500, message: 'Erro desconhecido.'})
    return NextResponse.json(response)
}