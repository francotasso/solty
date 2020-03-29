<template>
  <div class>
    <div class="category-title">
      <span>Categorias</span>
    </div>
    <div class="category-container">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category category__box"
        :class="isSelected(category.active)"
        @click="selectCategory(category.id)"
      >
        <span>{{category.title}}</span>
        <img v-if="!category.active" :src="category.icon" :alt="category.title" />
        <img v-else :src="category.iconSelected" :alt="category.title" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ProductsCategories",
  data() {
    return {};
  },
  computed: {
    ...mapState("product", ["categories"])
  },
  methods: {
    ...mapActions("product", [
      "setProductsFilter",
      "desactiveSearchFilter",
      "activeCategoryFilter"
    ]),
    isSelected(active) {
      return active ? "category__box-selected" : "";
    },
    selectCategory(id) {
      this.desactiveSearchFilter();
      this.activeCategoryFilter();
      this.categories.map(category => {
        if (category.active) {
          category.active = false;
          if (category.id == id) this.setProductsFilter("all");
        } else if (category.id == id) {
          if (category.active) {
            category.active = false;
          } else {
            category.active = true;
            this.setProductsFilter(
              category.title
                .substring(0, category.title.length - 1)
                .toLowerCase()
            );
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Sigmar+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Cabin&display=swap");
* {
  box-sizing: border-box;
}
.category-title {
  display: flex;
  justify-content: center;
  font-family: "Sigmar One", cursive;
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
  font-family: "Cabin", sans-serif;
  padding: 0 .5rem;
  &:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: rgb(32, 32, 32);
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
    background-color: rgb(32, 32, 32);
    border: 3px solid rgb(32, 32, 32);
    color: #fff;
    &:hover{
      background-color: rgb(32, 32, 32);
      border: 3px solid rgb(32, 32, 32);
      color: #fff;
    }
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
