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
import { useState, useEffect } from "react";
import { fetchDevicesAndTags, fetchData } from "../../services/BackendAPIs";
import { getStatusStyles } from "../../utils/Styles";

const MODashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [topCards, setTopCards] = useState([]);
    const [staticCards, setStaticCards] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [machineMenu, setMachineMenu] = useState("1");
    const [tagMenu, setTagMenu] = useState("1");
    const [filteredChartData, setFilteredChartData] = useState([]);
    const [line, setLine] = useState([]);
    const [machine, setMachine] = useState([]);
    const [deviceTags, setDeviceTags] = useState([]);
    const [customDateRange, setCustomDateRange] = useState({
        start: null,
        end: null,
    });
    const [modalOpened, setModalOpened] = useState(false);

    const handleCustomRange = () => {
        setRangeMenu("Custom");
        setModalOpened(false);
    };

    useEffect(() => {
        const fetchAndUpdateData = async () => {
            fetchDevicesAndTags(setLine, setMachine, setDeviceTags);
            fetchData(
                setStaticCards,
                setTopCards,
                setFilteredChartData,
                customDateRange,
                productionLineMenu,
                tagMenu,
                rangeMenu
            );
        };

        fetchAndUpdateData(); // Initial fetch when component mounts

        const intervalId = setInterval(() => {
            fetchAndUpdateData(); // Fetch data every 5 seconds
        }, 5000);

        return () => {
            clearInterval(intervalId); // Clean up interval
        };
    }, [productionLineMenu, tagMenu, rangeMenu, customDateRange]);

    const lineStatus =
        line.find((line) => line.id.toString() === productionLineMenu)
            ?.status || "No Data";
    const statusStyles = getStatusStyles(lineStatus);

    return (
        <>
            <Grid columns={10} gutter="sm" mb="lg" grow>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./images/production.png"
                                    alt="Production Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Production
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="green"
                                fw={700}
                            >
                                {topCards.production}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./images/production-rate.png"
                                    alt="Production Rate Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Production Rate
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                fw={700}
                                c="indigo"
                            >
                                {staticCards.PR}%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./images/efficiency.png"
                                    alt="Efficiency Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Efficiency
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="teal"
                                fw={700}
                            >
                                {staticCards.ER}%
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 4, lg: 2 }}>
                    <Card
                        shadow="sm"
                        p="xs"
                        radius="md"
                        className="latest-card"
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ marginRight: "1rem" }}>
                                <img
                                    style={{ width: "2.5rem" }}
                                    src="./images/down-time.png"
                                    alt="Downtime Icon"
                                />
                                <Text size="sm" fw={400}>
                                    Downtime(mins)
                                </Text>
                            </div>
                            <Text
                                style={{ fontSize: "3.5rem" }}
                                c="orange"
                                fw={700}
                            >
                                {topCards.downtime}
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col
                    span={1}
                    style={{
                        paddingLeft: "1.2rem",
                    }}
                >
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
                        <div className="machine-dropdown">
                            <Select
                                label="Production Line"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={line.map((device) => ({
                                    value: device.id.toString(),
                                    label: device.name,
                                }))}
                                value={productionLineMenu}
                                onChange={setProductionLineMenu}
                            />
                        </div>
                        <div className="sensor-dropdown">
                            <Select
                                label="Machine"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={machine.map((device) => ({
                                    value: device.id.toString(),
                                    label: device.name,
                                }))}
                                value={machineMenu}
                                onChange={setMachineMenu}
                            />
                        </div>
                        <div className="sensor-dropdown">
                            <Select
                                label="Parameter"
                                allowDeselect={false}
                                placeholder="Pick value"
                                data={deviceTags.map((tag) => ({
                                    value: tag.id.toString(),
                                    label: tag.name,
                                }))}
                                value={tagMenu}
                                onChange={setTagMenu}
                            />
                        </div>
                        <div>
                            {line.length > 0 && (
                                <>
                                    <label className="m_8fdc1311">
                                        Line Status
                                    </label>
                                    <div
                                        className="line-status"
                                        style={{
                                            color: statusStyles.color,
                                            backgroundColor:
                                                statusStyles.background,
                                            borderColor:
                                                statusStyles.borderColor,
                                        }}
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
                    <Text p={"sm"} size="xl">
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
                    <div
                        style={{
                            flex: 1,
                            borderRight: "1px solid #dee2e6",
                        }}
                    >
                        <Text size="sm" fw={500}>
                            Start Date
                        </Text>
                        <DatePicker
                            placeholder="Pick start date"
                            value={customDateRange.start}
                            onChange={(date) =>
                                setCustomDateRange({
                                    ...customDateRange,
                                    start: date,
                                })
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
                                setCustomDateRange({
                                    ...customDateRange,
                                    end: date,
                                })
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
