import { useState } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Group,
  Button,
  Checkbox,
  Flex,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { IconCheck, IconX } from '@tabler/icons-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  district: string;
  isEmailSubscribed: boolean;
  isSmsSubscribed: boolean;
}

export const AddCustomer = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    district: '',
    isEmailSubscribed: false,
    isSmsSubscribed: false,
  });
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isTextChecked, setIsTextChecked] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode || !formData.district) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      return;
    }

    try {
      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        district: formData.district,
        isEmailSubscribed: isEmailChecked,
        isSmsSubscribed: isTextChecked,
      };

      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/customers`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      notifications.show({
        title: 'Success',
        message: 'Customer added successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        district: '',
        isEmailSubscribed: false,
        isSmsSubscribed: false,
      });
      setIsEmailChecked(false);
      setIsTextChecked(false);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add customer. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <Box p="md">
      <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '20px' : '30px' 
        }}>
          Add New Customers
        </h1>
      <Grid gutter="md">
        {/* Left Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(event) => handleInputChange('firstName', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <TextInput
            label="Email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={(event) => handleInputChange('email', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <Checkbox
            label="Customer agreed to receive marketing email."
            checked={isEmailChecked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setIsEmailChecked(event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <Checkbox
            label="Customer agreed to receive SMS Marketing text messages."
            checked={isTextChecked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setIsTextChecked(event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <TextInput
            label="Address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={(event) => handleInputChange('address', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <Flex gap={50}>
            <TextInput
              label="Postal Code"
              placeholder="Enter Code"
              value={formData.postalCode}
              onChange={(event) => handleInputChange('postalCode', event.currentTarget.value)}
              mb="sm"
              required
              style={{ width: isSmallScreen ? '100%' : '27%' }}
              styles={{
                input: {
                  padding: '25px 20px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
            />
            <TextInput
              label="District"
              placeholder="abc123"
              value={formData.district}
              onChange={(event) => handleInputChange('district', event.currentTarget.value)}
              mb="sm"
              required
              style={{ width: isSmallScreen ? '100%' : '26%' }}
              styles={{
                input: {
                  padding: '25px 20px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
            />
          </Flex>
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(event) => handleInputChange('lastName', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <TextInput
            label="Phone"
            placeholder="00000"
            value={formData.phone}
            onChange={(event) => handleInputChange('phone', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <TextInput
            label="City"
            placeholder="Lahore"
            value={formData.city}
            onChange={(event) => handleInputChange('city', event.currentTarget.value)}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '25px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="md">
        <Button c="white" style={{ backgroundColor: '#4C4E6A' }} onClick={handleSubmit}>
          Save Customer
        </Button>
      </Group>
    </Box>
  );
};