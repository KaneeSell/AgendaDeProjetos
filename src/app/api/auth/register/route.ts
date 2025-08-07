import { NextRequest, NextResponse } from "next/server";
import register from "./register";

export async function POST(req: NextRequest){
    const body = await req.json()
    const response = await register(body)
    return NextResponse.json(response)
}