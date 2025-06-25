import { Text, Group, TextInput, ActionIcon, Menu, Avatar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch, IconBell, IconMessage } from "@tabler/icons-react";

export const TopBar = () => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
  return (
    <>
    { !isSmallScreen && (
            <Group gap="30px">
            <TextInput
              rightSection={<IconSearch size={16} />}
              placeholder="Search stock, order, etc."
              style={{ width: '300px' }}
              styles={{ 
                input: {
                  backgroundColor: '#F9F9F9',
                  borderRadius: '10px',
                  border: 'none'
                },
              }}
            />
            <ActionIcon variant="subtle" color="gray">
              <IconMessage size={22} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBell size={22} />
            </ActionIcon>
            <Menu position="bottom-end" shadow="md" width={200}>
              <Menu.Target>
                <Group gap="xs" style={{ cursor: 'pointer' }}>
                  <Avatar src="/path-to-avatar.jpg" radius="lg" size="lg" />
                  <Text>Hashir Kamal</Text>
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          )}
    </>
  )
}
