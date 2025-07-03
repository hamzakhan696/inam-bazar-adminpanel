import { useMediaQuery } from "@mantine/hooks";
import { Modal, Box, Grid, TextInput, Group, Button, Textarea, SimpleGrid, FileInput, Image, MultiSelect } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from '@mantine/form';

interface AddCategoryProps {
  opened: boolean;
  onClose: () => void;
}

interface FileWithPreview {
  file: File;
  url: string;
  name: string;
}

interface Product {
  id: number;
  title: string;
}

export const AddCategoryModal = ({ opened, onClose }: AddCategoryProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 430px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      productIds: [] as string[],
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Title is required'),
      description: (value) => (value.trim().length > 0 ? null : 'Description is required'),
    },
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/products`);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const handleFileChange = (selectedFiles: File[] | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
        .slice(0, 5 - files.length)
        .map((file) => ({
          file,
          url: URL.createObjectURL(file),
          name: file.name,
        }));
      setFiles([...files, ...newFiles].slice(0, 5));
    }
  };

  const handleSave = async () => {
    if (!form.validate().hasErrors) {
      setIsLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append('name', form.values.name);
        formData.append('description', form.values.description);
        form.values.productIds.forEach((id) => formData.append('productIds[]', id));
        files.forEach((file) => formData.append('images', file.file));

        await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/categories`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        form.reset();
        setFiles([]);
        onClose();
      } catch (error) {
        console.error('Error saving category:', error);
        setError('Failed to save category. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const previews = files.map((file, index) => (
    <Box key={index} style={{ position: 'relative', width: '50px', height: '50px' }}>
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
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        setFiles([]);
        onClose();
      }}
      title="Add New Category"
      size="xxl"
      centered
      radius="xl"
      styles={{
        title: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#4C4E6A',
          padding: '20px',
        },
        body: {
          padding: isExtraSmallScreen ? '20px' : '20px 80px',
        },
      }}
    >
      <Box>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <Grid gutter="120px">
          {/* Left Column */}
          <Grid.Col span={isSmallScreen ? 12 : 6}>
            <TextInput
              label="Title"
              placeholder="Enter title"
              mb="sm"
              required
              style={{ width: '350px' }}
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
              {...form.getInputProps('name')}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              minRows={4}
              mb="sm"
              required
              style={{ width: '350px' }}
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
              {...form.getInputProps('description')}
            />
            <MultiSelect
              label="Products"
              placeholder="Select products"
              data={products.map(product => ({ value: product.id.toString(), label: product.title }))}
              searchable
              mb="sm"
              style={{ width: '350px' }}
              styles={{
                input: {
                  padding: '18px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
              {...form.getInputProps('productIds')}
            />
          </Grid.Col>

          {/* Right Column */}
          <Grid.Col span={isSmallScreen ? 12 : 6}>
            <Box>
              <FileInput
                label="Media"
                placeholder="Upload category images (up to 5)"
                accept="image/*"
                multiple
                required
                mb="sm"
                style={{ width: '350px' }}
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
                <SimpleGrid cols={isSmallScreen ? 3 : 6} spacing="xs" mt="sm">
                  {previews}
                </SimpleGrid>
              )}
            </Box>
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="md">
          <Button
            c="white"
            style={{ backgroundColor: '#53CCFF' }}
            onClick={handleSave}
            loading={isLoading}
          >
            Save
          </Button>
          <Button
            color="gray"
            onClick={() => {
              form.reset();
              setFiles([]);
              onClose();
            }}
          >
            Cancel
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};