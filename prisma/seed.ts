import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ==========================================
  // Health Missions (12+ missões)
  // ==========================================
  const missions = [
    // Hidratação (3)
    {
      category: 'hydration',
      title: 'Hora de hidratar!',
      description:
        'Beba um copo cheio de água agora. A hidratação é essencial para manter o cérebro funcionando no máximo. Levante-se, vá até a cozinha e encha seu copo.',
      points: 10,
    },
    {
      category: 'hydration',
      title: 'Encha sua garrafinha',
      description:
        'Verifique sua garrafinha de água. Se estiver vazia, vá até a cozinha e encha-a. Se ainda tiver água, beba pelo menos metade agora.',
      points: 10,
    },
    {
      category: 'hydration',
      title: 'Chá ou água saborizada',
      description:
        'Que tal preparar um chá ou adicionar uma rodela de limão na sua água? Aproveite a pausa para se hidratar de forma especial.',
      points: 10,
    },

    // Descanso Ocular (2)
    {
      category: 'eye_rest',
      title: 'Regra 20-20-20',
      description:
        'Olhe para um objeto a pelo menos 6 metros de distância (cerca de 20 pés) por 20 segundos. Isso relaxa os músculos dos olhos e reduz a fadiga ocular.',
      points: 10,
    },
    {
      category: 'eye_rest',
      title: 'Descanso com olhos fechados',
      description:
        'Feche os olhos suavemente por 30 segundos. Coloque as palmas das mãos sobre os olhos para bloquear a luz. Respire fundo e relaxe.',
      points: 10,
    },

    // Alongamento (3 com vídeo)
    {
      category: 'stretch',
      title: 'Alongamento de pescoço',
      description:
        'Incline a cabeça para a direita, segure por 15 segundos. Repita para a esquerda. Depois, gire suavemente a cabeça em círculos. Isso alivia a tensão cervical.',
      videoUrl: 'https://www.youtube.com/watch?v=gFSaXkuT2zk',
      points: 10,
    },
    {
      category: 'stretch',
      title: 'Relaxamento de pulso e mãos',
      description:
        'Estenda o braço com a palma para cima. Com a outra mão, puxe os dedos para baixo suavemente por 15 segundos. Repita no outro braço. Previne LER.',
      videoUrl: 'https://www.youtube.com/watch?v=mSZWSQSSEjE',
      points: 10,
    },
    {
      category: 'stretch',
      title: 'Alongamento de coluna',
      description:
        'Sentado, gire o tronco para a direita com a mão na cadeira, segure por 15 segundos. Repita para a esquerda. Depois, estique os braços para cima com as mãos entrelaçadas.',
      videoUrl: 'https://www.youtube.com/watch?v=SFgGSajWzKA',
      points: 10,
    },

    // Respiração (2)
    {
      category: 'breathing',
      title: 'Respiração 4-7-8',
      description:
        'Inspire pelo nariz contando até 4. Segure a respiração contando até 7. Expire pela boca contando até 8. Repita 3 vezes. Essa técnica reduz a ansiedade.',
      points: 10,
    },
    {
      category: 'breathing',
      title: 'Box Breathing (Respiração quadrada)',
      description:
        'Inspire contando até 4. Segure contando até 4. Expire contando até 4. Segure contando até 4. Repita 4 vezes. Usada por atletas para foco.',
      points: 10,
    },

    // Movimento (2)
    {
      category: 'movement',
      title: 'Levante e caminhe',
      description:
        'Levante-se da cadeira e caminhe por 1 minuto. Vá até a janela, dê uma volta no cômodo, ou simplesmente fique de pé e balance os braços.',
      videoUrl: 'https://www.youtube.com/watch?v=M-8FvC3GRnk',
      points: 10,
    },
    {
      category: 'movement',
      title: '10 agachamentos rápidos',
      description:
        'Levante-se e faça 10 agachamentos no lugar. Mantenha as costas retas e os joelhos alinhados com os pés. Isso ativa a circulação e dá energia.',
      points: 10,
    },
  ];

  for (const mission of missions) {
    await prisma.healthMission.upsert({
      where: { id: mission.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25) },
      update: mission,
      create: mission,
    });
  }

  console.log(`✅ ${missions.length} missões de saúde criadas`);

  // ==========================================
  // Badges (7 medalhas)
  // ==========================================
  const badges = [
    {
      name: 'Iron Back',
      description: 'Complete 10 alongamentos em uma semana. Sua coluna agradece!',
      icon: '🦴',
      conditionType: 'stretch_count_weekly',
      conditionValue: 10,
    },
    {
      name: 'Hydration Hero',
      description: 'Complete missões de hidratação em 100% das pausas de uma semana inteira.',
      icon: '💧',
      conditionType: 'hydration_perfect_week',
      conditionValue: 1,
    },
    {
      name: 'Eagle Eyes',
      description: 'Complete 10 descansos oculares. Seus olhos agradecem!',
      icon: '👁️',
      conditionType: 'eye_rest_count',
      conditionValue: 10,
    },
    {
      name: 'Focus Streak',
      description: 'Complete ciclos de estudo por 5 dias consecutivos. Você é imparável!',
      icon: '🔥',
      conditionType: 'consecutive_days',
      conditionValue: 5,
    },
    {
      name: 'Zen Student',
      description:
        'Registre 30 check-ins com estado "Focado". Sua concentração é admirável!',
      icon: '🧘',
      conditionType: 'focused_checkins',
      conditionValue: 30,
    },
    {
      name: 'Iron Wrists',
      description: 'Assista 5 vídeos de relaxamento de pulso e mãos até o fim. Adeus LER!',
      icon: '🖐️',
      conditionType: 'wrist_videos_watched',
      conditionValue: 5,
    },
    {
      name: 'Marathon Runner',
      description:
        'Acumule 50 horas de estudo no total. Você é uma verdadeira máquina de aprendizado!',
      icon: '🏃',
      conditionType: 'total_study_hours',
      conditionValue: 50,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { id: badge.name.toLowerCase().replace(/\s+/g, '-') },
      update: badge,
      create: badge,
    });
  }

  console.log(`✅ ${badges.length} medalhas criadas`);

  console.log('🌱 Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
