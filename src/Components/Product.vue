<template>
  <div>
    <navbar />
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
      <!--PRODUCTOS RELACIONADOS-->
    <hr class="mt-5">
    <div class="container mt-3">
      <h1>PRODUCTOS RELACIONADOS</h1>
      <div class="d-flex flex-column">
        <div class="row-md-3 d-flex justify-content-around flex-wrap mb-3">
          <div>
            <img src="http://lorempixel.com/250/250" alt="imagen" class="my-2"/>
            <div>
              <p style="font-size: 12px;">Marca</p>
              <p style="font-size: 14px;">Nombre del producto</p>
              <p style="font-size: 13px;">S/.Precio</p>
            </div>
          </div>
          <div>
            <img src="http://lorempixel.com/250/250" alt="imagen" class="my-2"/>
            <div>
              <p style="font-size: 12px;">Marca</p>
              <p style="font-size: 14px;">Nombre del producto</p>
              <p style="font-size: 13px;">S/.Precio</p>
            </div>
          </div>
          <div>
            <img src="http://lorempixel.com/250/250" alt="imagen" class="my-2"/>
            <div>
              <p style="font-size: 12px;">Marca</p>
              <p style="font-size: 14px;">Nombre del producto</p>
              <p style="font-size: 13px;">S/.Precio</p>
            </div>
          </div>
          <div>
            <img src="http://lorempixel.com/250/250" alt="imagen" class="my-2"/>
            <div>
              <p style="font-size: 12px;">Marca</p>
              <p style="font-size: 14px;">Nombre del producto</p>
              <p style="font-size: 13px;">S/.Precio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!--FOOTER-->
    <foot id="foot"/>
  </div>
</template>

<script>
import navbar from "./Navbar";
import foot from "./Footer";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "product",
  props: ["id"],
  components: {
    navbar,
    foot
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
  beforeMount() {
    this.getProduct(this.id);
    $(document).ready(function() {
        $('html, body').animate({scrollTop:0}, 'slow');
        return false;
    });
    //this.getProfile(localStorage.getItem("userId"));
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


