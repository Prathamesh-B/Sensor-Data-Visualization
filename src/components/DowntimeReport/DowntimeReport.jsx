import { useEffect, useState } from "react";
import { Container, Grid, Button, Table, Autocomplete } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
// import dayjs from "dayjs";
import { formatDate } from "../../utils";
import { DTdata } from "../../data";

const DowntimeReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [DTData, setDTData] = useState([]);
    // const [error, setError] = useState(null);

    const handleFetchData = async () => {
    
    };

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
            <Grid  gutter="md" justify="flex-start" mt={"12px"}>
            <Grid.Col span={3} mt="auto">
                    <Autocomplete
                        label="Downtime Type: "
                        placeholder="Select a type"
                        data={[
                            "Outages",
                            "Maintenance",
                        ]}
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
                    <Autocomplete
                        label="Machines: "
                        placeholder="Select a machine"
                        data={[
                            "Mitsubishi 35",
                            "Laser Cutter",
                            "Stratos 42",
                            "Falcon 65",
                            "Cypher 15"
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
                            <Table.Th>Start Time</Table.Th>
                            <Table.Th>End Time</Table.Th>
                            <Table.Th>Time Lost (mins)</Table.Th>
                            <Table.Th>Machine Name</Table.Th>
                            <Table.Th>Root Cause</Table.Th>
                            <Table.Th>Foreman</Table.Th>
                            <Table.Th>Shift</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};

export default DowntimeReport;
