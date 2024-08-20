import { useEffect, useState } from "react";
import { Button, FileInput, TextInput, Select } from "@mantine/core";
import { Rnd } from "react-rnd";
import "./FloorMap.css";
import { getStatusStyles } from "./MapFunctions";

const EditMap = () => {
    const [devices, setDevices] = useState([]);
    const [positions, setPositions] = useState({});
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/lines/`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setDevices(data);
            const savedPositions =
                JSON.parse(localStorage.getItem("devicePositions")) || {};
            const initialPositions = {};
            data.forEach((device) => {
                initialPositions[device.id] = savedPositions[device.id] || {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 100,
                };
            });
            setPositions(initialPositions);
        } catch (error) {
            console.error("Error fetching devices:", error);
        }
    };

    const onDragStop = (id, d) => {
        setPositions((prevPositions) => {
            const newPositions = {
                ...prevPositions,
                [id]: {
                    ...prevPositions[id],
                    x: d.x,
                    y: d.y,
                },
            };
            setHasUnsavedChanges(true);
            return newPositions;
        });
    };

    const onResizeStop = (id, ref, position) => {
        setPositions((prevPositions) => {
            const newPositions = {
                ...prevPositions,
                [id]: {
                    ...prevPositions[id],
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                },
            };
            setHasUnsavedChanges(true);
            return newPositions;
        });
    };

    const exportMap = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(positions));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "floor_map_positions.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importMap = (event) => {
        const file = event;
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedPositions = JSON.parse(e.target.result);
            setPositions(importedPositions);
            savePositions(importedPositions);
        };
        reader.readAsText(file);
    };

    const handleDeviceClick = (device, e) => {
        e.stopPropagation();
        setSelectedDevice(device);
    };

    const handleEditChange = (field, value) => {
        setSelectedDevice((prevDevice) => ({
            ...prevDevice,
            [field]: value,
        }));
    };

    const handleSaveEdit = () => {
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === selectedDevice.id ? selectedDevice : device
            )
        );
    };

    const savePositions = () => {
        localStorage.setItem("devicePositions", JSON.stringify(positions));
        handleSaveEdit();
        setHasUnsavedChanges(false);
    };

    const handleMapClick = () => {
        setSelectedDevice(null);
    };

    return (
        <>
            <div className="edit-menu">
                <Button
                    onClick={savePositions}
                    variant="outline"
                    color="green"
                    disabled={!hasUnsavedChanges}
                >
                    Save Changes
                </Button>
                <Button
                    onClick={exportMap}
                    variant="outline"
                    color="blue"
                    style={{ marginRight: "10px" }}
                >
                    Export Map
                </Button>
                <FileInput
                    accept=".json"
                    placeholder="Import Map"
                    onChange={(file) => importMap(file)}
                    style={{ width: "fit-content" }}
                    variant="outline"
                    color="blue"
                />
                {selectedDevice && (
                    <>
                        <TextInput
                            label="Name"
                            value={selectedDevice.name}
                            onChange={(e) =>
                                handleEditChange("name", e.currentTarget.value)
                            }
                            style={{ marginBottom: "10px" }}
                        />
                        <Select
                            label="Status"
                            value={selectedDevice.status}
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
                {devices.map((device) => {
                    const statusStyles = getStatusStyles(device.status);
                    const position = positions[device.id] || {
                        x: 0,
                        y: 0,
                        width: 200,
                        height: 100,
                    };
                    const isSelected =
                        selectedDevice && selectedDevice.id === device.id;
                    return (
                        <Rnd
                            key={device.id}
                            size={{
                                width: position.width,
                                height: position.height,
                            }}
                            position={{ x: position.x, y: position.y }}
                            onDragStop={(e, d) => onDragStop(device.id, d)}
                            onResizeStop={(
                                e,
                                direction,
                                ref,
                                delta,
                                position
                            ) => onResizeStop(device.id, ref, position)}
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
                            onClick={(e) => handleDeviceClick(device, e)}
                        >
                            <div className="floor-map-item">
                                {device.name} - {device.status}
                            </div>
                        </Rnd>
                    );
                })}
                <div className="legend">
                    <h3>Legend</h3>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#28a745", color: "white" }}
                    >
                        Running
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#ffc107", color: "white" }}
                    >
                        Running Slow
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#005682", color: "white" }}
                    >
                        Scheduled Down
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#fd7e14", color: "white" }}
                    >
                        Just Went Down
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#dc3545", color: "white" }}
                    >
                        Down
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#6c757d", color: "white" }}
                    >
                        No Data
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#adb5bd", color: "white" }}
                    >
                        Not Scheduled
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#007bff", color: "white" }}
                    >
                        Tool Change
                    </div>
                    <div
                        className="legend-item"
                        style={{ backgroundColor: "#e83e8c", color: "white" }}
                    >
                        Andon is Active
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditMap;
