// app/layout.tsx
import React from 'react';

import './globals.css'; // If you have global styles
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage products and orders',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 text-gray-900">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full z-50">
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex flex-col flex-1 ml-64">
            {/* Navbar */}
            <header className="h-16 bg-white shadow-md fixed top-0 left-64 right-0 z-40">
              <Navbar />
            </header>

            {/* Page content */}
            <main className="mt-16 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
