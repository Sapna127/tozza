import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'

export default async function GET(req:any, res:any) {
  try{
    const { userId } = req.query;
    const achievements = await prisma.achievement.findMany({
      where: { userId },
    });
    res.json(achievements);
  }catch(error){
    return NextResponse.json({ error: 'Failed to fetch achievements..' }, { status: 500 });
  }
  
}
