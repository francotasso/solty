<template>
  <div class="searching-container">
    <div class="row">
      <div class="col-md-6">
        <strong>{{productsFiltered.length}}</strong>
        <span>Productos encontrados</span>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-8">
            <input
              class="form-control form-control-sm ml-1 w-75"
              type="text"
              placeholder="Busque aquí"
              aria-label="Search"
              v-model="query"
              @keyup="setFilter(query)"
            />
          </div>
          <div class="col-md-4">

          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row content">
      <div class="form-inline md-form form-sm col-md-6 search-content">
        <input
          class="form-control form-control-sm ml-1 w-75"
          type="text"
          placeholder="Ingrese el nombre o la marca de su producto"
          aria-label="Search"
          v-model="query"
          @keyup="setFilter(query)"
        />
        <i class="fas fa-search" aria-hidden="true"></i>
      </div>
      <div class="dropdown filter-content">
        <button
          class="btn dropdown-toggle bg-black"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style="height: 2.5rem;"
        >
          Filtrar por
          <i class="fas fa-filter ml-3"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" @click="setProductsFilter('all')">Todos los productos</button>
          <button
            class="dropdown-item d-flex justify-content-between"
            @click="setProductsFilter('highToLow')"
            title="De mayor a menor"
          >
            Precio
            <i class="fas fa-angle-double-down ml-5" style="font-size: 23px;"></i>
          </button>
          <button
            class="dropdown-item d-flex justify-content-between"
            @click="setProductsFilter('lowToHigh')"
            title="De menor a mayor"
          >
            Precio
            <i class="fas fa-angle-double-up ml-5" style="font-size: 23px;"></i>
          </button>
          <button
            class="dropdown-item d-flex justify-content-between"
            @click="setProductsFilter('Male')"
          >
            Para varón
            <i class="fas fa-male ml-5" style="font-size: 23px;"></i>
          </button>
          <button
            class="dropdown-item d-flex justify-content-between"
            @click="setProductsFilter('Female')"
          >
            Para mujer
            <i class="fas fa-female ml-5" style="font-size: 23px;"></i>
          </button>
        </div>
      </div>
      <div class="available-products">
        <span class="mr-1">{{productsFiltered.length}}</span>
        <span v-if="productsFiltered.length == 1">producto disponible</span>
        <span v-else>productos disponibles</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "SearchItem",
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...mapState("product", ["categories"]),
    ...mapGetters("product", ["productsFiltered"])
  },
  methods: {
    ...mapActions("product", [
      "setProductsFilter",
      "activeSearchFilter",
      "desactiveCategoryFilter"
    ]),
    setFilter(q) {
      this.categories.map(category => {
        if (category.active) category.active = false;
      });
      this.desactiveCategoryFilter();
      this.activeSearchFilter();
      this.setProductsFilter(q);
    }
  },
  beforeMount() {
    this.setProductsFilter("all");
  }
};
</script>

<style lang="scss" scoped>
.searching-container {
  background-color: #f5f5f5;
  padding: 12px 15px;
  border-radius: 4px;
}
.btn:focus {
  box-shadow: none;
}
.content {
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
}
.search-content {
  margin-left: 1rem;
}
.available-products {
  display: flex;
  align-items: center;
}
.filter-content {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .search-content {
    margin-left: 2rem;
  }
  .available-products {
    margin-right: 1.5rem;
  }
  .filter-content {
    margin-left: 1.5rem;
  }
}
</style>
