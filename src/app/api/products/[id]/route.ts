import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch a single product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Fetching product with ID:", params.id);
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, price, stock } = await req.json();

    console.log("Updating product:", params.id, {
      name,
      description,
      price,
      stock,
    });

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Correct way to handle params

    console.log("Deleting product with ID:", id);

    const deletedProduct = await prisma.product.delete({
      where: { id: String(id) },
    });

    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
