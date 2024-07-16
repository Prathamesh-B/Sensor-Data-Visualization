import { useEffect, useState } from "react";
import { Container, Grid, Button, Text, Card, Modal } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { formatDate } from "../../utils";
import "./Report.css";

const Report = () => {
    const [notes, setNotes] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/alerts/");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const openModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filteredNotes = notes.filter((note) => note.incident_dtls);

    return (
        <Container>
            <Grid gutter="lg" mb="lg" mt={"13px"}>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="Start Date"
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="End Date"
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={4} mt={"auto"}>
                    <Button>Fetch</Button>
                </Grid.Col>
                {filteredNotes.map((note) => (
                    <Grid.Col span={{ base: 6, md: 3 }} key={note.id}>
                        <Card
                            shadow="sm"
                            p="lg"
                            mb="lg"
                            onClick={() => openModal(note)}
                            style={{ cursor: "pointer" }}
                        >
                            <Text lineClamp={1} fw={500}>
                                {note.name}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {formatDate(note.timestamp)}
                            </Text>
                            <Text lineClamp={2} mt="sm" truncate="end">
                                {note.incident_dtls}
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
            <Modal
                title={selectedReport ? selectedReport.name : ""}
                opened={isModalOpen}
                onClose={closeModal}
            >
                {selectedReport && (
                    <>
                        <Text>{formatDate(selectedReport.timestamp)}</Text>
                        <Text>{selectedReport.incident_dtls}</Text>
                    </>
                )}
            </Modal>
        </Container>
    );
};

export default Report;
