<template>
  <div>
    <div class="mt-3">
      <h1>PRODUCTOS RELACIONADOS</h1>
      <div class="d-flex flex-column">
        <div class="row-md-3 d-flex justify-content-around flex-wrap mb-3">
          <div v-for="(product, index) in products" :key="index" class="col-md-4">
            <img
              :src="product.image"
              :alt="product.productName"
              class="my-2 img-fluid"
              @click="swapPurchase(product)"
            />
            <div>
              <p style="font-size: 12px;">{{product.brand}}</p>
              <p style="font-size: 14px;">{{product.productName}}</p>
              <p style="font-size: 13px;">S/. {{product.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "ProductRelated",
  data() {
    return {
      products: []
    };
  },
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"])
  },
  methods: {
    ...mapActions("product", ["previousPurchase"]),
    async getRelatedProducts() {
      this.products = [];
      let relatedProducts = await axios.get(`products/related/${this.currentProductToBuy.category}`);
      for (let product of relatedProducts.data) {
        if (product._id !== this.currentProductToBuy._id)
          this.products.push(product);
      }
    },
    async swapPurchase(product) {
      await this.previousPurchase(product);
      this.getRelatedProducts();
      window.scroll(0, 137);
    }
  },
  beforeMount() {
    this.getRelatedProducts();
  }
};
</script>

<style scoped>
img {
  transition: all 2s cubic-bezier(0.175, 0.885, 0, 1);
  border-radius: 4px;
}
img:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.7);
  transform: scale(1.02, 1.02);
}
</style>