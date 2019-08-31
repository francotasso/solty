<template>
  <div class="body">
    <navbar />
    <div class="container py-5">
      <carousel />
      <div class="mt-3">
        <span class="ml-2 bree-serif">Total de productos: {{productsFiltered.length}}</span>
      </div>
      <div class="dropdown mt-3">
        <button
          class="btn dropdown-toggle bg-black"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Filtrar por</button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" @click="setProductsFilter('all')">Todos los productos</button>
          <button
            class="dropdown-item"
            @click="setProductsFilter('highToLow')"
          >Precio (mayor a menor)</button>
          <button
            class="dropdown-item"
            @click="setProductsFilter('lowToHigh')"
          >Precio (menor a mayor)</button>
          <button class="dropdown-item" @click="setProductsFilter('Male')">Para varón</button>
          <button class="dropdown-item" @click="setProductsFilter('Female')">Para mujer</button>
        </div>
      </div>
      <div class="album py-5 mt-3">
        <div class="container">
          <div class="row">
            <div v-for="product in productsFiltered" :key="product.id" class="col-lg-4 col-md-6">
              <section class="cards mb-5">
                <article class="card card--1 mx-auto">
                  <div class="card__info-hover">
                    <svg class="card__like" viewBox="0 0 24 24">
                      <path
                        fill="#000000"
                        d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                      />
                    </svg>
                    <div class="card__clock-info">
                      <svg class="card__clock" viewBox="0 0 24 24">
                        <path
                          d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z"
                        />
                      </svg>
                      <span class="card__time">15 min</span>
                    </div>
                  </div>
                  <div
                    class="card__img"
                    :style="{ 'background-image': 'url(' + product.image + ')' }"
                  ></div>
                  <div
                    class="card__img--hover"
                    :style="{ 'background-image': 'url(' + product.image + ')' }"
                  ></div>
                  <div class="card__info">
                    <span class="card__category">{{product.brand}}</span>
                    <h3 class="card__title">{{product.productName}}</h3>
                    <div class="d-flex justify-content-center">
                      <!-- Button trigger modal -->
                      <button
                        type="button"
                        class="btn bg-darkblue"
                        data-toggle="modal"
                        :data-target="'#modal'+product._id"
                      >Más info</button>
                    </div>
                  </div>
                </article>
              </section>
              <!-- Modal -->
              <div
                class="modal fade"
                :id="'modal'+product._id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">{{ product.productName }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ product.brand }}</li>
                        <li class="list-group-item">S/. {{ product.price }}</li>
                        <li class="list-group-item">Quedan {{ product.stock }} unidades</li>
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn bg-darkblue"
                        data-dismiss="modal"
                        @click="previousPurchase(product._id)"
                      >Comprar</button>
                      <button type="button" class="btn bg-ocre" data-dismiss="modal">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot id="foot" />
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import navbar from "./Navbar";
import carousel from "./Carousel";
import foot from "./Footer";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Products",
  components: {
    navbar,
    carousel,
    foot
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["successMessageUpdateProfile"]), //just to notify if user profile was updated
    ...mapGetters("product", ["productsFiltered"]),
    ...mapState("payment", ["successMessagePurchase"]) //just to notify if user made a success purchase
  },
  methods: {
    ...mapActions("user", ["removeSuccessMessageUpdateProfile"]),
    ...mapActions("product", [
      "getProducts",
      "previousPurchase",
      "setProductsFilter"
    ]),
    ...mapActions("payment", ["removeSuccessMessagePurchase"]),
    displayNotification(body, title) {
      this.$snotify.success(body, title);
    }
  },
  created() {
    this.getProducts();
  },
  mounted() {
    if (this.successMessageUpdateProfile) {
      this.displayNotification(
        this.successMessageUpdateProfile.body,
        this.successMessageUpdateProfile.title
      );
    }
    if (this.successMessagePurchase) {
      this.displayNotification(
        this.successMessagePurchase.body,
        this.successMessagePurchase.title
      );
    }
  },
  beforeDestroy() {
    if (this.successMessageUpdateProfile) {
      this.removeSuccessMessageUpdateProfile();
    }
    if (this.successMessagePurchase) {
      this.removeSuccessMessagePurchase();
    }
  }
};
</script>

<style scoped>
.body {
  background-image: url("https://fondos.io/wp-content/uploads/2019/01/fondo-blanco-53.jpg");
  background-size: cover;
}
.bg-black {
  background-color: #000;
  color: #fff;
}
.bg-darkblue {
  background-color: #224994;
  color: #fff;
}
.bg-ocre {
  background-color: #debb07;
  color: #fff;
}
.btn:focus {
  box-shadow: none;
}
.bree-serif {
  font-family: "Bree Serif", serif;
  font-size: 18px;
}
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i");

* {
  box-sizing: border-box;
}

body {
  font-family: "Roboto Slab", serif;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}

body {
  background-color: #d2dbdd;
  display: flex;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  justify-content: center;
  align-items: center;
}

.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  max-width: 820px;
}

.card__like {
  width: 18px;
}

.card__clock {
  width: 15px;
  vertical-align: middle;
  fill: #ad7d52;
}
.card__time {
  font-size: 12px;
  color: #ad7d52;
  vertical-align: middle;
  margin-left: 5px;
}

.card__clock-info {
  float: right;
}

.card__img {
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card__info-hover {
  position: absolute;
  padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
}
.card {
  margin-right: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.7);
  transform: scale(1.1, 1.1);
}

.card__info {
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__category {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: "Roboto Slab", serif;
}

.card__by {
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
}

.card__author {
  font-weight: 600;
  text-decoration: none;
  color: #ad7d52;
}

.card:hover .card__img--hover {
  height: 100%;
}

.card:hover .card__info {
  background-color: transparent;
  position: relative;
}

.card:hover .card__info-hover {
  opacity: 1;
}
</style>


