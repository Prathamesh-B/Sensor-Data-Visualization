import {
    Avatar,
    NavLink,
    Text,
} from "@mantine/core";
import {
    BarChart2,
    LayoutDashboard,
    LogOut,
    NotebookPen,
    UsersRound,
    Table2,
    FileClock
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
                <div className="logo">ProdViz</div>
                {isAuthenticated ? (
                    <>
                        <Link to={getDashboardLink()}>
                            <NavLink
                                leftSection={
                                    <LayoutDashboard strokeWidth={1} />
                                }
                                mt="sm"
                                label="Dashboard"
                                active={
                                    location.pathname === getDashboardLink()
                                }
                            />
                        </Link>
                        <Link to="/console">
                            <NavLink
                                leftSection={<Table2 strokeWidth={1} />}
                                label="Data Console"
                                mt="sm"
                                active={location.pathname === "/console"}
                            />
                        </Link>
                        <Link to="/notes">
                            <NavLink
                                leftSection={<NotebookPen strokeWidth={1} />}
                                label="Reports"
                                mt="sm"
                                active={location.pathname === "/notes"}
                            />
                        </Link>
                        <Link to="/dwr">
                            <NavLink
                                leftSection={<FileClock strokeWidth={1} />}
                                label="Downtime Report"
                                mt="sm"
                                active={location.pathname === "/dwr"}
                            />
                        </Link>
                        <Link to="/production">
                            <NavLink
                                leftSection={<BarChart2 strokeWidth={1} />}
                                label="Production"
                                mt="sm"
                                active={location.pathname === "/production"}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <NavLink
                                leftSection={<UsersRound strokeWidth={1} />}
                                label="Login"
                                mt="sm"
                                active={location.pathname === "/login"}
                            />
                        </Link>
                    </>
                )}
            </div>
            {isAuthenticated && (
                <div className="nav-bottom">
                    <div className="contentWrapper">
                        <Avatar color={"blue"} radius={"lg"} mt="sm">
                            {username && username.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                            <Text style={{ fontWeight: "bold" }} size="md">
                                {username}
                            </Text>
                            <Text size="sm">{role}</Text>
                        </div>
                    </div>
                    <NavLink
                        leftSection={<LogOut strokeWidth={1} />}
                        label="Logout"
                        mt="sm"
                        onClick={logout}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
