import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("admin_token");
        if (!token) {
          throw new Error("Authentication required");
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        
        // Show notification for unauthorized access
        notifications.show({
          title: "Access Denied",
          message: "Please login to access this page",
          color: "red",
          autoClose: 3000,
        });
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Center style={{ height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size="lg" />
          <Text mt="md" c="dimmed">Checking authentication...</Text>
        </div>
      </Center>
    );
  }

  return isAuthenticated ? element : <Navigate to="/admin-login" state={{ from: location }} replace />;
};

export default ProtectedRoute;