<template>
  <div class="body">
    <navbar />
    <div class="container py-5" v-if="!showLoading">
      <carousel />
      <SearchItem />
      <div class="album py-5 mt-3">
        <div class="container">
          <div class="row">
            <div v-for="product in productsFiltered" :key="product.id" class="col-lg-4 col-md-6">
              <ProductItem :product="product" />
            </div>
          </div>
        </div>
        <nav aria-label="..." class="d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item" :class="currentPage===1 ? 'disabled' : ''">
              <a class="page-link" :href="`/products/${currentPage-1}`">Previous</a>
            </li>
            <li
              class="page-item"
              v-for="n in numPages"
              :key="n"
              :class="n==currentPage ? 'active' : '' "
            >
              <a class="page-link" :href="`/products/${n}`">{{n}}</a>
            </li>
            <li class="page-item" :class="currentPage===numPages ? 'disabled' : ''">
              <a class="page-link" :href="`/products/${currentPage+1}`">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <loading v-if="showLoading" @hideLoading="onHideLoading"></loading>
    <foot v-if="!showLoading" id="foot" />
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import navbar from "./Navbar";
import carousel from "./Carousel";
import ProductItem from "./ProductItem";
import SearchItem from "./SearchItem";
import foot from "./Footer";
import loading from "./Loading";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Products",
  components: {
    navbar,
    carousel,
    SearchItem,
    ProductItem,
    foot,
    loading
  },
  props: ["numPage"],
  data() {
    return {
      showLoading: true
    };
  },
  computed: {
    ...mapState("user", ["successMessageUpdateProfile"]), //just to notify if user profile was updated
    ...mapState("product", ["numPages", "currentPage"]),
    ...mapGetters("product", ["productsFiltered"]),
    ...mapState("payment", ["successMessagePurchase"]) //just to notify if user made a success purchase
  },
  methods: {
    ...mapActions("user", ["checkLogin", "removeSuccessMessageUpdateProfile"]),
    ...mapActions("product", ["getProducts"]),
    ...mapActions("payment", ["removeSuccessMessagePurchase"]),
    displayNotification(body, title) {
      this.$snotify.success(body, title);
    },
    onHideLoading(show) {
      this.showLoading = show;
    }
  },
  created() {
    this.checkLogin();
    this.getProducts(this.numPage);
  },
  beforeMount() {
    this.showLoading = true;
  },
  mounted() {
    if (this.successMessageUpdateProfile) {
      this.displayNotification(
        this.successMessageUpdateProfile.body,
        this.successMessageUpdateProfile.title
      );
      this.removeSuccessMessageUpdateProfile();
    }
    if (this.successMessagePurchase) {
      this.displayNotification(
        this.successMessagePurchase.body,
        this.successMessagePurchase.title
      );
      this.removeSuccessMessagePurchase();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i");

* {
  box-sizing: border-box;
}

.body {
  background-image: url("https://fondos.io/wp-content/uploads/2019/01/fondo-blanco-53.jpg");
  background-size: cover;
}
.bree-serif {
  font-family: "Bree Serif", serif;
  font-size: 18px;
}
</style>


