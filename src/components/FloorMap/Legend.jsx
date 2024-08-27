import { useState } from "react";
import { Button } from "@mantine/core";

const Legend = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const legendItems = [
        { status: "Running", color: "#28a745" },
        { status: "Running Slow", color: "#ffc107" },
        { status: "Scheduled Down", color: "#005682" },
        { status: "Just Went Down", color: "#fd7e14" },
        { status: "Down", color: "#dc3545" },
        { status: "No Data", color: "#6c757d" },
        { status: "Not Scheduled", color: "#adb5bd" },
        { status: "Tool Change", color: "#007bff" },
        { status: "Andon is Active", color: "#e83e8c" },
    ];

    return (
        <div className="legend-container">
            <Button onClick={toggleVisibility} className="legend-toggle-button">
                {isVisible ? "Hide Legend" : "Show Legend"}
            </Button>
            {isVisible && (
                <div className="legend">
                    <h3>Legend</h3>
                    {legendItems.map((item, index) => (
                        <div
                            key={index}
                            className="legend-item"
                            style={{
                                backgroundColor: item.color,
                                color: "white",
                            }}
                        >
                            {item.status}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Legend;