import { Card, Grid, ScrollArea, Text } from "@mantine/core";
import "./Dashboard.css";
import { CircleGauge, PlugZap, Thermometer, Wind } from "lucide-react";
import Notes from "../Notes/Notes";
import { data } from "../../data";
import Chart from "../Chart/Chart";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [sensor, setSensor] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/sensors/");
            const json = await response.json();
            if (response.ok) {
                setSensor(json);
            }
        };
        fetchItems();
    }, []);
    const latestData = data.length > 0 ? data[data.length - 1] : {};
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
                        <div>
                            <CircleGauge size={"2.5rem"} strokeWidth={1} />
                        </div>
                        <div className="latest-card-text">
                            <Text weight={500}>Pressure</Text>
                            <Text size="xl" c="blue">
                                {latestData.Pressure} hPa
                            </Text>
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
                        <div>
                            <PlugZap size={"2.5rem"} strokeWidth={1} />
                        </div>
                        <div className="latest-card-text">
                            <Text weight={500}>Voltage</Text>
                            <Text size="xl" c="green">
                                {latestData.Voltage} V
                            </Text>
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
                        <div>
                            <Thermometer size={"2.5rem"} strokeWidth={1} />
                        </div>
                        <div className="latest-card-text">
                            <Text weight={500}>Temperature</Text>
                            <Text size="xl" c="red">
                                {latestData.Temperature} °C
                            </Text>
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
                        <div>
                            <Wind size={"2.5rem"} strokeWidth={1} />
                        </div>
                        <div className="latest-card-text">
                            <Text weight={500}>Humidity</Text>
                            <Text size="xl" c="orange">
                                {latestData.Humidity} %
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={8}>
                    <Text weight={500} size="xl">
                        Sensor Reading
                    </Text>
                    <Chart data={sensor} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text weight={500} size="xl">
                        Supervisor Notes
                    </Text>
                    <ScrollArea style={{ height: 400 }}>
                        <Notes />
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Dashboard;
