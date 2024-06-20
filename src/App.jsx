import { Group } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routerConfig"; // Import your Routes component

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
                    <Group h="100%" px="md">
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="md"
                            size="sm"
                        />
                        <div>Logo</div>
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
