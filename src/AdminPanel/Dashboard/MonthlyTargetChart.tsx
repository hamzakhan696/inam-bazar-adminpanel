import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

const MonthlyTargetChart = () => {
  const data = [
    { name: "Progress", value: 85, fill: "#53CCFF" },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="100%"
        barSize={10}
        data={data}
      >
        <RadialBar
          background
          dataKey="value"
          cornerRadius={30}
          fill="#53CCFF"
        />
        <Tooltip />
        <Legend
          content={({ payload }) => {
            if (!payload) return null; // Type guard to handle undefined payload
            return (
              <div style={{ textAlign: "center" }}>
                <h3>{payload[0].value}%</h3>
                <p>+8.2% from last month</p>
                <p>Target: $600,000 | Revenue: $510,000</p>
                <p>Great Progress! Let's reach 100% next month</p>
              </div>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTargetChart;