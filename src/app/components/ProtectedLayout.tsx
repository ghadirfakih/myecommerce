"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar */}
        <div className="bg-blue-600 text-white p-4">
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
