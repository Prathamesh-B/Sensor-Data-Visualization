import { Routes, Route } from "react-router-dom"; // Import necessary components

import Dashboard from "./components/Dashboard/Dashboard";
import SensorData from "./components/SensorData/SensorData";
import AddNote from "./components/AddNote/AddNote";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sensors" element={<SensorData />} />
        <Route path="/addnote" element={<AddNote/>} />
    </Routes>
);

export default AppRoutes;
