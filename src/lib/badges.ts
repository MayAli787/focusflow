import { prisma } from './prisma';

export async function checkAndAwardBadges(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userBadges: true }
    });
    
    if (!user) return [];

    const existingBadgeIds = user.userBadges.map(ub => ub.badgeId);
    const allBadges = await prisma.badge.findMany();
    const newBadges: typeof allBadges = [];

    for (const badge of allBadges) {
      if (existingBadgeIds.includes(badge.id)) continue;

      let awarded = false;
      const val = badge.conditionValue;

      // Avaliação heurística dos tipos de condição
      if (badge.conditionType === 'focused_checkins') {
        const count = await prisma.studyCycle.count({
          where: { session: { userId }, cognitiveState: 'focused' }
        });
        if (count >= val) awarded = true;
      } 
      else if (badge.conditionType === 'total_study_hours') {
        const realResult = await prisma.studySession.aggregate({
          where: { userId, status: 'completed' },
          _sum: { plannedDurationMin: true }
        });
        
        const hours = (realResult._sum.plannedDurationMin || 0) / 60;
        if (hours >= val) awarded = true;
      }
      else {
        // Fallback genérico pras condicionais mais elaboradas (mock base em missões cumpridas de qualquer tipo pra demo)
        const counts = await prisma.studyCycle.count({
          where: { session: { userId }, missionCompleted: true }
        });
        if (counts >= val) awarded = true;
      }

      if (awarded) {
        await prisma.userBadge.create({
          data: { userId, badgeId: badge.id }
        });
        newBadges.push(badge);
      }
    }

    return newBadges;
  } catch (err) {
    console.error('Badge Engine Error', err);
    return [];
  }
}
