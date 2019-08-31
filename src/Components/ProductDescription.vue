<template>
  <div>
    <div class="card mt-5">
      <div class="row no-gutters">
        <div class="border-right col-md-4">
          <img
            :src="currentProductToBuy.image"
            class="card-img"
            :alt="currentProductToBuy.productName"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              <div
                class="text-center my-3 display-4 product-title"
                role="alert"
              >{{currentProductToBuy.productName}}</div>
              <div class="ml-auto d-flex justify-content-around my-3">
                <span class="badge bg-darkblue">{{currentProductToBuy.brand}}</span>
                <span class="badge bg-darkblue">S/.{{currentProductToBuy.price}}</span>
              </div>
            </h5>
            <p class="card-text">{{currentProductToBuy.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "productDescription",
  computed: {
    ...mapState("product", ["currentProductToBuy"])
  },
  data() {
    return {};
  },
  methods: {}
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
</style>