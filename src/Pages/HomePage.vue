<template>
  <wrapper-section :fixed-header="true">
    <div class="body">
      <div class="container-box">
        <carousel />
        <div class="container my-5">
          <div class="row">
            <div class="col-md-3">
              <ProductsCategories />
            </div>
            <div class="col-md-9">
              <div>
                <div>
                  <search-item />
                </div>
                <div class="row mt-5">
                  <template v-if="productsFiltered.length">
                    <div
                      v-for="product in productsFiltered"
                      :key="product.id"
                      class="col-sm-6 col-md-6 col-lg-4"
                    >
                      <ProductItem :product="product" />
                    </div>
                  </template>
                  <template v-else>
                    <div class="col text-center mb-5">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPx2LjGdljLAEzJArAZyPmnygF9KKQaLHluhvapirmIZzt791r&usqp=CAU"
                        alt
                      />
                    </div>
                  </template>
                  <nav class="container-pagination">
                    <ul class="pages">
                      <li class="item-page" :class="currentPage===1 ? 'disabled' : ''">
                        <span class="link-page" @click="goTo(currentPage-1)">Anterior</span>
                      </li>
                      <li
                        class="item-page"
                        :class="n==numPage ? 'enable no-click' : '' "
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
      </div>
    </div>
  </wrapper-section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import carousel from "../components/home/Carousel";
import ProductItem from "../components/commons/product/ProductItem";
import ProductsCategories from "../components/home/ProductsCategories";
import SearchItem from "../components/home/SearchItem";
export default {
  name: "Products",
  components: {
    carousel,
    SearchItem,
    ProductItem,
    ProductsCategories,
  },
  data() {
    return {
      showLoading: true,
      numPage: 1,
    };
  },
  computed: {
    ...mapState("product", ["numPages", "currentPage"]),
    ...mapGetters("product", ["productsFiltered"]),
  },
  methods: {
    ...mapActions("product", ["getProducts", "setProductsFilter"]),
    async goTo(page) {
      await this.getProducts({ numPage: page, perPage: 9 });
      this.numPage = page;
      $(document).ready(function () {
        $("html, body").animate({ scrollTop: 507 }, "slow");
        return false;
      });
    },
  },
  created() {
    window.scroll(0, 0);
    this.getProducts({ numPage: this.numPage, perPage: 9 });
  },
  beforeMount() {
    this.showLoading = true;
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i");
@import url("https://fonts.googleapis.com/css?family=Cabin&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap");
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
  margin-top: 150px;
  font-family: "Work Sans", sans-serif;
}
@media screen and (max-width: 576px) {
  .body {
    margin-top: 140px;
  }
}
.bree-serif {
  font-family: "Bree Serif", serif;
  font-size: 18px;
}
.no-click,
.disabled {
  pointer-events: none;
}
.container-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
  z-index: 5;
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
  border-radius: 4px;
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

@media screen and (max-width: 1280px) {
  .container-box__products {
    width: 825px;
  }
  .container-box__categories {
    width: 175px;
  }
}

@media screen and (max-width: 1050px) {
  .container-box {
    flex-direction: column;
  }
  .container-box__categories {
    width: 100%;
    border-right: none;
  }
}

@media screen and (max-width: 750px) {
  .container-box__products {
    width: 550px;
  }
}

@media screen and (max-width: 550px) {
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


