import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Checkbox,
  Group,
  Button,
  NumberInput,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface FileWithPreview {
  url: string;
  name: string;
}

export const AddProduct = () => {
  const [isDiscountChecked, setIsDiscountChecked] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  const handleFileChange = (selectedFiles: File[] | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
        .slice(0, 5 - files.length)
        .map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }));
      setFiles([...files, ...newFiles].slice(0, 5));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const previews = files.map((file, index) => (
    <Box key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
      <Image
        src={file.url}
        alt={file.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
  ));

  return (
    <Box p="md">
      <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '20px' : '30px' 
        }}>
          Add New Product
        </h1>
      <Grid gutter="md">
        {/* Left Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="Title"
            placeholder="Enter product title"
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
          <Textarea
            label="Description"
            placeholder="Enter product description"
            minRows={4}
            mb="sm"
            required
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '15px 20px',
                borderRadius: '10px',
                borderColor: '#53CCFF',
                height: '200px',
              },
              label: {
                fontSize: '18px',
                marginBottom: '5px',
                color: '#4C4E6A',
              },
            }}
          />
          <Box>
            <FileInput
              label="Media"
              placeholder="Upload product images"
              accept="image/*"
              multiple
              required
              mb="sm"
              style={{ width: isSmallScreen ? '100%' : '60%' }}
              styles={{
                input: {
                  padding: '15px 20px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F8F9FA',
                  cursor: 'pointer',
                  textAlign: 'center',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
              onChange={handleFileChange}
              value={files.map((file) => new File([], file.name))}
            />
            {/* <Center mt="sm">
              <Group direction="column" align="center" spacing="xs">
                <IconUpload size={40} color="#53CCFF" />
                <Text size="sm" color="#4C4E6A">
                  Upload image (Max 5)
                </Text>
              </Group>
            </Center> */}
            {files.length > 0 && (
              <SimpleGrid cols={isSmallScreen ? 3 : 8} spacing="xs" mt="sm">
                {previews}
              </SimpleGrid>
            )}
          </Box>
          <Select
            label="Category"
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
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Colors"
            placeholder="Select colors"
            data={['Red', 'Blue', 'Green', 'Black', 'White']}
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
          <Select
            label="Sizes"
            placeholder="Select sizes"
            data={['XS', 'S', 'M', 'L', 'XL']}
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
            label="Price"
            placeholder="Enter price"
            type="number"
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
            label="Compare Price"
            placeholder="Enter compare price"
            type="number"
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
          <Checkbox
            label="Add Discount"
            checked={isDiscountChecked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setIsDiscountChecked(event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '18px',
              },
            }}
          />
          {isDiscountChecked && (
            <TextInput
              label="Discount Percentage"
              placeholder="Enter discount percentage"
              type="number"
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
          )}
          <Box mt="md">
            <div style={{ fontWeight: 600, marginBottom: '10px', color: '#4C4E6A' }}>Quantity</div>
            <Grid gutter="xs">
              <Grid.Col span={4}>
                <NumberInput
                  label="S"
                  value={0}
                  min={0}
                  style={{ width: '70%' }}
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
              <Grid.Col span={4}>
                <NumberInput
                  label="M"
                  value={0}
                  min={0}
                  style={{ width: '70%' }}
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
              <Grid.Col span={4}>
                <NumberInput
                  label="L"
                  value={0}
                  min={0}
                  style={{ width: '70%' }}
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
              <Grid.Col span={4}>
                <NumberInput
                  label="XL"
                  value={0}
                  min={0}
                  style={{ width: '70%' }}
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
              <Grid.Col span={4}>
                <NumberInput
                  label="2XL"
                  value={0}
                  min={0}
                  style={{ width: '70%' }}
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
          </Box>
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="md">
        <Button c="white" style={{ backgroundColor: '#4C4E6A' }}>
          Save Product
        </Button>
      </Group>
    </Box>
  );
};