<template>
  <wrapper-section :fixed-header="true">
    <div class="body" style="padding-top: 7rem;">
      <div class="container-box">
        <div class="container my-5">
          <div class="row">
            <div class="col-md-12">
              <h2 class="category-title">MUJERES</h2>
              <div>
                <div class="row mt-5">
                  <template v-if="!loading && productsByCategory.length">
                    <div
                      v-for="product in productsByCategory"
                      :key="product.id"
                      class="col-sm-6 col-md-6 col-lg-4"
                    >
                      <ProductItem :product="product" />
                    </div>
                  </template>
                  <template v-else>
                    <div
                      v-for="n in 6"
                      :key="n"
                      class="col-sm-6 col-md-6 col-lg-4"
                    >
                      <content-loader/>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </wrapper-section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ProductItem from "../Components/ProductItem";
export default {
  name: "CategoryWoman",
  components: {
    ProductItem
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState("product", ["productsByCategory"])
  },
  methods: {
    ...mapActions("product", ["getProductsByCategory"])
  },
  async mounted() {
    window.scroll(0, 0);
    await this.getProductsByCategory('Female');
    this.loading = false;
  }
};
</script>