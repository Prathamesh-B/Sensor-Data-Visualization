import { useState, useEffect } from "react";
import {
    Table,
    TextInput,
    NumberInput,
    Switch,
    Button,
    Grid,
    Card,
    Modal,
    Select,
} from "@mantine/core";
import { Edit, Trash } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TagsPage = () => {
    const [tags, setTags] = useState([]);
    const [machines, setMachines] = useState([]);
    const [tagTypes, setTagTypes] = useState([]);
    const [name, setName] = useState("");
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const [nominalVal, setNominalVal] = useState(null);
    const [thresholdAlert, setThresholdAlert] = useState("");
    const [continuousRecord, setContinuousRecord] = useState(false);
    const [frequency, setFrequency] = useState(null);
    const [machine, setMachine] = useState(null);
    const [tagType, setTagType] = useState(null);
    const [editingTag, setEditingTag] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const tagsResponse = await fetch(
                `${BACKEND_URL}/api/sensortags/`
            );
            const tagsData = await tagsResponse.json();
            setTags(tagsData);

            const machinesResponse = await fetch(
                `${BACKEND_URL}/api/machines/`
            );
            const machinesData = await machinesResponse.json();
            setMachines(machinesData);

            const tagTypesResponse = await fetch(
                `${BACKEND_URL}/api/tag-types/`
            );
            const tagTypesData = await tagTypesResponse.json();
            setTagTypes(tagTypesData);
        };
        fetchData();
    }, []);

    const handleAddOrUpdateTag = async (e) => {
        e.preventDefault();

        const tagPayload = {
            name,
            min_val: minVal,
            max_val: maxVal,
            nominal_val: nominalVal,
            threshold_alert: thresholdAlert,
            continuous_record: continuousRecord,
            frequency,
            machine: parseInt(machine, 10),
            tag_type: parseInt(tagType, 10),
        };

        if (editingTag) {
            const response = await fetch(
                `${BACKEND_URL}/api/sensortags/${editingTag.id}/`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tagPayload),
                }
            );

            if (response.ok) {
                setTags(
                    tags.map((tag) =>
                        tag.id === editingTag.id
                            ? { ...tag, ...tagPayload }
                            : tag
                    )
                );
                setEditingTag(null);
            }
        } else {
            const response = await fetch(
                `${BACKEND_URL}/api/sensortags/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tagPayload),
                }
            );

            if (response.ok) {
                const createdTag = await response.json();
                setTags([...tags, createdTag]);
            }
        }

        resetForm();
    };

    const handleEditTag = (tag) => {
        setEditingTag(tag);
        setName(tag.name);
        setMinVal(tag.min_val);
        setMaxVal(tag.max_val);
        setNominalVal(tag.nominal_val);
        setThresholdAlert(tag.threshold_alert);
        setContinuousRecord(tag.continuous_record);
        setFrequency(tag.frequency);
        setMachine(tag.machine.toString());
        setTagType(tag.tag_type.toString());
    };

    const handleDeleteTag = async () => {
        if (tagToDelete) {
            const response = await fetch(
                `${BACKEND_URL}/api/sensortags/${tagToDelete.id}/`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setTags(tags.filter((tag) => tag.id !== tagToDelete.id));
                setShowConfirmModal(false);
            }
        }
    };

    const resetForm = () => {
        setName("");
        setMinVal(0);
        setMaxVal(0);
        setNominalVal(null);
        setThresholdAlert("");
        setContinuousRecord(false);
        setFrequency(null);
        setMachine(null);
        setTagType(null);
    };

    return (
        <div>
            <Card withBorder padding="lg" radius="md" shadow="sm">
                <form onSubmit={handleAddOrUpdateTag}>
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Min Value"
                                value={minVal}
                                onChange={(val) => setMinVal(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Max Value"
                                value={maxVal}
                                onChange={(val) => setMaxVal(val)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Threshold Alert"
                                value={thresholdAlert}
                                onChange={(e) =>
                                    setThresholdAlert(e.target.value)
                                }
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Nominal Value"
                                value={nominalVal}
                                onChange={(val) => setNominalVal(val)}
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <NumberInput
                                label="Frequency"
                                value={frequency}
                                onChange={(val) => setFrequency(val)}
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Select
                                label="Machine"
                                placeholder="Select a machine"
                                data={machines.map((m) => ({
                                    value: m.id.toString(),
                                    label: `${m.line.name} - ${m.name}`,
                                }))}
                                value={machine}
                                onChange={(value) => setMachine(value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Select
                                label="Tag Type"
                                placeholder="Select a tag type"
                                data={tagTypes.map((t) => ({
                                    value: t.id.toString(),
                                    label: t.name,
                                }))}
                                value={tagType}
                                onChange={(value) => setTagType(value)}
                                required
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <label className="m_8fdc1311">
                                Continuous Record
                            </label>
                            <div>
                                <Switch
                                    size="xl"
                                    radius="sm"
                                    checked={continuousRecord}
                                    onChange={(e) =>
                                        setContinuousRecord(
                                            e.currentTarget.checked
                                        )
                                    }
                                />
                            </div>
                        </Grid.Col>
                    </Grid>
                    <Button type="submit" mt="md" fullWidth>
                        {editingTag ? "Update Tag" : "Add Tag"}
                    </Button>
                </form>
            </Card>

            <Table striped highlightOnHover mt="md" withColumnBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>ID</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Min.</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Max.</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Nom.</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Threshold Alert</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Continuous Record
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Freq.</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Machine</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Tag Type</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {tags.map((tag) => (
                        <Table.Tr key={tag.id}>
                            <Table.Td style={{ textAlign: "center" }}>{tag.id}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{tag.name}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.min_val}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.max_val}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.nominal_val}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.threshold_alert}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.continuous_record ? "Yes" : "No"}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tag.frequency}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {machines.find((m) => m.id === tag.machine)
                                    ?.name || tag.machine}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                {tagTypes.find((t) => t.id === tag.tag_type)
                                    ?.name || tag.tag_type}
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                <Button
                                    onClick={() => handleEditTag(tag)}
                                    variant="subtle"
                                    style={{ marginRight: "0.1rem" }}
                                >
                                    <Edit size={16} />
                                </Button>
                                <Button
                                    onClick={() => {
                                        setTagToDelete(tag);
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
                title="Confirm Deletion"
            >
                <p>Are you sure you want to delete this tag?</p>
                <Button
                    onClick={handleDeleteTag}
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

export default TagsPage;
