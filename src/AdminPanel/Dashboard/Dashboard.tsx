// import { Text, Group, Card } from "@mantine/core"
// import { useMediaQuery } from "@mantine/hooks";
// import { 
//   IconHome,
//   IconChartBar,
//   IconUsers,
// } from "@tabler/icons-react";
// import RevenueAnalyticsChart from "./RevenueAnalyticsChart";
// import MonthlyTargetChart from "./MonthlyTargetChart";


// export const Dashboard = () => {
//     const isSmallScreen = useMediaQuery('(max-width: 768px)');
//   return (
//     <>
//     <Group justify="space-between" mb="sm" wrap="wrap" gap="sm">
//         <h1 style={{marginLeft: isSmallScreen ? '80px' : '0px', fontSize: '28px'}}>Dashboard</h1>
//         <Group gap="md" wrap="wrap">
//             {/* <h1 style={{marginLeft: isSmallScreen ? '80px' : '0px', fontSize: '28px'}}>Dashboard</h1> */}
//         </Group>

//         <Group style={{ 
//           display: 'grid', 
//           gridTemplateColumns: 'repeat(3, 1fr)', 
//           gap: '20px',
//           width: '100%',
//           alignItems: 'start'
//         }}>
        //   {/* First Column: Total Sales */}
        // <Group
        //   style={{
        //     backgroundColor: "#F9F9F9",
        //     padding: "20px",
        //     borderRadius: "10px",
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "10px",
        //   }}
        // >
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>Total Sales</Text>
        //     <IconHome size={20} />
        //   </Group>
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>$234,234</Text>
        //     <Text>33.3%</Text>
        //   </Group>
        // </Group>

        // {/* Second Column: Revenue */}
        // <Group
        //   style={{
        //     backgroundColor: "#F9F9F9",
        //     padding: "20px",
        //     borderRadius: "10px",
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "10px",
        //   }}
        // >
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>Revenue</Text>
        //     <IconChartBar size={20} />
        //   </Group>
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>$180,450</Text>
        //     <Text>25.7%</Text>
        //   </Group>
        // </Group>

        // {/* Third Column: Customers */}
        // <Group
        //   style={{
        //     backgroundColor: "#F9F9F9",
        //     padding: "20px",
        //     borderRadius: "10px",
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "10px",
        //   }}
        // >
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>Customers</Text>
        //     <IconUsers size={20} />
        //   </Group>
        //   <Group
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       width: "100%",
        //     }}
        //   >
        //     <Text>1,245</Text>
        //     <Text>15.2%</Text>
        //   </Group>
//         </Group>

//         {/* RevenueAnalyticsChart below the first two grids (spanning columns 1 and 2) */}
//         <div
//           style={{
//             gridColumn: "1 / span 2",
//             gridRow: "2",
//             backgroundColor: "#F9F9F9",
//             padding: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           <RevenueAnalyticsChart />
//         </div>

//         {/* MonthlyTargetChart below the third grid (spanning column 3) */}
//         <div
//           style={{
//             gridColumn: "3",
//             gridRow: "2",
//             backgroundColor: "#F9F9F9",
//             padding: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           <MonthlyTargetChart />
//         </div>
//         </Group>
      
//       </Group>
//     </>
//   )
// }


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

export const Dashboard = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Group justify="space-between" mb="sm" wrap="wrap" gap="sm">
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
            <Text>Total Sales</Text>
            <IconHome size={20} />
          </Group>
          <Group
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text>$234,234</Text>
            <Text>33.3%</Text>
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
            <Text>Revenue</Text>
            <IconChartBar size={20} />
          </Group>
          <Group
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text>$180,450</Text>
            <Text>25.7%</Text>
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
            <Text>Customers</Text>
            <IconUsers size={20} />
          </Group>
          <Group
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text>1,245</Text>
            <Text>15.2%</Text>
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
    </>
  );
};
