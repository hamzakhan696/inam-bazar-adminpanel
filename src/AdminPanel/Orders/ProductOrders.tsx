import { Group, Table } from "@mantine/core";

interface OrderItem {
  id: number;
  orderId: number;
  productId?: number;
  quantity: number;
  price: string;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customer: Customer;
  status: string;
  paymentStatus: string;
  totalPayment: string;
  items: OrderItem[];
  createdAt: string;
}

interface ProductOrdersProps {
  orders: Order[];
}

export const ProductOrders = ({ orders }: ProductOrdersProps) => {
  return (
    <>
      <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
        <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>All</span>
        <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Paid</span>
        <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Unpaid</span>
      </Group>
      <div style={{ overflowX: "auto", width: "100%" }}>
        <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Order Number</th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Date</th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Customer</th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Total Payment</th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Status</th>
              <th style={{ padding: '12px', color: '#4C4E6A' }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>{order.orderNumber}</td>
                <td style={{ padding: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px', color: '#FF002E' }}>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                <td style={{ padding: '12px' }}>Rs. {order.totalPayment}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    backgroundColor: order.status === 'fulfilled' ? '#D4F6E6' : '#FFE5E5', 
                    padding: '5px 10px', 
                    borderRadius: '5px', 
                    color: order.status === 'fulfilled' ? 'green' : 'red' 
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};