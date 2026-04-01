import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { OnboardingClientWrapper } from '@/components/onboarding/onboarding-wrapper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Flame, Medal, Target } from 'lucide-react';
import { startOfWeek, endOfWeek } from 'date-fns';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

  const [recentBadges, sessionsThisWeek] = await Promise.all([
    prisma.userBadge.findMany({
      where: { userId: user.id },
      orderBy: { unlockedAt: 'desc' },
      take: 3,
      include: { badge: true }
    }),
    prisma.studySession.aggregate({
      where: { userId: user.id, createdAt: { gte: weekStart, lte: weekEnd }, status: 'completed' },
      _sum: { plannedDurationMin: true },
      _count: true
    })
  ]);

  const hoursThisWeek = Math.floor((sessionsThisWeek._sum.plannedDurationMin || 0) / 60);

  return (
    <AppLayout userName={user.name || undefined} userImage={user.image || undefined} healthPoints={user.healthPoints}>
      <OnboardingClientWrapper />
      
      <div className="max-w-5xl mx-auto pb-20 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-lilac-50 dark:bg-lilac-950/20 p-8 rounded-[32px] border border-lilac-100 dark:border-lilac-900/30">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Olá, {user.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-neutral-500 font-inter dark:text-neutral-200 max-w-md">
              Pronto para mais um ciclo de produtividade focada hoje? Configure sua meta e proteja sua saúde.
            </p>
          </div>
          
          <Link href="/app/timer">
            <Button className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 outline-none text-white font-poppins font-bold rounded-2xl h-14 px-8 text-lg transition-transform active:scale-95 shadow-card group">
              <Play className="w-5 h-5 mr-3 fill-white group-hover:scale-110 transition-transform" />
              Iniciar Sessão
            </Button>
          </Link>
        </div>

        {/* Resumo Semanal */}
        <h2 className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-6">Resumo da Semana</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-white dark:bg-dark-card p-6 rounded-[32px] border border-neutral-100 dark:border-dark-border shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 bg-lilac-100 dark:bg-lilac-900/30 text-lilac-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Flame size={28} />
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 font-inter text-xs uppercase tracking-wider font-bold mb-1">Horas Focadas</p>
              <div className="flex items-baseline gap-1">
                <span className="font-poppins font-black text-3xl text-neutral-900 dark:text-neutral-50">{hoursThisWeek}</span>
                <span className="font-inter font-semibold text-sm text-neutral-400">h na semana</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card p-6 rounded-[32px] border border-neutral-100 dark:border-dark-border shadow-sm flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target size={28} />
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-400 font-inter text-xs uppercase tracking-wider font-bold mb-1">Sessões Concluídas</p>
              <div className="flex items-baseline gap-1">
                <span className="font-poppins font-black text-3xl text-neutral-900 dark:text-neutral-50">{sessionsThisWeek._count}</span>
                <span className="font-inter font-semibold text-sm text-neutral-400">metas batidas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Últimas Medalhas */}
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">Conquistas Recentes</h2>
          <Link href="/app/badges" className="text-sm font-poppins font-bold text-lilac-600 dark:text-lilac-400 hover:text-lilac-700 bg-lilac-50 dark:bg-lilac-900/30 px-3 py-1 rounded-full">Ver todas &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentBadges.length === 0 ? (
            <div className="col-span-3 text-center p-8 bg-neutral-50 dark:bg-dark-card rounded-[32px] border border-dashed border-neutral-200 dark:border-dark-border">
              <p className="text-neutral-500 dark:text-neutral-200 font-inter">Nenhuma medalha conquistada ainda. Comece a estudar para desbloquear!</p>
            </div>
          ) : (
            recentBadges.map((ub) => (
              <div key={ub.id} className="bg-white dark:bg-dark-card p-6 rounded-[32px] border border-neutral-100 dark:border-dark-border shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-tr from-lilac-100 to-pink-100 dark:from-lilac-900/40 dark:to-pink-900/40 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner ring-4 ring-white dark:ring-dark-card">
                  {ub.badge.icon || '🏅'}
                </div>
                <h3 className="font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-1">{ub.badge.name}</h3>
                <p className="font-inter text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{ub.badge.description}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </AppLayout>
  );
}
