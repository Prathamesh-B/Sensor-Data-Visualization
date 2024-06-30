import { Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
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
            <Grid columns={10} gutter="lg" mb="lg">
                <Grid.Col span={{ base: 4, md: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div
                            style={{
                                height: "4rem",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Calendar
                                style={{ marginRight: "1rem" }}
                                size={38}
                                strokeWidth={1.3}
                            />
                            <Select
                                size="xs"
                                placeholder="Pick Range"
                                data={["Today", "Yesterday", "Last Week"]}
                                value={rangeMenu}
                                allowDeselect={false}
                                onChange={setRangeMenu}
                            />
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Boxes
                                style={{ marginRight: "1rem" }}
                                size={38}
                                strokeWidth={1}
                            />
                            <div>
                                <Text
                                    style={{ fontSize: "1.6rem" }}
                                    c="green"
                                    fw={700}
                                >
                                    {topCards.TP} units
                                </Text>
                                <Text size="md" fw={400}>
                                    Production
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <RefreshCw
                                style={{ marginRight: "1rem" }}
                                size={38}
                                strokeWidth={1}
                            />
                            <div>
                                <Text
                                    style={{ fontSize: "1.6rem" }}
                                    fw={700}
                                    c="indigo"
                                >
                                    {topCards.PR}%
                                </Text>
                                <Text size="md" fw={400}>
                                    Production Rate
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Cog
                                style={{ marginRight: "1rem" }}
                                size={38}
                                strokeWidth={1}
                            />
                            <div>
                                <Text
                                    style={{ fontSize: "1.6rem" }}
                                    fw={700}
                                    c="teal"
                                >
                                    {topCards.ER}%
                                </Text>
                                <Text size="md" fw={400}>
                                    Efficiency Rate
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, md: 2 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TriangleAlert
                                style={{ marginRight: "1rem" }}
                                size={38}
                                strokeWidth={1}
                            />
                            <div>
                                <Text
                                    style={{ fontSize: "1.6rem" }}
                                    fw={700}
                                    c="orange"
                                >
                                    {topCards.DT} mins
                                </Text>
                                <Text size="md" fw={400}>
                                    Downtime
                                </Text>
                            </div>
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
