'use client';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useEffect } from 'react';

export function ExportPdfButton() {

  // Escuta ctrl+p ou render local pra adicionar estilos extras de Print se necessário
  useEffect(() => {
    const handlePrint = () => {
      console.log('Emitindo relatório...');
    };
    window.addEventListener('beforeprint', handlePrint);
    return () => window.removeEventListener('beforeprint', handlePrint);
  }, []);

  return (
    <Button 
      onClick={() => window.print()}
      className="print:hidden bg-pink-500 hover:bg-pink-600 text-white font-poppins font-bold px-6 rounded-xl shadow-md transition-all active:scale-95"
    >
      <Printer className="w-5 h-5 mr-3" />
      Gerar PDF (Print)
    </Button>
  );
}
