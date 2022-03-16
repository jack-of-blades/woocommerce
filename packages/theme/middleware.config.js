module.exports = {
  integrations: {
    woocommerce: {
      location: '@vue-storefront/woocommerce-api/server',
      configuration: {
        api: {
          url: process.env.WOOCOMMERCE_API
        }
      }
    }
  }
};
