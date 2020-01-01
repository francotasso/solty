<template>
  <div>
    <section class="cards mb-5">
      <article class="card card--1 mx-auto">
        <div class="card__img" :style="{ 'background-image': 'url(' + product.image + ')' }"></div>
        <div class="card__img--hover" :style="{ 'background-image': 'url(' + product.image + ')' }"></div>
        <div class="card__info">
          <span class="card__category">{{product.brand}}</span>
          <h3 class="card__title">{{product.productName}}</h3>
          <p class="card__price">S/. {{product.price}}</p>
          <div class="d-flex justify-content-center">
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
    <ProductItemModal :product="product" />
  </div>
</template>

<script>
import ProductItemModal from "./ProductItemModal";
export default {
  name: "ProductItem",
  components: {
    ProductItemModal
  },
  props: ["product"],
  data() {
    return {};
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
  min-height: 475px;
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

@import url("https://fonts.googleapis.com/css?family=Pathway+Gothic+One&display=swap");

.card__price {
  font-family: "Pathway Gothic One", sans-serif;
  font-size: 18px;
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
</style>