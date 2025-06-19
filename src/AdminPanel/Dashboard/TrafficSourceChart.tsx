import { Card, Group, Text } from "@mantine/core";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function TrafficSourceChart() {
    const data = [
    { value: 100 },
    { value: 90 },
    { value: 60 },
    { value: 40 },
    { value: 30 },
  ];

  const colors = ["#B3E9FF", "#D7F4FF", "#A0E1FB", "#53CCFF", "#2DC3FF"];

  return (
    <Card style={{ backgroundColor: "#F9F9F9", borderRadius: '10px', height: '100%' }}>
          <Group justify="space-between" mb={30}>
            <Text size="md" c="black" style={{ fontWeight: 600, padding: "10px 30px" }}>
              Top Categories
            </Text>
          </Group>
          <div style={{ height: 130 }}>
              <Card
                radius="md"
                withBorder
                style={{ backgroundColor: "#F9F9F9", padding: 20, height: 100 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 10, bottom: 10, left: 0, right: 0 }}>
                    <Bar
                      dataKey="value"
                      barSize={20}
                      radius={[10, 10, 10, 10]}
                    >
                      <Cell fill={colors[0]} />
                      <Cell fill={colors[1]} />
                      <Cell fill={colors[2]} />
                      <Cell fill={colors[3]} />
                      <Cell fill={colors[4]} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Group mt={20} justify="center" gap={30} style={{ padding: '0px 30px' }}>
              <Group gap="xs" style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <Group style={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '30%', backgroundColor: '#53CCFF' }} />
                  <Text size="sm" c="#666">Lottery</Text>
                </Group>
                <Group>
                  <Text size="sm" c="#666">$2342</Text>
                </Group>
              </Group>
              <Group gap="xs" style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <Group style={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '30%', backgroundColor: '#53CCFF' }} />
                  <Text size="sm" c="#666">Ecommerce</Text>
                </Group>
                <Group>
                  <Text size="sm" c="#666">$2342</Text>
                </Group>
              </Group>
              <Group gap="xs" style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <Group style={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '30%', backgroundColor: '#A6E2FB' }} />
                  <Text size="sm" c="#666">Deals</Text>
                </Group>
                <Group>
                  <Text size="sm" c="#666">$2342</Text>
                </Group>
              </Group>
              <Group gap="xs" style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                <Group style={{ display: "flex", alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '30%', backgroundColor: '#C8EFFF' }} />
                  <Text size="sm" c="#666">Discount Offers</Text>
                </Group>
                <Group>
                  <Text size="sm" c="#666">$2342</Text>
                </Group>
              </Group>
            </Group>
        </Card>
  );
}
