'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const sessionSchema = z.object({
  name: z.string().max(50).optional(),
  durationMin: z.number().min(1).max(180),
  sessionsPlanned: z.number().min(1).max(12),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export function SessionSetupForm({ defaultConfig }: { defaultConfig: Partial<SessionFormData> | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: '',
      durationMin: defaultConfig?.durationMin || 25,
      sessionsPlanned: defaultConfig?.sessionsPlanned || 4,
    },
  });

  const durationMin = watch('durationMin');
  const sessionsPlanned = watch('sessionsPlanned');
  const totalPredictedTime = (durationMin || 0) * (sessionsPlanned || 0);

  const onSubmit = async (data: SessionFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Falha ao criar sessão');

      const result = await res.json();
      
      // Opcional: Persistir config
      fetch('/api/users/config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          durationMin: data.durationMin,
          sessionsPlanned: data.sessionsPlanned,
        }),
      }).catch(console.error);

      router.push(`/app/timer/${result.id}`);
    } catch (err) {
      toast.error('Ocorreu um erro ao iniciar a sessão.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-dark-card border-neutral-100 dark:border-dark-border shadow-card hover:shadow-card-hover transition-shadow">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-inter font-medium text-neutral-900 dark:text-neutral-50 mb-1 block">
              Nome da Sessão (Opcional)
            </label>
            <Input
              placeholder="Ex: Matemática - Cálculo Integral"
              {...register('name')}
              className={errors.name ? 'border-pink-500 focus:ring-pink-500' : ''}
            />
            {errors.name && <p className="text-xs text-pink-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-inter font-medium text-neutral-900 dark:text-neutral-50 mb-1 block">
                Duração de cada Ciclo (min)
              </label>
              <Input
                type="number"
                min={1}
                max={180}
                {...register('durationMin', { valueAsNumber: true })}
                className={errors.durationMin ? 'border-pink-500 focus:ring-pink-500' : ''}
              />
              {errors.durationMin && <p className="text-xs text-pink-500 mt-1">{errors.durationMin.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-inter font-medium text-neutral-900 dark:text-neutral-50 mb-1 block">
                Número de Sessões (1-12)
              </label>
              <Input
                type="number"
                min={1}
                max={12}
                {...register('sessionsPlanned', { valueAsNumber: true })}
                className={errors.sessionsPlanned ? 'border-pink-500 focus:ring-pink-500' : ''}
              />
              {errors.sessionsPlanned && <p className="text-xs text-pink-500 mt-1">{errors.sessionsPlanned.message}</p>}
            </div>
          </div>

          {/* Preview tempo total */}
          <div className="rounded-lg bg-neutral-50 dark:bg-dark-bg p-4 flex items-center justify-between">
            <span className="text-sm font-inter text-neutral-500 dark:text-neutral-100">
              Tempo total estimado de foco:
            </span>
            <span className="text-lg font-poppins font-bold text-neutral-900 dark:text-neutral-50">
              {Math.floor(totalPredictedTime / 60)}h {totalPredictedTime % 60}m
            </span>
          </div>

          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-700 text-white font-inter" disabled={loading}>
            {loading ? 'Iniciando...' : 'Vamos Começar! 🚀'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
