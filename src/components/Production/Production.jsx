import {
    Card,
    Grid,
    Text,
    Table,
    Button,
    Select,
    NumberInput,
} from "@mantine/core";
import "./Production.css";
import { status } from "../../data";

const Production = () => {
    const rows = status.map((Status) => (
        <Table.Tr key={Status.name}>
            <Table.Td>{Status.name}</Table.Td>
            <Table.Td>{Status.status}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Grid grow gutter="lg" mb="lg">
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text weight={500} size="lg" c="blue" fw={700}>
                                640
                            </Text>
                            <Text size="xl" fw={400}>
                                Units produced
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text weight={500} c="yellow" size="lg" fw={700}>
                                800
                            </Text>
                            <Text size="xl" fw={400}>
                                Production Target
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Card
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        className="latest-card"
                    >
                        <div>
                            <Text size="xl" c="lime" fw={700}>
                                80%
                            </Text>
                            <Text weight={500} size="lg" fw={400}>
                                Production Rate
                            </Text>
                        </div>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={8}>
                    <Text weight={500} size="xl">
                        Add Production:
                    </Text>
                    <Grid grow align="center" gutter="md">
                        <Grid.Col>
                            <Select
                                label="Machine"
                                placeholder="Pick value"
                                data={["Machine 1", "Machine 2", "Machine 3"]}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <Select
                                label="Product"
                                placeholder="Pick value"
                                data={[
                                    "Structural Steel Beams",
                                    "Silicone Gels",
                                    "Tool Steel Rods",
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col>
                            <NumberInput label="Enter Quantity" />
                        </Grid.Col>
                        <Grid.Col>
                            <Button>Add</Button>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }} className="notes">
                    <Text p={"sm"} weight={500} size="xl">
                        Machine Status:
                    </Text>
                    <Table.ScrollContainer>
                        <Table verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Production;
