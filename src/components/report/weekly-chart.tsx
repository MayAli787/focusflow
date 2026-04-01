'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

export function WeeklyChart({ data }: { data: { date: string; minutes: number }[] }) {
  const chartData = data.map(d => ({
    name: format(parseISO(d.date), 'EE', { locale: ptBR }), // "seg", "ter"
    minutes: d.minutes
  }));

  return (
    <div className="w-full h-[300px] bg-white dark:bg-dark-card rounded-[32px] p-6 md:p-8 shadow-card border border-neutral-100 dark:border-dark-border">
      <h3 className="font-poppins font-bold text-neutral-900 dark:text-neutral-50 mb-6">Foco por Dia (min)</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 13, fontFamily: 'Inter' }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 13, fontFamily: 'Inter' }} 
          />
          <Tooltip 
            cursor={{ fill: 'rgba(160, 144, 255, 0.1)' }}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
            formatter={(value: unknown) => [`${value} minutos`, 'Foco']}
          />
          <Bar dataKey="minutes" radius={[8, 8, 8, 8]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#A090FF' : '#f3f4f6'} className="dark:fill-lilac-600 outline-none" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
