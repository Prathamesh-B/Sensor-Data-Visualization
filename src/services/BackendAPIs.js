import { getDateRange } from "../utils/Dates";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

export const fetchTagTypes = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/tag-types/`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching production line details:", error);
        return [];
    }
};

export const fetchMachines = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/machines/`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching production line details:", error);
        return [];
    }
};

export const fetchDevicesAndTags = async (setLines, setMachines) => {
    try {
        const linesResponse = await fetch('http://127.0.0.1:8000/api/lines/');
        const lines = await linesResponse.json();
        setLines(lines);

        const machinesResponse = await fetch('http://127.0.0.1:8000/api/machines/');
        const machines = await machinesResponse.json();
        setMachines(machines);
    } catch (error) {
        console.error('Error fetching devices and tags:', error);
    }
};

export const fetchSensorTags = async (machineId, setSensorTags) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/sensortags/?machine=${machineId}`);
        const tags = await response.json();
        setSensorTags(tags.map(tag => ({ ...tag, simulated_value: tag.nominal_val })));
    } catch (error) {
        console.error('Error fetching sensor tags:', error);
    }
};

export const updateSensorTag = async (tagId, data) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/sensortags/${tagId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update sensor tag');
        }
    } catch (error) {
        console.error('Error updating sensor tag:', error);
    }
};

export const sendDaqLogs = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/daqlogs/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending DAQ logs:", error);
        return null;
    }
};