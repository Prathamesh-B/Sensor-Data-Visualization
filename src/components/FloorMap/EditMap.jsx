import { useEffect, useState } from "react";
import { Button, Select, TextInput, FileInput } from "@mantine/core";
import { Rnd } from "react-rnd";
import "./FloorMap.css";
import { getStatusStyles } from "./MapStyles";
import Legend from "./Legend";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditMap = () => {
    const [productionLines, setProductionLines] = useState([]);
    const [selectedLineId, setSelectedLineId] = useState(null);
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        fetchProductionLines();
    }, [selectedLineId]);

    useEffect(() => {
        if (selectedLineId) {
            const selectedLine = productionLines.find(
                (line) => line.id === selectedLineId
            );
            if (selectedLine) {
                setMachines(
                    selectedLine.machines.map((machine) => ({ ...machine }))
                );
                setSelectedMachine(null);
            }
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

    const onDragStop = (id, d) => {
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.id === id
                    ? {
                          ...machine,
                          x_coordinate: Math.round(d.x),
                          y_coordinate: Math.round(d.y),
                      }
                    : machine
            )
        );
        setHasUnsavedChanges(true);
    };

    const onResizeStop = (id, ref, position) => {
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.id === id
                    ? {
                          ...machine,
                          width_px: Math.round(parseInt(ref.style.width)),
                          height_px: Math.round(parseInt(ref.style.height)),
                          x_coordinate: Math.round(position.x),
                          y_coordinate: Math.round(position.y),
                      }
                    : machine
            )
        );
        setHasUnsavedChanges(true);
    };

    const handleMachineClick = (machine, e) => {
        e.stopPropagation();
        setSelectedMachine({ ...machine });
    };

    const handleEditChange = (field, value) => {
        setSelectedMachine((prevMachine) => ({
            ...prevMachine,
            [field]: value,
        }));
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.id === selectedMachine.id
                    ? { ...machine, [field]: value }
                    : machine
            )
        );
        setHasUnsavedChanges(true);
    };

    const saveChanges = async () => {
        try {
            const updatePromises = machines.map((machine) =>
                fetch(`${BACKEND_URL}/api/machines/${machine.id}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        line_id: machine.line.id,
                        x_coordinate: machine.x_coordinate,
                        y_coordinate: machine.y_coordinate,
                        width_px: machine.width_px,
                        height_px: machine.height_px,
                        name: machine.name,
                        status: machine.status,
                    }),
                })
            );

            await Promise.all(updatePromises);

            setHasUnsavedChanges(false);
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving machine locations:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    const handleMapClick = () => {
        setSelectedMachine(null);
    };

    const exportMap = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(machines));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute(
            "download",
            `floor_map_line_${selectedLineId}.json`
        );
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importMap = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedMachines = JSON.parse(e.target.result);
                setMachines(importedMachines);
                setHasUnsavedChanges(true);
                alert("Map imported successfully!");
            } catch (error) {
                console.error("Error parsing imported file:", error);
                alert("Failed to import map. Please check the file format.");
            }
        };
        reader.readAsText(file);
    };

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
                    style={{ marginBottom: "10px" }}
                />
                <Button
                    onClick={saveChanges}
                    variant="outline"
                    color="green"
                    disabled={!hasUnsavedChanges}
                    style={{ marginRight: "10px" }}
                >
                    Save Changes
                </Button>
                <Button
                    onClick={exportMap}
                    variant="outline"
                    color="blue"
                    disabled={!selectedLineId}
                    style={{ marginRight: "10px" }}
                >
                    Export Map
                </Button>
                <FileInput
                    placeholder="Import Map"
                    accept=".json"
                    onChange={importMap}
                    style={{ display: "inline-block", width: "auto" }}
                />
                {selectedMachine && (
                    <>
                        <TextInput
                            label="Name"
                            value={selectedMachine.name}
                            onChange={(e) =>
                                handleEditChange("name", e.currentTarget.value)
                            }
                            style={{ marginBottom: "10px" }}
                        />
                        <Select
                            label="Status"
                            value={selectedMachine.status}
                            onChange={(value) =>
                                handleEditChange("status", value)
                            }
                            data={[
                                "Running",
                                "Running Slow",
                                "Scheduled Down",
                                "Just Went Down",
                                "Down",
                                "No Data",
                                "Not Scheduled",
                                "Tool Change",
                                "Andon is Active",
                            ]}
                            style={{ marginBottom: "10px" }}
                        />
                    </>
                )}
            </div>
            <div className="floor-map" onClick={handleMapClick}>
                {machines.map((machine) => {
                    const statusStyles = getStatusStyles(machine.status);
                    const isSelected =
                        selectedMachine && selectedMachine.id === machine.id;
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
                            onDragStop={(e, d) => onDragStop(machine.id, d)}
                            onResizeStop={(
                                e,
                                direction,
                                ref,
                                delta,
                                position
                            ) => onResizeStop(machine.id, ref, position)}
                            bounds="parent"
                            style={{
                                backgroundColor: statusStyles.background,
                                borderRadius: "0.25rem",
                                borderColor: isSelected
                                    ? "#228be8"
                                    : statusStyles.borderColor,
                                color: statusStyles.color,
                                borderWidth: isSelected ? "3px" : "1px",
                                borderStyle: isSelected ? "dashed" : "none",
                                cursor: "pointer",
                            }}
                            onClick={(e) => handleMachineClick(machine, e)}
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

export default EditMap;
