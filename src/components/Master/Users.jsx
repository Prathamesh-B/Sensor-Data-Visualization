import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    PasswordInput,
    Button,
    Grid,
    Card,
    Modal,
} from "@mantine/core";
import { Edit, Trash } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${BACKEND_URL}/api/users/`);
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleAddOrUpdateUser = async (e) => {
        e.preventDefault();

        const userPayload = {
            name,
            email,
            role,
            password,
        };

        if (editingUser) {
            const response = await fetch(
                `${BACKEND_URL}/api/users/${editingUser.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userPayload),
                }
            );

            if (response.ok) {
                setUsers(
                    users.map((user) =>
                        user.id === editingUser.id
                            ? { ...user, ...userPayload }
                            : user
                    )
                );
                setEditingUser(null);
            }
        } else {
            const response = await fetch(`${BACKEND_URL}/api/users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userPayload),
            });

            if (response.ok) {
                const createdUser = await response.json();
                setUsers([...users, createdUser]);
            }
        }

        setName("");
        setEmail("");
        setRole("");
        setPassword("");
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setPassword(user.password);
    };

    const handleDeleteUser = async () => {
        if (userToDelete) {
            const response = await fetch(
                `${BACKEND_URL}/api/users/${userToDelete.id}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setUsers(users.filter((user) => user.id !== userToDelete.id));
                setShowConfirmModal(false);
            }
        }
    };

    return (
        <div>
            <Card withBorder padding="lg" radius="md" shadow="sm">
                <form onSubmit={handleAddOrUpdateUser}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <PasswordInput
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingUser ? "Update User" : "Add User"}
                    </Button>
                </form>
            </Card>

            <Table striped highlightOnHover mt="md" withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Email</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Last Login</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Created At</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Updated At</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Role</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map((user) => (
                        <Table.Tr key={user.id}>
                            <Table.Td style={{ textAlign: "center" }}>{user.id}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.name}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {user.email}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {new Date(user.last_login).toLocaleString()}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {new Date(user.created_at).toLocaleString()}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {new Date(user.updated_at).toLocaleString()}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.role}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                <Button
                                    onClick={() => handleEditUser(user)}
                                    compact
                                    variant="subtle"
                                    style={{ marginRight: "0.1rem" }}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setUserToDelete(user);
                                        setShowConfirmModal(true);
                                    }}
                                    compact
                                    variant="subtle"
                                    color="red"
                                >
                                    <Trash size={16} />
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Modal
                opened={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Deletion"
            >
                <p>Are you sure you want to delete this user?</p>
                <Button
                    onClick={handleDeleteUser}
                    color="red"
                    mt="md"
                    style={{ marginRight: "0.5rem" }}
                >
                    Delete
                </Button>
                <Button onClick={() => setShowConfirmModal(false)} mt="md">
                    Cancel
                </Button>
            </Modal>
        </div>
    );
};

export default UsersPage;
