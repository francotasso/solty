<template>
  <div class="categories-container">
    <div class="main-title">
      <span>Categorías</span>
    </div>
    <ul class="category-items">
      <li
        v-for="category in categories"
        :key="category.id"
        class="category-item"
        :class="isSelected(category.cid)"
        @click="setCategory(category.cid)"
      >
        <span>{{category.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { categories } from '../utils/categories';
export default {
  name: "ProductsCategories",
  data() {
    return {
      categories
    };
  },
  computed: {
    ...mapState("product", ["filter"])
  },
  methods: {
    ...mapActions("product", ["setProductsFilter", "setStatusCategoryFilter"]),
    setCategory(cid) {
      if (this.filter.range !== cid) {
        this.setStatusCategoryFilter(true);
        this.setProductsFilter(cid);
      } else {
        this.setStatusCategoryFilter(false);
        this.setProductsFilter('all');
      }
    },
    isSelected(cid) {
      if (this.filter.range === cid) return "category__box-selected";
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
$main-color: #222;
$hover-category: #fcb800;
.categories-container {
  font-family: 'Ropa Sans', sans-serif;
  background-color: #f5f5f5;
  padding: 25px 20px;
  border-radius: 4px;
  .main-title {
    margin-bottom: 25px;
    span {
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 400;
    }
  }
  .category-items {
    list-style: none;
    padding-inline-start: 0px;
    .category-item {
      padding: 5px 0px;
      &:hover {
        color: $hover-category;
        cursor: pointer;
      }
    }
  }
}
.category-title {
  display: flex;
  justify-content: center;
  font-family: 'Autour One', cursive;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bolder;
  color: rgb(83, 83, 83);
  margin-bottom: 1rem;
}

.category__box {
  position: relative;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgb(139, 138, 138);
  font-family: 'Baloo Paaji 2', cursive;
  text-transform: uppercase;
  margin-bottom: .3rem;
  padding: 0 .5rem;
  &:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: $main-color;
    transition: width .5s;
  }
  &:hover{
    cursor: pointer;
    color: #000;
    &:after{
      width: 100%;
    }
  }
  &-selected{
    color: $hover-category;
  }
}

@media screen and (max-width: 1050px) {
  .category-container {
    display: flex;
    flex-wrap: wrap;
    margin-right: 0;
  }
  .category {
    width: calc(100% / 3);
  }
}

@media screen and (max-width: 550px) {
  .category-container {
    flex-wrap: wrap;
  }
  .category {
    width: calc(100% / 2);
  }
}
</style>
