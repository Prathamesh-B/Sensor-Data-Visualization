import { useState } from "react";
import {
    Container,
    Grid,
    Button,
    Text,
    TextInput,
    Textarea,
    Card,
    Center,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { notesData } from "../../data";
import { formatDate } from "../../utils";
import "./AddNote.css";

const AddNote = () => {
    const [notes, setNotes] = useState(notesData);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [report, setReport] = useState("");
    const [supervisorId, setSupervisorId] = useState("");
    const [machineId, setMachineId] = useState("");
    const [timestamp, setTimestamp] = useState(new Date());

    const handleAddNote = () => {
        const newNote = {
            id: notes.length + 1,
            supervisor_id: supervisorId,
            machine_id: machineId,
            title,
            description,
            report,
            timestamp: timestamp.toISOString(),
        };
        setNotes([...notes, newNote]);
        setTitle("");
        setDescription("");
        setReport("");
        setSupervisorId("");
        setMachineId("");
        setTimestamp(new Date());
    };

    return (
        <Container>
            <Center>
                <Grid grow align="center" gutter="md">
                    <Grid.Col>
                        <TextInput
                            label="Title"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Textarea
                            label="Report"
                            placeholder="Enter report"
                            autosize
                            minRows={6}
                            value={report}
                            onChange={(e) => setReport(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Button onClick={handleAddNote}>Add Note</Button>
                    </Grid.Col>
                </Grid>
            </Center>
            <br></br>
            <div className="earlier-notes">
                <Grid gutter="lg" mb="lg" mt={"13px"}>
                    <Grid.Col span={4}>
                        <DateTimePicker
                            label="Start Date:"
                            placeholder="Pick start date and time"
                            mx="auto"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <DateTimePicker
                            label="End Date:"
                            placeholder="Pick end date and time"
                            mx="auto"
                        />
                    </Grid.Col>
                    <Grid.Col span={4} mt={"auto"}>
                        <Button>Fetch</Button>
                    </Grid.Col>
                    {notes.map((note) => (
                        <Grid.Col span={{ base: 6, md: 3 }} key={note.id}>
                            <Card shadow="sm" p="lg" mb="lg">
                                <Text lineClamp={1} fw={500}>
                                    {note.title}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    {formatDate(note.timestamp)}
                                </Text>
                                <Text lineClamp={2} mt="sm" truncate="end">
                                    {note.report}
                                </Text>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default AddNote;
