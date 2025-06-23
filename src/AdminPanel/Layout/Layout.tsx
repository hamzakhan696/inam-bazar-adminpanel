import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { Box, Button } from "@mantine/core";
import { IconMenu2, IconX } from "@tabler/icons-react"; // Import IconX
import { useMediaQuery } from "@mantine/hooks";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden", position: "relative" }}>
      {isMobile && (
        <Box
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 2000,
          }}
        >
          <Button onClick={toggleSidebar} variant="outline" color="#53CCFF">
            {isSidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </Button>
        </Box>
      )}
      <Sidebar isOpen={!isMobile || isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile}/>
      <main
        style={{
          flex: 1,
          // padding: "20px",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          marginLeft: (!isMobile || isSidebarOpen) && !isMobile ? '240px' : (isSidebarOpen ? '0px' : '0'),
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;