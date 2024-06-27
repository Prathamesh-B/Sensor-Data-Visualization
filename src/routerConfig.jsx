import { Routes, Route } from "react-router-dom"; // Import necessary components

import Dashboard from "./components/Dashboard/Dashboard";
import SensorData from "./components/SensorData/SensorData";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddNote from "./components/AddNote/AddNote";
import Production from "./components/Production/Production";
import Machine from "./components/Machine Overview/Machine";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sensors" element={<SensorData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<AddNote />} />
        <Route path="/production" element={<Production />} />
        <Route path="/machine" element={<Machine />} />
    </Routes>
);

export default AppRoutes;
