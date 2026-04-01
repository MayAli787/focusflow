import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id: sessionId } = params;

    const studySession = await prisma.studySession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!studySession || studySession.user.email !== session.user.email) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 });
    }

    const body = await req.json();
    const { cycleNumber, durationMin } = body;

    // Criar o ciclo
    const cycle = await prisma.studyCycle.create({
      data: {
        sessionId,
        cycleNumber,
        durationMin,
        startedAt: new Date(Date.now() - durationMin * 60000), // Aproximação
        endedAt: new Date(),
      },
    });

    // Atualizar a sessão mãe com +1 sessões completas
    await prisma.studySession.update({
      where: { id: sessionId },
      data: {
        sessionsCompleted: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, cycle });
  } catch (error) {
    console.error('API Cycle PATCH Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
