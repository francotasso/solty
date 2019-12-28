<template>
    <tr>
        <td class="th-sm">
            <p class="mt-2">{{item.productName}}</p>
        </td>
        <td scope="row" class="th-sm">
            <select id="size" class="form-control" v-model="item.size">
            <option :selected="item.size === 'XS'">XS</option>
            <option :selected="item.size === 'S'">S</option>
            <option :selected="item.size === 'M'">M</option>
            <option :selected="item.size === 'L'">L</option>
            <option :selected="item.size === 'XL'">XL</option>
            </select>
        </td>
        <td class="th-sm">
            <select id="size" class="form-control" v-model="item.color">
            <option :selected="item.color === 'Negro'">Negro</option>
            <option :selected="item.color === 'Azul'">Azul</option>
            <option :selected="item.color === 'Verde'">Verde</option>
            <option :selected="item.color === 'Gris'">Gris</option>
            <option :selected="item.color === 'Amarillo'">Amarillo</option>
            </select>
        </td>
        <td class="th-sm" style="width: 5rem;" >
            <input class="form-control" type="number" min="1" step="1" v-model="item.quantity" @keyup="updatePrice(item)" @change="updatePrice(item)"/>
        </td>
        <td style="padding-top: 1.5rem;">S/.{{item.totalPrice}}</td>
        <td style="padding-top: 0.7rem; font-size: 2rem;"><i class="fas fa-times" @click="removeProductFromShoppingCart(item)" title="Remover de la lista"></i></td>
    </tr>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: 'ShoppingCartModalItem',
    data(){
        return {

        }
    },
    props:["item"],
    computed: {
        ...mapState("product", ["shoppingCart"])
    },
    methods: {
        ...mapMutations("product", ["updatePrice","removeProductFromShoppingCart"])
    }
}
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
@media (max-width: 768px){
  .stars{
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
} 
</style>