import { Avatar, NavLink, Text } from "@mantine/core";
import {
    LayoutDashboard,
    LogOut,
    NotebookPen,
    Table2,
    UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <>
            <div className="nav-top">
                <Link to="/">
                    <NavLink
                        leftSection={<LayoutDashboard strokeWidth={1} />}
                        mt="sm"
                        label="Dashboard"
                        active
                    />
                </Link>
                <Link to="/sensors">
                    <NavLink
                        leftSection={<Table2 strokeWidth={1} />}
                        href="/sensors"
                        label="Sensors"
                        mt="sm"
                    />
                </Link>
                <NavLink
                    leftSection={<UsersRound strokeWidth={1} />}
                    href="/users"
                    label="Users"
                    mt="sm"
                />
                <NavLink
                    leftSection={<NotebookPen strokeWidth={1} />}
                    href="/notes"
                    label="Add Note"
                    mt="sm"
                />
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
