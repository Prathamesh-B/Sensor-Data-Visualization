export const getStatusStyles = (status) => {
    switch (status) {
        case "Running":
            return {
                background: "#28a745",
                borderColor: "#28a745",
                color: "white",
            };
        case "Under Maintenance":
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