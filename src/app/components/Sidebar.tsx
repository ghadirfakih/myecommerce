'use client';
import { useState } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle sidebar width on click
  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out h-screen bg-gray-800 text-white p-4 ${
        isExpanded ? "w-96" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-full ml-2 bg-gray-600 p-2 text-white rounded-md"
      >
        {isExpanded ? "Collapse" : "Expand"}
      </button>
      <ul className="mt-10">
        <li className="mb-2">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="mb-2">
          <a href="/products">Products</a>
        </li>
        <li className="mb-2">
          <a href="/orders">Orders</a>
        </li>
      </ul>
    </aside>
  );
}
