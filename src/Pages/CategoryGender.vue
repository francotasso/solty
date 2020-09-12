<template>
  <wrapper-section :fixed-header="true">
    <div class="body" style="padding-top: 7rem;">
      <div class="container-box">
        <div class="container my-5">
          <div class="row">
            <div class="col-md-12">
            <h2 class="category-title">{{ categoryTitle }}</h2>
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
import ProductItem from "../components/commons/product/ProductItem";
export default {
  name: "CategoryGender",
  props: {
    gender: {
      type: String,
      required: true
    }
  },
  components: {
    ProductItem
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState("product", ["productsByCategory"]),
    formattedGender() {
        if (this.gender === 'woman') return 'Female';
        else if (this.gender === 'man') return 'Male';
        else return 'Kids';
    },
    categoryTitle() {
        if (this.gender === 'woman') return 'Mujeres';
        else if (this.gender === 'man') return 'Hombres';
        else return 'Niños';
    }
  },
  methods: {
    ...mapActions("product", ["getProductsByGender"])
  },
  async mounted() {
    window.scroll(0, 0);
    /* await this.getProductsByGender(this.formattedGender);
    this.loading = false; */
  },
  watch: {
      gender: {
          immediate: true,
          async handler(val) {
            this.loading = true;
            await this.getProductsByGender(this.formattedGender);
            this.loading = false;
          }
      }
  }
};
</script>