import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextInput,
  Group,
  Button,
  Checkbox,
  Text,
  NumberInput,
  Loader,
  MultiSelect,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';


interface AddNewDiscountProps {
  fetchDiscounts: () => Promise<void>;
}
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
}

interface DiscountForm {
  discountCode: string;
  discountValue: number;
  categoryIds: number[];
  productIds: number[];
  maximumDiscountUses: number;
  limitPerCustomer: boolean;
  combination: string[];
  startDate: string;
  endDate: string;
}

interface DiscountPayload {
  discountCode: string;
  discountValue: number;
  categoryIds?: number[];
  productIds?: number[];
  maximumDiscountUses?: number;
  limitPerCustomer?: boolean;
  combination?: string[];
  startDate?: string;
  endDate?: string;
}

export const AddNewDiscount = ({ fetchDiscounts }: AddNewDiscountProps) => {
  const [isMaxUsesChecked, setIsMaxUsesChecked] = useState<boolean>(false);
  const [isLimitPerCustomerChecked, setIsLimitPerCustomerChecked] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<DiscountForm>({
    discountCode: '',
    discountValue: 0,
    categoryIds: [],
    productIds: [],
    maximumDiscountUses: 0,
    limitPerCustomer: false,
    combination: [],
    startDate: '',
    endDate: '',
  });
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/categories`),
          axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/products`),
        ]);

        const categoriesData: Category[] = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : [];
        console.log('Categories response:', categoriesData);
        setCategories(categoriesData);

        const productsData: Product[] = Array.isArray(productsRes.data)
          ? productsRes.data
          : [];
        console.log('Products response:', productsData);
        setProducts(productsData);

        if (categoriesData.length === 0) {
          notifications.show({
            title: 'Warning',
            message: 'No categories found.',
            color: 'yellow',
            icon: <IconX size={18} />,
            autoClose: 3000,
          });
        }
        if (productsData.length === 0) {
          notifications.show({
            title: 'Warning',
            message: 'No products found.',
            color: 'yellow',
            icon: <IconX size={18} />,
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch categories and products',
          color: 'red',
          icon: <IconX size={18} />,
          autoClose: 3000,
        });
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.discountCode || !formData.discountValue || !formData.startDate || !formData.endDate) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields (Discount Code, Discount Value, Start Date, End Date)',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      return;
    }

    if (isMaxUsesChecked && formData.maximumDiscountUses <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Maximum Discount Uses must be greater than 0 when enabled',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      return;
    }

    if (formData.categoryIds.length === 0 && formData.productIds.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'Please select at least one category or product',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const payload: DiscountPayload = {
        discountCode: formData.discountCode,
        discountValue: formData.discountValue,
        maximumDiscountUses: isMaxUsesChecked ? formData.maximumDiscountUses : undefined,
        limitPerCustomer: isLimitPerCustomerChecked,
        combination: formData.combination.length > 0 ? formData.combination : undefined,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
      };

      if (formData.categoryIds.length > 0) {
        payload.categoryIds = formData.categoryIds;
      } else if (formData.productIds.length > 0) {
        payload.productIds = formData.productIds;
      }

      console.log('Submitting payload:', payload);

      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/discounts`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      notifications.show({
        title: 'Success',
        message: 'Discount added successfully!',
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });

      await fetchDiscounts();

      setFormData({
        discountCode: '',
        discountValue: 0,
        categoryIds: [],
        productIds: [],
        maximumDiscountUses: 0,
        limitPerCustomer: false,
        combination: [],
        startDate: '',
        endDate: '',
      });
      setIsMaxUsesChecked(false);
      setIsLimitPerCustomerChecked(false);
    } catch (err) {
      console.error('Submit error:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to add discount. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCombinationChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      combination: checked
        ? [...prev.combination, type]
        : prev.combination.filter((item) => item !== type),
    }));
  };

  const handleMaxUsesChange = (checked: boolean) => {
    setIsMaxUsesChecked(checked);
    if (checked) {
      setIsLimitPerCustomerChecked(false);
      setFormData((prev) => ({
        ...prev,
        limitPerCustomer: false,
      }));
    }
  };

  const handleLimitPerCustomerChange = (checked: boolean) => {
    setIsLimitPerCustomerChecked(checked);
    if (checked) {
      setIsMaxUsesChecked(false);
      setFormData((prev) => ({
        ...prev,
        maximumDiscountUses: 0,
      }));
    }
    setFormData((prev) => ({
      ...prev,
      limitPerCustomer: checked,
    }));
  };

  if (dataLoading) {
    return (
      <Box p="md" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box p="md">
      <h1
        style={{
          marginLeft: isMediumScreen ? '20px' : '0px',
          fontSize: isExtraSmallScreen ? '20px' : '30px',
        }}
      >
        Add New Discount
      </h1>
      <Grid gutter="md">
        <Grid.Col span={isSmallScreen ? 12 : 6}>
          <TextInput
            label="Discount Code"
            placeholder="Enter Code"
            mb="sm"
            required
            value={formData.discountCode}
            onChange={(e) =>
              setFormData({ ...formData, discountCode: e.currentTarget.value })
            }
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
            label="Discount Value"
            placeholder="%"
            mb="sm"
            required
            value={formData.discountValue}
            onChange={(value) =>
              setFormData({ ...formData, discountValue: Number(value) })
            }
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
            label="Applies To Categories"
            placeholder="Select categories"
            data={
              Array.isArray(categories)
                ? categories.map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.name,
                  }))
                : []
            }
            value={formData.categoryIds.map((id) => id.toString())}
            onChange={(values: string[]) =>
              setFormData({
                ...formData,
                categoryIds: values
                  .map((val) => parseInt(val, 10))
                  .filter((val) => !isNaN(val)),
                productIds: [],
              })
            }
            disabled={formData.productIds.length > 0}
            mb="sm"
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '15px 20px',
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
            placeholder="Select products"
            data={
              Array.isArray(products)
                ? products.map((prod) => ({
                    value: prod.id.toString(),
                    label: prod.title,
                  }))
                : []
            }
            value={formData.productIds.map((id) => id.toString())}
            onChange={(values: string[]) =>
              setFormData({
                ...formData,
                productIds: values
                  .map((val) => parseInt(val, 10))
                  .filter((val) => !isNaN(val)),
                categoryIds: [],
              })
            }
            disabled={formData.categoryIds.length > 0}
            mb="sm"
            style={{ width: isSmallScreen ? '100%' : '60%' }}
            styles={{
              input: {
                padding: '15px 20px',
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
          <Text
            style={{
              fontSize: '18px',
              margin: '12px 0px',
              color: '#4C4E6A',
              fontWeight: 500,
            }}
          >
            Maximum Discount Uses
          </Text>
          <Checkbox
            label="Limit number of times this discount can be used in total"
            checked={isMaxUsesChecked}
            onChange={(event) => handleMaxUsesChange(event.currentTarget.checked)}
            disabled={isLimitPerCustomerChecked}
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          {isMaxUsesChecked && (
            <NumberInput
              placeholder="Enter number"
              mb="sm"
              value={formData.maximumDiscountUses}
              onChange={(value) =>
                setFormData({ ...formData, maximumDiscountUses: Number(value) })
              }
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
          <Checkbox
            label="Limit to one use per customer"
            checked={isLimitPerCustomerChecked}
            onChange={(event) => handleLimitPerCustomerChange(event.currentTarget.checked)}
            disabled={isMaxUsesChecked}
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <Text
            style={{
              fontSize: '18px',
              margin: '12px 0px',
              color: '#4C4E6A',
              fontWeight: 500,
            }}
          >
            Combination
          </Text>
          <Checkbox
            label="Product Discounts"
            checked={formData.combination.includes('Product Discounts')}
            onChange={(event) =>
              handleCombinationChange('Product Discounts', event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <Checkbox
            label="Order Discounts"
            checked={formData.combination.includes('Order Discounts')}
            onChange={(event) =>
              handleCombinationChange('Order Discounts', event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <Checkbox
            label="Shipping Discounts"
            checked={formData.combination.includes('Shipping Discounts')}
            onChange={(event) =>
              handleCombinationChange('Shipping Discounts', event.currentTarget.checked)
            }
            mb="sm"
            styles={{
              label: {
                fontSize: '16px',
              },
            }}
          />
          <TextInput
            label="Start Date"
            placeholder="Select date"
            type="date"
            mb="sm"
            required
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.currentTarget.value })
            }
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
            label="End Date"
            placeholder="Select date"
            type="date"
            mb="sm"
            required
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.currentTarget.value })
            }
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
          c="white"
          style={{ backgroundColor: '#4C4E6A' }}
          onClick={handleSubmit}
          loading={loading}
        >
          Save Discount
        </Button>
      </Group>
    </Box>
  );
};