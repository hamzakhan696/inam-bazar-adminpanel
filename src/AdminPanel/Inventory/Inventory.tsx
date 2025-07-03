import { Group, Box, Paper, Table, Avatar, Button, Modal, NumberInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from '@mantine/form';

interface InventoryItem {
  id: number;
  productName: string;
  productImage: string;
  quantity: number;
}

export const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const form = useForm({
    initialValues: {
      quantity: 0,
    },
  });

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

  const fetchInventory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<InventoryItem[]>(`${import.meta.env.VITE_APP_API_BASE_URL}/inventory`);
      const data = Array.isArray(response.data) ? response.data : [];
      setInventory(data);
      setFilteredInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to fetch inventory. Please try again.');
      setInventory([]);
      setFilteredInventory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleCheckbox = (itemId: number) => {
    setSelectedItems((prev) => {
      const newSelection = prev.includes(itemId) 
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      setSelectAll(newSelection.length === filteredInventory.length);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(filteredInventory.map(item => item.id));
      setSelectAll(true);
    }
  };

  const handleEdit = () => {
    const item = filteredInventory.find(i => i.id === selectedItems[0]);
    if (item) {
      setEditingItem(item);
      form.setValues({
        quantity: item.quantity,
      });
      setEditModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedItems.map(id => 
        axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/inventory/${id}`)
      ));
      setInventory(inventory.filter(item => !selectedItems.includes(item.id)));
      setFilteredInventory(filteredInventory.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error deleting items:', error);
      setError('Failed to delete inventory items. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/inventory/${editingItem.id}`,
        { quantity: form.values.quantity }
      );
      setInventory(inventory.map(item => item.id === editingItem.id ? response.data : item));
      setFilteredInventory(filteredInventory.map(item => item.id === editingItem.id ? response.data : item));
      setEditModalOpen(false);
      setEditingItem(null);
      form.reset();
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update inventory item. Please try again.');
    }
  };

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/inventory/${itemId}`,
        { quantity: newQuantity }
      );
      setInventory(inventory.map(item => item.id === itemId ? response.data : item));
      setFilteredInventory(filteredInventory.map(item => item.id === itemId ? response.data : item));
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setError('Failed to update quantity. Please try again.');
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

  const renderTableHeader = () => {
    if (selectedItems.length > 0) {
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
                      disabled={selectedItems.length !== 1}
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
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Product</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>Available</th>
          <th style={{ padding: '12px', color: '#4C4E6A' }}>On Hand</th>
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
          Inventory
        </h1>
        <TopBar />
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
        {isLoading && <div>Loading inventory...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!isLoading && !error && filteredInventory.length === 0 && <div>No inventory items available.</div>}
        {!isLoading && !error && filteredInventory.length > 0 && (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <Table verticalSpacing="sm" style={{ textAlign: 'left' }}>
              {renderTableHeader()}
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} style={{ backgroundColor: 'white', marginBottom: '8px', display: 'table-row' }}>
                    <td style={{ padding: '12px' }}>
                      <input 
                        type="checkbox" 
                        style={{ width: '20px', height: '20px' }} 
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckbox(item.id)}
                      />
                    </td>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Avatar 
                        src={getImageUrl(item.productImage)} 
                        radius="lg" 
                        size="lg" 
                        alt={item.productName}
                        onError={() => console.error('Failed to load image for product:', item.productName)}
                      />
                      {item.productName}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item.id, value as number)}
                        min={0}
                        style={{ width: '30%'}}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item.id, value as number)}
                        min={0}
                        style={{ width: '30%'}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Paper>

      <Modal
        opened={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
          form.reset();
        }}
        title="Edit Inventory Item"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSaveEdit)}>
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            {...form.getInputProps('quantity')}
            mb="md"
            min={0}
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