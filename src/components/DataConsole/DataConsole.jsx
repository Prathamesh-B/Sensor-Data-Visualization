import { useEffect, useState } from "react";
import { Container, Grid, Button, Table, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { fetchDevicesAndTags } from "../../services/BackendAPIs";

const DataConsole = () => {
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [tagMenu, setTagMenu] = useState("1");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [deviceTags, setDeviceTags] = useState([]);

    useEffect(() => {
        fetchDevicesAndTags(setDevices, setDeviceTags);
    }, []);


    const handleFetchData = async () => {
        try {
            const formattedStartDate = startDate
                ? dayjs(startDate).toISOString()
                : null;
            const formattedEndDate = endDate
                ? dayjs(endDate).toISOString()
                : null;

            const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api/daqlogs/`;
            const params = new URLSearchParams({
                LineId: productionLineMenu,
                TagId: tagMenu,
                StartDate: formattedStartDate,
                EndDate: formattedEndDate,
            });

            const url = `${baseURL}?${params.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch sensor data");
            }
            const json = await response.json();
            console.log(json);
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
        <Table.Tr key={data.id}>
            <Table.Td>{dayjs(data.timestamp).format("MMM DD, HH:mm")}</Table.Td>
            <Table.Td>{data.value}</Table.Td>
            <Table.Td>{data.line}</Table.Td>
            <Table.Td>{data.tag}</Table.Td>
        </Table.Tr>
    ));

    useEffect(() => {
        if (startDate && endDate) {
            handleFetchData();
        }
    }, [startDate, endDate, productionLineMenu, tagMenu]);

    return (
        <Container>
            <Grid grow gutter="md" justify="flex-start">
                <Grid.Col span={6}>
                    <Select
                        label="Production Line:"
                        allowDeselect={false}
                        placeholder="Pick value"
                        data={devices.map((device) => ({
                            value: device.id.toString(),
                            label: device.name,
                        }))}
                        value={productionLineMenu}
                        onChange={setProductionLineMenu}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Machine:"
                        allowDeselect={false}
                        placeholder="Pick value"
                        data={devices.map((device) => ({
                            value: device.id.toString(),
                            label: device.name,
                        }))}
                        value={productionLineMenu}
                        onChange={setProductionLineMenu}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        label="Parameter"
                        allowDeselect={false}
                        placeholder="Pick value"
                        data={deviceTags.map((tag) => ({
                            value: tag.id.toString(),
                            label: tag.name,
                        }))}
                        value={tagMenu}
                        onChange={setTagMenu}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="End Date"
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
            </Grid>
            <Table.ScrollContainer mt={"md"} minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Timestamp</Table.Th>
                            <Table.Th>Value</Table.Th>
                            <Table.Th>Production Line</Table.Th>
                            <Table.Th>Tag</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={4}>
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
