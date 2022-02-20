import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AppRoutes from "./components/AppRoutes";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

function App() {
  return (
    <div className="flex flex-col bg-gray-900 items-center text-gray-50">
      <BrowserRouter>
        <Header />
        <div className="min-h-screen my-8">
          <AppRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
