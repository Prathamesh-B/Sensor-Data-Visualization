import {
    Avatar,
    Divider,
    Drawer,
    NavLink,
    ScrollArea,
    Text,
} from "@mantine/core";
import {
    BarChart2,
    LayoutDashboard,
    LogOut,
    NotebookPen,
    UsersRound,
    Table2,
    NotepadText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { notes } from "../../data";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [drawerOpened, { open, close }] = useDisclosure(false);
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
            return "/svpm"; // Link for Supervisor or Product Manager
        } else if (role === "Machine Operator") {
            return "/mo"; // Link for Machine Operator
        } else {
            return "/"; // Default dashboard link
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
                        <div>
                            <NotepadText
                                strokeWidth={1}
                                size={30}
                                onClick={open}
                                style={{ cursor: "pointer" }}
                            />
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
            <Drawer
                opened={drawerOpened}
                onClose={close}
                title="Supervisor Notes"
                padding="md"
                size="lg"
                position="right"
            >
                <ScrollArea style={{ height: "80vh" }}>
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            style={{
                                paddingTop: "1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                            }}
                        >
                            <Text size="lg" weight={700}>
                                {note.title}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {new Date(note.timestamp).toLocaleString()}{" "}
                            </Text>
                            <Text size="sm">{note.description}</Text>
                            <Divider my="md" />
                        </div>
                    ))}
                </ScrollArea>
            </Drawer>
        </>
    );
};

export default Navbar;
