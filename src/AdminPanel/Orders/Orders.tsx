import { Group, Box, Paper, Tabs, FloatingIndicator, Grid, Text, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect } from "react";
import axios from "axios";
import classes from '../TabCSS/products.module.css';
import { IconHome } from "@tabler/icons-react";
import { ProductOrders } from "./ProductOrders";
import { LotteryOrders } from "./LotteryOrders";

interface OrderItem {
  id: number;
  orderId: number;
  productId?: number;
  lotteryId?: number;
  quantity: number;
  price: string;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  district: string | null;
  isEmailSubscribed: boolean;
  isSmsSubscribed: boolean;
}

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customer: Customer;
  status: string;
  orderType: 'product' | 'lottery';
  paymentMethod: string;
  paymentStatus: string;
  totalPayment: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const Orders = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(max-width: 1440px)');
  const containerMargin = isExtraSmallScreen 
    ? '5px' 
    : isSmallScreen 
      ? '10px' 
      : isMediumScreen 
        ? '15px' 
        : isLargeScreen 
          ? '20px' 
          : '30px';

  const containerWidth = `calc(100vw - ${containerMargin} * 2)`;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const productOrders = orders.filter(order => order.orderType === 'product');
  const lotteryOrders = orders.filter(order => order.orderType === 'lottery');

  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  const returnedItems = orders.filter(order => order.status === 'returned').reduce((sum, order) => sum + order.items.length, 0);
  const deliveredItems = orders.filter(order => order.status === 'delivered').reduce((sum, order) => sum + order.items.length, 0);

  if (loading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="lg" />
      </Box>
    );
  }

  return (
    <Box
      style={{
        marginLeft: containerMargin,
        marginRight: containerMargin,
        maxWidth: containerWidth,
        boxSizing: 'border-box',
        paddingBottom: '20px',
      }}
    >
      <Group justify="space-between" wrap="wrap" gap="sm" style={{ marginBottom: '0px' }}>
        <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '24px' : '35px' 
        }}>
          Orders
        </h1>
        <TopBar />
      </Group>

      <Grid>
        <Grid.Col span={isExtraSmallScreen ? 12 : isSmallScreen ? 6 : 3}>
          <Group
            style={{
              backgroundColor: "white",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: '0px 0px 10px rgb(198, 194, 194)'
            }}
          >
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Total Order
              </Text>
              <span style={{ 
                backgroundColor: '#53CCFF', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconHome size={isExtraSmallScreen ? 16 : 20} color="white" />
              </span>
            </Group>
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ 
                fontSize: isExtraSmallScreen ? '18px' : isMediumScreen ? '22px' : '26px', 
                fontWeight: 'bold', 
                padding: 0, 
                margin: 0 
              }}>
                {totalOrders.toLocaleString()}
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                33.3%
              </Text>
            </Group>
          </Group>
        </Grid.Col>

        <Grid.Col span={isExtraSmallScreen ? 12 : isSmallScreen ? 6 : 3}>
          <Group
            style={{
              backgroundColor: "white",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: '0px 0px 10px rgb(198, 194, 194)'
            }}
          >
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Items Ordered
              </Text>
              <span style={{ 
                backgroundColor: '#53CCFF', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconHome size={isExtraSmallScreen ? 16 : 20} color="white" />
              </span>
            </Group>
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ 
                fontSize: isExtraSmallScreen ? '18px' : isMediumScreen ? '22px' : '26px', 
                fontWeight: 'bold', 
                padding: 0, 
                margin: 0 
              }}>
                {totalItems.toLocaleString()}
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                33.3%
              </Text>
            </Group>
          </Group>
        </Grid.Col>

        <Grid.Col span={isExtraSmallScreen ? 12 : isSmallScreen ? 6 : 3}>
          <Group
            style={{
              backgroundColor: "white",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: '0px 0px 10px rgb(198, 194, 194)'
            }}
          >
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Return Items
              </Text>
              <span style={{ 
                backgroundColor: '#53CCFF', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconHome size={isExtraSmallScreen ? 16 : 20} color="white" />
              </span>
            </Group>
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ 
                fontSize: isExtraSmallScreen ? '18px' : isMediumScreen ? '22px' : '26px', 
                fontWeight: 'bold', 
                padding: 0, 
                margin: 0 
              }}>
                {returnedItems.toLocaleString()}
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                33.3%
              </Text>
            </Group>
          </Group>
        </Grid.Col>

        <Grid.Col span={isExtraSmallScreen ? 12 : isSmallScreen ? 6 : 3}>
          <Group
            style={{
              backgroundColor: "white",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: '0px 0px 10px rgb(198, 194, 194)'
            }}
          >
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Delivered items
              </Text>
              <span style={{ 
                backgroundColor: '#53CCFF', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconHome size={isExtraSmallScreen ? 16 : 20} color="white" />
              </span>
            </Group>
            <Group
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ 
                fontSize: isExtraSmallScreen ? '18px' : isMediumScreen ? '22px' : '26px', 
                fontWeight: 'bold', 
                padding: 0, 
                margin: 0 
              }}>
                {deliveredItems.toLocaleString()}
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                33.3%
              </Text>
            </Group>
          </Group>
        </Grid.Col>
      </Grid>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>
        <Tabs value={value} onChange={setValue} variant="none">
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
              Products
            </Tabs.Tab>
            <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
              Lottery
            </Tabs.Tab>
            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="1" pt="xs">
            <ProductOrders orders={productOrders} />
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <LotteryOrders orders={lotteryOrders} />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
};