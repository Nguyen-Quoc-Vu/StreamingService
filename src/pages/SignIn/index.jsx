import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="w-full">
        <form className="bg-gray-800 shadow-md rounded px-16 pt-6 pb-10 mb-6">
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              className="bg-gray-700 shadow appearance-none rounded w-full py-2 px-3  text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="full-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-gray-700 shadow appearance-none rounded w-full py-2 px-3  text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={email}
              placeholder="abc@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
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
              className="bg-gray-700 shadow appearance-none rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="apassword"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-700 hover:bg-green-800 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={register}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
