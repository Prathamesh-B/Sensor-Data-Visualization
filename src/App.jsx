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
import { NotepadText } from "lucide-react";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routerConfig";
import { notes } from "./data";

function App() {
    const [opened, { toggle }] = useDisclosure();
    const [drawerOpened, { open, close }] = useDisclosure(false);

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
                            <NotepadText
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
                title="Supervisor Notes"
                padding="md"
                size="lg"
                position="right"
            >
                <ScrollArea style={{ height: "80vh" }}>
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            style={{
                                paddingTop: "1rem",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                            }}
                        >
                            <Text size="lg" weight={700}>
                                {note.title}
                            </Text>
                            <Text size="xs" color="dimmed">
                                {new Date(
                                    note.timestamp
                                ).toLocaleString()}{" "}
                            </Text>
                            <Text size="sm">{note.description}</Text>
                            <Divider my="md" />
                        </div>
                    ))}
                </ScrollArea>
            </Drawer>
        </>
    );
}

export default App;
