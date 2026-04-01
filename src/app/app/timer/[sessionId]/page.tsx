import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { TimerView } from '@/components/timer/timer-view';

export default async function TimerPage({
  params
}: {
  params: { sessionId: string }
}) {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  const studySession = await prisma.studySession.findUnique({
    where: { id: params.sessionId },
  });

  if (!studySession || studySession.userId !== user.id) {
    redirect('/app/dashboard');
  }

  // Verifica se a sessão já for concluída
  if (studySession.status === 'completed' || studySession.status === 'abandoned') {
    redirect('/app/dashboard'); // Idealmente deveria ir pra uma tela de resumo, mas redirect ok por enquanto
  }

  return (
    <AppLayout
      userName={user.name || undefined}
      userImage={user.image || undefined}
      healthPoints={user.healthPoints}
    >
      <TimerView 
        sessionId={studySession.id}
        sessionName={studySession.name || 'Sessão de Foco'}
        durationMin={studySession.plannedDurationMin}
        totalCycles={studySession.sessionsPlanned}
      />
    </AppLayout>
  );
}
