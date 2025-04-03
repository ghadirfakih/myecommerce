"use client";

import Link from "next/link";

export default function Register() {
  return (
      <div className="flex h-screen justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-center">Register</h2>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-2"
            />
            <button className="w-full bg-blue-600 text-white p-2 rounded">
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href='/login' className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
  );
}
