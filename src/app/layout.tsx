import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FocusFlow — Estude mais. Viva melhor.',
  description:
    'Plataforma de produtividade centrada na saúde do estudante. Ciclos de estudo inteligentes com missões de saúde gamificadas.',
  keywords: ['pomodoro', 'estudo', 'saúde', 'produtividade', 'foco', 'gamificação'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-inter antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
