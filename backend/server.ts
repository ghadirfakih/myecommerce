// backend/app.ts
import express, { Request, Response } from 'express';
import prisma from './prisma'; // Import the Prisma client

const app = express();
const port = 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Endpoint to get all products
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany(); // Fetch all products from DB
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Endpoint to create a new product
app.post('/api/products', async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Endpoint to get orders
app.get('/api/orders', async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: true,
        user: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Endpoint to create a new order
app.post('/api/orders', async (req: Request, res: Response) => {
  const { userId, productId, totalPrice } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        productId,
        totalPrice,
        status: 'PENDING', // Default order status
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
