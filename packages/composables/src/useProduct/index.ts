import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/woocommerce-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  productsSearch: async (context: Context, params) => {
    const data = await context.$woocommerce.api.getProduct(params);
    return data;
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
