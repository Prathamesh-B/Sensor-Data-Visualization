import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import "./FloorMap.css";

const getStatusStyles = (status) => {
    switch (status) {
        case "Running":
            return {
                background: "#28a745",
                borderColor: "#28a745",
                color: "white",
            };
        case "Running Slow":
            return {
                background: "#ffc107",
                borderColor: "#ffc107",
                color: "white",
            };
        case "Scheduled Down":
            return {
                background: "#005682",
                borderColor: "#005682",
                color: "white",
            };
        case "Just Went Down":
            return {
                background: "#fd7e14",
                borderColor: "#fd7e14",
                color: "white",
            };
        case "Down":
            return {
                background: "#dc3545",
                borderColor: "#dc3545",
                color: "white",
            };
        case "No Data":
            return {
                background: "#6c757d",
                borderColor: "#6c757d",
                color: "white",
            };
        case "Not Scheduled":
            return {
                background: "#adb5bd",
                borderColor: "#adb5bd",
                color: "white",
            };
        case "Tool Change":
            return {
                background: "#007bff",
                borderColor: "#007bff",
                color: "white",
            };
        case "Andon is Active":
            return {
                background: "#e83e8c",
                borderColor: "#e83e8c",
                color: "white",
            };
        default:
            return {
                background: "transparent",
                borderColor: "#ced4da",
                color: "black",
            };
    }
};

const FloorMap = () => {
    const [devices, setDevices] = useState([]);
    const [positions, setPositions] = useState({});

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/productionlines/"
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

    return (
        <div className="floor-map">
            {devices.map((device) => {
                const statusStyles = getStatusStyles(device.status);
                const position = positions[device.id] || {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 100,
                };
                return (
                    <Rnd
                        key={device.id}
                        size={{
                            width: position.width,
                            height: position.height,
                        }}
                        position={{ x: position.x, y: position.y }}
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
    );
};

export default FloorMap;
