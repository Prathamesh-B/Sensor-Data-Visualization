import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    Button,
    Grid,
    Card,
    Modal,
    Select,
    Switch,
} from "@mantine/core";
import { Edit, Trash } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LocationsPage = () => {
    const [blocks, setBlocks] = useState([]);
    const [plants, setPlants] = useState([]);
    const [name, setName] = useState("");
    const [inactive, setInactive] = useState(false);
    const [address, setAddress] = useState("");
    const [plant, setPlant] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [currentTab, setCurrentTab] = useState("blocks"); // "blocks" or "plants"

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const blocksResponse = await fetch(`${BACKEND_URL}/api/blocks/`);
        const blocksData = await blocksResponse.json();
        setBlocks(blocksData);

        const plantsResponse = await fetch(`${BACKEND_URL}/api/plants/`);
        const plantsData = await plantsResponse.json();
        setPlants(plantsData);
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();

        const payload = currentTab === "blocks"
            ? { name, inactive, plant: parseInt(plant, 10) }
            : { name, inactive, address };

        let response;
        if (editingItem) {
            response = await fetch(
                `${BACKEND_URL}/api/${currentTab}/${editingItem.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
        } else {
            response = await fetch(`${BACKEND_URL}/api/${currentTab}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        if (response.ok) {
            const updatedItem = await response.json();
            if (editingItem) {
                if (currentTab === "blocks") {
                    setBlocks(blocks.map((block) => block.id === editingItem.id ? updatedItem : block));
                } else {
                    setPlants(plants.map((plant) => plant.id === editingItem.id ? updatedItem : plant));
                }
                setEditingItem(null);
            } else {
                if (currentTab === "blocks") {
                    setBlocks([...blocks, updatedItem]);
                } else {
                    setPlants([...plants, updatedItem]);
                }
            }
            resetForm();
        } else {
            const errorData = await response.json();
            console.error(`Failed to save ${currentTab.slice(0, -1)}:`, errorData);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setName(item.name);
        setInactive(item.inactive);
        if (currentTab === "blocks") {
            setPlant(item.plant.toString());
        } else {
            setAddress(item.address);
        }
    };

    const handleDelete = async () => {
        if (itemToDelete) {
            const response = await fetch(
                `${BACKEND_URL}/api/${currentTab}/${itemToDelete.id}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                if (currentTab === "blocks") {
                    setBlocks(blocks.filter((block) => block.id !== itemToDelete.id));
                } else {
                    setPlants(plants.filter((plant) => plant.id !== itemToDelete.id));
                }
                setShowConfirmModal(false);
                setItemToDelete(null);
            }
        }
    };

    const resetForm = () => {
        setName("");
        setInactive(false);
        setAddress("");
        setPlant(null);
        setEditingItem(null);
    };

    return (
        <div>
            <Button.Group mb="md">
                <Button
                    variant={currentTab === "blocks" ? "filled" : "light"}
                    onClick={() => setCurrentTab("blocks")}
                >
                    Blocks
                </Button>
                <Button
                    variant={currentTab === "plants" ? "filled" : "light"}
                    onClick={() => setCurrentTab("plants")}
                >
                    Plants
                </Button>
            </Button.Group>

            <Card withBorder padding="lg" radius="md" shadow="sm">
                <form onSubmit={handleAddOrUpdate}>
                    <Grid>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        {currentTab === "blocks" && (
                            <Grid.Col span={4}>
                                <Select
                                    label="Plant"
                                    placeholder="Select a plant"
                                    data={plants.map((p) => ({
                                        value: p.id.toString(),
                                        label: p.name,
                                    }))}
                                    value={plant}
                                    onChange={(value) => setPlant(value)}
                                    required
                                />
                            </Grid.Col>
                        )}
                        {currentTab === "plants" && (
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Grid.Col>
                        )}
                        <Grid.Col span={4}>
                            <label className="m_8fdc1311">
                                Inactive
                            </label>
                            <div>
                                <Switch
                                    size="xl"
                                    radius="sm"
                                    checked={inactive}
                                    onChange={(event) => setInactive(event.currentTarget.checked)}
                                />
                            </div>
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingItem ? `Update ${currentTab.slice(0, -1)}` : `Add ${currentTab.slice(0, -1)}`}
                    </Button>
                </form>
            </Card>

            <Table striped highlightOnHover mt="md" withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Inactive</Table.Th>
                        {currentTab === "blocks" && (
                            <Table.Th style={{ textAlign: "center" }}>Plant</Table.Th>
                        )}
                        {currentTab === "plants" && (
                            <Table.Th style={{ textAlign: "center" }}>Address</Table.Th>
                        )}
                        <Table.Th style={{ textAlign: "center" }}>Modified</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {(currentTab === "blocks" ? blocks : plants).map((item) => (
                        <Table.Tr key={item.id}>
                            <Table.Td style={{ textAlign: "center" }}>{item.id}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{item.name}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{item.inactive ? "Yes" : "No"}</Table.Td>
                            {currentTab === "blocks" && (
                                <Table.Td style={{ textAlign: "center" }}>{item.plant}</Table.Td>
                            )}
                            {currentTab === "plants" && (
                                <Table.Td style={{ textAlign: "center" }}>{item.address}</Table.Td>
                            )}
                            <Table.Td style={{ textAlign: "center" }}>{new Date(item.modified).toLocaleString()}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                <Button
                                    onClick={() => handleEdit(item)}
                                    variant="subtle"
                                    style={{ marginRight: "0.5rem" }}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setItemToDelete(item);
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

            <Modal
                opened={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this {currentTab.slice(0, -1)}?</p>
                <Button
                    onClick={handleDelete}
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

export default LocationsPage;