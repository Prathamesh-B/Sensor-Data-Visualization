import { useEffect, useState } from "react";
import { Container, Grid, Button, Table, Autocomplete } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { formatDate } from "../../utils";

const DataConsole = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchData = async () => {
        try {
            const formattedStartDate =
                startDate && dayjs(startDate).toISOString();
            const formattedEndDate = endDate && dayjs(endDate).toISOString();

            const url = new URL("http://localhost:8000/api/sensors/");
            if (formattedStartDate) {
                url.searchParams.append("start_date", formattedStartDate);
            }
            if (formattedEndDate) {
                url.searchParams.append("end_date", formattedEndDate);
            }

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error("Failed to fetch sensor data");
            }
            const json = await response.json();
            setSensorData(json);
            setError(null);
        } catch (error) {
            setError("Failed to fetch data");
            console.error(error);
            setSensorData([]);
        }
    };

    const setPresetRange = (days) => {
        const now = dayjs();
        setEndDate(now.toDate());
        setStartDate(now.subtract(days, "day").startOf("day").toDate());
    };

    const rows = sensorData.map((data) => (
        <Table.Tr key={data.id}>
            <Table.Td>{formatDate(data.timestamp)}</Table.Td>
            <Table.Td>{data.pressure}</Table.Td>
            <Table.Td>{data.voltage}</Table.Td>
            <Table.Td>{data.humidity}</Table.Td>
            <Table.Td>{data.temperature}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <Container>
            <Grid grow gutter="md" justify="flex-start">
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
                    <Button style={{ marginLeft: "10px" }}>Fetch</Button>
                    <Button
                        variant="light"
                        color="green"
                        style={{ marginLeft: "10px" }}
                    >
                        Refresh
                    </Button>
                </Grid.Col>
                <Grid.Col span={6} mt="auto">
                    <Autocomplete
                        label="Tables: "
                        placeholder="Select a table"
                        data={[
                            "Sensors",
                            "Sensor Data",
                            "Machines",
                            "Supervisior",
                            "Products",
                            "Production",
                            "Events",
                            "Supervisior Reports",
                        ]}
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
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Timestamp</Table.Th>
                            <Table.Th>Machine_ID</Table.Th>
                            <Table.Th>Sensor_ID</Table.Th>
                            <Table.Th>Value</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={5}>
                                    {/* {error && <Text c="red">{error}</Text>} */}
                                    No data available
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
