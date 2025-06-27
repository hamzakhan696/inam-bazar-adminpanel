import { NavLink } from "react-router-dom";
import { Box, Stack, Text, Divider, Group, Avatar, Menu, ActionIcon, TextInput } from "@mantine/core";
import {
  IconHome,
  IconBox,
  IconShoppingCart,
  IconUsers,
  IconReport,
  IconDiscount2,
  IconPigMoney,
  IconPlugConnected,
  IconHelp,
  IconSettings,
  IconAppsFilled,
  IconSearch,
  IconMessage,
  IconBell,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import classes from "./Sidebar.module.css";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Sidebar = ({ isOpen, toggleSidebar, isMobile }: SidebarProps) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navItems = [
    { icon: <IconHome size={20} />, label: "Dashboard", path: "/dashboard" },
    {
      icon: <IconBox size={20} />,
      label: "Products",
      path: "/products",
      subItems: [
        { label: "Category", path: "/categories" },
        { label: "Inventory", path: "/inventory" },
      ],
    },
    { icon: <IconShoppingCart size={20} />, label: "Orders", path: "/orders" },
    { icon: <IconUsers size={20} />, label: "Customers", path: "/customers" },
    { icon: <IconReport size={20} />, label: "Reports", path: "/reports" },
    { icon: <IconDiscount2 size={20} />, label: "Discounts", path: "/discounts" },
    { icon: <IconPigMoney size={20} />, label: "Deals", path: "/deals" },
    { icon: <IconPlugConnected size={20} />, label: "Shipments", path: "/shipments" },
    { icon: <IconPlugConnected size={20} />, label: "Payments", path: "/payments" },
    { icon: <IconHelp size={20} />, label: "Help", path: "/help" },
    { icon: <IconSettings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <Box
      className={classes.sidebarContainer}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        display: isMobile ? (isOpen ? "block" : "none") : "block",
      }}
    >
      <Box className={classes.logoSection}>
        <IconAppsFilled size={32} style={{ color: "#53CCFF" }} />
        <Text className={classes.logoText}>I.B</Text>
      </Box>
      <Stack gap={0} className={classes.navStack}>
        {navItems.map((item, index) => (
          <>
            <Box key={item.path || item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${classes.navItem} ${isActive ? classes.activeItem : ""}`
                }
                onClick={
                  item.subItems
                    ? () => setIsProductsOpen(!isProductsOpen)
                    : isOpen && window.innerWidth <= 768
                    ? toggleSidebar
                    : undefined
                }
              >
                <Box className={classes.navContent}>
                  <span className={classes.navIcon}>{item.icon}</span>
                  <Text className={classes.navLabel}>{item.label}</Text>
                  {item.subItems && (
                    <span style={{ marginLeft: "auto" }}>
                      {isProductsOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                    </span>
                  )}
                </Box>
              </NavLink>
              {item.subItems && isProductsOpen && (
                <Stack gap={0} style={{ paddingLeft: "1.5rem" }}>
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `${classes.navItem} ${isActive ? classes.activeItem : ""}`
                      }
                      onClick={isOpen && window.innerWidth <= 768 ? toggleSidebar : undefined}
                    >
                      <Box className={classes.navContent}>
                        <Text className={classes.navLabel}>{subItem.label}</Text>
                      </Box>
                    </NavLink>
                  ))}
                </Stack>
              )}
            </Box>
            {index === 6 && (
              <Divider
                my={8}
                className={classes.customDivider}
                style={{ borderTop: "1px solid #e5e7eb" }}
              />
            )}
          </>
        ))}
      </Stack>
      {isOpen && window.innerWidth <= 768 && (
        <Box className={classes.rightSection} p="sm">
          <Group gap="xs" justify="space-between" align="center">
            <TextInput
              leftSection={<IconSearch size={16} />}
              placeholder="Search stock, order, etc."
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <ActionIcon variant="subtle" color="gray">
              <IconMessage size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBell size={18} />
            </ActionIcon>
            <Menu position="bottom-end" shadow="md" width={200}>
              <Menu.Target>
                <Group gap="xs" style={{ cursor: "pointer" }}>
                  <Avatar src="/path-to-avatar.jpg" radius="xl" size="sm" />
                  <Text>Hashir Kamal</Text>
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;