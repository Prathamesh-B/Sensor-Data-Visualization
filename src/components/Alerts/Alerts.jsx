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
    const [user, setUser] = useState({});
    const [CatData, setCatData] = useState("");
    const [SubData, setSubData] = useState([]);

    const fetchDevicesAndTags = async () => {
        try {
            setLoading(true);
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
        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            setUser(token);
        }
        console.log(user);
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
            case "Info":
                return "#05cf2d";
            case "Warning":
                return "#ffa618";
            case "Error":
                return "#ff0026";
            default:
                return "#000000";
        }
    };

    const getIconByType = (type) => {
        switch (type) {
            case "Info":
                return <Info size={16} />;
            case "Warning":
                return <AlertTriangle size={16} />;
            case "Error":
                return <AlertOctagon size={16} />;
            default:
                return null;
        }
    };

    const getSubByCat = (CatData) => {
        switch (CatData) {
            case "Breakdown":
                return [
                    "Equipment",
                    "Tool",
                    "Fixture",
                    "Automation",
                    "Overheat"
                ];
            case "Unavailability of Resources":
                return [
                    "Raw Material Unavailable",
                    "Manpower Unavailable",
                    "Forklift Unavailable",
                    "Logistic Pallet Unavailable",
                ];
            case "Changeover Losses":
                return [
                    "Line Change (Planned)",
                    "Line Change (Unplanned)",
                    "Coil Change",
                ];
            case "Speed Losses":
                return [
                    "Automation",
                    "Equipment",
                    "Tool",
                ];
            default:
                return [];
        }
    };

    const handleCategoryChange = (value) => {
        setCatData(value);
        setSubData(getSubByCat(value));
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const incidentDate = new Date(formData.get("incident_date")).toISOString().split('T')[0];
        const resolveDate = new Date(formData.get("resolve_date")).toISOString().split('T')[0];
    
        const data = {
            name: selectedEvent.name,
            type: selectedEvent.type,
            date: incidentDate,
            time: formData.get("incident_time"),
            report_title: formData.get("report_title"),
            severity: formData.get("severity"),
            report_type: formData.get("report_type"),
            location: formData.get("location"),
            report_category: formData.get("category"),
            report_sub_cat: formData.get("sub_category"),
            incident_dtls: formData.get("incident_details"),
            resolve_date: resolveDate,
            issued: formData.get("reported_by"),
            role: formData.get("role"),
            comment: formData.get("comment"),
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/alerts/${selectedEvent.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const result = await response.json();
            console.log("Data posted successfully:", result);
            await fetchDevicesAndTags();
            close();
        } catch (error) {
            console.error("Error posting data:", error);
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
                {selectedEvent && (
                    <form onSubmit={handleSubmit}>
                        <Grid>
                            <Grid.Col span={6}>
                                <DatePickerInput
                                    name="incident_date"
                                    placeholder="Enter Date"
                                    label="Date of the Incident"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TimeInput
                                    name="incident_time"
                                    label="Time of the Incident"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    name="report_title"
                                    placeholder="Enter Title"
                                    label="Title"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    name="severity"
                                    label="Severity of Report"
                                    placeholder="Select the severity"
                                    data={["Minor", "Major", "Critical"]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    name="report_type"
                                    label="Type of Report"
                                    placeholder="Pick a Type"
                                    data={[
                                        "Initial",
                                        "Follow-up",
                                        "Final",
                                    ]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    name="location"
                                    label="Location of the Incident"
                                    placeholder="Pick a location"
                                    data={["Floor A", "Floor B", "Floor C"]}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    name="category"
                                    label="Category of the Incident"
                                    placeholder="Pick a category"
                                    data={[
                                        "Breakdown",
                                        "Unavailability of Resources",
                                        "Changeover Losses",
                                        "Breakage",
                                    ]}
                                    onChange={handleCategoryChange}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    name="sub_category"
                                    label="Sub-Category of the Incident"
                                    placeholder="Pick a sub-category"
                                    data={SubData}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Textarea
                                    name="incident_details"
                                    placeholder="Enter the details of the Incident"
                                    label="Details of the Incident"
                                    autosize
                                    required
                                    minRows={5}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <DatePickerInput
                                    name="resolve_date"
                                    placeholder="Enter Date"
                                    label="Date of Incident being Resolved"
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    name="reported_by"
                                    placeholder="Enter Name"
                                    label="Reported by:"
                                    defaultValue={user.username}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Select
                                    name="role"
                                    label="Role of the Reporter"
                                    placeholder="Pick a role"
                                    data={[
                                        "Supervisior",
                                        "Production Manager",
                                        "Machine Operator",
                                    ]}
                                    defaultValue={user.role}
                                    required
                                />
                            </Grid.Col>
                            <Grid.Col>
                                <Textarea
                                    name="comment"
                                    placeholder="Write comment"
                                    label="Comment"
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
                        <Card
                            shadow="sm"
                            p="sm"
                            mb="sm"
                            key={event.id}
                            style={{
                                padding: "1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                                borderLeft: isEventIncomplete(event)
                                    ? "5px solid #228be8"
                                    : "none",
                                cursor: isEventIncomplete(event)
                                    ? "pointer"
                                    : "default",
                            }}
                            onClick={() => openModal(event)}
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
                        </Card>
                    ))}
                </>
            )}
        </>
    );
};

export default Notes;
