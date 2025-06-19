import { useMediaQuery } from "@mantine/hooks";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const RevenueAnalyticsChart = () => {
    const isMediumScreen = useMediaQuery('(max-width: 1300px)');
  const data = [
    { date: "12 Aug", revenue: 8000, order: 6000 },
    { date: "13 Aug", revenue: 10000, order: 7000 },
    { date: "14 Aug", revenue: 12000, order: 9000 },
    { date: "15 Aug", revenue: 11000, order: 8000 },
    { date: "16 Aug", revenue: 14521, order: 10000 },
    { date: "17 Aug", revenue: 13000, order: 9500 },
    { date: "18 Aug", revenue: 9000, order: 7000 },
    { date: "19 Aug", revenue: 8500, order: 6500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={isMediumScreen ? 500 : 300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#53CCFF" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="order" stroke="#A6E2FB" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueAnalyticsChart;