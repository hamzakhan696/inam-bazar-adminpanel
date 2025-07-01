import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Textarea,
  FileInput,
  Group,
  Button,
  Image,
  SimpleGrid,
  Select,
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
  startDate: string;
  endDate: string;
  quantity: string;
  price: string;
  status: string;
}

export const AddLottery = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    quantity: '',
    price: '',
    status: 'active',
  });
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || !formData.quantity || !formData.price || !formData.status) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('endDate', formData.endDate);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('status', formData.status);
      
      files.forEach((file) => {
        formDataToSend.append('images', file.file);
      });

      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/lotteries`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notifications.show({
        title: 'Success',
        message: 'Lottery created successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        quantity: '',
        price: '',
        status: 'active',
      });
      setFiles([]);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create lottery. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      console.error(err);
    } finally {
      setLoading(false);
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
        Add New Lottery
      </h1>
      <form onSubmit={handleSubmit}>
        <Grid gutter="md">
          {/* Left Column */}
          <Grid.Col span={isSmallScreen ? 12 : 6}>
            <TextInput
              label="Title"
              placeholder="Enter product title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
              />
              {files.length > 0 && (
                <SimpleGrid cols={isSmallScreen ? 3 : 8} spacing="xs" mt="sm">
                  {previews}
                </SimpleGrid>
              )}
            </Box>
            <TextInput
              label="Price"
              placeholder="00"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
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
            <TextInput
              label="Start Date & Time"
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
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
              label="Close Date & Time"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
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
              label="Quantity"
              placeholder="0000"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
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
              label="Status"
              placeholder="Select status"
              name="status"
              value={formData.status}
              onChange={(value) => setFormData((prev) => ({ ...prev, status: value || 'active' }))}
              data={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
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
        </Grid>
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            c="white"
            style={{ backgroundColor: '#4C4E6A' }}
            loading={loading}
            disabled={loading}
          >
            Save Lottery
          </Button>
        </Group>
      </form>
    </Box>
  );
};