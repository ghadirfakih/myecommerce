'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when the component mounts
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full p-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 text-white bg-green-600 rounded mr-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-white bg-blue-600 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
