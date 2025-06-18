import { Group } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";


export const Help = () => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
  return (
    <>
    <Group justify="space-between" mb="sm" wrap="wrap" gap="sm">
        <h1 style={{marginLeft: isSmallScreen ? '80px' : '0px', fontSize: '28px'}}>Help</h1>
        <Group gap="md" wrap="wrap">
            {/* <h1 style={{marginLeft: isSmallScreen ? '80px' : '0px', fontSize: '28px'}}>Dashboard</h1> */}
        </Group>
      </Group>
    </>
  )
}