import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Brush,
} from "recharts";
import { formatDate } from "../../utils";

const Chart = ({ data }) => {
    return (
        <>
            <ResponsiveContainer width="100%" height={400} className="chart">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 30,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatDate}
                        label={{
                            value: "Time",
                            position: "insideBottom",
                            offset: -20,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "value",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip labelFormatter={formatDate} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Brush
                        dataKey="timestamp"
                        height={20}
                        stroke="#8884d8"
                        tickFormatter={formatDate}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Chart;
