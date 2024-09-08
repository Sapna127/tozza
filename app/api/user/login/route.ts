import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import { error } from "console";

export async function POST(req:NextRequest){
    const {email,password} = await req.json();

    if(!email || !password){
        return NextResponse.json({error:'Email & password are required'},{status:400});
    }
    try{
        const user = await prisma.user.findUnique({
            where : {email},
        });
        if(!user){
            return NextResponse.json({error:'user not found'},{status:404});
        }
        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        return NextResponse.json({ message: 'Login successful', user });
    }catch(error){
        console.log('error while login',error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}