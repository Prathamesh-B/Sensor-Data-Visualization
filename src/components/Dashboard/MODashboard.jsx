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
    const [devices, setDevices] = useState([]);
    const [deviceTags, setDeviceTags] = useState([]);

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

    useEffect(() => {
        fetchData();
    }, [machineMenu, sensorMenu, rangeMenu]);

    const fetchDevicesAndTags = async () => {
        try {
            const deviceResponse = await fetch("/api/devices/");
            const tagResponse = await fetch("/api/device-tags/");
            if (!deviceResponse.ok || !tagResponse.ok) {
                throw new Error("Network response was not ok");
            }
            const devicesData = await deviceResponse.json();
            const tagsData = await tagResponse.json();

            const uniqueDevices = Array.from(
                new Set(devicesData.map((device) => device.DeviceId))
            ).map((id) => devicesData.find((device) => device.DeviceId === id));
            const uniqueTags = Array.from(
                new Set(tagsData.map((tag) => tag.id))
            ).map((id) => tagsData.find((tag) => tag.id === id));

            setDevices(
                uniqueDevices.filter(
                    (device) => device && device.DeviceId && device.Name
                )
            );
            setDeviceTags(
                uniqueTags.filter((tag) => tag && tag.id && tag.Name)
            );
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const fetchData = async () => {
        if (machineMenu && sensorMenu) {
            try {
                let startDate = new Date().toISOString();
                let endDate = new Date().toISOString();

                switch (rangeMenu) {
                    case "Today":
                        startDate =
                            new Date().toISOString().split("T")[0] +
                            "T00:00:00Z";
                        break;
                    case "Yesterday":
                        var yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        startDate =
                            yesterday.toISOString().split("T")[0] +
                            "T00:00:00Z";
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
                    `/ProdvizBack/api/device_logs/?DeviceID=${machineMenu}&TagId=${sensorMenu}&StartDate=${startDate}&EndDate=${endDate}`
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
                                style={{ cursor: "pointer" }}
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
                                label="Machine:"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={devices.map((device) => ({
                                    value: device.DeviceId.toString(),
                                    label: device.Name,
                                }))}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </div>
                        <div className="sensor-dropdown">
                            <Select
                                label="Sensor:"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={deviceTags.map((tag) => ({
                                    value: tag.id.toString(),
                                    label: tag.Name,
                                }))}
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
