<template>
  <div>
    <navbar />
    <div class="container" id="box">
      <ul class="nav nav-tabs mt-5">
        <li class="nav-item">
          <router-link class="nav-link" :to="'/product/' + id + '/description'">Descripción</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="'/product/' + id + '/payment'">Compra</router-link>
        </li>
      </ul>
      <router-view></router-view>
      <div class="d-flex justify-content-center mt-3 mb-3">
        <router-link to="/products" class="btn btn-dark">Regresar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";
import { mapActions } from "vuex";
export default {
  name: "product",
  props: ["id"],
  components: {
    navbar
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("product", ["getProduct"]),
    ...mapActions("user", ["getProfile"])
  },
  beforeMount() {
    this.getProduct(this.id);
    this.getProfile(localStorage.getItem("userId"));
  }
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  #box {
    margin-top: 5rem;
  }
}
</style>


