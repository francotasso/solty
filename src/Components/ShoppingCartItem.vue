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
        @change="updatePrice(item)"
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
body,
html {
  height: 100%;
  font-family: sans-serif;
}
a {
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}
a:focus {
  outline: none !important;
}
a:hover {
  text-decoration: none;
}
p {
  margin: 0px;
}
input {
  display: block;
  outline: none;
  border: none !important;
}
tr {
  height: 50px;
}
tr:last-child {
  border: 0;
}
tr:nth-child(even) {
  background-color: #f5f5f5;
}
tr {
  font-family: OpenSans-Regular;
  font-size: 15px;
  color: #808080;
  line-height: 1.2;
  font-weight: unset;
}
tr:hover {
  color: #555555;
  background-color: #f5f5f5;
  cursor: pointer;
}
.column1 {
  width: 260px;
  padding-left: 40px;
}
.column2 {
  width: 160px;
}
.column3 {
  width: 245px;
}
.column4 {
  width: 110px;
  text-align: right;
}
.column5 {
  width: 170px;
  text-align: right;
}
.column6 {
  width: 222px;
  text-align: right;
  padding-right: 62px;
}

@media screen and (max-width: 992px) {
  table {
    display: block;
  }
  tr,
  td,
  th {
    display: block;
  }
  tr {
    height: auto;
    padding: 37px 0;
  }
  tr td {
    padding-left: 40% !important;
    margin-bottom: 24px;
  }
  tr td:last-child {
    margin-bottom: 0;
  }
  tr td:before {
    font-family: OpenSans-Regular;
    font-size: 14px;
    color: #999999;
    line-height: 1.2;
    font-weight: unset;
    position: absolute;
    width: 40%;
    left: 30px;
  }
  tr td:nth-child(1):before {
    content: "Nombre";
  }
  tr td:nth-child(2):before {
    content: "Talla";
  }
  tr td:nth-child(3):before {
    content: "Color";
  }
  tr td:nth-child(4):before {
    content: "Cantidad";
  }
  tr td:nth-child(5):before {
    content: "Subtotal";
  }
  tr td:nth-child(6):before {
    content: "Eliminar";
  }
  tr {
    font-size: 14px;
  }
  .column1,
  .column2,
  .column3,
  .column4,
  .column5,
  .column6 {
    text-align: left;
  }
  .column4,
  .column5,
  .column6,
  .column1,
  .column2,
  .column3 {
    width: 100%;
  }
}
</style>
