import { Card, Group, Text, Button, Table, Badge, Avatar } from "@mantine/core";

const orders = [
  {
    id: '#10234',
    customer: 'Amaya Weller',
    product: 'Wireless Headphones',
    qty: 2,
    total: '$100',
    status: 'Shipped',
  },
  {
    id: '#10235',
    customer: 'Sebastian Adams',
    product: 'Running Shoes',
    qty: 1,
    total: '$75',
    status: 'Processing',
  },
  {
    id: '#10236',
    customer: 'Suzanne Bright',
    product: 'Smartwatch',
    qty: 1,
    total: '$150',
    status: 'Delivered',
  },
  {
    id: '#10237',
    customer: 'Peter Howl',
    product: 'Coffee Maker',
    qty: 1,
    total: '$60',
    status: 'Pending',
  },
  {
    id: '#10238',
    customer: 'Anita Singh',
    product: 'Bluetooth Speaker',
    qty: 3,
    total: '$90',
    status: 'Shipped',
  },
];

const statusColors: Record<string, string> = {
  Shipped: 'blue',
  Processing: 'gray',
  Delivered: 'green',
  Pending: 'red',
};

export const RecentOrders = () => {
  return (
    <Card style={{ backgroundColor: "#F9F9F9", borderRadius: '10px', height: '100%', padding: 30 }}>
      <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Text fw={600}>Conversion Rate</Text>
        <Button style={{ color: 'black', backgroundColor: '#53CCFF', padding: '2px 25px', borderRadius: '10px', border: 'none'}}>
          All Categories
        </Button>
      </Group>

      <Table highlightOnHover striped verticalSpacing="sm" style={{ overflowX: 'auto', width: '100%', marginTop: '30px' }}>
        <thead style={{ backgroundColor: '#A8E6FF',  }}>
          <tr>
            <th style={{ padding: '12px'}}>No</th>
            <th style={{ padding: '12px'}}>Order ID</th>
            <th style={{ padding: '12px'}}>Customer</th>
            <th style={{ padding: '12px'}}>Product</th>
            <th style={{ padding: '12px'}}>Qty</th>
            <th style={{ padding: '12px'}}>Total</th>
            <th style={{ padding: '12px'}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td style={{ textAlign: 'center'}}>{index + 1}</td>
              <td style={{ textAlign: 'center'}}>{order.id}</td>
              <td style={{ textAlign: 'center'}}>{order.customer}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar size={20} radius="sm" style={{ backgroundColor: '#B3E9FF' }} />
                  <Text size="sm">{order.product}</Text>
                </div>
              </td>
              <td style={{ textAlign: 'center'}}>{order.qty}</td>
              <td style={{ textAlign: 'center'}}>{order.total}</td>
              <td style={{ textAlign: 'center'}}>
                <Badge
                  size="sm"
                  color={statusColors[order.status]}
                  variant={order.status === 'Pending' ? 'light' : 'filled'}
                  radius="xl"
                >
                  {order.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
