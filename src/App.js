import "./App.css";
import ReactGA from "react-ga";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { Header } from "./components/Shared/Header";
import { Footer } from "./components/Shared/Footer";
import usePageTracking from "./hooks/usePageTracking";
const TRACKING_ID = "UA-128048081-8"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
function App() {
  return (
    <div className="flex flex-col bg-gray-900 items-center text-gray-50 scroll-smooth">
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
