import { useEffect, useState } from "react";
import { Container, Grid, Button, Table, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { formatDate } from "../../utils";
import "./Report.css";

const Report = () => {
    const [devices, setDevices] = useState([]);
    const [reportType, setReportType] = useState("");
    const [productionLineMenu, setProductionLineMenu] = useState("");
    const [alerts, setAlerts] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, [productionLineMenu, startDate, endDate, reportType]);

    const fetchData = async () => {
        try {
            const lineResponse = await fetch("http://127.0.0.1:8000/api/productionlines/");
            const tagResponse = await fetch("http://127.0.0.1:8000/api/tags/");
            
            let alertsUrl = "http://127.0.0.1:8000/api/alerts/";
            const params = [];

            if (productionLineMenu) {
                params.push(`Line=${productionLineMenu}`);
            }

            if (reportType) {
                params.push(`Type=${reportType}`);
            }

            if (startDate && endDate) {
                params.push(`StartDate=${startDate.toISOString()}`);
                params.push(`EndDate=${endDate.toISOString()}`);
            }

            if (params.length > 0) {
                alertsUrl += `?${params.join("&")}`;
            }

            const alertsResponse = await fetch(alertsUrl);

            if (!lineResponse.ok || !tagResponse.ok || !alertsResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const linesData = await lineResponse.json();
            const alertsData = await alertsResponse.json();

            setDevices(linesData);
            setAlerts(alertsData);
        } catch (error) {
            console.error("Error fetching devices, tags, or alerts:", error);
        }
    };

    const handleFetchClick = () => {
        fetchData();
    };

    const filteredAlerts = alerts.filter((alert) =>alert.incident_dtls !== null && alert.type === reportType);

    const headers = () => {
        switch (reportType) {
            case "Error":
                return (
                    <>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Details</Table.Th>
                        <Table.Th>Severity</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Sub-Category</Table.Th>
                        <Table.Th>Reported By</Table.Th>
                        <Table.Th>Role</Table.Th>
                    </>
                );
            case "Warning":
                return (
                    // <>
                    //     <Table.Th>Time</Table.Th>
                    //     <Table.Th>Line Name</Table.Th>
                    //     <Table.Th>Foreman</Table.Th>
                    //     <Table.Th>Shift</Table.Th>
                    //     <Table.Th>Root Cause</Table.Th>
                    //     <Table.Th>Time Lost</Table.Th>
                    // </>
                    <>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Details</Table.Th>
                        <Table.Th>Severity</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Sub-Category</Table.Th>
                        <Table.Th>Reported By</Table.Th>
                        <Table.Th>Role</Table.Th>
                    </>
                );
            case "Info":
                return (
                    <>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Details</Table.Th>
                        <Table.Th>Severity</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Sub-Category</Table.Th>
                        <Table.Th>Reported By</Table.Th>
                        <Table.Th>Role</Table.Th>
                    </>
                );
            default:
                return null;
        }
    };

    const rows = (alert) => {
        switch (reportType) {
            case "Error":
                return (
                    <>
                        <Table.Td>{formatDate(alert.timestamp)}</Table.Td>
                        <Table.Td>{alert.report_title || alert.name}</Table.Td>
                        <Table.Td>{alert.incident_dtls}</Table.Td>
                        <Table.Td>{alert.severity}</Table.Td>
                        <Table.Td>{alert.type}</Table.Td>
                        <Table.Td>{alert.location}</Table.Td>
                        <Table.Td>{alert.report_category}</Table.Td>
                        <Table.Td>{alert.report_sub_cat}</Table.Td>
                        <Table.Td>{alert.issued}</Table.Td>
                        <Table.Td>{alert.role}</Table.Td>
                    </>
                );
            case "Warning":
                return (
                    // <>
                    //     <Table.Td>{formatDate(alert.timestamp)}</Table.Td>
                    //     <Table.Td>{alert.line_id}</Table.Td>
                    //     <Table.Td>{alert.foreman}</Table.Td>
                    //     <Table.Td>{alert.shift}</Table.Td>
                    //     <Table.Td>{alert.rootcause}</Table.Td>
                    //     <Table.Td>{alert.time_lost}</Table.Td>
                    // </>
                    <>
                        <Table.Td>{formatDate(alert.timestamp)}</Table.Td>
                        <Table.Td>{alert.report_title || alert.name}</Table.Td>
                        <Table.Td>{alert.incident_dtls}</Table.Td>
                        <Table.Td>{alert.severity}</Table.Td>
                        <Table.Td>{alert.type}</Table.Td>
                        <Table.Td>{alert.location}</Table.Td>
                        <Table.Td>{alert.report_category}</Table.Td>
                        <Table.Td>{alert.report_sub_cat}</Table.Td>
                        <Table.Td>{alert.issued}</Table.Td>
                        <Table.Td>{alert.role}</Table.Td>
                    </>
                );
            case "Info":
                return (
                    <>
                        <Table.Td>{formatDate(alert.timestamp)}</Table.Td>
                        <Table.Td>{alert.report_title || alert.name}</Table.Td>
                        <Table.Td>{alert.incident_dtls}</Table.Td>
                        <Table.Td>{alert.severity}</Table.Td>
                        <Table.Td>{alert.type}</Table.Td>
                        <Table.Td>{alert.location}</Table.Td>
                        <Table.Td>{alert.report_category}</Table.Td>
                        <Table.Td>{alert.report_sub_cat}</Table.Td>
                        <Table.Td>{alert.issued}</Table.Td>
                        <Table.Td>{alert.role}</Table.Td>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <Grid gutter="lg" mb="lg" mt={"13px"} grow>
                <Grid.Col span={3}>
                    <Select
                        label="Report Type"
                        placeholder="Pick a type"
                        mx="auto"
                        data={["Error", "Info", "Warning"]}
                        value={reportType}
                        onChange={setReportType}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DatePickerInput
                        label="Start Date"
                        placeholder="Pick start date and time"
                        mx="auto"
                        value={startDate}
                        onChange={setStartDate}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <DatePickerInput
                        label="End Date"
                        placeholder="Pick end date and time"
                        mx="auto"
                        value={endDate}
                        onChange={setEndDate}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <div className="machine-dropdown">
                        <Select
                            label="Production Line"
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
                    <Button onClick={handleFetchClick}>Fetch</Button>
                </Grid.Col>
            </Grid>
            <Table.ScrollContainer minWidth={1200}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            {headers()}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {filteredAlerts.map((alert) => (
                            <Table.Tr key={alert.id}>
                                {rows(alert)}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
};

export default Report;
