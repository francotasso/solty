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
                class="alert alert-info text-center"
                role="alert"
              >{{currentProductToBuy.productName}}</div>
              <div class="ml-auto d-flex justify-content-around">
                <span class="badge badge-success">{{currentProductToBuy.brand}}</span>
                <span class="badge badge-secondary">S/.{{currentProductToBuy.price}}</span>
              </div>
            </h5>
            <p class="card-text">{{currentProductToBuy.description}}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
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
  props: ["id"],
  computed: {
    ...mapState("product", ["currentProductToBuy"])
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>