const formatISODate = (date, time) => {
    return date.toISOString().split("T")[0] + time;
};

export const getDateRange = (rangeMenu, customDateRange) => {
    const now = new Date();
    let startDate, endDate;

    switch (rangeMenu) {
        case "Today":
            startDate = formatISODate(now, "T00:00:00Z");
            endDate = formatISODate(now, "T23:59:59Z");
            break;
        case "Yesterday":
            var yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            startDate = formatISODate(yesterday, "T00:00:00Z");
            endDate = formatISODate(yesterday, "T23:59:59Z");
            break;
        case "Last 7 Days":
            var lastWeek = new Date(now);
            lastWeek.setDate(lastWeek.getDate() - 6);
            startDate = formatISODate(lastWeek, "T00:00:00Z");
            endDate = formatISODate(now, "T23:59:59Z");
            break;
        case "Custom":
            if (customDateRange.start && customDateRange.end) {
                startDate = formatISODate(customDateRange.start, "T00:00:00Z");
                endDate = formatISODate(customDateRange.end, "T23:59:59Z");
            }
            break;
        default:
            throw new Error("Invalid range menu option");
    }

    return { startDate, endDate };
};
