import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res: NextApiResponse){
    const url_backend = process.env.API_BACKEND_URL || ''
    if(url_backend === '') return res.status(500).end('Sem URL da API Backend.')
    if(req.method !== 'POST') return res.status(405).end('Method não permitido.')
    return res.json({message: 'Logout realizado com sucesso!'})
} 