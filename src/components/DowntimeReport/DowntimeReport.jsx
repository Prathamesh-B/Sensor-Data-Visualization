import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Button,
    Table,
    Autocomplete,
    Select,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { formatDate } from "../../utils";
import { DTdata } from "../../data";

const DowntimeReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [devices, setDevices] = useState([]);
    const [machineMenu, setMachineMenu] = useState("DIDa1B2c3D4");

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

    const fetchDevicesAndTags = async () => {
        try {
            const deviceResponse = await fetch(
                "http://127.0.0.1:8000/api/devices/"
            );
            if (!deviceResponse.ok) {
                throw new Error("Network response was not ok");
            }
            const devicesData = await deviceResponse.json();

            // Ensure unique and defined values for devices and tags
            const uniqueDevices = Array.from(
                new Set(devicesData.map((device) => device.DeviceId))
            ).map((id) => devicesData.find((device) => device.DeviceId === id));

            setDevices(
                uniqueDevices.filter(
                    (device) => device && device.DeviceId && device.Name
                )
            );
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const handleFetchData = async () => {};

    const rows = DTdata.map((data) => (
        <Table.Tr key={data.id}>
            <Table.Td>{formatDate(data.start)}</Table.Td>
            <Table.Td>{formatDate(data.end)}</Table.Td>
            <Table.Td>{data.lost}</Table.Td>
            <Table.Td>{data.machine_nm}</Table.Td>
            <Table.Td>{data.rc}</Table.Td>
            <Table.Td>{data.fm}</Table.Td>
            <Table.Td>{data.shift}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <Container>
            <Grid gutter="md" justify="flex-start" mt={"12px"}>
                <Grid.Col span={3} mt="auto">
                    <Autocomplete
                        label="Downtime Type: "
                        placeholder="Select a type"
                        data={["Outages", "Maintenance"]}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DateTimePicker
                        label="Start Date:"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DateTimePicker
                        label="End Date:"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={3} mt="auto">
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
                <Grid.Col span={6} mt="auto">
                    <Button>Apply</Button>
                </Grid.Col>
            </Grid>

            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Start Time</Table.Th>
                            <Table.Th>End Time</Table.Th>
                            <Table.Th>Time Lost (mins)</Table.Th>
                            <Table.Th>Machine Name</Table.Th>
                            <Table.Th>Root Cause</Table.Th>
                            <Table.Th>Foreman</Table.Th>
                            <Table.Th>Shift</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};

export default DowntimeReport;
