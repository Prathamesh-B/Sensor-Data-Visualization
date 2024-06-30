import { Card, Grid, Popover, ScrollArea, Select, Text } from "@mantine/core";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import { useState } from "react";
import {
    Boxes,
    Cog,
    PackageCheck,
    RefreshCw,
    TriangleAlert,
    Calendar,
    Hourglass,
} from "lucide-react";

const SVPMDashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");

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
                                    642 units
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
                                    c="indigo"
                                    fw={700}
                                >
                                    80%
                                </Text>
                                <Text size="md" fw={400}>
                                    Efficiency
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
                                    c="teal"
                                    fw={700}
                                >
                                    2
                                </Text>
                                <Text size="md" fw={400}>
                                    Active Machines
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
                                    c="orange"
                                    fw={700}
                                >
                                    80 mins
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
                    <Text p={"sm"} size="xl">
                        Machines :
                    </Text>
                    <Grid grow style={{ textAlign: "center" }}>
                        <Grid.Col span={3}>
                            <Text size="xl">Name</Text>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Text size="xl">Production</Text>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Text size="xl">Downtime</Text>
                        </Grid.Col>
                    </Grid>
                    <Grid grow>
                        <Grid.Col span={3}>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card"
                            >
                                <Text size="xl" fw={500}>
                                    Mitsubishi 35
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
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
                                        size={30}
                                        strokeWidth={1}
                                    />
                                    <Text
                                        size="xl"
                                        fw={700}
                                        c={"lime"}
                                        style={{ fontSize: "1.6rem" }}
                                    >
                                        250
                                    </Text>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Popover
                                width={200}
                                position="bottom"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target>
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
                                                12 mins
                                            </Text>
                                        </div>
                                    </Card>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="sm">• 12 mins - 10 am</Text>
                                </Popover.Dropdown>
                            </Popover>
                        </Grid.Col>
                    </Grid>
                    <Grid grow>
                        <Grid.Col span={3}>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card"
                            >
                                <Text size="xl" fw={500}>
                                    Laser Cutter
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
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
                                        size={30}
                                        strokeWidth={1}
                                    />
                                    <Text
                                        size="xl"
                                        fw={700}
                                        c={"lime"}
                                        style={{ fontSize: "1.6rem" }}
                                    >
                                        124
                                    </Text>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Popover
                                width={200}
                                position="bottom"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target>
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
                                                58 mins
                                            </Text>
                                        </div>
                                    </Card>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="sm">
                                        • 48 mins - 09:12 am <br />• 10mins -
                                        01:36 pm
                                    </Text>
                                </Popover.Dropdown>
                            </Popover>
                        </Grid.Col>
                    </Grid>
                    <Grid grow>
                        <Grid.Col span={3}>
                            <Card
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                className="latest-card"
                            >
                                <Text size="xl" fw={500}>
                                    Welding
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
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
                                        size={30}
                                        strokeWidth={1}
                                    />
                                    <Text
                                        size="xl"
                                        fw={700}
                                        c={"lime"}
                                        style={{ fontSize: "1.6rem" }}
                                    >
                                        268
                                    </Text>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Popover
                                width={200}
                                position="bottom"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target>
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
                                                10 mins
                                            </Text>
                                        </div>
                                    </Card>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="sm">• 10 mins - 10 am</Text>
                                </Popover.Dropdown>
                            </Popover>
                        </Grid.Col>
                    </Grid>
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
