import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { SessionSetupForm } from '@/components/timer/session-setup-form';

export default async function TimerSetupPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { defaultConfig: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  return (
    <AppLayout
      userName={user.name || undefined}
      userImage={user.image || undefined}
      healthPoints={user.healthPoints}
    >
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
            Nova Sessão de Foco
          </h1>
          <p className="mt-2 text-neutral-500 font-inter dark:text-neutral-100">
            Defina sua duração ideal e inicie a imersão nos estudos.
          </p>
        </div>
        
        <SessionSetupForm defaultConfig={user.defaultConfig as any} />
      </div>
    </AppLayout>
  );
}
