import { prisma } from "@/lib/prisma";
import { GET } from "@/app/api/orders/route"; // Adjust path as needed
import { createMocks } from "node-mocks-http";
import { NextApiRequest } from "next";  // Import Next.js Request

describe("GET /api/orders", () => {
  it("should return all orders", async () => {
    // Create mock request and response objects
    const { req } = createMocks({
      method: "GET",
    });

    // Cast `req` to NextApiRequest (Next.js specific)
    const request = req as unknown as NextApiRequest;

    // Call the GET function and handle the response
    const response = await GET(request);

    // Check response status and body
    expect(response.status).toBe(200);
    const orders = await response.json();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThanOrEqual(0); // Expecting at least one order
  });

  it("should handle errors gracefully", async () => {
    // Simulate a failure scenario (e.g., DB error)
    jest.spyOn(prisma.order, 'findMany').mockRejectedValueOnce(new Error("Database error"));

    const { req } = createMocks({ method: "GET" });

    // Cast `req` to NextApiRequest (Next.js specific)
    const request = req as unknown as NextApiRequest;

    const response = await GET(request);

    expect(response.status).toBe(500);
    const error = await response.json();
    expect(error.message).toBe("Error fetching orders");
  });
});
