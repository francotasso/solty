<template>
  <tr>
    <td class="th-sm">
      <p class="mt-2">{{item.productName}}</p>
    </td>
    <td scope="row" class="th-sm">
      <select id="size" class="form-control" v-model="item.size">
        <option
          :selected="item.size === element.size"
          v-for="(element, index) in sizes"
          :key="index"
        >{{element.size}}</option>
      </select>
    </td>
    <td class="th-sm">
      <select id="size" class="form-control" v-model="item.color">
        <option
          :selected="item.color === element.color"
          v-for="(element, index) in colors"
          :key="index"
        >{{element.color}}</option>
      </select>
    </td>
    <td class="th-sm" style="width: 5rem;">
      <input
        class="form-control"
        type="number"
        min="1"
        step="1"
        v-model="item.quantity"
        @keyup="updatePrice(item)"
        @change="updatePrice(item)"
      />
    </td>
    <td style="padding-top: 1.5rem;">S/.{{item.totalPrice}}</td>
    <td style="padding-top: 0.7rem; font-size: 2rem;">
      <i
        class="fas fa-times"
        @click="removeProductFromShoppingCart(item)"
        title="Remover de la lista"
      ></i>
    </td>
  </tr>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ShoppingCartModalItem",
  data() {
    return {
      sizes: []
    };
  },
  props: ["item"],
  computed: {
    ...mapState("product", ["shoppingCart"]),
    colors() {
      let i = this.item.available.sizes.findIndex(
        element => element.size == this.item.size
      );
      let sizes2 = this.item.available.sizes.filter(
        element => element.size == this.item.size
      )[0].colors;
      let j = sizes2.findIndex(element => element.color == this.item.color);
      if (j === -1) j = 0;
      this.item.color = this.item.available.sizes[i].colors[j].color;
      return this.item.available.sizes.filter(
        element => element.size === this.item.size
      )[0].colors;
    }
  },
  methods: {
    ...mapMutations("product", ["updatePrice", "removeProductFromShoppingCart"])
  },
  beforeMount() {
    this.sizes = this.item.available.sizes;
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
@media (max-width: 768px) {
  .stars {
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
}
</style>