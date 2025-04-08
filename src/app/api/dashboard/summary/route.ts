// src/app/api/dashboard/summary/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const latestOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        user: true,
        product: true,
      },
    });

    const latestProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      latestOrders,
      latestProducts,
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    return NextResponse.json({ message: 'Failed to load dashboard data' }, { status: 500 });
  }
}
