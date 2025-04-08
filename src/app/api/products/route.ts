import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Fetch all products
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, stock } = body;

    const newProduct = await prisma.product.create({
      data: { name, description, price, stock },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
