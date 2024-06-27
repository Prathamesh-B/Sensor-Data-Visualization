import { Card, Text } from "@mantine/core";
import { notifs } from "../../data";

const Notes = () => {
    const getBackgroundColorByType = (type) => {
        switch (type) {
            case "info":
                return "#e0f7fa";
            case "warning":
                return "#fff3e0";
            case "error":
                return "#ffebee";
            default:
                return "#f5f5f5";
        }
    };
    return (
        <>
            {notifs.map((notif, index) => (
                <Card shadow="sm" p="lg" mb="lg" key={index} style={{
                    backgroundColor: getBackgroundColorByType(
                        notif.type
                    ),
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                }} >
                    
                    <Text fw={500}>{notif.title}</Text>
                    <Text size="sm" c="dimmed">
                        {notif.type}
                    </Text>
                    <Text w={300} mt="sm" truncate="end">
                        {notif.description}
                    </Text>
                </Card>
            ))}
        </>
    );
};

export default Notes;
