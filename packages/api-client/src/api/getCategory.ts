import { Context } from '@vue-storefront/core';

export async function getCategory(context: Context, params): Promise<any> {
    console.log('Fetching categories');
    const url = new URL('/wp-json/wp-sea-saas/v1/get-data', context.config.api.url);

    const body = {
        type: 'categories',
        page: 0,
        per_page: 100
    };

    // Use axios to send a GET request
    const { data } = await context.client.post(url.href, body);

    // Return data from the API
    return data;
}
