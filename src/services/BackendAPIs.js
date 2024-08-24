import { cards } from "../data";
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

export const fetchChartData = async (setStaticCards, setTopCards, setFilteredChartData, customDateRange, productionLineMenu, machineMenu, tagMenu, rangeMenu) => {
    if (productionLineMenu && machineMenu && tagMenu) {
        try {
            const { startDate, endDate } = getDateRange(rangeMenu, customDateRange);

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/daqlogs/?LineId=${productionLineMenu}&MachineId=${machineMenu}&TagId=${tagMenu}&StartDate=${startDate}&EndDate=${endDate}`
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