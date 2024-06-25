import React from 'react'
import { useEffect, useState } from "react";
import { Container, Center, Grid, Button, Text, Table, TextInput, Textarea, Paper } from "@mantine/core";
import dayjs from "dayjs";
import { formatDate } from "../../utils";
import { DateTimePicker } from '@mantine/dates';
const AddNote = () => {

  return (
        <Container>
            <Grid columns={6} grow align="center" gutter="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="Title"
                        placeholder="Enter word to search"
                    />
                </Grid.Col>
                <Grid.Col span={6}>

                    <Textarea
                    label="Description"
                    placeholder="Input placeholder"
                    />

                </Grid.Col>
                <Grid.Col span={6}>
                        <Button>Add Note</Button>
                </Grid.Col>
            </Grid>
            <br></br>
            Earlier Notes:
            <Grid gutter="lg" mb="lg" mt={'13px'}>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="Start Date:"
                        placeholder="Pick start date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DateTimePicker
                        label="End Date:"
                        placeholder="Pick end date and time"
                        mx="auto"
                    />
                </Grid.Col>
                <Grid.Col span={4} mt={'auto'}>
                    <Button>Fetch</Button>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                    >
                        <div>
                            {/* <CircleGauge size={"2.5rem"} strokeWidth={1} /> */}
                            <Text size="lg">
                                Title
                            </Text>
                        </div>
                        <div>
                            <Text size="md" weight={700}>Description</Text>
                        </div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                    >
                        <div>
                            {/* <PlugZap size={"2.5rem"} strokeWidth={1} /> */}
                            <Text size="lg">
                                Title
                            </Text>
                        </div>
                        <div>
                            <Text size="md" weight={500}>Description</Text>
                            
                            {/* <Text size="xl" c="green">
                                {latestData.Voltage} V
                            </Text> */}
                        </div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                    >
                        <div>
                            {/* <Thermometer size={"2.5rem"} strokeWidth={1} /> */}
                            <Text size="lg">
                                Title
                            </Text>
                        </div>
                        <div>
                            <Text size="md" weight={500}>Description</Text>
                            {/* <Text size="xl" c="red">
                                {latestData.Temperature} °C
                            </Text> */}
                        </div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                    >
                        <div>
                        <Text size="lg">
                                Title
                            </Text>
                        </div>
                        <div>
                            <Text size="md" weight={500}>Description</Text>
                            {/* <Text size="xl" c="orange">
                                {latestData.Humidity} %
                            </Text> */}
                        </div>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>

  )
}

export default AddNote
