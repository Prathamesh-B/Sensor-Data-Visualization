import { Card, Grid, ScrollArea, Text, Select } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import { useState } from "react";
import {
    Boxes,
    Cog,
    Hourglass,
    PackageCheck,
    RefreshCw,
    TriangleAlert,
} from "lucide-react";

const SVPMDashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");

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
                        <Select
                            placeholder="Pick Range"
                            data={["Today", "Yesterday", "Last Week"]}
                            value={rangeMenu}
                            onChange={setRangeMenu}
                        />
                    </div>
                    <Grid grow>
                        <Grid.Col span={8}>
                            <Card
                                shadow="sm"
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
                                        size={48}
                                        strokeWidth={1}
                                    />
                                    <div>
                                        <Text size="md" fw={400}>
                                            Machine 1
                                        </Text>
                                        <Text
                                            weight={500}
                                            c={"lime"}
                                            size="xl"
                                            fw={700}
                                        >
                                            250
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Card
                                shadow="sm"
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
                                    {/* <Hourglass
                                        style={{ marginRight: "1rem" }}
                                        size={48}
                                        strokeWidth={1}
                                    /> */}
                                    <div>
                                        <Text weight={500} size="lg" fw={400}>
                                            Dowmtime
                                        </Text>
                                        <Text size="xl" c="orange" fw={700}>
                                            12 mins
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card"
                                style={{
                                    border: "1px solid orange",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <PackageCheck
                                        style={{ marginRight: "1rem" }}
                                        size={48}
                                        strokeWidth={1}
                                    />
                                    <div>
                                        <Text size="md" fw={400}>
                                            Machine 2
                                        </Text>
                                        <Text
                                            weight={500}
                                            c={"lime"}
                                            size="xl"
                                            fw={700}
                                        >
                                            132
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Card
                                shadow="sm"
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
                                    {/* <Hourglass
                                        style={{ marginRight: "1rem" }}
                                        size={48}
                                        strokeWidth={1}
                                    /> */}
                                    <div>
                                        <Text weight={500} size="lg" fw={400}>
                                            Dowmtime
                                        </Text>
                                        <Text size="xl" c="orange" fw={700}>
                                            58 mins
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Card
                                shadow="sm"
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
                                        size={48}
                                        strokeWidth={1}
                                    />
                                    <div>
                                        <Text size="md" fw={400}>
                                            Machine 3
                                        </Text>
                                        <Text
                                            weight={500}
                                            c={"lime"}
                                            size="xl"
                                            fw={700}
                                        >
                                            268
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Card
                                shadow="sm"
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
                                    {/* <Hourglass
                                        style={{ marginRight: "1rem" }}
                                        size={48}
                                        strokeWidth={1}
                                    /> */}
                                    <div>
                                        <Text weight={500} size="lg" fw={400}>
                                            Dowmtime
                                        </Text>
                                        <Text size="xl" c="orange" fw={700}>
                                            10 mins
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                    </Grid>
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

export default SVPMDashboard;
