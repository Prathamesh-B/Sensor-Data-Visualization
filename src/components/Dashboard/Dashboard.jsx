import { Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { data as chartData, machines, sensors } from "../../data";
import { Boxes, Cog, RefreshCw, TriangleAlert } from "lucide-react";

const Dashboard = () => {
    const sensorOptions = sensors.map((item) => item.name);
    const machineOptions = machines.map((item) => item.name);

    const [machineMenu, setMachineMenu] = useState(machineOptions[0]);
    const [sensorMenu, setSensorMenu] = useState(sensorOptions[6]);
    // const [rangeMenu, setRangeMenu] = useState("Today");
    const [filteredChartData, setFilteredChartData] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            const { role } = token;
            if (role === "Supervisor" || role === "Product Manager") {
                window.location.href = "/svpm";
            } else if (role === "Machine Operator") {
                window.location.href = "/mo";
            }
        }

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
                setFilteredChartData(filteredData);
            }
        }
    }, [machineMenu, sensorMenu]);

    return (
        <>
            <Grid gutter="lg" mb="lg">
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Boxes
                                style={{ marginRight: "1rem" }}
                                size={48}
                                strokeWidth={1}
                            />
                            <div>
                                <Text size="xl" c="green" fw={700}>
                                    650 units
                                </Text>
                                <Text weight={500} size="lg" fw={400}>
                                    Today&apos;s Production
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <RefreshCw
                                style={{ marginRight: "1rem" }}
                                size={48}
                                strokeWidth={1}
                            />
                            <div>
                                <Text size="xl" c="indigo" fw={700}>
                                    80%
                                </Text>
                                <Text weight={500} size="lg" fw={400}>
                                    Production Rate
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Cog
                                style={{ marginRight: "1rem" }}
                                size={48}
                                strokeWidth={1}
                            />
                            <div>
                                <Text size="xl" c="teal" fw={700}>
                                    2
                                </Text>
                                <Text weight={500} size="lg" fw={400}>
                                    Active Machines
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TriangleAlert
                                style={{ marginRight: "1rem" }}
                                size={48}
                                strokeWidth={1}
                            />
                            <div>
                                <Text size="xl" c="orange" fw={700}>
                                    30%
                                </Text>
                                <Text weight={500} size="lg" fw={400}>
                                    Failure Prediction
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
                        {/* <Select
                            placeholder="Pick Range"
                            data={["Today", "Yesterday", "Last Week"]}
                            value={rangeMenu}
                            onChange={setRangeMenu}
                        /> */}
                    </div>
                    <Chart data={filteredChartData} Ylable={sensorMenu} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} weight={500} size="xl">
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

export default Dashboard;
