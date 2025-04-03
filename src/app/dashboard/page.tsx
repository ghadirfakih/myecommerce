'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("/api/products");
        const orderRes = await fetch("/api/orders");

        if (productRes.ok && orderRes.ok) {
          const productsData = await productRes.json();
          const ordersData = await orderRes.json();

          setTotalProducts(productsData.length); 
          setTotalOrders(ordersData.length);
          setRecentOrders(ordersData.slice(0, 3));
          setLatestProducts(productsData.slice(0, 3));
        } else {
          console.error("Error fetching data from the server");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-blue-100">
              <CardContent>
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-green-100">
              <CardContent>
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                <ul>
                  {recentOrders.map((order) => (
                    <li key={order.id} className="border-b py-2">
                      {order.id} - {order.customer} - <span className="font-bold">{order.total}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Latest Added Products</h3>
                <ul>
                  {latestProducts.map((product) => (
                    <li key={product.id} className="border-b py-2">
                      {product.name} - <span className="font-bold">{product.price}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
