import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Container,
    Grid,
    Slider,
    Switch,
    Text,
    Select,
} from "@mantine/core";
import { Gauge } from "lucide-react";
import { phase, current, temp, freq } from "../../data";

const Cp = () => {
    const [productionLineMenu, setProductionLineMenu] = useState("1");
    const [devices, setDevices] = useState([]);
    const [Vry, setVry] = useState(445);
    const [Vyb, setVyb] = useState(445);
    const [Vbr, setVbr] = useState(445);
    const [Temp, setTemp] = useState(49);
    const [Cr, setCr] = useState(330);
    const [Cy, setCy] = useState(330);
    const [Cb, setCb] = useState(330);
    const [Freq, setFreq] = useState(55);
    const [isRandom, setIsRandom] = useState(false);
    const [intervalSeconds, setIntervalSeconds] = useState("30");
    const [countdown, setCountdown] = useState(parseInt(intervalSeconds));

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

    const intervalOptions = [
        { label: "5 sec", value: "5" },
        { label: "15 sec", value: "15" },
        { label: "30 sec", value: "30" },
        { label: "1 min", value: "60" },
        { label: "5 min", value: "300" },
    ];
    const fetchDevicesAndTags = async () => {
        try {
            const lineResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/productionlines/`
            );

            if (!lineResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const linesData = await lineResponse.json();

            setDevices(linesData);
        } catch (error) {
            console.error("Error fetching devices or tags:", error);
        }
    };

    const generateRandomValues = () => {
        setVry(
            Math.floor(Math.random() * (phase[0].max - phase[0].min + 1)) +
                phase[0].min
        );
        setVyb(
            Math.floor(Math.random() * (phase[0].max - phase[0].min + 1)) +
                phase[0].min
        );
        setVbr(
            Math.floor(Math.random() * (phase[0].max - phase[0].min + 1)) +
                phase[0].min
        );
        setTemp(
            Math.floor(
                Math.random() *
                    (temp[temp.length - 1].value - temp[0].value + 1)
            ) + temp[0].value
        );
        setCr(
            Math.floor(
                Math.random() *
                    (current[current.length - 1].value - current[0].value + 1)
            ) + current[0].value
        );
        setCy(
            Math.floor(
                Math.random() *
                    (current[current.length - 1].value - current[0].value + 1)
            ) + current[0].value
        );
        setCb(
            Math.floor(
                Math.random() *
                    (current[current.length - 1].value - current[0].value + 1)
            ) + current[0].value
        );
        setFreq(
            Math.floor(Math.random() * (freq[0].max - freq[0].min + 1)) +
                freq[0].min
        );
    };

    const sendDataToBackend = async (data) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/control-panel-data/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    useEffect(() => {
        generateRandomValues();
    }, []);

    useEffect(() => {
        let interval;
        if (isRandom) {
            interval = setInterval(() => {
                setCountdown((prevCount) => {
                    if (prevCount === 1) {
                        generateRandomValues();
                        const data = { Vry, Vyb, Vbr, Temp, Cr, Cy, Cb, Freq };
                        sendDataToBackend(data);
                        return parseInt(intervalSeconds);
                    }
                    return prevCount - 1;
                });
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRandom, intervalSeconds, Vry, Vyb, Vbr, Temp, Cr, Cy, Cb, Freq]);

    useEffect(() => {
        if (isRandom) {
            setCountdown(parseInt(intervalSeconds));
        }
    }, [intervalSeconds, isRandom]);

    const handleSubmit = () => {
        const data = {
            Vry,
            Vyb,
            Vbr,
            Temp,
            Cr,
            Cy,
            Cb,
            Freq,
        };
        sendDataToBackend(data);
    };

    return (
        <>
            <div>
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    Control Panel
                </h1>
            </div>
            <Container>
                <Grid>
                    <Grid.Col span={4} offset={4}>
                        <Select
                            label="Machine:"
                            allowDeselect={false}
                            placeholder="Pick value"
                            data={devices.map((device) => ({
                                value: device.id.toString(),
                                label: device.name,
                            }))}
                            value={productionLineMenu}
                            onChange={setProductionLineMenu}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter="lg" mb="lg">
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Vry}
                                    onChange={setVry}
                                    min={phase[0].min}
                                    max={phase[0].max}
                                    step={1}
                                    marks={phase.slice(1).map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Vry Phase Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Vyb}
                                    onChange={setVyb}
                                    min={phase[0].min}
                                    max={phase[0].max}
                                    step={1}
                                    marks={phase.slice(1).map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Vyb Phase Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Vbr}
                                    onChange={setVbr}
                                    min={phase[0].min}
                                    max={phase[0].max}
                                    step={1}
                                    marks={phase.slice(1).map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Vbr Phase Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Freq}
                                    onChange={setFreq}
                                    min={freq[0].min}
                                    max={freq[0].max}
                                    step={1}
                                    marks={freq.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Frequency Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Temp}
                                    onChange={setTemp}
                                    min={temp[0].value}
                                    max={temp[temp.length - 1].value}
                                    step={1}
                                    marks={temp.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Temperature Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Cr}
                                    onChange={setCr}
                                    min={current[0].value}
                                    max={current[current.length - 1].value}
                                    step={1}
                                    marks={current.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Current R Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Cy}
                                    onChange={setCy}
                                    min={current[0].value}
                                    max={current[current.length - 1].value}
                                    step={1}
                                    marks={current.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Current Y Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Card shadow="sm" p="lg" radius="lg">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Gauge
                                    style={{ marginRight: "1rem" }}
                                    size={64}
                                    strokeWidth={1}
                                />
                            </div>
                            <div>
                                <Slider
                                    color="blue"
                                    value={Cb}
                                    onChange={setCb}
                                    min={current[0].value}
                                    max={current[current.length - 1].value}
                                    step={1}
                                    marks={current.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    }))}
                                />
                                <br></br>
                                <Text
                                    weight={500}
                                    size="lg"
                                    fw={400}
                                    style={{
                                        display: "flex",
                                        textAlign: "center",
                                    }}
                                >
                                    Current B Slider
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Switch
                            label="Random Mode"
                            checked={isRandom}
                            onChange={(event) =>
                                setIsRandom(event.currentTarget.checked)
                            }
                        />
                        {isRandom && (
                            <>
                                <Select
                                    data={intervalOptions}
                                    value={intervalSeconds}
                                    onChange={(value) => {
                                        setIntervalSeconds(value);
                                        setCountdown(parseInt(value));
                                    }}
                                    placeholder="Select interval"
                                    radius="sm"
                                />
                                <Text size="lg" weight={700} mt="md">
                                    Next request: {countdown} seconds
                                </Text>
                            </>
                        )}
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={generateRandomValues}
                            variant="outline"
                            color="blue"
                            size="xl"
                        >
                            Randomize Once
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button
                            onClick={handleSubmit}
                            variant="filled"
                            color="green"
                            size="xl"
                        >
                            Submit
                        </Button>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
};

export default Cp;
