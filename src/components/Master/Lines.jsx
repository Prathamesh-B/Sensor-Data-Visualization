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

const LinesPage = () => {
    const [lines, setLines] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [name, setName] = useState("");
    const [targetProduction, setTargetProduction] = useState(0);
    const [status, setStatus] = useState("");
    const [block, setBlock] = useState(null);
    const [editingLine, setEditingLine] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [lineToDelete, setLineToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const linesResponse = await fetch(`${BACKEND_URL}/api/lines/`);
            const linesData = await linesResponse.json();
            setLines(linesData);

            const blocksResponse = await fetch(`${BACKEND_URL}/api/blocks/`);
            const blocksData = await blocksResponse.json();
            setBlocks(blocksData);
        };
        fetchData();
    }, []);

    const handleAddOrUpdateLine = async (e) => {
        e.preventDefault();

        const linePayload = {
            name,
            target_production: targetProduction,
            status,
            block: parseInt(block, 10),
        };

        let response;
        if (editingLine) {
            response = await fetch(
                `${BACKEND_URL}/api/lines/${editingLine.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(linePayload),
                }
            );
        } else {
            response = await fetch(`${BACKEND_URL}/api/lines/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(linePayload),
            });
        }

        if (response.ok) {
            const updatedLine = await response.json();
            if (editingLine) {
                setLines(lines.map((line) => (line.id === editingLine.id ? updatedLine : line)));
                setEditingLine(null);
            } else {
                setLines([...lines, updatedLine]);
            }
            resetForm();
        } else {
            const errorData = await response.json();
            console.error("Failed to save line:", errorData);
        }
    };

    const handleEditLine = (line) => {
        setEditingLine(line);
        setName(line.name);
        setTargetProduction(line.target_production);
        setStatus(line.status);
        setBlock(line.block.toString());
    };

    const handleDeleteLine = async () => {
        if (lineToDelete) {
            const response = await fetch(
                `${BACKEND_URL}/api/lines/${lineToDelete.id}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setLines(lines.filter((line) => line.id !== lineToDelete.id));
                setShowConfirmModal(false);
                setLineToDelete(null);
            }
        }
    };

    const resetForm = () => {
        setName("");
        setTargetProduction(0);
        setStatus("");
        setBlock(null);
        setEditingLine(null);
    };

    return (
        <div>
            <Card withBorder padding="lg" radius="md" shadow="sm">
                <form onSubmit={handleAddOrUpdateLine}>
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
                            <NumberInput
                                label="Target Production"
                                value={targetProduction}
                                onChange={(val) => setTargetProduction(val)}
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
                        <Grid.Col span={6}>
                            <Select
                                label="Block"
                                placeholder="Select a block"
                                data={blocks.map((b) => ({
                                    value: b.id.toString(),
                                    label: b.name,
                                }))}
                                value={block}
                                onChange={(value) => setBlock(value)}
                                required
                            />
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingLine ? "Update Line" : "Add Line"}
                    </Button>
                </form>
            </Card>

            <Table striped highlightOnHover mt="md">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Target Production</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Block</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((line) => (
                        <tr key={line.id}>
                            <td style={{ textAlign: "center" }}>{line.id}</td>
                            <td style={{ textAlign: "center" }}>{line.name}</td>
                            <td style={{ textAlign: "center" }}>{line.target_production}</td>
                            <td style={{ textAlign: "center" }}>{line.status}</td>
                            <td style={{ textAlign: "center" }}>
                                {blocks.find((b) => b.id === line.block)?.name || line.block}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Button
                                    onClick={() => handleEditLine(line)}
                                    variant="subtle"
                                    style={{ marginRight: "0.5rem" }}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setLineToDelete(line);
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
                <p>Are you sure you want to delete this line?</p>
                <Button onClick={handleDeleteLine} color="red" fullWidth mt="md">
                    Delete
                </Button>
            </Modal>
        </div>
    );
};

export default LinesPage;