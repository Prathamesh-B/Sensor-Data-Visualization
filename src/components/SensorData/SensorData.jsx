import {
    Container,
    Grid,
    Button,
    Table,
    Text,
    Center,
    Title,
    Paper,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

const SensorData = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);

    const handleFetchData = async () => {
        try {
            const formattedStartTime = startTime
                ? dayjs(startTime).toISOString()
                : null;
            const formattedEndTime = endTime
                ? dayjs(endTime).toISOString()
                : null;

            const response = await fetch("http://localhost:8000/api/sensors/", {
                params: {
                    start_time: formattedStartTime,
                    end_time: formattedEndTime,
                },
            });
            const json = await response.json();
            console.log(json);
            setSensorData(json);
            setError(null);
        } catch (error) {
            setError("Failed to fetch sensor data");
            console.error(error);
        }
    };

    const setPresetRange = (days) => {
        const now = dayjs();
        setEndTime(now.toDate());
        setStartTime(now.subtract(days, "day").toDate());
    };

    return (
        <Container>
            <Center>
                <Title>Fetch Sensor Data</Title>
            </Center>
            <Grid align="center" gutter="md">
                <Grid.Col span={6}>
                    <DateTimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={setStartTime}
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateTimePicker
                        label="End Time"
                        value={endTime}
                        onChange={setEndTime}
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Center>
                        <Button onClick={handleFetchData}>Fetch Data</Button>
                    </Center>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Center>
                        <Button
                            variant="outline"
                            onClick={() => setPresetRange(0)}
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
            {error && <Text color="red">{error}</Text>}
            <Paper shadow="sm" p="md" mt="md">
                <Table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Pressure (hPa)</th>
                            <th>Voltage (V)</th>
                            <th>Humidity (%)</th>
                            <th>Temperature (°C)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData.map((sensor) => (
                            <tr key={sensor.id}>
                                <td>{sensor.timestamp}</td>
                                <td>{sensor.pressure}</td>
                                <td>{sensor.voltage}</td>
                                <td>{sensor.humidity}</td>
                                <td>{sensor.temperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Paper>
        </Container>
    );
};

export default SensorData;
