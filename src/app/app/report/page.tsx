import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { generateWeeklyReportData, generateInsights } from '@/lib/report-engine';
import { WeeklyChart } from '@/components/report/weekly-chart';
import { ExportPdfButton } from '@/components/report/export-button';
import { Lightbulb, Calendar, Flame } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function ReportPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, image: true, healthPoints: true },
  });

  if (!user) redirect('/login');

  const data = await generateWeeklyReportData(user.id);
  const insights = generateInsights(data);

  return (
    <AppLayout userName={user.name || undefined} userImage={user.image || undefined} healthPoints={user.healthPoints}>
      <div className="max-w-4xl mx-auto pb-20 pt-4 print:pt-0 print:m-0 print:max-w-none print:w-full">
        
        {/* Header - visível sempre, mas botão exportPdf hidden on print */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-neutral-100 dark:border-dark-border pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-lilac-100 dark:bg-lilac-900/30 text-lilac-700 dark:text-lilac-400 rounded-lg">
                <Calendar size={20} />
              </span>
              <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                Relatório de Sobrevivência
              </h1>
            </div>
            <p className="text-neutral-500 font-inter dark:text-neutral-100 uppercase tracking-widest text-xs font-semibold">
              Semana de {format(data.weekStart, "dd/MM", { locale: ptBR })} à {format(data.weekEnd, "dd/MM/yyyy", { locale: ptBR })}
            </p>
          </div>
          <ExportPdfButton />
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 print:grid-cols-4">
          <StatCard title="Tempo de Foco" value={`${Math.floor(data.totalMinutes / 60)}h`} sub={`${data.totalMinutes % 60}m`} icon="⏱️" />
          <StatCard title="Missões Cumpridas" value={data.missionsCompleted.toString()} sub="físico" icon="🏃‍♂️" />
          <StatCard title="Pontos Ganhos" value={`+${data.pointsEarned}`} sub="saúde" icon="❤️" />
          <StatCard title="Medalhas Novas" value={data.badgesUnlocked.toString()} sub="desbloqueadas" icon="🏅" />
        </div>

        {/* Gráfico */}
        <div className="mb-10 print:break-inside-avoid">
          <WeeklyChart data={data.dailyMinutes} />
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-lilac-50 to-pink-50 dark:from-lilac-950/20 dark:to-pink-950/20 rounded-[32px] p-6 md:p-8 border border-lilac-100 dark:border-pink-900/20 print:break-inside-avoid print:bg-neutral-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-lilac-500 to-pink-500 text-white p-2.5 rounded-[14px] shadow-sm">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Análise e Recomendações
            </h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-dark-border text-neutral-700 dark:text-neutral-200 font-inter leading-relaxed">
                {insight}
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, sub, icon }: { title: string; value: string; sub: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-dark-card p-5 rounded-3xl border border-neutral-100 dark:border-dark-border shadow-sm flex flex-col justify-center">
      <span className="text-xl mb-3">{icon}</span>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-poppins font-black text-3xl text-neutral-900 dark:text-neutral-50">{value}</span>
        <span className="font-inter font-semibold text-sm text-neutral-400 dark:text-neutral-500 uppercase">{sub}</span>
      </div>
      <span className="text-neutral-500 dark:text-neutral-400 font-inter text-[11px] uppercase tracking-wider font-bold">{title}</span>
    </div>
  );
}
