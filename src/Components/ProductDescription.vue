<template>
  <div>
    <div class="container mt-4">
      <h4>{{currentProductToBuy.productName}}</h4>
      <div>
        <p class="text-justify">{{currentProductToBuy.description}}</p>
      </div>
      <hr />
      <div class="mt-4">
        <div class="row">
          <div class="col-md-4 px-3">
            <p>{{currentProductToBuy.brand}} - {{currentProductToBuy.gender | translateGender}}</p>
            <div class="d-flex">
              <p
                :class="currentProductToBuy.discount.status ? 'discount' : ''"
              >S/.{{currentProductToBuy.price}}</p>
              <p
                v-if="currentProductToBuy.discount.status"
                class="ml-4"
              >S/. {{currentProductToBuy.price * (1 - (currentProductToBuy.discount.percentage/100))}}</p>
            </div>
          </div>
          <div class="col-md-8 d-flex flex-wrap justify-content-between p-0">
            <div class="col-md-6 mb-2">
              <label for="size" class="bree-serif">Talla</label>
              <select id="size" class="form-control" v-model="size">
                <option
                  v-for="(itemSize, index) in currentProductToBuy.available.sizes"
                  :key="index"
                >{{itemSize.size}}</option>
              </select>
            </div>
            <div class="col-md-6 mb-2">
              <label for="color" class="bree-serif">Color</label>
              <select id="color" class="form-control" v-model="color">
                <option v-for="(itemColor, index) in colors" :key="index">{{itemColor.color}}</option>
              </select>
            </div>
          </div>
          <div v-if="currentProductToBuy.discountCodes.length>0" class="d-flex flex-wrap">
            <div
              class="align-self-start mb-2"
              :class="discountCode === '' ? 'col-md-12' : 'col-md-11'"
            >
              <p>¿Tiene un código de descuento? Ingréselo aquí</p>
              <input
                type="text"
                class="form-control"
                v-model="discountCode"
                @keyup="checkCode"
                :readonly="validCode"
              />
            </div>
            <div
              v-if="!validCode && discountCode!==''"
              class="col-md-1 text-center align-self-center"
            >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-if="validCode" class="col-md-1 text-center mt-5" style="color: #25CD3C;">
              <i class="far fa-check-circle"></i>
            </div>
          </div>
        </div>
        <hr />
        <div class="row mt-4">
          <div class="col-md-4 p-0">
            <p
              v-if="currentProductToBuy.discount.status"
              style="font-size: 10px;"
            >* Incluye promoción por tiempo limitado</p>
            <button
              class="btn btn-block btn-elegant text-white"
              type="button"
              data-toggle="modal"
              data-target="#cartModal"
              @click="addProduct()"
            >
              <i class="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
            <ShoppingCartModal />
          </div>
          <div
            class="col-md-5 pl-5 pt-3 d-flex justify-content-center align-items-center stars"
            style="font-size: 2rem;"
          >
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div
            class="col-md-3 d-flex flex-column align-content-between pt-3"
            style="font-size: 12px;"
          >
            <p class="text-right">Envío gratis</p>
            <p class="text-right">Devolución gratis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ShoppingCartModal from "./ShoppingCartModal";
export default {
  name: "productDescription",
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"]),
    shoppingCartSort() {
      return this.shoppingCart.sort((a, b) =>
        a.totalPrice > b.totalPrice ? 1 : a.totalPrice < b.totalPrice ? -1 : 0
      );
    },
    colors() {
      let i = this.currentProductToBuy.available.sizes.findIndex(
        item => item.size == this.size
      );
      this.color = this.currentProductToBuy.available.sizes[i].colors[0].color;
      return this.currentProductToBuy.available.sizes.filter(
        item => item.size === this.size
      )[0].colors;
    }
  },
  components: {
    ShoppingCartModal
  },
  filters: {
    translateGender(gender) {
      return gender === "Male" ? "Hombre" : "Mujer";
    }
  },
  data() {
    return {
      size: "",
      color: "",
      discountCode: "",
      validCode: false
    };
  },
  methods: {
    ...mapMutations("product", ["addProductToShoppingCart"]),
    addProduct() {
      let discountStatus = this.currentProductToBuy.discount.status;
      let multiplier = 1;
      if (discountStatus)
        multiplier = 1 - this.currentProductToBuy.discount.percentage / 100;
      let product = {
        id: this.currentProductToBuy._id,
        productName: this.currentProductToBuy.productName,
        size: this.size,
        color: this.color,
        price: this.currentProductToBuy.price * multiplier,
        available: this.currentProductToBuy.available
      };
      this.addProductToShoppingCart(product);
    },
    checkCode() {
      let code = this.currentProductToBuy.discountCodes.find(
        item => item.code === this.discountCode
      );
      if (code !== undefined) this.validCode = true;
    }
  },
  beforeMount() {
    (this.size = this.currentProductToBuy.available.sizes[0].size),
      (this.color = this.currentProductToBuy.available.sizes[0].colors[0].color);
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
.discount {
  text-decoration: line-through;
}
@media (max-width: 768px) {
  .stars {
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
}
</style>