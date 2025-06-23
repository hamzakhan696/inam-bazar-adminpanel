import { Card, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function TopCategoriesChart() {
  const isMediumScreen = useMediaQuery('(max-width: 1300px)');
  return (
    <Card style={{ backgroundColor: "#F9F9F9", borderRadius: '10px', height: '100%' }}>
          <Group justify="space-between" mb={30}>
            <Text size="md" c="black" style={{ padding: "10px 30px", fontSize: '20px', fontWeight: 'bold', }}>
              Top Categories
            </Text>
          </Group>
          {/* Rest of your PieChart code remains unchanged */}
          <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Lottery", value: 35 },
                      { name: "Ecommerce", value: 25 },
                      { name: "Deals", value: 20 },
                      { name: "Discount Offers", value: 20 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    startAngle={0}
                    endAngle={360}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={30}
                    paddingAngle={2}
                  >
                    <Cell fill="#53CCFF" />
                    <Cell fill="#53CCFF" />
                    <Cell fill="#A6E2FB" />
                    <Cell fill="#C8EFFF" />
                  </Pie>
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '32px',
                      fill: "#000",
                      fontWeight: '700'
                    }}
                  >
                    80%
                  </text>
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '14px',
                      fill: "#666",
                      fontWeight: '500'
                    }}
                  >
                    Total Sales
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Group mt={20} gap={30} align="flex-start" style={{ padding: isMediumScreen ? '0px 10px' : '0px 30px' }}>
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
