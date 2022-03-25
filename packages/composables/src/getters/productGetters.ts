import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import type { ProductFilter } from '@vue-storefront/woocommerce-api';
import type { Product, FormattedMediaGalleryItem } from '@vue-storefront/woocommerce-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  return product?.title || 'No name';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  return product?.slug || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  return {
    regular: product.regular_price,
    special: product.price === product.regular_price ? 0 : product.price
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  if (!product || !product.images) {
    return [];
  }

  return [product.featured_image, ...product.images].map(image => {
    return {
      small: image,
      normal: image,
      big: image
    };
  });
}

function getFormattedGallery(product: Product): FormattedMediaGalleryItem[] {
  if (!product || !product.images) {
    return [];
  }

  return [product.featured_image, ...product.images].map(image => {
    return {
      mobile: { url: image },
      desktop: { url: image },
      big: { url: image },
      alt: getName(product)
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product.featured_image;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  return products;
}

function getFilteredSingle(product: Product): Product {
  return product;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product?.description || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string {
  return String(product?.database_id || 0);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return 0;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getFormattedGallery,
  getCoverImage,
  getFiltered,
  getFilteredSingle,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating
};
