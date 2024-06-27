import { useState } from "react";
import { Avatar, NavLink, Text } from "@mantine/core";
import {
    BarChart2,
    LayoutDashboard,
    LogOut,
    NotebookPen,
    UsersRound,
    Cpu,
    Table2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     setIsAuthenticated(!!token);
    // }, []);

    return (
        <>
            <div className="nav-top">
                <Link to="/">
                    <NavLink
                        leftSection={<LayoutDashboard strokeWidth={1} />}
                        mt="sm"
                        label="Dashboard"
                        active={location.pathname === "/"}
                    />
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/sensors">
                            <NavLink
                                leftSection={<Table2 strokeWidth={1} />}
                                label="Data Console"
                                mt="sm"
                                active={location.pathname === "/sensors"}
                            />
                        </Link>
                        <Link to="/machine">
                            <NavLink
                                leftSection={<Cpu strokeWidth={1} />}
                                label="Machine Overview"
                                mt="sm"
                                active={location.pathname === "/machine"}
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
                        <Link to="/signup">
                            <NavLink
                                leftSection={<UsersRound strokeWidth={1} />}
                                label="Register"
                                mt="sm"
                                active={location.pathname === "/signup"}
                            />
                        </Link>
                    </>
                )}
            </div>
            {isAuthenticated && (
                <div className="nav-bottom">
                    <div className="contentWrapper">
                        <Avatar color={"blue"} radius={"lg"} mt="sm">
                            M P
                        </Avatar>
                        <div>
                            <Text style={{ fontWeight: "bold" }} size="md">
                                Manoj Prabhakar
                            </Text>
                            <Text size="sm">Machine Foreman</Text>
                        </div>
                    </div>
                    <NavLink
                        leftSection={<LogOut strokeWidth={1} />}
                        href="#required-for-focus"
                        label="Logout"
                        mt="sm"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
