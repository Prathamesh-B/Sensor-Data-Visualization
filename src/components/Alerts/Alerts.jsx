import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Modal,
    Select,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";

const alertsData = [
    {
        id: 1,
        type: "error",
        title: "Oil Filter Clogged for Destacker Unit",
        description: "",
        timestamp: "2024-07-01T10:00:00Z",
        duration: "",
    },
    {
        id: 1,
        type: "error",
        title: "Part Location Issue",
        description: "",
        timestamp: "2024-07-01T12:00:00Z",
        duration: "",
    },
    {
        id: 1,
        type: "info",
        title: "Destacker Unit Started",
        description: "",
        timestamp: "2024-07-01T13:00:00Z",
        duration: "",
    },
    {
        id: 1,
        type: "warning",
        title: "Double sheet feed",
        description: "",
        timestamp: "2024-07-01T15:00:00Z",
        duration: "",
    },
];

const Notes = () => {
    const [events, setEvents] = useState(alertsData);
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/events/");
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch events");
    //             }
    //             const data = await response.json();
    //             setEvents(data);
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchEvents();
    // }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getBackgroundColorByType = (type) => {
        switch (type) {
            case "info":
                return "#05cf2d";
            case "warning":
                return "#ffa618";
            case "error":
                return "#ff0026";
            default:
                return "#000000";
        }
    };

    const getIconByType = (type) => {
        switch (type) {
            case "info":
                return <Info size={16} />;
            case "warning":
                return <AlertTriangle size={16} />;
            case "error":
                return <AlertOctagon size={16} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size={"55rem"}
                title="Incident Event"
            >
                <form onSubmit={close}>
                    <TextInput placeholder="Enter Title" label="Title" />
                    <br></br>
                    <DateTimePicker
                        placeholder="Pick date and time of the Incident"
                        label="Time of the Incident"
                    />
                    <br></br>
                    <Textarea
                        placeholder="Enter the cause of the Incident"
                        label="Cause of the Incident"
                        autosize
                        minRows={5}
                    />
                    <br></br>
                    <div>
                        <Select
                            label="Category of the incident"
                            placeholder="Pick a category"
                            data={["Breakdown", "Material Shortage"]}
                        />
                        <br></br>
                        <Select
                            label="Sub-Category of the incident"
                            placeholder="Pick a sub-category"
                            data={["Breakdown", "Material Shortage"]}
                        />
                    </div>
                    <br></br>
                    <Button type="submit" variant="filled">
                        Submit
                    </Button>
                </form>
            </Modal>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {events.map((event) => (
                        <Card
                            shadow="sm"
                            p="sm"
                            mb="sm"
                            key={event.id}
                            style={{
                                padding: "1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                            }}
                            onClick={open}
                        >
                            <Text
                                fw={500}
                                style={{
                                    color: getBackgroundColorByType(event.type),
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {getIconByType(event.type)}
                                        <span
                                            style={{
                                                marginLeft: "0.5rem",
                                                marginBottom: "0.2rem",
                                            }}
                                        >
                                            {event.title}
                                        </span>
                                    </div>
                                    <Text size="sm" c="gray">
                                        {formatTime(event.timestamp)}
                                    </Text>
                                </div>
                            </Text>
                            <Text w={300} truncate="end">
                                {event.description}
                            </Text>
                        </Card>
                    ))}
                </>
            )}
        </>
    );
};

export default Notes;
