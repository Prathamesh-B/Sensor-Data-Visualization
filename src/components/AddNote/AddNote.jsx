import React from 'react'
import { useEffect, useState } from "react";
import { Container, Center, Grid, Button, Text, Table, TextInput, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import { formatDate } from "../../utils";
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
            {/* {error && <Text c="red">{error}</Text>}
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Day</Table.Th>
                            <Table.Th>Pressure (hPa)</Table.Th>
                            <Table.Th>Voltage (V)</Table.Th>
                            <Table.Th>Humidity (%)</Table.Th>
                            <Table.Th>Temperature (°C)</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={5}>
                                    No data available
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer> */}
        </Container>

  )
}

export default AddNote
