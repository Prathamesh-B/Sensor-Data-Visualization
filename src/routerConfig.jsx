import { Routes, Route } from "react-router-dom"; // Import necessary components

import Dashboard from "./components/Dashboard/Dashboard";
import SensorData from "./components/SensorData/SensorData";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sensors" element={<SensorData />} />
        <Route path="/users" element={<SensorData />} />
    </Routes>
);

export default AppRoutes;
