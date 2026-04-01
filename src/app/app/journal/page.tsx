import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function JournalPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  // Buscar ciclos dos últimos 7 dias (onde têm status cognitivo)
  const sevenDaysAgo = subDays(new Date(), 7);
  
  const cycles = await prisma.studyCycle.findMany({
    where: {
      session: { userId: user.id },
      startedAt: { gte: sevenDaysAgo },
      cognitiveState: { not: null },
    },
    orderBy: { startedAt: 'desc' },
    include: { session: true },
  });

  // Agrupar por Dia em Pt-BR para o Timeline
  const groupedCycles = cycles.reduce((acc, cycle) => {
    if (!cycle.startedAt) return acc;
    const day = format(cycle.startedAt, "dd 'de' MMMM, yyyy", { locale: ptBR });
    if (!acc[day]) acc[day] = [];
    acc[day].push(cycle);
    return acc;
  }, {} as Record<string, typeof cycles>);

  const stateInfo: Record<string, { emoji: string; text: string; bg: string }> = {
    focused: { emoji: '🎯', text: 'Focado', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    tired: { emoji: '😴', text: 'Cansado', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
    stressed: { emoji: '😰', text: 'Estressado', bg: 'bg-pink-100 text-pink-800 border-pink-300' },
  };

  return (
    <AppLayout userName={user.name || undefined} userImage={user.image || undefined} healthPoints={user.healthPoints}>
      <div className="max-w-2xl mx-auto pb-20 pt-4">
        <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          Diário Cognitivo
        </h1>
        <p className="text-neutral-500 font-inter dark:text-neutral-100 mb-10">
          Recomendamos revisar esses marcadores; eles dizem muito sobre como o seu corpo reage às métricas e metodologias de estudo.
        </p>

        {Object.keys(groupedCycles).length === 0 ? (
          <div className="text-center p-12 bg-neutral-50 dark:bg-dark-card rounded-3xl border border-dashed border-neutral-200 dark:border-dark-border">
            <span className="text-4xl block mb-4">📓</span>
            <p className="text-neutral-500 dark:text-neutral-100 font-inter">Nenhum check-in registrado nos últimos 7 dias. Responda os testes após seus ciclos!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedCycles).map(([date, dayCycles]) => (
              <div key={date}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-neutral-200 dark:bg-dark-border flex-1" />
                  <span className="text-sm font-inter font-semibold text-neutral-500 dark:text-neutral-50 uppercase tracking-widest bg-white dark:bg-dark-bg px-2">
                    {date}
                  </span>
                  <div className="h-px bg-neutral-200 dark:bg-dark-border flex-1" />
                </div>
                
                <div className="relative border-l-2 border-neutral-100 dark:border-dark-card ml-4 pl-8 space-y-6">
                  {dayCycles.map((cycle) => {
                    const info = stateInfo[cycle.cognitiveState as string] || stateInfo['focused'];
                    return (
                      <div key={cycle.id} className="relative">
                        <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-white dark:bg-dark-bg border-4 border-lilac-300 dark:border-lilac-700 shadow-sm" />
                        <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl border ${info.bg} shadow-sm max-w-sm`}>
                          <span className="text-xl">{info.emoji}</span>
                          <div className="flex flex-col">
                            <span className="font-poppins font-bold text-sm tracking-wide">
                              {info.text}
                            </span>
                            <span className="font-inter text-xs opacity-80">
                              {format(cycle.startedAt!, 'HH:mm')} • {cycle.session.name || 'Sessão Padrão'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
