import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Brush,
    PieChart, 
    Pie, 
    Cell,
    Legend,
    Bar,
    BarChart,
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


const BD = [
    {
      name: 'Availability',
      val: 65,

    },
    {
      name: 'Efficiency',
      val: 100,

    },
    {
      name: 'Quality',
      val: 70,

    },
  ];
  
  export const BarGraph = () => {
  
      return (
        <>
        <ResponsiveContainer width={350} height={350} className="chart">
          <BarChart
            width={400}
            height={200}
            data={BD}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis 
            label={{
              offset: -20,
            }}
            />
            <Tooltip />
            <Bar dataKey="val" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </>
      );
  }

  const PD = [
    { name: 'Active', value: 140 },
    { name: 'Down', value: 10 },
  ];

  const COLORS = [ '#0088FE', '#FF8042'];
  
  export  const PieGraph = () => {
  
      return (
        <ResponsiveContainer width={400} height={400} className="chart">
          <PieChart width={400} height={400}>
            <Pie
              data={PD}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {PD.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
  }
  