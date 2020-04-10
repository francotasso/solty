<template>
  <div class="fast-container">
    <div v-if="shoppingCart.length">
      <div class="fast-cart__title">
        <h5 class="text-center text-white">Carrito S/. {{shoppingCartTotalPrice}}</h5>
      </div>
      <div class="fast-cart__container">
        <ul class="items__wrapper">
          <li v-for="(item,index) in shoppingCart" :key="index" class="item__cart" :class="{'mb-3': index!==shoppingCart.length-1}">
            <div class="item-image__container">
              <img :src="item.image" :alt="item.productName" width="80px" @click="swapPurchase(item.id)">
            </div>
            <div class="item-container">
              <div class="item-title__container mt-1">
                <h6 class="text-center text-white">{{item.productName | filterProductName}} ({{item.quantity}})</h6>
              </div>
              <div class="item-information__container">
                <div class="item-information text-white">
                  <span>Color: {{item.color}}</span>
                  <div class="d-flex">
                    <span>Talla: {{item.size}}</span>
                    <span class="ml-2">Precio: S/.{{item.totalPrice}}</span>
                  </div>
                </div>
                <div class="item__actions">
                  <span>
                    <i class="fas fa-trash-alt text-white" @click="removeProductFromShoppingCart(item)"></i>
                  </span>
                  <span>
                    <router-link to="/shoppingcart"><i class="fas fa-edit text-white"></i></router-link>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="fast-cart__title">
        <h4 class="text-center text-white">Carrito vacío</h4>
      </div>
      <div class="fast-cart__container">
        <img src="https://d3ieicw58ybon5.cloudfront.net/bypass/static/cart/cart_empty.png" alt="No products" width="250">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "ShoppingCartFast",
  data(){
    return {
      
    }
  },
  computed: {
    ...mapState("product", ["shoppingCart"]),
    ...mapGetters("product", ["shoppingCartTotalPrice"])
  },
  filters: {
    filterProductName(productName){
      return productName.length > 15 ? productName.slice(0,15) + "..." : productName
    }
  },
  methods: {
    ...mapMutations("product", ["updatePrice", "removeProductFromShoppingCart"]),
    ...mapActions("product", ["previousPurchase"]),
    async swapPurchase(id) {
      await this.previousPurchase(id);
      $(document).ready(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.fast-container {
  width: 300px;
  height: 390px;
  background-color: #111;
  border-radius: .5rem;
  position: relative;
  z-index: 100;
  &:before{
    content: "";
    position: absolute;
    top: -15px;
    left: 48%;
    width: 30px;
    height: 30px;
    transform: rotateZ(45deg);
    background-color: #111;
  }
  &:after {
    content: "";
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 50;
  }
}

.fast-cart__title{
  margin-top: 1.5rem;
}
.fast-cart__container{
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  box-sizing: border-box;
}

.items__wrapper{
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  width: 90%;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  .item__cart {
    height: 80px;
    border-radius: 4px;
    background-color: #222;
    display: flex;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(29, 29, 29);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track:hover,
  &::-webkit-scrollbar-track:active {
    background-color: rgb(44, 43, 43);
  }
}

.item-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  .item-information__container{
    margin-left: .5rem;
    margin-right: .5rem;
    display: flex;
    justify-content: space-between;
    .item-information{
      display: flex;
      flex-direction: column;
      font-size: 13px;
    }
    .item__actions{
      display: flex;
      flex-direction: column;
    }
  }
}

</style>