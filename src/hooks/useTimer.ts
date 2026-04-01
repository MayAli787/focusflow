'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useTimer(sessionId: string, durationMin: number, totalCycles: number) {
  const STORAGE_KEY = `ff-timer-${sessionId}`;
  const totalSeconds = durationMin * 60;
  
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [phase, setPhase] = useState<'focus' | 'break'>('focus');
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  
  // Rastreamento Contínuo (3.3.1)
  const [continuousSitMinutes, setContinuousSitMinutes] = useState(0);
  const lastSitTickRef = useRef<number>(Date.now());
  const endTimeRef = useRef<number | null>(null);

  const [sitAlertThreshold, setSitAlertThreshold] = useState<number | null>(null);

  const playNotificationSound = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error('Audio falhou', e);
    }
  }, []);

  const sendPushNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }, []);

  const syncCycleToDB = useCallback(async (cycleNum: number) => {
    try {
      await fetch(`/api/sessions/${sessionId}/cycles`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycleNumber: cycleNum, durationMin }),
      });
    } catch {
      // Falha silenciosa no sync
    }
  }, [sessionId, durationMin]);

  const endFocusPhase = useCallback(() => {
    playNotificationSound();
    sendPushNotification('Ciclo Concluído! 🎉', `O ciclo ${currentCycle} de foco terminou. É hora da sua missão de saúde!`);
    setIsRunning(false);
    endTimeRef.current = null;
    syncCycleToDB(currentCycle);
    setPhase('break'); // entra no modal
  }, [currentCycle, playNotificationSound, sendPushNotification, syncCycleToDB]);

  const completeBreakPhase = useCallback(() => {
    // reseta tracker de tempo sentado (3.3.1)
    setContinuousSitMinutes(0);
    lastSitTickRef.current = Date.now();
    setSitAlertThreshold(null);
    
    if (currentCycle < totalCycles) {
      setCurrentCycle(prev => prev + 1);
      setTimeLeft(totalSeconds);
      setPhase('focus');
      // O usuário precisará clicar no "Play" para o timer novo começar (isRunning = false)
    } else {
      // Sessão toda finalizada
      setPhase('focus');
      setTimeLeft(0);
      setIsSessionComplete(true);
      localStorage.removeItem(STORAGE_KEY);
      // Aqui idealmente vai para a fase do CheckIn Cognitivo
    }
  }, [currentCycle, totalCycles, totalSeconds, STORAGE_KEY]);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && phase === 'focus') {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentCycle, endTime: endTimeRef.current }));
      }

      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((endTimeRef.current! - now) / 1000));
        
        setTimeLeft(remaining);

        // Tracker de contínuo
        const elapsedSinceLastSitTick = Math.floor((now - lastSitTickRef.current) / 60000); // minutos inteiros
        if (elapsedSinceLastSitTick >= 1) {
          setContinuousSitMinutes(prev => {
            const next = prev + 1;
            // Verifica thresholds (3.3.1)
            if (next === 30) setSitAlertThreshold(30);
            if (next === 60) setSitAlertThreshold(60);
            if (next === 90) setSitAlertThreshold(90);
            return next;
          });
          lastSitTickRef.current = now; // reseta o marco base p/ o px minuto
        }

        if (remaining === 0) {
          clearInterval(interval);
          endFocusPhase();
        }
      }, 500); 
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, phase, endFocusPhase, STORAGE_KEY, currentCycle]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const remaining = Math.max(0, Math.floor((data.endTime - Date.now()) / 1000));
        setCurrentCycle(data.currentCycle || 1);
        
        if (remaining > 0 && remaining < totalSeconds) {
          setTimeLeft(remaining);
          endTimeRef.current = data.endTime;
        } else if (remaining === 0) {
          endFocusPhase();
        }
      } catch {
        // Falha silenciosa no JSON parse
      }
    }
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [STORAGE_KEY, endFocusPhase, totalSeconds]);

  const toggle = () => {
    if (isRunning) {
      setIsRunning(false);
      endTimeRef.current = null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentCycle, remainingTime: timeLeft }));
    } else {
      setIsRunning(true);
      lastSitTickRef.current = Date.now(); // recomeça tick tracking
    }
  };

  const stop = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    setTimeLeft(totalSeconds);
    setIsSessionComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const dismissSitAlert = () => setSitAlertThreshold(null);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return {
    timeLeft,
    timeText: `${minutes}:${seconds}`,
    progressPercent,
    isRunning,
    currentCycle,
    continuousSitMinutes,
    phase,
    sitAlertThreshold,
    isSessionComplete,
    toggle,
    stop,
    completeBreakPhase,
    dismissSitAlert
  };
}
