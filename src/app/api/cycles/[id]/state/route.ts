import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { checkAndAwardBadges } from '@/lib/badges';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const body = await req.json();
    const { state } = body;

    const allowed = ['focused', 'tired', 'stressed'];
    if (!allowed.includes(state)) {
      return NextResponse.json({ error: 'Estado cognitivo inválido' }, { status: 400 });
    }

    const { id: cycleId } = params;

    const cycle = await prisma.studyCycle.update({
      where: { id: cycleId },
      data: { cognitiveState: state as any }
    });

    // Premiar 5 pontos de Saúde por preencher
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { healthPoints: { increment: 5 } }
    });

    await prisma.pointTransaction.create({
      data: {
        userId: user.id,
        amount: 5,
        reason: 'Diário Cognitivo preenchido',
      }
    });

    // Opcional/Deferred async check for badges!
    // checkAndAwardBadges(user.id).catch(console.error);

    return NextResponse.json({ success: true, cycle, newPoints: updatedUser.healthPoints });
  } catch (error) {
    console.error('API Cognitive State Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
