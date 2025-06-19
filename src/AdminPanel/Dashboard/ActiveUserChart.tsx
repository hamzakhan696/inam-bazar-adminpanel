import { Card, Group, Text, Badge, Stack } from "@mantine/core";

export default function ActiveUserChart() {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F9F9F9", padding: 20, borderRadius: '10px' }}
    >
      <Group style={{ display: 'flex', justifyContent: 'space-between'}} mb="xs">
        <Text fw={600}>Active User</Text>
        <Text c="dimmed">...</Text>
      </Group>

      <Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text fw={700} size="xl">2,758</Text>
        <Stack gap={0}>
          <Badge color="teal" size="sm" variant="light">
            +8.02%
          </Badge>
        </Stack>
      </Group>

      {/* Custom Horizontal Bar Chart */}
      <Stack gap="md">
        {/* United States */}
        <div>
          <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Text size="sm" c="gray">United States</Text>
            <Text size="sm" fw={600}>36%</Text>
          </Group>
          <div style={{ height: 15, backgroundColor: '#EDF2F7', borderRadius: 10 }}>
            <div 
              style={{ 
                width: '36%', 
                height: '100%', 
                backgroundColor: '#B3E9FF', 
                borderRadius: 10 
              }} 
            />
          </div>
        </div>

        {/* United Kingdom */}
        <div>
          <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Text size="sm" c="gray">United Kingdom</Text>
            <Text size="sm" fw={600}>24%</Text>
          </Group>
          <div style={{ height: 15, backgroundColor: '#EDF2F7', borderRadius: 10 }}>
            <div 
              style={{ 
                width: '24%', 
                height: '100%', 
                backgroundColor: '#B3E9FF', 
                borderRadius: 10 
              }} 
            />
          </div>
        </div>

        {/* Indonesia */}
        <div>
          <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Text size="sm" c="gray">Indonesia</Text>
            <Text size="sm" fw={600}>17.5%</Text>
          </Group>
          <div style={{ height: 15, backgroundColor: '#EDF2F7', borderRadius: 10 }}>
            <div 
              style={{ 
                width: '17.5%', 
                height: '100%', 
                backgroundColor: '#B3E9FF', 
                borderRadius: 10 
              }} 
            />
          </div>
        </div>

        {/* Russia */}
        <div>
          <Group style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Text size="sm" c="gray">Russia</Text>
            <Text size="sm" fw={600}>15%</Text>
          </Group>
          <div style={{ height: 15, backgroundColor: '#EDF2F7', borderRadius: 10 }}>
            <div 
              style={{ 
                width: '15%', 
                height: '100%', 
                backgroundColor: '#B3E9FF', 
                borderRadius: 10 
              }} 
            />
          </div>
        </div>
      </Stack>
    </Card>
  );
}