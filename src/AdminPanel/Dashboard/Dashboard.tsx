import { Text, Group, Box } from "@mantine/core";
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
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(max-width: 1440px)');

  // Sidebar is visible on screens >1024px, hidden or toggled on screens <=1024px
  const isMobile = isMediumScreen;

  // Define margins based on screen size
  const containerMargin = isExtraSmallScreen 
    ? '5px' 
    : isSmallScreen 
      ? '10px' 
      : isMediumScreen 
        ? '15px' 
        : isLargeScreen 
          ? '20px' 
          : '30px';

  // Adjust grid gap based on screen size
  const gridGap = isExtraSmallScreen 
    ? '10px' 
    : isSmallScreen 
      ? '15px' 
      : isMediumScreen 
        ? '15px' 
        : isLargeScreen 
          ? '15px' 
          : '15px';

  // Calculate available width considering sidebar (200px) on non-mobile screens
  const sidebarWidth = isMobile ? 0 : 0;
  const containerWidth = `calc(100vw - ${sidebarWidth}px - ${containerMargin} * 2)`;

  return (
    <Box
      style={{
        marginLeft: isMobile ? containerMargin : `calc(${sidebarWidth}px + ${containerMargin})`,
        marginRight: containerMargin,
        maxWidth: containerWidth,
        boxSizing: 'border-box',
        paddingBottom: '20px',
      }}
    >
      <Group 
        justify="space-between" 
        wrap="wrap" 
        gap="sm" 
        style={{ 
          marginBottom: '0px',
        }}
      >
        <h1 style={{ 
          marginLeft: isMediumScreen ? '75px' : '0px', 
          fontSize: isExtraSmallScreen ? '24px' : '28px' 
        }}>
          Dashboard
        </h1>
      </Group>

      <Group
        style={{
          display: 'grid',
          gridTemplateColumns: isExtraSmallScreen 
            ? '1fr' 
            : isSmallScreen 
              ? 'repeat(2, 1fr)' 
              : 'repeat(4, 1fr)',
          gap: gridGap,
          width: '100%',
          alignItems: 'start',
        }}
      >
        {/* Total Sales */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '1', gridRow: '1' }}>
          <Group
            style={{
              backgroundColor: "#E8F8FF",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
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
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Total Sales
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
                $2,343
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                33.3%
              </Text>
            </Group>
          </Group>
        </div>

        {/* Revenue */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '2', gridRow: isSmallScreen ? '2' : '1' }}>
          <Group
            style={{
              backgroundColor: "#F9F9F9",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
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
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Revenue
              </Text>
              <span style={{ 
                backgroundColor: 'white', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconChartBar size={isExtraSmallScreen ? 16 : 20} color="black" />
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
                $2,343
              </Text>
              <Text style={{ color: '#FF002E', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                25.7%
              </Text>
            </Group>
          </Group>
        </div>

        {/* Customers */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '3', gridRow: isSmallScreen ? '3' : '1' }}>
          <Group
            style={{
              backgroundColor: "#F9F9F9",
              padding: isExtraSmallScreen ? "15px" : isMediumScreen ? "18px" : "20px",
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
              <Text style={{ color: '#6B6B6A', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                Customers
              </Text>
              <span style={{ 
                backgroundColor: 'white', 
                color: 'white', 
                padding: '5px', 
                borderRadius: '20%', 
                marginRight: '10px' 
              }}>
                <IconUsers size={isExtraSmallScreen ? 16 : 20} color="black" />
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
                1,245
              </Text>
              <Text style={{ color: '#0FB271', fontSize: isExtraSmallScreen ? '12px' : isMediumScreen ? '14px' : '16px' }}>
                15.2%
              </Text>
            </Group>
          </Group>
        </div>

        {/* Top Categories Chart */}
        <div style={{ 
          gridColumn: isSmallScreen ? '1 / span 2' : '4', 
          gridRow: isSmallScreen ? '4' : '1 / span 2', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'stretch' 
        }}>
          <TopCategoriesChart />
        </div>

        {/* RevenueAnalyticsChart */}
        <div
          style={{
            gridColumn: isSmallScreen ? '1 / span 2' : '1 / span 2',
            gridRow: isSmallScreen ? '5' : '2',
            backgroundColor: '#F9F9F9',
            padding: isExtraSmallScreen ? '15px' : isMediumScreen ? '18px' : '0px',
            borderRadius: '10px',
          }}
        >
          <RevenueAnalyticsChart />
        </div>

        {/* ActiveUserChart */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '1', gridRow: isSmallScreen ? '6' : '3' }}>
          <ActiveUserChart />
        </div>

        {/* ConversionRateChart */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '2 / span 2', gridRow: isSmallScreen ? '7' : '3' }}>
          <ConversionRateChart />
        </div>

        {/* TrafficSourceChart */}
        <div style={{ 
          gridColumn: isSmallScreen ? '1 / span 2' : '4', 
          gridRow: isSmallScreen ? '8' : '3', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'stretch' 
        }}>
          <TrafficSourceChart />
        </div>

        {/* RecentOrders */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '1 / span 3', gridRow: isSmallScreen ? '9' : '4' }}>
          <RecentOrders />
        </div>

        {/* RecentActivityChart */}
        <div style={{ gridColumn: isSmallScreen ? '1 / span 2' : '4', gridRow: isSmallScreen ? '10' : '4' }}>
          <RecentActivityChart />
        </div>

        {/* MonthlyTargetChart */}
        <div
          style={{
            gridColumn: isSmallScreen ? '1 / span 2' : '3',
            gridRow: isSmallScreen ? '11' : '2',
            backgroundColor: '#F9F9F9',
            padding: isExtraSmallScreen ? '15px' : isMediumScreen ? '18px' : '0px',
            borderRadius: '10px',
          }}
        >
          <MonthlyTargetChart />
        </div>
      </Group>

      <Footer />
    </Box>
  );
};