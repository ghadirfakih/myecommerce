// backend/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// async function getAllOrders() {
//     const orders = await prisma.orders.findMany();
//     console.log(orders);
//   }
  
//   getAllOrders();
export default prisma;


