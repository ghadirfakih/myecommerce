// src/app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../backend/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching order' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;

    // Delete the order from the database
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json(deletedOrder);  // Return the deleted order info
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ message: 'Error deleting order' }, { status: 500 });
  }
}
