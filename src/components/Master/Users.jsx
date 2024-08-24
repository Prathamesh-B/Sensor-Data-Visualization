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
            const response = await fetch("http://127.0.0.1:8000/api/users/");
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
                `http://127.0.0.1:8000/api/users/${editingUser.id}/`,
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
            const response = await fetch("http://127.0.0.1:8000/api/users/", {
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
                `http://127.0.0.1:8000/api/users/${userToDelete.id}/`,
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

            <Table striped highlightOnHover mt="md">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Last Login</th>
                        <th style={{ textAlign: "center" }}>Created At</th>
                        <th style={{ textAlign: "center" }}>Updated At</th>
                        <th style={{ textAlign: "center" }}>Inactive</th>
                        <th style={{ textAlign: "center" }}>Role</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td style={{ textAlign: "center" }}>{user.id}</td>
                            <td style={{ textAlign: "center" }}>{user.name}</td>
                            <td style={{ textAlign: "center" }}>
                                {user.email}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {new Date(user.last_login).toLocaleString()}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {new Date(user.created_at).toLocaleString()}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {new Date(user.updated_at).toLocaleString()}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {user.inactive ? "Yes" : "No"}
                            </td>
                            <td style={{ textAlign: "center" }}>{user.role}</td>
                            <td style={{ textAlign: "center" }}>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
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
