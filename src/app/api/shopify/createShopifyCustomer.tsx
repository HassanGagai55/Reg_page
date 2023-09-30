import axios, { AxiosResponse } from 'axios';

interface CustomerData {
  // Define the types for customerData properties here
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const shopifyConfig = {
  apiUrl: 'https://dnk-shop1.myshopify.com/admin/api/2023-09/customers.json', // Replace with your shop's URL
  apiKey: '66f142c3d18623a82df1cd88b554c9e6', // Replace with your Shopify API Key
  apiPassword: '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', // Replace with your Shopify API Password
};

const createShopifyCustomer = async (customerData: CustomerData): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      shopifyConfig.apiUrl,
      { customer: customerData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${shopifyConfig.apiKey}:${shopifyConfig.apiPassword}`).toString('base64')}`,
        },
      }
    );

    if (response.status === 201) {
      return response.data.customer;
    } else {
      throw new Error(`Failed to create Shopify customer: ${response.statusText}`);
    }
  } catch (error) {
    // You can log the specific error here for debugging purposes
    console.error('Error creating Shopify customer:', error);

    // Rethrow the error to be handled by the calling code
    throw error;
  }
};

export default createShopifyCustomer;
