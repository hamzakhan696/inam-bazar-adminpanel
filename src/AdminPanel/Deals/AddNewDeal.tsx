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
  Image,
  SimpleGrid,
  NumberInput,
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

interface FormData {
  title: string;
  description: string;
  images: string[];
  productId: number | undefined;
  lotteryId: number | undefined;
  price: number | undefined;
  comparePrice: number | undefined;
  discount: number | undefined;
  quantity: number | undefined;
}

interface Product {
  id: number;
  title: string;
}

interface Lottery {
  id: number;
  title: string;
}

interface AddNewDealProps {
  fetchDeals: () => Promise<void>;
}


export const AddNewDeal = ({ fetchDeals }: AddNewDealProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    images: [],
    productId: undefined,
    lotteryId: undefined,
    price: undefined,
    comparePrice: undefined,
    discount: undefined,
    quantity: undefined,
  });
  const [isDiscountChecked, setIsDiscountChecked] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, lotteriesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/products`),
          axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/lotteries`),
        ]);

        setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
        setLotteries(Array.isArray(lotteriesResponse.data) ? lotteriesResponse.data : []);
      } catch (err) {
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch products or lotteries. Please try again.',
          color: 'red',
          icon: <IconX size={18} />,
          autoClose: 3000,
        });
        setProducts([]);
        setLotteries([]);
      }
    };
    fetchData();
  }, []);

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
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles.map((f) => f.name)].slice(0, 5),
      }));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === 'productId' || field === 'lotteryId') {
      setFormData((prev) => ({ ...prev, [field]: value ? Number(value) : undefined }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.quantity || !formData.productId) {
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
      formDataToSend.append('productId', formData.productId!.toString());
      if (formData.lotteryId) {
        formDataToSend.append('lotteryId', formData.lotteryId.toString());
      }
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('comparePrice', formData.comparePrice?.toString() || '0');
      formDataToSend.append('discount', formData.discount?.toString() || '0');
      formDataToSend.append('quantity', formData.quantity.toString());

      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/deals`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notifications.show({
        title: 'Success',
        message: 'Deal added successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      await fetchDeals();

      setFormData({
        title: '',
        description: '',
        images: [],
        productId: undefined,
        lotteryId: undefined,
        price: undefined,
        comparePrice: undefined,
        discount: undefined,
        quantity: undefined,
      });
      setFiles([]);
      setIsDiscountChecked(false);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add deal. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
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
          Add New Deal
        </h1>
      <Grid gutter="md">
        {/* Left Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="Title"
            placeholder="Enter deal title"
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
            placeholder="Enter deal description"
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
              placeholder="Upload deal images (Max 5)"
              accept="image/*"
              multiple
              mb="sm"
              onChange={handleFileChange}
              value={files.map((file) => file.file)}
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
            />
            {files.length > 0 && (
              <SimpleGrid cols={isSmallScreen ? 3 : 8} spacing="xs" mt="sm">
                {previews}
              </SimpleGrid>
            )}
          </Box>
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <Select
            label="Product"
            placeholder="Select product"
            value={formData.productId ? formData.productId.toString() : null}
            onChange={(value) => handleInputChange('productId', value)}
            data={products
              .filter((product) => product.id && product.title)
              .map((product) => ({
                value: product.id.toString(),
                label: product.title,
              }))}
            mb="sm"
            required
            searchable
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
              dropdown: {
                zIndex: 1000,
              },
            }}
          />
          <Select
            label="Lottery"
            placeholder="Select lottery"
            value={formData.lotteryId ? formData.lotteryId.toString() : null}
            onChange={(value) => handleInputChange('lotteryId', value)}
            data={lotteries
              .filter((lottery) => lottery.id && lottery.title)
              .map((lottery) => ({
                value: lottery.id.toString(),
                label: lottery.title,
              }))}
            mb="sm"
            searchable
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
              dropdown: {
                zIndex: 1000,
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
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(value) => handleInputChange('quantity', value)}
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
        </Grid.Col>
      </Grid>
      <Group justify="flex-end" mt="md">
        <Button c="white" style={{ backgroundColor: '#4C4E6A' }} onClick={handleSubmit}>
          Save Deal
        </Button>
      </Group>
    </Box>
  );
};