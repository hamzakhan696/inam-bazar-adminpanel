import { Group, Box, Button, Paper, Tabs, Table, FloatingIndicator } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState } from "react";
import classes from '../TabCSS/products.module.css';
import { AddNewDiscount } from "./AddNewDiscount";

export const Discounts = () => {
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
          Discount
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={() => setValue('2')}
        >
          Add New Discount
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
            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab} style={{ border: '1px solid #53CCFF', borderRadius: '10px'}}>
              All Discounts
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
            </Group>
            <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Product</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Category</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Discount Code</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Start Date</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>End Date</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Discount Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}>Women</td>
                  <td style={{ padding: '12px' }}>IB20</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px' }}>20%</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}>Women</td>
                  <td style={{ padding: '12px' }}>IB20</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px' }}>01/01/20</td>
                  <td style={{ padding: '12px' }}>20%</td>
                </tr>
              </tbody>
            </Table>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <AddNewDiscount/>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
};