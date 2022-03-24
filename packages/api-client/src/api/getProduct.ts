import { Context } from '@vue-storefront/core';

export async function getProduct(context: Context, params): Promise<any> {
  if (params.id) {
    console.log('Fetching single product');

    const url = new URL(`/wp-json/wp-sea-saas/v1/product/${params.id}`, context.config.api.url);

    // Use axios to send a GET request
    const { data } = await context.client.get(url.href);

    // Return data from the API
    return data;
  }
  else {
    console.log('fetching products page: ', params.page || 'default 0');
    const url = new URL('/wp-json/wp-sea-saas/v1/get-data', context.config.api.url);

    const body = {
      type: 'products',
      page: params.page || 0
    };

    // Use axios to send a GET request
    const { data } = await context.client.post(url.href, body);

    // Return data from the API
    return data;
  }
}
