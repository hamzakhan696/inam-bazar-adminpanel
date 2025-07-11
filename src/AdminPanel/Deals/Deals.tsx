import { Group, Box, Button, Paper, Tabs, Table, FloatingIndicator, Modal, TextInput, NumberInput, Textarea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect, useRef } from "react";
import classes from '../TabCSS/products.module.css';
import { AddNewDeal } from "./AddNewDeal";
import axios from 'axios';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface Product {
  id: number;
  title: string;
}

interface Deal {
  id: number;
  title: string;
  description: string;
  images: string[];
  productId: number;
  lotteryId: number;
  price: string;
  comparePrice: string;
  discount: string;
  quantity: number;
}

export const Deals = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [value, setValue] = useState<string | null>('1');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeals, setSelectedDeals] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Deal | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectAllDeals, setSelectAllDeals] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      productId: 0,
      lotteryId: 0,
      price: '',
      comparePrice: '',
      discount: '',
      quantity: 0,
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

  const fetchDeals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Deal[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/deals`);
      const data = Array.isArray(response.data) ? response.data : [];
      console.log('Deals API response:', data);
      setDeals(data);
      setFilteredDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error);
      setError('Failed to fetch deals. Please try again.');
      setDeals([]);
      setFilteredDeals([]);
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
    }
  };

  useEffect(() => {
    fetchDeals();
    fetchProducts();
  }, []);

  const handleDealCheckbox = (dealId: number) => {
    setSelectedDeals((prev) => {
      const newSelection = prev.includes(dealId) 
        ? prev.filter((id) => id !== dealId)
        : [...prev, dealId];
      setSelectAllDeals(newSelection.length === filteredDeals.length);
      return newSelection;
    });
  };

  const handleSelectAllDeals = () => {
    if (selectAllDeals) {
      setSelectedDeals([]);
      setSelectAllDeals(false);
    } else {
      setSelectedDeals(filteredDeals.map(d => d.id));
      setSelectAllDeals(true);
    }
  };

  const handleEdit = () => {
    const deal = deals.find(d => d.id === selectedDeals[0]);
    if (deal) {
      setEditingItem(deal);
      form.setValues({
        title: deal.title,
        description: deal.description,
        productId: deal.productId,
        lotteryId: deal.lotteryId,
        price: deal.price,
        comparePrice: deal.comparePrice,
        discount: deal.discount,
        quantity: deal.quantity,
      });
      setEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedDeals.map(id => 
        axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/deals/${id}`)
      ));
      setDeals(deals.filter(d => !selectedDeals.includes(d.id)));
      setFilteredDeals(filteredDeals.filter(d => !selectedDeals.includes(d.id)));
      setSelectedDeals([]);
      setSelectAllDeals(false);
      notifications.show({
        title: 'Success',
        message: 'Deals deleted successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting deals:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete deals. Please try again.',
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
        `${import.meta.env.VITE_APP_API_BASE_URL}/deals/${editingItem.id}`,
        form.values
      );
      setDeals(deals.map((d: Deal) => d.id === editingItem.id ? response.data : d));
      setFilteredDeals(filteredDeals.map((d: Deal) => d.id === editingItem.id ? response.data : d));
      setEditModalOpen(false);
      setEditingItem(null);
      form.reset();
      notifications.show({
        title: 'Success',
        message: 'Deal updated successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating deal:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update deal. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
    }
  };

  const renderTableHeader = () => {
    const isAnySelected = selectedDeals.length > 0;

    if (isAnySelected) {
      return (
        <thead>
          <tr>
            <th style={{ padding: '12px' }}>
              <input 
                type="checkbox" 
                style={{ width: '20px', height: '20px' }} 
                checked={selectAllDeals}
                onChange={handleSelectAllDeals}
              />
            </th>
            <th colSpan={4} style={{ padding: '12px' }}>
              <Group justify="flex-start">
                {selectedDeals.length === filteredDeals.length ? (
                  <Button color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : (
                  <>
                    <Button
                      color="blue"
                      onClick={handleEdit}
                      disabled={selectedDeals.length !== 1}
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
              checked={selectAllDeals}
              onChange={handleSelectAllDeals}
            />
          </th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Title</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Price</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Quantity</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Discount</th>
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
          Deals
        </h1>
        <TopBar />
      </Group>

      <Group justify="flex-end">
        <Button 
          c="white" 
          style={{ backgroundColor: '#4C4E6A'}} 
          onClick={() => setValue('2')}
        >
          Add New Deal
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
            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab} style={{ border: '1px solid #53CCFF', borderRadius: '10px'}}>
              All Deals
            </Tabs.Tab>
            <FloatingIndicator
              target={value ? controlsRefs.current[value] : null}
              parent={rootRef.current}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="1" pt="xs">
            {isLoading && <div>Loading deals...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!isLoading && !error && filteredDeals.length === 0 && <div>No deals available.</div>}
            {!isLoading && !error && filteredDeals.length > 0 && (
              <div style={{ overflowX: "auto", width: "100%" }}>
                <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
                  {renderTableHeader()}
                  <tbody>
                    {filteredDeals.map((deal) => {
                      const productName = products.find(prod => prod.id === deal.productId)?.title || 'Unknown';
                      return (
                        <tr key={deal.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                          <td style={{ padding: '12px' }}>
                            <input 
                              type="checkbox" 
                              style={{ width: '20px', height: '20px' }} 
                              checked={selectedDeals.includes(deal.id)}
                              onChange={() => handleDealCheckbox(deal.id)}
                            />
                          </td>
                          <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>{deal.title} ({productName})</td>
                          <td style={{ padding: '12px' }}>Rs. {deal.price}</td>
                          <td style={{ padding: '12px' }}>{deal.quantity}</td>
                          <td style={{ padding: '12px' }}>{deal.discount}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <AddNewDeal fetchDeals={fetchDeals} />
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
        title="Edit Deal"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSaveEdit)}>
          <TextInput
            label="Title"
            placeholder="Enter deal title"
            {...form.getInputProps('title')}
            mb="md"
          />
          <Textarea
            label="Description"
            placeholder="Enter deal description"
            {...form.getInputProps('description')}
            mb="md"
          />
          <NumberInput
            label="Product ID"
            placeholder="Enter product ID"
            {...form.getInputProps('productId')}
            mb="md"
          />
          <NumberInput
            label="Lottery ID"
            placeholder="Enter lottery ID"
            {...form.getInputProps('lotteryId')}
            mb="md"
          />
          <TextInput
            label="Price"
            placeholder="Enter price"
            {...form.getInputProps('price')}
            mb="md"
          />
          <TextInput
            label="Compare Price"
            placeholder="Enter compare price"
            {...form.getInputProps('comparePrice')}
            mb="md"
          />
          <TextInput
            label="Discount (%)"
            placeholder="Enter discount percentage"
            {...form.getInputProps('discount')}
            mb="md"
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            {...form.getInputProps('quantity')}
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

