import React, { useState, useEffect } from "react";
import { Menu, Card, Grid, ScrollArea, Text, Divider, Button, Modal } from "@mantine/core";
import Alerts from "../Alerts/Alerts";
import { PackageCheck, Hourglass } from "lucide-react";
import "./Dashboard.css";
import { DatePicker } from "@mantine/dates";

const SVPMDashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [customDateRange, setCustomDateRange] = useState({
        start: null,
        end: null,
    });
    const [modalOpened, setModalOpened] = useState(false);

    const handleCustomRange = () => {
        setRangeMenu("Custom");
        setModalOpened(false);
    };
    const [dataSet, setDataSet] = useState({
        data: [],
        production: 0,
        efficiency: "0",
        activeMachines: 0,
        downtime: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            let startDate = new Date().toISOString();
            let endDate = new Date().toISOString();

            switch (rangeMenu) {
                case "Today":
                    startDate =
                        new Date().toISOString().split("T")[0] + "T00:00:00Z";
                    break;
                case "Yesterday":
                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    startDate =
                        yesterday.toISOString().split("T")[0] + "T00:00:00Z";
                    endDate =
                        new Date(yesterday).toISOString().split("T")[0] +
                        "T23:59:59Z";
                    break;
                case "Last 7 Days":
                    var lastWeek = new Date();
                    lastWeek.setDate(lastWeek.getDate() - 6);
                    startDate =
                        lastWeek.toISOString().split("T")[0] + "T00:00:00Z";
                    break;
                default:
                    break;
            }
            const response = await fetch(
                `http://127.0.0.1:8000/api/machine-performance?StartDate=${startDate}&EndDate=${endDate}`
            );
            const apiData = await response.json();

            if (Array.isArray(apiData) && apiData.length > 0) {
                const formattedData = {
                    data: apiData.map((item) => ({
                        name: item.line_name,
                        unit: item.production,
                        time: item.downtime,
                    })),
                    production: apiData.reduce(
                        (sum, item) => sum + item.production,
                        0
                    ),
                    availability: 75,
                    activeMachines: apiData.length,
                    downtime: apiData.reduce(
                        (sum, item) => sum + item.downtime,
                        0
                    ),
                };

                setDataSet(formattedData);
            } else {
                throw new Error("Invalid API response");
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [rangeMenu]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Grid columns={10} gutter="lg" mb="lg" grow>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production.png"
                                    alt="Production Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Production
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="green"
                                fw={700}
                            >
                                {dataSet.production}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div
                            style={{ display: "flex", alignItems: "flex-end" }}
                        >
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./efficiency.png"
                                    alt="Availability Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Availability
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="indigo"
                                fw={700}
                            >
                                {dataSet.availability}%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./machine.png"
                                    alt="Machine Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Active Lines
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="teal"
                                fw={700}
                            >
                                {dataSet.activeMachines}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./down-time.png"
                                    alt="Downtime Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Downtime(mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="orange"
                                fw={700}
                            >
                                {dataSet.downtime}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col
                    span={1}
                    style={{
                        paddingLeft: "1.2rem",
                    }}
                >
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Card
                                shadow="sm"
                                p="lg"
                                className="latest-card menu-button"
                                style={{
                                    borderRadius: "50%",
                                    height: "6.8rem",
                                    width: "6.8rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./calendar.png"
                                    alt="Calendar Icon"
                                />
                                <Text
                                    className="menu-text"
                                    style={{ marginTop: "0.3rem" }}
                                    size="lg"
                                    fw={700}
                                >
                                    {rangeMenu}
                                </Text>
                            </Card>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Day Range</Menu.Label>
                            <Menu.Item onClick={() => setRangeMenu("Today")}>
                                Today
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => setRangeMenu("Yesterday")}
                            >
                                Yesterday
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => setRangeMenu("Last 7 Days")}
                            >
                                Last 7 Days
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item onClick={() => setModalOpened(true)}>
                                Custom Range
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <Modal
                        opened={modalOpened}
                        onClose={() => setModalOpened(false)}
                        title="Select Custom Date Range"
                        size="auto"
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    borderRight: "1px solid #dee2e6",
                                }}
                            >
                                <Text size="sm" fw={500}>
                                    Start Date
                                </Text>
                                <DatePicker
                                    placeholder="Pick start date"
                                    value={customDateRange.start}
                                    onChange={(date) =>
                                        setCustomDateRange({
                                            ...customDateRange,
                                            start: date,
                                        })
                                    }
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    End Date
                                </Text>
                                <DatePicker
                                    placeholder="Pick end date"
                                    value={customDateRange.end}
                                    onChange={(date) =>
                                        setCustomDateRange({
                                            ...customDateRange,
                                            end: date,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleCustomRange}
                            style={{
                                marginTop: "1rem",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            Set Custom Range
                        </Button>
                    </Modal>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={8}>
                    <Grid grow style={{ textAlign: "center" }}>
                        <Grid.Col span={3}>
                            <Text size="xl">Line</Text>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Text size="xl">Production</Text>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Text size="xl">Downtime (mins)</Text>
                        </Grid.Col>
                    </Grid>
                    {dataSet.data.map((item, index) => (
                        <React.Fragment key={index}>
                            <Grid grow>
                                <Grid.Col span={3}>
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        className="latest-card"
                                    >
                                        <Text size="lg" fw={600}>
                                            {item.name}
                                        </Text>
                                    </Card>
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        className="latest-card"
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <PackageCheck
                                                style={{ marginRight: "1rem" }}
                                                size={30}
                                                strokeWidth={1}
                                            />
                                            <Text
                                                size="xl"
                                                fw={700}
                                                c={"lime"}
                                                style={{ fontSize: "1.6rem" }}
                                            >
                                                {item.unit}
                                            </Text>
                                        </div>
                                    </Card>
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        className="latest-card"
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Hourglass
                                                style={{ marginRight: "1rem" }}
                                                size={30}
                                                strokeWidth={1}
                                            />
                                            <Text
                                                size="xl"
                                                fw={700}
                                                c={"orange"}
                                                style={{ fontSize: "1.6rem" }}
                                            >
                                                {item.time}
                                            </Text>
                                        </div>
                                    </Card>
                                </Grid.Col>
                            </Grid>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} size="xl">
                        Alerts :
                    </Text>
                    <ScrollArea style={{ height: 450 }}>
                        <Alerts />
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default SVPMDashboard;
