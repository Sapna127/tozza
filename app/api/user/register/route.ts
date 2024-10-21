import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function POST(req:NextRequest){
    try{
        const {name,email,password} = await req.json();
        if(!name||!email||!password){
            return NextResponse.json({error:'all fields are required'},{status:400});
        }
        const existingUser = await prisma.user.findUnique({
            where:{email},
        });
        if(existingUser){
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }
        const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password
            },
          });
          return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
        }catch (error) {
            console.error('Error during registration:', error);
            return NextResponse.json({ error: 'Something went wrong during registration' }, { status: 500 });
          }
}