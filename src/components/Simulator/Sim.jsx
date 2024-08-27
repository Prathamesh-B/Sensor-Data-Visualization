import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Chip, Container, Grid, Select, Table } from "@mantine/core";
import { TriangleAlert } from "lucide-react";
import {
    fetchProductionLineDetails,
    sendDaqLogs,
} from "../../services/BackendAPIs";

const Sim = () => {
    const [productionLines, setProductionLines] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("");
    const [machineMenu, setMachineMenu] = useState("all");
    const [checked, setChecked] = useState(false);
    const [collapse, setCollapse] = useState({});
    const [simulatedValues, setSimulatedValues] = useState({});

    useEffect(() => {
        const fetchAndUpdateData = async () => {
            const lineData = await fetchProductionLineDetails();
            setProductionLines(lineData);

            const currentLine = lineData.find(
                (line) => line.id.toString() === productionLineMenu
            );
            const machines = currentLine?.machines || [];

            if (machineMenu !== "all" && !machines.some(
                (machine) => machine.id.toString() === machineMenu
            )) {
                setMachineMenu("all");
            }
        };

        fetchAndUpdateData();
    }, [productionLineMenu, machineMenu]);

    const selectedLine = useMemo(
        () =>
            productionLines.find(
                (line) => line.id.toString() === productionLineMenu
            ),
        [productionLines, productionLineMenu]
    );

    const handleToggleCollapse = (machine) => {
        setCollapse((prevState) => ({
            ...prevState,
            [machine]: !prevState[machine],
        }));
    };

    const generateRandomValue = (min, max) => {
        if (min === 0 && max === 1) {
            return Math.round(Math.random());
        } else {
            return Math.random() * (max - min) + min;
        }
    };

    const simulateAndSendData = useCallback(() => {
        const newSimulatedValues = {};
    
        selectedLine?.machines.forEach((machine) => {
            machine.tags.forEach((tag) => {
                const value = generateRandomValue(tag.min_val, tag.max_val);
                
                newSimulatedValues[tag.id] = tag.min_val === 0 && tag.max_val === 1 
                    ? value 
                    : value.toFixed(2);
    
                const daqlog = {
                    timestamp: new Date().toISOString(),
                    tag: tag.id,
                    value: value,
                };
    
                sendDaqLogs(daqlog);
            });
        });
    
        setSimulatedValues(newSimulatedValues);
    }, [selectedLine]);

    useEffect(() => {
        let interval;
        if (checked && selectedLine) {
            simulateAndSendData();
            interval = setInterval(() => {
                simulateAndSendData();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [checked, selectedLine, simulateAndSendData]);

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
                                data={productionLines.map((line) => ({
                                    value: line.id.toString(),
                                    label: line.name,
                                }))}
                                value={productionLineMenu}
                                onChange={setProductionLineMenu}
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
                                data={[
                                    { value: "all", label: "All Machines" },
                                    ...(selectedLine?.machines.map((machine) => ({
                                        value: machine.id.toString(),
                                        label: machine.name,
                                    })) || [])
                                ]}
                                value={machineMenu}
                                onChange={setMachineMenu}
                                disabled={!selectedLine?.machines.length}
                            />
                        </div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Chip
                                mt={20}
                                checked={checked}
                                color={checked ? "green" : "grey"}
                                size="xl"
                                onClick={() => setChecked(!checked)}
                            >
                                {checked ? "ON" : "OFF"}
                            </Chip>
                            <img
                                style={{ width: "4rem", cursor: "pointer" }}
                                src="./images/emergencyStop.png"
                                alt="Emergency Stop Icon"
                            />
                        </div>
                    </Grid.Col>
                </Grid>

                {selectedLine?.machines
                    .filter(machine => machineMenu === "all" || machine.id.toString() === machineMenu)
                    .map((machine) => (
                    <Table
                        key={machine.id}
                        mt={"md"}
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th
                                    colSpan={7}
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleToggleCollapse(machine.id)
                                    }
                                >
                                    {machine.name}{" "}
                                    {collapse[machine.id] ? "▲" : "▼"}
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {!collapse[machine.id] && (
                            <>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Sensor</Table.Th>
                                        <Table.Th>Min.</Table.Th>
                                        <Table.Th>Nom.</Table.Th>
                                        <Table.Th>Max.</Table.Th>
                                        <Table.Th>Freq.</Table.Th>
                                        <Table.Th>Sim.</Table.Th>
                                        <Table.Th>Threshold</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {machine.tags.map((tag) => (
                                        <Table.Tr key={tag.id}>
                                            <Table.Td>{tag.name}</Table.Td>
                                            <Table.Td>{tag.min_val}</Table.Td>
                                            <Table.Td>
                                                {tag.nominal_val}
                                            </Table.Td>
                                            <Table.Td>{tag.max_val}</Table.Td>
                                            <Table.Td>
                                                {tag.frequency || "N/A"}
                                            </Table.Td>
                                            <Table.Td>
                                                {simulatedValues[tag.id] ||
                                                    tag.nominal_val}
                                            </Table.Td>
                                            <Table.Td>
                                                <Button
                                                    variant="outline"
                                                    color="orange"
                                                >
                                                    <TriangleAlert />
                                                </Button>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </>
                        )}
                    </Table>
                ))}
            </Container>
        </>
    );
};

export default Sim;