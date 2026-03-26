import { auth, signOut } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, Clock, LogOut, Trash2, Mail, Calendar } from 'lucide-react';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      userBadges: {
        include: { badge: true },
        orderBy: { unlockedAt: 'desc' },
      },
      _count: {
        select: {
          studySessions: true,
        },
      },
    },
  });

  if (!user) redirect('/login');

  const badgeCount = user.userBadges.length;
  const sessionCount = user._count.studySessions;

  return (
    <AppLayout
      userName={user.name || undefined}
      userImage={user.image || undefined}
      healthPoints={user.healthPoints}
    >
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header do perfil */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-lilac-100 flex items-center justify-center dark:bg-lilac-700/20">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'Foto de perfil'}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl font-poppins font-bold text-lilac-700 dark:text-lilac-300">
                {user.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
              {user.name}
            </h1>
            <div className="mt-1 flex items-center gap-2 justify-center sm:justify-start text-neutral-500 dark:text-neutral-100">
              <Mail size={14} />
              <span className="text-sm font-inter">{user.email}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 justify-center sm:justify-start text-neutral-500 dark:text-neutral-100">
              <Calendar size={14} />
              <span className="text-sm font-inter">
                Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="pt-4">
              <Heart size={24} className="mx-auto text-pink-500 fill-pink-500 mb-2" />
              <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                {user.healthPoints}
              </p>
              <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                Pontos de Saúde
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Trophy size={24} className="mx-auto text-lilac-500 mb-2" />
              <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                {badgeCount}
              </p>
              <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                Medalhas
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Clock size={24} className="mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                {sessionCount}
              </p>
              <p className="text-xs font-inter text-neutral-500 dark:text-neutral-100">
                Sessões
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Medalhas recentes */}
        {badgeCount > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Medalhas Conquistadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.userBadges.map((ub) => (
                  <Badge key={ub.id} variant="success">
                    <span>{ub.badge.icon}</span>
                    {ub.badge.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="space-y-3">
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg border-2 border-neutral-100 bg-white px-4 py-3 text-sm font-inter font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:bg-dark-card dark:border-dark-border dark:text-neutral-50 dark:hover:bg-dark-border"
            >
              <LogOut size={18} className="text-neutral-500" />
              Sair da conta
            </button>
          </form>

          <button className="flex w-full items-center gap-3 rounded-lg border-2 border-pink-100 bg-white px-4 py-3 text-sm font-inter font-medium text-pink-700 transition-colors hover:bg-pink-50 dark:bg-dark-card dark:border-pink-700/30 dark:hover:bg-pink-700/10">
            <Trash2 size={18} />
            Excluir meus dados (LGPD)
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
