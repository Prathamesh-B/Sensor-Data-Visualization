import {
    Menu,
    Card,
    Grid,
    ScrollArea,
    Text,
    Select,
    Modal,
    Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "./Dashboard.css";
import Alerts from "../Alerts/Alerts";
import Chart from "../Chart/Chart";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
    fetchProductionLineDetails,
    fetchChartData,
} from "../../services/BackendAPIs";
import { getStatusStyles } from "../../utils/Styles";

const MODashboard = () => {
    const [metrics, setMetrics] = useState({});
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [productionLines, setProductionLines] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [machineMenu, setMachineMenu] = useState("1");
    const [tagMenu, setTagMenu] = useState("1");
    const [filteredChartData, setFilteredChartData] = useState([]);
    const [customDateRange, setCustomDateRange] = useState({
        start: null,
        end: null,
    });
    const [modalOpened, setModalOpened] = useState(false);

    const handleCustomRange = useCallback(() => {
        setRangeMenu("Custom");
        setModalOpened(false);
    }, []);

    useEffect(() => {
        const fetchAndUpdateData = async () => {
            const lineData = await fetchProductionLineDetails();
            setProductionLines(lineData);

            const currentLine = lineData.find(
                (line) => line.id.toString() === productionLineMenu
            );
            const machines = currentLine?.machines || [];

            if (
                !machines.some(
                    (machine) => machine.id.toString() === machineMenu
                )
            ) {
                setMachineMenu(machines[0]?.id.toString() || "");
            }

            const currentMachine = machines.find(
                (machine) => machine.id.toString() === machineMenu
            );
            const tags = currentMachine?.tags || [];

            if (!tags.some((tag) => tag.id.toString() === tagMenu)) {
                setTagMenu(tags[0]?.id.toString() || "");
            }

            fetchChartData(
                setMetrics,
                setFilteredChartData,
                customDateRange,
                productionLineMenu,
                machineMenu,
                tagMenu,
                rangeMenu
            );
        };

        fetchAndUpdateData();

        const intervalId = setInterval(fetchAndUpdateData, 5000);

        return () => clearInterval(intervalId);
    }, [productionLineMenu, machineMenu, rangeMenu, tagMenu, customDateRange]);

    const selectedLine = useMemo(
        () =>
            productionLines.find(
                (line) => line.id.toString() === productionLineMenu
            ),
        [productionLines, productionLineMenu]
    );

    const lineStatus = selectedLine?.status || "No Data";

    const renderCard = useCallback(
        ({ title, iconSrc, value, color }) => (
            <Card shadow="sm" p="xs" radius="md" className="latest-card">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "1rem" }}>
                        <img
                            style={{ width: "2.5rem" }}
                            src={iconSrc}
                            alt={`${title} Icon`}
                        />
                        <Text size="sm" fw={400}>
                            {title}
                        </Text>
                    </div>
                    <Text style={{ fontSize: "3.5rem" }} fw={700} c={color}>
                        {value}
                    </Text>
                </div>
            </Card>
        ),
        []
    );

    return (
        <>
            <Grid columns={10} gutter="sm" mb="lg" grow>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    {renderCard({
                        title: "Production",
                        iconSrc: "./images/production.png",
                        value: metrics?.production || 0,
                        color: "green",
                    })}
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    {renderCard({
                        title: "Production Rate",
                        iconSrc: "./images/production-rate.png",
                        value: `${metrics?.production_rate || 0}%`,
                        color: "indigo",
                    })}
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    {renderCard({
                        title: "Efficiency",
                        iconSrc: "./images/efficiency.png",
                        value: `${metrics?.efficiency || 0}%`,
                        color: "teal",
                    })}
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    {renderCard({
                        title: "Downtime(mins)",
                        iconSrc: "./images/down-time.png",
                        value: metrics?.downtime || 0,
                        color: "orange",
                    })}
                </Grid.Col>
                <Grid.Col span={1} style={{ paddingLeft: "1.2rem" }}>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Card
                                shadow="sm"
                                p="lg"
                                className="latest-card menu-button"
                                style={{
                                    borderRadius: "50%",
                                    height: "6.8rem",
                                    width: "6.8rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./images/calendar.png"
                                    alt="Calendar Icon"
                                />
                                <Text
                                    className="menu-text"
                                    style={{ marginTop: "0.3rem" }}
                                    size="lg"
                                    fw={700}
                                >
                                    {rangeMenu}
                                </Text>
                            </Card>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Day Range</Menu.Label>
                            <Menu.Item onClick={() => setRangeMenu("Today")}>
                                Today
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => setRangeMenu("Yesterday")}
                            >
                                Yesterday
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => setRangeMenu("Last 7 Days")}
                            >
                                Last 7 Days
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item onClick={() => setModalOpened(true)}>
                                Custom Range
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
            <Grid grow>
                <Grid.Col span={8}>
                    <div className="dropdown-chart">
                        <Select
                            label="Production Line"
                            allowDeselect={false}
                            placeholder="Pick value"
                            data={productionLines.map((line) => ({
                                value: line.id.toString(),
                                label: line.name,
                            }))}
                            value={productionLineMenu}
                            onChange={setProductionLineMenu}
                            className="machine-dropdown"
                        />
                        <Select
                            label="Machine"
                            allowDeselect={false}
                            placeholder="Pick value"
                            data={
                                selectedLine?.machines.map((machine) => ({
                                    value: machine.id.toString(),
                                    label: machine.name,
                                })) || []
                            }
                            value={machineMenu}
                            onChange={setMachineMenu}
                            disabled={!selectedLine?.machines.length}
                            className="sensor-dropdown"
                        />
                        <Select
                            label="Parameter"
                            allowDeselect={false}
                            placeholder="Pick value"
                            data={
                                selectedLine?.machines
                                    .find(
                                        (machine) =>
                                            machine.id.toString() ===
                                            machineMenu
                                    )
                                    ?.tags.map((tag) => ({
                                        value: tag.id.toString(),
                                        label: tag.name,
                                    })) || []
                            }
                            value={tagMenu}
                            onChange={setTagMenu}
                            disabled={
                                !selectedLine?.machines.find(
                                    (machine) =>
                                        machine.id.toString() === machineMenu
                                )?.tags.length
                            }
                            className="sensor-dropdown"
                        />
                        <div>
                            {productionLines.length > 0 && (
                                <>
                                    <label className="m_8fdc1311">
                                        Line Status
                                    </label>
                                    <div
                                        className="line-status"
                                        style={getStatusStyles(lineStatus)}
                                    >
                                        {lineStatus}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <Chart data={filteredChartData} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p="sm" size="xl">
                        Alerts
                    </Text>
                    <ScrollArea style={{ height: 450 }}>
                        <Alerts />
                    </ScrollArea>
                </Grid.Col>
            </Grid>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Select Custom Date Range"
                size="auto"
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    <div style={{ flex: 1, borderRight: "1px solid #dee2e6" }}>
                        <Text size="sm" fw={500}>
                            Start Date
                        </Text>
                        <DatePicker
                            placeholder="Pick start date"
                            value={customDateRange.start}
                            onChange={(date) =>
                                setCustomDateRange((prev) => ({
                                    ...prev,
                                    start: date,
                                }))
                            }
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                            End Date
                        </Text>
                        <DatePicker
                            placeholder="Pick end date"
                            value={customDateRange.end}
                            onChange={(date) =>
                                setCustomDateRange((prev) => ({
                                    ...prev,
                                    end: date,
                                }))
                            }
                        />
                    </div>
                </div>
                <Button
                    onClick={handleCustomRange}
                    style={{
                        marginTop: "1rem",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    Set Custom Range
                </Button>
            </Modal>
        </>
    );
};

export default MODashboard;
