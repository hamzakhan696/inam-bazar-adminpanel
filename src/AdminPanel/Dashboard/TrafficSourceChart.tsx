import { Card, Group, Text } from "@mantine/core";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function TrafficSourceChart() {
    const data = [
    { name: 'Cat 1', value: 100 },
    { name: 'Cat 2', value: 100 },
    { name: 'Cat 3', value: 100 },
    { name: 'Cat 4', value: 100 },
  ];

  const colors = ["#B3E9FF", "#D7F4FF", "#A0E1FB", "#53CCFF", "#2DC3FF"];

  return (
    <Card style={{ backgroundColor: "#F9F9F9", borderRadius: '10px', height: '100%' }}>
          <Group justify="space-between" mb={30}>
            <Text size="md" c="black" style={{ fontSize: '20px', fontWeight: 'bold', padding: 5, margin: 0 }}>
              Top Categories
            </Text>
          </Group>
          <div style={{ height: 130 }}>
        <Card
          style={{ backgroundColor: "#F9F9F9", height: 100 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ top: 10, bottom: 10, left: 0, right: 0 }}
              barGap={5} 
            >
              <Bar
                dataKey="value"
                barSize={80} 
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
            <Group mt={20} gap={20} align="flex-start" style={{ padding: '0px 30px' }}>
              <Group gap="xs" align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                <Group align="center" gap="15px">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#53CCFF' }} />
                  <Text size="sm" c="#666">Lottery</Text>
                </Group>
                <Text size="sm" c="#666">$2342</Text>
              </Group>
              <Group gap="xs" align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                <Group align="center" gap="15px">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#53CCFF' }} />
                  <Text size="sm" c="#666">Ecommerce</Text>
                </Group>
                <Text size="sm" c="#666">$2342</Text>
              </Group>
              <Group gap="xs" align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                <Group align="center" gap="15px">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#A6E2FB' }} />
                  <Text size="sm" c="#666">Deals</Text>
                </Group>
                <Text size="sm" c="#666">$2342</Text>
              </Group>
              <Group gap="xs" align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                <Group align="center" gap="15px">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#C8EFFF' }} />
                  <Text size="sm" c="#666">Discount Offers</Text>
                </Group>
                <Text size="sm" c="#666">$2342</Text>
              </Group>
            </Group>
        </Card>
  );
}
