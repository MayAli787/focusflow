import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { cycleId, missionId, pointsToAdd } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Registra missão e atrela ao ciclo
    if (cycleId) {
      await prisma.studyCycle.update({
        where: { id: cycleId },
        data: { missionId, missionCompleted: true }
      });
    }

    // Se houver vídeo, registra transação no videoWatches (Opcional, mas deixaremos de lado caso mockado por encurtamento)
    // Atualiza saldo:
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { healthPoints: { increment: pointsToAdd || 10 } }
    });

    // Registra transação detalhada
    await prisma.pointTransaction.create({
      data: {
        userId: user.id,
        amount: pointsToAdd || 10,
        reason: 'Missão de Saúde Concluída',
      }
    });

    return NextResponse.json({ success: true, newPoints: updatedUser.healthPoints });
  } catch (error) {
    console.error('API Complete Mission Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
