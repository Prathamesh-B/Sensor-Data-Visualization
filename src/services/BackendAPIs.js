import { getDateRange } from "../utils/Dates";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Remove this is future
export const fetchDevicesAndTags = async (setDevices, setMachineMenu, setDeviceTags) => {
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

export const fetchProductionLineDetails = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/production-line-details/`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching production line details:", error);
        return [];
    }
};

export const fetchProductionMetrics = async (lineId, startDate, endDate) => {
    try {
        const response = await fetch(
            `${BACKEND_URL}/api/production-metrics/?line_id=${lineId}&start_date=${startDate}&end_date=${endDate}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching production metrics:", error);
        return null;
    }
};

export const fetchChartData = async (setMetrics, setFilteredChartData, customDateRange, productionLineMenu, machineMenu, tagMenu, rangeMenu) => {
    if (productionLineMenu && machineMenu && tagMenu) {
        try {
            const { startDate, endDate } = getDateRange(rangeMenu, customDateRange);

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/daqlogs/?LineId=${productionLineMenu}&MachineId=${machineMenu}&TagId=${tagMenu}&StartDate=${startDate}&EndDate=${endDate}`
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const LineMetrices = await fetchProductionMetrics(productionLineMenu, startDate, endDate);

            const data = await response.json();

            setMetrics(LineMetrices);
            setFilteredChartData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setFilteredChartData([]);
        }
    }
};