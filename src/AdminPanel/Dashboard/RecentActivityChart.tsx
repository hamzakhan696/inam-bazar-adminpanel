import { Card, Group, Text, Flex } from "@mantine/core";
import { IconShoppingCart, IconStar, IconShoe } from "@tabler/icons-react";

export default function RecentActivityChart() {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{ backgroundColor: "#E8F8FF", padding: "0px 20px", borderRadius: '10px', height: '475px' }}
    >
      <Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }} mb="xs">
        <Text style={{ fontSize: '20px', fontWeight: 'bold', padding: 5, margin: 0 }}>Recent Activity</Text>
        <Text c="dimmed">...</Text>
      </Group>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <span style={{ backgroundColor: '#53CCFF', color: 'white', padding: '5px', borderRadius: '50%', marginRight: '10px' }}>
            <IconShoppingCart size={20} color="white" />
          </span>
          <Flex direction={"column"}>
            <Text style={{ fontSize: '12px'}}>Maureen Steel purchased 2 items totaling $120.</Text>
            <Text c="dimmed" style={{ fontSize: '12px'}}>10:30 AM</Text>
          </Flex>
        </div>
        <div style={{ height: '40px', borderLeft: '2px solid #53CCFF', marginLeft: '14px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#53CCFF', color: 'white', padding: '5px', borderRadius: '50%', marginRight: '10px' }}>
            <IconShoppingCart size={20} color="white" />
          </span>
          <Flex direction={"column"}>
            <Text style={{ fontSize: '12px'}}>The price of "Smart TV" was updated from $500 to $450.</Text>
            <Text c="dimmed" style={{ fontSize: '12px'}}>9:45 AM</Text>
          </Flex>
        </div>
        <div style={{ height: '40px', borderLeft: '2px solid #53CCFF', marginLeft: '14px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#53CCFF', color: 'white', padding: '5px', borderRadius: '50%', marginRight: '10px' }}>
            <IconStar size={20} color="white" />
          </span>
          <Flex direction={"column"}>
            <Text style={{ fontSize: '12px'}}>5-star review for "Wireless Headphones."</Text>
            <Text c="dimmed" style={{ fontSize: '12px'}}>8:20 AM</Text>
          </Flex>
        </div>
        <div style={{ height: '40px', borderLeft: '2px solid #53CCFF', marginLeft: '14px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#53CCFF', color: 'white', padding: '5px', borderRadius: '50%', marginRight: '10px' }}>
            <IconShoe size={20} color="white" />
          </span>
          <Flex direction={"column"}>
            <Text style={{ fontSize: '12px'}}>"Running Shoes" stock is below 10 units.</Text>
            <Text c="dimmed" style={{ fontSize: '12px'}}>7:50 AM</Text>
          </Flex>
        </div>
      </div>
    </Card>
  );
}