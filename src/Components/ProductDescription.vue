<template>
  <div>
    <div class="container mt-4">
      <h4>{{currentProductToBuy.productName}}</h4>
      <div>
        <p class="text-justify">{{currentProductToBuy.description}}</p>
      </div>
      <hr>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-4 px-3">
            <p>{{currentProductToBuy.brand}} - {{currentProductToBuy.gender | translateGender}}</p>
            <p>S/.{{currentProductToBuy.price}}</p>
          </div>
          <div class="col-md-8 d-flex justify-content-between p-0">
            <div class="col-md-6">
              <label for="size" class="bree-serif">Talla</label>
              <select id="size" class="form-control" v-model="size">
                <option>XS</option>
                <option>S</option>
                <option selected>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="color" class="bree-serif">Color</label>
              <select id="color" class="form-control" v-model="color">
                <option selected>Negro</option>
                <option>Azul</option>
                <option>Verde</option>
                <option>Gris</option>
                <option>Amarillo</option>
              </select>
            </div>
          </div>
        </div>
        <hr>
        <div class="row mt-4">
          <div class="col-md-4 p-0">
            <p style="font-size: 10px;">* Incluye promoción por tiempo limitado</p>
            <button class="btn btn-block btn-elegant text-white" type="button" data-toggle="modal" data-target="#cartModal" @click="addProduct()"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
            <ShoppingCartModal />
          </div>
          <div class="col-md-5 pl-5 pt-3 d-flex justify-content-center align-items-center stars" style="font-size: 2rem;">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="col-md-3 d-flex flex-column align-content-between pt-3" style="font-size: 12px;">
            <p class="text-right">Envío gratis</p>
            <p class="text-right" >Devolución gratis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ShoppingCartModal from './ShoppingCartModal';
export default {
  name: "productDescription",
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"]),
    shoppingCartSort(){
      return this.shoppingCart.sort((a,b) => a.totalPrice > b.totalPrice ? 1 : a.totalPrice < b.totalPrice ? -1 : 0);
    }
  },
  components: {
    ShoppingCartModal
  },
  filters: {
    translateGender(gender){
      return gender === 'Male' ? 'Hombre' : 'Mujer'
    }
  },
  data() {
    return {
      size: "M",
      color: "Negro"
    };
  },
  methods: {
    ...mapMutations("product", ["addProductToShoppingCart"]),
    addProduct(){
      let product = {
        id : this.currentProductToBuy._id,
        productName: this.currentProductToBuy.productName,
        size: this.size,
        color: this.color,
        price: this.currentProductToBuy.price
      }
      this.addProductToShoppingCart(product);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
.product-title {
  font-family: "Anton", sans-serif;
}
.bg-darkblue {
  background-color: #224994;
}
textarea {
  resize: none;
  min-height: 5rem;
  width: 400px;
  padding: 1rem;
  border-radius: 5px;
}
.btn:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
@media (max-width: 768px){
  .stars{
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
} 
</style>