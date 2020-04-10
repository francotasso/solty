<template>
  <wrapper-section>
    <div class="container" id="box">
      <div class="row">
        <div class="col-md-5 mt-3">
          <img :src="currentProductToBuy.image" :alt="currentProductToBuy.productName" class="img-fluid">
        </div>
        <div class="col-md-7">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + id + '/description'">Descripción</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + id + '/details'">Detalles</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'/product/' + id + '/tips'">Recomendaciones</router-link>
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
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "product",
  props: ["id"],
  components: {
    ProductRelated
  },
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("product", ["getProduct"]),
    ...mapActions("user", ["checkLogin","getProfile"])
  },
  created(){
    this.checkLogin();
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
#box {
  margin-top: 6rem;
}
a {
  color: #224994;
}
</style>


