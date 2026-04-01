'use client';
import { useState, useCallback, useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { TimerRing } from './timer-ring';
import { TimerControls } from './timer-controls';
import { CycleProgressDots } from './cycle-progress-dots';
import { BreakMissionModal } from '../missions/break-mission-modal';
import { CognitiveCheckIn } from '../cognitive/cognitive-check-in';
import { SitTimeAlert } from './sit-time-alert';
import { Maximize, Minimize, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function TimerView({
  sessionId,
  sessionName,
  durationMin,
  totalCycles
}: {
  sessionId: string;
  sessionName: string;
  durationMin: number;
  totalCycles: number;
}) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  const timer = useTimer(sessionId, durationMin, totalCycles);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFocusMode) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        setIsFocusMode(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFocusMode(false);
      }
    } catch {
      console.error('Fullscreen falhou');
    }
  }, [isFocusMode]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFocusMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <div className={`flex flex-col w-full transition-all duration-500 ease-in-out ${isFocusMode ? 'fixed inset-0 z-[40] bg-neutral-50 dark:bg-dark-bg p-8 items-center justify-center' : 'h-full min-h-[calc(100vh-140px)]'}`}>
        
        {!isFocusMode && (
          <div className="flex items-center justify-between mb-8 w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/app/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-poppins font-bold text-neutral-900 dark:text-neutral-50">
                  {sessionName}
                </h1>
                <p className="text-sm font-inter text-neutral-500 dark:text-neutral-100">
                  Tempo de Meta: {durationMin} min | Ciclos: {totalCycles}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="rounded-full">
              <Maximize size={20} />
            </Button>
          </div>
        )}

        {isFocusMode && (
          <div className="absolute top-8 right-8 animate-slide-down z-50">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="rounded-full hover:bg-neutral-200 dark:hover:bg-dark-card">
              <Minimize size={24} />
            </Button>
          </div>
        )}

        <div className={`flex flex-col items-center flex-1 w-full max-w-xl mx-auto ${isFocusMode ? 'justify-center relative' : 'justify-start pt-8'}`}>
          <CycleProgressDots 
            totalCycles={totalCycles} 
            currentCycle={timer.currentCycle} 
            className="mb-12 scale-110" 
          />

          <TimerRing 
            progress={timer.progressPercent} 
            timeText={timer.timeText}
            label={`Sessão ${timer.currentCycle} de ${totalCycles}`}
            className="mb-14 scale-110"
          />

          <TimerControls 
            isRunning={timer.isRunning} 
            onToggle={timer.toggle} 
            onStop={timer.stop} 
            className="scale-110"
          />

          {isFocusMode && (
            <p className="absolute bottom-8 text-neutral-400 dark:text-neutral-500 font-inter text-sm tracking-wide animate-pulse-slow">
              Foque no que realmente importa.
            </p>
          )}
        </div>
      </div>

      <BreakMissionModal 
        isOpen={timer.phase === 'break'} 
        cycleId={undefined} // Backend resolve pela mais recente ou passa fallback 
        pauseDurationMin={5} 
        onClose={timer.completeBreakPhase} 
        onComplete={timer.completeBreakPhase} 
      />

      <SitTimeAlert 
        threshold={timer.sitAlertThreshold} 
        onDismiss={timer.dismissSitAlert} 
      />

      {timer.isSessionComplete && (
        <CognitiveCheckIn 
          cycleId={null} // O Diário Cognitivo atualizado (conforme PRD) busca o último ciclo se null
          onClose={timer.stop} // Ao fechar, volta pro estado inicial
        />
      )}
    </>
  );
}
