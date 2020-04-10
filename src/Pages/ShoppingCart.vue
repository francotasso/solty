<template>
  <wrapper-section>
    <div class="container-fluid d-flex justify-content-center" style="margin-top: 4rem;">
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100" v-if="shoppingCart.length">
              <form action="/checkout">
                <div class="mb-4">
                  <h3>TU CARRITO</h3>
                </div>
                <div class="d-md-none">Total: S/. {{shoppingCartTotalPrice}}</div>
                <table>
                  <thead>
                    <tr class="table100-head">
                      <th class="column1">Nombre</th>
                      <th class="column2">Talla</th>
                      <th class="column3">Color</th>
                      <th class="column4">Cantidad</th>
                      <th class="column5">Subtotal</th>
                      <th class="column6">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ShoppingCartItem
                      v-for="(item,index) in shoppingCart"
                      :key="index"
                      :item="item"
                    />
                  </tbody>
                </table>
                <div
                  class="d-flex justify-content-end mt-4"
                  style="margin-right: 13rem;"
                >Total: S/. {{shoppingCartTotalPrice}}</div>
                <div class="d-flex justify-content-center mt-4">
                  <router-link
                    to="/checkout"
                    class="btn btn-pay p-2"
                    style="text-decoration: none;"
                  >Ir a pagar</router-link>
                </div>
              </form>
            </div>
            <div v-else>
              <div class="container d-flex justify-content-center align-items-center flex-column mt-4">
                <img src="https://d3ieicw58ybon5.cloudfront.net/bypass/static/cart/cart_empty.png" alt="There's no products">
                <h4 class="text-center no-products-title">No hay productos en el carrito</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </wrapper-section>
</template>

<script>
import ShoppingCartItem from "../Components/ShoppingCartItem";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "aboutus",
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
    ...mapGetters("product", ["shoppingCartTotalPrice"])
  },
  methods: {
    ...mapMutations("product", ["updatePrice", "removeProductFromShoppingCart"])
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.box {
  margin-top: 5rem;
}
.content-right {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
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
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}
p {
  margin: 0px;
}
ul,
li {
  margin: 0px;
  list-style-type: none;
}
input {
  display: block;
  outline: none;
  border: none !important;
}
textarea {
  display: block;
  outline: none;
}
textarea:focus,
input:focus {
  border-color: transparent !important;
}
button {
  outline: none !important;
  border: none;
  background: transparent;
}
button:hover {
  cursor: pointer;
}
iframe {
  border: none !important;
}
.limiter {
  width: 100%;
  margin: 0 auto;
}
.container-table100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 33px 30px;
}
.wrap-table100 {
  width: 1170px;
}
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
  text-align: center;
}
table * {
  position: relative;
}
table td,
table th {
  padding-left: 8px;
}
table thead tr {
  height: 60px;
  background: #333;
}
table tbody tr {
  height: 50px;
}
table tbody tr:last-child {
  border: 0;
}
.table100-head th {
  font-family: OpenSans-Regular;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
  font-weight: unset;
}
tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}
tbody tr {
  font-family: OpenSans-Regular;
  font-size: 15px;
  color: #808080;
  line-height: 1.2;
  font-weight: unset;
}
tbody tr:hover {
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
.btn-pay {
  background-color: #fff;
  border: 2px solid #333;
  border-radius: .25rem;
}
.no-products-title{
  font-family: 'Titan One', cursive;
  margin-top: 1rem;
}
@media screen and (max-width: 992px) {
  table {
    display: block;
  }
  table > *,
  table tr,
  table td,
  table th {
    display: block;
  }
  table thead {
    display: none;
  }
  table tbody tr {
    height: auto;
    padding: 37px 0;
  }
  table tbody tr td {
    padding-left: 40% !important;
    margin-bottom: 24px;
  }
  table tbody tr td:last-child {
    margin-bottom: 0;
  }
  table tbody tr td:before {
    font-family: OpenSans-Regular;
    font-size: 14px;
    color: #999999;
    line-height: 1.2;
    font-weight: unset;
    position: absolute;
    width: 40%;
    left: 30px;
    top: 0;
  }
  table tbody tr td:nth-child(1):before {
    content: "Nombre";
  }
  table tbody tr td:nth-child(2):before {
    content: "Talla";
  }
  table tbody tr td:nth-child(3):before {
    content: "Color";
  }
  table tbody tr td:nth-child(4):before {
    content: "Cantidad";
  }
  table tbody tr td:nth-child(5):before {
    content: "Subtotal";
  }
  table tbody tr td:nth-child(6):before {
    content: "Eliminar";
  }

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

  tbody tr {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .container-table100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>