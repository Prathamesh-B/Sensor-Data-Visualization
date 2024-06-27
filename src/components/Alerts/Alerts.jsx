import { Card, Text } from "@mantine/core";
import { notifs } from "../../data";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";

const Notes = () => {
    const getBackgroundColorByType = (type) => {
        switch (type) {
            case "info":
                return "#0fa8ee";
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
            {notifs.map((notif, index) => (
                <Card
                    shadow="sm"
                    p="sm"
                    mb="sm"
                    key={index}
                    style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                    }}
                >
                    <Text
                        fw={500}
                        style={{ color: getBackgroundColorByType(notif.type) }}
                    >
                        {getIconByType(notif.type)}
                        <span
                            style={{
                                marginLeft: "0.5rem",
                            }}
                        >
                            {notif.title}
                        </span>
                    </Text>
                    <Text w={300} truncate="end">
                        {notif.description}
                    </Text>
                </Card>
            ))}
        </>
    );
};

export default Notes;
