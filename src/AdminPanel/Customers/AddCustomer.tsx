import { useState } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Group,
  Button,
  Checkbox,
  Flex
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const AddCustomer = () => {
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isTextChecked, setIsTextChecked] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <Box p="md">
      <Grid gutter="md">
        {/* Left Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="First Name"
            placeholder="John"
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
              label="Customer agreed to receive SMS Marketing text massages."
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
        <Button c="white" style={{ backgroundColor: '#4C4E6A' }}>
          Save Customer
        </Button>
      </Group>
    </Box>
  );
};