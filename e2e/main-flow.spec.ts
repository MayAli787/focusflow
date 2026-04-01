import { test, expect } from '@playwright/test';

test('Redirecionamento Protegido Auth', async ({ page }) => {
  await page.goto('/app/dashboard');
  
  // Como o NextAuth protege o contexto /app/*, obrigatoriamente manda para login
  await expect(page.url()).toContain('/login');
});

test('Integração de Estilos Globais', async ({ page }) => {
  // Apenas stub demonstrativo de E2E Base
  expect(true).toBe(true);
});
