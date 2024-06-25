import { useState } from "react";
import {
    Group,
    AppShell,
    Burger,
    Drawer,
    Text,
    ScrollArea,
    Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Bell } from "lucide-react";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routerConfig";

function App() {
    const [opened, { toggle }] = useDisclosure();
    const [drawerOpened, { open, close }] = useDisclosure(false);

    const notifications = [
        {
            id: 1,
            type: "Machine",
            title: "New machine added",
            description: "A new machine has been added to the system.",
            timestamp: "2024-06-25T14:48:00.000Z",
            duration: "2 mins",
        },
        {
            id: 2,
            type: "Sensor",
            title: "Sensor alert: Temperature high",
            description: "The temperature sensor has recorded a high value.",
            timestamp: "2024-06-25T14:38:00.000Z",
            duration: "10 mins",
        },
        {
            id: 3,
            type: "Maintenance",
            title: "Maintenance required",
            description: "Routine maintenance is required for Machine A.",
            timestamp: "2024-06-25T13:48:00.000Z",
            duration: "1 hour",
        },
        // Add more notifications as needed
    ];

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "md",
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group
                        h="100%"
                        px="md"
                        align="center"
                        justify="space-between"
                    >
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="md"
                            size="sm"
                        />
                        <div>Logo</div>
                        <div>
                            <Bell
                                strokeWidth={1.5}
                                onClick={open}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <Navbar />
                </AppShell.Navbar>
                <AppShell.Main className="main">
                    <AppRoutes />
                </AppShell.Main>
            </AppShell>

            <Drawer
                opened={drawerOpened}
                onClose={close}
                title="Notifications"
                padding="md"
                size="lg"
                position="right"
            >
                <ScrollArea style={{ height: "80vh" }}>
                    {notifications.map((notification) => (
                        <div key={notification.id}>
                            <Text size="sm" weight={500}>
                                {notification.type}
                            </Text>
                            <Text size="lg" weight={700}>
                                {notification.title}
                            </Text>
                            <Text size="sm">{notification.description}</Text>
                            <Text size="xs" color="dimmed">
                                {new Date(
                                    notification.timestamp
                                ).toLocaleString()}{" "}
                                - Duration: {notification.duration}
                            </Text>
                            <Divider my="sm" />
                        </div>
                    ))}
                </ScrollArea>
            </Drawer>
        </>
    );
}

export default App;
