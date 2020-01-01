<template>
  <tr>
    <td class="column1">
      <router-link :to="`product/${item.id}/description`">{{item.productName}}</router-link>
    </td>
    <td class="column2">
      <select id="size" class="form-control" v-model="item.size">
        <option
          v-for="(element, index) in sizes"
          :key="index"
          :selected="item.size === element.size"
        >{{element.size}}</option>
      </select>
    </td>
    <td class="column3">
      <select id="size" class="form-control" v-model="item.color">
        <option
          v-for="(element, index) in colors"
          :key="index"
          :selected="item.color === element.color"
        >{{element.color}}</option>
      </select>
    </td>
    <td class="column4">
      <input
        class="form-control text-center"
        type="number"
        min="1"
        step="1"
        v-model="item.quantity"
        @keyup="updatePrice(item)"
      />
    </td>
    <td class="column5">S/.{{item.totalPrice}}</td>
    <td class="column6">
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
      this.item.color = this.item.available.sizes[i].colors[0].color;
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
</style>