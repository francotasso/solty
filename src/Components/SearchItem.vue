<template>
    <div>
        <div class="row">
            <div class="form-inline md-form form-sm mt-0 col-md-10 px-4 mt-3">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75 mt-3" type="text" placeholder="Search"
                aria-label="Search" v-model="query" @keyup="setProductsFilter(query)"/>
            </div>
            <div class="dropdown mt-3 col-md-2 d-flex justify-content-end">
                <button
                    class="btn dropdown-toggle bg-black"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style="height: 2.5rem;"
                    >Filtrar por <i class="fas fa-filter ml-3"></i>
                </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" @click="setProductsFilter('all')">Todos los productos</button>
                <button
                    class="dropdown-item d-flex justify-content-between"
                    @click="setProductsFilter('highToLow')"
                    title="De mayor a menor"
                >Precio <i class="fas fa-angle-double-down ml-5" style="font-size: 23px;"></i></button>
                <button
                    class="dropdown-item d-flex justify-content-between"
                    @click="setProductsFilter('lowToHigh')"
                    title="De menor a mayor"
                >Precio <i class="fas fa-angle-double-up ml-5" style="font-size: 23px;"></i></button>
                <button class="dropdown-item d-flex justify-content-between" @click="setProductsFilter('Male')">Para varón <i class="fas fa-male ml-5" style="font-size: 23px;"></i></button>
                <button class="dropdown-item d-flex justify-content-between" @click="setProductsFilter('Female')">Para mujer <i class="fas fa-female ml-5" style="font-size: 23px;"></i></button>
            </div>
        </div>
      <div class="mt-2 ml-3">
        <span class="ml-2 bree-serif">Total de productos: {{productsFiltered.length}}</span>
      </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'SearchItem',
    data(){
        return {
            query: ''
        }
    },
    computed: {
        ...mapGetters("product", ["productsFiltered"]),
    },
    methods: {
        ...mapActions("product", ["setProductsFilter"])
    },
    beforeMount(){
        this.setProductsFilter('all');
    }
}
</script>

<style scoped>
.bg-black {
  background-color: #000;
  color: #fff;
}
.btn:focus {
  box-shadow: none;
}
</style>