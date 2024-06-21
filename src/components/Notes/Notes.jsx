import { Card, Text } from "@mantine/core";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/notes/");
            const json = await response.json();
            if (response.ok) {
                setNotes(json);
            }
        };
        fetchItems();
    }, []);
    return (
        <>
            {notes.map((note, index) => (
                <Card shadow="sm" p="lg" mb="lg" key={index}>
                    <Text fw={500}>{note.title}</Text>
                    <Text size="sm" c="dimmed">
                        {formatDate(note.timestamp)}
                    </Text>
                    <Text w={300} mt="sm" truncate="end">
                        {note.description}
                    </Text>
                </Card>
            ))}
        </>
    );
};

export default Notes;
