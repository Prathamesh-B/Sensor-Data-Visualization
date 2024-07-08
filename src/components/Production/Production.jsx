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
import { status } from "../../data";
import { useEffect, useState } from "react";

const Production = () => {
    const [machineMenu, setMachineMenu] = useState("DIDa1B2c3D4");
    const [sensorMenu, setSensorMenu] = useState("12");
    const [devices, setDevices] = useState([]);
    const [deviceTags, setDeviceTags] = useState([]);

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
            const devicesData = await deviceResponse.json();
            const tagsData = await tagResponse.json();

            // Ensure unique and defined values for devices and tags
            const uniqueDevices = Array.from(
                new Set(devicesData.map((device) => device.DeviceId))
            ).map((id) => devicesData.find((device) => device.DeviceId === id));
            const uniqueTags = Array.from(
                new Set(tagsData.map((tag) => tag.id))
            ).map((id) => tagsData.find((tag) => tag.id === id));

            setDevices(
                uniqueDevices.filter(
                    (device) => device && device.DeviceId && device.Name
                )
            );
            setDeviceTags(
                uniqueTags.filter((tag) => tag && tag.id && tag.Name)
            );
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const rows = status.map((Status) => (
        <Table.Tr key={Status.name}>
            <Table.Td>{Status.name}</Table.Td>
            <Table.Td>{Status.status}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Grid grow gutter="lg" mb="lg">
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text
                                style={{ fontSize: "1.6rem" }}
                                c="blue"
                                fw={700}
                            >
                                640
                            </Text>
                            <Text size="md" fw={400}>
                                Units produced
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text
                                style={{ fontSize: "1.6rem" }}
                                fw={700}
                                c="yellow"
                            >
                                800
                            </Text>
                            <Text size="md" fw={400}>
                                Production Target
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text
                                style={{ fontSize: "1.6rem" }}
                                fw={700}
                                c="lime"
                            >
                                80%
                            </Text>
                            <Text size="md" fw={400}>
                                Production Rate
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={8}>
                    <Text size="xl">Add Production:</Text>
                    <Grid grow align="center" gutter="md">
                        <Grid.Col>
                            <Select
                                label="Machine:"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={devices.map((device) => ({
                                    value: device.DeviceId.toString(),
                                    label: device.Name,
                                }))}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <Select
                                label="Sensor:"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={deviceTags.map((tag) => ({
                                    value: tag.id.toString(),
                                    label: tag.Name,
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
                        Machine Status:
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
