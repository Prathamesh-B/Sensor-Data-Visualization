import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, Grid, ScrollArea, Text } from "@mantine/core";
import { data, notes } from "../../data";
import "./Dashboard.css";
import { CircleGauge, PlugZap, Thermometer, Wind } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
    const latestData = data.length > 0 ? data[data.length - 1] : {};
    const formatDate = (timestamp) => {
        const date = new Date(timestamp.replace("/", "T"));
        return format(date, "MMM dd, HH:mm");
    };
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
                    <ResponsiveContainer
                        width="100%"
                        height={400}
                        className="chart"
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="Timestamp"
                                tickFormatter={formatDate}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Pressure"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Voltage"
                                stroke="#82ca9d"
                            />
                            <Line
                                type="monotone"
                                dataKey="Temperature"
                                stroke="#ff7300"
                            />
                            <Line
                                type="monotone"
                                dataKey="Humidity"
                                stroke="#ffc658"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text weight={500} size="xl">
                        Supervisor Notes
                    </Text>
                    <ScrollArea style={{ height: 400 }}>
                        {notes.map((note, index) => (
                            <Card shadow="sm" p="lg" mb="lg" key={index}>
                                <Text fw={500}>{note.title}</Text>
                                <Text size="sm" c="dimmed">
                                    {formatDate(note.timestamp)}
                                </Text>
                                <Text w={300} mt="sm" truncate="end">
                                    {note.description}
                                </Text>
                            </Card>
                        ))}
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Dashboard;
