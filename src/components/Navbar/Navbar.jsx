import { Avatar, NavLink, Text } from "@mantine/core";
import {
    LayoutDashboard,
    LogOut,
    NotebookPen,
    ScrollText,
    UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <div className="nav-top">
                <Link to="/">
                    <NavLink
                        leftSection={<LayoutDashboard strokeWidth={1} />}
                        mt="sm"
                        label="Overview"
                        active={location.pathname === "/"}
                    />
                </Link>
                <Link to="/sensors">
                    <NavLink
                        leftSection={<ScrollText strokeWidth={1} />}
                        href="/sensors"
                        label="Dashboard"
                        mt="sm"
                        active={location.pathname === "/sensors"}
                    />
                </Link>
                <Link to="/users">
                    <NavLink
                        leftSection={<UsersRound strokeWidth={1} />}
                        href="/users"
                        label="Users"
                        mt="sm"
                        active={location.pathname === "/users"}
                    />
                </Link>
                <Link to="/addnote">
                    <NavLink
                        leftSection={<NotebookPen strokeWidth={1} />}
                        href="/notes"
                        label="Add Note"
                        mt="sm"
                        active={location.pathname === "/addnote"}
                    />
                </Link>
            </div>
            <div className="nav-bottom">
                <div className="contentWrapper">
                    <Avatar color={"blue"} radius={"lg"} mt="sm">
                        T U
                    </Avatar>
                    <div>
                        <Text style={{ fontWeight: "bold" }} size="md">
                            Test User
                        </Text>
                        <Text size="xs">test@qwe.com</Text>
                    </div>
                </div>
                <NavLink
                    leftSection={<LogOut strokeWidth={1} />}
                    href="#required-for-focus"
                    label="Logout"
                    mt="sm"
                />
            </div>
        </>
    );
};

export default Navbar;
