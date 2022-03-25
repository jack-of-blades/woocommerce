<template>
  <div id="product">
    <div class="product">
      <client-only>
        <LazyHydrate when-idle>
          <SfGallery
            :images="productGetters.getFormattedGallery(product)"
            class="product__gallery"
          />
        </LazyHydrate>

        <div class="product__info">
          <div class="product__header">
            <SfHeading
              :title="productGetters.getName(product)"
              :level="3"
              class="sf-heading--no-underline sf-heading--left"
            />
            <SfIcon
              icon="drag"
              size="xxl"
              color="var(--c-text-disabled)"
              class="product__drag-icon smartphone-only"
            />
          </div>
          <div class="product__price-and-rating">
            <SfPrice
              :regular="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
            />
          </div>
          <div>
            <p
              class="product__description desktop-only"
              v-html="productGetters.getDescription(product)"
            ></p>
            <SfAddToCart
              v-e2e="'product_add-to-cart'"
              :stock="stock"
              v-model="qty"
              :disabled="cartLoading"
              :canAddToCart="stock > 0"
              class="product__add-to-cart"
              @click="addItem({ product, quantity: parseInt(qty) })"
            />
          </div></div
      ></client-only>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfPrice,
  SfSelect,
  SfAddToCart,
  SfGallery,
  SfIcon
} from '@storefront-ui/vue';

import { ref, computed, useRoute } from '@nuxtjs/composition-api';
import {
  useProduct,
  useCart,
  productGetters
} from '@vue-storefront/woocommerce';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';

export default {
  name: 'Product',
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  setup() {
    const qty = ref(1);
    const route = useRoute();
    const { products, search, loading } = useProduct();

    const { addItem, loading: cartLoading } = useCart();
    const product = computed(() =>
      productGetters.getFilteredSingle(products.value)
    );

    onSSR(async () => {
      await search({ id: route.value.params.id });
    });

    return {
      product,
      qty,
      addItem,
      loading,
      cartLoading,
      productGetters
    };
  },
  components: {
    SfHeading,
    SfPrice,
    SfSelect,
    SfAddToCart,
    SfGallery,
    SfIcon,
    LazyHydrate
  },
  data() {
    return {
      stock: 5
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
