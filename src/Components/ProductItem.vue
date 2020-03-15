<template>
  <div>
    <section class="product-container">
      <article class="product-card" @click="previousPurchase(product._id)">
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
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ProductItem",
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
* {
  box-sizing: border-box;
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
  width: 275px;
  height: 275px;
}
.product-card {
  position: relative;
  height: 453px;
  background-color: #fff;
}
.card__info {
  background-color: #fff;
  padding: 16px 24px 24px 24px;
  background-color: #fff;
  width: 275px;
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
  padding: 4px 15px 4px 15px;
  color: #fff;
  background-color: #333;
  position: absolute;
  top: 10px;
  right: 0;
  -webkit-clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
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

@media screen and (max-width: 900px) {
  .card__img {
    width: 250px;
    height: 250px;
  }
  .card__info {
    width: 250px;
  }
}

@media screen and (max-width: 750px) {
  .card__img {
    width: 275px;
    height: 275px;
  }
  .card__info {
    width: 275px;
  }
}

@media screen and (max-width: 550px) {
  .card__img {
    width: 100%;
  }
  .card__info {
    width: 100%;
  }
}

@media screen and (max-width: 475px) {
  .card__title {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
