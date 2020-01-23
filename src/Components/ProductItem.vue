<template>
  <div>
    <section class="cards mb-5">
      <article class="card mx-auto" @click="previousPurchase(product._id)">
        <div class="card__img" :style="{ 'background-image': 'url(' + product.image + ')' }">
          <span
            v-if="product.discount.status"
            class="product-discount-label"
          >{{product.discount.percentage}}%</span>
        </div>
        <div class="card__info">
          <span class="card__brand">{{product.brand}}</span>
          <h3 class="card__title">{{product.productName}}</h3>
          <p class="card__price">S/. {{product.price}}</p>
          <!--<div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn bg-darkblue"
              data-toggle="modal"
              :data-target="'#modal'+product._id"
            >Más info</button>
          </div>-->
        </div>
      </article>
    </section>
    <ProductItemModal :product="product" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProductItemModal from "./ProductItemModal";
export default {
  name: "ProductItem",
  components: {
    ProductItemModal
  },
  props: ["product"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("product", ["previousPurchase"])
  }
};
</script>

<style scoped>
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.card {
  margin-right: 25px;
  transition: all 0.7s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
  min-height: 415px;
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.7);
  transform: scale(0.95, 0.95);
}

.card__info {
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__brand {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.product-discount-label {
  display: block;
  padding: 4px 15px 4px 30px;
  color: #fff;
  background-color: #0081c2;
  position: absolute;
  top: 10px;
  right: 0;
  -webkit-clip-path: polygon(34% 0, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(34% 0, 100% 0, 100% 100%, 0 100%);
}

@import url("https://fonts.googleapis.com/css?family=Pathway+Gothic+One&display=swap");

.card__price {
  font-family: "Pathway Gothic One", sans-serif;
  font-size: 18px;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: "Roboto Slab", serif;
  font-weight: 450;
  font-size: 24px;
}

.card:hover .card__img--hover {
  height: 100%;
}

.card:hover .card__info {
  background-color: transparent;
  position: relative;
}

.card:hover {
  opacity: 1;
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

@media screen and (max-width: 1200px) {
  .card__title {
    font-size: 22px;
    font-weight: 400;
  }
}

@media screen and (max-width: 992px) {
  .card__title {
    font-size: 20px;
    font-weight: 400;
  }
}

@media screen and (max-width: 475px) {
  .card__title {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>