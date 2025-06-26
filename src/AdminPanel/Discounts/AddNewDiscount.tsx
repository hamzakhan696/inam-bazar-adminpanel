import { useState } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Group,
  Button,
  Checkbox,
  Flex,
  Select,
  Text
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

export const AddNewDiscount = () => {
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isTextChecked, setIsTextChecked] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  return (
    <Box p="md">
      <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '20px' : '30px' 
        }}>
          Add New Discount
        </h1>
      <Grid gutter="md">
        {/* Left Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="Discount Code"
            placeholder="Enter Code"
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
            label="Discount Value"
            placeholder="%"
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
          <Select
            label="Applies To"
            placeholder="Select category"
            data={['T-Shirts', 'Jackets', 'Pants', 'Accessories']}
            mb="sm"
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
          <Flex gap={20} align="stretch">
            <TextInput
              leftSection={<IconSearch size={20} color="#53CCFF" />}
              placeholder="Search for Products"
              style={{ width: '300px' }}
              styles={{
                input: {
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: '1px solid #53CCFF',
                  padding: '25px 40px',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
            />
            <Button
              style={{
                width: '142px',
                padding: '10px',
                backgroundColor: 'transparent',
                border: '1px solid #53CCFF',
                color: '#53CCFF',
                height: '50px',
                borderRadius: '10px',
                // marginTop: '33px'
              }}
            >
              Browse
            </Button>
          </Flex>

          <Text style={{fontSize: '18px', margin: '12px 0px', color: '#4C4E6A', fontWeight: 500}}>Maximum Discount Uses</Text>
          <Checkbox
              label="Limit number of times this discount can be used in total"
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
              label="Limit to one use per customer"
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
            
            <Text style={{fontSize: '18px', margin: '12px 0px', color: '#4C4E6A', fontWeight: 500}}>Combination</Text>
          <Checkbox
              label="Product Discounts"
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
              label="Order Discounts"
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
          <Checkbox
              label="Shipping Discounts"
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
              label="Start Date"
              placeholder="Select date"
              type='date'
              multiple
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
              label="End Date"
              placeholder="Select date"
              type='date'
              multiple
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