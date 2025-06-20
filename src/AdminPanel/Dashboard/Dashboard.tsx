import { Text, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHome, IconChartBar, IconUsers } from "@tabler/icons-react";
import RevenueAnalyticsChart from "./RevenueAnalyticsChart";
import MonthlyTargetChart from "./MonthlyTargetChart";
import TopCategoriesChart from "./TopCategoriesChart";
import ActiveUserChart from "./ActiveUserChart";
import ConversionRateChart from "./ConversionRateChart";
import TrafficSourceChart from "./TrafficSourceChart";
import { RecentOrders } from "./RecentOrders";
import RecentActivityChart from "./RecentActivityChart";
import { Footer } from "./Footer";

export const Dashboard = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Group justify="space-between" wrap="wrap" gap="sm">
        <h1 style={{ marginLeft: isSmallScreen ? '80px' : '0px', fontSize: '28px' }}>Dashboard</h1>
      </Group>

      <Group
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          width: '100%',
          alignItems: 'start',
        }}
      >
        {/* Total Sales */}
        <div style={{ gridColumn: '1', gridRow: '1' }}>
          <Group
          style={{
            backgroundColor: "#E8F8FF",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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
            <Text style={{ color: '#6B6B6A'}}>Total Sales</Text>
            <span style={{ backgroundColor: '#53CCFF', color: 'white', padding: '5px', borderRadius: '20%', marginRight: '10px' }}>
              <IconHome size={20} color="white" />
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
            <Text style={{ fontSize: '34px', fontWeight: 'bold', padding: 0, margin: 0}}>$234,234</Text>
            <Text style={{ color: '#0FB271' }}>33.3%</Text>
          </Group>
        </Group>
        </div>

        {/* Revenue */}
        <div style={{ gridColumn: '2', gridRow: '1' }}>
          <Group
          style={{
            backgroundColor: "#F9F9F9",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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
            <Text style={{ color: '#6B6B6A'}}>Revenue</Text>
            <span style={{ backgroundColor: 'white', color: 'white', padding: '5px', borderRadius: '20%', marginRight: '10px' }}>
              <IconChartBar size={20} color="black" />
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
            <Text style={{ fontSize: '34px', fontWeight: 'bold', padding: 0, margin: 0}}>$180,450</Text>
            <Text style={{ color: '#FF002E' }}>25.7%</Text>
          </Group>
        </Group>
        </div>

        {/* Customers */}
        <div style={{ gridColumn: '3', gridRow: '1' }}>
          <Group
          style={{
            backgroundColor: "#F9F9F9",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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
            <Text style={{ color: '#6B6B6A'}}>Customers</Text>
            <span style={{ backgroundColor: 'white', color: 'white', padding: '5px', borderRadius: '20%', marginRight: '10px' }}>
              <IconUsers size={20} color="black" />
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
            <Text style={{ fontSize: '34px', fontWeight: 'bold', padding: 0, margin: 0}}>1,245</Text>
            <Text style={{ color: '#0FB271' }}>15.2%</Text>
          </Group>
          </Group>
        </div>

        {/* Top Categories Chart: right side spanning 2 rows */}
        <div style={{ gridColumn: '4', gridRow: '1 / span 2', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', }}>
          <TopCategoriesChart />
        </div>

        {/* RevenueAnalyticsChart: under Total Sales + Revenue */}
        <div
          style={{
            gridColumn: '1 / span 2',
            gridRow: '2',
            backgroundColor: '#F9F9F9',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <RevenueAnalyticsChart />
        </div>
        
        {/* ActiveUserChart */}
        <div style={{ gridColumn: '1', gridRow: '3' }}>
          <ActiveUserChart />
        </div>

        <div style={{ gridColumn: '2 / span 2', gridRow: '3' }}>
          <ConversionRateChart/>
        </div>

        <div style={{ gridColumn: '4', gridRow: '3', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', }}>
          <TrafficSourceChart />
        </div>

        <div style={{ gridColumn: '1 / span 3', gridRow: '4' }}>
          <RecentOrders/>
        </div>

        <div style={{ gridColumn: '4', gridRow: '4' }}>
          <RecentActivityChart />
        </div>

        {/* MonthlyTargetChart: under Customers */}
        <div
          style={{
            gridColumn: '3',
            gridRow: '2',
            backgroundColor: '#F9F9F9',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <MonthlyTargetChart />
        </div>
      </Group>

      <Footer/>
    </>
  );
};
