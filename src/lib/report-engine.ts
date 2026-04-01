import { prisma } from './prisma';
import { subDays, startOfWeek, endOfWeek, format } from 'date-fns';

export interface WeeklyReportData {
  userId: string;
  totalMinutes: number;
  missionsCompleted: number;
  cognitiveStates: Record<string, number>;
  productiveDay: string | null;
  pointsEarned: number;
  badgesUnlocked: number;
  weekStart: Date;
  weekEnd: Date;
  dailyMinutes: { date: string; minutes: number }[];
}

export async function generateWeeklyReportData(userId: string): Promise<WeeklyReportData> {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Domingo
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 }); // Sábado

  const sessions = await prisma.studySession.findMany({
    where: { userId, createdAt: { gte: weekStart, lte: weekEnd } },
    include: { cycles: true }
  });

  let totalMinutes = 0;
  let missionsCompleted = 0;
  const cognitiveStates: Record<string, number> = { focused: 0, tired: 0, stressed: 0 };
  const dailyMap: Record<string, number> = {};

  // Seed nos dias da semana p/ não deixar blanks no chart
  for (let i = 0; i < 7; i++) {
    const d = subDays(weekEnd, 6 - i);
    dailyMap[format(d, 'yyyy-MM-dd')] = 0;
  }

  sessions.forEach(session => {
    if (session.status === 'completed' || session.status === 'in_progress' || session.status === 'active') {
      const dayStr = format(session.createdAt, 'yyyy-MM-dd');
      dailyMap[dayStr] = (dailyMap[dayStr] || 0) + session.plannedDurationMin;
      totalMinutes += session.plannedDurationMin;

      session.cycles.forEach(cycle => {
        if (cycle.missionCompleted) missionsCompleted++;
        if (cycle.cognitiveState) {
          cognitiveStates[cycle.cognitiveState] = (cognitiveStates[cycle.cognitiveState] || 0) + 1;
        }
      });
    }
  });

  const dailyMinutes = Object.entries(dailyMap).map(([date, minutes]) => ({ date, minutes }));
  
  let productiveDay = null;
  let maxMin = 0;
  dailyMinutes.forEach(d => {
    if (d.minutes > maxMin) {
      maxMin = d.minutes;
      productiveDay = d.date;
    }
  });

  // Financeiro de Pontos Acumulados
  const pointTxs = await prisma.pointTransaction.aggregate({
    where: { userId, createdAt: { gte: weekStart, lte: weekEnd } },
    _sum: { amount: true }
  });

  // Medalhas Conquistadas
  const badges = await prisma.userBadge.count({
    where: { userId, unlockedAt: { gte: weekStart, lte: weekEnd } }
  });

  return {
    userId,
    totalMinutes,
    missionsCompleted,
    cognitiveStates,
    productiveDay,
    pointsEarned: pointTxs._sum.amount || 0,
    badgesUnlocked: badges,
    weekStart,
    weekEnd,
    dailyMinutes
  };
}

export function generateInsights(data: WeeklyReportData): string[] {
  const insights = [];
  
  if (data.totalMinutes > 600) {
    insights.push("🔥 Que semana incrível! Você acumulou mais de 10 horas de foco. Lembre-se que o descanso é tão vital quanto o processo.");
  }
  
  if (data.cognitiveStates['tired'] > (data.cognitiveStates['focused'] || 0)) {
    insights.push("😴 Notamos que você tem relatado cansaço com frequência. Considere focar em ciclos mais reduzidos no modelo Pomodoro Clássico.");
  }
  
  if (data.missionsCompleted > 10) {
    insights.push("💪 Suas articulações agradecem! Ótimo trabalho desativando os efeitos do sedentarismo respeitando as pausas.");
  } else if (data.missionsCompleted < 3 && data.totalMinutes > 120) {
    insights.push("⚠️ Você tem focado bastante, mas tem pulado abruptamente suas pausas. Lembre-se que não alongar prevê LER a longo prazo.");
  }
  
  if (insights.length === 0) {
    insights.push("✅ Você está mantendo um ritmo constante. Continue colhendo os atributos de XP no FocusFlow!");
  }
  
  return insights;
}
