import {
    Button,
    Card,
    Modal,
    Select,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { notifs } from "../../data";
import { Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";

const Notes = () => {
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
    const [opened, { open, close }] = useDisclosure(false);

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
                        label="Casue of the Incident"
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
                    onClick={open}
                >
                    <Text
                        fw={500}
                        style={{ color: getBackgroundColorByType(notif.type) }}
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
                                {getIconByType(notif.type)}
                                <span
                                    style={{
                                        marginLeft: "0.5rem",
                                        marginBottom: "0.2rem",
                                    }}
                                >
                                    {notif.title}
                                </span>
                            </div>
                            <Text size="sm" c="gray">
                                {notif.timestamp}
                            </Text>
                        </div>
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
