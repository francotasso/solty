<template>
  <wrapper-section :custom-color="true">
    <div class="container my-5">
      <div v-if="shoppingCart.length" class="shopping-cart">
        <div class="shopping-cart__checkout">
          <div class="title mb-4">
            <h4 class="d-flex justify-content-between">
              <div>
                <span class="font-weight-bold">TU CARRITO</span>
                <span class="text-secondary small ml-2">{{shoppingCartQuantity}} ARTÍCULOS</span>
              </div>
              <div>
                <span class="text-secondary small mr-4 delete-items" @click="removeProductsFromShoppingCart">Eliminar todo</span>
              </div>
            </h4>
          </div>
          <ul class="items__wrapper">
            <li v-for="(item,index) in shoppingCart" :key="index" class="item__cart" :class="{'mb-3': index!==shoppingCart.length-1}">
              <div class="item-image__container col-md-3">
                <img :src="item.image" :alt="item.productName" class="img-fluid" @click="swapPurchase(item)">
              </div>
              <div class="item-container col-md-9">
                <div class="item-title__container mt-1">
                  <h6 class="text-uppercase d-flex justify-content-between">
                    <span class="font-weight-bold">{{item.productName}}</span>
                    <span>S/.{{item.totalPrice}}</span>
                  </h6>
                </div>
                <div class="item-information__container">
                  <div class="item-information">
                    <span>Color: {{item.color}}</span>
                    <span>Talla: {{item.size}}</span>
                    <span>Precio(u): S/.{{item.unitPrice}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="checkout-continue">
            <router-link to="/checkout" class="checkout-continue__button">
              <span class="mr-2">CONTINUAR</span>
              <span class="ml-1"><i class="fas fa-long-arrow-alt-right"></i></span>
            </router-link>
          </div>
        </div>
        <div class="shopping-cart__resume">
          <div class="resume-card">
            <div class="resume-card__title"><h5 class="font-weight-bolder">RESUMEN DEL PEDIDO: </h5></div>
            <div class="resume-card__body">
              <ul class="resume-card__list">
                <li class="resume-card__item-information mt-3">
                  <p class="mx-2">{{shoppingCartQuantity}} PRODUCTO<span v-if="shoppingCartQuantity > 1">S</span></p>
                  <p class="d-flex justify-content-between ml-4 mr-2">
                    <span>SUBTOTAL</span>
                    <span>S/. {{shoppingCartTotalPrice}}</span>
                  </p>
                </li>
                <li class="resume-card__item-information mt-3">
                  <p class="d-flex justify-content-between mx-2">
                    <span>Entrega</span>
                    <span>Gratis</span>
                  </p>
                </li>
                <li class="resume-card__item-information mt-3">
                  <p class="d-flex justify-content-between mx-2 font-weight-bold">
                    <span>Total</span>
                    <span>S/. {{shoppingCartTotalPrice}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container d-flex justify-content-center align-items-center flex-column mt-4">
          <img src="https://d3ieicw58ybon5.cloudfront.net/bypass/static/cart/cart_empty.png" alt="There's no products">
          <h4 class="text-center no-products-title">No hay productos en el carrito</h4>
        </div>
      </div>
    </div>
  </wrapper-section>
</template>

<script>
import ShoppingCartItem from "../Components/ShoppingCartItem";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartItem
  },
  data() {
    return {};
  },
  mounted(){
    window.scroll(0, 0)
  },
  computed: {
    ...mapState("product", ["shoppingCart"]),
    ...mapGetters("product", ["shoppingCartTotalPrice", "shoppingCartQuantity"])
  },
  methods: {
    ...mapMutations("product", ["updatePrice", "removeProductFromShoppingCart", "removeProductsFromShoppingCart"]),
    ...mapActions("product", ["previousPurchase"]),
    async swapPurchase(item) {
      await this.previousPurchase(item);
      window.scrollBy({ 
        top: 0,
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
.shopping-cart{
  display: flex;
  box-sizing: border-box;
  &__checkout{
    flex: 2;
    .text-secondary{
      font-size: 16px;
    }
    .delete-items{
      cursor: pointer;
    }
  }
  &__resume{
    flex: 1;
  }
}
.items__wrapper{
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  width: 90%;
  margin-bottom: 1rem;
  .item__cart {
    display: flex;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
  }
}

.item-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: .5rem;
  .item-information__container{
    display: flex;
    justify-content: space-between;
    .item-information{
      display: flex;
      flex-direction: column;
      font-size: 13px;
      margin-top: .5rem;
    }
    .item__actions{
      display: flex;
      flex-direction: column;
    }
  }
}
.resume-card{
  background-color: rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  &__title{
    margin-bottom: .5rem;
    width: 95%;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  &__body{
    width: 100%;
    display: flex;
    justify-content: center;
    .resume-card__list {
      width: 90%;
      background-color: #fff;
      padding-inline-start: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .resume-card__item-information {
      list-style: none;
      width: 95%;
      &:not(:last-child){
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
.checkout-continue{
  margin-top: 2rem;
  margin-bottom: 2rem;
  &__button{
    background-color: #111;
    color: #fff;
    padding: .75rem 1.2rem;
    text-decoration: none;
  }
}
.no-products-title{
  font-family: 'Titan One', cursive;
  margin-top: 1rem;
}

@media screen and (max-width: 768px){
  .shopping-cart{
    flex-direction: column;
    &__checkout, &__resume {
      flex: 1;
    }
  }
}
</style>