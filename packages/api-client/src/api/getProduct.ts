import { Context } from '@vue-storefront/core';

export async function getProduct(context: Context): Promise<any> {
  const url = new URL('/wp-json/wp-sea-saas/v1/get-data', context.config.api.url);

  const body = {
    type: 'products',
    page: 0
  };

  // Use axios to send a GET request
  const { data } = await context.client.post(url.href, body);

  // Return data from the API
  return data;

}
