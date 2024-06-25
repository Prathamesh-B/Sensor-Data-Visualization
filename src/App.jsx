import { Group } from "@mantine/core";
import { AppShell, Burger, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routerConfig"; // Import your Routes component
import { Bell } from "lucide-react";

function App() {
    const [opened, { toggle }] = useDisclosure();
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
                    <Group h="100%" px="md" justify="space-between">
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="md"
                            size="sm"
                        />
                        <div>Logo</div>
                        <div><Bell/></div>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <Navbar />
                </AppShell.Navbar>
                <AppShell.Main className="main">
                    <AppRoutes />
                </AppShell.Main>
            </AppShell>
        </>
    );
}

export default App;
