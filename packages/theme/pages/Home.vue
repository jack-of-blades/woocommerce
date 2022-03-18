<template>
  <div id="home">

    <LazyHydrate when-visible>
      <div class="container">
        <div class="products-container">
          <div
          v-for="(product, i) in currentProducts"
          :key="i" class="product-card"
          @click="$router.push({path: `/product/${product.slug}`, query: {
            title: product.title,
            price: product.price,
            regular_price: product.regular_price,
            description: product.description,
            images: [product.featured_image.sourceUrl, ...product.images.map((img) => img.sourceUrl)]
          }})"
          >
            <img :src="product.featured_image.sourceUrl"/>
            <h3 class="product-title">{{product.title}}</h3>
          </div>
        </div>
        <h1 v-if="loading">Loading...</h1>
        <h1 v-if="noMoreProducts">No more products</h1>
        <button v-else @click="update">Load more</button>
      </div>
    </LazyHydrate>

  </div>
</template>
<script>
import {
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import { addBasePath } from '@vue-storefront/core';
import { useProduct } from '@vue-storefront/woocommerce';
import { ref, onMounted } from '@nuxtjs/composition-api';

export default {
  name: 'Home',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
    InstagramFeed,
    NewsletterModal,
    LazyHydrate
  },
  setup: () => {
    const {
      products,
      search,
      loading
    } = useProduct();

    const currentProducts = ref([]);
    const page = ref(0);
    const noMoreProducts = ref(false);

    const update = async () => {
      page.value++;
      await search({ page: page.value });
      currentProducts.value = currentProducts.value.concat(products.value);
      if (products.value.length < 20) {
        noMoreProducts.value = true;
      }
    };

    onMounted(async () => {
      await search({ page: 0 });
      currentProducts.value = products.value;
      if (products.value.length < 20) {
        noMoreProducts.value = true;
      }
    });

    console.log(currentProducts);

    return {
      addBasePath,
      products,
      search,
      currentProducts,
      update,
      noMoreProducts,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
}

.product-card {
  width: 250px;
  height: 400px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
}

.product-title {
  width: 100%;
  text-align: center;
}

</style>
