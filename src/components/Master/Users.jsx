import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    PasswordInput,
    Button,
    Grid,
    Modal,
    Text,
    Group,
    // Pagination,
} from "@mantine/core";
import { Edit, Trash} from "lucide-react";

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
    const [showFormModal, setShowFormModal] = useState(false);

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

        resetForm();
        setShowFormModal(false);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setPassword(user.password);
        setShowFormModal(true);
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

    const resetForm = () => {
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
        setEditingUser(null);
    };

    const openAddUserModal = () => {
        resetForm();
        setShowFormModal(true);
    };

    return (
        <div>
            <Text size="xl" fw={500} mt={10} mb={10}>Manage Users</Text>
            <Group mb="lg" align="flex-end" gap="lg">
                <TextInput 
                    label="Search"
                    placeholder="Enter a value to search"
                />
                <Button onClick={openAddUserModal}>
                    Add New User
                </Button>
                <Button variant="outline" color="green">
                    Reset
                </Button>
            </Group>
            

            <Table striped highlightOnHover withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Email</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Last Login</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Role</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map((user) => (
                        <Table.Tr key={user.id}>
                            <Table.Td style={{ textAlign: "center" }}>{user.id}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.name}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.email}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {new Date(user.last_login).toLocaleString()}
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
            {/* <Pagination.Root total={1} mt={25}>
                <Group gap={5} justify="center">
                    <Pagination.Previous />
                    <Pagination.Items />
                    <Pagination.Next />
                </Group>
            </Pagination.Root> */}


            <Modal
                centered
                size={"lg"}
                opened={showFormModal}
                onClose={() => {
                    setShowFormModal(false);
                    resetForm();
                }}
                title={editingUser ? "Edit User" : "Add New User"}
            >
                <form onSubmit={handleAddOrUpdateUser}>
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput
                                label="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <PasswordInput
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={!editingUser}
                            />
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingUser ? "Update User" : "Add User"}
                    </Button>
                </form>
            </Modal>

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