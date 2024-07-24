import { Routes, Route } from "react-router-dom";
import DataConsole from "./components/DataConsole/DataConsole";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Report from "./components/Report/Report";
import Production from "./components/Production/Production";
import MODashboard from "./components/Dashboard/MODashboard";
import SVPMDashboard from "./components/Dashboard/SVPMDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import DowntimeReport from "./components/DowntimeReport/DowntimeReport";
import FloorMap from "./components/FloorMap/FloorMap";
import EditMap from "./components/FloorMap/EditMap";
import OEE from "./components/OEE/OEE";

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
            path="/report"
            element={
                <ProtectedRoute>
                    <Report />
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
        <Route
            path="/mop"
            element={
                <ProtectedRoute>
                    <OEE />
                </ProtectedRoute>
            }
        />
        
        <Route
            path="/floormap"
            element={
                <ProtectedRoute>
                    <FloorMap />
                </ProtectedRoute>
            }
        />
        
        <Route
            path="/editmap"
            element={
                <ProtectedRoute>
                    <EditMap />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default AppRoutes;
