import { Group, Box, Button, Paper, Table, Avatar, Modal, TextInput, Textarea, MultiSelect, SimpleGrid, FileInput, Image, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from '@mantine/form';
import { AddCategoryModal } from "./AddCategoryModal";

interface Category {
  id: number;
  name: string;
  images: string[];
  description: string;
  productsCount: number;
}

interface Product {
  id: number;
  title: string;
  categoryId: number;
  status: number;
}

interface FileWithPreview {
  file: File;
  url: string;
  name: string;
}

export const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editFiles, setEditFiles] = useState<FileWithPreview[]>([]);

  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(max-width: 1440px)');
  const containerMargin = isExtraSmallScreen 
    ? '5px' 
    : isSmallScreen 
      ? '10px' 
      : isMediumScreen 
        ? '15px' 
        : isLargeScreen 
          ? '20px' 
          : '30px';

  const containerWidth = `calc(100vw - ${containerMargin} * 2)`;

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

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Category[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/categories`);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again.');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/products`);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCheckbox = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId) 
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      setSelectAll(newSelection.length === categories.length);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
      setSelectAll(false);
    } else {
      setSelectedCategories(categories.map(c => c.id));
      setSelectAll(true);
    }
  };

  const handleEdit = () => {
    const category = categories.find(c => c.id === selectedCategories[0]);
    if (category) {
      setEditingCategory(category);
      form.setValues({
        name: category.name,
        description: category.description,
        productIds: products.filter(p => p.categoryId === category.id).map(p => p.id.toString()),
      });
      setEditFiles(category.images.map((url, index) => ({
        file: new File([], `image-${index}.png`),
        url: getImageUrl(url),
        name: `image-${index}.png`,
      })));
      setEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedCategories.map(id => 
        axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/categories/${id}`)
      ));
      setCategories(categories.filter(c => !selectedCategories.includes(c.id)));
      setSelectedCategories([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error deleting categories:', error);
      setError('Failed to delete categories. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    if (editingCategory && !form.validate().hasErrors) {
      setIsLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append('name', form.values.name);
        formData.append('description', form.values.description);
        form.values.productIds.forEach((id) => formData.append('productIds[]', id));
        editFiles.forEach((file) => formData.append('images', file.file));

        const response = await axios.patch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/categories/${editingCategory.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        setCategories(categories.map(c => c.id === editingCategory.id ? response.data : c));
        setEditModalOpen(false);
        setEditingCategory(null);
        setEditFiles([]);
        form.reset();
      } catch (error) {
        console.error('Error updating category:', error);
        setError('Failed to update category. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditFileChange = (selectedFiles: File[] | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
        .slice(0, 5 - editFiles.length)
        .map((file) => ({
          file,
          url: URL.createObjectURL(file),
          name: file.name,
        }));
      setEditFiles([...editFiles, ...newFiles].slice(0, 5));
    }
  };

  const getImageUrl = (image: string) => {
    if (!image) {
      console.warn('Image path is empty or undefined');
      return 'https://via.placeholder.com/150';
    }
    const isAbsoluteUrl = image.startsWith('http');
    return isAbsoluteUrl ? image : `${import.meta.env.VITE_APP_API_BASE_IMAGE_URL}/${image}`;
  };

  const getProductCondition = (categoryId: number) => {
    const categoryProducts = products.filter(p => p.categoryId === categoryId);
    const activeCount = categoryProducts.filter(p => p.status === 1).length;
    const inactiveCount = categoryProducts.filter(p => p.status === 0).length;
    return `${activeCount} Active, ${inactiveCount} Inactive`;
  };

  const renderTableHeader = () => {
    if (selectedCategories.length > 0) {
      return (
        <thead>
          <tr>
            <th style={{ padding: '12px' }}>
              <input 
                type="checkbox" 
                style={{ width: '20px', height: '20px' }} 
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th colSpan={3} style={{ padding: '12px' }}>
              <Group justify="flex-start">
                {selectAll ? (
                  <Button color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : (
                  <>
                    <Button
                      color="blue"
                      onClick={handleEdit}
                      disabled={selectedCategories.length !== 1}
                    >
                      Edit
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </Group>
            </th>
          </tr>
        </thead>
      );
    }

    return (
      <thead>
        <tr>
          <th style={{ padding: '12px' }}>
            <input 
              type="checkbox" 
              style={{ width: '20px', height: '20px' }} 
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Title</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Products</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Product Condition</th>
        </tr>
      </thead>
    );
  };

  return (
    <Box
      style={{
        marginLeft: containerMargin,
        marginRight: containerMargin,
        maxWidth: containerWidth,
        boxSizing: 'border-box',
        paddingBottom: '20px',
      }}
    >
      <Group justify="space-between" wrap="wrap" gap="sm" style={{ marginBottom: '0px' }}>
        <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '24px' : '35px' 
        }}>
          Categories
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={handleOpenModal}
        >
          Add New Category
        </Button>
      </Group>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>
        <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#4C4E6A' }}>All</span>
        </Group>
        {isLoading && <div>Loading categories...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!isLoading && !error && categories.length === 0 && <div>No categories available.</div>}
        {!isLoading && !error && categories.length > 0 && (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              {renderTableHeader()}
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="checkbox" 
                        style={{ width: '20px', height: '20px' }} 
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCheckbox(category.id)}
                      />
                    </td>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Avatar 
                        src={category.images && category.images.length > 0 ? getImageUrl(category.images[0]) : 'https://via.placeholder.com/150'} 
                        radius="lg" 
                        size="lg" 
                        alt={category.name}
                        onError={() => console.error('Failed to load image for category:', category.name)}
                      />
                      {category.name}
                    </td>
                    <td style={{ padding: '12px' }}>{category.productsCount}</td>
                    <td style={{ padding: '12px' }}>{getProductCondition(category.id)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Paper>

      <AddCategoryModal opened={isModalOpen} onClose={handleCloseModal} />

      <Modal
        opened={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingCategory(null);
          setEditFiles([]);
          form.reset();
        }}
        title="Edit Category"
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
          <Grid gutter="xl">
            <Grid.Col span={isSmallScreen ? 12 : 6}>
              <TextInput
                label="Title"
                placeholder="Enter title"
                mb="sm"
                required
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
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
                {...form.getInputProps('productIds')}
              />
            </Grid.Col>
            <Grid.Col span={isSmallScreen ? 12 : 6}>
              <Box>
                <FileInput
                  label="Media"
                  placeholder="Upload category images (up to 5)"
                  accept="image/*"
                  multiple
                  mb="sm"
                  style={{ width: '100%' }}
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
                  onChange={handleEditFileChange}
                  value={editFiles.map((file) => file.file)}
                />
                {editFiles.length > 0 && (
                  <SimpleGrid cols={isSmallScreen ? 3 : 6} spacing="xs" mt="sm">
                    {editFiles.map((file, index) => (
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
                    ))}
                  </SimpleGrid>
                )}
              </Box>
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="md">
            <Button
              c="white"
              style={{ backgroundColor: '#53CCFF' }}
              onClick={handleSaveEdit}
              loading={isLoading}
            >
              Save
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setEditModalOpen(false);
                setEditingCategory(null);
                setEditFiles([]);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
};