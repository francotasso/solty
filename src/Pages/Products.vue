<template>
  <wrapper-section>
    <div class="body">
      <div class="container-box margin-top" v-if="!showLoading">
        <carousel />
        <div class="full-container margin-top">
          <div class="container-box row-direction">
            <div class="container-box__categories">
              <ProductsCategories />
            </div>
            <div>
              <div class="total-products">
                <SearchItem />
              </div>
              <div class="container-box__products">
                <div v-for="product in productsFiltered" :key="product.id" class="product-box">
                  <ProductItem :product="product" />
                </div>
                <div v-if="productsFiltered.length == 0" class="products-not-found">
                  <span>No se encontraron productos</span>
                </div>
                <nav class="container-pagination">
                  <ul class="pages">
                    <li class="item-page" :class="currentPage===1 ? 'disabled' : ''">
                      <span class="link-page" @click="goTo(currentPage-1)">Anterior</span>
                    </li>
                    <li
                      class="item-page"
                      :class="n==currentPage ? 'enable no-click' : '' "
                      v-for="n in numPages"
                      :key="n"
                    >
                      <span class="link-page" @click="goTo(n)">{{n}}</span>
                    </li>
                    <li class="item-page" :class="currentPage===numPages ? 'disabled' : ''">
                      <span class="link-page" @click="goTo(currentPage+1)">Siguiente</span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loading v-if="showLoading" @hideLoading="onHideLoading"></loading>
      <vue-snotify></vue-snotify>
    </div>
  </wrapper-section>
</template>

<script>
import carousel from "../Components/Carousel";
import ProductItem from "../Components/ProductItem";
import ProductsCategories from "../Components/ProductsCategories";
import SearchItem from "../Components/SearchItem";
import loading from "../Components/Loading";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Products",
  components: {
    carousel,
    SearchItem,
    ProductItem,
    ProductsCategories,
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
    ...mapActions("product", ["getProducts", "setProductsFilter"]),
    ...mapActions("payment", ["removeSuccessMessagePurchase"]),
    displayNotification(body, title) {
      this.$snotify.success(body, title);
    },
    onHideLoading(show) {
      this.showLoading = show;
    },
    goTo(page) {
      this.$router.push({ name: "Products", params: { numPage: page } });
      location.reload();
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
@import url("https://fonts.googleapis.com/css?family=Cabin&display=swap");
* {
  box-sizing: border-box;
}

.body {
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.bree-serif {
  font-family: "Bree Serif", serif;
  font-size: 18px;
}
.no-click {
  pointer-events: none;
}
.container-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1400px;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.container-wrap {
  flex-wrap: wrap;
}
.container-box__categories {
  width: 300px;
  border-right: 1px solid rgb(235, 228, 228);
}
.container-box__products {
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.row-direction {
  flex-direction: row;
}
.margin-top {
  margin-top: 3rem;
}
.container-pagination {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  font-family: "Cabin", sans-serif;
  color: rgb(92, 91, 91);
}
.total-products {
  font-family: "Cabin", sans-serif;
  color: rgb(139, 138, 138);
}
.footer {
  width: 100%;
}

.enable {
  background-color: #333;
  color: #fff;
}
.pages {
  display: flex;
  list-style: none;
}
.link-page {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.item-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.products-not-found {
  height: 453px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Cabin", sans-serif;
  color: rgb(121, 120, 120);
  padding-left: 2rem;
}

@media screen and (max-width: 1430px) {
  .container-box {
    width: 1100px;
  }
}

@media screen and (max-width: 1280px) {
  .container-box {
    width: 1000px;
  }
  .container-box__products {
    width: 825px;
  }
  .container-box__categories {
    width: 175px;
  }
}

@media screen and (max-width: 1050px) {
  .full-container {
    margin-top: 1rem;
  }
  .container-box {
    width: 825px;
    flex-direction: column;
  }
  .container-box__categories {
    width: 100%;
    border-right: none;
  }
}

@media screen and (max-width: 900px) {
  .container-box {
    width: 750px;
  }
}

@media screen and (max-width: 750px) {
  .container-box {
    width: 550px;
  }
  .container-box__products {
    width: 550px;
  }
}

@media screen and (max-width: 550px) {
  .container-box {
    width: 100%;
  }
  .container-box__products {
    width: 100%;
  }
  .product-box {
    width: 50%;
  }
  .container-box__categories {
    top: 70px;
  }
}
</style>


