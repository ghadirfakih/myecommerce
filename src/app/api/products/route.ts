// src/app/api/products/route.ts

import { NextResponse } from 'next/server';
import  prisma  from '../../../../backend/prisma'; // Adjust based on your prisma setup

// GET method to fetch products
export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Fetch all products
    console.log(products); 
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// POST method to create a new product
export async function POST(req: Request) {
  try {
    const { name, description, price, stock } = await req.json(); // Get data from the request body

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
