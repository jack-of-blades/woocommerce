import { apiClientFactory } from '@vue-storefront/core';
import axios from 'axios';

import { getProduct } from './api/getProduct';

function onCreate(settings) {
  const client = axios.create({
    baseURL: settings.api.url,
    headers: {
      'swiftcom-app-key': process.env.SWIFTCOM_APP_KEY
    }
  });

  return {
    config: settings,
    client: client
  };
}

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct
  }
});

export {
  createApiClient
};
