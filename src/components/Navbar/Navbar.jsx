import { Avatar, NavLink, Text } from "@mantine/core";
import { LayoutDashboard, LogOut, NotebookPen, UsersRound } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <>
            <div className="nav-top">
                <NavLink
                    leftSection={<LayoutDashboard strokeWidth={1} />}
                    mt="sm"
                    href="login"
                    label="Dashboard"
                    active
                />
                <NavLink
                    leftSection={<UsersRound strokeWidth={1} />}
                    href="#required-for-focus"
                    label="Users"
                    mt="sm"
                />
                <NavLink
                    leftSection={<NotebookPen strokeWidth={1} />}
                    href="#required-for-focus"
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
