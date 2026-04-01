import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        defaultConfig: body,
      },
    });

    return NextResponse.json({ success: true, defaultConfig: user.defaultConfig });
  } catch (error) {
    console.error('API Users Config PATCH Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
