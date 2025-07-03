import { Group, Box, Button, Paper, Tabs, Table, Avatar, FloatingIndicator, Modal, TextInput, Select, MultiSelect, NumberInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect, useRef } from "react";
import classes from '../TabCSS/products.module.css';
import { AddProduct } from "./AddProduct";
import { AddLottery } from "./AddLottery";
import axios from 'axios';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface Category {
  id: number;
  name: string;
  images: string[] | null;
  description: string;
  productIds: number[] | null;
}

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  color: string;
  sizes: string[];
  price: number;
  comparePrice: number;
  discount: number;
  totalQuantity: number;
  categoryId: number;
  category: Category;
  status: number;
  inventory: any[];
}

interface Lottery {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  quantity: number;
  price: number;
  images: string[];
  status: string;
}

export const Products = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [value, setValue] = useState<string | null>('1');
  const [products, setProducts] = useState<Product[]>([]);
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredLotteries, setFilteredLotteries] = useState<Lottery[]>([]);
  const [productFilter, setProductFilter] = useState<string>('All');
  const [lotteryFilter, setLotteryFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedLotteries, setSelectedLotteries] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | Lottery | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectAllProducts, setSelectAllProducts] = useState(false);
  const [selectAllLotteries, setSelectAllLotteries] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      categoryId: '',
      status: '',
      color: '',
      sizes: [] as string[],
      startDate: '',
      endDate: '',
    },
  });

  const setControlRef = (val: string) => (node: HTMLButtonElement | null) => {
    controlsRefs.current[val] = node;
  };

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
          ? 'helves20px' 
          : '30px';

  const containerWidth = `calc(100vw - ${containerMargin} * 2)`;

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/products`);
      const data = Array.isArray(response.data) ? response.data : [];
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLotteries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Lottery[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/lotteries`);
      const data = Array.isArray(response.data) ? response.data : [];
      setLotteries(data);
      setFilteredLotteries(data);
    } catch (error) {
      console.error('Error fetching lotteries:', error);
      setError('Failed to fetch lotteries. Please try again.');
      setLotteries([]);
      setFilteredLotteries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/categories`);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLotteries();
    fetchCategories();
  }, []);

  const handleProductFilter = (filter: string) => {
    setProductFilter(filter);
    setSelectedProducts([]);
    setSelectAllProducts(false);
    if (filter === 'All') {
      setFilteredProducts(products);
    } else if (filter === 'Active') {
      setFilteredProducts(products.filter((product) => product.status === 1));
    } else if (filter === 'Inactive') {
      setFilteredProducts(products.filter((product) => product.status === 0));
    }
  };

  const handleLotteryFilter = (filter: string) => {
    setLotteryFilter(filter);
    setSelectedLotteries([]);
    setSelectAllLotteries(false);
    if (filter === 'All') {
      setFilteredLotteries(lotteries);
    } else if (filter === 'Active') {
      setFilteredLotteries(lotteries.filter((lottery) => lottery.status.toLowerCase() === 'active'));
    } else if (filter === 'Inactive') {
      setFilteredLotteries(lotteries.filter((lottery) => lottery.status.toLowerCase() === 'inactive'));
    }
  };

  const handleProductCheckbox = (productId: number) => {
    setSelectedProducts((prev) => {
      const newSelection = prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      setSelectAllProducts(newSelection.length === filteredProducts.length);
      return newSelection;
    });
  };

  const handleLotteryCheckbox = (lotteryId: number) => {
    setSelectedLotteries((prev) => {
      const newSelection = prev.includes(lotteryId) 
        ? prev.filter((id) => id !== lotteryId)
        : [...prev, lotteryId];
      setSelectAllLotteries(newSelection.length === filteredLotteries.length);
      return newSelection;
    });
  };

  const handleSelectAllProducts = () => {
    if (selectAllProducts) {
      setSelectedProducts([]);
      setSelectAllProducts(false);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
      setSelectAllProducts(true);
    }
  };

  const handleSelectAllLotteries = () => {
    if (selectAllLotteries) {
      setSelectedLotteries([]);
      setSelectAllLotteries(false);
    } else {
      setSelectedLotteries(filteredLotteries.map(l => l.id));
      setSelectAllLotteries(true);
    }
  };

  const handleEdit = () => {
    const isProductTab = value === '1';
    const selectedId = isProductTab ? selectedProducts[0] : selectedLotteries[0];
    const item = isProductTab 
      ? products.find(p => p.id === selectedId)
      : lotteries.find(l => l.id === selectedId);
    
    if (item) {
      setEditingItem(item);
      form.setValues({
        title: item.title,
        description: item.description,
        price: item.price,
        quantity: 'totalQuantity' in item ? item.totalQuantity : item.quantity,
        categoryId: 'categoryId' in item ? item.categoryId.toString() : '',
        status: 'status' in item ? (typeof item.status === 'number' ? item.status.toString() : item.status) : '',
        color: 'color' in item ? item.color : '',
        sizes: 'sizes' in item && Array.isArray(item.sizes) ? item.sizes : [],
        startDate: 'startDate' in item ? item.startDate : '',
        endDate: 'endDate' in item ? item.endDate : '',
      });
      setEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    const isProductTab = value === '1';
    const selectedItems = isProductTab ? selectedProducts : selectedLotteries;
    const endpoint = isProductTab ? 'products' : 'lotteries';

    try {
      await Promise.all(selectedItems.map(id => 
        axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/${endpoint}/${id}`)
      ));
      if (isProductTab) {
        setProducts(products.filter(p => !selectedProducts.includes(p.id)));
        setFilteredProducts(filteredProducts.filter(p => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
        setSelectAllProducts(false);
      } else {
        setLotteries(lotteries.filter(l => !selectedLotteries.includes(l.id)));
        setFilteredLotteries(filteredLotteries.filter(l => !selectedLotteries.includes(l.id)));
        setSelectedLotteries([]);
        setSelectAllLotteries(false);
      }
    } catch (error) {
      console.error('Error deleting items:', error);
      setError(`Failed to delete ${isProductTab ? 'products' : 'lotteries'}. Please try again.`);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const isProductTab = value === '1';
    const endpoint = isProductTab ? 'products' : 'lotteries';
    
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/${endpoint}/${editingItem.id}`,
        {
          ...form.values,
          categoryId: form.values.categoryId ? parseInt(form.values.categoryId) : undefined,
          status: isProductTab ? parseInt(form.values.status) : form.values.status,
          totalQuantity: isProductTab ? form.values.quantity : undefined,
          quantity: !isProductTab ? form.values.quantity : undefined,
        }
      );

      if (isProductTab) {
        setProducts(products.map(p => p.id === editingItem.id ? response.data : p));
        setFilteredProducts(filteredProducts.map(p => p.id === editingItem.id ? response.data : p));
      } else {
        setLotteries(lotteries.map(l => l.id === editingItem.id ? response.data : l));
        setFilteredLotteries(filteredLotteries.map(l => l.id === editingItem.id ? response.data : l));
      }
      setEditModalOpen(false);
      setEditingItem(null);
      form.reset();
    } catch (error) {
      console.error('Error updating item:', error);
      setError(`Failed to update ${isProductTab ? 'product' : 'lottery'}. Please try again.`);
    }
  };

  const getProductStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return { label: 'Active', color: '#D4F6E6' };
      case 0:
        return { label: 'Inactive', color: '#FFE4E4' };
      default:
        return { label: 'Unknown', color: '#EDEDED' };
    }
  };

  const getLotteryStatusLabel = (status: string) => {
    const statusStr = status.toLowerCase();
    switch (statusStr) {
      case 'active':
        return { label: status, color: '#D4F6E6' };
      case 'inactive':
        return { label: status, color: '#FFE4E4' };
      default:
        return { label: status, color: '#EDEDED' };
    }
  };

  const getImageUrl = (image: string) => {
  if (!image) {
    console.warn('Image path is empty or undefined');
    return 'https://via.placeholder.com/150';
  }
  const isAbsoluteUrl = image.startsWith('http');
  const imageUrl = isAbsoluteUrl
    ? image
    : `${import.meta.env.VITE_APP_API_BASE_IMAGE_URL}/${image}`;
  return imageUrl;
};

const handleLotteryStatusChange = async (lotteryId: number, newStatus: string) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/lotteries/${lotteryId}`,
      { status: newStatus }
    );
    setLotteries(lotteries.map(l => l.id === lotteryId ? response.data : l));
    setFilteredLotteries(filteredLotteries.map(l => l.id === lotteryId ? response.data : l));
    notifications.show({
      title: 'Success',
      message: 'Status changed successfully!',
      color: 'teal',
      icon: <IconCheck size={18} />,
      autoClose: 3000,
    });
  } catch (error) {
    console.error('Failed to update lottery status:', error);
    notifications.show({
      title: 'Error',
      message: 'Failed to change status. Please try again.',
      color: 'red',
      icon: <IconX size={18} />,
      autoClose: 3000,
    });
  }
};

  const renderTableHeader = (isProductTab: boolean) => {
    const isAnySelected = isProductTab ? selectedProducts.length > 0 : selectedLotteries.length > 0;
    const isSelectAll = isProductTab ? selectAllProducts : selectAllLotteries;

    if (isAnySelected) {
      return (
        <thead>
          <tr>
            <th style={{ padding: '12px' }}>
            <input 
              type="checkbox" 
              style={{ width: '20px', height: '20px' }} 
              checked={isProductTab ? selectAllProducts : selectAllLotteries}
              onChange={isProductTab ? handleSelectAllProducts : handleSelectAllLotteries}
            />
            </th>
            <th colSpan={isProductTab ? 5 : 5} style={{ padding: '12px' }}>
              <Group justify="flex-start">
                {isSelectAll ? (
                  <Button color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : (
                  <>
                    <Button
                      color="blue"
                      onClick={handleEdit}
                      disabled={isProductTab ? selectedProducts.length !== 1 : selectedLotteries.length !== 1}
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
              checked={isProductTab ? selectAllProducts : selectAllLotteries}
              onChange={isProductTab ? handleSelectAllProducts : handleSelectAllLotteries}
            />
          </th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>{isProductTab ? 'Product' : 'Campaign Name'}</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Status</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Inventory</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>{isProductTab ? 'Category' : 'Closed In'}</th>
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
          Products
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={() => setValue('3')}
        >
          Add Product
        </Button>
        <Button 
          c="white" 
          style={{ backgroundColor: '#53CCFF'}} 
          onClick={() => setValue('4')}
        >
          Add Lottery
        </Button>
      </Group>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>
        <Tabs value={value} onChange={setValue} variant="none">
          <Tabs.List ref={rootRef} className={classes.list}>
            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
              All Products
            </Tabs.Tab>
            <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
              All Lottery
            </Tabs.Tab>
            <FloatingIndicator
              target={value ? controlsRefs.current[value] : null}
              parent={rootRef.current}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="1" pt="xs">
            <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
              <Button
                variant={productFilter === 'All' ? 'filled' : 'outline'}
                color={productFilter === 'All' ? '#4C4E6A' : 'gray'}
                onClick={() => handleProductFilter('All')}
                style={{ marginRight: '10px' }}
              >
                All
              </Button>
              <Button
                variant={productFilter === 'Active' ? 'filled' : 'outline'}
                color={productFilter === 'Active' ? '#4C4E6A' : 'gray'}
                onClick={() => handleProductFilter('Active')}
                style={{ marginRight: '10px' }}
              >
                Active
              </Button>
              <Button
                variant={productFilter === 'Inactive' ? 'filled' : 'outline'}
                color={productFilter === 'Inactive' ? '#4C4E6A' : 'gray'}
                onClick={() => handleProductFilter('Inactive')}
                style={{ marginRight: '10px' }}
              >
                Inactive
              </Button>
            </Group>
            {isLoading && <div>Loading products...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!isLoading && !error && filteredProducts.length === 0 && <div>No products available.</div>}
            {!isLoading && !error && filteredProducts.length > 0 && (
              <div style={{ overflowX: "auto", width: "100%" }}>
                <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
                  {renderTableHeader(true)}
                  <tbody>
                    {filteredProducts.map((product) => {
                      const status = getProductStatusLabel(product.status);
                      return (
                        <tr key={product.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                          <td style={{ padding: '12px' }}>
                            <input 
                              type="checkbox" 
                              style={{ width: '20px', height: '20px' }} 
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleProductCheckbox(product.id)}
                            />
                          </td>
                          <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* <Avatar 
                              src={product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : 'https://via.placeholder.com/150'} 
                              radius="lg" 
                              size="lg" 
                              alt={product.title}
                            /> */}
                            <Avatar
                              src={product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : 'https://via.placeholder.com/150'}
                              radius="lg"
                              size="lg"
                              alt={product.title}
                              onError={() => console.error('Failed to load image for product:', product.title)}
                            />
                            {product.title}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ backgroundColor: status.color, padding: '5px 10px', borderRadius: '5px' }}>
                              {status.label}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: '#FF002E' }}>{product.totalQuantity} in Stocks</td>
                          <td style={{ padding: '12px' }}>{product.category.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <Group justify="flex-start" style={{ margin: '10px 0', backgroundColor: '#EDEDED', padding: '15px', borderRadius: '10px' }}>
              <Button
                variant={lotteryFilter === 'All' ? 'filled' : 'outline'}
                color={lotteryFilter === 'All' ? '#4C4E6A' : 'gray'}
                onClick={() => handleLotteryFilter('All')}
                style={{ marginRight: '10px' }}
              >
                All
              </Button>
              <Button
                variant={lotteryFilter === 'Active' ? 'filled' : 'outline'}
                color={lotteryFilter === 'Active' ? '#4C4E6A' : 'gray'}
                onClick={() => handleLotteryFilter('Active')}
                style={{ marginRight: '10px' }}
              >
                Active
              </Button>
              <Button
                variant={lotteryFilter === 'Inactive' ? 'filled' : 'outline'}
                color={lotteryFilter === 'Inactive' ? '#4C4E6A' : 'gray'}
                onClick={() => handleLotteryFilter('Inactive')}
                style={{ marginRight: '10px' }}
              >
                Inactive
              </Button>
            </Group>
            {isLoading && <div>Loading lotteries...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!isLoading && !error && filteredLotteries.length === 0 && <div>No lotteries available.</div>}
            {!isLoading && !error && filteredLotteries.length > 0 && (
              <div style={{ overflowX: "auto", width: "100%" }}>
                <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
                  {renderTableHeader(false)}
                  <tbody>
                    {filteredLotteries.map((lottery) => {
                      const endDate = new Date(lottery.endDate);
                      const formattedEndDate = endDate.toLocaleDateString();
                      return (
                        <tr key={lottery.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                          <td style={{ padding: '12px' }}>
                            <input 
                              type="checkbox" 
                              style={{ width: '20px', height: '20px' }} 
                              checked={selectedLotteries.includes(lottery.id)}
                              onChange={() => handleLotteryCheckbox(lottery.id)}
                            />
                          </td>
                          <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Avatar 
                              src={lottery.images && lottery.images.length > 0 ? getImageUrl(lottery.images[0]) : 'https://via.placeholder.com/150'} 
                              radius="lg" 
                              size="lg" 
                              alt={lottery.title}
                            />
                            {lottery.title}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <Select
                              value={lottery.status}
                              onChange={(value) => handleLotteryStatusChange(lottery.id, value as string)}
                              data={['active', 'inactive']}
                              style={{ width: '30%' }}
                              styles={{
                                input: { 
                                  backgroundColor: getLotteryStatusLabel(lottery.status).color,
                                  padding: '5px 10px',
                                  borderRadius: '5px',
                                  border: 'none',
                                }
                              }}
                            />
                          </td>
                          <td style={{ padding: '12px', color: '#FF002E' }}>{lottery.quantity} in Stocks</td>
                          <td style={{ padding: '12px' }}>{formattedEndDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="3" pt="xs">
            <AddProduct fetchProducts={fetchProducts} />
          </Tabs.Panel>

          <Tabs.Panel value="4" pt="xs">
            <AddLottery fetchLotteries={fetchLotteries} />
          </Tabs.Panel>
        </Tabs>
      </Paper>

      <Modal
        opened={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
          form.reset();
        }}
        title={value === '1' ? 'Edit Product' : 'Edit Lottery'}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSaveEdit)}>
          <TextInput
            label="Title"
            placeholder="Enter title"
            {...form.getInputProps('title')}
            mb="md"
          />
          <TextInput
            label="Description"
            placeholder="Enter description"
            {...form.getInputProps('description')}
            mb="md"
          />
          <NumberInput
            label="Price"
            placeholder="Enter price"
            {...form.getInputProps('price')}
            mb="md"
          />
          <NumberInput
            label={value === '1' ? 'Total Quantity' : 'Quantity'}
            placeholder="Enter quantity"
            {...form.getInputProps('quantity')}
            mb="md"
          />
          {value === '1' && (
            <>
              <Select
                label="Category"
                placeholder="Select category"
                data={categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))}
                {...form.getInputProps('categoryId')}
                mb="md"
              />
              <Select
                label="Status"
                placeholder="Select status"
                data={[
                  { value: '1', label: 'Active' },
                  { value: '0', label: 'Inactive' },
                ]}
                {...form.getInputProps('status')}
                mb="md"
              />
              <TextInput
                label="Color"
                placeholder="Enter color"
                {...form.getInputProps('color')}
                mb="md"
              />
              <MultiSelect
                label="Sizes"
                placeholder="Select sizes"
                data={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                {...form.getInputProps('sizes')}
                mb="md"
              />
            </>
          )}
          {value === '2' && (
            <>
              <Select
                label="Status"
                placeholder="Select status"
                data={['active', 'inactive']}
                {...form.getInputProps('status')}
                mb="md"
              />
              <TextInput
                label="Start Date"
                type="date"
                {...form.getInputProps('startDate')}
                mb="md"
              />
              <TextInput
                label="End Date"
                type="date"
                {...form.getInputProps('endDate')}
                mb="md"
              />
            </>
          )}
          <Group justify="flex-end" mt="md">
            <Button type="submit" color="blue">
              Save
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setEditModalOpen(false);
                setEditingItem(null);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
    </Box>
  );
};