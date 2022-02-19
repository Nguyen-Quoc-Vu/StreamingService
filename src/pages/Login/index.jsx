import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="w-full">
        <form className="bg-gray-800 shadow-md rounded px-16 pt-6 pb-10 mb-6">
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-700 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-700 hover:bg-green-800 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              to="/register"
            >
              Create a account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
