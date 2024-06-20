import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../utils";

const Chart = (data) => {
    return (
        <>
            <ResponsiveContainer width="100%" height={400} className="chart">
                <LineChart
                    data={data.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatDate} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pressure"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="voltage" stroke="#82ca9d" />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#ff7300"
                    />
                    <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Chart;
