import { useState, useEffect } from 'react';
import { Box, Button, Flex, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (token) {
      notifications.show({
        title: "Already Logged In",
        message: "Redirecting to dashboard...",
        color: "blue",
        autoClose: 2000,
      });
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Show notification if redirected from protected route
  useEffect(() => {
    if (location.state?.from) {
      notifications.show({
        title: "Login Required",
        message: "Please login to access the requested page",
        color: "orange",
        autoClose: 4000,
      });
    }
  }, [location.state]);

  const validateForm = () => {
    if (!email.trim()) {
      notifications.show({
        title: "Validation Error",
        message: "Please enter your email",
        color: "red",
        autoClose: 3000,
      });
      return false;
    }
    if (!password.trim()) {
      notifications.show({
        title: "Validation Error",
        message: "Please enter your password",
        color: "red",
        autoClose: 3000,
      });
      return false;
    }
    if (!email.includes('@')) {
      notifications.show({
        title: "Validation Error",
        message: "Please enter a valid email address",
        color: "red",
        autoClose: 3000,
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/admin-auth/login`, {
        email,
        password,
      });
      
      if (response.data && response.data.token) {
        // Store token in cookies (secure, httpOnly should be set from backend for real apps)
        Cookies.set('admin_token', response.data.token, { expires: 7, path: '/' });
        
        notifications.show({
          title: "Login Successful",
          message: "Welcome to Admin Panel!",
          color: "green",
          autoClose: 2000,
        });
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      
      notifications.show({
        title: "Login Failed",
        message: errorMessage,
        color: "red",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <Flex style={{ minHeight: '100vh', width: '100vw', background: '#f7fafd' }}>
      {/* Left Side: Balloon with blue abstract background */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#f7fafd',
          overflow: 'hidden',
        }}
      >
        {/* Blue abstract background (simulated with a pseudo-element or inline style) */}
        <Box
          style={{
            position: 'absolute',
            top: '-20%',
            left: '0',
            width: '100%',
            height: '140%',
            zIndex: 1,
          }}
        />
        {/* Balloon image */}
        <img
          src="assets/admin-login.png" // Ensure this image path is correct
          alt="Balloon"
       
        />
      </Box>

      {/* Right Side: Login Form */}
      <Flex
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7fafd',
          padding: '0 20px', // Added padding for better responsiveness
        }}
      >
        <Paper
          p={40}
          style={{
            width: 600,
            maxWidth: '100%', // Ensure it fits on smaller screens
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent',
          }}
        >
          <Title order={3} style={{ fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>
            Login to Admin Panel
          </Title>
          <TextInput
            label="Email"
            placeholder="Enter your Email here"
            size="md"
            style={{ width: '100%', marginBottom: 20 }}
            radius="md"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your Password here"
            size="md"
            style={{ width: '100%', marginBottom: 10 }}
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
          <Text
            style={{
              alignSelf: 'flex-end',
              color: '#6CD5FF',
              fontSize: 14,
              marginBottom: 24,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Forget Password
          </Text>
          {error && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          )}
          <Button
            fullWidth
            size="md"
            loading={loading}
            style={{
              background: '#6CD5FF',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 8,
              marginBottom: 16,
            }}
            onClick={handleLogin}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        
          <Text
            style={{
              color: '#bdbdbd',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            Reserved directs to{' '}
            <span style={{ fontWeight: 700, color: '#222' }}>Creative Code Tech</span>
          </Text>
        </Paper>
      </Flex>
    </Flex>
  );
}