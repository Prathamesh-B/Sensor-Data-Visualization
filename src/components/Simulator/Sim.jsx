import { useState } from "react";
import { Button, Container, Grid, Select, Table, TextInput } from "@mantine/core";

const Sim = () => {
    const [Line, setLine] = useState("G2 Tandem");
    const [Machine, setMachine] = useState("All");

    const productionLines = [
        "G2 Tandem",
        "250T Mini Tandem",
        "1600T Transfer",
        "800T PROG",
        "250T PROG",
    ];

    const machines = [
        "All",
        "Destacker",
        "Robotic Loader",
        "Robotic Unloader",
        "Flaring Press",
        "Welding Machine",
    ];

    const initialMachineData = {
        "G2 Tandem": [
        { machine: "Destacker", sensor: "Temperature", min: 10, nominal: 40, max: 100, simulated: 25, frequency: 5 },
        { machine: "Destacker", sensor: "Pressure", min: 10, nominal: 40, max: 100, simulated: 55, frequency: 5 },
        { machine: "Destacker", sensor: "Voltage", min: 220, nominal: 250, max: 440, simulated: 330, frequency: 5 },
        { machine: "Robotic Loader", sensor: "Proximity", min: 0, nominal: 100, max: 300, simulated: 150, frequency: 5 },
        { machine: "Robotic Loader", sensor: "Voltage", min: 220, nominal: 250, max: 440, simulated: 250, frequency: 5 },
        { machine: "Robotic Loader", sensor: "Load Cells", min: 10, nominal: 60, max: 100, simulated: 40, frequency: 5 },
        ],
        "250T Mini Tandem": [
        { machine: "Flaring Press", sensor: "Pressure", min: 20, nominal: 30, max: 40, simulated: 35, frequency: 5 },
        { machine: "Welding Machine", sensor: "Current", min: 25, nominal: 35, max: 45, simulated: 40, frequency: 5 },
        ],
    };

    const [sensorData, setSensorData] = useState(initialMachineData);

    const handleInputChange = (machine, sensor, field, value) => {
        setSensorData(prevData => {
        const updatedData = { ...prevData };
        updatedData[Line] = updatedData[Line].map(item => 
            item.machine === machine && item.sensor === sensor
            ? { ...item, [field]: Number(value) } 
            : item
        );
        return updatedData;
        });
    };

    const groupedData = sensorData[Line]?.reduce((acc, curr) => {
        acc[curr.machine] = acc[curr.machine] || [];
        acc[curr.machine].push(curr);
        return acc;
    }, {});

    return (
        <>
        <div>
            <h2 style={{ display: "flex", justifyContent: "center" }}>
            Simulator
            </h2>
        </div>
        <Container>
            <Grid>
                <Grid.Col span={4}>
                    <Select
                    label="Production Line"
                    allowDeselect={false}
                    placeholder="Pick a value"
                    data={productionLines}
                    value={Line}
                    onChange={(value) => setLine(value)}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                    label="Machine"
                    allowDeselect={false}
                    placeholder="Pick a value"
                    data={machines}
                    value={Machine}
                    onChange={(value) => setMachine(value)}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button size="md" color="green">Start</Button>
                    <Button size="md" color="red">Stop</Button>
                    </div>
                </Grid.Col>
            </Grid>

            {Line && groupedData && Object.entries(groupedData).map(([machine, sensors]) => (
            <Table.ScrollContainer key={machine} mt={"md"} minWidth={800}>
                <Table verticalSpacing={"sm"}>
                    <Table.Thead>
                        <Table.Tr>
                        <Table.Th colSpan={7} style={{ textAlign: "left" }}>{machine}</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                        <Table.Th>Sensor</Table.Th>
                        <Table.Th>Min</Table.Th>
                        <Table.Th>Nominal</Table.Th>
                        <Table.Th>Max</Table.Th>
                        <Table.Th>Simulated</Table.Th>
                        <Table.Th>Frequency</Table.Th>
                        <Table.Th>Manual</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {sensors.map((sensor, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{sensor.sensor}</Table.Td>
                            <Table.Td>{sensor.min}</Table.Td>
                            <Table.Td>{sensor.nominal}</Table.Td>
                            <Table.Td>{sensor.max}</Table.Td>
                            <Table.Td>{sensor.simulated}</Table.Td>
                            <Table.Td>{sensor.frequency}</Table.Td>
                            <Table.Td>
                            <TextInput
                                value={sensor.simulated}
                                onChange={(e) => handleInputChange(machine, sensor.sensor, 'simulated', e.target.value)}
                                size="xs"
                                type="number"
                            />
                            </Table.Td>
                        </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            ))}
        </Container>
        </>
    );
};

export default Sim;
