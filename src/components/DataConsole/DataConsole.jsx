import { useEffect, useState } from "react";
import { Container, Grid, Button, Table, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";

const DataConsole = () => {
    const [machineMenu, setMachineMenu] = useState("DIDa1B2c3D4");
    const [sensorMenu, setSensorMenu] = useState("12");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);

    const deviceNames = {
        1: "Destacker Unit",
        2: "Deep Drawing press",
        3: "Piercing Press",
        4: "Robotic Loader",
        5: "Flaring Press",
    };

    const handleFetchData = async () => {
        try {
            const formattedStartDate = startDate
                ? dayjs(startDate).toISOString()
                : null;
            const formattedEndDate = endDate
                ? dayjs(endDate).toISOString()
                : null;

            const baseURL = "http://localhost:8000/api/device_logs";
            const params = new URLSearchParams({
                DeviceID: machineMenu,
                TagId: sensorMenu,
                StartDate: formattedStartDate,
                EndDate: formattedEndDate,
            });

            const url = `${baseURL}/?${params.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch sensor data");
            }
            const json = await response.json();
            setSensorData(json);
            setError(null);
        } catch (error) {
            setError("Failed to fetch data");
            console.error("Fetch error:", error);
            setSensorData([]);
        }
    };

    const setPresetRange = (days) => {
        const now = dayjs();
        setEndDate(now.toDate());
        setStartDate(now.subtract(days, "day").startOf("day").toDate());
    };

    const rows = sensorData.map((data) => (
        <Table.Tr key={data.EventDate}>
            <Table.Td>{dayjs(data.EventDate).format("MMM DD, HH:mm")}</Table.Td>
            <Table.Td>{data.DeviceId}</Table.Td>
            <Table.Td>{deviceNames[data.DeviceId]}</Table.Td>
            <Table.Td>{data.Tag}</Table.Td>
            <Table.Td>{data.Value}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        if (startDate && endDate) {
            handleFetchData();
        }
    }, [startDate, endDate]);

    return (
        <Container>
            <Grid grow gutter="md" justify="flex-start">
                <Grid.Col span={6}>
                    <Select
                        label="Machine:"
                        allowDeselect={false}
                        placeholder="Pick value"
                        data={[
                            {
                                value: "DIDa1B2c3D4",
                                label: "Destacker Unit",
                            },
                            {
                                value: "DIDe5F6g7H8",
                                label: "Deep Drawing Press",
                            },
                            {
                                value: "DIDi9J0k1L2",
                                label: "Flaring Press",
                            },
                            {
                                value: "DIDm3N4o5P6",
                                label: "Piercing Press",
                            },
                            {
                                value: "DIDq7R8s9T0",
                                label: "Robotic Loader",
                            },
                        ]}
                        value={machineMenu}
                        onChange={setMachineMenu}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Sensor:"
                        allowDeselect={false}
                        placeholder="Pick value"
                        data={[
                            { value: "1", label: "Watts Consumed" },
                            { value: "2", label: "Watts Total" },
                            { value: "3", label: "PF Ave." },
                            { value: "4", label: "VA total" },
                            { value: "5", label: "Vry phase" },
                            { value: "6", label: "Vyb phase" },
                            { value: "7", label: "Vbr phase" },
                            { value: "8", label: "Current R" },
                            { value: "9", label: "Current Y" },
                            { value: "10", label: "Current B" },
                            { value: "11", label: "Frequency" },
                            { value: "12", label: "Temp" },
                        ]}
                        value={sensorMenu}
                        onChange={setSensorMenu}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateTimePicker
                        label="Start Date:"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateTimePicker
                        label="End Date:"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button
                        variant="outline"
                        onClick={() => setPresetRange(0)}
                        style={{ marginLeft: "10px" }}
                    >
                        Today
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPresetRange(2)}
                        style={{ marginLeft: "10px" }}
                    >
                        Last 2 Days
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPresetRange(7)}
                        style={{ marginLeft: "10px" }}
                    >
                        Last 7 Days
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleFetchData}
                    >
                        Fetch
                    </Button>
                    <Button
                        variant="light"
                        color="green"
                        style={{ marginLeft: "10px" }}
                        onClick={handleFetchData}
                    >
                        Refresh
                    </Button>
                </Grid.Col>
                <Grid.Col span={6} mt="auto">
                    <Button>Apply</Button>
                </Grid.Col>
            </Grid>

            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Event Date</Table.Th>
                            <Table.Th>Device ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Tag</Table.Th>
                            <Table.Th>Value</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={5}>
                                    {error ? (
                                        <span style={{ color: "red" }}>
                                            {error}
                                        </span>
                                    ) : (
                                        "No data available"
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};

export default DataConsole;
