import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";
import { error } from "console";
const client = new PrismaClient();


export async function POST(req:NextRequest){
    const body = await req.json();
    await client.user.create({
        data:{
            username:body.username,
            password:body.password
        }
    })
    
   return Response.json({
    message:"user logged in",
   })
}


export async function GET() {
    const user = await client.user.findFirst({});
    return Response.json({ name: user?.username, email: user?.username })
}