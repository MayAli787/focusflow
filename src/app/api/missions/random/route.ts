import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const exclude = searchParams.get('exclude');

    const missions = await prisma.healthMission.findMany({
      where: exclude ? { id: { not: exclude } } : undefined,
    });

    if (missions.length === 0) {
      return NextResponse.json({ error: 'Nenhuma missão encontrada' }, { status: 404 });
    }

    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    
    return NextResponse.json(randomMission);
  } catch (error) {
    console.error('API Random Mission Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
