import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { Header } from "./components/Shared/Header";
import { Footer } from "./components/Shared/Footer";

function App() {
  return (
    <div className="flex flex-col bg-gray-900 items-center text-gray-50">
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
