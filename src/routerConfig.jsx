import { Routes, Route } from "react-router-dom";
import DataConsole from "./components/DataConsole/DataConsole";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddNote from "./components/AddNote/AddNote";
import Production from "./components/Production/Production";
import MODashboard from "./components/Dashboard/MODashboard";
import SVPMDashboard from "./components/Dashboard/SVPMDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import DowntimeReport from "./components/DowntimeReport/DowntimeReport";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/console"
            element={
                <ProtectedRoute>
                    <DataConsole />
                </ProtectedRoute>
            }
        />
        <Route
            path="/notes"
            element={
                <ProtectedRoute>
                    <AddNote />
                </ProtectedRoute>
            }
        />
        <Route
            path="/production"
            element={
                <ProtectedRoute>
                    <Production />
                </ProtectedRoute>
            }
        />
        <Route
            path="/dwr"
            element={
                <ProtectedRoute>
                    <DowntimeReport />
                </ProtectedRoute>
            }
        />
        <Route
            path="/mo"
            element={
                <ProtectedRoute>
                    <MODashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/svpm"
            element={
                <ProtectedRoute>
                    <SVPMDashboard />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default AppRoutes;
