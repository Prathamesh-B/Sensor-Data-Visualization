import { Routes, Route } from "react-router-dom"; // Import necessary components

import Dashboard from "./components/Dashboard/Dashboard";
import DataConsole from "./components/DataConsole/DataConsole";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddNote from "./components/AddNote/AddNote";
import Production from "./components/Production/Production";
import Machine from "./components/Machine Overview/Machine";
import MODashboard from "./components/Dashboard/MODashboard";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<MODashboard />} />
        <Route path="/console" element={<DataConsole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<AddNote />} />
        <Route path="/production" element={<Production />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/mo" element={<MODashboard />} />
    </Routes>
);

export default AppRoutes;
