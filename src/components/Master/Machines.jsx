import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    NumberInput,
    Button,
    Grid,
    Modal,
    Select,
    Text,
    Group,
    // Pagination,
} from "@mantine/core";
import { Edit, Trash } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MachinesPage = () => {
    const [machines, setMachines] = useState([]);
    const [lines, setLines] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [heightPx, setHeightPx] = useState(0);
    const [widthPx, setWidthPx] = useState(0);
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [line, setLine] = useState(null);
    const [editingMachine, setEditingMachine] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [machineToDelete, setMachineToDelete] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const machinesResponse = await fetch(
                `${BACKEND_URL}/api/machines/`
            );
            const machinesData = await machinesResponse.json();
            setMachines(machinesData);

            const linesResponse = await fetch(
                `${BACKEND_URL}/api/lines/`
            );
            const linesData = await linesResponse.json();
            setLines(linesData);
        };
        fetchData();
    }, []);

    const handleAddOrUpdateMachine = async (e) => {
        e.preventDefault();
    
        const machinePayload = {
            name,
            status,
            height_px: heightPx,
            width_px: widthPx,
            x_coordinate: xCoordinate,
            y_coordinate: yCoordinate,
            line_id: parseInt(line, 10),
        };
    
        let response;
        if (editingMachine) {
            response = await fetch(
                `${BACKEND_URL}/api/machines/${editingMachine.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(machinePayload),
                }
            );
        } else {
            response = await fetch(`${BACKEND_URL}/api/machines/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(machinePayload),
            });
        }
    
        if (response.ok) {
            const updatedMachine = await response.json();
            if (editingMachine) {
                setMachines(
                    machines.map((machine) =>
                        machine.id === editingMachine.id
                            ? updatedMachine
                            : machine
                    )
                );
                setEditingMachine(null);
            } else {
                setMachines([...machines, updatedMachine]);
            }
            resetForm();
            setShowFormModal(false)
        } else {
            const errorData = await response.json();
            console.error("Failed to save machine:", errorData);
        }
    };

    const handleEditMachine = (machine) => {
        setEditingMachine(machine);
        setName(machine.name);
        setStatus(machine.status);
        setHeightPx(machine.height_px);
        setWidthPx(machine.width_px);
        setXCoordinate(machine.x_coordinate);
        setYCoordinate(machine.y_coordinate);
        setLine(machine.line.id.toString());
        setShowFormModal(true)
    };

    const handleDeleteMachine = async () => {
        if (machineToDelete) {
            const response = await fetch(
                `${BACKEND_URL}/api/machines/${machineToDelete.id}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setMachines(
                    machines.filter(
                        (machine) => machine.id !== machineToDelete.id
                    )
                );
                setShowConfirmModal(false);
                setMachineToDelete(null);
            }
        }
    };

    const resetForm = () => {
        setName("");
        setStatus("");
        setHeightPx(0);
        setWidthPx(0);
        setXCoordinate(0);
        setYCoordinate(0);
        setLine(null);
        setEditingMachine(null);
    };

    const openAddMachineModal = () => {
        resetForm();
        setShowFormModal(true);
    };

    return (
        <div>
            <Text size="xl" fw={500} mt={10} mb={10}>Manage Machines</Text>
            <Group mb="lg" align="flex-end" gap="lg">
                <TextInput 
                    label="Search"
                    placeholder="Enter a value to search"
                />
                <Button onClick={openAddMachineModal}>
                    Add New Machine
                </Button>
                <Button variant="outline" color="green">
                    Reset
                </Button>
            </Group>

            <Table striped highlightOnHover mt="md" withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Status</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Height (px)</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Width (px)</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>X Coordinate</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Y Coordinate</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Line</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {machines.map((machine) => (
                        <Table.Tr key={machine.id}>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.id}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.name}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.status}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.height_px}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.width_px}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.x_coordinate}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.y_coordinate}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machine.line.name}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                <Button
                                    onClick={() => handleEditMachine(machine)}
                                    variant="subtle"
                                    style={{ marginRight: "0.5rem" }}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setMachineToDelete(machine);
                                        setShowConfirmModal(true);
                                    }}
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
                title={editingMachine ? "Edit Machine" : "Add New Machine"}
            >
            <form onSubmit={handleAddOrUpdateMachine}>
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
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Height (px)"
                                value={heightPx}
                                onChange={(val) => setHeightPx(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Width (px)"
                                value={widthPx}
                                onChange={(val) => setWidthPx(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="X Coordinate"
                                value={xCoordinate}
                                onChange={(val) => setXCoordinate(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Y Coordinate"
                                value={yCoordinate}
                                onChange={(val) => setYCoordinate(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="Line"
                                placeholder="Select a line"
                                data={lines.map((l) => ({
                                    value: l.id.toString(),
                                    label: l.name,
                                }))}
                                value={line}
                                onChange={(value) => {
                                    setLine(value);
                                }}
                                required
                            />
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingMachine ? "Update Machine" : "Add Machine"}
                    </Button>
                </form>
            </Modal>

            <Modal
                opened={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this machine?</p>
                <Button
                    onClick={handleDeleteMachine}
                    color="red"
                    fullWidth
                    mt="md"
                >
                    Delete
                </Button>
            </Modal>
        </div>
    );
};

export default MachinesPage;
