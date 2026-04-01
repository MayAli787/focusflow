'use client';
import { useEffect, useState } from 'react';
import { OnboardingFlow } from './onboarding-flow';

export function OnboardingClientWrapper() {
  const [hasCompleted, setHasCompleted] = useState(true);

  useEffect(() => {
    const done = localStorage.getItem('ff_onboarding_done');
    if (!done) {
      setHasCompleted(false);
      localStorage.setItem('ff_onboarding_done', 'true'); // Marca p/ n repetir
    }
  }, []);

  if (hasCompleted) return null;
  return <OnboardingFlow hasCompleted={false} />;
}
