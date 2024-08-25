import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    NumberInput,
    Button,
    Grid,
    Card,
    Modal,
    Select,
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

    return (
        <div>
            <Card withBorder padding="lg" radius="md" shadow="sm">
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
            </Card>

            <Table striped highlightOnHover mt="md">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Height (px)</th>
                        <th style={{ textAlign: "center" }}>Width (px)</th>
                        <th style={{ textAlign: "center" }}>X Coordinate</th>
                        <th style={{ textAlign: "center" }}>Y Coordinate</th>
                        <th style={{ textAlign: "center" }}>Line</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {machines.map((machine) => (
                        <tr key={machine.id}>
                            <td style={{ textAlign: "center" }}>
                                {machine.id}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.status}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.height_px}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.width_px}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.x_coordinate}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.y_coordinate}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {machine.line.name}
                            </td>
                            <td style={{ textAlign: "center" }}>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
