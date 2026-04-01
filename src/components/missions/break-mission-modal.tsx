'use client';

import { useState, useEffect } from 'react';
import { YouTubePlayer } from './youtube-player';
import { Button } from '@/components/ui/button';
import { PointsPopup } from '../gamification/points-popup';
import { toast } from 'sonner';

export function BreakMissionModal({
  isOpen,
  cycleId,
  pauseDurationMin = 5,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  cycleId?: string;
  pauseDurationMin?: number;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [mission, setMission] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(pauseDurationMin * 60);
  const [showPoints, setShowPoints] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(pauseDurationMin * 60);
      setVideoWatched(false);
      fetch('/api/missions/random')
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setMission(data);
        })
        .catch(console.error);
    }
  }, [isOpen, pauseDurationMin]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleComplete = async () => {
    try {
      const points = videoWatched ? 30 : mission?.points || 10;
      await fetch('/api/missions/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycleId, missionId: mission?.id, pointsToAdd: points }),
      });
      setShowPoints(true);
      setTimeout(() => {
        onComplete();
        setShowPoints(false);
      }, 1500);
    } catch (e) {
      toast.error('Erro ao salvar pontos');
      onComplete(); // proceed anyway
    }
  };

  if (!isOpen || !mission) return null;

  const progress = ((pauseDurationMin * 60 - timeLeft) / (pauseDurationMin * 60)) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col md:items-center md:justify-center bg-neutral-900/60 backdrop-blur-sm p-4 animate-slide-up md:animate-pop">
      <div className="bg-lilac-100 dark:bg-dark-card w-full max-w-lg rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative mt-auto mb-0 md:m-auto">
        <div className="h-2 w-full bg-lilac-300/30">
          <div
            className="h-full bg-lilac-700 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-lilac-300 text-lilac-700 dark:bg-dark-border dark:text-neutral-50 rounded-full text-xs font-inter font-bold uppercase tracking-wider">
              {mission.category.replace('_', ' ')}
            </span>
            <span className="text-neutral-500 font-inter font-medium dark:text-neutral-100">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} restantes
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              {mission.title}
            </h2>
            <p className="text-neutral-500 font-inter dark:text-neutral-100 text-sm md:text-base leading-relaxed">
              {mission.description}
            </p>
          </div>

          {mission.videoUrl && (
            <YouTubePlayer
              videoUrl={mission.videoUrl}
              onVideoEnd={() => setVideoWatched(true)}
            />
          )}

          <div className="relative flex flex-col gap-3 mt-4 w-full items-center">
            <PointsPopup
              points={videoWatched ? 30 : mission.points}
              isVisible={showPoints}
              onComplete={() => {}}
            />
            <Button
              onClick={handleComplete}
              className="w-full bg-pink-500 hover:bg-pink-700 text-white font-poppins font-semibold h-14 text-lg rounded-xl shadow-card transition-transform active:scale-95"
            >
              Missão Concluída!
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-neutral-500 font-inter hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              Pular (Sem Pontos)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
