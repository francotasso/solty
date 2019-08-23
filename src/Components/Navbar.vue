<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <div class="d-flex justify-content-center">
            <router-link to="/products" class="navbar-brand">
              <img
                src="./assets/SoltyLogo2.png"
                width="60"
                height="40"
                alt="Solty Logo"
                title="Inicio"
              />
            </router-link>
            <li class="navbar-brand">Bienvenido {{fullNameLoggedUser}}</li>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto pointer">
              <!--<li class="nav-item">
                <router-link class="nav-link" to="/about">Nosotros</router-link>
              </li>-->
              <hr style="border: 1px solid white; width: 100%;" class="d-sm-block d-lg-none" />
              <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                  Mi info
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <hr style="border: 1px solid white; width: 100%;" class="d-sm-block d-lg-none" />
              <li class="nav-item" @click="logout">
                <a class="nav-link">Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      fullNameLoggedUser: ""
    };
  },
  methods: {
    ...mapActions("user", ["logout"])
  },
  beforeMount() {
    this.fullNameLoggedUser = localStorage.getItem("userFullName");
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>


