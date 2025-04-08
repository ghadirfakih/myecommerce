'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  customer?: {
    name?: string;
    email?: string;
  };
  product?: {
    name: string;
    price: number;
  };
  totalPrice: number;
  status: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        console.log('Fetched orders:', data);
        setOrders(data);
      } catch (error) {
        console.error(error);
        setError('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error(error);
      setError('Error deleting order');
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Order List</h1>
      <div className="mb-4">
        <Link href="/orders/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Order
        </Link>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">
                {order.customer?.name ?? 'Unknown Customer'}
              </td>
              <td className="border px-4 py-2">
                {order.product ? (
                  <div>{order.product.name} (${order.product.price})</div>
                ) : (
                  <span>No product</span>
                )}
              </td>
              <td className="border px-4 py-2">${order.totalPrice}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                <Link href={`/orders/update/${order.id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
