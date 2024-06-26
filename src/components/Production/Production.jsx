import { Card, Grid, Text, Combobox, useCombobox, InputBase, Table, } from '@mantine/core';
import React from 'react'
import "./Production.css"
import Chart from "../Chart/Chart";
import { useState, useEffect } from "react";
import { data as chartData, machines, products, status } from "../../data";


const Production = () => {
    const rows = status.map((Status) => (
        <Table.Tr key={Status.name}>
            <Table.Td>{Status.name}</Table.Td>
            <Table.Td>{Status.status}</Table.Td>
        </Table.Tr>
    ));

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const combobox2 = useCombobox({
        onDropdownClose: () => combobox2.resetSelectedOption(),
    });

    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [searchM, setSearchM] = useState("");
    const [searchP, setSearchP] = useState("");
    const [filteredChartData, setFilteredChartData] = useState([]);

    const machineOptions = machines.map((item) => item.name);
    const productOptions = products.map((item) => item.name);

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

    const shouldFilterOptionsProduct = productOptions.every(
        (item) => item !== searchP
    );
    const filteredOptionsProduct = shouldFilterOptionsProduct
        ? productOptions.filter((item) =>
              item.toLowerCase().includes(searchP.toLowerCase().trim())
          )
        : productOptions;

    const optionsP = filteredOptionsProduct.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    useEffect(() => {
        if (value && value2) {
            // Filter chart data based on selected machine and sensor
            const machine = machines.find((m) => m.name === value);
            const product = products.find((s) => s.name === value2);
            if (machine && product) {
                const filteredData = chartData.filter(
                    (item) =>
                        item.machine_id === machine.id &&
                        item.product_id === product.id
                );
                setFilteredChartData(filteredData);
            }
        }
    }, [value, value2]);
  return (
    <>
        <Grid grow gutter="lg" mb="lg">
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text weight={500} size="lg" fw={400}>
                                No of Machines
                            </Text>
                            <Text size="xl" c="blue" fw={700}>
                                3
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
                            <Text weight={500} size="lg" fw={400}>
                                Raw Materials
                            </Text>
                            <Text size="xl" c="yellow" fw={700}>
                                Restock Required
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
            </Grid>
            <Grid>
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
                                    setSearchP(val);
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
                                        placeholder="Select Product"
                                        value={searchP}
                                        onChange={(event) => {
                                            combobox2.updateSelectedOptionIndex();
                                            setSearchP(
                                                event.currentTarget.value
                                            );
                                        }}
                                    />
                                </Combobox.Target>

                                <Combobox.Dropdown>
                                    <Combobox.Options>
                                        {optionsP.length > 0 ? (
                                            optionsP
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
                        Machine Status
                    </Text>
                    <Table.ScrollContainer>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
                </Grid.Col>
            </Grid>
    </>
  )
}

export default Production
