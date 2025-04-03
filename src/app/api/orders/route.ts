// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
// import prisma from '../../../../backend/prisma';
import prisma  from '../../../../backend/prisma'; // Adjust path as needed

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        user: true,  // Fetch associated customer data
        product: true,  // Fetch associated products data
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { userId, productId, totalPrice } = await req.json();

    // Validate the productId
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Create the order
    const newOrder = await prisma.orders.create({
      data: {
        userId,
        productId,
        totalPrice,
        status: 'PENDING', // Default status or based on your application logic
        createdAt: new Date(),
      },
    });

    // Return the newly created order as response
    return NextResponse.json(newOrder);  // Ensure the order is returned here
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const { userId, productId, totalPrice, status } = await req.json();

//     // Validate required fields
//     if (!userId || !productId || !totalPrice || !status) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     // Create the order
//     const newOrder = await prisma.order.create({
//       data: {
//         userId,
//         productId,
//         totalPrice,
//         status, 
//       },
//     });

//     return NextResponse.json(newOrder);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
//   }
// }
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const deletedOrder = await prisma.orders.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedOrder);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting order' }, { status: 500 });
  }
}