import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Card, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
interface LabelProps {
  cx: number;
  cy: number;
}

const MonthlyTargetChart = () => {
  const isMediumScreen = useMediaQuery('(max-width: 1450px)');
  const data = [
    { name: "Progress", value: 85, fill: "#53CCFF" },
    { name: "Remaining", value: 15, fill: "#E0E0E0" },
  ];

  const renderCustomLabel = ({ cx, cy }: LabelProps) => {
    return (
      <>
        <text
          x={cx}
          y={cy - 35}
          fill="#333"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: isMediumScreen ? "18px" : "24px", fontWeight: "bold" }}
        >
          85%
        </text>
        <text
          x={cx}
          y={cy-5}
          fill="#666"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: isMediumScreen ? "8px" : "14px", fontWeight: "normal" }}
        >
          +8.02% from last month
        </text>
      </>
    );
  };

  return (
    <Card style={{ backgroundColor: "#F9F9F9", height: '100%', borderRadius: '10px' }}>
      <Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold', padding: 5, margin: 0 }}>Monthly Target</Text>
        <Text c="dimmed" p="5">...</Text>
      </Group>

      <div style={{ width: "100%", height: 285, marginTop: '5px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="100%"
              startAngle={180}
              endAngle={0}
              label={renderCustomLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MonthlyTargetChart;