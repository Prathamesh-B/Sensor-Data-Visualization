import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Grid,
    Modal,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [user, setUser] = useState({});
    const [comment, setComment] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [
        createIncidentOpened,
        { open: openCreateIncident, close: closeCreateIncident },
    ] = useDisclosure(false);

    const fetchAlertsAndIncidents = async () => {
        try {
            setLoading(true);
            const alertsResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/alerts/`
            );
            const incidentsResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/incidents/`
            );

            if (!alertsResponse.ok || !incidentsResponse.ok) {
                throw new Error("Network response was not ok");
            }

            const alertsData = await alertsResponse.json();
            const incidentsData = await incidentsResponse.json();
            setAlerts(alertsData);
            setIncidents(incidentsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const fetchTransactions = async (incidentId) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/incident-transactions/?incident=${incidentId}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchAlertsAndIncidents();
        const token = JSON.parse(localStorage.getItem("token"));

        if (token) {
            setUser(token);
        }
    }, []);

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
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

    const openModal = async (alert) => {
        setSelectedAlert(alert);
        const incident = incidents.find((inc) => inc.alert === alert.id);
        if (incident) {
            setSelectedIncident(incident);
            await fetchTransactions(incident.id);
            open();
        } else {
            openCreateIncident();
        }
    };

    const handleCreateIncident = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/incidents/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: `Incident for ${selectedAlert.name}`,
                        date: new Date().toISOString().split("T")[0],
                        open: true,
                        alert: selectedAlert.id,
                        location: selectedAlert.line,
                        line: selectedAlert.line,
                        tag: selectedAlert.tag,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const newIncident = await response.json();
            setSelectedIncident(newIncident);
            await fetchAlertsAndIncidents();
            closeCreateIncident();
            open();
        } catch (error) {
            console.error("Error creating incident:", error);
        }
    };

    const handleToggleIncidentStatus = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/incidents/${
                    selectedIncident.id
                }/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        open: !selectedIncident.open,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await fetchAlertsAndIncidents();
            setSelectedIncident({
                ...selectedIncident,
                open: !selectedIncident.open,
            });
        } catch (error) {
            console.error("Error toggling incident status:", error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/incident-transactions/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        incident: selectedIncident.id,
                        timestamp: new Date().toISOString(),
                        issued_by: user.id,
                        msg: comment,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await fetchTransactions(selectedIncident.id);
            setComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size={"55rem"}
                title="Incident Details"
            >
                {selectedIncident && (
                    <Grid>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Title"
                                value={selectedIncident.title}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Location"
                                value={selectedIncident.location_name}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Line"
                                value={selectedIncident.line_name}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Tag"
                                value={selectedIncident.tag_name}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DatePickerInput
                                label="Date"
                                value={new Date(selectedIncident.date)}
                                readOnly
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Text weight={700}>
                                Status:{" "}
                                {selectedIncident.open ? "Open" : "Closed"}
                            </Text>
                            <Button
                                onClick={handleToggleIncidentStatus}
                                color={selectedIncident.open ? "red" : "green"}
                            >
                                {selectedIncident.open
                                    ? "Close Incident"
                                    : "Reopen Incident"}
                            </Button>
                        </Grid.Col>
                        {selectedIncident.open && (
                            <Grid.Col span={12}>
                                <Text weight={700}>Comments</Text>
                                {transactions.map((transaction, index) => (
                                    <Card
                                        key={index}
                                        shadow="sm"
                                        p="sm"
                                        mb="sm"
                                    >
                                        <Text size="sm">{transaction.msg}</Text>
                                        <Text size="xs" color="gray">
                                            By: {transaction.issued_by_name} at{" "}
                                            {new Date(
                                                transaction.timestamp
                                            ).toLocaleString()}
                                        </Text>
                                    </Card>
                                ))}
                                <Textarea
                                    placeholder="Add a comment"
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(event.currentTarget.value)
                                    }
                                />
                                <Button onClick={handleAddComment} mt="sm">
                                    Add Comment
                                </Button>
                            </Grid.Col>
                        )}
                    </Grid>
                )}
            </Modal>
            <Modal
                opened={createIncidentOpened}
                onClose={closeCreateIncident}
                title="Create Incident"
            >
                <Text m="md">
                    Would you like to create an incident for this alert?
                </Text>
                <Button onClick={handleCreateIncident} mr="sm" color="green">
                    Yes, Create Incident
                </Button>
                <Button onClick={closeCreateIncident} color="red">No, Cancel</Button>
            </Modal>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {alerts.map((alert) => {
                        const incident = incidents.find(
                            (inc) => inc.alert === alert.id
                        );
                        return (
                            <Card
                                shadow="sm"
                                p="sm"
                                mb="sm"
                                key={alert.id}
                                style={{
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    marginBottom: "1rem",
                                    borderLeft:
                                        incident && incident.open
                                            ? "5px solid #228be8"
                                            : "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => openModal(alert)}
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
                                        {getIconByType(alert.type)}
                                        <Text
                                            fw={500}
                                            style={{
                                                color: getBackgroundColorByType(
                                                    alert.type
                                                ),
                                                marginLeft: "0.5rem",
                                                marginBottom: "0.2rem",
                                            }}
                                        >
                                            {alert.name}
                                        </Text>
                                    </div>
                                    <Text size="sm" c="gray">
                                        {formatTime(alert.timestamp)}
                                    </Text>
                                </div>
                            </Card>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default Alerts;
