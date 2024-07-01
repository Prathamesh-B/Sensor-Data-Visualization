import { Menu, Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { cards } from "../../data";

const MODashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [topCards, setTopCards] = useState([]);
    const [machineMenu, setMachineMenu] = useState("DIDa1B2c3D4");
    const [sensorMenu, setSensorMenu] = useState("12");
    const [filteredChartData, setFilteredChartData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [machineMenu, sensorMenu]);

    const fetchData = async () => {
        if (machineMenu && sensorMenu) {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/device_logs/?DeviceID=${machineMenu}&TagId=${sensorMenu}&StartDate=2024-05-31T18%3A30%3A00.000Z&EndDate=2024-06-01T07%3A30%3A00.501Z`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const test = cards.filter(
                    (card) => card.machine_id === machineMenu
                );
                setTopCards(test[0]);
                setFilteredChartData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error state or show a message to the user
                setFilteredChartData([]);
            }
        }
    };

    return (
        <>
            <Grid columns={10} gutter="lg" mb="lg" grow>
                <Grid.Col span={1}>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    style={{
                                        height: "4rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        style={{ width: "2.5rem" }}
                                        src="./calendar.png"
                                    />
                                    <Text
                                        style={{ marginTop: "0.3rem" }}
                                        size="sm"
                                        fw={400}
                                    >
                                        {rangeMenu}
                                    </Text>
                                </div>
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
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production.png"
                                />
                                <Text size="sm" fw={400}>
                                    Production
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="green"
                                fw={700}
                            >
                                {topCards.TP}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./production-rate.png"
                                />
                                <Text size="sm" fw={400}>
                                    Production Rate
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
                                fw={700}
                                c="indigo"
                            >
                                {topCards.PR}%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./efficiency.png"
                                />
                                <Text size="sm" fw={400}>
                                    Efficiency
                                </Text>
                            </div>

                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="teal"
                                fw={700}
                            >
                                {topCards.ER}%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./down-time.png"
                                />
                                <Text size="sm" fw={400}>
                                    Downtime (mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="orange"
                                fw={700}
                            >
                                {topCards.DT}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={8}>
                    <div className="dropdown-chart">
                        <div className="machine-dropdown">
                            <Select
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={[
                                    {
                                        value: "DIDa1B2c3D4",
                                        label: "Machine A",
                                    },
                                    {
                                        value: "DIDe5F6g7H8",
                                        label: "Machine B",
                                    },
                                    {
                                        value: "DIDi9J0k1L2",
                                        label: "Machine C",
                                    },
                                    {
                                        value: "DIDm3N4o5P6",
                                        label: "Machine D",
                                    },
                                    {
                                        value: "DIDq7R8s9T0",
                                        label: "Machine E",
                                    },
                                ]}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </div>
                        <div className="sensor-dropdown">
                            <Select
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
                        </div>
                    </div>
                    <Chart data={filteredChartData} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} size="xl">
                        Alerts :
                    </Text>
                    <ScrollArea style={{ height: 400 }}>
                        <Alerts />
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default MODashboard;
