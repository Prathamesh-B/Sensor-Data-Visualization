import { Avatar, NavLink, Text } from "@mantine/core";
import {
    BarChart2,
    LayoutDashboard,
    LogOut,
    NotebookPen,
    UsersRound,
    Table2,
    FileClock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            setUsername(token.username);
            setRole(token.role);
        }
    }, []);

    const getDashboardLink = () => {
        if (role === "Supervisor" || role === "Product Manager") {
            return "/svpm";
        } else if (role === "Machine Operator") {
            return "/mo";
        } else {
            return "/";
        }
    };

    return (
        <>
            <div className="nav-top">
                <div className="logo rokkitt-400">ProdViz</div>
                {isAuthenticated ? (
                    <>
                        <NavLink
                            component={Link}
                            to={getDashboardLink()}
                            leftSection={<LayoutDashboard strokeWidth={1} />}
                            mt="sm"
                            label="Dashboard"
                            active={location.pathname === getDashboardLink()}
                        />
                        <NavLink
                            component={Link}
                            to="/console"
                            leftSection={<Table2 strokeWidth={1} />}
                            label="Data Console"
                            mt="sm"
                            active={location.pathname === "/console"}
                        />
                        <NavLink
                            component={Link}
                            to="/report"
                            leftSection={<NotebookPen strokeWidth={1} />}
                            label="Reports"
                            mt="sm"
                            active={location.pathname === "/report"}
                        />
                        <NavLink
                            component={Link}
                            to="/dwr"
                            leftSection={<FileClock strokeWidth={1} />}
                            label="Downtime Report"
                            mt="sm"
                            active={location.pathname === "/dwr"}
                        />
                        <NavLink
                            component={Link}
                            to="/production"
                            leftSection={<BarChart2 strokeWidth={1} />}
                            label="Production"
                            mt="sm"
                            active={location.pathname === "/production"}
                        />
                    </>
                ) : (
                    <NavLink
                        component={Link}
                        to="/login"
                        leftSection={<UsersRound strokeWidth={1} />}
                        label="Login"
                        mt="sm"
                        active={location.pathname === "/login"}
                    />
                )}
            </div>
            {isAuthenticated && (
                <div className="nav-bottom">
                    <div className="usermenu">
                        <div className="contentWrapper">
                            <Avatar color={"blue"} radius={"lg"} mt="sm">
                                {username && username.charAt(0).toUpperCase()}
                            </Avatar>
                            <div style={{ paddingLeft: "0.5rem" }}>
                                <Text style={{ fontWeight: "bold" }} size="md">
                                    {username}
                                </Text>
                                <Text size="sm">{role}</Text>
                            </div>
                        </div>
                        <div className="logoutWrapper">
                            <LogOut
                                strokeWidth={1}
                                size={30}
                                style={{ cursor: "pointer" }}
                                onClick={logout}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
