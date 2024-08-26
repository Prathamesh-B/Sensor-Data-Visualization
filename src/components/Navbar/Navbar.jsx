import { useEffect, useState } from "react";
import { Avatar, NavLink, Text } from "@mantine/core";
import {
    BarChart2,
    LayoutDashboard,
    LogOut,
    UsersRound,
    Table2,
    FileClock,
    Map,
    Scroll,
    AreaChart,
    BadgePlus,
    Users,
    Tag,
    Cog,
    Factory,
    Warehouse,
} from "lucide-react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [openNavLink, setOpenNavLink] = useState(null);

    const handleNavLinkClick = (navLinkId) => {
        setOpenNavLink((prev) => (prev === navLinkId ? null : navLinkId));
    };

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
                <div className="logo rokkitt-400">
                    {/* use prodviz logo from public/images */}
                    <img
                        src="./images/ProdVizLogo.png"
                        alt="ProdViz Logo"
                        style={{ height: "4rem" }}
                    />
                </div>
                {isAuthenticated ? (
                    <>
                        <NavLink
                            component={Link}
                            to={getDashboardLink()}
                            leftSection={<LayoutDashboard strokeWidth={1} />}
                            label="Dashboard"
                            active={location.pathname === getDashboardLink()}
                            mt="sm"
                        />
                        <NavLink
                            component={Link}
                            to="/floormap"
                            label="Production View"
                            leftSection={<Map strokeWidth={1} />}
                            active={location.pathname === "/floormap"}
                            mt="sm"
                        />
                        <NavLink
                            component={Link}
                            label="Performance Metrics"
                            leftSection={<AreaChart strokeWidth={1} />}
                            to="/mop"
                            active={location.pathname === "/mop"}
                            mt="sm"
                        />
                        <NavLink
                            label="Reports"
                            leftSection={<Scroll strokeWidth={1} />}
                            childrenOffset={25}
                            mt="sm"
                            onClick={() => handleNavLinkClick("reports")}
                            opened={openNavLink === "reports"}
                        >
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
                                to="/dwr"
                                leftSection={<FileClock strokeWidth={1} />}
                                label="Downtime"
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
                        </NavLink>
                        <NavLink
                            label="Master"
                            leftSection={<BadgePlus strokeWidth={1} />}
                            childrenOffset={25}
                            mt="sm"
                            onClick={() => handleNavLinkClick("master")}
                            opened={openNavLink === "master"}
                        >
                            <NavLink
                                label="Users"
                                to="/users"
                                leftSection={<Users strokeWidth={1} />}
                                mt="sm"
                                component={Link}
                                active={location.pathname === "/users"}
                            />
                            <NavLink
                                label="Tags"
                                to="/tags"
                                leftSection={<Tag strokeWidth={1} />}
                                mt="sm"
                                component={Link}
                                active={location.pathname === "/tags"}
                            />
                            <NavLink
                                label="Machines"
                                to="/machines"
                                leftSection={<Cog strokeWidth={1} />}
                                mt="sm"
                                component={Link}
                                active={location.pathname === "/machines"}
                            />
                            <NavLink
                                label="Lines"
                                to="/lines"
                                leftSection={<Warehouse strokeWidth={1} />}
                                mt="sm"
                                component={Link}
                                active={location.pathname === "/lines"}
                            />
                            <NavLink
                                label="Locations"
                                to="/locations"
                                leftSection={<Factory strokeWidth={1} />}
                                mt="sm"
                                component={Link}
                                active={location.pathname === "/locations"}
                            />
                        </NavLink>
                        {/* <NavLink
                            component={Link}
                            to="/report"
                            leftSection={<NotebookPen strokeWidth={1} />}
                            label="Reports"
                            mt="sm"
                            active={location.pathname === "/report"}
                        />
                        <NavLink
                            component={Link}
                            to="/editmap"
                            leftSection={<Pencil strokeWidth={1} />}
                            label="Edit Map"
                            mt="sm"
                            active={location.pathname === "/editmap"}
                        /> */}
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
