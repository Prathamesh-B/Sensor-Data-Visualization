import { cards } from "../data";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const formatISODate = (date, time) => {
    return date.toISOString().split("T")[0] + time;
};

export const fetchData = async (setStaticCards, setTopCards, setFilteredChartData, customDateRange, productionLineMenu, tagMenu, rangeMenu) => {
    if (productionLineMenu && tagMenu) {
        try {
            let startDate = new Date().toISOString();
            let endDate = new Date().toISOString();

            switch (rangeMenu) {
                case "Today":
                    startDate = formatISODate(new Date(), "T00:00:00Z");
                    endDate = formatISODate(new Date(), "T23:59:59Z");
                    break;
                case "Yesterday":
                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    startDate = formatISODate(yesterday, "T00:00:00Z");
                    endDate = formatISODate(yesterday, "T23:59:59Z");
                    break;
                case "Last 7 Days":
                    var lastWeek = new Date();
                    lastWeek.setDate(lastWeek.getDate() - 6);
                    startDate = formatISODate(lastWeek, "T00:00:00Z");
                    endDate = formatISODate(new Date(), "T23:59:59Z");
                    break;
                case "Custom":
                    if (customDateRange.start && customDateRange.end) {
                        startDate = formatISODate(customDateRange.start, "T00:00:00Z");
                        endDate = formatISODate(customDateRange.end, "T23:59:59Z");
                    }
                    console.log(startDate, endDate);
                    break;
                default:
                    break;
            }

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/daqlogs/?LineId=${productionLineMenu}&TagId=${tagMenu}&StartDate=${startDate}&EndDate=${endDate}`
            );

            const MPresponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/machine-performance/?StartDate=${startDate}&EndDate=${endDate}`
            );

            if (!response.ok || !MPresponse.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const MPdata = await MPresponse.json();

            const filter = MPdata.filter(
                (data) => data.line_id === +productionLineMenu
            );

            const staticData = cards.filter(
                (data) => data.line_id === productionLineMenu
            );

            if (filter.length > 0) {
                const downtimeInMinutes = Math.round(filter[0].downtime);
                filter[0].downtime = downtimeInMinutes; // Update the downtime with the rounded value
            }

            setStaticCards(staticData[0]);
            setTopCards(filter[0]);
            setFilteredChartData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setFilteredChartData([]);
        }
    }
};

export const fetchDevicesAndTags = async (setDevices, setMachineMenu ,setDeviceTags) => {
    try {
        const lineResponse = await fetch(`${BACKEND_URL}/api/lines/`);
        const machineResponse = await fetch(`${BACKEND_URL}/api/machines/`);
        const tagResponse = await fetch(`${BACKEND_URL}/api/sensortags/`);

        if (!lineResponse.ok || !tagResponse.ok || !machineResponse.ok) {
            throw new Error("Network response was not ok");
        }

        const linesData = await lineResponse.json();
        const sensorsOpt = await tagResponse.json();
        const machineData = await machineResponse.json();

        setDevices(linesData);
        setDeviceTags(sensorsOpt);
        setMachineMenu(machineData);
    } catch (error) {
        console.error("Error fetching devices or tags:", error);
    }
};
