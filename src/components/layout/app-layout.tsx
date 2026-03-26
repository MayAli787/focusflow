'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Timer,
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart3,
  User,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/timer', label: 'Timer', icon: Timer },
  { href: '/app/journal', label: 'Diário', icon: BookOpen },
  { href: '/app/badges', label: 'Medalhas', icon: Trophy },
  { href: '/app/report', label: 'Relatório', icon: BarChart3 },
];

interface AppLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userImage?: string;
  healthPoints?: number;
}

export function AppLayout({
  children,
  userName,
  userImage,
  healthPoints = 0,
}: AppLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-lilac-100 bg-white/80 backdrop-blur-md dark:bg-dark-card/80 dark:border-dark-border">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden rounded-md p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-dark-card"
            aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lilac-500 to-pink-500">
              <Timer size={18} className="text-white" />
            </div>
            <span className="hidden sm:block font-poppins font-bold text-lg text-neutral-900 dark:text-neutral-50">
              FocusFlow
            </span>
          </Link>

          {/* Right side: health points + profile */}
          <div className="flex items-center gap-3">
            {/* Health Points Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1.5 dark:bg-pink-700/20">
              <Heart size={14} className="text-pink-500 fill-pink-500" />
              <span className="text-sm font-semibold font-inter text-pink-700 dark:text-pink-300">
                {healthPoints}
              </span>
            </div>

            {/* Profile */}
            <Link
              href="/app/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-lilac-100 overflow-hidden dark:bg-lilac-700/20"
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName || 'Perfil'}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={16} className="text-lilac-700 dark:text-lilac-300" />
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside
        className={cn(
          'fixed left-0 top-16 bottom-0 z-40 w-64 border-r border-lilac-100 bg-white p-4 transition-transform duration-300',
          'dark:bg-dark-card dark:border-dark-border',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium font-inter transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-lilac-100 to-pink-100 text-lilac-700 dark:from-lilac-700/20 dark:to-pink-700/20 dark:text-lilac-300'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-dark-border dark:hover:text-neutral-50'
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="mx-auto max-w-5xl p-4 lg:p-8">{children}</div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-lilac-100 bg-white/90 backdrop-blur-md lg:hidden dark:bg-dark-card/90 dark:border-dark-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-inter transition-colors',
                  isActive
                    ? 'text-pink-500'
                    : 'text-neutral-500 dark:text-neutral-100'
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
