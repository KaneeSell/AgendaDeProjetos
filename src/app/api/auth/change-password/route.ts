import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json()
    return NextResponse.json({status: 200, message: 'OK Change-Password'})
}