import { Group, AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routerConfig";
import Login from "./components/Login/Login";
import { useAuth } from "./context/AuthContext";

function App() {
    const [opened, { toggle }] = useDisclosure();
    const { isAuthenticated } = useAuth();

    return (
        <>
            {!isAuthenticated ? (
                <Login />
            ) : (
                <AppShell
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
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar p="sm">
                        <Navbar />
                    </AppShell.Navbar>
                    <AppShell.Main className="main">
                        <AppRoutes />
                    </AppShell.Main>
                </AppShell>
            )}
        </>
    );
}

export default App;
