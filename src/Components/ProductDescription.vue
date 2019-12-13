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
              <select id="size" class="form-control">
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3">M</option>
                <option value="4">L</option>
                <option value="5">XL</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="color" class="bree-serif">Color</label>
              <select id="color" class="form-control">
                <option value="1">Negro</option>
                <option value="2">Azul</option>
                <option value="3">Verde</option>
                <option value="4">Gris</option>
                <option value="5">Amarillo</option>
              </select>
            </div>
          </div>
        </div>
        <hr>
        <div class="row mt-4">
          <div class="col-md-4 p-0">
            <p style="font-size: 10px;">* Incluye promoción por tiempo limitado</p>
            <button class="btn btn-block btn-primary"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
          </div>
          <div class="col-md-5 pl-5 d-flex justify-content-center align-items-center" style="font-size: 2rem;">
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
export default {
  name: "productDescription",
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"])
  },
  filters: {
    translateGender(gender){
      return gender === 'Male' ? 'Hombre' : 'Mujer'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations("product", ["addProductToShoppingCart"])
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
</style>