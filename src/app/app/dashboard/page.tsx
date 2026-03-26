import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, ArrowRight, Heart, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      userBadges: {
        include: { badge: true },
        orderBy: { unlockedAt: 'desc' },
        take: 3,
      },
      studySessions: {
        where: {
          startedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
        select: {
          plannedDurationMin: true,
          sessionsCompleted: true,
          cycles: {
            where: { missionCompleted: true },
            select: { id: true },
          },
        },
      },
    },
  });

  if (!user) redirect('/login');

  // Calcular estatísticas da semana
  const horasEstudadas = user.studySessions.reduce(
    (acc, s) => acc + (s.sessionsCompleted * s.plannedDurationMin) / 60,
    0
  );
  const missoesConcluidas = user.studySessions.reduce(
    (acc, s) => acc + s.cycles.length,
    0
  );

  const firstName = user.name?.split(' ')[0] || 'estudante';

  return (
    <AppLayout
      userName={user.name || undefined}
      userImage={user.image || undefined}
      healthPoints={user.healthPoints}
    >
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Saudação */}
        <div>
          <h1 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
            Olá, {firstName}! 👋
          </h1>
          <p className="mt-1 text-neutral-500 font-inter dark:text-neutral-100">
            Pronto para mais uma sessão de estudo saudável?
          </p>
        </div>

        {/* CTA Principal - Iniciar Sessão */}
        <Link href="/app/timer" className="block group">
          <Card className="relative overflow-hidden bg-gradient-to-r from-lilac-500 to-pink-500 border-none text-white transition-transform duration-200 group-hover:scale-[1.02]">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <Timer size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-poppins font-bold">Iniciar Nova Sessão</h2>
                  <p className="text-sm text-white/80 font-inter">
                    Configure seu ciclo de estudo
                  </p>
                </div>
              </div>
              <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
            </CardContent>
          </Card>
        </Link>

        {/* Resumo da Semana */}
        <div>
          <h2 className="text-lg font-poppins font-semibold text-neutral-900 mb-3 dark:text-neutral-50">
            Resumo da Semana
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Zap size={20} className="mx-auto text-blue-500 mb-1" />
                <p className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                  {horasEstudadas.toFixed(1)}h
                </p>
                <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                  Estudadas
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Heart size={20} className="mx-auto text-pink-500 fill-pink-500 mb-1" />
                <p className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                  {user.healthPoints}
                </p>
                <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                  Pontos
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-4">
                <Trophy size={20} className="mx-auto text-lilac-500 mb-1" />
                <p className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                  {missoesConcluidas}
                </p>
                <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                  Missões
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Medalhas Recentes */}
        {user.userBadges.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-poppins font-semibold text-neutral-900 dark:text-neutral-50">
                Últimas Conquistas
              </h2>
              <Link
                href="/app/badges"
                className="text-sm font-inter text-lilac-500 hover:text-lilac-700"
              >
                Ver todas →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.userBadges.map((ub) => (
                <Badge key={ub.id} variant="success">
                  <span>{ub.badge.icon}</span>
                  {ub.badge.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
