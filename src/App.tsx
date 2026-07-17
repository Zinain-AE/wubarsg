import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import PackagePage from "./pages/PackagePage";
import AdditionalServicesPage from "./pages/AdditionalServicesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:id" element={<ServicePage />} />
      <Route path="/package/:id" element={<PackagePage />} />
      <Route path="/additional-services" element={<AdditionalServicesPage />} />
    </Routes>
  );
}
