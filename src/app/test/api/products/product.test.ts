import { prisma } from "@/lib/prisma";
import { GET, PUT, DELETE } from "@/app/api/products/[id]/route";  // Correct import paths

// Mock Prisma Client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    product: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Products API Routes", () => {
  it('should run a basic test', () => {
    expect(true).toBe(true); // Simple placeholder test
  });
  });

  // Test GET - Fetch product by ID
  describe("GET /api/products/:id", () => {
    it("should return a product if found", async () => {
      // Mock prisma to return a product
      (prisma.product.findUnique as jest.Mock).mockResolvedValueOnce({
        id: "1",
        name: "Product 1",
        description: "A sample product",
        price: 10.99,
        stock: 100,
      });

      const response = await GET(
        {} as Request,
        { params: { id: "1" } }
      );

      expect(response.status).toBe(200);
      const product = await response.json();
      expect(product).toEqual({
        id: "1",
        name: "Product 1",
        description: "A sample product",
        price: 10.99,
        stock: 100,
      });
    });

    it("should return a 404 if the product is not found", async () => {
      // Mock prisma to return null (product not found)
      (prisma.product.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const response = await GET(
        {} as Request,
        { params: { id: "999" } }
      );

      expect(response.status).toBe(404);
      const error = await response.json();
      expect(error).toEqual({ error: "Product not found" });
    });
  });

  // Test PUT - Update a product
  describe("PUT /api/products/:id", () => {
    it("should successfully update a product", async () => {
      const updatedProductData = {
        name: "Updated Product",
        description: "Updated description",
        price: 15.99,
        stock: 50,
      };

      // Mock prisma to return an updated product
      (prisma.product.update as jest.Mock).mockResolvedValueOnce({
        id: "1",
        ...updatedProductData,
      });

      const response = await PUT(
        { json: async () => updatedProductData } as Request,
        { params: { id: "1" } }
      );

      expect(response.status).toBe(200);
      const updatedProduct = await response.json();
      expect(updatedProduct).toEqual({
        id: "1",
        ...updatedProductData,
      });
    });

    it("should return a 404 if the product is not found", async () => {
      const updatedProductData = {
        name: "Updated Product",
        description: "Updated description",
        price: 15.99,
        stock: 50,
      };

      // Mock prisma to simulate product not found error
      (prisma.product.update as jest.Mock).mockRejectedValueOnce(new Error("Not found"));

      const response = await PUT(
        { json: async () => updatedProductData } as Request,
        { params: { id: "999" } }
      );

      expect(response.status).toBe(404);
      const error = await response.json();
      expect(error).toEqual({ error: "Error updating product" });
    });
  });

  // Test DELETE - Delete a product
  describe("DELETE /api/products/:id", () => {
    it("should successfully delete a product", async () => {
      // Mock prisma to simulate a product deletion
      (prisma.product.delete as jest.Mock).mockResolvedValueOnce({
        id: "1",
        name: "Product 1",
        description: "A sample product",
        price: 10.99,
        stock: 100,
      });

      const response = await DELETE({} as Request, { params: { id: "1" } });

      expect(response.status).toBe(200);
      const message = await response.json();
      expect(message).toEqual({ message: "Product deleted successfully" });
    });

    it("should return a 404 if the product is not found", async () => {
      // Mock prisma to simulate product not found error
      (prisma.product.delete as jest.Mock).mockRejectedValueOnce(new Error("Not found"));

      const response = await DELETE({} as Request, { params: { id: "999" } });

      expect(response.status).toBe(404);
      const error = await response.json();
      expect(error).toEqual({ message: "Product not found" });
    });
  });
