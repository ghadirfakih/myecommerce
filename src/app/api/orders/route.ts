// pages/api/orders/route.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        user: true,
        product: true,
      },
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Error fetching orders', error: error.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'An unknown error occurred' }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, productId, totalPrice, status } = await req.json();

    if (!userId || !productId || !totalPrice || !status) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const newOrder = await prisma.orders.create({
      data: {
        userId,
        productId,
        totalPrice,
        status,
      },
    });

    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Error creating order', error: error.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'An unknown error occurred' }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, userId, productId, totalPrice, status } = await req.json();

    if (!orderId || !userId || !productId || !totalPrice || !status) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: {
        userId,
        productId,
        totalPrice,
        status,
      },
    });

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Error updating order', error: error.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'An unknown error occurred' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ message: 'Missing orderId' }),
        { status: 400 }
      );
    }

    const deletedOrder = await prisma.orders.delete({
      where: { id: orderId },
    });

    return new Response(
      JSON.stringify({ message: 'Order deleted successfully', deletedOrder }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Error deleting order', error: error.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'An unknown error occurred' }),
      { status: 500 }
    );
  }
}
