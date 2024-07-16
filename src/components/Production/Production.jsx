import {
    Card,
    Grid,
    Text,
    Table,
    Button,
    Select,
    NumberInput,
} from "@mantine/core";
import "./Production.css";
import { DTdata, status,products } from "../../data";
import { useEffect, useState } from "react";

const Production = () => {
    const [machineMenu, setMachineMenu] = useState("DIDa1B2c3D4");
    const [sensorMenu, setSensorMenu] = useState("12");
    // const [devices, setDevices] = useState([]);
    // const [deviceTags, setDeviceTags] = useState([]);

    const getColorByStatus = (status) => {
        switch (status) {
            case "Running":
                return "#05cf2d";
            case "Under Maintenance":
                return "#ffa618";
            case "Stopped":
                return "#ff0026";
            default:
                return "#000000";
        }
    };

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

    const fetchDevicesAndTags = async () => {
        try {
            const deviceResponse = await fetch(
                "http://127.0.0.1:8000/api/devices/"
            );
            const tagResponse = await fetch(
                "http://127.0.0.1:8000/api/device-tags/"
            );
            if (!deviceResponse.ok || !tagResponse.ok) {
                throw new Error("Network response was not ok");
            }
            // const devicesData = await deviceResponse.json();
            // const tagsData = await tagResponse.json();

            // Ensure unique and defined values for devices and tags
            // const uniqueDevices = Array.from(
            //     new Set(devicesData.map((device) => device.DeviceId))
            // ).map((id) => devicesData.find((device) => device.DeviceId === id));
            // const uniqueTags = Array.from(
            //     new Set(tagsData.map((tag) => tag.id))
            // ).map((id) => tagsData.find((tag) => tag.id === id));

            // setDevices(
            //     uniqueDevices.filter(
            //         (device) => device && device.DeviceId && device.Name
            //     )
            // );
            // setDeviceTags(
            //     uniqueTags.filter((tag) => tag && tag.id && tag.Name)
            // );
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const rows = status.map((Status) => (
        <Table.Tr key={Status.name}>
            <Table.Td>{Status.name}</Table.Td>
            <Table.Td
                style={{
                    fontWeight: 700,
                    color: getColorByStatus(Status.status),
                }}
            >
                {Status.status}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Grid grow gutter="lg" mb="lg">
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production.png"
                                    alt="Production Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Units Produced
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="blue"
                                fw={700}
                            >
                                640
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production_target.png"
                                    alt="Production Target Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Production Target
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                fw={700}
                                c="yellow"
                            >
                                800
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production-rate.png"
                                    alt="Production Rate Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Production Rate
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                fw={700}
                                c="lime"
                            >
                                80%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./down-time.png"
                                    alt="Downtime Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Avg Downtime (mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                fw={700}
                                c="orange"
                            >
                                5
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={8}>
                    <Text size="xl">Add Production</Text>
                    <Grid grow align="center" gutter="md">
                        <Grid.Col>
                            <Select
                                label="Line"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={DTdata.map((data) => ({
                                    value: data.id.toString(),
                                    label: data.machine_nm,
                                }))}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <Select
                                label="Product"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={products.map((data) => ({
                                    value: data.id.toString(),
                                    label: data.name,
                                }))}
                                value={sensorMenu}
                                onChange={setSensorMenu}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <NumberInput label="Enter Quantity" />
                        </Grid.Col>
                        <Grid.Col>
                            <Button>Add</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} size="xl">
                        Line Status
                    </Text>
                    <Table.ScrollContainer>
                        <Table verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Production;
