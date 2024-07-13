import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Grid,
    Modal,
    Select,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput, TimeInput } from "@mantine/dates";

const Notes = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchDevicesAndTags = async () => {
        try {
            const alertsResponse = await fetch(
                "http://127.0.0.1:8000/api/alerts/"
            );

            if (!alertsResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const alertsData = await alertsResponse.json();

            setEvents(alertsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching alerts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevicesAndTags();
    }, []);

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

    const openModal = (event) => {
        setSelectedEvent(event);
        if (!event.incident_dtls) {
            open();
        }
    };

    const isEventIncomplete = (event) => {
        return !event.incident_dtls;
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size={"55rem"}
                title="Incident Event"
            >
                {selectedEvent && (
                    <form onSubmit={close}>
                        <Grid>
                            <Grid.Col span={6}>
                                <DatePickerInput
                                    placeholder="Enter Date"
                                    label="Date of the Incident"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TimeInput
                                    label="Time of the Incident"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    placeholder="Enter Title"
                                    label="Title"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Severity of Report"
                                    placeholder="Select the severity"
                                    data={["Minor", "Major", "Critical"]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Type of Report"
                                    placeholder="Pick a Type"
                                    data={[
                                        "Initial Report",
                                        "Follow-up Report",
                                        "Final Report",
                                    ]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Category of the Incident"
                                    placeholder="Pick a category"
                                    data={[
                                        "Breakdown",
                                        "Unavailability of Resources",
                                        "Changeover Losses",
                                    ]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Sub-Category of the Incident"
                                    placeholder="Pick a sub-category"
                                    data={[
                                        "Equipment",
                                        "Tool",
                                        "Fixture",
                                        "Automation",
                                    ]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    label="Location of the Incident"
                                    placeholder="Pick a location"
                                    data={["Floor A", "Floor B", "Floor C"]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Textarea
                                    placeholder="Enter the details of the Incident"
                                    label="Details of the Incident"
                                    autosize
                                    required
                                    minRows={5}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <DatePickerInput
                                    placeholder="Enter Date"
                                    label="Date of Incident being Resolved"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    placeholder="Enter Name"
                                    label="Reported by:"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Select
                                    label="Role of the Reporter"
                                    placeholder="Pick a role"
                                    data={[
                                        "Supervisior",
                                        "Production Manager",
                                        "Machine Foreman",
                                    ]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Textarea
                                    placeholder="Write notes"
                                    label="Notes"
                                    autosize
                                    minRows={4}
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Button type="submit" variant="filled">
                                    Save
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                )}
            </Modal>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            style={{
                                padding: "1rem",
                                borderRadius: "4px",
                                marginBottom: "1rem",
                                borderLeft: isEventIncomplete(event)
                                    ? "5px solid #228be8"
                                    : "none",
                                cursor: isEventIncomplete(event)
                                    ? "pointer"
                                    : "default",
                                backgroundColor: "#fff",
                                transition: "background-color 0.2s",
                            }}
                            onClick={() => openModal(event)}
                            onMouseEnter={(e) =>
                                isEventIncomplete(event) &&
                                (e.currentTarget.style.backgroundColor =
                                    "#e9f5ff")
                            }
                            onMouseLeave={(e) =>
                                isEventIncomplete(event) &&
                                (e.currentTarget.style.backgroundColor = "#fff")
                            }
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
                                    <Text
                                        fw={500}
                                        style={{
                                            color: getBackgroundColorByType(
                                                event.type
                                            ),
                                            marginLeft: "0.5rem",
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        {event.name}
                                    </Text>
                                </div>
                                <Text size="sm" c="gray">
                                    {formatTime(event.timestamp)}
                                </Text>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Notes;
