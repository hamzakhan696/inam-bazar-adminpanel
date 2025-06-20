import { Card, Group, Text, Button } from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export default function ConversionRateChart() {
  const data = [
    { label: "Product Views", value: 25000 },
    { label: "Add to Cart", value: 12000 },
    { label: "Proceed to Checkout", value: 8500 },
    { label: "Completed Purchases", value: 6200 },
    { label: "Abandoned Carts", value: 3000 },
  ];

  return (
    <Card style={{ padding: 20, backgroundColor: "#F9F9F9", height: '100%', borderRadius: '10px' }}>
      <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold', padding: 5, margin: 0 }}>Conversion Rate</Text>
        <Button style={{ color: 'white', backgroundColor: '#53CCFF', padding: '5px 10px', borderRadius: '10px', border: 'none'}}>
          This Week
        </Button>
      </Group>

      <div style={{ width: "100%", height: 310, marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={0} />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Bar dataKey="value" barSize={150} radius={[10, 10, 0, 0]}>
              <Cell fill="#B3E9FF" />
              <Cell fill="#B3E9FF" />
              <Cell fill="#A0E1FB" />
              <Cell fill="#6CD5FF" />
              <Cell fill="#46C4FF" />
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value: number) => value.toLocaleString()}
                style={{ fill: "#000", fontWeight: 600, fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
