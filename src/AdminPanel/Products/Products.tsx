import { Group, Box, Button, Paper, Tabs, Table, Avatar, FloatingIndicator } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState } from "react";
import classes from '../TabCSS/products.module.css';
import { AddProduct } from "./AddProduct";
import { AddLottery } from "./AddLottery";

export const Products = () => {
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
          Products
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={() => setValue('3')}
        >
          Add Product
        </Button>
        <Button 
          c="white" 
          style={{ backgroundColor: '#53CCFF'}} 
          onClick={() => setValue('4')}
        >
          Add Lottery
        </Button>
      </Group>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>
        <Tabs value={value} onChange={setValue} variant="none">
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
              All Products
            </Tabs.Tab>
            <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
              All Lottery
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
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Active</span>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Disable</span>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Draft</span>
            </Group>
            <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Product</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Status</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Inventory</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#D4F6E6', padding: '5px 10px', borderRadius: '5px' }}>Active</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#FFE4E4', padding: '5px 10px', borderRadius: '5px' }}>Disable</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#E6F0FA', padding: '5px 10px', borderRadius: '5px' }}>Draft</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
              </tbody>
            </Table>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>All</span>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Active</span>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Disable</span>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>Draft</span>
            </Group>
            <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Campaign Name</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Status</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Inventory</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Closed In</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#D4F6E6', padding: '5px 10px', borderRadius: '5px' }}>Active</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#FFE4E4', padding: '5px 10px', borderRadius: '5px' }}>Disable</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#E6F0FA', padding: '5px 10px', borderRadius: '5px' }}>Draft</span></td>
                  <td style={{ padding: '12px', color: '#FF002E' }}>1500 in Stocks</td>
                  <td style={{ padding: '12px' }}>T-Shirts</td>
                </tr>
              </tbody>
            </Table>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="3" pt="xs">
            <AddProduct/>
          </Tabs.Panel>

          <Tabs.Panel value="4" pt="xs">
            <AddLottery/>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
};