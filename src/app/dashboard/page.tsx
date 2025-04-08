'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Order {
  id: string;
  customer: string;
  total: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
}

const Dashboard: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("/api/products");
        const orderRes = await fetch("/api/orders");

        if (!productRes.ok) {
          throw new Error("Failed to fetch products");
        }
        if (!orderRes.ok) {
          throw new Error("Failed to fetch orders");
        }

        const productsData = await productRes.json();
        const ordersData = await orderRes.json();

        setTotalProducts(productsData.length);
        setTotalOrders(ordersData.length);
        setRecentOrders(ordersData.slice(0, 3));
        setLatestProducts(productsData.slice(0, 3));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching data:", error.message);
          alert(`Error fetching data: ${error.message}`);
        } else {
          console.error("Unknown error occurred", error);
          alert("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Data fetching is done
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-blue-100 shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card className="p-4 bg-green-100 shadow-xl">
          <CardContent>
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 shadow-xl">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
            <ul>
              {recentOrders.map((order) => (
                <li key={order.id} className="border-b py-2">
                  <span className="font-bold">Order #{order.id}</span> - {order.customer} -{" "}
                  <span className="font-semibold">{order.total}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-xl">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Latest Added Products</h3>
            <ul>
              {latestProducts.map((product) => (
                <li key={product.id} className="border-b py-2">
                  <span className="font-bold">{product.name}</span> -{" "}
                  <span className="font-semibold">{product.price}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
