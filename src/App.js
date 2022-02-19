import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <div className="flex flex-col bg-gray-900 items-center text-gray-50">
      <BrowserRouter>
        <Header />
        <div className="min-h-screen">
          <AppRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
