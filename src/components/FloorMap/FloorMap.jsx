import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { Select, Button } from "@mantine/core";
import "./FloorMap.css";
import { getStatusStyles } from "./MapStyles";
import EditMap from "./EditMap";
import Legend from "./Legend";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FloorMap = () => {
    const [productionLines, setProductionLines] = useState([]);
    const [selectedLineId, setSelectedLineId] = useState(null);
    const [selectedLine, setSelectedLine] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchProductionLines();
    }, []);

    useEffect(() => {
        if (selectedLineId) {
            const line = productionLines.find(
                (line) => line.id === selectedLineId
            );
            setSelectedLine(line);
        } else {
            setSelectedLine(null);
        }
    }, [selectedLineId, productionLines]);

    const fetchProductionLines = async () => {
        try {
            const response = await fetch(
                `${BACKEND_URL}/api/production-line-details/`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProductionLines(data);
        } catch (error) {
            console.error("Error fetching production lines:", error);
        }
    };

    if (isEditMode) {
        return (
            <EditMap
                lineId={selectedLineId}
                onClose={() => setIsEditMode(false)}
            />
        );
    }

    return (
        <>
            <div className="edit-menu">
                <Select
                    label="Select Production Line"
                    placeholder="Choose a production line"
                    data={productionLines.map((line) => ({
                        value: line.id.toString(),
                        label: line.name,
                    }))}
                    value={selectedLineId ? selectedLineId.toString() : null}
                    onChange={(value) =>
                        setSelectedLineId(value ? parseInt(value) : null)
                    }
                    style={{
                        marginBottom: "10px",
                        marginRight: "10px",
                        display: "inline-block",
                    }}
                />
                <Button
                    onClick={() => setIsEditMode(true)}
                    variant="outline"
                    color="blue"
                    disabled={!selectedLineId}
                >
                    Edit
                </Button>
            </div>
            <div className="floor-map">
                {selectedLine &&
                    selectedLine.machines.map((machine) => {
                        const statusStyles = getStatusStyles(machine.status);
                        return (
                            <Rnd
                                key={machine.id}
                                size={{
                                    width: machine.width_px,
                                    height: machine.height_px,
                                }}
                                position={{
                                    x: machine.x_coordinate,
                                    y: machine.y_coordinate,
                                }}
                                enableResizing={false}
                                disableDragging={true}
                                bounds="parent"
                                style={{
                                    backgroundColor: statusStyles.background,
                                    borderRadius: "0.25rem",
                                    borderColor: statusStyles.borderColor,
                                    color: statusStyles.color,
                                    ...statusStyles,
                                }}
                            >
                                <div className="floor-map-item">
                                    {machine.name} - {machine.status}
                                </div>
                            </Rnd>
                        );
                    })}
                <Legend />
            </div>
        </>
    );
};

export default FloorMap;
