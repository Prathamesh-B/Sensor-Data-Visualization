import { Menu, Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { data as chartData, machines, sensors, cards } from "../../data";
import { Boxes, Calendar, Cog, RefreshCw, TriangleAlert } from "lucide-react";

const FSDashboard = () => {
    const sensorOptions = sensors.map((item) => item.name);
    const machineOptions = machines.map((item) => item.name);

    const [rangeMenu, setRangeMenu] = useState("Today");
    const [machineMenu, setMachineMenu] = useState(machineOptions[0]);
    const [topCards, setTopCards] = useState([]);
    const [sensorMenu, setSensorMenu] = useState(sensorOptions[6]);
    const [filteredChartData, setFilteredChartData] = useState([]);

    useEffect(() => {
        if (machineMenu && sensorMenu) {
            // Filter chart data based on selected machine and sensor
            const machine = machines.find((m) => m.name === machineMenu);
            const sensor = sensors.find((s) => s.name === sensorMenu);
            if (machine && sensor) {
                const filteredData = chartData.filter(
                    (item) =>
                        item.machine_id === machine.id &&
                        item.sensor_id === sensor.id
                );
                const test = cards.filter(
                    (card) => card.machine_id === machine.id
                );
                setTopCards(test[0]);
                setFilteredChartData(filteredData);
            }
        }
    }, [machineMenu, sensorMenu]);

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
                                placeholder="Pick value"
                                data={machineOptions}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </div>
                        <div className="sensor-dropdown">
                            <Select
                                placeholder="Pick value"
                                data={sensorOptions}
                                value={sensorMenu}
                                onChange={setSensorMenu}
                            />
                        </div>
                    </div>
                    <Chart data={filteredChartData} Ylable={sensorMenu} />
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

export default FSDashboard;
