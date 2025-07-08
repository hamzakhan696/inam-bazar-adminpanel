import { Group, Box, Button, Paper, Tabs, Table, FloatingIndicator, Modal, TextInput, MultiSelect, NumberInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect, useRef } from "react";
import classes from '../TabCSS/products.module.css';
import { AddNewDiscount } from "./AddNewDiscount";
import axios from 'axios';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
}

interface Discount {
  id: number;
  discountCode: string;
  discountValue: number;
  categoryIds: number[] | null;
  productIds: number[] | null;
  maximumDiscountUses: number;
  combination: string[];
  startDate: string;
  endDate: string;
}

export const Discounts = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [value, setValue] = useState<string | null>('1');
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [filteredDiscounts, setFilteredDiscounts] = useState<Discount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Discount | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectAllDiscounts, setSelectAllDiscounts] = useState(false);

  const form = useForm({
    initialValues: {
      discountCode: '',
      discountValue: 0,
      categoryIds: [] as string[],
      productIds: [] as string[],
      maximumDiscountUses: 0,
      combination: [] as string[],
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
          ? '20px' 
          : '30px';

  const containerWidth = `calc(100vw - ${containerMargin} * 2)`;

  const fetchDiscounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Discount[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/discounts`);
      const data = Array.isArray(response.data) ? response.data : [];
      console.log('Discounts API response:', data);
      setDiscounts(data);
      setFilteredDiscounts(data);
    } catch (error) {
      console.error('Error fetching discounts:', error);
      setError('Failed to fetch discounts. Please try again.');
      setDiscounts([]);
      setFilteredDiscounts([]);
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/products`);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
    fetchCategories();
    fetchProducts();
  }, []);

  const handleDiscountCheckbox = (discountId: number) => {
    setSelectedDiscounts((prev) => {
      const newSelection = prev.includes(discountId) 
        ? prev.filter((id) => id !== discountId)
        : [...prev, discountId];
      setSelectAllDiscounts(newSelection.length === filteredDiscounts.length);
      return newSelection;
    });
  };

  const handleSelectAllDiscounts = () => {
    if (selectAllDiscounts) {
      setSelectedDiscounts([]);
      setSelectAllDiscounts(false);
    } else {
      setSelectedDiscounts(filteredDiscounts.map(d => d.id));
      setSelectAllDiscounts(true);
    }
  };

  const handleEdit = () => {
    const discount = discounts.find(d => d.id === selectedDiscounts[0]);
    if (discount) {
      setEditingItem(discount);
      form.setValues({
        discountCode: discount.discountCode,
        discountValue: discount.discountValue,
        categoryIds: discount.categoryIds ? discount.categoryIds.map(id => id.toString()) : [],
        productIds: discount.productIds ? discount.productIds.map(id => id.toString()) : [],
        maximumDiscountUses: discount.maximumDiscountUses,
        combination: discount.combination,
        startDate: discount.startDate.split('T')[0],
        endDate: discount.endDate.split('T')[0],
      });
      setEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedDiscounts.map(id => 
        axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/discounts/${id}`)
      ));
      setDiscounts(discounts.filter(d => !selectedDiscounts.includes(d.id)));
      setFilteredDiscounts(filteredDiscounts.filter(d => !selectedDiscounts.includes(d.id)));
      setSelectedDiscounts([]);
      setSelectAllDiscounts(false);
      notifications.show({
        title: 'Success',
        message: 'Discounts deleted successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting discounts:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete discounts. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/discounts/${editingItem.id}`,
        {
          ...form.values,
          categoryIds: form.values.categoryIds.map(id => parseInt(id)),
          productIds: form.values.productIds.map(id => parseInt(id)),
        }
      );
      setDiscounts(discounts.map((d: Discount) => d.id === editingItem.id ? response.data : d));
      setFilteredDiscounts(filteredDiscounts.map((d: Discount) => d.id === editingItem.id ? response.data : d));
      setEditModalOpen(false);
      setEditingItem(null);
      form.reset();
      notifications.show({
        title: 'Success',
        message: 'Discount updated successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating discount:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update discount. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
    }
  };

  const renderTableHeader = () => {
    const isAnySelected = selectedDiscounts.length > 0;

    if (isAnySelected) {
      return (
        <thead>
          <tr>
            <th style={{ padding: '12px' }}>
              <input 
                type="checkbox" 
                style={{ width: '20px', height: '20px' }} 
                checked={selectAllDiscounts}
                onChange={handleSelectAllDiscounts}
              />
            </th>
            <th colSpan={6} style={{ padding: '12px' }}>
              <Group justify="flex-start">
                {selectedDiscounts.length === filteredDiscounts.length ? (
                  <Button color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : (
                  <>
                    <Button
                      color="blue"
                      onClick={handleEdit}
                      disabled={selectedDiscounts.length !== 1}
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
              checked={selectAllDiscounts}
              onChange={handleSelectAllDiscounts}
            />
          </th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Discount Code</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Categories</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Products</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Start Date</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>End Date</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Discount Value</th>
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
          Discounts
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={() => setValue('2')}
        >
          Add New Discount
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
              All Discounts
            </Tabs.Tab>
            <FloatingIndicator
              target={value ? controlsRefs.current[value] : null}
              parent={rootRef.current}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="1" pt="xs">
            {isLoading && <div>Loading discounts...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!isLoading && !error && filteredDiscounts.length === 0 && <div>No discounts available.</div>}
            {!isLoading && !error && filteredDiscounts.length > 0 && (
              <div style={{ overflowX: "auto", width: "100%" }}>
                <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
                  {renderTableHeader()}
                  <tbody>
                    {filteredDiscounts.map((discount) => {
                      const formattedStartDate = new Date(discount.startDate).toLocaleDateString();
                      const formattedEndDate = new Date(discount.endDate).toLocaleDateString();
                      const categoryNames = discount.categoryIds
                        ? categories.filter(cat => discount.categoryIds!.includes(cat.id)).map(cat => cat.name).join(', ') || 'null'
                        : 'null';
                      const productNames = discount.productIds
                        ? products.filter(prod => discount.productIds!.includes(prod.id)).map(prod => prod.title).join(', ') || 'null'
                        : 'null';
                      return (
                        <tr key={discount.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                          <td style={{ padding: '12px' }}>
                            <input 
                              type="checkbox" 
                              style={{ width: '20px', height: '20px' }} 
                              checked={selectedDiscounts.includes(discount.id)}
                              onChange={() => handleDiscountCheckbox(discount.id)}
                            />
                          </td>
                          <td style={{ padding: '12px' }}>{discount.discountCode}</td>
                          <td style={{ padding: '12px' }}>{categoryNames}</td>
                          <td style={{ padding: '12px' }}>{productNames}</td>
                          <td style={{ padding: '12px' }}>{formattedStartDate}</td>
                          <td style={{ padding: '12px' }}>{formattedEndDate}</td>
                          <td style={{ padding: '12px' }}>{discount.discountValue}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <AddNewDiscount fetchDiscounts={fetchDiscounts} />
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
        title="Edit Discount"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSaveEdit)}>
          <TextInput
            label="Discount Code"
            placeholder="Enter discount code"
            {...form.getInputProps('discountCode')}
            mb="md"
          />
          <NumberInput
            label="Discount Value (%)"
            placeholder="Enter discount value"
            {...form.getInputProps('discountValue')}
            mb="md"
          />
          <MultiSelect
            label="Categories"
            placeholder="Select categories"
            data={categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))}
            {...form.getInputProps('categoryIds')}
            mb="md"
          />
          <MultiSelect
            label="Products"
            placeholder="Select products"
            data={products.map(prod => ({ value: prod.id.toString(), label: prod.title }))}
            {...form.getInputProps('productIds')}
            mb="md"
          />
          <NumberInput
            label="Maximum Discount Uses"
            placeholder="Enter maximum uses"
            {...form.getInputProps('maximumDiscountUses')}
            mb="md"
          />
          <MultiSelect
            label="Combination"
            placeholder="Select combination types"
            data={['Product Discounts', 'Order Discounts']}
            {...form.getInputProps('combination')}
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