import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions/page";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleEnterPress = (key) => {
    console.log(key);
    if (key === "Enter") {
      logInWithEmailAndPassword(email, password);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage(null));
  }, [dispatch]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="gap-2 px-4 max-w-sm mt-24 mx-auto">
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
              className="bg-gray-700 shadow appearance-none rounded w-full py-2 px-3  text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => handleEnterPress(e.key)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-700 shadow appearance-none rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleEnterPress(e.key)}
            />
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-gray-100 hover:bg-gray-200 w-full text-black bg-opacity-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => signInWithGoogle(email, password)}
            >
              Login with Google
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-700 hover:bg-green-800 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() =>
                logInWithEmailAndPassword(email, password).then((e) =>
                  setErrorMessage(e.toString())
                )
              }
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
