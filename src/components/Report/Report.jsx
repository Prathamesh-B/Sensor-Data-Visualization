import { useEffect, useState } from "react";
import { Container, Grid, Button,Table, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
// import { formatDate } from "../../utils";
import "./Report.css";

const Report = () => {
    const [devices, setDevices] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("");
    const [report, setReport] = useState("");

    useEffect(() => {
        fetchData();
    }, [productionLineMenu]);

    const fetchData = async () => {
        try {
            const lineResponse = await fetch(
                "http://127.0.0.1:8000/api/productionlines/"
            );
            const tagResponse = await fetch("http://127.0.0.1:8000/api/tags/");

            if (!lineResponse.ok || !tagResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const linesData = await lineResponse.json();
            // const tagsData = await tagResponse.json();

            setDevices(linesData);
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    
    return (
        <Container>
            <Grid gutter="lg" mb="lg" mt={"13px"}>
                <Grid.Col span={3}>
                    <Select
                        label="Report type"
                        placeholder="Pick a Type"
                        data={[
                            "Alert",
                            "Info",
                            "Downtime",
                        ]}
                        value={report}
                        onChange={setReport}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DateTimePicker
                        label="Start Date"
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DateTimePicker
                        label="End Date"
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                        <div className="machine-dropdown">
                            <Select
                                label="Production Line"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={devices.map((device) => ({
                                    value: device.id.toString(),
                                    label: device.name,
                                }))}
                                value={productionLineMenu}
                                onChange={setProductionLineMenu}
                            />
                        </div>
                </Grid.Col>
                <Grid.Col span={4} mt={"auto"}>
                    <Button>Fetch</Button>
                </Grid.Col>
            </Grid>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Time</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Details</Table.Th>
                            <Table.Th>Severity</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Location</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Sub-Category</Table.Th>
                            <Table.Th>ETA</Table.Th>
                            <Table.Th>reported by</Table.Th>
                            <Table.Th>Role</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody></Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};

export default Report;
