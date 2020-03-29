<template>
  <div>
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">Carrito de compras</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive-lg">
              <table id="dtBasicExample" class="table" cellspacing="0" width="100%">
                <thead>
                  <tr class="text-center">
                    <th class="th-md">Nombre</th>
                    <th class="th-md">Talla</th>
                    <th class="th-lg">Color</th>
                    <th class="th-md">Cantidad</th>
                    <th class="th-md">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <ShoppingCartModalItem
                    v-for="(item,index) in shoppingCart"
                    :key="index"
                    :item="item"
                    class="justify-content-center align-items-center text-center"
                  />
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-continue text-white"
              data-dismiss="modal"
            >Seguir comprando</button>
            <router-link
              to="/shoppingcart"
              class="btn btn-pay"
              style="text-decoration: none;"
              data-dismiss="modal"
            >Ir a pagar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ShoppingCartModalItem from "./ShoppingCartModalItem";
export default {
  name: "ShoppingCartModal",
  data() {
    return {};
  },
  components: {
    ShoppingCartModalItem
  },
  computed: {
    ...mapState("product", ["shoppingCart"])
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
.btn:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
.btn-continue{
  background-color: #333;
}
.btn-pay {
  background-color: #fff;
  border: 2px solid #333;
  border-radius: .25rem;
}
@media (max-width: 768px) {
  .stars {
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
}
</style>