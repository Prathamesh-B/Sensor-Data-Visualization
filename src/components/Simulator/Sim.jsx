import { useState, useEffect } from "react";
import { Button, Chip, Container, Grid, Select, Table } from "@mantine/core";
import { fetchDevicesAndTags } from "../../services/BackendAPIs";
import { TriangleAlert } from 'lucide-react';

const Sim = () => {
    const [productionLineMenu, setProductionLineMenu] = useState("G2 Tandem");
    const [machineMenu, setMachineMenu] = useState("1");
    const [line, setLine] = useState([]);
    const [machine, setMachine] = useState([]);
    const [checked, setChecked] = useState(true);
    const [collapse, setCollapse] = useState({});

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

    const handleToggle = () => {
        setChecked(!checked);
    };

    const [sensorData, setSensorData] = useState(initialMachineData[productionLineMenu]);

    useEffect(() => {
        const fetchData = async () => {
            fetchDevicesAndTags(setLine, setMachine);
        };

        fetchData();
    }, []);

    const handleProductionLineChange = (value) => {
        setProductionLineMenu(value);
        setSensorData(initialMachineData[value]); // Update sensor data based on selected line
    };

    const handleToggleCollapse = (machine) => {
        setCollapse(prevState => ({
            ...prevState,
            [machine]: !prevState[machine],
        }));
    };

    const groupedData = sensorData?.reduce((acc, curr) => {
        acc[curr.machine] = acc[curr.machine] || [];
        acc[curr.machine].push(curr);
        return acc;
    }, {});

    return (
        <>
            <div>
                <h2 style={{ display: "flex", justifyContent: "center" }}>Simulator</h2>
            </div>
            <Container>
                <Grid>
                    <Grid.Col span={4}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                style={{ width: "3rem" }}
                                src="./images/production-rate.png"
                                alt="Production Rate Icon"
                            />
                            <Select
                                ml={"0.5rem"}
                                label="Production Line"
                                allowDeselect={false}
                                placeholder="Pick a value"
                                data={Object.keys(initialMachineData)}
                                value={productionLineMenu}
                                onChange={handleProductionLineChange}
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                style={{ width: "3rem" }}
                                src="./images/engineering.png"
                                alt="Production Rate Icon"
                            />
                            <Select
                                ml={"0.5rem"}
                                label="Machine"
                                allowDeselect={false}
                                placeholder="Pick a value"
                                data={machine.map((device) => ({
                                    value: device.id.toString(),
                                    label: device.name,
                                }))}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Chip
                                checked={checked}
                                color={checked ? "green" : "grey"}
                                size="xl"
                                onClick={handleToggle}
                            >
                                {checked ? "ON" : "OFF"}
                            </Chip>
                            <Button variant="filled" color="red" size="lg" radius="xl">STOP</Button>
                        </div>
                    </Grid.Col>
                </Grid>

                {groupedData && Object.entries(groupedData).map(([machine, sensors]) => (
                    <Table.ScrollContainer key={machine} mt={"md"} minWidth={800}>
                        <Table withTableBorder withColumnBorders verticalSpacing={"sm"}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th colSpan={7} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleToggleCollapse(machine)}>
                                        {machine} {collapse[machine] ? "▲" : "▼"}
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Thead style={{ display: collapse[machine] ? "none" : "table-header-group" }}>
                                <Table.Tr>
                                    <Table.Th>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img
                                                style={{ width: "1.5rem", marginRight: "0.5rem" }}
                                                src="./images/sensor.png"
                                                alt="Production Rate Icon"
                                            />
                                            Sensor
                                        </div>
                                    </Table.Th>
                                    <Table.Th>Min.</Table.Th>
                                    <Table.Th>Nom.</Table.Th>
                                    <Table.Th>Max.</Table.Th>
                                    <Table.Th>Freq.</Table.Th>
                                    <Table.Th>Simu.</Table.Th>
                                    <Table.Th>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img
                                                style={{ width: "1.3rem", marginRight: "0.5rem" }}
                                                src="./images/threshold.png"
                                                alt="Production Rate Icon"
                                            />
                                            Threshold
                                        </div>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody style={{ display: collapse[machine] ? "none" : "table-row-group" }}>
                                {sensors.map((sensor, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>{sensor.sensor}</Table.Td>
                                        <Table.Td>{sensor.min}</Table.Td>
                                        <Table.Td>{sensor.nominal}</Table.Td>
                                        <Table.Td>{sensor.max}</Table.Td>
                                        <Table.Td>{sensor.frequency}</Table.Td>
                                        <Table.Td>{sensor.simulated}</Table.Td>
                                        <Table.Td>
                                            <Button variant="outline" color="orange">
                                                <TriangleAlert />
                                            </Button>
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
