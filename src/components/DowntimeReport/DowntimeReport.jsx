import { useState } from "react";
import { Button, Container, Table } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const DowntimeAnalysis = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDownloadPDF = () => {
        const doc = new jsPDF("landscape"); // Set the page to horizontal (landscape) orientation
        doc.text("Downtime Analysis Report", 10, 10);

        // Column headers
        const columns = [
            { title: "PressLine", dataKey: "pressLine" },
            { title: "Breakdown Losses", dataKey: "breakdownLosses" },
            { title: "Changeover Losses", dataKey: "changeoverLosses" },
            {
                title: "Unavailability of Resources",
                dataKey: "unavailabilityResources",
            },
            { title: "Shutdown Losses", dataKey: "shutdownLosses" },
            { title: "Speed Loss", dataKey: "speedLoss" },
            { title: "Pno", dataKey: "pno" },
            { title: "Date", dataKey: "date" },
        ];

        // Data for the table
        const data = [
            [
                "Machine 1",
                "Reason 1",
                "Reason 1",
                "Reason 1",
                "Reason 1",
                "Reason 1",
                "Reason 1",
                "Reason 1",
                "Remark",
            ],
            [
                "Machine 2",
                "Reason 2",
                "Reason 2",
                "Reason 2",
                "Reason 2",
                "Reason 2",
                "Reason 2",
                "Reason 2",
                "",
            ],
            [
                "Machine 3",
                "Reason 3",
                "Reason 3",
                "Reason 3",
                "Reason 3",
                "Reason 3",
                "Reason 3",
                "Reason 3",
                "",
            ],
            [
                "Machine 4",
                "Reason 4",
                "Reason 4",
                "Reason 4",
                "Reason 4",
                "Reason 4",
                "Reason 4",
                "Reason 4",
                "",
            ],
            [
                "Machine 5",
                "Reason 5",
                "Reason 5",
                "Reason 5",
                "Reason 5",
                "Reason 5",
                "Reason 5",
                "Reason 5",
                "",
            ],
            // Empty rows for 3-5 rows
            Array(9).fill(""),
            Array(9).fill(""),
            Array(9).fill(""),
        ];

        // Generating the table
        doc.autoTable({
            head: [columns.map((col) => col.title)],
            body: data,
            theme: "grid",
            startY: 15,
            styles: { cellPadding: 3, fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 40 }, // PressLine
                1: { cellWidth: 30 }, // Breakdown Losses
                2: { cellWidth: 30 }, // Changeover Losses
                3: { cellWidth: 50 }, // Unavailability of Resources
                4: { cellWidth: 30 }, // Shutdown Losses
                5: { cellWidth: 30 }, // Speed Loss
                6: { cellWidth: 30 }, // Pno
                7: { cellWidth: 30 }, // Date
            },
        });

        doc.save("downtime_analysis_report.pdf");
    };

    return (
        <Container>
            <Table withBorder>
                <tbody>
                    <tr>
                        <td>Date:</td>
                        <td>
                            <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                                placeholder="Pick a date"
                            />
                        </td>
                        <td>
                            <Button onClick={handleDownloadPDF}>
                                Download Report
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default DowntimeAnalysis;
