<template>
  <wrapper-section>
    <div class="container">
      <div class="row">
        <div class="col-md-5 mt-5">
          <ZoomOnHover :img-normal="currentProductToBuy.image" :scale="2"></ZoomOnHover>
        </div>
        <div class="col-md-7 mt-5">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + category + '/' + productName + '/description'">Descripción</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + category + '/' + productName + '/details'">Detalles</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + category + '/' + productName + '/tips'">Recomendaciones</router-link>
            </li>
          </ul>
          <router-view></router-view>
        </div>
      </div>
      <hr class="mt-5">
      <ProductRelated/>
    </div>
  </wrapper-section>
</template>

<script>
import ProductRelated from "../Components/ProductRelated";
import ZoomOnHover from "../Components/external/ZoomOnHover.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ProductPage",
  props: ["category", "productName"],
  components: {
    ProductRelated,
    ZoomOnHover
  },
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("product", ["getProduct"])
  },
  mounted() {
    /* $(document).ready(function() {
        $('html, body').animate({scrollTop:0}, 'slow');
        return false;
    }); */
    window.scroll(0,0)
  }
};
</script>

<style scoped>
</style>


