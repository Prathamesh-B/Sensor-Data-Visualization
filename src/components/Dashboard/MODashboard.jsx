import { Menu, Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { cards, sensorsOpt } from "../../data";

const MODashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [topCards, setTopCards] = useState([]);
    const [staticCards, setStaticCards] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [tagMenu, setTagMenu] = useState("12");
    const [filteredChartData, setFilteredChartData] = useState([]);
    const [devices, setDevices] = useState([]);
    const [deviceTags, setDeviceTags] = useState([]);

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

    useEffect(() => {
        fetchData();
    }, [productionLineMenu, tagMenu, rangeMenu]);

    const fetchDevicesAndTags = async () => {
        try {
            const lineResponse = await fetch(
                "http://127.0.0.1:8000/api/productionlines/"
            );
            const tagResponse = await fetch("http://127.0.0.1:8000/api/tags/");

            if (!lineResponse.ok || !tagResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const linesData = await lineResponse.json();
            const tagsData = await tagResponse.json();

            setDevices(linesData);
            setDeviceTags(sensorsOpt);
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const fetchData = async () => {
        if (productionLineMenu && tagMenu) {
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
                    `http://127.0.0.1:8000/api/logs?LineId=${productionLineMenu}&TagId=${tagMenu}&StartDate=${startDate}&EndDate=${endDate}`
                );

                const MPresponse = await fetch(
                    `http://127.0.0.1:8000/api/machine-performance/?StartDate=${startDate}&EndDate=${endDate}`
                );

                if (!MPresponse.ok) {
                    throw new Error("Network response was not ok");
                }

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const MPdata = await MPresponse.json();

                const filter = MPdata.filter(
                    (data) => data.line_id === +productionLineMenu
                );

                const staticData = cards.filter(
                    (data) => data.line_id === productionLineMenu
                );

                setStaticCards(staticData[0]);
                setTopCards(filter[0]);
                setFilteredChartData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setFilteredChartData([]);
            }
        }
    };

    return (
        <>
            <Grid columns={10} gutter="sm" mb="lg" grow>
                <Grid.Col span={1}>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card menu-button"
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
                                        alt="Calendar Icon"
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
                                    alt="Production Icon"
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
                                {topCards.production}
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
                                    alt="Production Rate Icon"
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
                                {staticCards.PR}%
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
                                    alt="Efficiency Icon"
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
                                {staticCards.ER}%
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
                                    alt="Downtime Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Downtime(mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="orange"
                                fw={700}
                            >
                                {topCards.downtime}
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
                        </div>
                        <div className="sensor-dropdown">
                            <Select
                                label="Sensor:"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={deviceTags.map((tag) => ({
                                    value: tag.id.toString(),
                                    label: tag.name,
                                }))}
                                value={tagMenu}
                                onChange={setTagMenu}
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
