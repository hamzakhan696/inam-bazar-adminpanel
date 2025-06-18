import { NavLink } from "react-router-dom";
import { Box, Stack, Text, Divider } from "@mantine/core";
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
  IconAppsFilled
} from "@tabler/icons-react";
import classes from './Sidebar.module.css';

const Sidebar = () => {
  const navItems = [
    { icon: <IconHome size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <IconBox size={20} />, label: "Products", path: "/products" },
    { icon: <IconShoppingCart size={20} />, label: "Orders", path: "/orders" },
    { icon: <IconUsers size={20} />, label: "Customers", path: "/customers" },
    { icon: <IconReport size={20} />, label: "Reports", path: "/reports" },
    { icon: <IconDiscount2 size={20} />, label: "Discounts", path: "/discounts" },
    { icon: <IconPigMoney size={20} />, label: "Deals", path: "/deals" },
    // Divider will be inserted after this item
    { icon: <IconPlugConnected size={20} />, label: "Integrations", path: "/integrations" },
    { icon: <IconHelp size={20} />, label: "Help", path: "/help" },
    { icon: <IconSettings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <Box className={classes.sidebarContainer}>
      {/* Logo Section */}
      <Box className={classes.logoSection} style={{ display: ''}}>
        <IconAppsFilled size={32} style={{ color: '#53CCFF' }} />
        <Text className={classes.logoText}>I.B</Text>
      </Box>

      {/* Navigation Items */}
      <Stack gap={0} className={classes.navStack}>
        {navItems.map((item, index) => (
          <>
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${classes.navItem} ${isActive ? classes.activeItem : ''}`
              }
            >
              <Box className={classes.navContent}>
                <span className={classes.navIcon}>{item.icon}</span>
                <Text className={classes.navLabel}>{item.label}</Text>
              </Box>
            </NavLink>
            {/* Add divider after Deals */}
            {index === 6 && (
              <Divider 
                my={8} 
                className={classes.customDivider}
                style={{ borderTop: '1px solid #e5e7eb' }} // Explicit border style
              />
            )}
          </>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;