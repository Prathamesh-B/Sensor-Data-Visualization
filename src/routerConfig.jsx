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
import Cp from "./components/Control Panel/CP";
import Sim from "./components/Simulator/Sim";
import Users from "./components/Master/Users";

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
            path="/control"
            element={
                <ProtectedRoute>
                    <Cp />
                </ProtectedRoute>
            }
        />
        <Route
            path="/simulator"
            element={
                <ProtectedRoute>
                    <Sim />
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
        <Route
            path="/users"
            element={
                <ProtectedRoute>
                    <Users />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default AppRoutes;
