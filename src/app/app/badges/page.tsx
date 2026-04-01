import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';

export default async function BadgesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  // Buscando todas as badges e conferindo quais existem no inventário
  const allBadges = await prisma.badge.findMany();
  const userInventory = await prisma.userBadge.findMany({
    where: { userId: user.id }
  });

  const unlockedIds = new Set(userInventory.map(ub => ub.badgeId));

  return (
    <AppLayout userName={user.name || undefined} userImage={user.image || undefined} healthPoints={user.healthPoints}>
      <div className="max-w-5xl mx-auto pb-20 pt-4">
        <div className="flex items-end justify-between mb-2">
          <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
            Galeria de Conquistas
          </h1>
          <span className="font-poppins font-bold text-lilac-600 dark:text-lilac-400 bg-lilac-100 dark:bg-lilac-900/40 px-3 py-1 rounded-full text-sm">
            {unlockedIds.size} / {allBadges.length}
          </span>
        </div>
        <p className="text-neutral-500 font-inter dark:text-neutral-100 mb-10 w-full max-w-2xl">
          Sua constância é recompensada no FocusFlow. Colecione medalhas preservando sua saúde física e respeitando os alertas ao longo das missões diárias.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {allBadges.map((badge) => {
            const isUnlocked = unlockedIds.has(badge.id);

            return (
              <div 
                key={badge.id}
                className={`relative flex flex-col items-center text-center p-6 rounded-[32px] transition-all duration-300 border ${
                  isUnlocked 
                    ? 'bg-white dark:bg-dark-card border-neutral-100 dark:border-dark-border shadow-card hover:-translate-y-1' 
                    : 'bg-neutral-50 dark:bg-dark-bg border-dashed border-neutral-200 dark:border-dark-border opacity-70 grayscale hover:grayscale-0 focus-within:grayscale-0'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner ${isUnlocked ? 'bg-lilac-100 dark:bg-lilac-900/30' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                  {badge.icon || '🏅'}
                </div>
                
                <h3 className={`font-poppins font-bold text-lg mb-2 ${isUnlocked ? 'text-neutral-900 dark:text-neutral-50' : 'text-neutral-600 dark:text-neutral-400'}`}>
                  {badge.name}
                </h3>
                
                <p className="font-inter text-xs text-neutral-500 dark:text-neutral-300">
                  {badge.description}
                </p>

                {isUnlocked && (
                  <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-[10px] font-bold uppercase tracking-widest font-inter">
                    Desbloqueada
                  </div>
                )}
                {!isUnlocked && (
                  <div className="mt-4 px-3 py-1 bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 rounded-full text-[10px] font-bold uppercase tracking-widest font-inter flex items-center gap-1">
                    <span>Bloqueada</span>
                    <span className="opacity-50">•</span>
                    <span>{badge.conditionValue} reqs</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
