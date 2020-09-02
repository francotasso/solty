<template>
  <div :id="`product-${product._id}`" class="product" @click="previousPurchase(product)">
    <div class="product-card__img">
      <img :src="product.image" class="img-fluid">
      <div class="product-card__img-fast-view">
        <span class="hover-icon" @click.stop="showFastBuyModal = true"><i class="fas fa-shopping-bag"></i></span>
        <span class="hover-icon" @click.stop="showFastViewModal = true"><i class="far fa-eye"></i></span>
        <fast-buy-modal :show="showFastBuyModal" :item="product" @close="closeModal"/>
        <fast-view-modal :show="showFastViewModal" :item="product" @close="closeModal"/>
      </div>
      <span class="product-card__favorite" :id="`favorite-${product._id}`">
        <i class="far fa-heart" v-if="!favorite" @click.stop="favorite = !favorite"></i>
        <i class="fas fa-heart" v-else @click.stop="favorite = !favorite"></i>
        <b-tooltip :target="`favorite-${product._id}`" triggers="hover">
          <span v-if="!favorite">
            Agregar a favoritos
          </span>
          <span v-else>
            Eliminar de favoritos
          </span>
        </b-tooltip>
      </span>
      <span
        v-if="product.discount.status"
        class="product-card__discount"
      >{{product.discount.percentage}}%</span>
    </div>
    <div class="card-info">
      <span class="card-info__brand">{{product.brand}}</span>
      <h3 class="card-info__title">{{product.productName}}</h3>
      <p class="card-info__price">S/. {{product.price}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FastBuyModal from './product/FastBuyModal';
import FastViewModal from './product/FastViewModal';
export default {
  name: "ProductItem",
  props: ["product"],
  components: {
    FastBuyModal,
    FastViewModal
  },
  data() {
    return {
      favorite: false,
      showFastBuyModal: false,
      showFastViewModal: false
    };
  },
  methods: {
    ...mapActions("product", ["previousPurchase"]),
    closeModal() {
      this.showFastBuyModal = false;
      this.showFastViewModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Salsa&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Stylish&display=swap');
* {
  box-sizing: border-box;
}

.product {
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border-radius: 4px;
  &-card {
    &__like {
      width: 18px;
    }
    &__clock {
      width: 15px;
      vertical-align: middle;
      fill: #ad7d52;
    }
    &__time {
      font-size: 12px;
      color: #ad7d52;
      vertical-align: middle;
      margin-left: 5px;
    }
    &__clock-info {
      float: right;
    }
    &__img {
      position: relative;
      cursor: pointer;
      img {
        border-radius: 4px;
      }
      &:hover {
        background-color: black;
        transition: all .3s;
        border-top-right-radius: 125px;
        img {   
          opacity: .5;
        }
        .product-card__img-fast-view {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          .hover-icon {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .8);
            margin: {
              top: .5rem;
              bottom: .5rem;
            }
          }
        }
      }
      &-fast-view {
        display: none;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
      }
    }
    &__info {
      padding: 16px 24px 24px 24px;
      background-color: rgb(251, 249, 249);
      flex-grow: 1;
      z-index: 100;
    }
    @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
    &__discount {
      display: block;
      padding: 4px 15px 4px 15px;
      color: #fff;
      background-color: #222;
      position: absolute;
      font-family: 'Anton', sans-serif;
      letter-spacing: 2px;
      top: 0;
      left: 0;
      -webkit-clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
      clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
    }
    &__favorite {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 1px 4px;
      color: #333;
      -webkit-clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
      clip-path: polygon(0% 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Pathway+Gothic+One&display=swap");

.card-info {
  &__brand {
    font-family: 'Baloo Paaji 2', cursive;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #868686;
  }
  &__price {
    font-family: 'Stylish', sans-serif;
    font-size: 18px;
    color: #777;
  }
  &__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: 'Salsa', cursive;
    font-weight: 450;
    font-size: 24px;
    color: #555;
  }
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

@media screen and (max-width: 575px) {
  .card__title {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
