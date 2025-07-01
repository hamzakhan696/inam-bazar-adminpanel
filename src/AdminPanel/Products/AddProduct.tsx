import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  FileInput,
  Checkbox,
  Group,
  Button,
  NumberInput,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { IconCheck, IconX } from '@tabler/icons-react';

interface FileWithPreview {
  url: string;
  name: string;
  file: File;
}

interface InventoryItem {
  size: string;
  quantity: number;
}

interface FormData {
  title: string;
  description: string;
  images: File[];
  color: string;
  sizes: string[];
  price: number | undefined;
  comparePrice: number | undefined;
  discount: number | undefined;
  inventory: InventoryItem[];
  categoryId: number | undefined;
}

export const AddProduct = () => {
  const [formData, setFormData] = useState<FormData>({
    title: 'Hic quis nulla disti',
    description: 'Nemo non et eos debi',
    images: [],
    color: 'Blue',
    sizes: ['M'],
    price: 104,
    comparePrice: 484,
    discount: 12,
    inventory: [
      { size: 'S', quantity: 0 },
      { size: 'M', quantity: 11111 },
      { size: 'L', quantity: 0 },
      { size: 'XL', quantity: 0 },
      { size: '2XL', quantity: 0 },
    ],
    categoryId: 1,
  });
  const [isDiscountChecked, setIsDiscountChecked] = useState<boolean>(true);
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
          file,
        }));
      setFiles([...files, ...newFiles].slice(0, 5));
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...selectedFiles].slice(0, 5) }));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === 'categoryId') {
      setFormData((prev) => ({ ...prev, [field]: value ? Number(value) : undefined }));
    } else if (field === 'sizes') {
      setFormData((prev) => ({ ...prev, [field]: Array.isArray(value) ? value : [] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInventoryChange = (size: string, value: string | number | undefined) => {
    const quantity = typeof value === 'string' ? parseInt(value, 10) || 0 : value || 0;
    setFormData((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) =>
        item.size === size ? { ...item, quantity } : item
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.categoryId) {
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
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      files.forEach((file) => {
        formDataToSend.append('images', file.file);
      });
      formDataToSend.append('color', formData.color);
      if (Array.isArray(formData.sizes)) {
        formData.sizes.forEach((size, index) => {
          formDataToSend.append(`sizes[${index}]`, size);
        });
      }
      formDataToSend.append('price', formData.price.toString());
      if (formData.comparePrice) {
        formDataToSend.append('comparePrice', formData.comparePrice.toString());
      }
      if (isDiscountChecked && formData.discount) {
        formDataToSend.append('discount', formData.discount.toString());
      }
      formDataToSend.append('inventory', JSON.stringify(formData.inventory));
      formDataToSend.append('categoryId', formData.categoryId.toString());

      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/products`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notifications.show({
        title: 'Success',
        message: 'Product added successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      setFormData({
        title: '',
        description: '',
        images: [],
        color: '',
        sizes: [],
        price: undefined,
        comparePrice: undefined,
        discount: undefined,
        inventory: [
          { size: 'S', quantity: 0 },
          { size: 'M', quantity: 0 },
          { size: 'L', quantity: 0 },
          { size: 'XL', quantity: 0 },
          { size: '2XL', quantity: 0 },
        ],
        categoryId: undefined,
      });
      setFiles([]);
      setIsDiscountChecked(false);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add product. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      console.error(err);
    }
  };

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
            value={formData.title}
            onChange={(event) => handleInputChange('title', event.currentTarget.value)}
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
            value={formData.description}
            onChange={(event) => handleInputChange('description', event.currentTarget.value)}
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
              placeholder="Upload product images (Max 5)"
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
              value={files.map((file) => file.file)}
            />
            {files.length > 0 && (
              <SimpleGrid cols={isSmallScreen ? 3 : 8} spacing="xs" mt="sm">
                {previews}
              </SimpleGrid>
            )}
          </Box>
          <Select
            label="Category"
            placeholder="Select category"
            value={formData.categoryId?.toString()}
            onChange={(value) => handleInputChange('categoryId', value)}
            data={[
              { value: '1', label: 'T-Shirts' },
              { value: '2', label: 'Jackets' },
              { value: '3', label: 'Pants' },
              { value: '4', label: 'Accessories' },
            ]}
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

        {/* Right Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Color"
            placeholder="Select color"
            value={formData.color}
            onChange={(value) => handleInputChange('color', value || '')}
            data={['Red', 'Blue', 'Green', 'Black', 'White']}
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
          <MultiSelect
            label="Sizes"
            placeholder="Select sizes"
            value={formData.sizes}
            onChange={(value) => handleInputChange('sizes', value)}
            data={['XS', 'S', 'M', 'L', 'XL']}
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
          <NumberInput
            label="Price"
            placeholder="Enter price"
            value={formData.price}
            onChange={(value) => handleInputChange('price', value)}
            min={0}
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
          <NumberInput
            label="Compare Price"
            placeholder="Enter compare price"
            value={formData.comparePrice}
            onChange={(value) => handleInputChange('comparePrice', value)}
            min={0}
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
            <NumberInput
              label="Discount Percentage"
              placeholder="Enter discount percentage"
              value={formData.discount}
              onChange={(value) => handleInputChange('discount', value)}
              min={0}
              max={100}
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
              {formData.inventory.map((item) => (
                <Grid.Col span={4} key={item.size}>
                  <NumberInput
                    label={item.size}
                    value={item.quantity}
                    onChange={(value) => handleInventoryChange(item.size, value)}
                    min={0}
                    style={{ width: '70%' }}
                    styles={{
                      input: {
                        padding: '25px 20px',
                        borderRadius: ' начинать с 10px',
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
              ))}
            </Grid>
          </Box>
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="md">
        <Button c="white" style={{ backgroundColor: '#4C4E6A' }} onClick={handleSubmit}>
          Save Product
        </Button>
      </Group>
    </Box>
  );
};