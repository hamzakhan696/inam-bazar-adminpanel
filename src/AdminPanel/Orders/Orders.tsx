import { Group, Box, Paper, Tabs, Table, FloatingIndicator, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState } from "react";
import classes from '../TabCSS/products.module.css';
import { IconHome } from "@tabler/icons-react";

export const Orders = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
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
                  2,343
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
                  43
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
                  3
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
                  955
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
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Dwayne Johnson</td>
                  <td style={{ padding: '12px' }}>Rs. 1756</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#D4F6E6', padding: '5px 10px', borderRadius: '5px', color: 'green' }}>Fulfilled</span></td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Dwayne Johnson</td>
                  <td style={{ padding: '12px' }}>Rs. 1756</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#D4F6E6', padding: '5px 10px', borderRadius: '5px', color: 'green' }}>Fulfilled</span></td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Dwayne Johnson</td>
                  <td style={{ padding: '12px' }}>Rs. 1756</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#D4F6E6', padding: '5px 10px', borderRadius: '5px', color: 'green' }}>Fulfilled</span></td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
              </tbody>
            </Table>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
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
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Invoice Number</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Date</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Lottery Name</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Customer Email</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Total Order</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Items</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Land Rover 2024</td>
                  <td style={{ padding: '12px' }}>Customer@gmail.com</td>
                  <td style={{ padding: '12px' }}>x2</td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Land Rover 2024</td>
                  <td style={{ padding: '12px' }}>Customer@gmail.com</td>
                  <td style={{ padding: '12px' }}>x2</td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>#2222</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>Land Rover 2024</td>
                  <td style={{ padding: '12px' }}>Customer@gmail.com</td>
                  <td style={{ padding: '12px' }}>x2</td>
                  <td style={{ padding: '12px' }}>06</td>
                </tr>
              </tbody>
            </Table>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
};