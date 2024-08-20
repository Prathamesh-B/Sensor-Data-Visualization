export const getStatusStyles = (status) => {
    switch (status) {
        case "Running":
            return {
                background: "#9befae",
                borderColor: "#29c64d",
                color: "#218337",
            };
        case "Running Slow":
            return {
                background: "#fbffa7",
                borderColor: "#d5b023",
                color: "#a08108",
            };
        case "Under Maintenance":
            return {
                background: "#c3ebff",
                borderColor: "#005682",
                color: "#005682",
            };
        case "Scheduled Down":
            return {
                background: "#ffecdd",
                borderColor: "#fd7e14",
                color: "#fa7200",
            };
        case "Down":
            return {
                background: "#ffd1d6",
                borderColor: "#f10017",
                color: "#ff0018",
            };
        case "No Data":
            return {
                background: "#ececec",
                borderColor: "#6c757d",
                color: "#6c757d",
            };
        case "Not Scheduled":
            return {
                background: "#f1f1f1",
                borderColor: "#9f9f9f",
                color: "#9f9f9f",
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