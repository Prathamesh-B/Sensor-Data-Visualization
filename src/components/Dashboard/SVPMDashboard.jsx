import { Menu, Card, Grid, ScrollArea, Text, Divider } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import { useState } from "react";
import { PackageCheck, Hourglass } from "lucide-react";

const dataSets = {
    Today: {
        data: [
            { name: "Komatsu Press Line 1", unit: 256, time: 2 },
            { name: "Komatsu Press Line 2", unit: 255, time: 1 },
            { name: "Schuller Press Line 1", unit: 254, time: 2 },
            // { name: "Schuller Press Line 2", unit: 252, time: 1 },
            { name: "Hitachi Zosen Press Line 1", unit: 254, time: 3 },
            { name: "Hitachi Zosen Press Line 2", unit: 256, time: 1 },
        ],
        production: 1275,
        efficiency: "80",
        activeMachines: 5,
        downtime: 6,
    },
    Yesterday: {
        data: [
            { name: "Komatsu Press Line 1", unit: 300, time: 1 },
            { name: "Komatsu Press Line 2", unit: 298, time: 2 },
            { name: "Schuller Press Line 1", unit: 297, time: 0 },
            // { name: "Schuller Press Line 2", unit: 297, time: 0 },
            { name: "Hitachi Zosen Press Line 1", unit: 296, time: 3 },
            { name: "Hitachi Zosen Press Line 2", unit: 296, time: 1 },
        ],
        production: 1487,
        efficiency: "78",
        activeMachines: 5,
        downtime: 3,
    },
    "Last 7 Days": {
        data: [
            { name: "Komatsu Press Line 1", unit: 2100, time: 5 },
            { name: "Komatsu Press Line 2", unit: 2089, time: 4 },
            { name: "Schuller Press Line 1", unit: 2089, time: 3 },
            // { name: "Schuller Press Line 2", unit: 2086, time: 1 },
            { name: "Hitachi Zosen Press Line 1", unit: 2089, time: 3 },
            { name: "Hitachi Zosen Press Line 2", unit: 2086, time: 1 },
        ],
        production: 10453,
        efficiency: "85",
        activeMachines: 5,
        downtime: 13,
    },
};

const SVPMDashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [dataSet, setDataSet] = useState(dataSets["Today"]);

    const handleMenuClick = (range) => {
        setRangeMenu(range);
        setDataSet(dataSets[range]);
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
                                className="latest-card menu-button"
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
                            <Menu.Item onClick={() => handleMenuClick("Today")}>
                                Today
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => handleMenuClick("Yesterday")}
                            >
                                Yesterday
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => handleMenuClick("Last 7 Days")}
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
                                {dataSet.production}
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
                        <div
                            style={{ display: "flex", alignItems: "flex-end" }}
                        >
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./efficiency.png"
                                    alt="Efficiency Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Availability
                                </Text>
                            </div>

                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="indigo"
                                fw={700}
                            >
                                {dataSet.efficiency}%
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
                                    src="./machine.png"
                                    alt="Machine Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Active Lines
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
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
                                    Downtime (mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "2.5rem" }}
                                c="orange"
                                fw={700}
                            >
                                {dataSet.downtime}
                            </Text>
                        </div>
                    </Card>
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
                        <>
                            <Grid grow key={index}>
                                <Grid.Col span={3}>
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        className="latest-card"
                                    >
                                        <Text size="xl" fw={500}>
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
                                                style={{
                                                    marginRight: "1rem",
                                                }}
                                                size={30}
                                                strokeWidth={1}
                                            />
                                            <Text
                                                size="xl"
                                                fw={700}
                                                c={"orange"}
                                                style={{
                                                    fontSize: "1.6rem",
                                                }}
                                            >
                                                {item.time}
                                            </Text>
                                        </div>
                                    </Card>
                                </Grid.Col>
                            </Grid>
                            <Divider />
                        </>
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
