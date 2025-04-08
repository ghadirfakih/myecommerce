'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Define the Order interface
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  products: {
    name: string;
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
}

const UpdateOrder: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);  // Specify the type here
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('Pending');
  const router = useRouter();
  const { id } = useParams(); // Extract the order ID from the URL

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data: Order = await response.json(); // Specify the type here
        setOrder(data);
        setCustomer(data.customer.name);
        setTotal(data.totalPrice.toString());
        setStatus(data.status);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Error fetching order');
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the updated order data
    const updatedOrder = {
      customer,
      totalPrice: parseFloat(total),
      status,
    };

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        alert(`Order updated successfully`);
        router.push('/orders'); // Navigate back to orders list
      } else {
        throw new Error('Failed to update order');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error updating order');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Update Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Total Amount</label>
          <input
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
