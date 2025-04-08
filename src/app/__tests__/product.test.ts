import { GET, POST } from '@/app/api/products/route';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

describe('Products API Routes - Real Database', () => {
  let createdProductId: number;

  it('GET should fetch all products from database', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST should create a new product in the database', async () => {
    const productData = {
      name: 'Test Product',
      description: 'From unit test',
      price: 19.99,
      stock: 10,
    };

    const mockRequest = {
      json: async () => productData,
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const result = await response.json();

    createdProductId = result.id;

    expect(response.status).toBe(201);
    expect(result).toMatchObject(productData);
  });

  afterAll(async () => {
    // Cleanup created product
    if (createdProductId) {
      await prisma.product.delete({
        where: { id: createdProductId.toString() },
      });
    }
    await prisma.$disconnect();
  });
});
