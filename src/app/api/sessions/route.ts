import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const { name, durationMin, sessionsPlanned } = body;

    if (!durationMin || !sessionsPlanned || durationMin < 1 || sessionsPlanned < 1) {
      return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

    const studySession = await prisma.studySession.create({
      data: {
        userId: user.id,
        name: name || 'Sessão de Estudo',
        plannedDurationMin: durationMin,
        sessionsPlanned: sessionsPlanned,
        status: 'active',
        sessionsCompleted: 0,
      },
    });

    return NextResponse.json(studySession);
  } catch (error) {
    console.error('API Sessions POST Error:', error);
    return NextResponse.json({ error: 'Erro interno ao criar sessão' }, { status: 500 });
  }
}
