import {
    Card,
    Grid,
    ScrollArea,
    Text,
    Combobox,
    useCombobox,
    InputBase,
} from "@mantine/core";
import "./Dashboard.css";
import Notes from "../Notes/Notes";
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { data as chartData, machines, sensors } from "../../data"; // Import data

const Dashboard = () => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const combobox2 = useCombobox({
        onDropdownClose: () => combobox2.resetSelectedOption(),
    });

    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [searchM, setSearchM] = useState("");
    const [searchS, setSearchS] = useState("");
    const [filteredChartData, setFilteredChartData] = useState([]);

    const machineOptions = machines.map((item) => item.name);
    const sensorOptions = sensors.map((item) => item.name);

    const shouldFilterOptionsMachine = machineOptions.every(
        (item) => item !== searchM
    );
    const filteredOptionsMachine = shouldFilterOptionsMachine
        ? machineOptions.filter((item) =>
              item.toLowerCase().includes(searchM.toLowerCase().trim())
          )
        : machineOptions;

    const optionsM = filteredOptionsMachine.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const shouldFilterOptionsSensor = sensorOptions.every(
        (item) => item !== searchS
    );
    const filteredOptionsSensor = shouldFilterOptionsSensor
        ? sensorOptions.filter((item) =>
              item.toLowerCase().includes(searchS.toLowerCase().trim())
          )
        : sensorOptions;

    const optionsS = filteredOptionsSensor.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    useEffect(() => {
        if (value && value2) {
            // Filter chart data based on selected machine and sensor
            const machine = machines.find((m) => m.name === value);
            const sensor = sensors.find((s) => s.name === value2);
            if (machine && sensor) {
                const filteredData = chartData.filter(
                    (item) =>
                        item.machine_id === machine.id &&
                        item.sensor_id === sensor.id
                );
                setFilteredChartData(filteredData);
            }
        }
    }, [value, value2]);

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
                            <Text size="xl" c="orange" fw={700}>
                                30%
                            </Text>
                            <Text weight={500} size="lg" fw={400}>
                                Failure Prediction
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
                            <Text size="xl" c="green" fw={700}>
                                650 units
                            </Text>
                            <Text weight={500} size="lg" fw={400}>
                                Today&apos;s Production
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
                            <Text size="xl" c="indigo" fw={700}>
                                80%
                            </Text>
                            <Text weight={500} size="lg" fw={400}>
                                Production Rate
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
                            <Text size="xl" c="teal" fw={700}>
                                2
                            </Text>
                            <Text weight={500} size="lg" fw={400}>
                                Active Machines
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={8}>
                    <Text weight={500} size="xl">
                        Chart:
                    </Text>
                    <div className="dropdown-chart">
                        <div className="machine-dropdown">
                            <Combobox
                                store={combobox}
                                onOptionSubmit={(val) => {
                                    setValue(val);
                                    setSearchM(val);
                                    combobox.closeDropdown();
                                }}
                            >
                                <Combobox.Target>
                                    <InputBase
                                        rightSection={<Combobox.Chevron />}
                                        rightSectionPointerEvents="none"
                                        onClick={() => combobox.openDropdown()}
                                        onFocus={() => combobox.openDropdown()}
                                        onBlur={() => {
                                            combobox.closeDropdown();
                                            setSearchM(value || "");
                                        }}
                                        placeholder="Select Machine"
                                        value={searchM}
                                        onChange={(event) => {
                                            combobox.updateSelectedOptionIndex();
                                            setSearchM(
                                                event.currentTarget.value
                                            );
                                        }}
                                    />
                                </Combobox.Target>

                                <Combobox.Dropdown>
                                    <Combobox.Options>
                                        {optionsM.length > 0 ? (
                                            optionsM
                                        ) : (
                                            <Combobox.Empty>
                                                Nothing found
                                            </Combobox.Empty>
                                        )}
                                    </Combobox.Options>
                                </Combobox.Dropdown>
                            </Combobox>
                        </div>
                        <div className="sensor-dropdown">
                            <Combobox
                                store={combobox2}
                                onOptionSubmit={(val) => {
                                    setValue2(val);
                                    setSearchS(val);
                                    combobox2.closeDropdown();
                                }}
                            >
                                <Combobox.Target>
                                    <InputBase
                                        rightSection={<Combobox.Chevron />}
                                        rightSectionPointerEvents="none"
                                        onClick={() => combobox2.openDropdown()}
                                        onFocus={() => combobox2.openDropdown()}
                                        onBlur={() => {
                                            combobox2.closeDropdown();
                                            setSearchS(value2 || "");
                                        }}
                                        placeholder="Select Sensor"
                                        value={searchS}
                                        onChange={(event) => {
                                            combobox2.updateSelectedOptionIndex();
                                            setSearchS(
                                                event.currentTarget.value
                                            );
                                        }}
                                    />
                                </Combobox.Target>

                                <Combobox.Dropdown>
                                    <Combobox.Options>
                                        {optionsS.length > 0 ? (
                                            optionsS
                                        ) : (
                                            <Combobox.Empty>
                                                Nothing found
                                            </Combobox.Empty>
                                        )}
                                    </Combobox.Options>
                                </Combobox.Dropdown>
                            </Combobox>
                        </div>
                    </div>
                    <Chart data={filteredChartData} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} weight={500} size="xl">
                        Supervisor Notes
                    </Text>
                    <ScrollArea style={{ height: 450 }}>
                        <Notes />
                    </ScrollArea>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Dashboard;
