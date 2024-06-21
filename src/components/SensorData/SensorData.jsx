import { useEffect, useState } from "react";
import { Container, Center, Grid, Button, Text, Table, Autocomplete, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { formatDate } from "../../utils";

const SensorData = () => {
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
            setError("Failed to fetch sensor data");
            console.error(error);
            setSensorData([]); // Clear sensorData on error
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
            <Grid align="center" gutter="md">
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
                <Grid.Col span={6}>
                    <Autocomplete
                        label="Parameters: "
                        placeholder="Pick a Parameter"
                        data={['Pressure', 'Voltage', 'Temperature', 'Humidity']}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="Search"
                        placeholder="Enter word to search"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Button
                        variant="outline"
                        // onClick={() => setPresetRange(0)}
                        // style={{ marginLeft: "10px" }}
                    >
                        Reset Filters
                    </Button>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Center>
                        <Button 
                            onClick={handleFetchData}
                            >Fetch Data</Button>
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
                    </Center>
                </Grid.Col>
            </Grid>
            {error && <Text c="red">{error}</Text>}
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Day</Table.Th>
                            <Table.Th>Pressure (hPa)</Table.Th>
                            <Table.Th>Voltage (V)</Table.Th>
                            <Table.Th>Humidity (%)</Table.Th>
                            <Table.Th>Temperature (°C)</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={5}>
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

export default SensorData;
