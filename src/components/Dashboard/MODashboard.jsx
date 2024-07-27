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
import { cards, sensorsOpt } from "../../data";

const MODashboard = () => {
    const [rangeMenu, setRangeMenu] = useState("Today");
    const [topCards, setTopCards] = useState([]);
    const [staticCards, setStaticCards] = useState([]);
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [tagMenu, setTagMenu] = useState("12");
    const [filteredChartData, setFilteredChartData] = useState([]);
    const [devices, setDevices] = useState([]);
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
        fetchDevicesAndTags();
    }, []);

    useEffect(() => {
        fetchData();
    }, [productionLineMenu, tagMenu, rangeMenu, customDateRange]);

    const fetchDevicesAndTags = async () => {
        try {
            const lineResponse = await fetch(
                "http://127.0.0.1:8000/api/productionlines/"
            );
            const tagResponse = await fetch("http://127.0.0.1:8000/api/tags/");

            if (!lineResponse.ok || !tagResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const linesData = await lineResponse.json();
            // const tagsData = await tagResponse.json();

            setDevices(linesData);
            setDeviceTags(sensorsOpt);
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const fetchData = async () => {
        if (productionLineMenu && tagMenu) {
            try {
                let startDate = new Date().toISOString();
                let endDate = new Date().toISOString();

                switch (rangeMenu) {
                    case "Today":
                        startDate =
                            new Date().toISOString().split("T")[0] +
                            "T00:00:00Z";
                        endDate =
                            new Date().toISOString().split("T")[0] +
                            "T23:59:59Z";
                        break;
                    case "Yesterday":
                        var yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        startDate =
                            yesterday.toISOString().split("T")[0] +
                            "T00:00:00Z";
                        endDate =
                            yesterday.toISOString().split("T")[0] +
                            "T23:59:59Z";
                        break;
                    case "Last 7 Days":
                        var lastWeek = new Date();
                        lastWeek.setDate(lastWeek.getDate() - 6);
                        startDate =
                            lastWeek.toISOString().split("T")[0] + "T00:00:00Z";
                        endDate =
                            new Date().toISOString().split("T")[0] +
                            "T23:59:59Z";
                        break;
                    case "Custom":
                        if (customDateRange.start && customDateRange.end) {
                            startDate =
                                customDateRange.start
                                    .toISOString()
                                    .split("T")[0] + "T00:00:00Z";
                            endDate =
                                customDateRange.end
                                    .toISOString()
                                    .split("T")[0] + "T23:59:59Z";
                        }
                        console.log(startDate, endDate);
                        break;
                    default:
                        break;
                }

                const response = await fetch(
                    `http://127.0.0.1:8000/api/logs?LineId=${productionLineMenu}&TagId=${tagMenu}&StartDate=${startDate}&EndDate=${endDate}`
                );

                const MPresponse = await fetch(
                    `http://127.0.0.1:8000/api/machine-performance/?StartDate=${startDate}&EndDate=${endDate}`
                );

                if (!response.ok || !MPresponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const MPdata = await MPresponse.json();

                const filter = MPdata.filter(
                    (data) => data.line_id === +productionLineMenu
                );

                const staticData = cards.filter(
                    (data) => data.line_id === productionLineMenu
                );

                if (filter.length > 0) {
                    // Assuming downtime is a property in the filter[0] object
                    const downtimeInMinutes = Math.round(filter[0].downtime / 60);
                    filter[0].downtime = downtimeInMinutes; // Update the downtime with the rounded value
                }

                setStaticCards(staticData[0]);
                setTopCards(filter[0]);
                setFilteredChartData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setFilteredChartData([]);
            }
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "Running":
                return {
                    background: "#9befae",
                    borderColor: "#29c64d",
                    color: "#218337",
                };
            case "Running Slow":
                return {
                    background: "#fbffa7",
                    borderColor: "#d5b023",
                    color: "#a08108",
                };
            case "Scheduled Down":
                return {
                    background: "#c3ebff",
                    borderColor: "#005682",
                    color: "#005682",
                };
            case "Just Went Down":
                return {
                    background: "#ffecdd",
                    borderColor: "#fd7e14",
                    color: "#fa7200",
                };
            case "Down":
                return {
                    background: "#ffd1d6",
                    borderColor: "#f10017",
                    color: "#ff0018",
                };
            case "No Data":
                return {
                    background: "#ececec",
                    borderColor: "#6c757d",
                    color: "#6c757d",
                };
            case "Not Scheduled":
                return {
                    background: "#f1f1f1",
                    borderColor: "#9f9f9f",
                    color: "#9f9f9f",
                };
            case "Tool Change":
                return {
                    background: "#007bff",
                    borderColor: "#007bff",
                    color: "white",
                };
            case "Andon is Active":
                return {
                    background: "#e83e8c",
                    borderColor: "#e83e8c",
                    color: "white",
                };
            default:
                return {
                    background: "transparent",
                    borderColor: "#ced4da",
                    color: "black",
                };
        }
    };

    const lineStatus =
        devices.find((line) => line.id.toString() === productionLineMenu)
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
                                    src="./production.png"
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
                                    src="./production-rate.png"
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
                                    src="./efficiency.png"
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
                                    src="./down-time.png"
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
                                    src="./calendar.png"
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
                                data={devices.map((device) => ({
                                    value: device.id.toString(),
                                    label: device.name,
                                }))}
                                value={productionLineMenu}
                                onChange={setProductionLineMenu}
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
                            {devices.length > 0 && (
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
