import { Text, Group, TextInput, ActionIcon, Menu, Avatar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSearch, IconBell, IconMessage, IconLogout } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const TopBar = () => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Show confirmation notification
        notifications.show({
            title: "Logging Out",
            message: "You have been successfully logged out",
            color: "blue",
            autoClose: 2000,
        });
        
        // Remove the admin token from cookies
        Cookies.remove('admin_token', { path: '/' });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/admin-login');
        }, 1000);
    };

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
                <Menu.Item 
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                  color="red"
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          )}
    </>
  )
}
