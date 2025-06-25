import { Group, Box, Paper, Table, Avatar} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";

export const Inventory = () => {
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
          Inventory
        </h1>
        <TopBar />
      </Group>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>

            <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
              <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>All</span>
            </Group>
            <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Product</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>Available</th>
                  <th style={{ padding: '12px', color: '#4C4E6A' }}>On Hand</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Women Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}>15</td>
                  <td style={{ padding: '12px' }}>15</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />Men Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}>15</td>
                  <td style={{ padding: '12px' }}>15</td>
                </tr>
                <tr style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                  <td style={{ padding: '12px' }}><input type="checkbox" style={{ width: '20px', height: '20px' }} /></td>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}><Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />kids Over Coat - Red Clour</td>
                  <td style={{ padding: '12px' }}>15</td>
                  <td style={{ padding: '12px' }}>15</td>
                </tr>
              </tbody>
            </Table>
            </div>
      </Paper>
    </Box>
  );
};