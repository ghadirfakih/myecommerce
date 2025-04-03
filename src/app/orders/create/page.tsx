'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateOrder: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [status, setStatus] = useState('PENDING');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          totalPrice,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const newOrder = await response.json(); // Get the created order

    console.log('New order created:', newOrder)

      router.push('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block mb-2">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productId" className="block mb-2">Product ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="totalPrice" className="block mb-2">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">Order Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
